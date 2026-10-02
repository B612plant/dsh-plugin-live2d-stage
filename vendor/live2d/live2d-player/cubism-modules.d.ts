/**
 * Cubism SDK samples are compiled by Vite through aliases, but the upstream
 * sources intentionally use non-strict TypeScript. Keep that boundary out of
 * this library's strict typecheck.
 */
declare module '@framework/live2dcubismframework' {
  export const CubismFramework: any;
  export class Option {
    [key: string]: any;
  }
  export enum LogLevel {
    LogLevel_Warning = 3,
  }
}

declare module '@framework/utils/cubismdebug' {
  export const CubismLogError: (...args: any[]) => void;
}

declare module '@framework/math/cubismmatrix44' {
  export class CubismMatrix44 {
    [key: string]: any;
  }
}

declare module '@framework/motion/acubismmotion' {
  export class ACubismMotion {
    [key: string]: any;
  }
}

declare module '@framework/motion/cubismmotionqueuemanager' {
  export const InvalidMotionQueueEntryHandleValue: any;
}

declare module '@framework/rendering/cubismoffscreenmanager' {
  export const CubismWebGLOffscreenManager: any;
}

declare module '@live2d-sample/lapppal' {
  export const LAppPal: any;
}

declare module '@live2d-sample/lappmodel' {
  export class LAppModel {
    [key: string]: any;
  }
}

declare module '@live2d-sample/lapptexturemanager' {
  export class LAppTextureManager {
    [key: string]: any;
  }
}

declare module '@live2d-sample/lappview' {
  export class LAppView {
    [key: string]: any;
  }
}
