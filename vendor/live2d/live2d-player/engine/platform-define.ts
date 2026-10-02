/// <reference path="../cubism-modules.d.ts" />
import type { ActiveCharacterRuntime } from '../types';

export let ResourcesPath = '/character/hiyori/';
export let ShaderPath = '/api/nirei/live2d/shaders/';
export let BackImageName = 'back_transparent.png';
export let GearImageName = 'back_transparent.png';
export let PowerImageName = 'back_transparent.png';

export let ModelDir: string[] = ['hiyori_free_t08'];
export let ModelDirSize = ModelDir.length;
export let ModelJsonNames: string[] = ['hiyori_free_t08.model3.json'];

export let MotionGroupIdle = 'Idle';
export let MotionGroupTapBody = 'Tap@Body';
export let HitAreaNameHead = 'Head';
export let HitAreaNameBody = 'Body';

/** 自动循环 Idle；或者由动作面板或智能体参数触发动作 */
export const EnableAutoIdleMotion = true;
/** 禁止点击角色随机播放动作 */
export const EnableTapMotion = false;

export let ActiveCharacter: ActiveCharacterRuntime | null = null;

export function setActiveCharacter(runtime: ActiveCharacterRuntime): void {
  ActiveCharacter = runtime;
  ResourcesPath = runtime.resourcesPath;
  ModelDir = runtime.modelDir === '.' ? [''] : [runtime.modelDir];
  ModelJsonNames = [runtime.model3Json];
  ModelDirSize = ModelDir.length;
  MotionGroupIdle = runtime.idleGroup ?? 'Idle';
  MotionGroupTapBody = pickTapGroup(runtime.motionGroups) ?? MotionGroupIdle;
  HitAreaNameHead = runtime.hitAreas[0]?.name ?? 'Head';
  HitAreaNameBody = runtime.hitAreas[1]?.name ?? runtime.hitAreas[0]?.name ?? 'Body';
}

function pickTapGroup(motionGroups: Record<string, string[]>): string | null {
  const keys = Object.keys(motionGroups);
  const preferred = keys.find((key) => /^Tap/i.test(key) || key.includes('Body') || key.includes('脸'));
  return preferred ?? keys.find((key) => key !== 'Idle') ?? null;
}

// Canvas / view constants
import { LogLevel } from '@framework/live2dcubismframework';

export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';
export const CanvasNum = 1;
export const ViewScale = 1.0;
export const ViewMaxScale = 2.0;
export const ViewMinScale = 0.8;
export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;
export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;
export const MOCConsistencyValidationEnable = true;
export const MotionConsistencyValidationEnable = true;
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Warning;
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
