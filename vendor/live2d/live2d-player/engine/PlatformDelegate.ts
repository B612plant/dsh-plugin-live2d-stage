/// <reference path="../cubism-modules.d.ts" />
import { CubismFramework, Option } from '@framework/live2dcubismframework';
import { CubismLogError } from '@framework/utils/cubismdebug';
import { LAppPal } from '@live2d-sample/lapppal';
import { LAppSubdelegate } from './platform-subdelegate';
import * as PlatformDefine from './platform-define';
import type { ActiveCharacterRuntime } from '../types';
import { setActiveCharacter } from './platform-define';

let instance: PlatformDelegate | null = null;

export class PlatformDelegate {
  private readonly cubismOption = new Option();
  private subdelegate: LAppSubdelegate | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private rafId = 0;
  private pointerDown: ((event: PointerEvent) => void) | null = null;
  private pointerMove: ((event: PointerEvent) => void) | null = null;
  private pointerUp: ((event: PointerEvent) => void) | null = null;
  private pointerCancel: ((event: PointerEvent) => void) | null = null;
  private wheel: ((event: WheelEvent) => void) | null = null;

  static getInstance(): PlatformDelegate {
    if (!instance) {
      instance = new PlatformDelegate();
    }
    return instance;
  }

  static releaseInstance(): void {
    instance?.release();
    instance = null;
  }

  initialize(canvas: HTMLCanvasElement): boolean {
    this.canvas = canvas;
    LAppPal.updateTime();
    this.cubismOption.logFunction = LAppPal.printMessage;
    this.cubismOption.loggingLevel = PlatformDefine.CubismLoggingLevel;
    CubismFramework.startUp(this.cubismOption);
    CubismFramework.initialize();

    this.subdelegate = new LAppSubdelegate();
    if (!this.subdelegate.initialize(canvas)) {
      return false;
    }

    if (this.subdelegate.isContextLost()) {
      CubismLogError('WebGL context was lost during Live2D initialization.');
      return false;
    }

    this.bindPointerEvents();
    return true;
  }

  run(): void {
    const loop = (): void => {
      if (!instance || !this.subdelegate) {
        return;
      }
      LAppPal.updateTime();
      this.subdelegate.update();
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  onResize(): void {
    this.subdelegate?.onResize();
  }

  /** Copy immediately after rendering, before WebGL discards its drawing buffer. */
  snapshot():HTMLCanvasElement|null {
    if(!this.canvas||!this.subdelegate)return null;
    LAppPal.updateTime();this.subdelegate.update();
    const copy=document.createElement('canvas');copy.width=this.canvas.width;copy.height=this.canvas.height;
    copy.getContext('2d')!.drawImage(this.canvas,0,0);return copy;
  }
  portraitHead(){return this.subdelegate?.getLive2DManager().portraitHead??null;}

  switchCharacter(runtime: ActiveCharacterRuntime): void {
    setActiveCharacter(runtime);
    this.subdelegate?.getLive2DManager().switchCharacter(
      runtime.resourcesPath,
      runtime.modelDir,
      runtime.model3Json
    );
    this.subdelegate?.getLive2DManager().resetFacing();
  }

  /**
   * 播放指定动作（仅显式调用；不会自动 Idle / 点击触发）
   * 动作结束后 resolve
   */
  playMotion(group: string, index = 0): Promise<boolean> {
    return (
      this.subdelegate?.getLive2DManager().playMotion(group, index) ??
      Promise.resolve(false)
    );
  }

  resetFacing(): void {
    this.subdelegate?.getLive2DManager().resetFacing();
  }

  setLipSyncValue(value: number): void {
    this.subdelegate?.getLive2DManager().setLipSyncValue(value);
  }

  setParamOverlay(overlay: import('./platform-live2dmanager').ParamOverlayFn | null): void {
    this.subdelegate?.getLive2DManager().setParamOverlay(overlay);
  }

  getParameterValue(paramId: string): number {
    return this.subdelegate?.getLive2DManager().getParameterValue(paramId) ?? 0;
  }

  setLookTarget(x: number, y: number): void {
    this.subdelegate?.getLive2DManager().setLookTarget(x, y);
  }

  setParameterValue(paramId: string, value: number): void {
    this.subdelegate?.getLive2DManager().setParameterValue(paramId, value);
  }

  setExpression(expressionId: string): boolean {
    return this.subdelegate?.getLive2DManager().setExpression(expressionId) ?? false;
  }

  private bindPointerEvents(): void {
    this.pointerDown = (event: PointerEvent): void => {
      if (this.canvas?.dataset.interactive === 'false') return;
      if (event.pointerType === 'mouse' && event.button !== 0) {
        return;
      }
      this.canvas?.setPointerCapture(event.pointerId);
      this.subdelegate?.onPointBegan(event.clientX, event.clientY);
    };
    this.pointerMove = (event: PointerEvent): void => {
      if (this.canvas?.dataset.interactive === 'false') return;
      this.subdelegate?.noteLook(event.clientX, event.clientY);
      this.subdelegate?.onPointMoved(event.clientX, event.clientY);
    };
    this.pointerUp = (event: PointerEvent): void => {
      this.subdelegate?.onPointEnded(event.clientX, event.clientY);
      if (this.canvas?.hasPointerCapture(event.pointerId)) {
        this.canvas.releasePointerCapture(event.pointerId);
      }
    };
    this.pointerCancel = (event: PointerEvent): void => {
      this.subdelegate?.onTouchCancel(event.clientX, event.clientY);
    };
    this.wheel = (event: WheelEvent): void => {
      if (this.canvas?.dataset.interactive === 'false') return;
      event.preventDefault();
      this.subdelegate?.onWheel(event.clientX, event.clientY, event.deltaY);
    };

    this.canvas?.addEventListener('pointerdown', this.pointerDown, { passive: true });
    this.canvas?.addEventListener('pointermove', this.pointerMove, { passive: true });
    this.canvas?.addEventListener('pointerup', this.pointerUp, { passive: true });
    this.canvas?.addEventListener('pointercancel', this.pointerCancel, { passive: true });
    this.canvas?.addEventListener('wheel', this.wheel, { passive: false });
  }

  private releasePointerEvents(): void {
    if (this.pointerDown) {
      this.canvas?.removeEventListener('pointerdown', this.pointerDown);
    }
    if (this.pointerMove) {
      this.canvas?.removeEventListener('pointermove', this.pointerMove);
    }
    if (this.pointerUp) {
      this.canvas?.removeEventListener('pointerup', this.pointerUp);
    }
    if (this.pointerCancel) {
      this.canvas?.removeEventListener('pointercancel', this.pointerCancel);
    }
    if (this.wheel) {
      this.canvas?.removeEventListener('wheel', this.wheel);
    }
    this.pointerDown = null;
    this.pointerMove = null;
    this.pointerUp = null;
    this.pointerCancel = null;
    this.wheel = null;
  }

  private release(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
    this.releasePointerEvents();
    this.subdelegate?.release();
    this.subdelegate = null;
    CubismFramework.dispose();
    this.canvas = null;
  }
}
