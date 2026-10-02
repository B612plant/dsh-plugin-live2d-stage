import { defaultPlayerTranslator, type PlayerTranslator } from './messages';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import type { CharacterInfo, Live2DPlayerHandle } from './types';
import { useLive2DPlayer } from './useLive2DPlayer';
import './Live2DPlayer.css';

export interface Live2DPlayerProps {
  character: CharacterInfo | null;
  className?: string;
  hint?: string | null;
  children?: ReactNode;
  interactive?: boolean;
  translate?: PlayerTranslator;
}

export const Live2DPlayer = forwardRef<Live2DPlayerHandle, Live2DPlayerProps>(
  function Live2DPlayer({ character, className, translate: t = defaultPlayerTranslator, hint = t("拖拽移动画面 · 滚轮缩放"), children, interactive = true }, ref) {
    const { canvasRef, diagnostics, activeCharacterId, switchCharacter, actor } =
      useLive2DPlayer(character, t);
    const actorRef = useRef(actor);
    actorRef.current = actor;
    const switchRef = useRef(switchCharacter);
    switchRef.current = switchCharacter;
    const diagnosticsRef = useRef(diagnostics);
    diagnosticsRef.current = diagnostics;

    const loadedModel = useRef('');
    const modelKey = character?.defaultModel3Json ? JSON.stringify([character.id, character.resourcesPath, character.defaultModelDir, character.defaultModel3Json]) : '';
    if (!loadedModel.current && modelKey) loadedModel.current = modelKey;
    useEffect(() => {
      if (!character || !modelKey || !activeCharacterId || diagnostics.status !== 'ready' || loadedModel.current === modelKey) return;
      loadedModel.current = modelKey;
      switchRef.current(character);
    }, [character, activeCharacterId, diagnostics.status, modelKey]);

    useImperativeHandle(ref, () => ({
      playMotion: (group, index) => actorRef.current.playMotion(group, index),
      resetFacing: () => actorRef.current.resetFacing(),
      setLipSyncValue: (value) => actorRef.current.setLipSyncValue(value),
      setExpression: (expressionId) => actorRef.current.setExpression(expressionId),
      setParamOverlay: (overlay) => actorRef.current.setParamOverlay?.(overlay ?? null),
      getParameterValue: (paramId) => actorRef.current.getParameterValue?.(paramId) ?? 0,
      setParameterValue: (paramId, value) => actorRef.current.setParameterValue?.(paramId, value),
      switchCharacter: (next) => switchRef.current(next),
      getDiagnostics: () => diagnosticsRef.current,
    }), []);

    const classes = ['live2d-player', className].filter(Boolean).join(' ');

    return (
      <div className={classes} aria-label={t("Live2D 角色舞台")}>
        <canvas ref={canvasRef} className="live2d-player__canvas" style={{visibility:character?.defaultModel3Json?'visible':'hidden'}} data-interactive={interactive && Boolean(character?.defaultModel3Json)} />
        {character && !character.defaultModel3Json && <div className="live2d-player__status">{t("请在动画资源中为当前角色选择模型")}</div>}
        {children}
        {hint ? (
          <div className="live2d-player__hint" aria-hidden>
            {hint}
          </div>
        ) : null}
        {diagnostics.status === 'initializing' && (
          <div className="live2d-player__status">{t("角色加载中...")}</div>
        )}
        {diagnostics.status === 'error' && (
          <div className="live2d-player__status live2d-player__status--error">
            {diagnostics.message}
          </div>
        )}
      </div>
    );
  },
);
