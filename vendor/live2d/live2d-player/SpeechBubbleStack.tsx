import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import type { SpeechBubbleMessage } from './types';
import './SpeechBubbleStack.css';

import bubbleImage from './assets/dialogue-bubble.png';
import departingImage from './assets/dialogue-bubble-departing.png';
const EXIT_DURATION_MS = 560;

export interface SpeechBubbleStackProps {
  /** The presenter supplies one current sentence, with an ID stable across text updates. */
  messages: SpeechBubbleMessage[];
  isTyping?: boolean;
  waitingLabel?: string;
  /** Reports a sentence only after its text fits or has been scrolled to the end. */
  onDisplayed?: (sentenceId: string) => void;
}

interface BubbleFrame {
  current: SpeechBubbleMessage | null;
  departing: SpeechBubbleMessage | null;
  revision: number;
}

function BubbleArtwork() {
  const clipId = useId();
  return <span className="speech-bubble__artwork" aria-hidden="true">
    <img className="speech-bubble__art speech-bubble__art--current" src={bubbleImage} alt="" draggable={false} />
    <svg className="speech-bubble__art speech-bubble__art--departing" viewBox="0 0 1774 887" preserveAspectRatio="none">
      <defs>
        <clipPath id={`${clipId}-frame`}><path d="M0 0H1774V887H548V608H310V887H0Z" /></clipPath>
        <clipPath id={`${clipId}-repair`}><path d="M308 604H550V657C440 657 360 657 308 648Z" /></clipPath>
      </defs>
      {/* Keep the original transparent artwork. Only the repaired lower border uses the edit. */}
      <image href={bubbleImage} width="1774" height="887" clipPath={`url(#${clipId}-frame)`} />
      <image href={departingImage} width="1774" height="887" clipPath={`url(#${clipId}-repair)`} />
    </svg>
  </span>;
}

export function SpeechBubbleStack({ messages, isTyping = false, onDisplayed, waitingLabel = 'Preparing speech' }: SpeechBubbleStackProps) {
  const latest = messages.at(-1);
  const [frame, setFrame] = useState<BubbleFrame>({ current: latest ?? null, departing: null, revision: 0 });
  const textRef = useRef<HTMLParagraphElement>(null);
  const reported = useRef('');
  const reportDisplayed = useCallback(() => {
    const paragraph = textRef.current;
    const message = frame.current;
    if (!onDisplayed || !paragraph || !message || document.visibilityState !== 'visible') return;
    const identity = JSON.stringify([message.id, message.text]);
    if (reported.current === identity || paragraph.scrollTop + paragraph.clientHeight < paragraph.scrollHeight - 1) return;
    const bounds = paragraph.getBoundingClientRect();
    const stage = paragraph.closest('.live2d-player')?.getBoundingClientRect();
    if (bounds.width === 0 || bounds.height === 0 || bounds.top < Math.max(0, stage?.top ?? 0)
      || bounds.bottom > Math.min(window.innerHeight, stage?.bottom ?? window.innerHeight)
      || bounds.left < Math.max(0, stage?.left ?? 0) || bounds.right > Math.min(window.innerWidth, stage?.right ?? window.innerWidth)
      || Number(getComputedStyle(paragraph.parentElement!).opacity) < 0.99) return;
    reported.current = identity;
    onDisplayed(message.id);
  }, [frame.current, onDisplayed]);

  useEffect(() => {
    const timer = window.setTimeout(reportDisplayed, 340);
    const observer = new ResizeObserver(reportDisplayed);
    if (textRef.current) observer.observe(textRef.current);
    document.addEventListener('visibilitychange', reportDisplayed);
    return () => { window.clearTimeout(timer); observer.disconnect(); document.removeEventListener('visibilitychange', reportDisplayed); };
  }, [reportDisplayed]);

  useLayoutEffect(() => {
    const next = latest?.text ? { id: latest.id, text: latest.text } : null;
    setFrame(previous => {
      if (previous.current?.id === next?.id) {
        return previous.current?.text === next?.text ? previous : { ...previous, current: next };
      }
      return {
        current: next,
        // Retain the outgoing sentence even when playback has cleared the input array.
        departing: previous.current ?? previous.departing,
        revision: previous.revision + 1,
      };
    });
  }, [latest?.id, latest?.text]);

  useEffect(() => {
    if (!frame.departing) return;
    const timer = window.setTimeout(() => setFrame(previous => ({ ...previous, departing: null })), EXIT_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [frame.departing, frame.revision]);

  if (!frame.current && !frame.departing && !isTyping) return null;

  return (
    <div className="speech-bubble-stack">
      {frame.departing && (
        <div key={`departing-${frame.revision}`} className="speech-bubble is-departing" aria-hidden="true">
          <BubbleArtwork />
          <p>{frame.departing.text}</p>
        </div>
      )}
      <div className="speech-bubble-live" role="status" aria-live="polite" aria-atomic="true">
        {frame.current ? (
          <div key={frame.current.id} className="speech-bubble is-current" data-sentence-id={frame.current.id} onAnimationEnd={reportDisplayed}>
            <BubbleArtwork />
            <p ref={textRef} tabIndex={frame.current.text.length > 100 ? 0 : undefined} onScroll={reportDisplayed}>{frame.current.text}</p>
          </div>
        ) : isTyping ? (
          <div className="speech-bubble is-current is-waiting" aria-label={waitingLabel}>
            <BubbleArtwork />
            <p aria-hidden="true"><span>·</span><span>·</span><span>·</span></p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
