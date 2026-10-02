import { defaultPlayerTranslator, type PlayerTranslator } from './messages';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { RuntimeDiagnostics } from './types';
import { PlatformDelegate } from './engine/PlatformDelegate';
import { setActiveCharacter } from './engine/platform-define';
import type { CharacterInfo, Live2DActor } from './types';
import { toActiveRuntime } from './types';

function waitForCanvasSize(canvas: HTMLCanvasElement, signal: AbortSignal): Promise<boolean> {
  return new Promise((resolve) => {
    let frame = 0;
    const stop = () => { cancelAnimationFrame(frame); resolve(false); };
    signal.addEventListener('abort', stop, {once:true});
    const check = () => {
      if (signal.aborted) { stop(); return; }
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth > 0 && clientHeight > 0) {
        signal.removeEventListener('abort', stop);
        resolve(true);
        return;
      }
      frame = requestAnimationFrame(check);
    };
    check();
  });
}

export function useLive2DPlayer(character: CharacterInfo | null, translate: PlayerTranslator = defaultPlayerTranslator) {
  const translateRef = useRef(translate);
  translateRef.current = translate;
  const t: PlayerTranslator = (message, values) => translateRef.current(message, values);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const initializedRef = useRef(false);
  const bootCharacterRef = useRef<CharacterInfo | null>(null);
  if (character?.defaultModel3Json && !bootCharacterRef.current) {
    bootCharacterRef.current = character;
  }
  const bootCharacter = bootCharacterRef.current;
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<RuntimeDiagnostics>({
    status: 'idle',
    message: t("等待初始化"),
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const initial = bootCharacterRef.current;
    if (!canvas || !initial) {
      return;
    }

    let disposed = false;
    const lifetime = new AbortController();

    const boot = async () => {
      setDiagnostics({ status: 'initializing', message: t("正在加载 Live2D 角色...") });
      if (!await waitForCanvasSize(canvas, lifetime.signal)) return;
      if (disposed) {
        return;
      }

      const runtime = toActiveRuntime(initial);
      setActiveCharacter(runtime);
      setActiveCharacterId(runtime.id);

      const delegate = PlatformDelegate.getInstance();
      const initialized = delegate.initialize(canvas);
      if (!initialized) {
        setDiagnostics({ status: 'error', message: t("Live2D 初始化失败，请确认浏览器支持 WebGL2") });
        return;
      }

      delegate.switchCharacter(runtime);
      delegate.onResize();
      delegate.run();
      initializedRef.current = true;
      setDiagnostics({ status: 'ready', message: t("{0} 已就绪", [runtime.name]) });
    };

    void boot().catch(error => {
      if (!disposed) setDiagnostics({status:'error', message:error instanceof Error ? error.message : String(error)});
    });

    const onWindowResize = () => {
      PlatformDelegate.getInstance().onResize();
    };
    window.addEventListener('resize', onWindowResize);

    return () => {
      disposed = true;
      lifetime.abort();
      initializedRef.current = false;
      window.removeEventListener('resize', onWindowResize);
      PlatformDelegate.releaseInstance();
      setDiagnostics({ status: 'idle', message: t("已卸载") });
    };
  }, [bootCharacter?.id]);

  const switchCharacter = useCallback((next: CharacterInfo) => {
    if (!initializedRef.current || !next.defaultModel3Json) {
      return;
    }

    const runtime = toActiveRuntime(next);
    setActiveCharacter(runtime);
    setActiveCharacterId(runtime.id);
    setDiagnostics({ status: 'initializing', message: t("正在切换至 {0}...", [runtime.name]) });

    const delegate = PlatformDelegate.getInstance();
    delegate.switchCharacter(runtime);
    delegate.onResize();
    setDiagnostics({ status: 'ready', message: t("{0} 已就绪", [runtime.name]) });
  }, []);

  const actor: Live2DActor = {
    playMotion: async (group: string, index = 0) => {
      if (!initializedRef.current) {
        return false;
      }
      return PlatformDelegate.getInstance().playMotion(group, index);
    },
    resetFacing: () => {
      if (!initializedRef.current) {
        return;
      }
      PlatformDelegate.getInstance().resetFacing();
    },
    setLipSyncValue: (value: number) => {
      if (!initializedRef.current) {
        return;
      }
      PlatformDelegate.getInstance().setLipSyncValue(value);
    },
    setExpression: (expressionId: string) => {
      if (!initializedRef.current) {
        return false;
      }
      return PlatformDelegate.getInstance().setExpression(expressionId);
    },
    setParamOverlay: (overlay) => {
      if (!initializedRef.current) {
        return;
      }
      PlatformDelegate.getInstance().setParamOverlay(overlay);
    },
    getParameterValue: (paramId: string) => {
      if (!initializedRef.current) {
        return 0;
      }
      return PlatformDelegate.getInstance().getParameterValue(paramId);
    },
    setParameterValue: (paramId: string, value: number) => {
      if (!initializedRef.current) {
        return;
      }
      PlatformDelegate.getInstance().setParameterValue(paramId, value);
    },
  };

  return {
    canvasRef,
    diagnostics,
    activeCharacterId,
    switchCharacter,
    actor,
  };
}
