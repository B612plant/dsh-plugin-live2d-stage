/// <reference path="../cubism-modules.d.ts" />
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { CubismFramework } from '@framework/live2dcubismframework';
import { CubismMatrix44 } from '@framework/math/cubismmatrix44';
import { ACubismMotion } from '@framework/motion/acubismmotion';
import { InvalidMotionQueueEntryHandleValue } from '@framework/motion/cubismmotionqueuemanager';
import { CubismWebGLOffscreenManager } from '@framework/rendering/cubismoffscreenmanager';

import * as LAppDefine from './platform-define';
import { LAppModel } from '@live2d-sample/lappmodel';
import { LAppPal } from '@live2d-sample/lapppal';
import { LAppSubdelegate } from './platform-subdelegate';
import {
  applyWatermarkSkip,
  hasWatermarkSkip,
  loadWatermarkSkipPlan,
  type WatermarkSkipPlan,
} from './watermarkSkip';
import { IdleLife } from './idleLife';

export type ParamOverlayFn = (
  getParam: (paramId: string) => number,
  setParam: (paramId: string, value: number) => void,
) => void;

/**
 * サンプルアプリケーションにおいてCubismModelを管理するクラス
 * モデル生成と破棄、タップイベントの処理、モデル切り替えを行う。
 */
export class LAppLive2DManager {
  public portraitHead:{x:number;y:number;width:number;height:number}|null=null;
  private _lipSyncValue = 0;
  private _watermarkPlan: WatermarkSkipPlan = { parameters: [], parts: [] };
  private _watermarkLoadToken = 0;
  private _paramOverlay: ParamOverlayFn | null = null;
  private readonly _idleLife = new IdleLife();
  /**
   * 現在のシーンで保持しているすべてのモデルを解放する
   */
  private releaseAllModel(): void {
    this._models.length = 0;
  }

  public setOffscreenSize(width: number, height: number): void {
    for (let i = 0; i < this._models.length; i++) {
      const model: LAppModel = this._models[i];
      model?.setRenderTargetSize(width, height);
    }
  }

  /**
   * 画面をドラッグした時の処理
   * 保持正对屏幕：不根据拖拽偏移头部朝向
   *
   * @param x 画面のX座標
   * @param y 画面のY座標
   */
  public onDrag(_x: number, _y: number): void {
    const model: LAppModel = this._models[0];
    if (model) {
      model.setDragging(0.0, 0.0);
    }
  }

  /**
   * 画面をタップした時の処理
   * 默认禁用随机动作；仅 playMotion / 智能体参数可播放
   *
   * @param x 画面のX座標
   * @param y 画面のY座標
   */
  public onTap(x: number, y: number): void {
    if (!LAppDefine.EnableTapMotion) {
      return;
    }

    if (LAppDefine.DebugLogEnable) {
      LAppPal.printMessage(
        `[APP]tap point: {x: ${x.toFixed(2)} y: ${y.toFixed(2)}}`
      );
    }

    const model: LAppModel = this._models[0];
    if (!model) {
      return;
    }

    const runtime = LAppDefine.ActiveCharacter;
    const hitAreas = runtime?.hitAreas ?? [
      { name: LAppDefine.HitAreaNameHead, id: 'Head' },
      { name: LAppDefine.HitAreaNameBody, id: 'Body' },
    ];
    const motionGroups = runtime?.motionGroups ?? {};

    for (const area of hitAreas) {
      if (!model.hitTest(area.name, x, y)) {
        continue;
      }

      if (LAppDefine.DebugLogEnable) {
        LAppPal.printMessage(`[APP]hit area: [${area.name}]`);
      }

      const motionGroup = findMotionGroupForHitArea(area.name, motionGroups);
      if (motionGroup) {
        model.startRandomMotion(
          motionGroup,
          LAppDefine.PriorityNormal,
          this.finishedMotion,
          this.beganMotion
        );
        return;
      }

      model.setRandomExpression();
      return;
    }

    const fallbackGroup =
      LAppDefine.MotionGroupTapBody ??
      Object.keys(motionGroups).find((key) => /^Tap/i.test(key));
    if (fallbackGroup) {
      model.startRandomMotion(
        fallbackGroup,
        LAppDefine.PriorityNormal,
        this.finishedMotion,
        this.beganMotion
      );
    }
  }

  /**
   * 播放指定动作组内第 index 个动作（0-based）
   * 返回 Promise：动作结束（或超时/失败）后 resolve
   *
   * 注意：首次播放若动作尚未进缓存，startMotion 会异步加载；
   * 不可因返回 Invalid 立即判失败，需等待 finished 回调。
   */
  public playMotion(group: string, index = 0, timeoutMs = 15000): Promise<boolean> {
    const model: LAppModel = this._models[0];
    if (!model || !group) {
      console.warn('[live2d] playMotion: no model', group);
      return Promise.resolve(false);
    }

    const runtime = LAppDefine.ActiveCharacter;
    const motions = runtime?.motionGroups?.[group];
    if (!motions || motions.length === 0) {
      console.warn('[live2d] playMotion: group missing in runtime', group, runtime?.id);
      LAppPal.printMessage(`[APP]motion group not found: ${group}`);
      return Promise.resolve(false);
    }

    const no = Math.max(0, Math.min(index, motions.length - 1));
    const file = motions[no] ?? '';
    if (/\.exp3(\.json)?$/i.test(file)) {
      const name = file.split(/[\\/]/).pop()?.replace(/\.exp3(\.json)?$/i, '') ?? file;
      stopExpressionQueue(model);
      const ok = this.setExpression(name) || this.setExpression(file);
      LAppPal.printMessage(`[APP]play expression: ${name} ok=${ok}`);
      return Promise.resolve(ok);
    }
    LAppPal.printMessage(`[APP]play motion: ${group}[${no}]`);

    return new Promise((resolve) => {
      let settled = false;
      const finish = (ok: boolean) => {
        if (settled) {
          return;
        }
        settled = true;
        window.clearTimeout(timer);
        resolve(ok);
      };

      const timer = window.setTimeout(() => {
        LAppPal.printMessage(`[APP]motion timeout: ${group}[${no}]`);
        finish(true);
      }, timeoutMs);

      const onFinished = (self: ACubismMotion): void => {
        this.finishedMotion(self);
        finish(true);
      };

      const onBegan = (self: ACubismMotion): void => {
        this.beganMotion(self);
      };

      const handle = model.startMotion(
        group,
        no,
        LAppDefine.PriorityForce,
        onFinished,
        onBegan
      );

      // Invalid 可能表示「正在异步加载」——不要立刻 fail，等回调或超时
      if (handle === InvalidMotionQueueEntryHandleValue) {
        LAppPal.printMessage(
          `[APP]motion start pending/async: ${group}[${no}]`
        );
      }
    });
  }

  /** 复位头部朝向，保持正对屏幕 */
  public resetFacing(): void {
    const model: LAppModel = this._models[0];
    if (model) {
      model.setDragging(0.0, 0.0);
    }
  }

  /** 仅写入 model3.json 声明的全部 LipSync 参数。 */
  public setLipSyncValue(value: number): void {
    this._lipSyncValue = Math.max(0, Math.min(1, value));
  }

  /** 每帧在 model.update 之后、draw 之前调用，用于 keyframe / blink 叠参。 */
  public setParamOverlay(overlay: ParamOverlayFn | null): void {
    this._paramOverlay = overlay;
  }

  public getParameterValue(paramId: string): number {
    const model: LAppModel = this._models[0];
    const cubismModel = model?.getModel();
    if (!cubismModel || !paramId) {
      return 0;
    }
    try {
      const id = CubismFramework.getIdManager().getId(paramId);
      return cubismModel.getParameterValueById(id);
    } catch {
      return 0;
    }
  }

  public setParameterValue(paramId: string, value: number): void {
    const model: LAppModel = this._models[0];
    const cubismModel = model?.getModel();
    if (!cubismModel || !paramId) {
      return;
    }
    try {
      const id = CubismFramework.getIdManager().getId(paramId);
      cubismModel.setParameterValueById(id, value);
    } catch {
      /* ignore unknown param */
    }
  }

  /** 指针在画面上时驱动自动看。坐标为相对画布中心的 -1 到 1。 */
  public setLookTarget(x: number, y: number): void {
    this._idleLife.setLook(x, y, performance.now());
  }

  /**
   * 低优先级眨眼、注视和空闲眼动。显式动作使用 PriorityForce，播放期间不写这些参数。
   * 眨眼写成绝对眼开度：缺少 Cubism EyeBlink 分组的模型，乘当前值会在动作为 0 之后一直闭眼。
   */
  private applyIdleLife(model: LAppModel): void {
    const priority = model._motionManager?.getCurrentPriority?.() ?? LAppDefine.PriorityNone;
    if (this._idleLife.shouldYield(priority)) {
      return;
    }
    const cubismModel = model.getModel();
    if (!cubismModel) {
      return;
    }
    const idManager = CubismFramework.getIdManager();
    const parameterCount = cubismModel.getParameterCount();
    const eyeHandle = idManager.getId('ParamEyeLOpen');
    const eyeIndex = cubismModel.getParameterIndex(eyeHandle);
    const eyeDefault = eyeIndex >= 0 && eyeIndex < parameterCount
      ? cubismModel.getParameterDefaultValue(eyeIndex)
      : 1;
    for (const [paramId, value] of this._idleLife.frame(performance.now(), eyeDefault > 0.2 ? eyeDefault : 1)) {
      const handle = idManager.getId(paramId);
      const index = cubismModel.getParameterIndex(handle);
      if (index < 0 || index >= parameterCount) {
        continue;
      }
      cubismModel.setParameterValueById(handle, value);
    }
  }

  /** 只允许使用模型已加载的本地 Expression。 */
  public setExpression(expressionId: string): boolean {
    expressionId = LAppDefine.ActiveCharacter?.expressionNames?.[expressionId] || expressionId;
    const model: LAppModel = this._models[0];
    if (!model || !model._expressions.has(expressionId)) {
      return false;
    }
    model.setExpression(expressionId);
    return true;
  }

  /**
   * 画面を更新するときの処理
   * モデルの更新処理及び描画処理を行う
   */
  public onUpdate(): void {
    // 全てのモデルの描画処理開始前に、フレームごとのリセットフラグをクリアする
    const gl = this._subdelegate.getGl();
    CubismWebGLOffscreenManager.getInstance().beginFrameProcess(gl);

    const { width, height } = this._subdelegate.getCanvas();

    const projection: CubismMatrix44 = new CubismMatrix44();
    const model: LAppModel = this._models[0];

    if (!model) {
      CubismWebGLOffscreenManager.getInstance().endFrameProcess(gl);
      return;
    }

    if (model.getModel()) {
      if (model.getModel().getCanvasWidth() > 1.0 && width < height) {
        // 横に長いモデルを縦長ウィンドウに表示する際モデルの横サイズでscaleを算出する
        model.getModelMatrix().setWidth(2.0);
        projection.scale(1.0, width / height);
      } else {
        projection.scale(height / width, 1.0);
      }

      // 必要があればここで乗算
      if (this._viewMatrix != null) {
        projection.multiplyByMatrix(this._viewMatrix);
      }
    }

    const portrait=this._subdelegate.getCanvas().dataset.portrait==='true';
    if(!portrait)model.update();
    const cubismModel = model.getModel();
    if(portrait&&cubismModel)cubismModel.update();
    for (const parameterId of model._lipSyncIds) {
      cubismModel.setParameterValueById(parameterId, this._lipSyncValue);
    }
    if (this._paramOverlay) {
      const idManager = CubismFramework.getIdManager();
      this._paramOverlay(
        (paramId) => {
          try {
            return cubismModel.getParameterValueById(idManager.getId(paramId));
          } catch {
            return 0;
          }
        },
        (paramId, value) => {
          try {
            cubismModel.setParameterValueById(idManager.getId(paramId), value);
          } catch {
            /* ignore */
          }
        },
      );
    }
    if(!portrait)this.applyIdleLife(model);
    if (hasWatermarkSkip(this._watermarkPlan)) {
      applyWatermarkSkip(
        cubismModel,
        CubismFramework.getIdManager(),
        this._watermarkPlan
      );
    }
    // Commit post-motion eye/lip/overlay parameters to drawable vertices before rendering.
    if(cubismModel)cubismModel.update();
    model.draw(projection); // 参照渡しなのでprojectionは変質する。
    if(portrait&&cubismModel){
      const head=LAppDefine.ActiveCharacter?.hitAreas.find(area=>/head|face|头|脸/i.test(area.name));
      if(head){
        const index=cubismModel.getDrawableIndex(CubismFramework.getIdManager().getId(head.id));
        if(index>=0){const vertices=cubismModel.getDrawableVertices(index);let left=Infinity,right=-Infinity,top=Infinity,bottom=-Infinity;
          for(let i=0;i<vertices.length;i+=2){const x=(projection.transformX(vertices[i])+1)*width/2,y=(1-projection.transformY(vertices[i+1]))*height/2;left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
          if(right>left&&bottom>top)this.portraitHead={x:left,y:top,width:right-left,height:bottom-top};
        }
      }
    }

    // モデルで使用するオフスクリーン管理の終了処理
    CubismWebGLOffscreenManager.getInstance().endFrameProcess(gl);
    // もし余っているオフスクリーンのリソースを解放したい場合行う処理
    CubismWebGLOffscreenManager.getInstance().releaseStaleRenderTextures(gl);
  }

  /**
   * 次のシーンに切りかえる
   * サンプルアプリケーションではモデルセットの切り替えを行う。
   */
  public nextScene(): void {
    const no: number = (this._sceneIndex + 1) % LAppDefine.ModelDirSize;
    this.changeScene(no);
  }

  /**
   * シーンを切り替える
   * サンプルアプリケーションではモデルセットの切り替えを行う。
   * @param index
   */
  private changeScene(index: number): void {
    this._sceneIndex = index;

    if (LAppDefine.DebugLogEnable) {
      LAppPal.printMessage(`[APP]model index: ${this._sceneIndex}`);
    }

    const modelDir = this._modelDir ?? LAppDefine.ModelDir[index] ?? '.';
    const resourcesPath = this._resourcesPath ?? LAppDefine.ResourcesPath;
    const modelPath = resolveModelAssetsPath(resourcesPath, modelDir);
    const modelJsonName =
      this._model3Json ??
      LAppDefine.ModelJsonNames[index] ??
      `${modelDir === '.' || modelDir === '' ? 'model' : modelDir}.model3.json`;

    this.releaseAllModel();
    const instance = new LAppModel();
    instance.setSubdelegate(this._subdelegate);
    instance.loadAssets(modelPath, modelJsonName);
    this._models.push(instance);
    this.beginWatermarkSkip(modelPath, modelJsonName);
  }

  private beginWatermarkSkip(modelPath: string, modelJsonName: string): void {
    const token = ++this._watermarkLoadToken;
    this._watermarkPlan = { parameters: [], parts: [] };
    void loadWatermarkSkipPlan(modelPath, modelJsonName).then((plan) => {
      if (token !== this._watermarkLoadToken) {
        return;
      }
      this._watermarkPlan = plan;
      if (hasWatermarkSkip(plan) && LAppDefine.DebugLogEnable) {
        LAppPal.printMessage('[APP]auto skip watermark (space)');
      }
    });
  }

  public switchCharacter(
    resourcesPath: string,
    modelDir: string,
    model3Json: string
  ): void {
    this._resourcesPath = resourcesPath.endsWith('/') ? resourcesPath : `${resourcesPath}/`;
    this._modelDir = modelDir;
    this._model3Json = model3Json;
    this._sceneIndex = 0;
    this.changeScene(0);
  }

  public setViewMatrix(m: CubismMatrix44) {
    for (let i = 0; i < 16; i++) {
      this._viewMatrix.getArray()[i] = m.getArray()[i];
    }
  }

  /**
   * モデルの追加
   */
  public addModel(sceneIndex: number = 0): void {
    this._sceneIndex = sceneIndex;
    this.changeScene(this._sceneIndex);
  }

  /**
   * コンストラクタ
   */
  public constructor() {
    this._viewMatrix = new CubismMatrix44();
    this._models = new Array<LAppModel>();
    this._sceneIndex = 0;
  }

  /**
   * 解放する。
   */
  public release(): void {}

  /**
   * 初期化する。
   * @param subdelegate
   */
  public initialize(subdelegate: LAppSubdelegate): void {
    this._subdelegate = subdelegate;
    this.changeScene(this._sceneIndex);
  }

  /**
   * 自身が所属するSubdelegate
   */
  private _subdelegate!: LAppSubdelegate;

  _viewMatrix: CubismMatrix44; // モデル描画に用いるview行列
  _models: Array<LAppModel>; // モデルインスタンスのコンテナ
  private _sceneIndex: number; // 表示するシーンのインデックス値
  private _resourcesPath: string | null = null;
  private _modelDir: string | null = null;
  private _model3Json: string | null = null;

  // モーション再生開始のコールバック関数
  beganMotion = (self: ACubismMotion): void => {
    LAppPal.printMessage('Motion Began:');
    console.log(self);
  };
  // モーション再生終了のコールバック関数
  finishedMotion = (self: ACubismMotion): void => {
    LAppPal.printMessage('Motion Finished:');
    console.log(self);
  };
}

function stopExpressionQueue(model: LAppModel): void {
  const manager = model._expressionManager as {
    getCubismMotionQueueEntries?: () => Array<{ release?: () => void } | null> | null;
    stopAllMotions?: () => void;
  } | null;
  if (!manager) {
    return;
  }
  const entries = manager.getCubismMotionQueueEntries?.();
  if (Array.isArray(entries)) {
    for (let i = entries.length - 1; i >= 0; i--) {
      entries[i]?.release?.();
      entries.splice(i, 1);
    }
    return;
  }
  manager.stopAllMotions?.();
}

function resolveModelAssetsPath(resourcesPath: string, modelDir: string): string {
  const base = resourcesPath.endsWith('/') ? resourcesPath : `${resourcesPath}/`;
  if (!modelDir || modelDir === '.') {
    return base;
  }
  return `${base}${modelDir}/`;
}

function findMotionGroupForHitArea(
  areaName: string,
  motionGroups: Record<string, string[]>
): string | null {
  const keys = Object.keys(motionGroups);
  const exact = keys.find(
    (key) => key === `Tap${areaName}` || key === `Tap@${areaName}` || key === 'Tap'
  );
  if (exact) {
    return exact;
  }

  return (
    keys.find((key) => {
      const normalized = key.replace(/^Tap@?/i, '');
      return normalized === areaName || key.includes(areaName);
    }) ?? null
  );
}
