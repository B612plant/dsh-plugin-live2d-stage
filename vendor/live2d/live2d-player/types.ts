export type RuntimeStatus = 'idle' | 'initializing' | 'ready' | 'error';

export interface RuntimeDiagnostics {
  status: RuntimeStatus;
  message: string;
}

export interface CharacterHitArea {
  name: string;
  id: string;
}

export interface CharacterModelInfo {
  expressionNames?: Record<string, string>;
  model3Json: string;
  modelDir: string;
  resourcesPath: string;
  assetsPath: string;
  motionGroups: Record<string, string[]>;
  hitAreas: CharacterHitArea[];
  idleGroup: string | null;
  texture: string | null;
}

export interface CharacterInfo {
  canonicalId?: string;
  canonicalName?: string;
  expressionNames?: Record<string, string>;
  id: string;
  name: string;
  resourcesPath: string;
  defaultModelDir: string;
  defaultModel3Json: string;
  icon: string;
  models: CharacterModelInfo[];
  idleGroup: string | null;
  motionGroups: Record<string, string[]>;
  hitAreas: CharacterHitArea[];
}

export interface CharacterManifest {
  syncedAt: string;
  defaultCharacterId: string | null;
  characters: CharacterInfo[];
}

export interface ActiveCharacterRuntime {
  expressionNames?: Record<string, string>;
  id: string;
  name: string;
  resourcesPath: string;
  modelDir: string;
  model3Json: string;
  idleGroup: string | null;
  motionGroups: Record<string, string[]>;
  hitAreas: CharacterHitArea[];
}

/** 业务层驱动播放器的最小命令面，不暴露 Cubism 单例。 */
export interface Live2DActor {
  playMotion(group: string, index?: number): Promise<boolean>;
  resetFacing(): void;
  setLipSyncValue(value: number): void;
  setExpression(expressionId: string): boolean;
  /** 每帧叠参（keyframe / blink）；传 null 清除。 */
  setParamOverlay?(
    overlay: ((getParam: (id: string) => number, setParam: (id: string, value: number) => void) => void) | null,
  ): void;
  getParameterValue?(paramId: string): number;
  setParameterValue?(paramId: string, value: number): void;
}

export interface Live2DPlayerHandle extends Live2DActor {
  switchCharacter(character: CharacterInfo): void;
  getDiagnostics(): RuntimeDiagnostics;
}

export interface SpeechBubbleMessage {
  id: string;
  text: string;
}

export function toActiveRuntime(character: CharacterInfo): ActiveCharacterRuntime {
  return {
    expressionNames: character.expressionNames,
    id: character.id,
    name: character.name,
    resourcesPath: character.resourcesPath,
    modelDir: character.defaultModelDir,
    model3Json: character.defaultModel3Json,
    idleGroup: character.idleGroup,
    motionGroups: character.motionGroups,
    hitAreas: character.hitAreas,
  };
}
