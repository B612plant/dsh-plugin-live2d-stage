import { PriorityIdle } from './platform-define';

const CLOSE_MS = 75;
const OPEN_MS_MIN = 150;
const OPEN_MS_MAX = 300;
const INTERVAL_MIN = 3000;
const INTERVAL_MAX = 8000;
const LOOK_HOLD_MS = 900;

/**
 * 自动眨眼写绝对眼开度，自动看跟随指针，离开后做空闲眼球移动。
 * 优先级高于 PriorityIdle 时整段让给显式动作。
 */
export class IdleLife {
  private phase: 'idle' | 'closing' | 'opening' = 'idle';
  private phaseStart = 0;
  private openDuration = OPEN_MS_MIN;
  private nextBlinkAt = performance.now() + this.nextInterval();
  private lookX = 0;
  private lookY = 0;
  private gazeX = 0;
  private gazeY = 0;
  private lookUntil = 0;
  private nextSaccadeAt = performance.now() + 1200;
  private saccadeX = 0;
  private saccadeY = 0;

  shouldYield(priority: number): boolean {
    return priority > PriorityIdle;
  }

  /** 指针在画面内时更新注视目标，坐标约 -1 到 1。 */
  setLook(x: number, y: number, nowMs: number): void {
    this.lookX = clamp(x, -1, 1);
    this.lookY = clamp(y, -1, 1);
    this.lookUntil = nowMs + LOOK_HOLD_MS;
  }

  /**
   * 返回本帧要写入的参数。眼开度是绝对值，眼球是平滑后的目标。
   * openBase 用模型默认睁眼值；默认值过低时按 1 处理。
   */
  frame(nowMs: number, openBase: number): Array<[string, number]> {
    const looking = nowMs < this.lookUntil;
    const goalX = looking ? this.lookX : this.saccade(nowMs, 'x');
    const goalY = looking ? this.lookY : this.saccade(nowMs, 'y');
    this.gazeX += (goalX - this.gazeX) * 0.18;
    this.gazeY += (goalY - this.gazeY) * 0.18;
    const eye = Math.max(openBase, 1) * this.blinkFactor(nowMs);
    return [
      ['ParamEyeLOpen', eye],
      ['ParamEyeROpen', eye],
      ['ParamEyeBallX', this.gazeX * 0.85],
      ['ParamEyeBallY', this.gazeY * 0.65],
      ['ParamAngleX', this.gazeX * 12],
      ['ParamAngleY', this.gazeY * 8],
    ];
  }

  private saccade(nowMs: number, axis: 'x' | 'y'): number {
    if (nowMs >= this.nextSaccadeAt) {
      this.saccadeX = (Math.random() * 2 - 1) * 0.35;
      this.saccadeY = (Math.random() * 2 - 1) * 0.22;
      this.nextSaccadeAt = nowMs + 1400 + Math.random() * 1800;
    }
    return axis === 'x' ? this.saccadeX : this.saccadeY;
  }

  private blinkFactor(nowMs: number): number {
    if (this.phase === 'idle') {
      if (nowMs < this.nextBlinkAt) {
        return 1;
      }
      this.phase = 'closing';
      this.phaseStart = nowMs;
    }
    if (this.phase === 'closing') {
      const t = Math.min(1, (nowMs - this.phaseStart) / CLOSE_MS);
      if (t >= 1) {
        this.phase = 'opening';
        this.phaseStart = nowMs;
        this.openDuration = OPEN_MS_MIN + Math.random() * (OPEN_MS_MAX - OPEN_MS_MIN);
        return 0;
      }
      const remain = 1 - t;
      return remain * remain;
    }
    const t = Math.min(1, (nowMs - this.phaseStart) / this.openDuration);
    if (t >= 1) {
      this.phase = 'idle';
      this.nextBlinkAt = nowMs + this.nextInterval();
      return 1;
    }
    return t * t;
  }

  private nextInterval(): number {
    return INTERVAL_MIN + Math.random() * (INTERVAL_MAX - INTERVAL_MIN);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
