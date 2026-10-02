/// <reference path="../cubism-modules.d.ts" />
/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import * as LAppDefine from './platform-define';
import { LAppGlManager } from './platform-gl-manager';
import { LAppLive2DManager } from './platform-live2dmanager';
import { LAppPal } from '@live2d-sample/lapppal';
import { LAppTextureManager } from '@live2d-sample/lapptexturemanager';
import { LAppView } from '@live2d-sample/lappview';

/** The application owns all backgrounds and controls. Never render SDK sample sprites. */
class StageView extends LAppView {
  public initializeSprite(): void { /* transparent canvas; no background texture */ }
  public onTouchesEnded(pointX: number, pointY: number): void {
    // The SDK handler also tests its gear sprite, which this stage never creates.
    const manager = this._subdelegate.getLive2DManager();
    manager.onDrag(0.0, 0.0);
    const x = this.transformViewX(pointX * window.devicePixelRatio);
    const y = this.transformViewY(pointY * window.devicePixelRatio);
    manager.onTap(x, y);
  }
  public render(): void {
    const manager = this._subdelegate.getLive2DManager();
    manager.setViewMatrix(this._viewMatrix);
    manager.onUpdate();
  }
  public release(): void {
    this._viewMatrix = null;
    this._touchManager = null;
    this._deviceToScreen = null;
  }
}

/**
 * Canvasに関連する操作を取りまとめるクラス
 */
export class LAppSubdelegate {
  /**
   * コンストラクタ
   */
  public constructor() {
    this._glManager = new LAppGlManager();
    this._textureManager = new LAppTextureManager();
    this._live2dManager = new LAppLive2DManager();
    this._view = new StageView();
    this._captured = false;
    this._lastPointX = 0;
    this._lastPointY = 0;
    this._dragDistance = 0;
  }

  /**
   * デストラクタ相当の処理
   */
  public release(): void {
    this._resizeObserver?.unobserve(this._canvas);
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;

    this._live2dManager.release();

    this._view.release();

    this._textureManager.release();

    this._glManager.release();
  }

  /**
   * APPに必要な物を初期化する。
   */
  public initialize(canvas: HTMLCanvasElement): boolean {
    if (!this._glManager.initialize(canvas)) {
      return false;
    }

    this._canvas = canvas;

    if (LAppDefine.CanvasSize === 'auto') {
      this.resizeCanvas();
    } else {
      canvas.width = LAppDefine.CanvasSize.width;
      canvas.height = LAppDefine.CanvasSize.height;
    }

    this._textureManager.setGlManager(this._glManager);

    const gl = this._glManager.getGl();

    if (!this._frameBuffer) {
      this._frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    }

    // 透過設定
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // AppViewの初期化
    this._view.initialize(this);

    // フレームバッファサイズの設定
    this._live2dManager.setOffscreenSize(
      this._canvas.width,
      this._canvas.height
    );

    this._view.initializeSprite();

    this._live2dManager.initialize(this);

    this._resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[], observer: ResizeObserver) =>
        this.resizeObserverCallback.call(this, entries, observer)
    );
    this._resizeObserver.observe(this._canvas);

    return true;
  }

  /**
   * Resize canvas and re-initialize view.
   */
  public onResize(): void {
    // SDK initialization resets scale. Keep the user's transform while updating screen bounds.
    const transform = new Float32Array(this._view._viewMatrix.getArray());
    this.resizeCanvas();
    this._view.initialize(this);
    this._view._viewMatrix.setMatrix(transform);
    this._view.initializeSprite();
  }

  private resizeObserverCallback(
    entries: ResizeObserverEntry[],
    observer: ResizeObserver
  ): void {
    void entries;
    void observer;
    if (LAppDefine.CanvasSize === 'auto') {
      this._needResize = true;
    }
  }

  /**
   * ループ処理
   */
  public update(): void {
    if (this._glManager.getGl().isContextLost()) {
      return;
    }

    // キャンバスのサイズが変わっている場合はリサイズに必要な処理をする。
    if (this._needResize) {
      this.onResize();
      this._needResize = false;
    }

    const gl = this._glManager.getGl();

    // 画面の初期化
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.colorMask(true, true, true, true);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    // 深度テストを有効化
    gl.enable(gl.DEPTH_TEST);

    // 近くにある物体は、遠くにある物体を覆い隠す
    gl.depthFunc(gl.LEQUAL);

    // カラーバッファや深度バッファをクリアする
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.clearDepth(1.0);

    // 透過設定
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // 描画更新
    this._view.render();
  }

  /**
   * シェーダーを登録する。
   */
  public createShader(): WebGLProgram | null {
    const gl = this._glManager.getGl();

    // バーテックスシェーダーのコンパイル
    const vertexShaderId = gl.createShader(gl.VERTEX_SHADER);

    if (vertexShaderId == null) {
      LAppPal.printMessage('failed to create vertexShader');
      return null;
    }

    const vertexShader: string =
      'precision mediump float;' +
      'attribute vec3 position;' +
      'attribute vec2 uv;' +
      'varying vec2 vuv;' +
      'void main(void)' +
      '{' +
      '   gl_Position = vec4(position, 1.0);' +
      '   vuv = uv;' +
      '}';

    gl.shaderSource(vertexShaderId, vertexShader);
    gl.compileShader(vertexShaderId);

    // フラグメントシェーダのコンパイル
    const fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);

    if (fragmentShaderId == null) {
      LAppPal.printMessage('failed to create fragmentShader');
      return null;
    }

    const fragmentShader: string =
      'precision mediump float;' +
      'varying vec2 vuv;' +
      'uniform sampler2D texture;' +
      'void main(void)' +
      '{' +
      '   gl_FragColor = texture2D(texture, vuv);' +
      '}';

    gl.shaderSource(fragmentShaderId, fragmentShader);
    gl.compileShader(fragmentShaderId);

    // プログラムオブジェクトの作成
    const programId = gl.createProgram();
    if (programId == null) {
      LAppPal.printMessage('failed to create WebGL program');
      return null;
    }
    gl.attachShader(programId, vertexShaderId);
    gl.attachShader(programId, fragmentShaderId);

    gl.deleteShader(vertexShaderId);
    gl.deleteShader(fragmentShaderId);

    // リンク
    gl.linkProgram(programId);
    gl.useProgram(programId);

    return programId;
  }

  public getTextureManager(): LAppTextureManager {
    return this._textureManager;
  }

  public getFrameBuffer(): WebGLFramebuffer | null {
    return this._frameBuffer;
  }

  public getCanvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public getGlManager(): LAppGlManager {
    return this._glManager;
  }

  public getGl(): WebGLRenderingContext | WebGL2RenderingContext {
    return this._glManager.getGl();
  }

  public getLive2DManager(): LAppLive2DManager {
    return this._live2dManager;
  }

  /**
   * Resize the canvas to fill the screen.
   */
  private resizeCanvas(): void {
    this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio;
    this._canvas.height = this._canvas.clientHeight * window.devicePixelRatio;

    const gl = this._glManager.getGl();

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  }

  /**
   * マウスダウン、タッチダウンしたときに呼ばれる。
   */
  public onPointBegan(clientX: number, clientY: number): void {
    if (!this._view) {
      LAppPal.printMessage('view notfound');
      return;
    }
    this._captured = true;

    const { x: localX, y: localY } = this.toLocalPoint(clientX, clientY);
    this._lastPointX = localX;
    this._lastPointY = localY;
    this._dragDistance = 0;

    this._view.onTouchesBegan(localX, localY);
  }

  /**
   * マウスポインタが動いたら呼ばれる。
   */
  /** 指针在画布上移动时更新注视，不要求正在拖拽。 */
  public noteLook(clientX: number, clientY: number): void {
    const canvas = this.getCanvas();
    if (!canvas || !this._live2dManager) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return;
    }
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
    this._live2dManager.setLookTarget(x, y);
  }

  public onPointMoved(clientX: number, clientY: number): void {
    if (!this._captured) {
      return;
    }

    const { x: localX, y: localY } = this.toLocalPoint(clientX, clientY);
    const deltaX = localX - this._lastPointX;
    const deltaY = localY - this._lastPointY;
    this._lastPointX = localX;
    this._lastPointY = localY;
    this._dragDistance += Math.hypot(deltaX, deltaY);

    this._view.onTouchesMoved(localX, localY);
    this.panView(deltaX, deltaY);
  }

  /**
   * クリックが終了したら呼ばれる。
   */
  public onPointEnded(clientX: number, clientY: number): void {
    this._captured = false;

    if (!this._view) {
      LAppPal.printMessage('view notfound');
      return;
    }

    const { x: localX, y: localY } = this.toLocalPoint(clientX, clientY);

    if (this._dragDistance < 5) {
      this._view.onTouchesEnded(localX, localY);
    } else {
      this._live2dManager.onDrag(0.0, 0.0);
    }
    this._dragDistance = 0;
  }

  /**
   * タッチがキャンセルされると呼ばれる。
   */
  public onTouchCancel(clientX: number, clientY: number): void {
    this._captured = false;
    void clientX;
    void clientY;

    if (!this._view) {
      LAppPal.printMessage('view notfound');
      return;
    }

    this._live2dManager.onDrag(0.0, 0.0);
    this._dragDistance = 0;
  }

  public onWheel(clientX: number, clientY: number, deltaY: number): void {
    if (!this._view) {
      return;
    }
    const { x, y } = this.toLocalPoint(clientX, clientY);
    const ratio = window.devicePixelRatio;
    const centerX = this._view.transformScreenX(x * ratio);
    const centerY = this._view.transformScreenY(y * ratio);
    const scale = Math.exp(-deltaY * 0.001);
    this._view._viewMatrix.adjustScale(centerX, centerY, scale);
  }

  private panView(deltaX: number, deltaY: number): void {
    const ratio = window.devicePixelRatio;
    const originX = this._view.transformScreenX(0);
    const originY = this._view.transformScreenY(0);
    const translatedX = this._view.transformScreenX(deltaX * ratio) - originX;
    const translatedY = this._view.transformScreenY(deltaY * ratio) - originY;
    this._view._viewMatrix.adjustTranslate(translatedX, translatedY);
  }

  private toLocalPoint(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this._canvas.getBoundingClientRect();
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  public isContextLost(): boolean {
    return this._glManager.getGl().isContextLost();
  }

  private _canvas!: HTMLCanvasElement;

  /**
   * View情報
   */
  private _view: LAppView;

  /**
   * テクスチャマネージャー
   */
  private _textureManager: LAppTextureManager;
  private _frameBuffer: WebGLFramebuffer | null = null;
  private _glManager: LAppGlManager;
  private _live2dManager: LAppLive2DManager;

  /**
   * ResizeObserver
   */
  private _resizeObserver: ResizeObserver | null = null;

  /**
   * クリックしているか
   */
  private _captured: boolean;
  private _lastPointX: number;
  private _lastPointY: number;
  private _dragDistance: number;

  private _needResize = false;
}
