window.__ModuleLoader__.load({id:"dsh-plugin-live2d-stage",factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/api.ts
async function api(path, data) {
  const r = await fetch(base + path, data === void 0 ? {} : { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const value = await r.json();
  if (!r.ok) throw new Error(value.message ?? "\u8BF7\u6C42\u5931\u8D25");
  return value;
}
var base;
var init_api = __esm({
  "src/client/api.ts"() {
    base = "/live2d-stage/";
  }
});

// vendor/live2d/live2d-player/messages.ts
var english, defaultPlayerTranslator;
var init_messages = __esm({
  "vendor/live2d/live2d-player/messages.ts"() {
    english = {
      "\u62D6\u62FD\u79FB\u52A8\u753B\u9762 \xB7 \u6EDA\u8F6E\u7F29\u653E": "Drag to move \xB7 Scroll to zoom",
      "Live2D \u89D2\u8272\u821E\u53F0": "Live2D character stage",
      "\u8BF7\u5728\u52A8\u753B\u8D44\u6E90\u4E2D\u4E3A\u5F53\u524D\u89D2\u8272\u9009\u62E9\u6A21\u578B": "Select a model for this character",
      "\u89D2\u8272\u52A0\u8F7D\u4E2D...": "Loading character\u2026",
      "\u7B49\u5F85\u521D\u59CB\u5316": "Waiting to initialize",
      "\u6B63\u5728\u52A0\u8F7D Live2D \u89D2\u8272...": "Loading Live2D character\u2026",
      "Live2D \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u6D4F\u89C8\u5668\u652F\u6301 WebGL2": "Live2D initialization failed; WebGL2 is required",
      "{0} \u5DF2\u5C31\u7EEA": "{0} is ready",
      "\u5DF2\u5378\u8F7D": "Unloaded",
      "\u6B63\u5728\u5207\u6362\u81F3 {0}...": "Switching to {0}\u2026"
    };
    defaultPlayerTranslator = (message, values = []) => (english[message] ?? message).replace(/\{(\d+)\}/g, (match, index) => Number(index) < values.length ? String(values[Number(index)]) : match);
  }
});

// vendor/live2d/sdk/Framework/src/id/cubismid.ts
var CubismId, Live2DCubismFramework;
var init_cubismid = __esm({
  "vendor/live2d/sdk/Framework/src/id/cubismid.ts"() {
    init_cubismid();
    CubismId = class _CubismId {
      /**
       * 内部で使用するCubismIdクラス生成メソッド
       *
       * @param id ID文字列
       * @return CubismId
       * @note 指定したID文字列からCubismIdを取得する際は
       *       CubismIdManager().getId(id)を使用してください
       */
      static createIdInternal(id) {
        return new _CubismId(id);
      }
      /**
       * ID名を取得する
       */
      getString() {
        return this._id;
      }
      /**
       * idを比較
       * @param c 比較するid
       * @return 同じならばtrue,異なっていればfalseを返す
       */
      isEqual(c) {
        if (typeof c === "string") {
          return this._id == c;
        } else if (c instanceof _CubismId) {
          return this._id == c._id;
        }
        return false;
      }
      /**
       * idを比較
       * @param c 比較するid
       * @return 同じならばtrue,異なっていればfalseを返す
       */
      isNotEqual(c) {
        if (typeof c == "string") {
          return !(this._id == c);
        } else if (c instanceof _CubismId) {
          return !(this._id == c._id);
        }
        return false;
      }
      /**
       * プライベートコンストラクタ
       *
       * @note ユーザーによる生成は許可しません
       */
      constructor(id) {
        this._id = id;
      }
      _id;
      // ID名
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismId = CubismId;
    })(Live2DCubismFramework || (Live2DCubismFramework = {}));
  }
});

// vendor/live2d/sdk/Framework/src/id/cubismidmanager.ts
var CubismIdManager, Live2DCubismFramework2;
var init_cubismidmanager = __esm({
  "vendor/live2d/sdk/Framework/src/id/cubismidmanager.ts"() {
    init_cubismid();
    init_cubismidmanager();
    CubismIdManager = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._ids = new Array();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        for (let i = 0; i < this._ids.length; ++i) {
          this._ids[i] = void 0;
        }
        this._ids = null;
      }
      /**
       * ID名をリストから登録
       *
       * @param ids ID名リスト
       * @param count IDの個数
       */
      registerIds(ids) {
        for (let i = 0; i < ids.length; i++) {
          this.registerId(ids[i]);
        }
      }
      /**
       * ID名を登録
       *
       * @param id ID名
       */
      registerId(id) {
        let result = null;
        if ("string" == typeof id) {
          if ((result = this.findId(id)) != null) {
            return result;
          }
          result = CubismId.createIdInternal(id);
          this._ids.push(result);
        } else {
          return this.registerId(id);
        }
        return result;
      }
      /**
       * ID名からIDを取得する
       *
       * @param id ID名
       */
      getId(id) {
        return this.registerId(id);
      }
      /**
       * ID名からIDの確認
       *
       * @return true 存在する
       * @return false 存在しない
       */
      isExist(id) {
        if ("string" == typeof id) {
          return this.findId(id) != null;
        }
        return this.isExist(id);
      }
      /**
       * ID名からIDを検索する。
       *
       * @param id ID名
       * @return 登録されているID。なければNULL。
       */
      findId(id) {
        for (let i = 0; i < this._ids.length; ++i) {
          if (this._ids[i].getString() == id) {
            return this._ids[i];
          }
        }
        return null;
      }
      _ids;
      // 登録されているIDのリスト
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismIdManager = CubismIdManager;
    })(Live2DCubismFramework2 || (Live2DCubismFramework2 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/math/cubismvector2.ts
var CubismVector2, Live2DCubismFramework3;
var init_cubismvector2 = __esm({
  "vendor/live2d/sdk/Framework/src/math/cubismvector2.ts"() {
    init_cubismvector2();
    CubismVector2 = class _CubismVector2 {
      /**
       * コンストラクタ
       */
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x = x == void 0 ? 0 : x;
        this.y = y == void 0 ? 0 : y;
      }
      x;
      y;
      /**
       * ベクトルの加算
       *
       * @param vector2 加算するベクトル値
       * @return 加算結果 ベクトル値
       */
      add(vector2) {
        const ret = new _CubismVector2(0, 0);
        ret.x = this.x + vector2.x;
        ret.y = this.y + vector2.y;
        return ret;
      }
      /**
       * ベクトルの減算
       *
       * @param vector2 減算するベクトル値
       * @return 減算結果 ベクトル値
       */
      substract(vector2) {
        const ret = new _CubismVector2(0, 0);
        ret.x = this.x - vector2.x;
        ret.y = this.y - vector2.y;
        return ret;
      }
      /**
       * ベクトルの乗算
       *
       * @param vector2 乗算するベクトル値
       * @return 乗算結果 ベクトル値
       */
      multiply(vector2) {
        const ret = new _CubismVector2(0, 0);
        ret.x = this.x * vector2.x;
        ret.y = this.y * vector2.y;
        return ret;
      }
      /**
       * ベクトルの乗算(スカラー)
       *
       * @param scalar 乗算するスカラー値
       * @return 乗算結果 ベクトル値
       */
      multiplyByScaler(scalar) {
        return this.multiply(new _CubismVector2(scalar, scalar));
      }
      /**
       * ベクトルの除算
       *
       * @param vector2 除算するベクトル値
       * @return 除算結果 ベクトル値
       */
      division(vector2) {
        const ret = new _CubismVector2(0, 0);
        ret.x = this.x / vector2.x;
        ret.y = this.y / vector2.y;
        return ret;
      }
      /**
       * ベクトルの除算(スカラー)
       *
       * @param scalar 除算するスカラー値
       * @return 除算結果 ベクトル値
       */
      divisionByScalar(scalar) {
        return this.division(new _CubismVector2(scalar, scalar));
      }
      /**
       * ベクトルの長さを取得する
       *
       * @return ベクトルの長さ
       */
      getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
      /**
       * ベクトルの距離の取得
       *
       * @param a 点
       * @return ベクトルの距離
       */
      getDistanceWith(a) {
        return Math.sqrt(
          (this.x - a.x) * (this.x - a.x) + (this.y - a.y) * (this.y - a.y)
        );
      }
      /**
       * ドット積の計算
       *
       * @param a 値
       * @return 結果
       */
      dot(a) {
        return this.x * a.x + this.y * a.y;
      }
      /**
       * 正規化の適用
       */
      normalize() {
        const length = Math.pow(this.x * this.x + this.y * this.y, 0.5);
        this.x = this.x / length;
        this.y = this.y / length;
      }
      /**
       * 等しさの確認（等しいか？）
       *
       * 値が等しいか？
       *
       * @param rhs 確認する値
       * @return true 値は等しい
       * @return false 値は等しくない
       */
      isEqual(rhs) {
        return this.x == rhs.x && this.y == rhs.y;
      }
      /**
       * 等しさの確認（等しくないか？）
       *
       * 値が等しくないか？
       *
       * @param rhs 確認する値
       * @return true 値は等しくない
       * @return false 値は等しい
       */
      isNotEqual(rhs) {
        return !this.isEqual(rhs);
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismVector2 = CubismVector2;
    })(Live2DCubismFramework3 || (Live2DCubismFramework3 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/math/cubismmath.ts
var CubismMath, Live2DCubismFramework4;
var init_cubismmath = __esm({
  "vendor/live2d/sdk/Framework/src/math/cubismmath.ts"() {
    init_cubismvector2();
    init_cubismmath();
    CubismMath = class _CubismMath {
      static Epsilon = 1e-5;
      /**
       * 第一引数の値を最小値と最大値の範囲に収めた値を返す
       *
       * @param value 収められる値
       * @param min   範囲の最小値
       * @param max   範囲の最大値
       * @return 最小値と最大値の範囲に収めた値
       */
      static range(value, min, max) {
        if (value < min) {
          value = min;
        } else if (value > max) {
          value = max;
        }
        return value;
      }
      /**
       * サイン関数の値を求める
       *
       * @param x 角度値（ラジアン）
       * @return サイン関数sin(x)の値
       */
      static sin(x) {
        return Math.sin(x);
      }
      /**
       * コサイン関数の値を求める
       *
       * @param x 角度値(ラジアン)
       * @return コサイン関数cos(x)の値
       */
      static cos(x) {
        return Math.cos(x);
      }
      /**
       * 値の絶対値を求める
       *
       * @param x 絶対値を求める値
       * @return 値の絶対値
       */
      static abs(x) {
        return Math.abs(x);
      }
      /**
       * 平方根(ルート)を求める
       * @param x -> 平方根を求める値
       * @return 値の平方根
       */
      static sqrt(x) {
        return Math.sqrt(x);
      }
      /**
       * 立方根を求める
       * @param x -> 立方根を求める値
       * @return 値の立方根
       */
      static cbrt(x) {
        if (x === 0) {
          return x;
        }
        let cx = x;
        const isNegativeNumber = cx < 0;
        if (isNegativeNumber) {
          cx = -cx;
        }
        let ret;
        if (cx === Infinity) {
          ret = Infinity;
        } else {
          ret = Math.exp(Math.log(cx) / 3);
          ret = (cx / (ret * ret) + 2 * ret) / 3;
        }
        return isNegativeNumber ? -ret : ret;
      }
      /**
       * イージング処理されたサインを求める
       * フェードイン・アウト時のイージングに利用できる
       *
       * @param value イージングを行う値
       * @return イージング処理されたサイン値
       */
      static getEasingSine(value) {
        if (value < 0) {
          return 0;
        } else if (value > 1) {
          return 1;
        }
        return 0.5 - 0.5 * this.cos(value * Math.PI);
      }
      /**
       * 大きい方の値を返す
       *
       * @param left 左辺の値
       * @param right 右辺の値
       * @return 大きい方の値
       */
      static max(left, right) {
        return left > right ? left : right;
      }
      /**
       * 小さい方の値を返す
       *
       * @param left  左辺の値
       * @param right 右辺の値
       * @return 小さい方の値
       */
      static min(left, right) {
        return left > right ? right : left;
      }
      static clamp(val, min, max) {
        if (val < min) {
          return min;
        } else if (max < val) {
          return max;
        }
        return val;
      }
      /**
       * 角度値をラジアン値に変換する
       *
       * @param degrees   角度値
       * @return 角度値から変換したラジアン値
       */
      static degreesToRadian(degrees) {
        return degrees / 180 * Math.PI;
      }
      /**
       * ラジアン値を角度値に変換する
       *
       * @param radian    ラジアン値
       * @return ラジアン値から変換した角度値
       */
      static radianToDegrees(radian) {
        return radian * 180 / Math.PI;
      }
      /**
       * ２つのベクトルからラジアン値を求める
       *
       * @param from  始点ベクトル
       * @param to    終点ベクトル
       * @return ラジアン値から求めた方向ベクトル
       */
      static directionToRadian(from, to) {
        const q1 = Math.atan2(to.y, to.x);
        const q2 = Math.atan2(from.y, from.x);
        let ret = q1 - q2;
        while (ret < -Math.PI) {
          ret += Math.PI * 2;
        }
        while (ret > Math.PI) {
          ret -= Math.PI * 2;
        }
        return ret;
      }
      /**
       * ２つのベクトルから角度値を求める
       *
       * @param from  始点ベクトル
       * @param to    終点ベクトル
       * @return 角度値から求めた方向ベクトル
       */
      static directionToDegrees(from, to) {
        const radian = this.directionToRadian(from, to);
        let degree = this.radianToDegrees(radian);
        if (to.x - from.x > 0) {
          degree = -degree;
        }
        return degree;
      }
      /**
       * ラジアン値を方向ベクトルに変換する。
       *
       * @param totalAngle    ラジアン値
       * @return ラジアン値から変換した方向ベクトル
       */
      static radianToDirection(totalAngle) {
        const ret = new CubismVector2();
        ret.x = this.sin(totalAngle);
        ret.y = this.cos(totalAngle);
        return ret;
      }
      /**
       * 三次方程式の三次項の係数が0になったときに補欠的に二次方程式の解をもとめる。
       * a * x^2 + b * x + c = 0
       *
       * @param   a -> 二次項の係数値
       * @param   b -> 一次項の係数値
       * @param   c -> 定数項の値
       * @return  二次方程式の解
       */
      static quadraticEquation(a, b, c) {
        if (this.abs(a) < _CubismMath.Epsilon) {
          if (this.abs(b) < _CubismMath.Epsilon) {
            return -c;
          }
          return -c / b;
        }
        return -(b + this.sqrt(b * b - 4 * a * c)) / (2 * a);
      }
      /**
       * カルダノの公式によってベジェのt値に該当する３次方程式の解を求める。
       * 重解になったときには0.0～1.0の値になる解を返す。
       *
       * a * x^3 + b * x^2 + c * x + d = 0
       *
       * @param   a -> 三次項の係数値
       * @param   b -> 二次項の係数値
       * @param   c -> 一次項の係数値
       * @param   d -> 定数項の値
       * @return  0.0～1.0の間にある解
       */
      static cardanoAlgorithmForBezier(a, b, c, d) {
        if (this.abs(a) < _CubismMath.Epsilon) {
          return this.range(this.quadraticEquation(b, c, d), 0, 1);
        }
        const ba = b / a;
        const ca = c / a;
        const da = d / a;
        const p = (3 * ca - ba * ba) / 3;
        const p3 = p / 3;
        const q = (2 * ba * ba * ba - 9 * ba * ca + 27 * da) / 27;
        const q2 = q / 2;
        const discriminant = q2 * q2 + p3 * p3 * p3;
        const center = 0.5;
        const threshold = center + 0.01;
        if (discriminant < 0) {
          const mp3 = -p / 3;
          const mp33 = mp3 * mp3 * mp3;
          const r = this.sqrt(mp33);
          const t = -q / (2 * r);
          const cosphi = this.range(t, -1, 1);
          const phi = Math.acos(cosphi);
          const crtr = this.cbrt(r);
          const t1 = 2 * crtr;
          const root12 = t1 * this.cos(phi / 3) - ba / 3;
          if (this.abs(root12 - center) < threshold) {
            return this.range(root12, 0, 1);
          }
          const root2 = t1 * this.cos((phi + 2 * Math.PI) / 3) - ba / 3;
          if (this.abs(root2 - center) < threshold) {
            return this.range(root2, 0, 1);
          }
          const root3 = t1 * this.cos((phi + 4 * Math.PI) / 3) - ba / 3;
          return this.range(root3, 0, 1);
        }
        if (discriminant == 0) {
          let u12;
          if (q2 < 0) {
            u12 = this.cbrt(-q2);
          } else {
            u12 = -this.cbrt(q2);
          }
          const root12 = 2 * u12 - ba / 3;
          if (this.abs(root12 - center) < threshold) {
            return this.range(root12, 0, 1);
          }
          const root2 = -u12 - ba / 3;
          return this.range(root2, 0, 1);
        }
        const sd = this.sqrt(discriminant);
        const u1 = this.cbrt(sd - q2);
        const v1 = this.cbrt(sd + q2);
        const root1 = u1 - v1 - ba / 3;
        return this.range(root1, 0, 1);
      }
      /**
       * 浮動小数点の余りを求める。
       *
       * @param dividend 被除数（割られる値）
       * @param divisor 除数（割る値）
       * @return 余り
       */
      static mod(dividend, divisor) {
        if (!isFinite(dividend) || divisor === 0 || isNaN(dividend) || isNaN(divisor)) {
          console.warn(
            `divided: ${dividend}, divisor: ${divisor} mod() returns 'NaN'.`
          );
          return NaN;
        }
        const absDividend = Math.abs(dividend);
        const absDivisor = Math.abs(divisor);
        let result = absDividend - Math.floor(absDividend / absDivisor) * absDivisor;
        result *= Math.sign(dividend);
        return result;
      }
      /**
       * コンストラクタ
       */
      constructor() {
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMath = CubismMath;
    })(Live2DCubismFramework4 || (Live2DCubismFramework4 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/math/cubismmatrix44.ts
var CubismMatrix44, Live2DCubismFramework5;
var init_cubismmatrix44 = __esm({
  "vendor/live2d/sdk/Framework/src/math/cubismmatrix44.ts"() {
    init_cubismmath();
    init_cubismmatrix44();
    CubismMatrix44 = class _CubismMatrix44 {
      /**
       * コンストラクタ
       */
      constructor() {
        this._tr = new Float32Array(16);
        this.loadIdentity();
      }
      /**
       * 受け取った２つの行列の乗算を行う。
       *
       * @param a 行列a
       * @param b 行列b
       *
       * @return 乗算結果の行列
       */
      static multiply(a, b, dst) {
        const c = new Float32Array([
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ]);
        const n = 4;
        for (let i = 0; i < n; ++i) {
          for (let j = 0; j < n; ++j) {
            for (let k = 0; k < n; ++k) {
              c[j + i * 4] += a[k + i * 4] * b[j + k * 4];
            }
          }
        }
        for (let i = 0; i < 16; ++i) {
          dst[i] = c[i];
        }
      }
      /**
       * 単位行列に初期化する
       */
      loadIdentity() {
        const c = new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1
        ]);
        this.setMatrix(c);
      }
      /**
       * 行列を設定
       *
       * @param tr 16個の浮動小数点数で表される4x4の行列
       */
      setMatrix(tr) {
        for (let i = 0; i < 16; ++i) {
          this._tr[i] = tr[i];
        }
      }
      /**
       * 行列を浮動小数点数の配列で取得
       *
       * @return 16個の浮動小数点数で表される4x4の行列
       */
      getArray() {
        return this._tr;
      }
      /**
       * X軸の拡大率を取得
       *
       * @return X軸の拡大率
       */
      getScaleX() {
        return this._tr[0];
      }
      /**
       * Y軸の拡大率を取得する
       *
       * @return Y軸の拡大率
       */
      getScaleY() {
        return this._tr[5];
      }
      /**
       * X軸の移動量を取得
       *
       * @return X軸の移動量
       */
      getTranslateX() {
        return this._tr[12];
      }
      /**
       * Y軸の移動量を取得
       *
       * @return Y軸の移動量
       */
      getTranslateY() {
        return this._tr[13];
      }
      /**
       * X軸の値を現在の行列で計算
       *
       * @param src X軸の値
       *
       * @return 現在の行列で計算されたX軸の値
       */
      transformX(src) {
        return this._tr[0] * src + this._tr[12];
      }
      /**
       * Y軸の値を現在の行列で計算
       *
       * @param src Y軸の値
       *
       * @return 現在の行列で計算されたY軸の値
       */
      transformY(src) {
        return this._tr[5] * src + this._tr[13];
      }
      /**
       * X軸の値を現在の行列で逆計算
       */
      invertTransformX(src) {
        return (src - this._tr[12]) / this._tr[0];
      }
      /**
       * Y軸の値を現在の行列で逆計算
       */
      invertTransformY(src) {
        return (src - this._tr[13]) / this._tr[5];
      }
      /**
       * 現在の行列の位置を起点にして移動
       *
       * 現在の行列の位置を起点にして相対的に移動する。
       *
       * @param x X軸の移動量
       * @param y Y軸の移動量
       */
      translateRelative(x, y) {
        const tr1 = new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          x,
          y,
          0,
          1
        ]);
        _CubismMatrix44.multiply(tr1, this._tr, this._tr);
      }
      /**
       * 現在の行列の位置を移動
       *
       * 現在の行列の位置を指定した位置へ移動する
       *
       * @param x X軸の移動量
       * @param y y軸の移動量
       */
      translate(x, y) {
        this._tr[12] = x;
        this._tr[13] = y;
      }
      /**
       * 現在の行列のX軸の位置を指定した位置へ移動する
       *
       * @param x X軸の移動量
       */
      translateX(x) {
        this._tr[12] = x;
      }
      /**
       * 現在の行列のY軸の位置を指定した位置へ移動する
       *
       * @param y Y軸の移動量
       */
      translateY(y) {
        this._tr[13] = y;
      }
      /**
       * 現在の行列の拡大率を相対的に設定する
       *
       * @param x X軸の拡大率
       * @param y Y軸の拡大率
       */
      scaleRelative(x, y) {
        const tr1 = new Float32Array([
          x,
          0,
          0,
          0,
          0,
          y,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1
        ]);
        _CubismMatrix44.multiply(tr1, this._tr, this._tr);
      }
      /**
       * 現在の行列の拡大率を指定した倍率に設定する
       *
       * @param x X軸の拡大率
       * @param y Y軸の拡大率
       */
      scale(x, y) {
        this._tr[0] = x;
        this._tr[5] = y;
      }
      /**
       * 引数で与えられた行列にこの行列を乗算する。
       * (引数で与えられた行列) * (この行列)
       *
       * @note 関数名と実際の計算内容に乖離があるため、今後計算順が修正される可能性があります。
       * @param m 行列
       */
      multiplyByMatrix(m) {
        _CubismMatrix44.multiply(m.getArray(), this._tr, this._tr);
      }
      /**
       * 現在の行列の逆行列を求める。
       *
       * @return 現在の行列で計算された逆行列の値を返す
       */
      getInvert() {
        const r00 = this._tr[0];
        const r10 = this._tr[1];
        const r20 = this._tr[2];
        const r01 = this._tr[4];
        const r11 = this._tr[5];
        const r21 = this._tr[6];
        const r02 = this._tr[8];
        const r12 = this._tr[9];
        const r22 = this._tr[10];
        const tx = this._tr[12];
        const ty = this._tr[13];
        const tz = this._tr[14];
        const det = r00 * (r11 * r22 - r12 * r21) - r01 * (r10 * r22 - r12 * r20) + r02 * (r10 * r21 - r11 * r20);
        const dst = new _CubismMatrix44();
        if (CubismMath.abs(det) < CubismMath.Epsilon) {
          dst.loadIdentity();
          return dst;
        }
        const invDet = 1 / det;
        const inv00 = (r11 * r22 - r12 * r21) * invDet;
        const inv01 = -(r01 * r22 - r02 * r21) * invDet;
        const inv02 = (r01 * r12 - r02 * r11) * invDet;
        const inv10 = -(r10 * r22 - r12 * r20) * invDet;
        const inv11 = (r00 * r22 - r02 * r20) * invDet;
        const inv12 = -(r00 * r12 - r02 * r10) * invDet;
        const inv20 = (r10 * r21 - r11 * r20) * invDet;
        const inv21 = -(r00 * r21 - r01 * r20) * invDet;
        const inv22 = (r00 * r11 - r01 * r10) * invDet;
        dst._tr[0] = inv00;
        dst._tr[1] = inv10;
        dst._tr[2] = inv20;
        dst._tr[3] = 0;
        dst._tr[4] = inv01;
        dst._tr[5] = inv11;
        dst._tr[6] = inv21;
        dst._tr[7] = 0;
        dst._tr[8] = inv02;
        dst._tr[9] = inv12;
        dst._tr[10] = inv22;
        dst._tr[11] = 0;
        dst._tr[12] = -(inv00 * tx + inv01 * ty + inv02 * tz);
        dst._tr[13] = -(inv10 * tx + inv11 * ty + inv12 * tz);
        dst._tr[14] = -(inv20 * tx + inv21 * ty + inv22 * tz);
        dst._tr[15] = 1;
        return dst;
      }
      /**
       * オブジェクトのコピーを生成する
       */
      clone() {
        const cloneMatrix = new _CubismMatrix44();
        for (let i = 0; i < this._tr.length; i++) {
          cloneMatrix._tr[i] = this._tr[i];
        }
        return cloneMatrix;
      }
      _tr;
      // 4x4行列データ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMatrix44 = CubismMatrix44;
    })(Live2DCubismFramework5 || (Live2DCubismFramework5 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/type/csmrectf.ts
var csmRect, Live2DCubismFramework6;
var init_csmrectf = __esm({
  "vendor/live2d/sdk/Framework/src/type/csmrectf.ts"() {
    init_csmrectf();
    csmRect = class {
      /**
       * コンストラクタ
       * @param x 左端X座標
       * @param y 上端Y座標
       * @param w 幅
       * @param h 高さ
       */
      constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
      }
      /**
       * 矩形中央のX座標を取得する
       */
      getCenterX() {
        return this.x + 0.5 * this.width;
      }
      /**
       * 矩形中央のY座標を取得する
       */
      getCenterY() {
        return this.y + 0.5 * this.height;
      }
      /**
       * 右側のX座標を取得する
       */
      getRight() {
        return this.x + this.width;
      }
      /**
       * 下端のY座標を取得する
       */
      getBottom() {
        return this.y + this.height;
      }
      /**
       * 矩形に値をセットする
       * @param r 矩形のインスタンス
       */
      setRect(r) {
        this.x = r.x;
        this.y = r.y;
        this.width = r.width;
        this.height = r.height;
      }
      /**
       * 矩形中央を軸にして縦横を拡縮する
       * @param w 幅方向に拡縮する量
       * @param h 高さ方向に拡縮する量
       */
      expand(w, h) {
        this.x -= w;
        this.y -= h;
        this.width += w * 2;
        this.height += h * 2;
      }
      x;
      // 左端X座標
      y;
      // 上端Y座標
      width;
      // 幅
      height;
      // 高さ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.csmRect = csmRect;
    })(Live2DCubismFramework6 || (Live2DCubismFramework6 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/cubismframeworkconfig.ts
var CSM_LOG_LEVEL_VERBOSE, CSM_LOG_LEVEL_DEBUG, CSM_LOG_LEVEL_INFO, CSM_LOG_LEVEL_WARNING, CSM_LOG_LEVEL_ERROR, CSM_LOG_LEVEL;
var init_cubismframeworkconfig = __esm({
  "vendor/live2d/sdk/Framework/src/cubismframeworkconfig.ts"() {
    CSM_LOG_LEVEL_VERBOSE = 0;
    CSM_LOG_LEVEL_DEBUG = 1;
    CSM_LOG_LEVEL_INFO = 2;
    CSM_LOG_LEVEL_WARNING = 3;
    CSM_LOG_LEVEL_ERROR = 4;
    CSM_LOG_LEVEL = CSM_LOG_LEVEL_VERBOSE;
  }
});

// vendor/live2d/sdk/Framework/src/utils/cubismdebug.ts
var CubismLogPrint, CubismLogPrintIn, CSM_ASSERT, CubismLogVerbose, CubismLogDebug, CubismLogInfo, CubismLogWarning, CubismLogError, CubismDebug, Live2DCubismFramework7;
var init_cubismdebug = __esm({
  "vendor/live2d/sdk/Framework/src/utils/cubismdebug.ts"() {
    init_cubismframeworkconfig();
    init_live2dcubismframework();
    init_cubismdebug();
    CubismLogPrint = (level, fmt, args) => {
      CubismDebug.print(level, "[CSM]" + fmt, args);
    };
    CubismLogPrintIn = (level, fmt, args) => {
      CubismLogPrint(level, fmt + "\n", args);
    };
    CSM_ASSERT = (expr) => {
      console.assert(expr);
    };
    if (CSM_LOG_LEVEL <= CSM_LOG_LEVEL_VERBOSE) {
      CubismLogVerbose = (fmt, ...args) => {
        CubismLogPrintIn(0 /* LogLevel_Verbose */, "[V]" + fmt, args);
      };
      CubismLogDebug = (fmt, ...args) => {
        CubismLogPrintIn(1 /* LogLevel_Debug */, "[D]" + fmt, args);
      };
      CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(2 /* LogLevel_Info */, "[I]" + fmt, args);
      };
      CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(3 /* LogLevel_Warning */, "[W]" + fmt, args);
      };
      CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(4 /* LogLevel_Error */, "[E]" + fmt, args);
      };
    } else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_DEBUG) {
      CubismLogDebug = (fmt, ...args) => {
        CubismLogPrintIn(1 /* LogLevel_Debug */, "[D]" + fmt, args);
      };
      CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(2 /* LogLevel_Info */, "[I]" + fmt, args);
      };
      CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(3 /* LogLevel_Warning */, "[W]" + fmt, args);
      };
      CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(4 /* LogLevel_Error */, "[E]" + fmt, args);
      };
    } else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_INFO) {
      CubismLogInfo = (fmt, ...args) => {
        CubismLogPrintIn(2 /* LogLevel_Info */, "[I]" + fmt, args);
      };
      CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(3 /* LogLevel_Warning */, "[W]" + fmt, args);
      };
      CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(4 /* LogLevel_Error */, "[E]" + fmt, args);
      };
    } else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_WARNING) {
      CubismLogWarning = (fmt, ...args) => {
        CubismLogPrintIn(3 /* LogLevel_Warning */, "[W]" + fmt, args);
      };
      CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(4 /* LogLevel_Error */, "[E]" + fmt, args);
      };
    } else if (CSM_LOG_LEVEL == CSM_LOG_LEVEL_ERROR) {
      CubismLogError = (fmt, ...args) => {
        CubismLogPrintIn(4 /* LogLevel_Error */, "[E]" + fmt, args);
      };
    }
    CubismDebug = class {
      /**
       * ログを出力する。第一引数にログレベルを設定する。
       * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
       *
       * @param logLevel ログレベルの設定
       * @param format 書式付き文字列
       * @param args 可変長引数
       */
      static print(logLevel, format, args) {
        if (logLevel < CubismFramework.getLoggingLevel()) {
          return;
        }
        const logPrint = CubismFramework.coreLogFunction;
        if (!logPrint) return;
        const buffer = format.replace(/\{(\d+)\}/g, (m, k) => {
          return args[k];
        });
        logPrint(buffer);
      }
      /**
       * データから指定した長さだけダンプ出力する。
       * CubismFramework.initialize()時にオプションで設定されたログ出力レベルを下回る場合はログに出さない。
       *
       * @param logLevel ログレベルの設定
       * @param data ダンプするデータ
       * @param length ダンプする長さ
       */
      static dumpBytes(logLevel, data, length) {
        for (let i = 0; i < length; i++) {
          if (i % 16 == 0 && i > 0) this.print(logLevel, "\n");
          else if (i % 8 == 0 && i > 0) this.print(logLevel, "  ");
          this.print(logLevel, "{0} ", [data[i] & 255]);
        }
        this.print(logLevel, "\n");
      }
      /**
       * private コンストラクタ
       */
      constructor() {
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismDebug = CubismDebug;
    })(Live2DCubismFramework7 || (Live2DCubismFramework7 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismrenderer.ts
var CubismRenderer, CubismBlendMode, CubismTextureColor, CubismClippingContext, Live2DCubismFramework8;
var init_cubismrenderer = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismrenderer.ts"() {
    init_cubismmath();
    init_cubismmatrix44();
    init_csmrectf();
    init_cubismdebug();
    init_cubismrenderer();
    CubismRenderer = class {
      /**
       * レンダラのインスタンスを生成して取得する
       *
       * @return レンダラのインスタンス
       */
      static create() {
        return null;
      }
      /**
       * レンダラのインスタンスを解放する
       */
      static delete(renderer) {
        renderer = null;
      }
      /**
       * レンダラの初期化処理を実行する
       * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
       *
       * @param model モデルのインスタンス
       */
      initialize(model) {
        this._model = model;
        if (model.isBlendModeEnabled()) {
          this.useHighPrecisionMask(true);
          CubismLogInfo(
            "This model uses a high-resolution mask because it operates in blend mode."
          );
        }
      }
      /**
       * モデルを描画する
       * @param shaderPath ブレンドモード用シェーダのパス
       */
      drawModel(shaderPath = null) {
        if (this.getModel() == null) return;
        this.doDrawModel(shaderPath);
      }
      /**
       * Model-View-Projection 行列をセットする
       * 配列は複製されるので、元の配列は外で破棄して良い
       *
       * @param matrix44 Model-View-Projection 行列
       */
      setMvpMatrix(matrix44) {
        this._mvpMatrix4x4.setMatrix(matrix44.getArray());
      }
      /**
       * Model-View-Projection 行列を取得する
       *
       * @return Model-View-Projection 行列
       */
      getMvpMatrix() {
        return this._mvpMatrix4x4;
      }
      /**
       * モデルの色をセットする
       * 各色0.0~1.0の間で指定する（1.0が標準の状態）
       *
       * @param red 赤チャンネルの値
       * @param green 緑チャンネルの値
       * @param blue 青チャンネルの値
       * @param alpha αチャンネルの値
       */
      setModelColor(red, green, blue, alpha) {
        this._modelColor.r = CubismMath.clamp(red, 0, 1);
        this._modelColor.g = CubismMath.clamp(green, 0, 1);
        this._modelColor.b = CubismMath.clamp(blue, 0, 1);
        this._modelColor.a = CubismMath.clamp(alpha, 0, 1);
      }
      /**
       * モデルの色を取得する
       * 各色0.0~1.0の間で指定する(1.0が標準の状態)
       *
       * @return RGBAのカラー情報
       */
      getModelColor() {
        return JSON.parse(JSON.stringify(this._modelColor));
      }
      /**
       * 透明度を考慮したモデルの色を計算する。
       *
       * @param opacity 透明度
       *
       * @return RGBAのカラー情報
       */
      getModelColorWithOpacity(opacity) {
        const modelColorRGBA = this.getModelColor();
        modelColorRGBA.a *= opacity;
        if (this.isPremultipliedAlpha()) {
          modelColorRGBA.r *= modelColorRGBA.a;
          modelColorRGBA.g *= modelColorRGBA.a;
          modelColorRGBA.b *= modelColorRGBA.a;
        }
        return modelColorRGBA;
      }
      /**
       * 乗算済みαの有効・無効をセットする
       * 有効にするならtrue、無効にするならfalseをセットする
       */
      setIsPremultipliedAlpha(enable) {
        this._isPremultipliedAlpha = enable;
      }
      /**
       * 乗算済みαの有効・無効を取得する
       * @return true 乗算済みのα有効
       *         false 乗算済みのα無効
       */
      isPremultipliedAlpha() {
        return this._isPremultipliedAlpha;
      }
      /**
       * カリング（片面描画）の有効・無効をセットする。
       * 有効にするならtrue、無効にするならfalseをセットする
       */
      setIsCulling(culling) {
        this._isCulling = culling;
      }
      /**
       * カリング（片面描画）の有効・無効を取得する。
       *
       * @return true カリング有効
       *         false カリング無効
       */
      isCulling() {
        return this._isCulling;
      }
      /**
       * テクスチャの異方性フィルタリングのパラメータをセットする
       * パラメータ値の影響度はレンダラの実装に依存する
       *
       * @param n パラメータの値
       */
      setAnisotropy(n) {
        this._anisotropy = n;
      }
      /**
       * テクスチャの異方性フィルタリングのパラメータをセットする
       *
       * @return 異方性フィルタリングのパラメータ
       */
      getAnisotropy() {
        return this._anisotropy;
      }
      /**
       * レンダリングするモデルを取得する
       *
       * @return レンダリングするモデル
       */
      getModel() {
        return this._model;
      }
      /**
       * マスク描画の方式を変更する。
       * falseの場合、マスクを1枚のテクスチャに分割してレンダリングする（デフォルト）
       * 高速だが、マスク個数の上限が36に限定され、質も荒くなる
       * trueの場合、パーツ描画の前にその都度必要なマスクを描き直す
       * レンダリング品質は高いが描画処理負荷は増す
       *
       * @param high 高精細マスクに切り替えるか？
       */
      useHighPrecisionMask(high) {
        this._useHighPrecisionMask = high;
      }
      /**
       * マスクの描画方式を取得する
       *
       * @return true 高精細方式
       *         false デフォルト
       */
      isUsingHighPrecisionMask() {
        return this._useHighPrecisionMask;
      }
      /**
       * モデルを描画したバッファのサイズを設定
       *
       * @param[in]   width  -> モデルを描画したバッファの幅
       * @param[in]   height -> モデルを描画したバッファの高さ
       */
      setRenderTargetSize(width, height) {
        this._modelRenderTargetWidth = width;
        this._modelRenderTargetHeight = height;
      }
      /**
       * コンストラクタ
       */
      constructor(width, height) {
        this._modelRenderTargetWidth = width;
        this._modelRenderTargetHeight = height;
        this._isCulling = false;
        this._isPremultipliedAlpha = false;
        this._anisotropy = 0;
        this._model = null;
        this._modelColor = new CubismTextureColor();
        this._useHighPrecisionMask = false;
        this._mvpMatrix4x4 = new CubismMatrix44();
        this._mvpMatrix4x4.loadIdentity();
      }
      /**
       * レンダラが保持する静的なリソースを開放する
       */
      static staticRelease;
      _mvpMatrix4x4;
      // Model-View-Projection 行列
      _modelColor;
      // モデル自体のカラー（RGBA）
      _isCulling;
      // カリングが有効ならtrue
      _isPremultipliedAlpha;
      // 乗算済みαならtrue
      _anisotropy;
      // テクスチャの異方性フィルタリングのパラメータ
      _model;
      // レンダリング対象のモデル
      _useHighPrecisionMask;
      // falseの場合、マスクを纏めて描画する trueの場合、マスクはパーツ描画ごとに書き直す
      _modelRenderTargetWidth;
      _modelRenderTargetHeight;
    };
    CubismBlendMode = /* @__PURE__ */ ((CubismBlendMode2) => {
      CubismBlendMode2[CubismBlendMode2["CubismBlendMode_Normal"] = 0] = "CubismBlendMode_Normal";
      CubismBlendMode2[CubismBlendMode2["CubismBlendMode_Additive"] = 1] = "CubismBlendMode_Additive";
      CubismBlendMode2[CubismBlendMode2["CubismBlendMode_Multiplicative"] = 2] = "CubismBlendMode_Multiplicative";
      return CubismBlendMode2;
    })(CubismBlendMode || {});
    CubismTextureColor = class {
      /**
       * コンストラクタ
       */
      constructor(r = 1, g = 1, b = 1, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
      }
      r;
      // 赤チャンネル
      g;
      // 緑チャンネル
      b;
      // 青チャンネル
      a;
      // αチャンネル
    };
    CubismClippingContext = class {
      /**
       * 引数付きコンストラクタ
       */
      constructor(clippingDrawableIndices, clipCount) {
        this._clippingIdList = clippingDrawableIndices;
        this._clippingIdCount = clipCount;
        this._allClippedDrawRect = new csmRect();
        this._layoutBounds = new csmRect();
        this._clippedDrawableIndexList = [];
        this._clippedOffscreenIndexList = [];
        this._matrixForMask = new CubismMatrix44();
        this._matrixForDraw = new CubismMatrix44();
        this._bufferIndex = 0;
        this._layoutChannelIndex = 0;
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        if (this._layoutBounds != null) {
          this._layoutBounds = null;
        }
        if (this._allClippedDrawRect != null) {
          this._allClippedDrawRect = null;
        }
        if (this._clippedDrawableIndexList != null) {
          this._clippedDrawableIndexList = null;
        }
        if (this._clippedOffscreenIndexList != null) {
          this._clippedOffscreenIndexList = null;
        }
      }
      /**
       * このマスクにクリップされる描画オブジェクトを追加する
       *
       * @param drawableIndex クリッピング対象に追加する描画オブジェクトのインデックス
       */
      addClippedDrawable(drawableIndex) {
        this._clippedDrawableIndexList.push(drawableIndex);
      }
      /**
       * このマスクにクリップされるオフスクリーンオブジェクトを追加する
       *
       * @param offscreenIndex クリッピング対象に追加するオフスクリーンオブジェクトのインデックス
       */
      addClippedOffscreen(offscreenIndex) {
        this._clippedOffscreenIndexList.push(offscreenIndex);
      }
      _isUsing;
      // 現在の描画状態でマスクの準備が必要ならtrue
      _clippingIdList;
      // クリッピングマスクのIDリスト
      _clippingIdCount;
      // クリッピングマスクの数
      _layoutChannelIndex;
      // RGBAのいずれのチャンネルにこのクリップを配置するか（0:R, 1:G, 2:B, 3:A）
      _layoutBounds;
      // マスク用チャンネルのどの領域にマスクを入れるか（View座標-1~1, UVは0~1に直す）
      _allClippedDrawRect;
      // このクリッピングで、クリッピングされるすべての描画オブジェクトの囲み矩形（毎回更新）
      _matrixForMask;
      // マスクの位置計算結果を保持する行列
      _matrixForDraw;
      // 描画オブジェクトの位置計算結果を保持する行列
      _clippedDrawableIndexList;
      // このマスクにクリップされる描画オブジェクトのリスト
      _clippedOffscreenIndexList;
      // このマスクにクリップされるオフスクリーンオブジェクトのリスト
      _bufferIndex;
      // このマスクが割り当てられるレンダーテクスチャ（フレームバッファ）やカラーバッファのインデックス
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismBlendMode = CubismBlendMode;
      Live2DCubismFramework51.CubismRenderer = CubismRenderer;
      Live2DCubismFramework51.CubismTextureColor = CubismTextureColor;
    })(Live2DCubismFramework8 || (Live2DCubismFramework8 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/utils/cubismjsonextension.ts
var CubismJsonExtension;
var init_cubismjsonextension = __esm({
  "vendor/live2d/sdk/Framework/src/utils/cubismjsonextension.ts"() {
    init_cubismjson();
    CubismJsonExtension = class _CubismJsonExtension {
      static parseJsonObject(obj, map) {
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] == "boolean") {
            const convValue = Boolean(obj[key]);
            map.put(key, new JsonBoolean(convValue));
          } else if (typeof obj[key] == "string") {
            const convValue = String(obj[key]);
            map.put(key, new JsonString(convValue));
          } else if (typeof obj[key] == "number") {
            const convValue = Number(obj[key]);
            map.put(key, new JsonFloat(convValue));
          } else if (obj[key] instanceof Array) {
            map.put(
              key,
              _CubismJsonExtension.parseJsonArray(obj[key])
            );
          } else if (obj[key] instanceof Object) {
            map.put(
              key,
              _CubismJsonExtension.parseJsonObject(obj[key], new JsonMap())
            );
          } else if (obj[key] == null) {
            map.put(key, new JsonNullvalue());
          } else {
            map.put(key, obj[key]);
          }
        });
        return map;
      }
      static parseJsonArray(obj) {
        const arr = new JsonArray();
        Object.keys(obj).forEach((key) => {
          const convKey = Number(key);
          if (typeof convKey == "number") {
            if (typeof obj[key] == "boolean") {
              const convValue = Boolean(obj[key]);
              arr.add(new JsonBoolean(convValue));
            } else if (typeof obj[key] == "string") {
              const convValue = String(obj[key]);
              arr.add(new JsonString(convValue));
            } else if (typeof obj[key] == "number") {
              const convValue = Number(obj[key]);
              arr.add(new JsonFloat(convValue));
            } else if (obj[key] instanceof Array) {
              arr.add(this.parseJsonArray(obj[key]));
            } else if (obj[key] instanceof Object) {
              arr.add(this.parseJsonObject(obj[key], new JsonMap()));
            } else if (obj[key] == null) {
              arr.add(new JsonNullvalue());
            } else {
              arr.add(obj[key]);
            }
          } else if (obj[key] instanceof Array) {
            arr.add(this.parseJsonArray(obj[key]));
          } else if (obj[key] instanceof Object) {
            arr.add(this.parseJsonObject(obj[key], new JsonMap()));
          } else if (obj[key] == null) {
            arr.add(new JsonNullvalue());
          } else {
            const convValue = Array(obj[key]);
            for (let i = 0; i < convValue.length; i++) {
              arr.add(convValue[i]);
            }
          }
        });
        return arr;
      }
    };
  }
});

// vendor/live2d/sdk/Framework/src/utils/cubismjson.ts
var CSM_JSON_ERROR_TYPE_MISMATCH, CSM_JSON_ERROR_INDEX_OF_BOUNDS, Value2, CubismJson, JsonFloat, JsonBoolean, JsonString, JsonError, JsonNullvalue, JsonArray, JsonMap, Live2DCubismFramework9;
var init_cubismjson = __esm({
  "vendor/live2d/sdk/Framework/src/utils/cubismjson.ts"() {
    init_live2dcubismframework();
    init_cubismdebug();
    init_cubismjson();
    init_cubismjsonextension();
    CSM_JSON_ERROR_TYPE_MISMATCH = "Error: type mismatch";
    CSM_JSON_ERROR_INDEX_OF_BOUNDS = "Error: index out of bounds";
    Value2 = class _Value {
      /**
       * コンストラクタ
       */
      constructor() {
      }
      /**
       * 要素を文字列型で返す(string)
       */
      getRawString(defaultValue, indent) {
        return this.getString(defaultValue, indent);
      }
      /**
       * 要素を数値型で返す(number)
       */
      toInt(defaultValue = 0) {
        return defaultValue;
      }
      /**
       * 要素を数値型で返す(number)
       */
      toFloat(defaultValue = 0) {
        return defaultValue;
      }
      /**
       * 要素を真偽値で返す(boolean)
       */
      toBoolean(defaultValue = false) {
        return defaultValue;
      }
      /**
       * サイズを返す
       */
      getSize() {
        return 0;
      }
      /**
       * 要素を配列で返す(Value[])
       */
      getArray(defaultValue = null) {
        return defaultValue;
      }
      /**
       * 要素をコンテナで返す(array)
       */
      getVector(defaultValue = new Array()) {
        return defaultValue;
      }
      /**
       * 要素をマップで返す(Map<String, Value>)
       */
      getMap(defaultValue) {
        return defaultValue;
      }
      /**
       * 添字演算子[index]
       */
      getValueByIndex(index) {
        return _Value.errorValue.setErrorNotForClientCall(
          CSM_JSON_ERROR_TYPE_MISMATCH
        );
      }
      /**
       * 添字演算子[string]
       */
      getValueByString(s) {
        return _Value.nullValue.setErrorNotForClientCall(
          CSM_JSON_ERROR_TYPE_MISMATCH
        );
      }
      /**
       * マップのキー一覧をコンテナで返す
       *
       * @return マップのキーの一覧
       */
      getKeys() {
        return _Value.dummyKeys;
      }
      /**
       * Valueの種類がエラー値ならtrue
       */
      isError() {
        return false;
      }
      /**
       * Valueの種類がnullならtrue
       */
      isNull() {
        return false;
      }
      /**
       * Valueの種類が真偽値ならtrue
       */
      isBool() {
        return false;
      }
      /**
       * Valueの種類が数値型ならtrue
       */
      isFloat() {
        return false;
      }
      /**
       * Valueの種類が文字列ならtrue
       */
      isString() {
        return false;
      }
      /**
       * Valueの種類が配列ならtrue
       */
      isArray() {
        return false;
      }
      /**
       * Valueの種類がマップ型ならtrue
       */
      isMap() {
        return false;
      }
      equals(value) {
        return false;
      }
      /**
       * Valueの値が静的ならtrue、静的なら解放しない
       */
      isStatic() {
        return false;
      }
      /**
       * Valueにエラー値をセットする
       */
      setErrorNotForClientCall(errorStr) {
        return JsonError.errorValue;
      }
      /**
       * 初期化用メソッド
       */
      static staticInitializeNotForClientCall() {
        JsonBoolean.trueValue = new JsonBoolean(true);
        JsonBoolean.falseValue = new JsonBoolean(false);
        _Value.errorValue = new JsonError("ERROR", true);
        _Value.nullValue = new JsonNullvalue();
        _Value.dummyKeys = new Array();
      }
      /**
       * リリース用メソッド
       */
      static staticReleaseNotForClientCall() {
        JsonBoolean.trueValue = null;
        JsonBoolean.falseValue = null;
        _Value.errorValue = null;
        _Value.nullValue = null;
        _Value.dummyKeys = null;
      }
      _stringBuffer;
      // 文字列バッファ
      static dummyKeys;
      // ダミーキー
      static errorValue;
      // 一時的な返り値として返すエラー。 CubismFramework::Disposeするまではdeleteしない
      static nullValue;
      // 明示的に連想配列をany型で指定
    };
    CubismJson = class _CubismJson {
      /**
       * コンストラクタ
       */
      constructor(buffer, length) {
        this._error = null;
        this._lineCount = 0;
        this._root = null;
        if (buffer != void 0) {
          this.parseBytes(buffer, length, this._parseCallback);
        }
      }
      /**
       * バイトデータから直接ロードしてパースする
       *
       * @param buffer バッファ
       * @param size バッファサイズ
       * @return CubismJsonクラスのインスタンス。失敗したらNULL
       */
      static create(buffer, size) {
        const json = new _CubismJson();
        const succeeded = json.parseBytes(
          buffer,
          size,
          json._parseCallback
        );
        if (!succeeded) {
          _CubismJson.delete(json);
          return null;
        } else {
          return json;
        }
      }
      /**
       * パースしたJSONオブジェクトの解放処理
       *
       * @param instance CubismJsonクラスのインスタンス
       */
      static delete(instance2) {
        instance2 = null;
      }
      /**
       * パースしたJSONのルート要素を返す
       */
      getRoot() {
        return this._root;
      }
      /**
       *  UnicodeのバイナリをStringに変換
       *
       * @param buffer 変換するバイナリデータ
       * @return 変換後の文字列
       */
      static arrayBufferToString(buffer) {
        const uint8Array = new Uint8Array(buffer);
        let str = "";
        for (let i = 0, len = uint8Array.length; i < len; ++i) {
          str += "%" + this.pad(uint8Array[i].toString(16));
        }
        str = decodeURIComponent(str);
        return str;
      }
      /**
       * エンコード、パディング
       */
      static pad(n) {
        return n.length < 2 ? "0" + n : n;
      }
      /**
       * JSONのパースを実行する
       * @param buffer    パース対象のデータバイト
       * @param size      データバイトのサイズ
       * return true : 成功
       * return false: 失敗
       */
      parseBytes(buffer, size, parseCallback) {
        const endPos = new Array(1);
        const decodeBuffer = _CubismJson.arrayBufferToString(buffer);
        if (parseCallback == void 0) {
          this._root = this.parseValue(decodeBuffer, size, 0, endPos);
        } else {
          this._root = parseCallback(JSON.parse(decodeBuffer), new JsonMap());
        }
        if (this._error) {
          let strbuf = "\0";
          strbuf = "Json parse error : @line " + (this._lineCount + 1) + "\n";
          this._root = new JsonString(strbuf);
          CubismLogInfo("{0}", this._root.getRawString());
          return false;
        } else if (this._root == null) {
          this._root = new JsonError(this._error, false);
          return false;
        }
        return true;
      }
      /**
       * パース時のエラー値を返す
       */
      getParseError() {
        return this._error;
      }
      /**
       * ルート要素の次の要素がファイルの終端だったらtrueを返す
       */
      checkEndOfFile() {
        return this._root.getArray()[1].equals("EOF");
      }
      /**
       * JSONエレメントからValue(float,String,Value*,Array,null,true,false)をパースする
       * エレメントの書式に応じて内部でParseString(), ParseObject(), ParseArray()を呼ぶ
       *
       * @param   buffer      JSONエレメントのバッファ
       * @param   length      パースする長さ
       * @param   begin       パースを開始する位置
       * @param   outEndPos   パース終了時の位置
       * @return      パースから取得したValueオブジェクト
       */
      parseValue(buffer, length, begin, outEndPos) {
        if (this._error) return null;
        let o = null;
        let i = begin;
        let f;
        for (; i < length; i++) {
          const c = buffer[i];
          switch (c) {
            case "-":
            case ".":
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9": {
              const afterString = new Array(1);
              f = strtod(buffer.slice(i), afterString);
              outEndPos[0] = buffer.indexOf(afterString[0]);
              return new JsonFloat(f);
            }
            case '"':
              return new JsonString(
                this.parseString(buffer, length, i + 1, outEndPos)
              );
            // \"の次の文字から
            case "[":
              o = this.parseArray(buffer, length, i + 1, outEndPos);
              return o;
            case "{":
              o = this.parseObject(buffer, length, i + 1, outEndPos);
              return o;
            case "n":
              if (i + 3 < length) {
                o = new JsonNullvalue();
                outEndPos[0] = i + 4;
              } else {
                this._error = "parse null";
              }
              return o;
            case "t":
              if (i + 3 < length) {
                o = JsonBoolean.trueValue;
                outEndPos[0] = i + 4;
              } else {
                this._error = "parse true";
              }
              return o;
            case "f":
              if (i + 4 < length) {
                o = JsonBoolean.falseValue;
                outEndPos[0] = i + 5;
              } else {
                this._error = "illegal ',' position";
              }
              return o;
            case ",":
              this._error = "illegal ',' position";
              return null;
            case "]":
              outEndPos[0] = i;
              return null;
            case "\n":
              this._lineCount++;
            // falls through
            case " ":
            case "	":
            case "\r":
            default:
              break;
          }
        }
        this._error = "illegal end of value";
        return null;
      }
      /**
       * 次の「"」までの文字列をパースする。
       *
       * @param   string  ->  パース対象の文字列
       * @param   length  ->  パースする長さ
       * @param   begin   ->  パースを開始する位置
       * @param  outEndPos   ->  パース終了時の位置
       * @return      パースした文F字列要素
       */
      parseString(string, length, begin, outEndPos) {
        if (this._error) {
          return null;
        }
        if (!string) {
          this._error = "string is null";
          return null;
        }
        let i = begin;
        let c, c2;
        let ret = "";
        let bufStart = begin;
        for (; i < length; i++) {
          c = string[i];
          switch (c) {
            case '"': {
              outEndPos[0] = i + 1;
              ret += string.substr(bufStart, i - bufStart);
              return ret;
            }
            // falls through
            case "//": {
              i++;
              if (i - 1 > bufStart) {
                ret += string.substr(bufStart, i - bufStart);
              }
              bufStart = i + 1;
              if (i < length) {
                c2 = string[i];
                switch (c2) {
                  case "\\":
                    ret += "\\";
                    break;
                  case '"':
                    ret += '"';
                    break;
                  case "/":
                    ret += "/";
                    break;
                  case "b":
                    ret += "\b";
                    break;
                  case "f":
                    ret += "\f";
                    break;
                  case "n":
                    ret += "\n";
                    break;
                  case "r":
                    ret += "\r";
                    break;
                  case "t":
                    ret += "	";
                    break;
                  case "u":
                    this._error = "parse string/unicord escape not supported";
                    break;
                  default:
                    break;
                }
              } else {
                this._error = "parse string/escape error";
              }
            }
            // falls through
            default: {
              break;
            }
          }
        }
        this._error = "parse string/illegal end";
        return null;
      }
      /**
       * JSONのオブジェクトエレメントをパースしてValueオブジェクトを返す
       *
       * @param buffer    JSONエレメントのバッファ
       * @param length    パースする長さ
       * @param begin     パースを開始する位置
       * @param outEndPos パース終了時の位置
       * @return パースから取得したValueオブジェクト
       */
      parseObject(buffer, length, begin, outEndPos) {
        if (this._error) {
          return null;
        }
        if (!buffer) {
          this._error = "buffer is null";
          return null;
        }
        const ret = new JsonMap();
        let key = "";
        let i = begin;
        let c = "";
        const localRetEndPos2 = Array(1);
        let ok = false;
        for (; i < length; i++) {
          FOR_LOOP: for (; i < length; i++) {
            c = buffer[i];
            switch (c) {
              case '"':
                key = this.parseString(buffer, length, i + 1, localRetEndPos2);
                if (this._error) {
                  return null;
                }
                i = localRetEndPos2[0];
                ok = true;
                break FOR_LOOP;
              //-- loopから出る
              case "}":
                outEndPos[0] = i + 1;
                return ret;
              // 空
              case ":":
                this._error = "illegal ':' position";
                break;
              case "\n":
                this._lineCount++;
              // falls through
              default:
                break;
            }
          }
          if (!ok) {
            this._error = "key not found";
            return null;
          }
          ok = false;
          FOR_LOOP2: for (; i < length; i++) {
            c = buffer[i];
            switch (c) {
              case ":":
                ok = true;
                i++;
                break FOR_LOOP2;
              case "}":
                this._error = "illegal '}' position";
                break;
              // falls through
              case "\n":
                this._lineCount++;
              // case ' ': case '\t' : case '\r':
              // falls through
              default:
                break;
            }
          }
          if (!ok) {
            this._error = "':' not found";
            return null;
          }
          const value = this.parseValue(buffer, length, i, localRetEndPos2);
          if (this._error) {
            return null;
          }
          i = localRetEndPos2[0];
          ret.put(key, value);
          FOR_LOOP3: for (; i < length; i++) {
            c = buffer[i];
            switch (c) {
              case ",":
                break FOR_LOOP3;
              case "}":
                outEndPos[0] = i + 1;
                return ret;
              // 正常終了
              case "\n":
                this._lineCount++;
              // falls through
              default:
                break;
            }
          }
        }
        this._error = "illegal end of perseObject";
        return null;
      }
      /**
       * 次の「"」までの文字列をパースする。
       * @param buffer    JSONエレメントのバッファ
       * @param length    パースする長さ
       * @param begin     パースを開始する位置
       * @param outEndPos パース終了時の位置
       * @return パースから取得したValueオブジェクト
       */
      parseArray(buffer, length, begin, outEndPos) {
        if (this._error) {
          return null;
        }
        if (!buffer) {
          this._error = "buffer is null";
          return null;
        }
        let ret = new JsonArray();
        let i = begin;
        let c;
        const localRetEndpos2 = new Array(1);
        for (; i < length; i++) {
          const value = this.parseValue(buffer, length, i, localRetEndpos2);
          if (this._error) {
            return null;
          }
          i = localRetEndpos2[0];
          if (value) {
            ret.add(value);
          }
          FOR_LOOP: for (; i < length; i++) {
            c = buffer[i];
            switch (c) {
              case ",":
                break FOR_LOOP;
              case "]":
                outEndPos[0] = i + 1;
                return ret;
              // 終了
              case "\n":
                ++this._lineCount;
              //case ' ': case '\t': case '\r':
              // falls through
              default:
                break;
            }
          }
        }
        ret = void 0;
        this._error = "illegal end of parseObject";
        return null;
      }
      _parseCallback = CubismJsonExtension.parseJsonObject;
      // パース時に使う処理のコールバック関数
      _error;
      // パース時のエラー
      _lineCount;
      // エラー報告に用いる行数カウント
      _root;
      // パースされたルート要素
    };
    JsonFloat = class extends Value2 {
      /**
       * コンストラクタ
       */
      constructor(v) {
        super();
        this._value = v;
      }
      /**
       * Valueの種類が数値型ならtrue
       */
      isFloat() {
        return true;
      }
      /**
       * 要素を文字列で返す(string型)
       */
      getString(defaultValue, indent) {
        const strbuf = "\0";
        this._value = parseFloat(strbuf);
        this._stringBuffer = strbuf;
        return this._stringBuffer;
      }
      /**
       * 要素を数値型で返す(number)
       */
      toInt(defaultValue = 0) {
        return parseInt(this._value.toString());
      }
      /**
       * 要素を数値型で返す(number)
       */
      toFloat(defaultValue = 0) {
        return this._value;
      }
      equals(value) {
        if ("number" === typeof value) {
          if (Math.round(value)) {
            return false;
          } else {
            return value == this._value;
          }
        }
        return false;
      }
      _value;
      // JSON要素の値
    };
    JsonBoolean = class extends Value2 {
      /**
       * Valueの種類が真偽値ならtrue
       */
      isBool() {
        return true;
      }
      /**
       * 要素を真偽値で返す(boolean)
       */
      toBoolean(defaultValue = false) {
        return this._boolValue;
      }
      /**
       * 要素を文字列で返す(string型)
       */
      getString(defaultValue, indent) {
        this._stringBuffer = this._boolValue ? "true" : "false";
        return this._stringBuffer;
      }
      equals(value) {
        if ("boolean" === typeof value) {
          return value == this._boolValue;
        }
        return false;
      }
      /**
       * Valueの値が静的ならtrue, 静的なら解放しない
       */
      isStatic() {
        return true;
      }
      /**
       * 引数付きコンストラクタ
       */
      constructor(v) {
        super();
        this._boolValue = v;
      }
      static trueValue;
      // true
      static falseValue;
      // false
      _boolValue;
      // JSON要素の値
    };
    JsonString = class extends Value2 {
      /**
       * 引数付きコンストラクタ
       */
      constructor(s) {
        super();
        this._stringBuffer = s;
      }
      /**
       * Valueの種類が文字列ならtrue
       */
      isString() {
        return true;
      }
      /**
       * 要素を文字列で返す(string型)
       */
      getString(defaultValue, indent) {
        return this._stringBuffer;
      }
      equals(value) {
        if ("string" === typeof value) {
          return this._stringBuffer == value;
        }
        return false;
      }
    };
    JsonError = class extends JsonString {
      /**
       * Valueの値が静的ならtrue、静的なら解放しない
       */
      isStatic() {
        return this._isStatic;
      }
      /**
       * エラー情報をセットする
       */
      setErrorNotForClientCall(s) {
        this._stringBuffer = s;
        return this;
      }
      /**
       * 引数付きコンストラクタ
       */
      constructor(s, isStatic) {
        if ("string" === typeof s) {
          super(s);
        } else {
          super(s);
        }
        this._isStatic = isStatic;
      }
      /**
       * Valueの種類がエラー値ならtrue
       */
      isError() {
        return true;
      }
      _isStatic;
      // 静的なValueかどうか
    };
    JsonNullvalue = class extends Value2 {
      /**
       * Valueの種類がNULL値ならtrue
       */
      isNull() {
        return true;
      }
      /**
       * 要素を文字列で返す(string型)
       */
      getString(defaultValue, indent) {
        return this._stringBuffer;
      }
      /**
       * Valueの値が静的ならtrue, 静的なら解放しない
       */
      isStatic() {
        return true;
      }
      /**
       * Valueにエラー値をセットする
       */
      setErrorNotForClientCall(s) {
        this._stringBuffer = s;
        return JsonError.nullValue;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._stringBuffer = "NullValue";
      }
    };
    JsonArray = class extends Value2 {
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._array = new Array();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        for (let i = 0; i < this._array.length; i++) {
          let v = this._array[i];
          if (v && !v.isStatic()) {
            v = void 0;
            v = null;
          }
        }
      }
      /**
       * Valueの種類が配列ならtrue
       */
      isArray() {
        return true;
      }
      /**
       * 添字演算子[index]
       */
      getValueByIndex(index) {
        if (index < 0 || this._array.length <= index) {
          return Value2.errorValue.setErrorNotForClientCall(
            CSM_JSON_ERROR_INDEX_OF_BOUNDS
          );
        }
        const v = this._array[index];
        if (v == null) {
          return Value2.nullValue;
        }
        return v;
      }
      /**
       * 添字演算子[string]
       */
      getValueByString(s) {
        return Value2.errorValue.setErrorNotForClientCall(
          CSM_JSON_ERROR_TYPE_MISMATCH
        );
      }
      /**
       * 要素を文字列で返す(string型)
       */
      getString(defaultValue, indent) {
        const stringBuffer = indent + "[\n";
        for (let i = 0; i < this._array.length; i++) {
          const v = this._array[i];
          this._stringBuffer += indent + "" + v.getString(indent + " ") + "\n";
        }
        this._stringBuffer = stringBuffer + indent + "]\n";
        return this._stringBuffer;
      }
      /**
       * 配列要素を追加する
       * @param v 追加する要素
       */
      add(v) {
        this._array.push(v);
      }
      /**
       * 要素をコンテナで返す(Array<Value>)
       */
      getVector(defaultValue = null) {
        return this._array;
      }
      /**
       * 要素の数を返す
       */
      getSize() {
        return this._array.length;
      }
      _array;
      // JSON要素の値
    };
    JsonMap = class extends Value2 {
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._map = /* @__PURE__ */ new Map();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        this._map.clear();
      }
      /**
       * Valueの値がMap型ならtrue
       */
      isMap() {
        return true;
      }
      /**
       * 添字演算子[string]
       */
      getValueByString(s) {
        const ret = this._map.get(s);
        if (ret != void 0) {
          return ret;
        }
        return Value2.nullValue;
      }
      /**
       * 添字演算子[index]
       */
      getValueByIndex(index) {
        return Value2.errorValue.setErrorNotForClientCall(
          CSM_JSON_ERROR_TYPE_MISMATCH
        );
      }
      /**
       * 要素を文字列で返す(string型)
       */
      getString(defaultValue, indent) {
        this._stringBuffer = indent + "{\n";
        for (const element of this._map) {
          const key = element[0];
          const v = element[1];
          this._stringBuffer += indent + " " + key + " : " + v.getString(indent + "   ") + " \n";
        }
        this._stringBuffer += indent + "}\n";
        return this._stringBuffer;
      }
      /**
       * 要素をMap型で返す
       */
      getMap(defaultValue) {
        return this._map;
      }
      /**
       * Mapに要素を追加する
       */
      put(key, v) {
        this._map.set(key, v);
      }
      /**
       * Mapからキーのリストを取得する
       */
      getKeys() {
        if (!this._keys) {
          this._keys = [...this._map.keys()];
        }
        return this._keys;
      }
      /**
       * Mapの要素数を取得する
       */
      getSize() {
        return this._keys.length;
      }
      _map;
      // JSON要素の値
      _keys;
      // JSON要素の値
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismJson = CubismJson;
      Live2DCubismFramework51.JsonArray = JsonArray;
      Live2DCubismFramework51.JsonBoolean = JsonBoolean;
      Live2DCubismFramework51.JsonError = JsonError;
      Live2DCubismFramework51.JsonFloat = JsonFloat;
      Live2DCubismFramework51.JsonMap = JsonMap;
      Live2DCubismFramework51.JsonNullvalue = JsonNullvalue;
      Live2DCubismFramework51.JsonString = JsonString;
      Live2DCubismFramework51.Value = Value2;
    })(Live2DCubismFramework9 || (Live2DCubismFramework9 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/live2dcubismframework.ts
function strtod(s, endPtr) {
  let index = 0;
  for (let i = 1; ; i++) {
    const testC = s.slice(i - 1, i);
    if (testC == "e" || testC == "-" || testC == "E") {
      continue;
    }
    const test = s.substring(0, i);
    const number = Number(test);
    if (isNaN(number)) {
      break;
    }
    index = i;
  }
  let d = parseFloat(s);
  if (isNaN(d)) {
    d = NaN;
  }
  endPtr[0] = s.slice(index);
  return d;
}
function csmDelete(address) {
  if (!address) {
    return;
  }
  address = void 0;
}
var s_isStarted, s_isInitialized, s_option, s_cubismIdManager, Constant, CubismFramework, Option, Live2DCubismFramework10;
var init_live2dcubismframework = __esm({
  "vendor/live2d/sdk/Framework/src/live2dcubismframework.ts"() {
    init_cubismidmanager();
    init_cubismrenderer();
    init_cubismdebug();
    init_cubismjson();
    init_live2dcubismframework();
    s_isStarted = false;
    s_isInitialized = false;
    s_option = null;
    s_cubismIdManager = null;
    Constant = Object.freeze({
      vertexOffset: 0,
      // メッシュ頂点のオフセット値
      vertexStep: 2
      // メッシュ頂点のステップ値
    });
    CubismFramework = class {
      /**
       * Cubism FrameworkのAPIを使用可能にする。
       *  APIを実行する前に必ずこの関数を実行すること。
       *  一度準備が完了して以降は、再び実行しても内部処理がスキップされます。
       *
       * @param    option      Optionクラスのインスタンス
       *
       * @return   準備処理が完了したらtrueが返ります。
       */
      static startUp(option = null) {
        if (s_isStarted) {
          CubismLogInfo("CubismFramework.startUp() is already done.");
          return s_isStarted;
        }
        s_option = option;
        if (s_option != null) {
          Live2DCubismCore.Logging.csmSetLogFunction(s_option.logFunction);
        }
        s_isStarted = true;
        if (s_isStarted) {
          const version = Live2DCubismCore.Version.csmGetVersion();
          const major = (version & 4278190080) >> 24;
          const minor = (version & 16711680) >> 16;
          const patch = version & 65535;
          const versionNumber = version;
          CubismLogInfo(
            `Live2D Cubism Core version: {0}.{1}.{2} ({3})`,
            ("00" + major).slice(-2),
            ("00" + minor).slice(-2),
            ("0000" + patch).slice(-4),
            versionNumber
          );
        }
        CubismLogInfo("CubismFramework.startUp() is complete.");
        return s_isStarted;
      }
      /**
       * StartUp()で初期化したCubismFrameworkの各パラメータをクリアします。
       * Dispose()したCubismFrameworkを再利用する際に利用してください。
       */
      static cleanUp() {
        s_isStarted = false;
        s_isInitialized = false;
        s_option = null;
        s_cubismIdManager = null;
      }
      /**
       * Cubism Framework内のリソースを初期化してモデルを表示可能な状態にします。<br>
       *     再度Initialize()するには先にDispose()を実行する必要があります。
       *
       * @param memorySize 初期化時メモリ量 [byte(s)]
       *    複数モデル表示時などにモデルが更新されない際に使用してください。
       *    指定する際は必ず1024*1024*16 byte(16MB)以上の値を指定してください。
       *    それ以外はすべて1024*1024*16 byteに丸めます。
       */
      static initialize(memorySize = 0) {
        CSM_ASSERT(s_isStarted);
        if (!s_isStarted) {
          CubismLogWarning("CubismFramework is not started.");
          return;
        }
        if (s_isInitialized) {
          CubismLogWarning(
            "CubismFramework.initialize() skipped, already initialized."
          );
          return;
        }
        Value2.staticInitializeNotForClientCall();
        s_cubismIdManager = new CubismIdManager();
        Live2DCubismCore.Memory.initializeAmountOfMemory(memorySize);
        s_isInitialized = true;
        CubismLogInfo("CubismFramework.initialize() is complete.");
      }
      /**
       * Cubism Framework内の全てのリソースを解放します。
       *      ただし、外部で確保されたリソースについては解放しません。
       *      外部で適切に破棄する必要があります。
       */
      static dispose() {
        CSM_ASSERT(s_isStarted);
        if (!s_isStarted) {
          CubismLogWarning("CubismFramework is not started.");
          return;
        }
        if (!s_isInitialized) {
          CubismLogWarning("CubismFramework.dispose() skipped, not initialized.");
          return;
        }
        Value2.staticReleaseNotForClientCall();
        s_cubismIdManager.release();
        s_cubismIdManager = null;
        CubismRenderer.staticRelease();
        s_isInitialized = false;
        CubismLogInfo("CubismFramework.dispose() is complete.");
      }
      /**
       * Cubism FrameworkのAPIを使用する準備が完了したかどうか
       * @return APIを使用する準備が完了していればtrueが返ります。
       */
      static isStarted() {
        return s_isStarted;
      }
      /**
       * Cubism Frameworkのリソース初期化がすでに行われているかどうか
       * @return リソース確保が完了していればtrueが返ります
       */
      static isInitialized() {
        return s_isInitialized;
      }
      /**
       * Core APIにバインドしたログ関数を実行する
       *
       * @praram message ログメッセージ
       */
      static coreLogFunction(message) {
        if (!Live2DCubismCore.Logging.csmGetLogFunction()) {
          return;
        }
        Live2DCubismCore.Logging.csmGetLogFunction()(message);
      }
      /**
       * 現在のログ出力レベル設定の値を返す。
       *
       * @return  現在のログ出力レベル設定の値
       */
      static getLoggingLevel() {
        if (s_option != null) {
          return s_option.loggingLevel;
        }
        return 5 /* LogLevel_Off */;
      }
      /**
       * IDマネージャのインスタンスを取得する
       * @return CubismManagerクラスのインスタンス
       */
      static getIdManager() {
        return s_cubismIdManager;
      }
      /**
       * 静的クラスとして使用する
       * インスタンス化させない
       */
      constructor() {
      }
    };
    Option = class {
      logFunction;
      // ログ出力の関数オブジェクト
      loggingLevel;
      // ログ出力レベルの設定
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.Constant = Constant;
      Live2DCubismFramework51.csmDelete = csmDelete;
      Live2DCubismFramework51.CubismFramework = CubismFramework;
    })(Live2DCubismFramework10 || (Live2DCubismFramework10 = {}));
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/lapppal.ts
var LAppPal;
var init_lapppal = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/lapppal.ts"() {
    LAppPal = class {
      /**
       * ファイルをバイトデータとして読みこむ
       *
       * @param filePath 読み込み対象ファイルのパス
       * @return
       * {
       *      buffer,   読み込んだバイトデータ
       *      size        ファイルサイズ
       * }
       */
      static loadFileAsBytes(filePath, callback) {
        fetch(filePath).then((response) => response.arrayBuffer()).then((arrayBuffer) => callback(arrayBuffer, arrayBuffer.byteLength));
      }
      /**
       * デルタ時間（前回フレームとの差分）を取得する
       * @return デルタ時間[ms]
       */
      static getDeltaTime() {
        return this.deltaTime;
      }
      static updateTime() {
        this.currentFrame = Date.now();
        this.deltaTime = (this.currentFrame - this.lastFrame) / 1e3;
        this.lastFrame = this.currentFrame;
      }
      /**
       * メッセージを出力する
       * @param message 文字列
       */
      static printMessage(message) {
        console.log(message);
      }
      static lastUpdate = Date.now();
      static currentFrame = 0;
      static lastFrame = 0;
      static deltaTime = 0;
    };
  }
});

// vendor/live2d/live2d-player/engine/platform-define.ts
function setActiveCharacter(runtime) {
  ActiveCharacter = runtime;
  ResourcesPath = runtime.resourcesPath;
  ModelDir = runtime.modelDir === "." ? [""] : [runtime.modelDir];
  ModelJsonNames = [runtime.model3Json];
  ModelDirSize = ModelDir.length;
  MotionGroupIdle = runtime.idleGroup ?? "Idle";
  MotionGroupTapBody = pickTapGroup(runtime.motionGroups) ?? MotionGroupIdle;
  HitAreaNameHead = runtime.hitAreas[0]?.name ?? "Head";
  HitAreaNameBody = runtime.hitAreas[1]?.name ?? runtime.hitAreas[0]?.name ?? "Body";
}
function pickTapGroup(motionGroups) {
  const keys = Object.keys(motionGroups);
  const preferred = keys.find((key) => /^Tap/i.test(key) || key.includes("Body") || key.includes("\u8138"));
  return preferred ?? keys.find((key) => key !== "Idle") ?? null;
}
var ResourcesPath, ShaderPath, BackImageName, GearImageName, ModelDir, ModelDirSize, ModelJsonNames, MotionGroupIdle, MotionGroupTapBody, HitAreaNameHead, HitAreaNameBody, EnableAutoIdleMotion, EnableTapMotion, ActiveCharacter, CanvasSize, ViewScale, ViewMaxScale, ViewMinScale, ViewLogicalLeft, ViewLogicalRight, ViewLogicalMaxLeft, ViewLogicalMaxRight, ViewLogicalMaxBottom, ViewLogicalMaxTop, PriorityNone, PriorityIdle, PriorityNormal, PriorityForce, MOCConsistencyValidationEnable, MotionConsistencyValidationEnable, DebugLogEnable, DebugTouchLogEnable, CubismLoggingLevel;
var init_platform_define = __esm({
  "vendor/live2d/live2d-player/engine/platform-define.ts"() {
    init_live2dcubismframework();
    ResourcesPath = "/character/hiyori/";
    ShaderPath = "/live2d-stage/assets/shaders/";
    BackImageName = "back_transparent.png";
    GearImageName = "back_transparent.png";
    ModelDir = ["hiyori_free_t08"];
    ModelDirSize = ModelDir.length;
    ModelJsonNames = ["hiyori_free_t08.model3.json"];
    MotionGroupIdle = "Idle";
    MotionGroupTapBody = "Tap@Body";
    HitAreaNameHead = "Head";
    HitAreaNameBody = "Body";
    EnableAutoIdleMotion = true;
    EnableTapMotion = false;
    ActiveCharacter = null;
    CanvasSize = "auto";
    ViewScale = 1;
    ViewMaxScale = 2;
    ViewMinScale = 0.8;
    ViewLogicalLeft = -1;
    ViewLogicalRight = 1;
    ViewLogicalMaxLeft = -2;
    ViewLogicalMaxRight = 2;
    ViewLogicalMaxBottom = -2;
    ViewLogicalMaxTop = 2;
    PriorityNone = 0;
    PriorityIdle = 1;
    PriorityNormal = 2;
    PriorityForce = 3;
    MOCConsistencyValidationEnable = true;
    MotionConsistencyValidationEnable = true;
    DebugLogEnable = true;
    DebugTouchLogEnable = false;
    CubismLoggingLevel = 3 /* LogLevel_Warning */;
  }
});

// vendor/live2d/live2d-player/engine/platform-gl-manager.ts
var LAppGlManager;
var init_platform_gl_manager = __esm({
  "vendor/live2d/live2d-player/engine/platform-gl-manager.ts"() {
    LAppGlManager = class {
      initialize(canvas) {
        this._gl = canvas.getContext("webgl2", {
          alpha: true,
          premultipliedAlpha: true,
          antialias: true
        });
        if (!this._gl) {
          alert("Cannot initialize WebGL. This browser does not support.");
          this._gl = null;
          return false;
        }
        return true;
      }
      /**
       * 解放する。
       */
      release() {
      }
      getGl() {
        if (!this._gl) {
          throw new Error("WebGL context has not been initialized");
        }
        return this._gl;
      }
      _gl = null;
    };
  }
});

// vendor/live2d/sdk/Framework/src/motion/acubismmotion.ts
var ACubismMotion, Live2DCubismFramework11;
var init_acubismmotion = __esm({
  "vendor/live2d/sdk/Framework/src/motion/acubismmotion.ts"() {
    init_cubismmath();
    init_cubismdebug();
    init_acubismmotion();
    init_live2dcubismframework();
    ACubismMotion = class {
      /**
       * インスタンスの破棄
       */
      static delete(motion) {
        motion.release();
        motion = null;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._fadeInSeconds = -1;
        this._fadeOutSeconds = -1;
        this._weight = 1;
        this._offsetSeconds = 0;
        this._isLoop = false;
        this._isLoopFadeIn = true;
        this._previousLoopState = this._isLoop;
        this._firedEventValues = new Array();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        this._weight = 0;
      }
      /**
       * モデルのパラメータ
       * @param model 対象のモデル
       * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
       * @param userTimeSeconds デルタ時間の積算値[秒]
       */
      updateParameters(model, motionQueueEntry, userTimeSeconds) {
        if (!motionQueueEntry.isAvailable() || motionQueueEntry.isFinished()) {
          return;
        }
        this.setupMotionQueueEntry(motionQueueEntry, userTimeSeconds);
        const fadeWeight = this.updateFadeWeight(motionQueueEntry, userTimeSeconds);
        this.doUpdateParameters(
          model,
          userTimeSeconds,
          fadeWeight,
          motionQueueEntry
        );
        if (motionQueueEntry.getEndTime() > 0 && motionQueueEntry.getEndTime() < userTimeSeconds) {
          motionQueueEntry.setIsFinished(true);
        }
      }
      /**
       * @brief モデルの再生開始処理
       *
       * モーションの再生を開始するためのセットアップを行う。
       *
       * @param[in]   motionQueueEntry    CubismMotionQueueManagerで管理されているモーション
       * @param[in]   userTimeSeconds     デルタ時間の積算値[秒]
       */
      setupMotionQueueEntry(motionQueueEntry, userTimeSeconds) {
        if (motionQueueEntry == null || motionQueueEntry.isStarted()) {
          return;
        }
        if (!motionQueueEntry.isAvailable()) {
          return;
        }
        motionQueueEntry.setIsStarted(true);
        motionQueueEntry.setStartTime(userTimeSeconds - this._offsetSeconds);
        motionQueueEntry.setFadeInStartTime(userTimeSeconds);
        if (motionQueueEntry.getEndTime() < 0) {
          this.adjustEndTime(motionQueueEntry);
        }
        if (motionQueueEntry._motion._onBeganMotion) {
          motionQueueEntry._motion._onBeganMotion(motionQueueEntry._motion);
        }
      }
      /**
       * @brief モデルのウェイト更新
       *
       * モーションのウェイトを更新する。
       *
       * @param[in]   motionQueueEntry    CubismMotionQueueManagerで管理されているモーション
       * @param[in]   userTimeSeconds     デルタ時間の積算値[秒]
       */
      updateFadeWeight(motionQueueEntry, userTimeSeconds) {
        if (motionQueueEntry == null) {
          CubismDebug.print(4 /* LogLevel_Error */, "motionQueueEntry is null.");
        }
        let fadeWeight = this._weight;
        const fadeIn = this._fadeInSeconds == 0 ? 1 : CubismMath.getEasingSine(
          (userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds
        );
        const fadeOut = this._fadeOutSeconds == 0 || motionQueueEntry.getEndTime() < 0 ? 1 : CubismMath.getEasingSine(
          (motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds
        );
        fadeWeight = fadeWeight * fadeIn * fadeOut;
        motionQueueEntry.setState(userTimeSeconds, fadeWeight);
        CSM_ASSERT(0 <= fadeWeight && fadeWeight <= 1);
        return fadeWeight;
      }
      /**
       * フェードインの時間を設定する
       * @param fadeInSeconds フェードインにかかる時間[秒]
       */
      setFadeInTime(fadeInSeconds) {
        this._fadeInSeconds = fadeInSeconds;
      }
      /**
       * フェードアウトの時間を設定する
       * @param fadeOutSeconds フェードアウトにかかる時間[秒]
       */
      setFadeOutTime(fadeOutSeconds) {
        this._fadeOutSeconds = fadeOutSeconds;
      }
      /**
       * フェードアウトにかかる時間の取得
       * @return フェードアウトにかかる時間[秒]
       */
      getFadeOutTime() {
        return this._fadeOutSeconds;
      }
      /**
       * フェードインにかかる時間の取得
       * @return フェードインにかかる時間[秒]
       */
      getFadeInTime() {
        return this._fadeInSeconds;
      }
      /**
       * モーション適用の重みの設定
       * @param weight 重み（0.0 - 1.0）
       */
      setWeight(weight) {
        this._weight = weight;
      }
      /**
       * モーション適用の重みの取得
       * @return 重み（0.0 - 1.0）
       */
      getWeight() {
        return this._weight;
      }
      /**
       * モーションの長さの取得
       * @return モーションの長さ[秒]
       *
       * @note ループの時は「-1」。
       *       ループでない場合は、オーバーライドする。
       *       正の値の時は取得される時間で終了する。
       *       「-1」の時は外部から停止命令がない限り終わらない処理となる。
       */
      getDuration() {
        return -1;
      }
      /**
       * モーションのループ1回分の長さの取得
       * @return モーションのループ一回分の長さ[秒]
       *
       * @note ループしない場合は、getDuration()と同じ値を返す
       *       ループ一回分の長さが定義できない場合(プログラム的に動き続けるサブクラスなど)の場合は「-1」を返す
       */
      getLoopDuration() {
        return -1;
      }
      /**
       * モーション再生の開始時刻の設定
       * @param offsetSeconds モーション再生の開始時刻[秒]
       */
      setOffsetTime(offsetSeconds) {
        this._offsetSeconds = offsetSeconds;
      }
      /**
       * ループ情報の設定
       * @param loop ループ情報
       */
      setLoop(loop) {
        this._isLoop = loop;
      }
      /**
       * ループ情報の取得
       * @return true ループする
       * @return false ループしない
       */
      getLoop() {
        return this._isLoop;
      }
      /**
       * ループ時のフェードイン情報の設定
       * @param loopFadeIn  ループ時のフェードイン情報
       */
      setLoopFadeIn(loopFadeIn) {
        this._isLoopFadeIn = loopFadeIn;
      }
      /**
       * ループ時のフェードイン情報の取得
       *
       * @return  true    する
       * @return  false   しない
       */
      getLoopFadeIn() {
        return this._isLoopFadeIn;
      }
      /**
       * モデルのパラメータ更新
       *
       * イベント発火のチェック。
       * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
       *
       * @param beforeCheckTimeSeconds 前回のイベントチェック時間[秒]
       * @param motionTimeSeconds 今回の再生時間[秒]
       */
      getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
        return this._firedEventValues;
      }
      /**
       * モーション再生開始コールバックの登録
       *
       * モーション再生開始コールバックを登録する。
       * 以下の状態の際には呼び出されない:
       *   1. 再生中のモーションが「ループ」として設定されているとき
       *   2. コールバックが登録されていない時
       *
       * @param onBeganMotionHandler モーション再生開始コールバック関数
       */
      setBeganMotionHandler = (onBeganMotionHandler) => this._onBeganMotion = onBeganMotionHandler;
      /**
       * モーション再生開始コールバックの取得
       *
       * モーション再生開始コールバックを取得する。
       *
       * @return 登録されているモーション再生開始コールバック関数
       */
      getBeganMotionHandler = () => this._onBeganMotion;
      /**
       * モーション再生終了コールバックの登録
       *
       * モーション再生終了コールバックを登録する。
       * isFinishedフラグを設定するタイミングで呼び出される。
       * 以下の状態の際には呼び出されない:
       *   1. 再生中のモーションが「ループ」として設定されているとき
       *   2. コールバックが登録されていない時
       *
       * @param onFinishedMotionHandler モーション再生終了コールバック関数
       */
      setFinishedMotionHandler = (onFinishedMotionHandler) => this._onFinishedMotion = onFinishedMotionHandler;
      /**
       * モーション再生終了コールバックの取得
       *
       * モーション再生終了コールバックを取得する。
       *
       * @return 登録されているモーション再生終了コールバック関数
       */
      getFinishedMotionHandler = () => this._onFinishedMotion;
      /**
       * 透明度のカーブが存在するかどうかを確認する
       *
       * @return true  -> キーが存在する
       *          false -> キーが存在しない
       */
      isExistModelOpacity() {
        return false;
      }
      /**
       * 透明度のカーブのインデックスを返す
       *
       * @return success:透明度のカーブのインデックス
       */
      getModelOpacityIndex() {
        return -1;
      }
      /**
       * 透明度のIdを返す
       *
       * @param index モーションカーブのインデックス
       * @return success:透明度のId
       */
      getModelOpacityId(index) {
        return null;
      }
      /**
       * 指定時間の透明度の値を返す
       *
       * @return success:モーションの現在時間におけるOpacityの値
       *
       * @note  更新後の値を取るにはUpdateParameters() の後に呼び出す。
       */
      getModelOpacityValue() {
        return 1;
      }
      /**
       * 終了時刻の調整
       * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
       */
      adjustEndTime(motionQueueEntry) {
        const duration = this.getDuration();
        const endTime = duration <= 0 ? -1 : motionQueueEntry.getStartTime() + duration;
        motionQueueEntry.setEndTime(endTime);
      }
      _fadeInSeconds;
      // フェードインにかかる時間[秒]
      _fadeOutSeconds;
      // フェードアウトにかかる時間[秒]
      _weight;
      // モーションの重み
      _offsetSeconds;
      // モーション再生の開始時間[秒]
      _isLoop;
      // ループが有効かのフラグ
      _isLoopFadeIn;
      // ループ時にフェードインが有効かどうかのフラグ
      _previousLoopState;
      // 前回の `_isLoop` の状態
      _firedEventValues;
      // モーション再生開始コールバック関数
      _onBeganMotion;
      // モーション再生終了コールバック関数
      _onFinishedMotion;
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.ACubismMotion = ACubismMotion;
    })(Live2DCubismFramework11 || (Live2DCubismFramework11 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismmotionqueueentry.ts
var CubismMotionQueueEntry, Live2DCubismFramework12;
var init_cubismmotionqueueentry = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismmotionqueueentry.ts"() {
    init_acubismmotion();
    init_cubismmotionqueueentry();
    CubismMotionQueueEntry = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._autoDelete = false;
        this._motion = null;
        this._available = true;
        this._finished = false;
        this._started = false;
        this._startTimeSeconds = -1;
        this._fadeInStartTimeSeconds = 0;
        this._endTimeSeconds = -1;
        this._stateTimeSeconds = 0;
        this._stateWeight = 0;
        this._lastEventCheckSeconds = 0;
        this._motionQueueEntryHandle = this;
        this._fadeOutSeconds = 0;
        this._isTriggeredFadeOut = false;
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        if (this._autoDelete && this._motion) {
          ACubismMotion.delete(this._motion);
        }
      }
      /**
       * フェードアウト時間と開始判定の設定
       * @param fadeOutSeconds フェードアウトにかかる時間[秒]
       */
      setFadeOut(fadeOutSeconds) {
        this._fadeOutSeconds = fadeOutSeconds;
        this._isTriggeredFadeOut = true;
      }
      /**
       * フェードアウトの開始
       * @param fadeOutSeconds フェードアウトにかかる時間[秒]
       * @param userTimeSeconds デルタ時間の積算値[秒]
       */
      startFadeOut(fadeOutSeconds, userTimeSeconds) {
        const newEndTimeSeconds = userTimeSeconds + fadeOutSeconds;
        this._isTriggeredFadeOut = true;
        if (this._endTimeSeconds < 0 || newEndTimeSeconds < this._endTimeSeconds) {
          this._endTimeSeconds = newEndTimeSeconds;
        }
      }
      /**
       * モーションの終了の確認
       *
       * @return true モーションが終了した
       * @return false 終了していない
       */
      isFinished() {
        return this._finished;
      }
      /**
       * モーションの開始の確認
       * @return true モーションが開始した
       * @return false 開始していない
       */
      isStarted() {
        return this._started;
      }
      /**
       * モーションの開始時刻の取得
       * @return モーションの開始時刻[秒]
       */
      getStartTime() {
        return this._startTimeSeconds;
      }
      /**
       * フェードインの開始時刻の取得
       * @return フェードインの開始時刻[秒]
       */
      getFadeInStartTime() {
        return this._fadeInStartTimeSeconds;
      }
      /**
       * フェードインの終了時刻の取得
       * @return フェードインの終了時刻の取得
       */
      getEndTime() {
        return this._endTimeSeconds;
      }
      /**
       * モーションの開始時刻の設定
       * @param startTime モーションの開始時刻
       */
      setStartTime(startTime) {
        this._startTimeSeconds = startTime;
      }
      /**
       * フェードインの開始時刻の設定
       * @param startTime フェードインの開始時刻[秒]
       */
      setFadeInStartTime(startTime) {
        this._fadeInStartTimeSeconds = startTime;
      }
      /**
       * フェードインの終了時刻の設定
       * @param endTime フェードインの終了時刻[秒]
       */
      setEndTime(endTime) {
        this._endTimeSeconds = endTime;
      }
      /**
       * モーションの終了の設定
       * @param f trueならモーションの終了
       */
      setIsFinished(f) {
        this._finished = f;
      }
      /**
       * モーション開始の設定
       * @param f trueならモーションの開始
       */
      setIsStarted(f) {
        this._started = f;
      }
      /**
       * モーションの有効性の確認
       * @return true モーションは有効
       * @return false モーションは無効
       */
      isAvailable() {
        return this._available;
      }
      /**
       * モーションの有効性の設定
       * @param v trueならモーションは有効
       */
      setIsAvailable(v) {
        this._available = v;
      }
      /**
       * モーションの状態の設定
       * @param timeSeconds 現在時刻[秒]
       * @param weight モーション尾重み
       */
      setState(timeSeconds, weight) {
        this._stateTimeSeconds = timeSeconds;
        this._stateWeight = weight;
      }
      /**
       * モーションの現在時刻の取得
       * @return モーションの現在時刻[秒]
       */
      getStateTime() {
        return this._stateTimeSeconds;
      }
      /**
       * モーションの重みの取得
       * @return モーションの重み
       */
      getStateWeight() {
        return this._stateWeight;
      }
      /**
       * 最後にイベントの発火をチェックした時間を取得
       *
       * @return 最後にイベントの発火をチェックした時間[秒]
       */
      getLastCheckEventSeconds() {
        return this._lastEventCheckSeconds;
      }
      /**
       * 最後にイベントをチェックした時間を設定
       * @param checkSeconds 最後にイベントをチェックした時間[秒]
       */
      setLastCheckEventSeconds(checkSeconds) {
        this._lastEventCheckSeconds = checkSeconds;
      }
      /**
       * フェードアウト開始判定の取得
       * @return フェードアウト開始するかどうか
       */
      isTriggeredFadeOut() {
        return this._isTriggeredFadeOut;
      }
      /**
       * フェードアウト時間の取得
       * @return フェードアウト時間[秒]
       */
      getFadeOutSeconds() {
        return this._fadeOutSeconds;
      }
      /**
       * モーションの取得
       *
       * @return モーション
       */
      getCubismMotion() {
        return this._motion;
      }
      _autoDelete;
      // 自動削除
      _motion;
      // モーション
      _available;
      // 有効化フラグ
      _finished;
      // 終了フラグ
      _started;
      // 開始フラグ
      _startTimeSeconds;
      // モーション再生開始時刻[秒]
      _fadeInStartTimeSeconds;
      // フェードイン開始時刻（ループの時は初回のみ）[秒]
      _endTimeSeconds;
      // 終了予定時刻[秒]
      _stateTimeSeconds;
      // 時刻の状態[秒]
      _stateWeight;
      // 重みの状態
      _lastEventCheckSeconds;
      // 最終のMotion側のチェックした時間
      _fadeOutSeconds;
      // フェードアウト時間[秒]
      _isTriggeredFadeOut;
      // フェードアウト開始フラグ
      _motionQueueEntryHandle;
      // インスタンスごとに一意の値を持つ識別番号
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMotionQueueEntry = CubismMotionQueueEntry;
    })(Live2DCubismFramework12 || (Live2DCubismFramework12 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismmotionqueuemanager.ts
var CubismMotionQueueManager, InvalidMotionQueueEntryHandleValue, Live2DCubismFramework13;
var init_cubismmotionqueuemanager = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismmotionqueuemanager.ts"() {
    init_cubismmotionqueueentry();
    init_cubismmotionqueuemanager();
    CubismMotionQueueManager = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._userTimeSeconds = 0;
        this._eventCallBack = null;
        this._eventCustomData = null;
        this._motions = new Array();
      }
      /**
       * デストラクタ
       */
      release() {
        for (let i = 0; i < this._motions.length; ++i) {
          if (this._motions[i]) {
            this._motions[i].release();
            this._motions[i] = null;
          }
        }
        this._motions = null;
      }
      /**
       * 指定したモーションの開始
       *
       * 指定したモーションを開始する。同じタイプのモーションが既にある場合は、既存のモーションに終了フラグを立て、フェードアウトを開始させる。
       *
       * @param   motion          開始するモーション
       * @param   autoDelete      再生が終了したモーションのインスタンスを削除するなら true
       * @param   userTimeSeconds Deprecated: デルタ時間の積算値[秒] 関数内で参照していないため使用は非推奨。
       * @return                      開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
       */
      startMotion(motion, autoDelete, userTimeSeconds) {
        if (motion == null) {
          return InvalidMotionQueueEntryHandleValue;
        }
        let motionQueueEntry = null;
        for (let i = 0; i < this._motions.length; ++i) {
          motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            continue;
          }
          motionQueueEntry.setFadeOut(motionQueueEntry._motion.getFadeOutTime());
        }
        motionQueueEntry = new CubismMotionQueueEntry();
        motionQueueEntry._autoDelete = autoDelete;
        motionQueueEntry._motion = motion;
        this._motions.push(motionQueueEntry);
        return motionQueueEntry._motionQueueEntryHandle;
      }
      /**
       * 全てのモーションの終了の確認
       * @return true 全て終了している
       * @return false 終了していない
       */
      isFinished() {
        for (let i = 0; i < this._motions.length; ) {
          let motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            this._motions.splice(i, 1);
            continue;
          }
          const motion = motionQueueEntry._motion;
          if (motion == null) {
            motionQueueEntry.release();
            motionQueueEntry = null;
            this._motions.splice(i, 1);
            continue;
          }
          if (!motionQueueEntry.isFinished()) {
            return false;
          } else {
            i++;
          }
        }
        return true;
      }
      /**
       * 指定したモーションの終了の確認
       * @param motionQueueEntryNumber モーションの識別番号
       * @return true 全て終了している
       * @return false 終了していない
       */
      isFinishedByHandle(motionQueueEntryNumber) {
        for (let i = 0; i < this._motions.length; i++) {
          const motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            continue;
          }
          if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber && !motionQueueEntry.isFinished()) {
            return false;
          }
        }
        return true;
      }
      /**
       * 全てのモーションを停止する
       */
      stopAllMotions() {
        for (let i = 0; i < this._motions.length; i++) {
          const motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            this._motions.splice(i, 1);
            continue;
          }
          motionQueueEntry.release();
          this._motions.splice(i, 1);
          continue;
        }
      }
      /**
       * @brief CubismMotionQueueEntryの配列の取得
       *
       * CubismMotionQueueEntryの配列を取得する。
       *
       * @return  CubismMotionQueueEntryの配列へのポインタ
       *          NULL   見つからなかった
       */
      getCubismMotionQueueEntries() {
        return this._motions;
      }
      /**
         * 指定したCubismMotionQueueEntryの取得
      
         * @param   motionQueueEntryNumber  モーションの識別番号
         * @return  指定したCubismMotionQueueEntry
         * @return  null   見つからなかった
         */
      getCubismMotionQueueEntry(motionQueueEntryNumber) {
        for (let i = 0; i < this._motions.length; i++) {
          const motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            continue;
          }
          if (motionQueueEntry._motionQueueEntryHandle == motionQueueEntryNumber) {
            return motionQueueEntry;
          }
        }
        return null;
      }
      /**
       * イベントを受け取るCallbackの登録
       *
       * @param callback コールバック関数
       * @param customData コールバックに返されるデータ
       */
      setEventCallback(callback, customData = null) {
        this._eventCallBack = callback;
        this._eventCustomData = customData;
      }
      /**
       * モーションを更新して、モデルにパラメータ値を反映する。
       *
       * @param   model   対象のモデル
       * @param   userTimeSeconds   デルタ時間の積算値[秒]
       * @return  true    モデルへパラメータ値の反映あり
       * @return  false   モデルへパラメータ値の反映なし(モーションの変化なし)
       */
      doUpdateMotion(model, userTimeSeconds) {
        let updated = false;
        for (let i = 0; i < this._motions.length; ) {
          let motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            this._motions.splice(i, 1);
            continue;
          }
          const motion = motionQueueEntry._motion;
          if (motion == null) {
            motionQueueEntry.release();
            motionQueueEntry = null;
            this._motions.splice(i, 1);
            continue;
          }
          motion.updateParameters(model, motionQueueEntry, userTimeSeconds);
          updated = true;
          const firedList = motion.getFiredEvent(
            motionQueueEntry.getLastCheckEventSeconds() - motionQueueEntry.getStartTime(),
            userTimeSeconds - motionQueueEntry.getStartTime()
          );
          for (let i2 = 0; i2 < firedList.length; ++i2) {
            this._eventCallBack(this, firedList[i2], this._eventCustomData);
          }
          motionQueueEntry.setLastCheckEventSeconds(userTimeSeconds);
          if (motionQueueEntry.isFinished()) {
            motionQueueEntry.release();
            motionQueueEntry = null;
            this._motions.splice(i, 1);
          } else {
            if (motionQueueEntry.isTriggeredFadeOut()) {
              motionQueueEntry.startFadeOut(
                motionQueueEntry.getFadeOutSeconds(),
                userTimeSeconds
              );
            }
            i++;
          }
        }
        return updated;
      }
      _userTimeSeconds;
      // デルタ時間の積算値[秒]
      _motions;
      // モーション
      _eventCallBack;
      // コールバック関数
      _eventCustomData;
      // コールバックに戻されるデータ
    };
    InvalidMotionQueueEntryHandleValue = -1;
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMotionQueueManager = CubismMotionQueueManager;
      Live2DCubismFramework51.InvalidMotionQueueEntryHandleValue = InvalidMotionQueueEntryHandleValue;
    })(Live2DCubismFramework13 || (Live2DCubismFramework13 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/utils/cubismarrayutils.ts
function updateSize(curArray, newSize, value = null, callPlacementNew = null) {
  const curSize = curArray.length;
  if (curSize < newSize) {
    if (callPlacementNew) {
      for (let i = curArray.length; i < newSize; i++) {
        if (typeof value == "function") {
          curArray[i] = JSON.parse(JSON.stringify(new value()));
        } else {
          curArray[i] = value;
        }
      }
    } else {
      for (let i = curArray.length; i < newSize; i++) {
        curArray[i] = value;
      }
    }
  } else {
    curArray.length = newSize;
  }
}
var init_cubismarrayutils = __esm({
  "vendor/live2d/sdk/Framework/src/utils/cubismarrayutils.ts"() {
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismrendertarget_webgl.ts
var CubismRenderTarget_WebGL, Live2DCubismFramework14;
var init_cubismrendertarget_webgl = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismrendertarget_webgl.ts"() {
    init_cubismdebug();
    init_cubismrendertarget_webgl();
    CubismRenderTarget_WebGL = class {
      /**
       * WebGL2RenderingContext.blitFramebuffer() でバッファのコピーを行う。
       *
       * @param src コピー元のオフスクリーンサーフェス
       * @param dst コピー先のオフスクリーンサーフェス
       */
      static copyBuffer(gl, src, dst) {
        if (src == null || dst == null) {
          return;
        }
        if (!(gl instanceof WebGL2RenderingContext)) {
          throw new Error("WebGL2RenderingContext is required for buffer copy.");
        }
        const previousFramebuffer = gl.getParameter(
          gl.FRAMEBUFFER_BINDING
        );
        gl.bindFramebuffer(gl.READ_FRAMEBUFFER, src.getRenderTexture());
        gl.bindFramebuffer(gl.DRAW_FRAMEBUFFER, dst.getRenderTexture());
        gl.blitFramebuffer(
          0,
          0,
          src.getBufferWidth(),
          src.getBufferHeight(),
          0,
          0,
          dst.getBufferWidth(),
          dst.getBufferHeight(),
          gl.COLOR_BUFFER_BIT,
          gl.NEAREST
        );
        gl.bindFramebuffer(gl.FRAMEBUFFER, previousFramebuffer);
      }
      /**
       * 描画を開始する。
       *
       * @param restoreFbo EndDraw時に復元するFBOを指定する。nullを指定すると、beginDraw時に現在のFBOを記憶しておく。
       */
      beginDraw(restoreFbo = null) {
        if (this._renderTexture == null) {
          console.error("_renderTexture is null");
          return;
        }
        if (restoreFbo == null) {
          this._oldFbo = this._gl.getParameter(this._gl.FRAMEBUFFER_BINDING);
        } else {
          this._oldFbo = restoreFbo;
        }
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._renderTexture);
      }
      /**
       * 描画を終了し、バックバッファのサーフェイスを復元する。
       */
      endDraw() {
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, this._oldFbo);
      }
      /**
       * バインドされているカラーバッファのクリアを行う。
       *
       * @param r 赤の成分 (0.0 - 1.0)
       * @param g 緑の成分 (0.0 - 1.0)
       * @param b 青の成分 (0.0 - 1.0)
       * @param a アルファの成分 (0.0 - 1.0)
       */
      clear(r, g, b, a) {
        this._gl.clearColor(r, g, b, a);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
      }
      /**
       * オフスクリーンサーフェスを作成する。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       *          NOTE: Cubism 5.3以降のモデルが使用される場合はWebGL2RenderingContextを使用すること。
       * @param displayBufferWidth オフスクリーンサーフェスの幅
       * @param displayBufferHeight オフスクリーンサーフェスの高さ
       * @param previousFramebuffer 前のフレームバッファ
       *
       * @return 成功した場合はtrue、失敗した場合はfalse
       */
      createRenderTarget(gl, displayBufferWidth, displayBufferHeight, previousFramebuffer) {
        this.destroyRenderTarget();
        this._colorBuffer = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._colorBuffer);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          displayBufferWidth,
          displayBufferHeight,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          null
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.bindTexture(gl.TEXTURE_2D, null);
        const ret = gl.createFramebuffer();
        if (ret == null) {
          CubismLogError("Failed to create framebuffer");
          return false;
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, ret);
        gl.framebufferTexture2D(
          gl.FRAMEBUFFER,
          gl.COLOR_ATTACHMENT0,
          gl.TEXTURE_2D,
          this._colorBuffer,
          0
        );
        const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
          CubismLogError("Framebuffer is not complete");
          gl.bindFramebuffer(gl.FRAMEBUFFER, previousFramebuffer);
          gl.deleteFramebuffer(ret);
          this.destroyRenderTarget();
          return false;
        }
        this._renderTexture = ret;
        this._bufferWidth = displayBufferWidth;
        this._bufferHeight = displayBufferHeight;
        this._gl = gl;
        return true;
      }
      /**
       * レンダーターゲットを破棄する。
       */
      destroyRenderTarget() {
        if (this._colorBuffer) {
          this._gl.bindTexture(this._gl.TEXTURE_2D, null);
          this._gl.deleteTexture(this._colorBuffer);
          this._colorBuffer = null;
        }
        if (this._renderTexture) {
          this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, null);
          this._gl.deleteFramebuffer(this._renderTexture);
          this._renderTexture = null;
        }
      }
      /**
       * WebGLのコンテキストを取得する。
       *
       * @return WebGLRenderingContextまたはWebGL2RenderingContext
       */
      getGL() {
        return this._gl;
      }
      /**
       * レンダーテクスチャを取得する。
       *
       * @return WebGLFramebuffer
       */
      getRenderTexture() {
        return this._renderTexture;
      }
      /**
       * カラーバッファを取得する。
       *
       * @return WebGLTexture
       */
      getColorBuffer() {
        return this._colorBuffer;
      }
      /**
       * カラーバッファの幅を取得する。
       *
       * @return カラーバッファの幅
       */
      getBufferWidth() {
        return this._bufferWidth;
      }
      /**
       * カラーバッファの高さを取得する。
       *
       * @return カラーバッファの高さ
       */
      getBufferHeight() {
        return this._bufferHeight;
      }
      /**
       * オフスクリーンサーフェスが有効かどうかを確認する。
       *
       * @return 有効な場合はtrue、無効な場合はfalse
       */
      isValid() {
        return this._renderTexture != null;
      }
      /**
       * 以前のフレームバッファを取得する。
       *
       * @return 以前のフレームバッファ
       */
      getOldFBO() {
        return this._oldFbo;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._gl = null;
        this._colorBuffer = null;
        this._renderTexture = null;
        this._bufferWidth = 0;
        this._bufferHeight = 0;
        this._oldFbo = null;
      }
      _gl;
      // WebGLのコンテキスト
      _colorBuffer;
      // カラーバッファ
      _renderTexture;
      // フレームバッファ
      _bufferWidth;
      // カラーバッファの幅
      _bufferHeight;
      // カラーバッファの高さ
      _oldFbo;
      // 以前のフレームバッファ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismOffscreenSurface_WebGL = CubismRenderTarget_WebGL;
    })(Live2DCubismFramework14 || (Live2DCubismFramework14 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismoffscreenmanager.ts
var CubismRenderTargetContainer, CubismWebGLContextManager, CubismWebGLOffscreenManager;
var init_cubismoffscreenmanager = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismoffscreenmanager.ts"() {
    init_cubismarrayutils();
    init_cubismdebug();
    init_cubismrendertarget_webgl();
    CubismRenderTargetContainer = class {
      /**
       * Constructor
       *
       * @param colorBuffer カラーバッファ
       * @param renderTexture レンダーテクスチャ
       * @param inUse 使用中かどうか
       */
      constructor(colorBuffer = null, renderTexture = null, inUse = false) {
        this.colorBuffer = colorBuffer;
        this.renderTexture = renderTexture;
        this.inUse = inUse;
      }
      clear() {
        this.colorBuffer = null;
        this.renderTexture = null;
        this.inUse = false;
      }
      /**
       * カラーバッファを取得
       *
       * @returns カラーバッファ
       */
      getColorBuffer() {
        return this.colorBuffer;
      }
      /**
       * レンダーテクスチャを取得
       *
       * @returns レンダーテクスチャ
       */
      getRenderTexture() {
        return this.renderTexture;
      }
      colorBuffer;
      // colorBuffer
      renderTexture;
      // renderTarget
      inUse;
      // Whether this container's render target is currently in use
    };
    CubismWebGLContextManager = class {
      constructor(gl) {
        this.gl = gl;
        this.offscreenRenderTargetContainers = new Array();
        this.previousActiveRenderTextureMaxCount = 0;
        this.currentActiveRenderTextureCount = 0;
        this.hasResetThisFrame = false;
        this.width = 0;
        this.height = 0;
      }
      release() {
        if (this.offscreenRenderTargetContainers != null) {
          for (let index = 0; index < this.offscreenRenderTargetContainers.length; ++index) {
            const container = this.offscreenRenderTargetContainers[index];
            this.gl.deleteTexture(container.colorBuffer);
            this.gl.deleteFramebuffer(container.renderTexture);
          }
          this.offscreenRenderTargetContainers.length = 0;
          this.offscreenRenderTargetContainers = null;
        }
      }
      gl;
      // WebGLContext
      offscreenRenderTargetContainers;
      // オフスクリーン描画用レンダーターゲットのリスト
      previousActiveRenderTextureMaxCount;
      // 直前のアクティブなレンダーターゲットの最大数
      currentActiveRenderTextureCount;
      // 現在のアクティブなレンダーターゲットの数
      hasResetThisFrame;
      // 今フレームでリセットされたかどうか
      width;
      // 幅
      height;
      // 高さ
    };
    CubismWebGLOffscreenManager = class _CubismWebGLOffscreenManager {
      /**
       * コンストラクタ
       */
      constructor() {
        this._contextManagers = /* @__PURE__ */ new Map();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        if (this._contextManagers != null) {
          for (const manager of this._contextManagers.values()) {
            manager.release();
          }
          this._contextManagers.clear();
          this._contextManagers = null;
        }
        _CubismWebGLOffscreenManager._instance = null;
      }
      /**
       * インスタンスの取得
       *
       * @return インスタンス
       */
      static getInstance() {
        if (this._instance == null) {
          this._instance = new _CubismWebGLOffscreenManager();
        }
        return this._instance;
      }
      /**
       * WebGLContextに対応するマネージャーを取得または作成
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @return WebGLContextManager
       */
      getContextManager(gl) {
        if (!this._contextManagers.has(gl)) {
          this._contextManagers.set(gl, new CubismWebGLContextManager(gl));
        }
        return this._contextManagers.get(gl);
      }
      /**
       * 指定されたWebGLContextのマネージャーを削除
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      removeContext(gl) {
        if (this._contextManagers.has(gl)) {
          const manager = this._contextManagers.get(gl);
          manager.release();
          this._contextManagers.delete(gl);
        }
      }
      /**
       * 初期化処理
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @param width 幅
       * @param height 高さ
       */
      initialize(gl, width, height) {
        const contextManager = this.getContextManager(gl);
        if (contextManager.offscreenRenderTargetContainers != null) {
          for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
            const container = contextManager.offscreenRenderTargetContainers[index];
            contextManager.gl.deleteTexture(container.colorBuffer);
            contextManager.gl.deleteFramebuffer(container.renderTexture);
            container.clear();
          }
          contextManager.offscreenRenderTargetContainers.length = 0;
        } else {
          contextManager.offscreenRenderTargetContainers = new Array();
        }
        contextManager.width = width;
        contextManager.height = height;
        contextManager.previousActiveRenderTextureMaxCount = 0;
        contextManager.currentActiveRenderTextureCount = 0;
        contextManager.hasResetThisFrame = false;
      }
      /**
       * モデルを描画する前に呼び出すフレーム開始時の処理を行う
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      beginFrameProcess(gl) {
        const contextManager = this.getContextManager(gl);
        if (contextManager.hasResetThisFrame) {
          return;
        }
        contextManager.previousActiveRenderTextureMaxCount = 0;
        contextManager.hasResetThisFrame = true;
      }
      /**
       * モデルの描画が終わった後に呼び出すフレーム終了時の処理
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      endFrameProcess(gl) {
        const contextManager = this.getContextManager(gl);
        contextManager.hasResetThisFrame = false;
      }
      /**
       * コンテナサイズの取得
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      getContainerSize(gl) {
        const contextManager = this.getContextManager(gl);
        if (contextManager.offscreenRenderTargetContainers == null) {
          return 0;
        }
        return contextManager.offscreenRenderTargetContainers.length;
      }
      /**
       * 使用可能なリソースコンテナの取得
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @param width 幅
       * @param height 高さ
       * @param previousFramebuffer 前のフレームバッファ
       * @return 使用可能なリソースコンテナ
       */
      getOffscreenRenderTargetContainers(gl, width, height, previousFramebuffer) {
        const contextManager = this.getContextManager(gl);
        if (contextManager.width != width || contextManager.height != height || contextManager.offscreenRenderTargetContainers == null) {
          this.initialize(gl, width, height);
        }
        this.updateRenderTargetContainerCount(gl);
        const container = this.getUnusedOffscreenRenderTargetContainer(gl);
        if (container != null) {
          return container;
        }
        const offscreenRenderTextureContainer = this.createOffscreenRenderTargetContainer(
          gl,
          width,
          height,
          previousFramebuffer
        );
        return offscreenRenderTextureContainer;
      }
      /**
       * リソースコンテナの使用状態を取得
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @param renderTexture WebGLFramebuffer
       * @return 使用中はtrue、未使用の場合はfalse
       */
      getUsingRenderTextureState(gl, renderTexture) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
          if (contextManager.offscreenRenderTargetContainers[index].renderTexture == renderTexture) {
            return contextManager.offscreenRenderTargetContainers[index].inUse;
          }
        }
        return true;
      }
      /**
       * リソースコンテナの使用を開始する。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @param renderTexture WebGLFramebuffer
       */
      startUsingRenderTexture(gl, renderTexture) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
          if (contextManager.offscreenRenderTargetContainers[index].renderTexture != renderTexture) {
            continue;
          }
          contextManager.offscreenRenderTargetContainers[index].inUse = true;
          this.updateRenderTargetContainerCount(gl);
          break;
        }
      }
      /**
       * リソースコンテナの使用を終了する。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @param renderTexture WebGLFramebuffer
       */
      stopUsingRenderTexture(gl, renderTexture) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
          if (contextManager.offscreenRenderTargetContainers[index].renderTexture != renderTexture) {
            continue;
          }
          contextManager.offscreenRenderTargetContainers[index].inUse = false;
          contextManager.currentActiveRenderTextureCount--;
          if (contextManager.currentActiveRenderTextureCount < 0) {
            contextManager.currentActiveRenderTextureCount = 0;
          }
          break;
        }
      }
      /**
       * リソースコンテナの使用を全て終了する。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      stopUsingAllRenderTextures(gl) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
          contextManager.offscreenRenderTargetContainers[index].inUse = false;
        }
        contextManager.currentActiveRenderTextureCount = 0;
      }
      /**
       * 使用されていないリソースコンテナを解放する。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      releaseStaleRenderTextures(gl) {
        const contextManager = this.getContextManager(gl);
        const listSize = contextManager.offscreenRenderTargetContainers.length;
        if (contextManager.hasResetThisFrame || listSize === 0) {
          return;
        }
        let findPos = 0;
        let resize = contextManager.previousActiveRenderTextureMaxCount;
        for (let i = listSize; contextManager.previousActiveRenderTextureMaxCount < i; --i) {
          const index = i - 1;
          if (contextManager.offscreenRenderTargetContainers[index].inUse) {
            let isFind = false;
            for (; findPos < contextManager.previousActiveRenderTextureMaxCount; ++findPos) {
              if (!contextManager.offscreenRenderTargetContainers[findPos].inUse) {
                const tempContainer = contextManager.offscreenRenderTargetContainers[findPos];
                contextManager.offscreenRenderTargetContainers[findPos] = contextManager.offscreenRenderTargetContainers[index];
                contextManager.offscreenRenderTargetContainers[findPos].inUse = true;
                contextManager.offscreenRenderTargetContainers[index] = tempContainer;
                contextManager.offscreenRenderTargetContainers[index].inUse = false;
                isFind = true;
                break;
              }
            }
            if (!isFind) {
              resize = i;
              break;
            }
          }
          const container = contextManager.offscreenRenderTargetContainers[index];
          contextManager.gl.bindTexture(contextManager.gl.TEXTURE_2D, null);
          contextManager.gl.deleteTexture(container.colorBuffer);
          contextManager.gl.bindFramebuffer(contextManager.gl.FRAMEBUFFER, null);
          contextManager.gl.deleteFramebuffer(container.renderTexture);
          container.clear();
        }
        updateSize(contextManager.offscreenRenderTargetContainers, resize);
      }
      /**
       * 直前のアクティブなレンダーターゲットの最大数を取得
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @returns 直前のアクティブなレンダーターゲットの最大数
       */
      getPreviousActiveRenderTextureCount(gl) {
        const contextManager = this.getContextManager(gl);
        return contextManager.previousActiveRenderTextureMaxCount;
      }
      /**
       * 現在のアクティブなレンダーターゲットの数を取得
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @returns 現在のアクティブなレンダーターゲットの数
       */
      getCurrentActiveRenderTextureCount(gl) {
        const contextManager = this.getContextManager(gl);
        return contextManager.currentActiveRenderTextureCount;
      }
      /**
       * 現在のアクティブなレンダーターゲットの数を更新
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       */
      updateRenderTargetContainerCount(gl) {
        const contextManager = this.getContextManager(gl);
        ++contextManager.currentActiveRenderTextureCount;
        contextManager.previousActiveRenderTextureMaxCount = contextManager.currentActiveRenderTextureCount > contextManager.previousActiveRenderTextureMaxCount ? contextManager.currentActiveRenderTextureCount : contextManager.previousActiveRenderTextureMaxCount;
      }
      /**
       * 使用されていないリソースコンテナの取得
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @return 使用されていないリソースコンテナ
       */
      getUnusedOffscreenRenderTargetContainer(gl) {
        const contextManager = this.getContextManager(gl);
        for (let index = 0; index < contextManager.offscreenRenderTargetContainers.length; ++index) {
          const container = contextManager.offscreenRenderTargetContainers[index];
          if (container.inUse == false) {
            container.inUse = true;
            return container;
          }
        }
        return null;
      }
      /**
       * 新たにリソースコンテナを作成する。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       * @param width 幅
       * @param height 高さ
       * @param previousFramebuffer 前のフレームバッファ
       * @return 作成されたリソースコンテナ
       */
      createOffscreenRenderTargetContainer(gl, width, height, previousFramebuffer) {
        const renderTarget = new CubismRenderTarget_WebGL();
        if (!renderTarget.createRenderTarget(gl, width, height, previousFramebuffer)) {
          CubismLogError("Failed to create offscreen render texture.");
          return null;
        }
        const offscreenRenderTextureContainer = new CubismRenderTargetContainer(
          renderTarget.getColorBuffer(),
          renderTarget.getRenderTexture(),
          true
        );
        const contextManager = this.getContextManager(gl);
        contextManager.offscreenRenderTargetContainers.push(
          offscreenRenderTextureContainer
        );
        return offscreenRenderTextureContainer;
      }
      static _instance;
      // オフスクリーン描画用レンダーターゲットマネージャ
      _contextManagers;
      // WebGLContextごとのマネージャー
    };
  }
});

// vendor/live2d/sdk/Framework/src/cubismdefaultparameterid.ts
var CubismDefaultParameterId, Live2DCubismFramework15;
var init_cubismdefaultparameterid = __esm({
  "vendor/live2d/sdk/Framework/src/cubismdefaultparameterid.ts"() {
    init_cubismdefaultparameterid();
    CubismDefaultParameterId = Object.freeze({
      // パーツID
      HitAreaPrefix: "HitArea",
      HitAreaHead: "Head",
      HitAreaBody: "Body",
      PartsIdCore: "Parts01Core",
      PartsArmPrefix: "Parts01Arm_",
      PartsArmLPrefix: "Parts01ArmL_",
      PartsArmRPrefix: "Parts01ArmR_",
      // パラメータID
      ParamAngleX: "ParamAngleX",
      ParamAngleY: "ParamAngleY",
      ParamAngleZ: "ParamAngleZ",
      ParamEyeLOpen: "ParamEyeLOpen",
      ParamEyeLSmile: "ParamEyeLSmile",
      ParamEyeROpen: "ParamEyeROpen",
      ParamEyeRSmile: "ParamEyeRSmile",
      ParamEyeBallX: "ParamEyeBallX",
      ParamEyeBallY: "ParamEyeBallY",
      ParamEyeBallForm: "ParamEyeBallForm",
      ParamBrowLY: "ParamBrowLY",
      ParamBrowRY: "ParamBrowRY",
      ParamBrowLX: "ParamBrowLX",
      ParamBrowRX: "ParamBrowRX",
      ParamBrowLAngle: "ParamBrowLAngle",
      ParamBrowRAngle: "ParamBrowRAngle",
      ParamBrowLForm: "ParamBrowLForm",
      ParamBrowRForm: "ParamBrowRForm",
      ParamMouthForm: "ParamMouthForm",
      ParamMouthOpenY: "ParamMouthOpenY",
      ParamCheek: "ParamCheek",
      ParamBodyAngleX: "ParamBodyAngleX",
      ParamBodyAngleY: "ParamBodyAngleY",
      ParamBodyAngleZ: "ParamBodyAngleZ",
      ParamBreath: "ParamBreath",
      ParamArmLA: "ParamArmLA",
      ParamArmRA: "ParamArmRA",
      ParamArmLB: "ParamArmLB",
      ParamArmRB: "ParamArmRB",
      ParamHandL: "ParamHandL",
      ParamHandR: "ParamHandR",
      ParamHairFront: "ParamHairFront",
      ParamHairSide: "ParamHairSide",
      ParamHairBack: "ParamHairBack",
      ParamHairFluffy: "ParamHairFluffy",
      ParamShoulderY: "ParamShoulderY",
      ParamBustX: "ParamBustX",
      ParamBustY: "ParamBustY",
      ParamBaseX: "ParamBaseX",
      ParamBaseY: "ParamBaseY",
      ParamNONE: "NONE:"
    });
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.HitAreaBody = CubismDefaultParameterId.HitAreaBody;
      Live2DCubismFramework51.HitAreaHead = CubismDefaultParameterId.HitAreaHead;
      Live2DCubismFramework51.HitAreaPrefix = CubismDefaultParameterId.HitAreaPrefix;
      Live2DCubismFramework51.ParamAngleX = CubismDefaultParameterId.ParamAngleX;
      Live2DCubismFramework51.ParamAngleY = CubismDefaultParameterId.ParamAngleY;
      Live2DCubismFramework51.ParamAngleZ = CubismDefaultParameterId.ParamAngleZ;
      Live2DCubismFramework51.ParamArmLA = CubismDefaultParameterId.ParamArmLA;
      Live2DCubismFramework51.ParamArmLB = CubismDefaultParameterId.ParamArmLB;
      Live2DCubismFramework51.ParamArmRA = CubismDefaultParameterId.ParamArmRA;
      Live2DCubismFramework51.ParamArmRB = CubismDefaultParameterId.ParamArmRB;
      Live2DCubismFramework51.ParamBaseX = CubismDefaultParameterId.ParamBaseX;
      Live2DCubismFramework51.ParamBaseY = CubismDefaultParameterId.ParamBaseY;
      Live2DCubismFramework51.ParamBodyAngleX = CubismDefaultParameterId.ParamBodyAngleX;
      Live2DCubismFramework51.ParamBodyAngleY = CubismDefaultParameterId.ParamBodyAngleY;
      Live2DCubismFramework51.ParamBodyAngleZ = CubismDefaultParameterId.ParamBodyAngleZ;
      Live2DCubismFramework51.ParamBreath = CubismDefaultParameterId.ParamBreath;
      Live2DCubismFramework51.ParamBrowLAngle = CubismDefaultParameterId.ParamBrowLAngle;
      Live2DCubismFramework51.ParamBrowLForm = CubismDefaultParameterId.ParamBrowLForm;
      Live2DCubismFramework51.ParamBrowLX = CubismDefaultParameterId.ParamBrowLX;
      Live2DCubismFramework51.ParamBrowLY = CubismDefaultParameterId.ParamBrowLY;
      Live2DCubismFramework51.ParamBrowRAngle = CubismDefaultParameterId.ParamBrowRAngle;
      Live2DCubismFramework51.ParamBrowRForm = CubismDefaultParameterId.ParamBrowRForm;
      Live2DCubismFramework51.ParamBrowRX = CubismDefaultParameterId.ParamBrowRX;
      Live2DCubismFramework51.ParamBrowRY = CubismDefaultParameterId.ParamBrowRY;
      Live2DCubismFramework51.ParamBustX = CubismDefaultParameterId.ParamBustX;
      Live2DCubismFramework51.ParamBustY = CubismDefaultParameterId.ParamBustY;
      Live2DCubismFramework51.ParamCheek = CubismDefaultParameterId.ParamCheek;
      Live2DCubismFramework51.ParamEyeBallForm = CubismDefaultParameterId.ParamEyeBallForm;
      Live2DCubismFramework51.ParamEyeBallX = CubismDefaultParameterId.ParamEyeBallX;
      Live2DCubismFramework51.ParamEyeBallY = CubismDefaultParameterId.ParamEyeBallY;
      Live2DCubismFramework51.ParamEyeLOpen = CubismDefaultParameterId.ParamEyeLOpen;
      Live2DCubismFramework51.ParamEyeLSmile = CubismDefaultParameterId.ParamEyeLSmile;
      Live2DCubismFramework51.ParamEyeROpen = CubismDefaultParameterId.ParamEyeROpen;
      Live2DCubismFramework51.ParamEyeRSmile = CubismDefaultParameterId.ParamEyeRSmile;
      Live2DCubismFramework51.ParamHairBack = CubismDefaultParameterId.ParamHairBack;
      Live2DCubismFramework51.ParamHairFluffy = CubismDefaultParameterId.ParamHairFluffy;
      Live2DCubismFramework51.ParamHairFront = CubismDefaultParameterId.ParamHairFront;
      Live2DCubismFramework51.ParamHairSide = CubismDefaultParameterId.ParamHairSide;
      Live2DCubismFramework51.ParamHandL = CubismDefaultParameterId.ParamHandL;
      Live2DCubismFramework51.ParamHandR = CubismDefaultParameterId.ParamHandR;
      Live2DCubismFramework51.ParamMouthForm = CubismDefaultParameterId.ParamMouthForm;
      Live2DCubismFramework51.ParamMouthOpenY = CubismDefaultParameterId.ParamMouthOpenY;
      Live2DCubismFramework51.ParamNONE = CubismDefaultParameterId.ParamNONE;
      Live2DCubismFramework51.ParamShoulderY = CubismDefaultParameterId.ParamShoulderY;
      Live2DCubismFramework51.PartsArmLPrefix = CubismDefaultParameterId.PartsArmLPrefix;
      Live2DCubismFramework51.PartsArmPrefix = CubismDefaultParameterId.PartsArmPrefix;
      Live2DCubismFramework51.PartsArmRPrefix = CubismDefaultParameterId.PartsArmRPrefix;
      Live2DCubismFramework51.PartsIdCore = CubismDefaultParameterId.PartsIdCore;
    })(Live2DCubismFramework15 || (Live2DCubismFramework15 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/icubismmodelsetting.ts
var ICubismModelSetting, Live2DCubismFramework16;
var init_icubismmodelsetting = __esm({
  "vendor/live2d/sdk/Framework/src/icubismmodelsetting.ts"() {
    init_icubismmodelsetting();
    ICubismModelSetting = class {
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.ICubismModelSetting = ICubismModelSetting;
    })(Live2DCubismFramework16 || (Live2DCubismFramework16 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/cubismmodelsettingjson.ts
var FrequestNode, CubismModelSettingJson, Live2DCubismFramework17;
var init_cubismmodelsettingjson = __esm({
  "vendor/live2d/sdk/Framework/src/cubismmodelsettingjson.ts"() {
    init_icubismmodelsetting();
    init_live2dcubismframework();
    init_cubismjson();
    init_cubismmodelsettingjson();
    FrequestNode = /* @__PURE__ */ ((FrequestNode2) => {
      FrequestNode2[FrequestNode2["FrequestNode_Groups"] = 0] = "FrequestNode_Groups";
      FrequestNode2[FrequestNode2["FrequestNode_Moc"] = 1] = "FrequestNode_Moc";
      FrequestNode2[FrequestNode2["FrequestNode_Motions"] = 2] = "FrequestNode_Motions";
      FrequestNode2[FrequestNode2["FrequestNode_Expressions"] = 3] = "FrequestNode_Expressions";
      FrequestNode2[FrequestNode2["FrequestNode_Textures"] = 4] = "FrequestNode_Textures";
      FrequestNode2[FrequestNode2["FrequestNode_Physics"] = 5] = "FrequestNode_Physics";
      FrequestNode2[FrequestNode2["FrequestNode_Pose"] = 6] = "FrequestNode_Pose";
      FrequestNode2[FrequestNode2["FrequestNode_HitAreas"] = 7] = "FrequestNode_HitAreas";
      return FrequestNode2;
    })(FrequestNode || {});
    CubismModelSettingJson = class extends ICubismModelSetting {
      /**
       * 引数付きコンストラクタ
       *
       * @param buffer    Model3Jsonをバイト配列として読み込んだデータバッファ
       * @param size      Model3Jsonのデータサイズ
       */
      constructor(buffer, size) {
        super();
        this._json = CubismJson.create(buffer, size);
        if (this.getJson()) {
          this._jsonValue = [
            // 順番はenum FrequestNodeと一致させる
            this.getJson().getRoot().getValueByString(this.groups),
            this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.moc),
            this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.motions),
            this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.expressions),
            this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.textures),
            this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.physics),
            this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.pose),
            this.getJson().getRoot().getValueByString(this.hitAreas)
          ];
        }
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        CubismJson.delete(this._json);
        this._jsonValue = null;
      }
      /**
       * CubismJsonオブジェクトを取得する
       *
       * @return CubismJson
       */
      getJson() {
        return this._json;
      }
      /**
       * Mocファイルの名前を取得する
       * @return Mocファイルの名前
       */
      getModelFileName() {
        if (!this.isExistModelFile()) {
          return "";
        }
        return this._jsonValue[1 /* FrequestNode_Moc */].getRawString();
      }
      /**
       * モデルが使用するテクスチャの数を取得する
       * テクスチャの数
       */
      getTextureCount() {
        if (!this.isExistTextureFiles()) {
          return 0;
        }
        return this._jsonValue[4 /* FrequestNode_Textures */].getSize();
      }
      /**
       * テクスチャが配置されたディレクトリの名前を取得する
       * @return テクスチャが配置されたディレクトリの名前
       */
      getTextureDirectory() {
        const texturePath = this._jsonValue[4 /* FrequestNode_Textures */].getValueByIndex(0).getRawString();
        const pathArray = texturePath.split("/");
        const arrayLength = pathArray.length - 1;
        let textureDirectoryStr = "";
        for (let i = 0; i < arrayLength; i++) {
          textureDirectoryStr += pathArray[i];
          if (i < arrayLength - 1) {
            textureDirectoryStr += "/";
          }
        }
        return textureDirectoryStr;
      }
      /**
       * モデルが使用するテクスチャの名前を取得する
       * @param index 配列のインデックス値
       * @return テクスチャの名前
       */
      getTextureFileName(index) {
        return this._jsonValue[4 /* FrequestNode_Textures */].getValueByIndex(index).getRawString();
      }
      /**
       * モデルに設定された当たり判定の数を取得する
       * @return モデルに設定された当たり判定の数
       */
      getHitAreasCount() {
        if (!this.isExistHitAreas()) {
          return 0;
        }
        return this._jsonValue[7 /* FrequestNode_HitAreas */].getSize();
      }
      /**
       * 当たり判定に設定されたIDを取得する
       *
       * @param index 配列のindex
       * @return 当たり判定に設定されたID
       */
      getHitAreaId(index) {
        return CubismFramework.getIdManager().getId(
          this._jsonValue[7 /* FrequestNode_HitAreas */].getValueByIndex(index).getValueByString(this.id).getRawString()
        );
      }
      /**
       * 当たり判定に設定された名前を取得する
       * @param index 配列のインデックス値
       * @return 当たり判定に設定された名前
       */
      getHitAreaName(index) {
        return this._jsonValue[7 /* FrequestNode_HitAreas */].getValueByIndex(index).getValueByString(this.name).getRawString();
      }
      /**
       * 物理演算設定ファイルの名前を取得する
       * @return 物理演算設定ファイルの名前
       */
      getPhysicsFileName() {
        if (!this.isExistPhysicsFile()) {
          return "";
        }
        return this._jsonValue[5 /* FrequestNode_Physics */].getRawString();
      }
      /**
       * パーツ切り替え設定ファイルの名前を取得する
       * @return パーツ切り替え設定ファイルの名前
       */
      getPoseFileName() {
        if (!this.isExistPoseFile()) {
          return "";
        }
        return this._jsonValue[6 /* FrequestNode_Pose */].getRawString();
      }
      /**
       * 表情設定ファイルの数を取得する
       * @return 表情設定ファイルの数
       */
      getExpressionCount() {
        if (!this.isExistExpressionFile()) {
          return 0;
        }
        return this._jsonValue[3 /* FrequestNode_Expressions */].getSize();
      }
      /**
       * 表情設定ファイルを識別する名前（別名）を取得する
       * @param index 配列のインデックス値
       * @return 表情の名前
       */
      getExpressionName(index) {
        return this._jsonValue[3 /* FrequestNode_Expressions */].getValueByIndex(index).getValueByString(this.name).getRawString();
      }
      /**
       * 表情設定ファイルの名前を取得する
       * @param index 配列のインデックス値
       * @return 表情設定ファイルの名前
       */
      getExpressionFileName(index) {
        return this._jsonValue[3 /* FrequestNode_Expressions */].getValueByIndex(index).getValueByString(this.filePath).getRawString();
      }
      /**
       * モーショングループの数を取得する
       * @return モーショングループの数
       */
      getMotionGroupCount() {
        if (!this.isExistMotionGroups()) {
          return 0;
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getKeys().length;
      }
      /**
       * モーショングループの名前を取得する
       * @param index 配列のインデックス値
       * @return モーショングループの名前
       */
      getMotionGroupName(index) {
        if (!this.isExistMotionGroups()) {
          return null;
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getKeys()[index];
      }
      /**
       * モーショングループに含まれるモーションの数を取得する
       * @param groupName モーショングループの名前
       * @return モーショングループの数
       */
      getMotionCount(groupName) {
        if (!this.isExistMotionGroupName(groupName)) {
          return 0;
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getSize();
      }
      /**
       * グループ名とインデックス値からモーションファイル名を取得する
       * @param groupName モーショングループの名前
       * @param index     配列のインデックス値
       * @return モーションファイルの名前
       */
      getMotionFileName(groupName, index) {
        if (!this.isExistMotionGroupName(groupName)) {
          return "";
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.filePath).getRawString();
      }
      /**
       * モーションに対応するサウンドファイルの名前を取得する
       * @param groupName モーショングループの名前
       * @param index 配列のインデックス値
       * @return サウンドファイルの名前
       */
      getMotionSoundFileName(groupName, index) {
        if (!this.isExistMotionSoundFile(groupName, index)) {
          return "";
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.soundPath).getRawString();
      }
      /**
       * モーション開始時のフェードイン処理時間を取得する
       * @param groupName モーショングループの名前
       * @param index 配列のインデックス値
       * @return フェードイン処理時間[秒]
       */
      getMotionFadeInTimeValue(groupName, index) {
        if (!this.isExistMotionFadeIn(groupName, index)) {
          return -1;
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeInTime).toFloat();
      }
      /**
       * モーション終了時のフェードアウト処理時間を取得する
       * @param groupName モーショングループの名前
       * @param index 配列のインデックス値
       * @return フェードアウト処理時間[秒]
       */
      getMotionFadeOutTimeValue(groupName, index) {
        if (!this.isExistMotionFadeOut(groupName, index)) {
          return -1;
        }
        return this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeOutTime).toFloat();
      }
      /**
       * ユーザーデータのファイル名を取得する
       * @return ユーザーデータのファイル名
       */
      getUserDataFile() {
        if (!this.isExistUserDataFile()) {
          return "";
        }
        return this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.userData).getRawString();
      }
      /**
       * レイアウト情報を取得する
       * @param outLayoutMap Mapクラスのインスタンス
       * @return true レイアウト情報が存在する
       * @return false レイアウト情報が存在しない
       */
      getLayoutMap(outLayoutMap) {
        const map = this.getJson().getRoot().getValueByString(this.layout).getMap();
        if (map == null) {
          return false;
        }
        let ret = false;
        for (const element of map) {
          outLayoutMap.set(element[0], element[1].toFloat());
          ret = true;
        }
        return ret;
      }
      /**
       * 目パチに関連付けられたパラメータの数を取得する
       * @return 目パチに関連付けられたパラメータの数
       */
      getEyeBlinkParameterCount() {
        if (!this.isExistEyeBlinkParameters()) {
          return 0;
        }
        let num = 0;
        for (let i = 0; i < this._jsonValue[0 /* FrequestNode_Groups */].getSize(); i++) {
          const refI = this._jsonValue[0 /* FrequestNode_Groups */].getValueByIndex(i);
          if (refI.isNull() || refI.isError()) {
            continue;
          }
          if (refI.getValueByString(this.name).getRawString() == this.eyeBlink) {
            num = refI.getValueByString(this.ids).getVector().length;
            break;
          }
        }
        return num;
      }
      /**
       * 目パチに関連付けられたパラメータのIDを取得する
       * @param index 配列のインデックス値
       * @return パラメータID
       */
      getEyeBlinkParameterId(index) {
        if (!this.isExistEyeBlinkParameters()) {
          return null;
        }
        for (let i = 0; i < this._jsonValue[0 /* FrequestNode_Groups */].getSize(); i++) {
          const refI = this._jsonValue[0 /* FrequestNode_Groups */].getValueByIndex(i);
          if (refI.isNull() || refI.isError()) {
            continue;
          }
          if (refI.getValueByString(this.name).getRawString() == this.eyeBlink) {
            return CubismFramework.getIdManager().getId(
              refI.getValueByString(this.ids).getValueByIndex(index).getRawString()
            );
          }
        }
        return null;
      }
      /**
       * リップシンクに関連付けられたパラメータの数を取得する
       * @return リップシンクに関連付けられたパラメータの数
       */
      getLipSyncParameterCount() {
        if (!this.isExistLipSyncParameters()) {
          return 0;
        }
        let num = 0;
        for (let i = 0; i < this._jsonValue[0 /* FrequestNode_Groups */].getSize(); i++) {
          const refI = this._jsonValue[0 /* FrequestNode_Groups */].getValueByIndex(i);
          if (refI.isNull() || refI.isError()) {
            continue;
          }
          if (refI.getValueByString(this.name).getRawString() == this.lipSync) {
            num = refI.getValueByString(this.ids).getVector().length;
            break;
          }
        }
        return num;
      }
      /**
       * リップシンクに関連付けられたパラメータの数を取得する
       * @param index 配列のインデックス値
       * @return パラメータID
       */
      getLipSyncParameterId(index) {
        if (!this.isExistLipSyncParameters()) {
          return null;
        }
        for (let i = 0; i < this._jsonValue[0 /* FrequestNode_Groups */].getSize(); i++) {
          const refI = this._jsonValue[0 /* FrequestNode_Groups */].getValueByIndex(i);
          if (refI.isNull() || refI.isError()) {
            continue;
          }
          if (refI.getValueByString(this.name).getRawString() == this.lipSync) {
            return CubismFramework.getIdManager().getId(
              refI.getValueByString(this.ids).getValueByIndex(index).getRawString()
            );
          }
        }
        return null;
      }
      /**
       * モデルファイルのキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistModelFile() {
        const node = this._jsonValue[1 /* FrequestNode_Moc */];
        return !node.isNull() && !node.isError();
      }
      /**
       * テクスチャファイルのキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistTextureFiles() {
        const node = this._jsonValue[4 /* FrequestNode_Textures */];
        return !node.isNull() && !node.isError();
      }
      /**
       * 当たり判定のキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistHitAreas() {
        const node = this._jsonValue[7 /* FrequestNode_HitAreas */];
        return !node.isNull() && !node.isError();
      }
      /**
       * 物理演算ファイルのキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistPhysicsFile() {
        const node = this._jsonValue[5 /* FrequestNode_Physics */];
        return !node.isNull() && !node.isError();
      }
      /**
       * ポーズ設定ファイルのキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistPoseFile() {
        const node = this._jsonValue[6 /* FrequestNode_Pose */];
        return !node.isNull() && !node.isError();
      }
      /**
       * 表情設定ファイルのキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistExpressionFile() {
        const node = this._jsonValue[3 /* FrequestNode_Expressions */];
        return !node.isNull() && !node.isError();
      }
      /**
       * モーショングループのキーが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistMotionGroups() {
        const node = this._jsonValue[2 /* FrequestNode_Motions */];
        return !node.isNull() && !node.isError();
      }
      /**
       * 引数で指定したモーショングループのキーが存在するかどうかを確認する
       * @param groupName  グループ名
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistMotionGroupName(groupName) {
        const node = this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(
          groupName
        );
        return !node.isNull() && !node.isError();
      }
      /**
       * 引数で指定したモーションに対応するサウンドファイルのキーが存在するかどうかを確認する
       * @param groupName  グループ名
       * @param index 配列のインデックス値
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistMotionSoundFile(groupName, index) {
        const node = this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.soundPath);
        return !node.isNull() && !node.isError();
      }
      /**
       * 引数で指定したモーションに対応するフェードイン時間のキーが存在するかどうかを確認する
       * @param groupName  グループ名
       * @param index 配列のインデックス値
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistMotionFadeIn(groupName, index) {
        const node = this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeInTime);
        return !node.isNull() && !node.isError();
      }
      /**
       * 引数で指定したモーションに対応するフェードアウト時間のキーが存在するかどうかを確認する
       * @param groupName  グループ名
       * @param index 配列のインデックス値
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistMotionFadeOut(groupName, index) {
        const node = this._jsonValue[2 /* FrequestNode_Motions */].getValueByString(groupName).getValueByIndex(index).getValueByString(this.fadeOutTime);
        return !node.isNull() && !node.isError();
      }
      /**
       * UserDataのファイル名が存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistUserDataFile() {
        const node = this.getJson().getRoot().getValueByString(this.fileReferences).getValueByString(this.userData);
        return !node.isNull() && !node.isError();
      }
      /**
       * 目ぱちに対応付けられたパラメータが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistEyeBlinkParameters() {
        if (this._jsonValue[0 /* FrequestNode_Groups */].isNull() || this._jsonValue[0 /* FrequestNode_Groups */].isError()) {
          return false;
        }
        for (let i = 0; i < this._jsonValue[0 /* FrequestNode_Groups */].getSize(); ++i) {
          if (this._jsonValue[0 /* FrequestNode_Groups */].getValueByIndex(i).getValueByString(this.name).getRawString() == this.eyeBlink) {
            return true;
          }
        }
        return false;
      }
      /**
       * リップシンクに対応付けられたパラメータが存在するかどうかを確認する
       * @return true キーが存在する
       * @return false キーが存在しない
       */
      isExistLipSyncParameters() {
        if (this._jsonValue[0 /* FrequestNode_Groups */].isNull() || this._jsonValue[0 /* FrequestNode_Groups */].isError()) {
          return false;
        }
        for (let i = 0; i < this._jsonValue[0 /* FrequestNode_Groups */].getSize(); ++i) {
          if (this._jsonValue[0 /* FrequestNode_Groups */].getValueByIndex(i).getValueByString(this.name).getRawString() == this.lipSync) {
            return true;
          }
        }
        return false;
      }
      _json;
      _jsonValue;
      /**
       * Model3Jsonのキー文字列
       */
      version = "Version";
      fileReferences = "FileReferences";
      groups = "Groups";
      layout = "Layout";
      hitAreas = "HitAreas";
      moc = "Moc";
      textures = "Textures";
      physics = "Physics";
      pose = "Pose";
      expressions = "Expressions";
      motions = "Motions";
      userData = "UserData";
      name = "Name";
      filePath = "File";
      id = "Id";
      ids = "Ids";
      target = "Target";
      // Motions
      idle = "Idle";
      tapBody = "TapBody";
      pinchIn = "PinchIn";
      pinchOut = "PinchOut";
      shake = "Shake";
      flickHead = "FlickHead";
      parameter = "Parameter";
      soundPath = "Sound";
      fadeInTime = "FadeInTime";
      fadeOutTime = "FadeOutTime";
      // Layout
      centerX = "CenterX";
      centerY = "CenterY";
      x = "X";
      y = "Y";
      width = "Width";
      height = "Height";
      lipSync = "LipSync";
      eyeBlink = "EyeBlink";
      initParameter = "init_param";
      initPartsVisible = "init_parts_visible";
      val = "val";
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismModelSettingJson = CubismModelSettingJson;
      Live2DCubismFramework51.FrequestNode = FrequestNode;
    })(Live2DCubismFramework17 || (Live2DCubismFramework17 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/effect/cubismbreath.ts
var CubismBreath, BreathParameterData, Live2DCubismFramework18;
var init_cubismbreath = __esm({
  "vendor/live2d/sdk/Framework/src/effect/cubismbreath.ts"() {
    init_cubismbreath();
    CubismBreath = class _CubismBreath {
      /**
       * インスタンスの作成
       */
      static create() {
        return new _CubismBreath();
      }
      /**
       * インスタンスの破棄
       * @param instance 対象のCubismBreath
       */
      static delete(instance2) {
        if (instance2 != null) {
          instance2 = null;
        }
      }
      /**
       * 呼吸のパラメータの紐づけ
       * @param breathParameters 呼吸を紐づけたいパラメータのリスト
       */
      setParameters(breathParameters) {
        this._breathParameters = breathParameters;
      }
      /**
       * 呼吸に紐づいているパラメータの取得
       * @return 呼吸に紐づいているパラメータのリスト
       */
      getParameters() {
        return this._breathParameters;
      }
      /**
       * モデルのパラメータの更新
       * @param model 対象のモデル
       * @param deltaTimeSeconds デルタ時間[秒]
       */
      updateParameters(model, deltaTimeSeconds) {
        this._currentTime += deltaTimeSeconds;
        const t = this._currentTime * 2 * Math.PI;
        for (let i = 0; i < this._breathParameters.length; ++i) {
          const data = this._breathParameters[i];
          model.addParameterValueById(
            data.parameterId,
            data.offset + data.peak * Math.sin(t / data.cycle),
            data.weight
          );
        }
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._currentTime = 0;
      }
      _breathParameters;
      // 呼吸にひもづいているパラメータのリスト
      _currentTime;
      // 積算時間[秒]
    };
    BreathParameterData = class {
      /**
       * コンストラクタ
       * @param parameterId   呼吸をひもづけるパラメータID
       * @param offset        呼吸を正弦波としたときの、波のオフセット
       * @param peak          呼吸を正弦波としたときの、波の高さ
       * @param cycle         呼吸を正弦波としたときの、波の周期
       * @param weight        パラメータへの重み
       */
      constructor(parameterId, offset, peak, cycle, weight) {
        this.parameterId = parameterId == void 0 ? null : parameterId;
        this.offset = offset == void 0 ? 0 : offset;
        this.peak = peak == void 0 ? 0 : peak;
        this.cycle = cycle == void 0 ? 0 : cycle;
        this.weight = weight == void 0 ? 0 : weight;
      }
      parameterId;
      // 呼吸をひもづけるパラメータID\
      offset;
      // 呼吸を正弦波としたときの、波のオフセット
      peak;
      // 呼吸を正弦波としたときの、波の高さ
      cycle;
      // 呼吸を正弦波としたときの、波の周期
      weight;
      // パラメータへの重み
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.BreathParameterData = BreathParameterData;
      Live2DCubismFramework51.CubismBreath = CubismBreath;
    })(Live2DCubismFramework18 || (Live2DCubismFramework18 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/effect/cubismlook.ts
var CubismLook, LookParameterData, Live2DCubismFramework19;
var init_cubismlook = __esm({
  "vendor/live2d/sdk/Framework/src/effect/cubismlook.ts"() {
    init_cubismlook();
    CubismLook = class _CubismLook {
      /**
       * インスタンスの作成
       */
      static create() {
        return new _CubismLook();
      }
      /**
       * インスタンスの破棄
       * @param instance 対象のCubismDrag
       */
      static delete(instance2) {
        if (instance2 != null) {
          instance2 = null;
        }
      }
      /**
       * ターゲット追従のパラメータの紐づけ
       * @param lookParameters ターゲット追従を紐づけたいパラメータのリスト
       */
      setParameters(lookParameters) {
        this._lookParameters = lookParameters;
      }
      /**
       * ターゲット追従に紐づいているパラメータの取得
       * @return ターゲット追従に紐づいているパラメータのリスト
       */
      getParameters() {
        return this._lookParameters;
      }
      /**
       * モデルのパラメータの更新
       * @param model 対象のモデル
       * @param dragX ターゲットのX座標
       * @param dragY ターゲットのY座標
       */
      updateParameters(model, dragX, dragY) {
        for (let i = 0; i < this._lookParameters.length; ++i) {
          const data = this._lookParameters[i];
          model.addParameterValueById(
            data.parameterId,
            data.factorX * dragX + data.factorY * dragY + data.factorXY * dragX * dragY
          );
        }
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._lookParameters = new Array();
      }
      _lookParameters;
      // ターゲット追従に紐づいているパラメータのリスト
    };
    LookParameterData = class {
      /**
       * コンストラクタ
       * @param parameterId   ターゲット追従を紐づけるパラメータID
       * @param factorX       X方向ドラッグ入力に対する係数
       * @param factorY       Y方向ドラッグ入力に対する係数
       * @param factorXY      XY積ドラッグ入力に対する係数
       */
      constructor(parameterId, factorX, factorY, factorXY) {
        this.parameterId = parameterId == void 0 ? null : parameterId;
        this.factorX = factorX == void 0 ? 0 : factorX;
        this.factorY = factorY == void 0 ? 0 : factorY;
        this.factorXY = factorXY == void 0 ? 0 : factorXY;
      }
      parameterId;
      // ターゲット追従を紐づけるパラメータID
      factorX;
      // X方向ドラッグ入力に対する係数
      factorY;
      // Y方向ドラッグ入力に対する係数
      factorXY;
      // XY積ドラッグ入力に対する係数
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.LookParameterData = LookParameterData;
      Live2DCubismFramework51.CubismLook = CubismLook;
    })(Live2DCubismFramework19 || (Live2DCubismFramework19 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/effect/cubismeyeblink.ts
var CubismEyeBlink, EyeState, Live2DCubismFramework20;
var init_cubismeyeblink = __esm({
  "vendor/live2d/sdk/Framework/src/effect/cubismeyeblink.ts"() {
    init_cubismeyeblink();
    CubismEyeBlink = class _CubismEyeBlink {
      /**
       * インスタンスを作成する
       * @param modelSetting モデルの設定情報
       * @return 作成されたインスタンス
       * @note 引数がNULLの場合、パラメータIDが設定されていない空のインスタンスを作成する。
       */
      static create(modelSetting = null) {
        return new _CubismEyeBlink(modelSetting);
      }
      /**
       * インスタンスの破棄
       * @param eyeBlink 対象のCubismEyeBlink
       */
      static delete(eyeBlink) {
        if (eyeBlink != null) {
          eyeBlink = null;
        }
      }
      /**
       * まばたきの間隔の設定
       * @param blinkingInterval まばたきの間隔の時間[秒]
       */
      setBlinkingInterval(blinkingInterval) {
        this._blinkingIntervalSeconds = blinkingInterval;
      }
      /**
       * まばたきのモーションの詳細設定
       * @param closing   まぶたを閉じる動作の所要時間[秒]
       * @param closed    まぶたを閉じている動作の所要時間[秒]
       * @param opening   まぶたを開く動作の所要時間[秒]
       */
      setBlinkingSetting(closing, closed, opening) {
        this._closingSeconds = closing;
        this._closedSeconds = closed;
        this._openingSeconds = opening;
      }
      /**
       * まばたきさせるパラメータIDのリストの設定
       * @param parameterIds パラメータのIDのリスト
       */
      setParameterIds(parameterIds) {
        this._parameterIds = parameterIds;
      }
      /**
       * まばたきさせるパラメータIDのリストの取得
       * @return パラメータIDのリスト
       */
      getParameterIds() {
        return this._parameterIds;
      }
      /**
       * モデルのパラメータの更新
       * @param model 対象のモデル
       * @param deltaTimeSeconds デルタ時間[秒]
       */
      updateParameters(model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        let parameterValue;
        let t = 0;
        const blinkingState = this._blinkingState;
        switch (blinkingState) {
          case 2 /* EyeState_Closing */:
            t = (this._userTimeSeconds - this._stateStartTimeSeconds) / this._closingSeconds;
            if (t >= 1) {
              t = 1;
              this._blinkingState = 3 /* EyeState_Closed */;
              this._stateStartTimeSeconds = this._userTimeSeconds;
            }
            parameterValue = 1 - t;
            break;
          case 3 /* EyeState_Closed */:
            t = (this._userTimeSeconds - this._stateStartTimeSeconds) / this._closedSeconds;
            if (t >= 1) {
              this._blinkingState = 4 /* EyeState_Opening */;
              this._stateStartTimeSeconds = this._userTimeSeconds;
            }
            parameterValue = 0;
            break;
          case 4 /* EyeState_Opening */:
            t = (this._userTimeSeconds - this._stateStartTimeSeconds) / this._openingSeconds;
            if (t >= 1) {
              t = 1;
              this._blinkingState = 1 /* EyeState_Interval */;
              this._nextBlinkingTime = this.determinNextBlinkingTiming();
            }
            parameterValue = t;
            break;
          case 1 /* EyeState_Interval */:
            if (this._nextBlinkingTime < this._userTimeSeconds) {
              this._blinkingState = 2 /* EyeState_Closing */;
              this._stateStartTimeSeconds = this._userTimeSeconds;
            }
            parameterValue = 1;
            break;
          case 0 /* EyeState_First */:
          default:
            this._blinkingState = 1 /* EyeState_Interval */;
            this._nextBlinkingTime = this.determinNextBlinkingTiming();
            parameterValue = 1;
            break;
        }
        if (!_CubismEyeBlink.CloseIfZero) {
          parameterValue = -parameterValue;
        }
        for (let i = 0; i < this._parameterIds.length; ++i) {
          model.setParameterValueById(this._parameterIds[i], parameterValue);
        }
      }
      /**
       * コンストラクタ
       * @param modelSetting モデルの設定情報
       */
      constructor(modelSetting) {
        this._blinkingState = 0 /* EyeState_First */;
        this._nextBlinkingTime = 0;
        this._stateStartTimeSeconds = 0;
        this._blinkingIntervalSeconds = 4;
        this._closingSeconds = 0.1;
        this._closedSeconds = 0.05;
        this._openingSeconds = 0.15;
        this._userTimeSeconds = 0;
        this._parameterIds = new Array();
        if (modelSetting == null) {
          return;
        }
        this._parameterIds.length = modelSetting.getEyeBlinkParameterCount();
        for (let i = 0; i < modelSetting.getEyeBlinkParameterCount(); ++i) {
          this._parameterIds[i] = modelSetting.getEyeBlinkParameterId(i);
        }
      }
      /**
       * 次の瞬きのタイミングの決定
       *
       * @return 次のまばたきを行う時刻[秒]
       */
      determinNextBlinkingTiming() {
        const r = Math.random();
        return this._userTimeSeconds + r * (2 * this._blinkingIntervalSeconds - 1);
      }
      _blinkingState;
      // 現在の状態
      _parameterIds;
      // 操作対象のパラメータのIDのリスト
      _nextBlinkingTime;
      // 次のまばたきの時刻[秒]
      _stateStartTimeSeconds;
      // 現在の状態が開始した時刻[秒]
      _blinkingIntervalSeconds;
      // まばたきの間隔[秒]
      _closingSeconds;
      // まぶたを閉じる動作の所要時間[秒]
      _closedSeconds;
      // まぶたを閉じている動作の所要時間[秒]
      _openingSeconds;
      // まぶたを開く動作の所要時間[秒]
      _userTimeSeconds;
      // デルタ時間の積算値[秒]
      /**
       * IDで指定された目のパラメータが、0のときに閉じるなら true 、1の時に閉じるなら false 。
       */
      static CloseIfZero = true;
    };
    EyeState = /* @__PURE__ */ ((EyeState2) => {
      EyeState2[EyeState2["EyeState_First"] = 0] = "EyeState_First";
      EyeState2[EyeState2["EyeState_Interval"] = 1] = "EyeState_Interval";
      EyeState2[EyeState2["EyeState_Closing"] = 2] = "EyeState_Closing";
      EyeState2[EyeState2["EyeState_Closed"] = 3] = "EyeState_Closed";
      EyeState2[EyeState2["EyeState_Opening"] = 4] = "EyeState_Opening";
      return EyeState2;
    })(EyeState || {});
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismEyeBlink = CubismEyeBlink;
      Live2DCubismFramework51.EyeState = EyeState;
    })(Live2DCubismFramework20 || (Live2DCubismFramework20 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/effect/cubismpose.ts
var Epsilon, DefaultFadeInSeconds, FadeIn, Link, Groups, Id, CubismPose, PartData, Live2DCubismFramework21;
var init_cubismpose = __esm({
  "vendor/live2d/sdk/Framework/src/effect/cubismpose.ts"() {
    init_live2dcubismframework();
    init_cubismjson();
    init_cubismpose();
    Epsilon = 1e-3;
    DefaultFadeInSeconds = 0.5;
    FadeIn = "FadeInTime";
    Link = "Link";
    Groups = "Groups";
    Id = "Id";
    CubismPose = class _CubismPose {
      /**
       * インスタンスの作成
       * @param pose3json pose3.jsonのデータ
       * @param size pose3.jsonのデータのサイズ[byte]
       * @return 作成されたインスタンス
       */
      static create(pose3json, size) {
        const json = CubismJson.create(pose3json, size);
        if (!json) {
          return null;
        }
        const ret = new _CubismPose();
        const root = json.getRoot();
        if (!root.getValueByString(FadeIn).isNull()) {
          ret._fadeTimeSeconds = root.getValueByString(FadeIn).toFloat(DefaultFadeInSeconds);
          if (ret._fadeTimeSeconds < 0) {
            ret._fadeTimeSeconds = DefaultFadeInSeconds;
          }
        }
        const poseListInfo = root.getValueByString(Groups);
        const poseCount = poseListInfo.getSize();
        ret._partGroupCounts.length = poseCount;
        for (let poseIndex = 0; poseIndex < poseCount; ++poseIndex) {
          const idListInfo = poseListInfo.getValueByIndex(poseIndex);
          const idCount = idListInfo.getSize();
          let groupCount = 0;
          for (let groupIndex = 0; groupIndex < idCount; ++groupIndex) {
            const partInfo = idListInfo.getValueByIndex(groupIndex);
            const partData = new PartData();
            const parameterId = CubismFramework.getIdManager().getId(
              partInfo.getValueByString(Id).getRawString()
            );
            partData.partId = parameterId;
            if (!partInfo.getValueByString(Link).isNull()) {
              const linkListInfo = partInfo.getValueByString(Link);
              const linkCount = linkListInfo.getSize();
              for (let linkIndex = 0; linkIndex < linkCount; ++linkIndex) {
                const linkPart = new PartData();
                const linkId = CubismFramework.getIdManager().getId(
                  linkListInfo.getValueByIndex(linkIndex).getString()
                );
                linkPart.partId = linkId;
                partData.link.push(linkPart);
              }
            }
            ret._partGroups.push(partData.clone());
            ++groupCount;
          }
          ret._partGroupCounts[poseIndex] = groupCount;
        }
        CubismJson.delete(json);
        return ret;
      }
      /**
       * インスタンスを破棄する
       * @param pose 対象のCubismPose
       */
      static delete(pose) {
        if (pose != null) {
          pose = null;
        }
      }
      /**
       * モデルのパラメータの更新
       * @param model 対象のモデル
       * @param deltaTimeSeconds デルタ時間[秒]
       */
      updateParameters(model, deltaTimeSeconds) {
        if (model != this._lastModel) {
          this.reset(model);
        }
        this._lastModel = model;
        if (deltaTimeSeconds < 0) {
          deltaTimeSeconds = 0;
        }
        let beginIndex = 0;
        for (let i = 0; i < this._partGroupCounts.length; i++) {
          const partGroupCount = this._partGroupCounts[i];
          this.doFade(model, deltaTimeSeconds, beginIndex, partGroupCount);
          beginIndex += partGroupCount;
        }
        this.copyPartOpacities(model);
      }
      /**
       * 表示を初期化
       * @param model 対象のモデル
       * @note 不透明度の初期値が0でないパラメータは、不透明度を１に設定する
       */
      reset(model) {
        let beginIndex = 0;
        for (let i = 0; i < this._partGroupCounts.length; ++i) {
          const groupCount = this._partGroupCounts[i];
          for (let j = beginIndex; j < beginIndex + groupCount; ++j) {
            this._partGroups[j].initialize(model);
            const partsIndex = this._partGroups[j].partIndex;
            const paramIndex = this._partGroups[j].parameterIndex;
            if (partsIndex < 0) {
              continue;
            }
            model.setPartOpacityByIndex(partsIndex, j == beginIndex ? 1 : 0);
            model.setParameterValueByIndex(paramIndex, j == beginIndex ? 1 : 0);
            for (let k = 0; k < this._partGroups[j].link.length; ++k) {
              this._partGroups[j].link[k].initialize(model);
            }
          }
          beginIndex += groupCount;
        }
      }
      /**
       * パーツの不透明度をコピー
       *
       * @param model 対象のモデル
       */
      copyPartOpacities(model) {
        for (let groupIndex = 0; groupIndex < this._partGroups.length; ++groupIndex) {
          const partData = this._partGroups[groupIndex];
          if (partData.link.length == 0) {
            continue;
          }
          const partIndex = this._partGroups[groupIndex].partIndex;
          const opacity = model.getPartOpacityByIndex(partIndex);
          for (let linkIndex = 0; linkIndex < partData.link.length; ++linkIndex) {
            const linkPart = partData.link[linkIndex];
            const linkPartIndex = linkPart.partIndex;
            if (linkPartIndex < 0) {
              continue;
            }
            model.setPartOpacityByIndex(linkPartIndex, opacity);
          }
        }
      }
      /**
       * パーツのフェード操作を行う。
       * @param model 対象のモデル
       * @param deltaTimeSeconds デルタ時間[秒]
       * @param beginIndex フェード操作を行うパーツグループの先頭インデックス
       * @param partGroupCount フェード操作を行うパーツグループの個数
       */
      doFade(model, deltaTimeSeconds, beginIndex, partGroupCount) {
        let visiblePartIndex = -1;
        let newOpacity = 1;
        const phi = 0.5;
        const backOpacityThreshold = 0.15;
        for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
          const partIndex = this._partGroups[i].partIndex;
          const paramIndex = this._partGroups[i].parameterIndex;
          if (model.getParameterValueByIndex(paramIndex) > Epsilon) {
            if (visiblePartIndex >= 0) {
              break;
            }
            visiblePartIndex = i;
            if (this._fadeTimeSeconds == 0) {
              newOpacity = 1;
              continue;
            }
            newOpacity = model.getPartOpacityByIndex(partIndex);
            newOpacity += deltaTimeSeconds / this._fadeTimeSeconds;
            if (newOpacity > 1) {
              newOpacity = 1;
            }
          }
        }
        if (visiblePartIndex < 0) {
          visiblePartIndex = 0;
          newOpacity = 1;
        }
        for (let i = beginIndex; i < beginIndex + partGroupCount; ++i) {
          const partsIndex = this._partGroups[i].partIndex;
          if (visiblePartIndex == i) {
            model.setPartOpacityByIndex(partsIndex, newOpacity);
          } else {
            let opacity = model.getPartOpacityByIndex(partsIndex);
            let a1;
            if (newOpacity < phi) {
              a1 = newOpacity * (phi - 1) / phi + 1;
            } else {
              a1 = (1 - newOpacity) * phi / (1 - phi);
            }
            const backOpacity = (1 - a1) * (1 - newOpacity);
            if (backOpacity > backOpacityThreshold) {
              a1 = 1 - backOpacityThreshold / (1 - newOpacity);
            }
            if (opacity > a1) {
              opacity = a1;
            }
            model.setPartOpacityByIndex(partsIndex, opacity);
          }
        }
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._fadeTimeSeconds = DefaultFadeInSeconds;
        this._lastModel = null;
        this._partGroups = new Array();
        this._partGroupCounts = new Array();
      }
      _partGroups;
      // パーツグループ
      _partGroupCounts;
      // それぞれのパーツグループの個数
      _fadeTimeSeconds;
      // フェード時間[秒]
      _lastModel;
      // 前回操作したモデル
    };
    PartData = class _PartData {
      /**
       * コンストラクタ
       */
      constructor(v) {
        this.parameterIndex = 0;
        this.partIndex = 0;
        this.link = new Array();
        if (v != void 0) {
          this.partId = v.partId;
          this.link.length = v.link.length;
          for (let i = 0; i < v.link.length; i++) {
            this.link[i] = v.link[i].clone();
          }
        }
      }
      /**
       * =演算子のオーバーロード
       */
      assignment(v) {
        this.partId = v.partId;
        let dstIndex = this.link.length;
        this.link.length += v.link.length;
        for (const partData of v.link) {
          this.link[dstIndex++] = partData.clone();
        }
        return this;
      }
      /**
       * 初期化
       * @param model 初期化に使用するモデル
       */
      initialize(model) {
        this.parameterIndex = model.getParameterIndex(this.partId);
        this.partIndex = model.getPartIndex(this.partId);
        model.setParameterValueByIndex(this.parameterIndex, 1);
      }
      /**
       * オブジェクトのコピーを生成する
       */
      clone() {
        const clonePartData = new _PartData();
        clonePartData.partId = this.partId;
        clonePartData.parameterIndex = this.parameterIndex;
        clonePartData.partIndex = this.partIndex;
        clonePartData.link = new Array();
        clonePartData.link.length = this.link.length;
        for (let i = 0; i < this.link.length; i++) {
          clonePartData.link[i] = this.link[i].clone();
        }
        return clonePartData;
      }
      partId;
      // パーツID
      parameterIndex;
      // パラメータのインデックス
      partIndex;
      // パーツのインデックス
      link;
      // 連動するパラメータ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismPose = CubismPose;
      Live2DCubismFramework51.PartData = PartData;
    })(Live2DCubismFramework21 || (Live2DCubismFramework21 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/math/cubismmodelmatrix.ts
var CubismModelMatrix, Live2DCubismFramework22;
var init_cubismmodelmatrix = __esm({
  "vendor/live2d/sdk/Framework/src/math/cubismmodelmatrix.ts"() {
    init_cubismmatrix44();
    init_cubismmodelmatrix();
    CubismModelMatrix = class extends CubismMatrix44 {
      /**
       * コンストラクタ
       *
       * @param w 横幅
       * @param h 縦幅
       */
      constructor(w, h) {
        super();
        this._width = w !== void 0 ? w : 0;
        this._height = h !== void 0 ? h : 0;
        this.setHeight(2);
      }
      /**
       * 横幅を設定
       *
       * @param w 横幅
       */
      setWidth(w) {
        const scaleX = w / this._width;
        const scaleY = scaleX;
        this.scale(scaleX, scaleY);
      }
      /**
       * 縦幅を設定
       * @param h 縦幅
       */
      setHeight(h) {
        const scaleX = h / this._height;
        const scaleY = scaleX;
        this.scale(scaleX, scaleY);
      }
      /**
       * 位置を設定
       *
       * @param x X軸の位置
       * @param y Y軸の位置
       */
      setPosition(x, y) {
        this.translate(x, y);
      }
      /**
       * 中心位置を設定
       *
       * @param x X軸の中心位置
       * @param y Y軸の中心位置
       *
       * @note widthかheightを設定したあとでないと、拡大率が正しく取得できないためずれる。
       */
      setCenterPosition(x, y) {
        this.centerX(x);
        this.centerY(y);
      }
      /**
       * 上辺の位置を設定する
       *
       * @param y 上辺のY軸位置
       */
      top(y) {
        this.setY(y);
      }
      /**
       * 下辺の位置を設定する
       *
       * @param y 下辺のY軸位置
       */
      bottom(y) {
        const h = this._height * this.getScaleY();
        this.translateY(y - h);
      }
      /**
       * 左辺の位置を設定
       *
       * @param x 左辺のX軸位置
       */
      left(x) {
        this.setX(x);
      }
      /**
       * 右辺の位置を設定
       *
       * @param x 右辺のX軸位置
       */
      right(x) {
        const w = this._width * this.getScaleX();
        this.translateX(x - w);
      }
      /**
       * X軸の中心位置を設定
       *
       * @param x X軸の中心位置
       */
      centerX(x) {
        const w = this._width * this.getScaleX();
        this.translateX(x - w / 2);
      }
      /**
       * X軸の位置を設定
       *
       * @param x X軸の位置
       */
      setX(x) {
        this.translateX(x);
      }
      /**
       * Y軸の中心位置を設定
       *
       * @param y Y軸の中心位置
       */
      centerY(y) {
        const h = this._height * this.getScaleY();
        this.translateY(y - h / 2);
      }
      /**
       * Y軸の位置を設定する
       *
       * @param y Y軸の位置
       */
      setY(y) {
        this.translateY(y);
      }
      /**
       * レイアウト情報から位置を設定
       *
       * @param layout レイアウト情報
       */
      setupFromLayout(layout) {
        const keyWidth = "width";
        const keyHeight = "height";
        const keyX = "x";
        const keyY = "y";
        const keyCenterX = "center_x";
        const keyCenterY = "center_y";
        const keyTop = "top";
        const keyBottom = "bottom";
        const keyLeft = "left";
        const keyRight = "right";
        for (const item of layout) {
          const key = item[0];
          const value = item[1];
          if (key == keyWidth) {
            this.setWidth(value);
          } else if (key == keyHeight) {
            this.setHeight(value);
          }
        }
        for (const item of layout) {
          const key = item[0];
          const value = item[1];
          if (key == keyX) {
            this.setX(value);
          } else if (key == keyY) {
            this.setY(value);
          } else if (key == keyCenterX) {
            this.centerX(value);
          } else if (key == keyCenterY) {
            this.centerY(value);
          } else if (key == keyTop) {
            this.top(value);
          } else if (key == keyBottom) {
            this.bottom(value);
          } else if (key == keyLeft) {
            this.left(value);
          } else if (key == keyRight) {
            this.right(value);
          }
        }
      }
      _width;
      // 横幅
      _height;
      // 縦幅
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismModelMatrix = CubismModelMatrix;
    })(Live2DCubismFramework22 || (Live2DCubismFramework22 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/math/cubismtargetpoint.ts
var FrameRate, Epsilon2, CubismTargetPoint, Live2DCubismFramework23;
var init_cubismtargetpoint = __esm({
  "vendor/live2d/sdk/Framework/src/math/cubismtargetpoint.ts"() {
    init_cubismmath();
    init_cubismtargetpoint();
    FrameRate = 30;
    Epsilon2 = 0.01;
    CubismTargetPoint = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._faceTargetX = 0;
        this._faceTargetY = 0;
        this._faceX = 0;
        this._faceY = 0;
        this._faceVX = 0;
        this._faceVY = 0;
        this._lastTimeSeconds = 0;
        this._userTimeSeconds = 0;
      }
      /**
       * 更新処理
       */
      update(deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        const faceParamMaxV = 40 / 10;
        const maxV = faceParamMaxV * 1 / FrameRate;
        if (this._lastTimeSeconds == 0) {
          this._lastTimeSeconds = this._userTimeSeconds;
          return;
        }
        const deltaTimeWeight = (this._userTimeSeconds - this._lastTimeSeconds) * FrameRate;
        this._lastTimeSeconds = this._userTimeSeconds;
        const timeToMaxSpeed = 0.15;
        const frameToMaxSpeed = timeToMaxSpeed * FrameRate;
        const maxA = deltaTimeWeight * maxV / frameToMaxSpeed;
        const dx = this._faceTargetX - this._faceX;
        const dy = this._faceTargetY - this._faceY;
        if (CubismMath.abs(dx) <= Epsilon2 && CubismMath.abs(dy) <= Epsilon2) {
          return;
        }
        const d = CubismMath.sqrt(dx * dx + dy * dy);
        const vx = maxV * dx / d;
        const vy = maxV * dy / d;
        let ax = vx - this._faceVX;
        let ay = vy - this._faceVY;
        const a = CubismMath.sqrt(ax * ax + ay * ay);
        if (a < -maxA || a > maxA) {
          ax *= maxA / a;
          ay *= maxA / a;
        }
        this._faceVX += ax;
        this._faceVY += ay;
        {
          const maxV2 = 0.5 * (CubismMath.sqrt(maxA * maxA + 16 * maxA * d - 8 * maxA * d) - maxA);
          const curV = CubismMath.sqrt(
            this._faceVX * this._faceVX + this._faceVY * this._faceVY
          );
          if (curV > maxV2) {
            this._faceVX *= maxV2 / curV;
            this._faceVY *= maxV2 / curV;
          }
        }
        this._faceX += this._faceVX;
        this._faceY += this._faceVY;
      }
      /**
       * X軸の顔の向きの値を取得
       *
       * @return X軸の顔の向きの値（-1.0 ~ 1.0）
       */
      getX() {
        return this._faceX;
      }
      /**
       * Y軸の顔の向きの値を取得
       *
       * @return Y軸の顔の向きの値（-1.0 ~ 1.0）
       */
      getY() {
        return this._faceY;
      }
      /**
       * 顔の向きの目標値を設定
       *
       * @param x X軸の顔の向きの値（-1.0 ~ 1.0）
       * @param y Y軸の顔の向きの値（-1.0 ~ 1.0）
       */
      set(x, y) {
        this._faceTargetX = x;
        this._faceTargetY = y;
      }
      _faceTargetX;
      // 顔の向きのX目標値（この値に近づいていく）
      _faceTargetY;
      // 顔の向きのY目標値（この値に近づいていく）
      _faceX;
      // 顔の向きX（-1.0 ~ 1.0）
      _faceY;
      // 顔の向きY（-1.0 ~ 1.0）
      _faceVX;
      // 顔の向きの変化速度X
      _faceVY;
      // 顔の向きの変化速度Y
      _lastTimeSeconds;
      // 最後の実行時間[秒]
      _userTimeSeconds;
      // デルタ時間の積算値[秒]
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismTargetPoint = CubismTargetPoint;
    })(Live2DCubismFramework23 || (Live2DCubismFramework23 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismexpressionmotion.ts
var ExpressionKeyFadeIn, ExpressionKeyFadeOut, ExpressionKeyParameters, ExpressionKeyId, ExpressionKeyValue, ExpressionKeyBlend, BlendValueAdd, BlendValueMultiply, BlendValueOverwrite, DefaultFadeTime, CubismExpressionMotion, ExpressionBlendType, ExpressionParameter, Live2DCubismFramework24;
var init_cubismexpressionmotion = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismexpressionmotion.ts"() {
    init_live2dcubismframework();
    init_cubismjson();
    init_acubismmotion();
    init_cubismexpressionmotion();
    ExpressionKeyFadeIn = "FadeInTime";
    ExpressionKeyFadeOut = "FadeOutTime";
    ExpressionKeyParameters = "Parameters";
    ExpressionKeyId = "Id";
    ExpressionKeyValue = "Value";
    ExpressionKeyBlend = "Blend";
    BlendValueAdd = "Add";
    BlendValueMultiply = "Multiply";
    BlendValueOverwrite = "Overwrite";
    DefaultFadeTime = 1;
    CubismExpressionMotion = class _CubismExpressionMotion extends ACubismMotion {
      static DefaultAdditiveValue = 0;
      // 加算適用の初期値
      static DefaultMultiplyValue = 1;
      // 乗算適用の初期値
      /**
       * インスタンスを作成する。
       * @param buffer expファイルが読み込まれているバッファ
       * @param size バッファのサイズ
       * @return 作成されたインスタンス
       */
      static create(buffer, size) {
        const expression = new _CubismExpressionMotion();
        expression.parse(buffer, size);
        return expression;
      }
      /**
       * モデルのパラメータの更新の実行
       * @param model 対象のモデル
       * @param userTimeSeconds デルタ時間の積算値[秒]
       * @param weight モーションの重み
       * @param motionQueueEntry CubismMotionQueueManagerで管理されているモーション
       */
      doUpdateParameters(model, userTimeSeconds, weight, motionQueueEntry) {
        for (let i = 0; i < this._parameters.length; ++i) {
          const parameter = this._parameters[i];
          switch (parameter.blendType) {
            case 0 /* Additive */: {
              model.addParameterValueById(
                parameter.parameterId,
                parameter.value,
                weight
              );
              break;
            }
            case 1 /* Multiply */: {
              model.multiplyParameterValueById(
                parameter.parameterId,
                parameter.value,
                weight
              );
              break;
            }
            case 2 /* Overwrite */: {
              model.setParameterValueById(
                parameter.parameterId,
                parameter.value,
                weight
              );
              break;
            }
            default:
              break;
          }
        }
      }
      /**
       * @brief 表情によるモデルのパラメータの計算
       *
       * モデルの表情に関するパラメータを計算する。
       *
       * @param[in]   model                        対象のモデル
       * @param[in]   userTimeSeconds              デルタ時間の積算値[秒]
       * @param[in]   motionQueueEntry             CubismMotionQueueManagerで管理されているモーション
       * @param[in]   expressionParameterValues    モデルに適用する各パラメータの値
       * @param[in]   expressionIndex              表情のインデックス
       * @param[in]   fadeWeight                   表情のウェイト
       */
      calculateExpressionParameters(model, userTimeSeconds, motionQueueEntry, expressionParameterValues, expressionIndex, fadeWeight) {
        if (motionQueueEntry == null || expressionParameterValues == null) {
          return;
        }
        if (!motionQueueEntry.isAvailable()) {
          return;
        }
        for (let i = 0; i < expressionParameterValues.length; ++i) {
          const expressionParameterValue = expressionParameterValues[i];
          if (expressionParameterValue.parameterId == null) {
            continue;
          }
          const currentParameterValue = expressionParameterValue.overwriteValue = model.getParameterValueById(expressionParameterValue.parameterId);
          const expressionParameters = this.getExpressionParameters();
          let parameterIndex = -1;
          for (let j = 0; j < expressionParameters.length; ++j) {
            if (expressionParameterValue.parameterId != expressionParameters[j].parameterId) {
              continue;
            }
            parameterIndex = j;
            break;
          }
          if (parameterIndex < 0) {
            if (expressionIndex == 0) {
              expressionParameterValue.additiveValue = _CubismExpressionMotion.DefaultAdditiveValue;
              expressionParameterValue.multiplyValue = _CubismExpressionMotion.DefaultMultiplyValue;
              expressionParameterValue.overwriteValue = currentParameterValue;
            } else {
              expressionParameterValue.additiveValue = this.calculateValue(
                expressionParameterValue.additiveValue,
                _CubismExpressionMotion.DefaultAdditiveValue,
                fadeWeight
              );
              expressionParameterValue.multiplyValue = this.calculateValue(
                expressionParameterValue.multiplyValue,
                _CubismExpressionMotion.DefaultMultiplyValue,
                fadeWeight
              );
              expressionParameterValue.overwriteValue = this.calculateValue(
                expressionParameterValue.overwriteValue,
                currentParameterValue,
                fadeWeight
              );
            }
            continue;
          }
          const value = expressionParameters[parameterIndex].value;
          let newAdditiveValue, newMultiplyValue, newOverwriteValue;
          switch (expressionParameters[parameterIndex].blendType) {
            case 0 /* Additive */:
              newAdditiveValue = value;
              newMultiplyValue = _CubismExpressionMotion.DefaultMultiplyValue;
              newOverwriteValue = currentParameterValue;
              break;
            case 1 /* Multiply */:
              newAdditiveValue = _CubismExpressionMotion.DefaultAdditiveValue;
              newMultiplyValue = value;
              newOverwriteValue = currentParameterValue;
              break;
            case 2 /* Overwrite */:
              newAdditiveValue = _CubismExpressionMotion.DefaultAdditiveValue;
              newMultiplyValue = _CubismExpressionMotion.DefaultMultiplyValue;
              newOverwriteValue = value;
              break;
            default:
              return;
          }
          if (expressionIndex == 0) {
            expressionParameterValue.additiveValue = newAdditiveValue;
            expressionParameterValue.multiplyValue = newMultiplyValue;
            expressionParameterValue.overwriteValue = newOverwriteValue;
          } else {
            expressionParameterValue.additiveValue = expressionParameterValue.additiveValue * (1 - fadeWeight) + newAdditiveValue * fadeWeight;
            expressionParameterValue.multiplyValue = expressionParameterValue.multiplyValue * (1 - fadeWeight) + newMultiplyValue * fadeWeight;
            expressionParameterValue.overwriteValue = expressionParameterValue.overwriteValue * (1 - fadeWeight) + newOverwriteValue * fadeWeight;
          }
        }
      }
      /**
       * @brief 表情が参照しているパラメータを取得
       *
       * 表情が参照しているパラメータを取得する
       *
       * @return 表情パラメータ
       */
      getExpressionParameters() {
        return this._parameters;
      }
      parse(buffer, size) {
        const json = CubismJson.create(buffer, size);
        if (!json) {
          return;
        }
        const root = json.getRoot();
        this.setFadeInTime(
          root.getValueByString(ExpressionKeyFadeIn).toFloat(DefaultFadeTime)
        );
        this.setFadeOutTime(
          root.getValueByString(ExpressionKeyFadeOut).toFloat(DefaultFadeTime)
        );
        const parameterCount = root.getValueByString(ExpressionKeyParameters).getSize();
        let dstIndex = this._parameters.length;
        this._parameters.length += parameterCount;
        for (let i = 0; i < parameterCount; ++i) {
          const param = root.getValueByString(ExpressionKeyParameters).getValueByIndex(i);
          const parameterId = CubismFramework.getIdManager().getId(
            param.getValueByString(ExpressionKeyId).getRawString()
          );
          const value = param.getValueByString(ExpressionKeyValue).toFloat();
          let blendType;
          if (param.getValueByString(ExpressionKeyBlend).isNull() || param.getValueByString(ExpressionKeyBlend).getString() == BlendValueAdd) {
            blendType = 0 /* Additive */;
          } else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueMultiply) {
            blendType = 1 /* Multiply */;
          } else if (param.getValueByString(ExpressionKeyBlend).getString() == BlendValueOverwrite) {
            blendType = 2 /* Overwrite */;
          } else {
            blendType = 0 /* Additive */;
          }
          const item = new ExpressionParameter();
          item.parameterId = parameterId;
          item.blendType = blendType;
          item.value = value;
          this._parameters[dstIndex++] = item;
        }
        CubismJson.delete(json);
      }
      /**
       * @brief ブレンド計算
       *
       * 入力された値でブレンド計算をする。
       *
       * @param source 現在の値
       * @param destination 適用する値
       * @param weight ウェイト
       * @return 計算結果
       */
      calculateValue(source, destination, fadeWeight) {
        return source * (1 - fadeWeight) + destination * fadeWeight;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._parameters = new Array();
      }
      _parameters;
      // 表情のパラメータ情報リスト
    };
    ExpressionBlendType = /* @__PURE__ */ ((ExpressionBlendType2) => {
      ExpressionBlendType2[ExpressionBlendType2["Additive"] = 0] = "Additive";
      ExpressionBlendType2[ExpressionBlendType2["Multiply"] = 1] = "Multiply";
      ExpressionBlendType2[ExpressionBlendType2["Overwrite"] = 2] = "Overwrite";
      return ExpressionBlendType2;
    })(ExpressionBlendType || {});
    ExpressionParameter = class {
      parameterId;
      // パラメータID
      blendType;
      // パラメータの演算種類
      value;
      // 値
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismExpressionMotion = CubismExpressionMotion;
      Live2DCubismFramework51.ExpressionBlendType = ExpressionBlendType;
      Live2DCubismFramework51.ExpressionParameter = ExpressionParameter;
    })(Live2DCubismFramework24 || (Live2DCubismFramework24 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismexpressionmotionmanager.ts
var ExpressionParameterValue, CubismExpressionMotionManager, Live2DCubismFramework25;
var init_cubismexpressionmotionmanager = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismexpressionmotionmanager.ts"() {
    init_live2dcubismframework();
    init_cubismexpressionmotion();
    init_cubismmotionqueuemanager();
    init_cubismexpressionmotionmanager();
    init_cubismmath();
    ExpressionParameterValue = class {
      parameterId;
      // パラメーターID
      additiveValue;
      // 加算値
      multiplyValue;
      // 乗算値
      overwriteValue;
      // 上書き値
    };
    CubismExpressionMotionManager = class extends CubismMotionQueueManager {
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._expressionParameterValues = new Array();
        this._fadeWeights = new Array();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        if (this._expressionParameterValues) {
          csmDelete(this._expressionParameterValues);
          this._expressionParameterValues = null;
        }
        if (this._fadeWeights) {
          csmDelete(this._fadeWeights);
          this._fadeWeights = null;
        }
      }
      /**
       * @brief 再生中のモーションのウェイトを取得する。
       *
       * @param[in]    index    表情のインデックス
       * @return               表情モーションのウェイト
       */
      getFadeWeight(index) {
        if (index < 0 || this._fadeWeights.length < 1 || index >= this._fadeWeights.length) {
          console.warn(
            "Failed to get the fade weight value. The element at that index does not exist."
          );
          return -1;
        }
        return this._fadeWeights[index];
      }
      /**
       * @brief モーションのウェイトの設定。
       *
       * @param[in]    index    表情のインデックス
       * @param[in]    index    表情モーションのウェイト
       */
      setFadeWeight(index, expressionFadeWeight) {
        if (index < 0 || this._fadeWeights.length < 1 || this._fadeWeights.length <= index) {
          console.warn(
            "Failed to set the fade weight value. The element at that index does not exist."
          );
          return;
        }
        this._fadeWeights[index] = expressionFadeWeight;
      }
      /**
       * @brief モーションの更新
       *
       * モーションを更新して、モデルにパラメータ値を反映する。
       *
       * @param[in]   model   対象のモデル
       * @param[in]   deltaTimeSeconds    デルタ時間[秒]
       * @return  true    更新されている
       *          false   更新されていない
       */
      updateMotion(model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        let updated = false;
        const motions = this.getCubismMotionQueueEntries();
        let expressionWeight = 0;
        let expressionIndex = 0;
        if (this._fadeWeights.length !== motions.length) {
          const difference = motions.length - this._fadeWeights.length;
          let dstIndex = this._fadeWeights.length;
          this._fadeWeights.length += difference;
          for (let i = 0; i < difference; i++) {
            this._fadeWeights[dstIndex++] = 0;
          }
        }
        for (let i = 0; i < this._motions.length; ) {
          const motionQueueEntry = this._motions[i];
          if (motionQueueEntry == null) {
            motions.splice(i, 1);
            continue;
          }
          const expressionMotion = motionQueueEntry.getCubismMotion();
          if (expressionMotion == null) {
            csmDelete(motionQueueEntry);
            motions.splice(i, 1);
            continue;
          }
          const expressionParameters = expressionMotion.getExpressionParameters();
          if (motionQueueEntry.isAvailable()) {
            for (let i2 = 0; i2 < expressionParameters.length; ++i2) {
              if (expressionParameters[i2].parameterId == null) {
                continue;
              }
              let index = -1;
              for (let j = 0; j < this._expressionParameterValues.length; ++j) {
                if (this._expressionParameterValues[j].parameterId != expressionParameters[i2].parameterId) {
                  continue;
                }
                index = j;
                break;
              }
              if (index >= 0) {
                continue;
              }
              const item = new ExpressionParameterValue();
              item.parameterId = expressionParameters[i2].parameterId;
              item.additiveValue = CubismExpressionMotion.DefaultAdditiveValue;
              item.multiplyValue = CubismExpressionMotion.DefaultMultiplyValue;
              item.overwriteValue = model.getParameterValueById(item.parameterId);
              this._expressionParameterValues.push(item);
            }
          }
          expressionMotion.setupMotionQueueEntry(
            motionQueueEntry,
            this._userTimeSeconds
          );
          this.setFadeWeight(
            expressionIndex,
            expressionMotion.updateFadeWeight(
              motionQueueEntry,
              this._userTimeSeconds
            )
          );
          expressionMotion.calculateExpressionParameters(
            model,
            this._userTimeSeconds,
            motionQueueEntry,
            this._expressionParameterValues,
            expressionIndex,
            this.getFadeWeight(expressionIndex)
          );
          expressionWeight += expressionMotion.getFadeInTime() == 0 ? 1 : CubismMath.getEasingSine(
            (this._userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / expressionMotion.getFadeInTime()
          );
          updated = true;
          if (motionQueueEntry.isTriggeredFadeOut()) {
            motionQueueEntry.startFadeOut(
              motionQueueEntry.getFadeOutSeconds(),
              this._userTimeSeconds
            );
          }
          ++i;
          ++expressionIndex;
        }
        if (motions.length > 1) {
          const latestFadeWeight = this.getFadeWeight(
            this._fadeWeights.length - 1
          );
          if (latestFadeWeight >= 1) {
            for (let i = motions.length - 2; i >= 0; --i) {
              const motionQueueEntry = motions[i];
              csmDelete(motionQueueEntry);
              motions.splice(i, 1);
              this._fadeWeights.splice(i, 1);
            }
          }
        }
        if (expressionWeight > 1) {
          expressionWeight = 1;
        }
        for (let i = 0; i < this._expressionParameterValues.length; ++i) {
          const expressionParameterValue = this._expressionParameterValues[i];
          model.setParameterValueById(
            expressionParameterValue.parameterId,
            (expressionParameterValue.overwriteValue + expressionParameterValue.additiveValue) * expressionParameterValue.multiplyValue,
            expressionWeight
          );
          expressionParameterValue.additiveValue = CubismExpressionMotion.DefaultAdditiveValue;
          expressionParameterValue.multiplyValue = CubismExpressionMotion.DefaultMultiplyValue;
        }
        return updated;
      }
      _expressionParameterValues;
      ///< モデルに適用する各パラメータの値
      _fadeWeights;
      ///< 再生中の表情のウェイト
      _startExpressionTime;
      ///< 表情の再生開始時刻
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismExpressionMotionManager = CubismExpressionMotionManager;
    })(Live2DCubismFramework25 || (Live2DCubismFramework25 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismmotioninternal.ts
var CubismMotionCurveTarget, CubismMotionSegmentType, CubismMotionPoint, CubismMotionSegment, CubismMotionCurve, CubismMotionEvent, CubismMotionData, Live2DCubismFramework26;
var init_cubismmotioninternal = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismmotioninternal.ts"() {
    init_cubismmotioninternal();
    CubismMotionCurveTarget = /* @__PURE__ */ ((CubismMotionCurveTarget2) => {
      CubismMotionCurveTarget2[CubismMotionCurveTarget2["CubismMotionCurveTarget_Model"] = 0] = "CubismMotionCurveTarget_Model";
      CubismMotionCurveTarget2[CubismMotionCurveTarget2["CubismMotionCurveTarget_Parameter"] = 1] = "CubismMotionCurveTarget_Parameter";
      CubismMotionCurveTarget2[CubismMotionCurveTarget2["CubismMotionCurveTarget_PartOpacity"] = 2] = "CubismMotionCurveTarget_PartOpacity";
      return CubismMotionCurveTarget2;
    })(CubismMotionCurveTarget || {});
    CubismMotionSegmentType = /* @__PURE__ */ ((CubismMotionSegmentType2) => {
      CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_Linear"] = 0] = "CubismMotionSegmentType_Linear";
      CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_Bezier"] = 1] = "CubismMotionSegmentType_Bezier";
      CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_Stepped"] = 2] = "CubismMotionSegmentType_Stepped";
      CubismMotionSegmentType2[CubismMotionSegmentType2["CubismMotionSegmentType_InverseStepped"] = 3] = "CubismMotionSegmentType_InverseStepped";
      return CubismMotionSegmentType2;
    })(CubismMotionSegmentType || {});
    CubismMotionPoint = class {
      time = 0;
      // 時間[秒]
      value = 0;
      // 値
    };
    CubismMotionSegment = class {
      /**
       * @brief コンストラクタ
       *
       * コンストラクタ。
       */
      constructor() {
        this.evaluate = null;
        this.basePointIndex = 0;
        this.segmentType = 0;
      }
      evaluate;
      // 使用する評価関数
      basePointIndex;
      // 最初のセグメントへのインデックス
      segmentType;
      // セグメントの種類
    };
    CubismMotionCurve = class {
      constructor() {
        this.type = 0 /* CubismMotionCurveTarget_Model */;
        this.segmentCount = 0;
        this.baseSegmentIndex = 0;
        this.fadeInTime = 0;
        this.fadeOutTime = 0;
      }
      type;
      // カーブの種類
      id;
      // カーブのID
      segmentCount;
      // セグメントの個数
      baseSegmentIndex;
      // 最初のセグメントのインデックス
      fadeInTime;
      // フェードインにかかる時間[秒]
      fadeOutTime;
      // フェードアウトにかかる時間[秒]
    };
    CubismMotionEvent = class {
      fireTime = 0;
      value;
    };
    CubismMotionData = class {
      constructor() {
        this.duration = 0;
        this.loop = false;
        this.curveCount = 0;
        this.eventCount = 0;
        this.fps = 0;
        this.curves = new Array();
        this.segments = new Array();
        this.points = new Array();
        this.events = new Array();
      }
      duration;
      // モーションの長さ[秒]
      loop;
      // ループするかどうか
      curveCount;
      // カーブの個数
      eventCount;
      // UserDataの個数
      fps;
      // フレームレート
      curves;
      // カーブのリスト
      segments;
      // セグメントのリスト
      points;
      // ポイントのリスト
      events;
      // イベントのリスト
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMotionCurve = CubismMotionCurve;
      Live2DCubismFramework51.CubismMotionCurveTarget = CubismMotionCurveTarget;
      Live2DCubismFramework51.CubismMotionData = CubismMotionData;
      Live2DCubismFramework51.CubismMotionEvent = CubismMotionEvent;
      Live2DCubismFramework51.CubismMotionPoint = CubismMotionPoint;
      Live2DCubismFramework51.CubismMotionSegment = CubismMotionSegment;
      Live2DCubismFramework51.CubismMotionSegmentType = CubismMotionSegmentType;
    })(Live2DCubismFramework26 || (Live2DCubismFramework26 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismmotionjson.ts
var Meta, Duration, Loop, AreBeziersRestricted, CurveCount, Fps, TotalSegmentCount, TotalPointCount, Curves, Target, Id2, FadeInTime, FadeOutTime, Segments, UserData, UserDataCount, TotalUserDataSize, Time, Value6, CubismMotionJson, Live2DCubismFramework27;
var init_cubismmotionjson = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismmotionjson.ts"() {
    init_live2dcubismframework();
    init_cubismdebug();
    init_cubismjson();
    init_cubismmotioninternal();
    init_cubismmotionjson();
    Meta = "Meta";
    Duration = "Duration";
    Loop = "Loop";
    AreBeziersRestricted = "AreBeziersRestricted";
    CurveCount = "CurveCount";
    Fps = "Fps";
    TotalSegmentCount = "TotalSegmentCount";
    TotalPointCount = "TotalPointCount";
    Curves = "Curves";
    Target = "Target";
    Id2 = "Id";
    FadeInTime = "FadeInTime";
    FadeOutTime = "FadeOutTime";
    Segments = "Segments";
    UserData = "UserData";
    UserDataCount = "UserDataCount";
    TotalUserDataSize = "TotalUserDataSize";
    Time = "Time";
    Value6 = "Value";
    CubismMotionJson = class {
      /**
       * コンストラクタ
       * @param buffer motion3.jsonが読み込まれているバッファ
       * @param size バッファのサイズ
       */
      constructor(buffer, size) {
        this._json = CubismJson.create(buffer, size);
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        CubismJson.delete(this._json);
      }
      /**
       * モーションの長さを取得する
       * @return モーションの長さ[秒]
       */
      getMotionDuration() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(Duration).toFloat();
      }
      /**
       * モーションのループ情報の取得
       * @return true ループする
       * @return false ループしない
       */
      isMotionLoop() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(Loop).toBoolean();
      }
      /**
       *  motion3.jsonファイルの整合性チェック
       *
       * @return 正常なファイルの場合はtrueを返す。
       */
      hasConsistency() {
        let result = true;
        if (!this._json || !this._json.getRoot()) {
          return false;
        }
        const actualCurveListSize = this._json.getRoot().getValueByString(Curves).getVector().length;
        let actualTotalSegmentCount = 0;
        let actualTotalPointCount = 0;
        for (let curvePosition = 0; curvePosition < actualCurveListSize; ++curvePosition) {
          for (let segmentPosition = 0; segmentPosition < this.getMotionCurveSegmentCount(curvePosition); ) {
            if (segmentPosition == 0) {
              actualTotalPointCount += 1;
              segmentPosition += 2;
            }
            const segment = this.getMotionCurveSegment(
              curvePosition,
              segmentPosition
            );
            switch (segment) {
              case 0 /* CubismMotionSegmentType_Linear */:
                actualTotalPointCount += 1;
                segmentPosition += 3;
                break;
              case 1 /* CubismMotionSegmentType_Bezier */:
                actualTotalPointCount += 3;
                segmentPosition += 7;
                break;
              case 2 /* CubismMotionSegmentType_Stepped */:
                actualTotalPointCount += 1;
                segmentPosition += 3;
                break;
              case 3 /* CubismMotionSegmentType_InverseStepped */:
                actualTotalPointCount += 1;
                segmentPosition += 3;
                break;
              default:
                CSM_ASSERT(0);
                break;
            }
            ++actualTotalSegmentCount;
          }
        }
        if (actualCurveListSize != this.getMotionCurveCount()) {
          CubismLogWarning("The number of curves does not match the metadata.");
          result = false;
        }
        if (actualTotalSegmentCount != this.getMotionTotalSegmentCount()) {
          CubismLogWarning("The number of segment does not match the metadata.");
          result = false;
        }
        if (actualTotalPointCount != this.getMotionTotalPointCount()) {
          CubismLogWarning("The number of point does not match the metadata.");
          result = false;
        }
        return result;
      }
      getEvaluationOptionFlag(flagType) {
        if (0 /* EvaluationOptionFlag_AreBeziersRistricted */ == flagType) {
          return this._json.getRoot().getValueByString(Meta).getValueByString(AreBeziersRestricted).toBoolean();
        }
        return false;
      }
      /**
       * モーションカーブの個数の取得
       * @return モーションカーブの個数
       */
      getMotionCurveCount() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(CurveCount).toInt();
      }
      /**
       * モーションのフレームレートの取得
       * @return フレームレート[FPS]
       */
      getMotionFps() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(Fps).toFloat();
      }
      /**
       * モーションのセグメントの総合計の取得
       * @return モーションのセグメントの取得
       */
      getMotionTotalSegmentCount() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(TotalSegmentCount).toInt();
      }
      /**
       * モーションのカーブの制御店の総合計の取得
       * @return モーションのカーブの制御点の総合計
       */
      getMotionTotalPointCount() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(TotalPointCount).toInt();
      }
      /**
       * モーションのフェードイン時間の存在
       * @return true 存在する
       * @return false 存在しない
       */
      isExistMotionFadeInTime() {
        return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).isNull();
      }
      /**
       * モーションのフェードアウト時間の存在
       * @return true 存在する
       * @return false 存在しない
       */
      isExistMotionFadeOutTime() {
        return !this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).isNull();
      }
      /**
       * モーションのフェードイン時間の取得
       * @return フェードイン時間[秒]
       */
      getMotionFadeInTime() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(FadeInTime).toFloat();
      }
      /**
       * モーションのフェードアウト時間の取得
       * @return フェードアウト時間[秒]
       */
      getMotionFadeOutTime() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(FadeOutTime).toFloat();
      }
      /**
       * モーションのカーブの種類の取得
       * @param curveIndex カーブのインデックス
       * @return カーブの種類
       */
      getMotionCurveTarget(curveIndex) {
        return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Target).getRawString();
      }
      /**
       * モーションのカーブのIDの取得
       * @param curveIndex カーブのインデックス
       * @return カーブのID
       */
      getMotionCurveId(curveIndex) {
        return CubismFramework.getIdManager().getId(
          this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Id2).getRawString()
        );
      }
      /**
       * モーションのカーブのフェードイン時間の存在
       * @param curveIndex カーブのインデックス
       * @return true 存在する
       * @return false 存在しない
       */
      isExistMotionCurveFadeInTime(curveIndex) {
        return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).isNull();
      }
      /**
       * モーションのカーブのフェードアウト時間の存在
       * @param curveIndex カーブのインデックス
       * @return true 存在する
       * @return false 存在しない
       */
      isExistMotionCurveFadeOutTime(curveIndex) {
        return !this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).isNull();
      }
      /**
       * モーションのカーブのフェードイン時間の取得
       * @param curveIndex カーブのインデックス
       * @return フェードイン時間[秒]
       */
      getMotionCurveFadeInTime(curveIndex) {
        return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeInTime).toFloat();
      }
      /**
       * モーションのカーブのフェードアウト時間の取得
       * @param curveIndex カーブのインデックス
       * @return フェードアウト時間[秒]
       */
      getMotionCurveFadeOutTime(curveIndex) {
        return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(FadeOutTime).toFloat();
      }
      /**
       * モーションのカーブのセグメントの個数を取得する
       * @param curveIndex カーブのインデックス
       * @return モーションのカーブのセグメントの個数
       */
      getMotionCurveSegmentCount(curveIndex) {
        return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getVector().length;
      }
      /**
       * モーションのカーブのセグメントの値の取得
       * @param curveIndex カーブのインデックス
       * @param segmentIndex セグメントのインデックス
       * @return セグメントの値
       */
      getMotionCurveSegment(curveIndex, segmentIndex) {
        return this._json.getRoot().getValueByString(Curves).getValueByIndex(curveIndex).getValueByString(Segments).getValueByIndex(segmentIndex).toFloat();
      }
      /**
       * イベントの個数の取得
       * @return イベントの個数
       */
      getEventCount() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(UserDataCount).toInt();
      }
      /**
       *  イベントの総文字数の取得
       * @return イベントの総文字数
       */
      getTotalEventValueSize() {
        return this._json.getRoot().getValueByString(Meta).getValueByString(TotalUserDataSize).toInt();
      }
      /**
       * イベントの時間の取得
       * @param userDataIndex イベントのインデックス
       * @return イベントの時間[秒]
       */
      getEventTime(userDataIndex) {
        return this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Time).toFloat();
      }
      /**
       * イベントの取得
       * @param userDataIndex イベントのインデックス
       * @return イベントの文字列
       */
      getEventValue(userDataIndex) {
        return this._json.getRoot().getValueByString(UserData).getValueByIndex(userDataIndex).getValueByString(Value6).getRawString();
      }
      _json;
      // motion3.jsonのデータ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMotionJson = CubismMotionJson;
    })(Live2DCubismFramework27 || (Live2DCubismFramework27 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismmotion.ts
function lerpPoints(a, b, t) {
  const result = new CubismMotionPoint();
  result.time = a.time + (b.time - a.time) * t;
  result.value = a.value + (b.value - a.value) * t;
  return result;
}
function linearEvaluate(points, time) {
  let t = (time - points[0].time) / (points[1].time - points[0].time);
  if (t < 0) {
    t = 0;
  }
  return points[0].value + (points[1].value - points[0].value) * t;
}
function bezierEvaluate(points, time) {
  let t = (time - points[0].time) / (points[3].time - points[0].time);
  if (t < 0) {
    t = 0;
  }
  const p01 = lerpPoints(points[0], points[1], t);
  const p12 = lerpPoints(points[1], points[2], t);
  const p23 = lerpPoints(points[2], points[3], t);
  const p012 = lerpPoints(p01, p12, t);
  const p123 = lerpPoints(p12, p23, t);
  return lerpPoints(p012, p123, t).value;
}
function bezierEvaluateCardanoInterpretation(points, time) {
  const x = time;
  const x1 = points[0].time;
  const x2 = points[3].time;
  const cx1 = points[1].time;
  const cx2 = points[2].time;
  const a = x2 - 3 * cx2 + 3 * cx1 - x1;
  const b = 3 * cx2 - 6 * cx1 + 3 * x1;
  const c = 3 * cx1 - 3 * x1;
  const d = x1 - x;
  const t = CubismMath.cardanoAlgorithmForBezier(a, b, c, d);
  const p01 = lerpPoints(points[0], points[1], t);
  const p12 = lerpPoints(points[1], points[2], t);
  const p23 = lerpPoints(points[2], points[3], t);
  const p012 = lerpPoints(p01, p12, t);
  const p123 = lerpPoints(p12, p23, t);
  return lerpPoints(p012, p123, t).value;
}
function steppedEvaluate(points, time) {
  return points[0].value;
}
function inverseSteppedEvaluate(points, time) {
  return points[1].value;
}
function evaluateCurve(motionData, index, time, isCorrection, endTime) {
  const curve = motionData.curves[index];
  let target = -1;
  const totalSegmentCount = curve.baseSegmentIndex + curve.segmentCount;
  let pointPosition = 0;
  for (let i = curve.baseSegmentIndex; i < totalSegmentCount; ++i) {
    pointPosition = motionData.segments[i].basePointIndex + (motionData.segments[i].segmentType == 1 /* CubismMotionSegmentType_Bezier */ ? 3 : 1);
    if (motionData.points[pointPosition].time > time) {
      target = i;
      break;
    }
  }
  if (target == -1) {
    if (isCorrection && time < endTime) {
      return correctEndPoint(
        motionData,
        totalSegmentCount - 1,
        motionData.segments[curve.baseSegmentIndex].basePointIndex,
        pointPosition,
        time,
        endTime
      );
    }
    return motionData.points[pointPosition].value;
  }
  const segment = motionData.segments[target];
  return segment.evaluate(
    motionData.points.slice(segment.basePointIndex),
    time
  );
}
function correctEndPoint(motionData, segmentIndex, beginIndex, endIndex, time, endTime) {
  const motionPoint = [
    new CubismMotionPoint(),
    new CubismMotionPoint()
  ];
  {
    const src = motionData.points[endIndex];
    motionPoint[0].time = src.time;
    motionPoint[0].value = src.value;
  }
  {
    const src = motionData.points[beginIndex];
    motionPoint[1].time = endTime;
    motionPoint[1].value = src.value;
  }
  switch (motionData.segments[segmentIndex].segmentType) {
    case 0 /* CubismMotionSegmentType_Linear */:
    case 1 /* CubismMotionSegmentType_Bezier */:
    default:
      return linearEvaluate(motionPoint, time);
    case 2 /* CubismMotionSegmentType_Stepped */:
      return steppedEvaluate(motionPoint, time);
    case 3 /* CubismMotionSegmentType_InverseStepped */:
      return inverseSteppedEvaluate(motionPoint, time);
  }
}
var EffectNameEyeBlink, EffectNameLipSync, TargetNameModel, TargetNameParameter, TargetNamePartOpacity, IdNameOpacity, UseOldBeziersCurveMotion, CubismMotion, Live2DCubismFramework28;
var init_cubismmotion = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismmotion.ts"() {
    init_live2dcubismframework();
    init_cubismmath();
    init_cubismarrayutils();
    init_cubismdebug();
    init_acubismmotion();
    init_cubismmotioninternal();
    init_cubismmotionjson();
    init_cubismmotion();
    EffectNameEyeBlink = "EyeBlink";
    EffectNameLipSync = "LipSync";
    TargetNameModel = "Model";
    TargetNameParameter = "Parameter";
    TargetNamePartOpacity = "PartOpacity";
    IdNameOpacity = "Opacity";
    UseOldBeziersCurveMotion = false;
    CubismMotion = class _CubismMotion extends ACubismMotion {
      /**
       * インスタンスを作成する
       *
       * @param buffer motion3.jsonが読み込まれているバッファ
       * @param size バッファのサイズ
       * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
       * @param onBeganMotionHandler モーション再生開始時に呼び出されるコールバック関数
       * @param shouldCheckMotionConsistency motion3.json整合性チェックするかどうか
       * @return 作成されたインスタンス
       */
      static create(buffer, size, onFinishedMotionHandler, onBeganMotionHandler, shouldCheckMotionConsistency = false) {
        const ret = new _CubismMotion();
        ret.parse(buffer, size, shouldCheckMotionConsistency);
        if (ret._motionData) {
          ret._sourceFrameRate = ret._motionData.fps;
          ret._loopDurationSeconds = ret._motionData.duration;
          ret._onFinishedMotion = onFinishedMotionHandler;
          ret._onBeganMotion = onBeganMotionHandler;
        } else {
          csmDelete(ret);
          return null;
        }
        return ret;
      }
      /**
       * モデルのパラメータの更新の実行
       * @param model             対象のモデル
       * @param userTimeSeconds   現在の時刻[秒]
       * @param fadeWeight        モーションの重み
       * @param motionQueueEntry  CubismMotionQueueManagerで管理されているモーション
       */
      doUpdateParameters(model, userTimeSeconds, fadeWeight, motionQueueEntry) {
        if (this._modelCurveIdEyeBlink == null) {
          this._modelCurveIdEyeBlink = CubismFramework.getIdManager().getId(EffectNameEyeBlink);
        }
        if (this._modelCurveIdLipSync == null) {
          this._modelCurveIdLipSync = CubismFramework.getIdManager().getId(EffectNameLipSync);
        }
        if (this._modelCurveIdOpacity == null) {
          this._modelCurveIdOpacity = CubismFramework.getIdManager().getId(IdNameOpacity);
        }
        if (this._motionBehavior === 1 /* MotionBehavior_V2 */) {
          if (this._previousLoopState !== this._isLoop) {
            this.adjustEndTime(motionQueueEntry);
            this._previousLoopState = this._isLoop;
          }
        }
        let timeOffsetSeconds = userTimeSeconds - motionQueueEntry.getStartTime();
        if (timeOffsetSeconds < 0) {
          timeOffsetSeconds = 0;
        }
        let lipSyncValue = Number.MAX_VALUE;
        let eyeBlinkValue = Number.MAX_VALUE;
        const maxTargetSize = 64;
        let lipSyncFlags = 0;
        let eyeBlinkFlags = 0;
        if (this._eyeBlinkParameterIds.length > maxTargetSize) {
          CubismLogDebug(
            "too many eye blink targets : {0}",
            this._eyeBlinkParameterIds.length
          );
        }
        if (this._lipSyncParameterIds.length > maxTargetSize) {
          CubismLogDebug(
            "too many lip sync targets : {0}",
            this._lipSyncParameterIds.length
          );
        }
        const tmpFadeIn = this._fadeInSeconds <= 0 ? 1 : CubismMath.getEasingSine(
          (userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / this._fadeInSeconds
        );
        const tmpFadeOut = this._fadeOutSeconds <= 0 || motionQueueEntry.getEndTime() < 0 ? 1 : CubismMath.getEasingSine(
          (motionQueueEntry.getEndTime() - userTimeSeconds) / this._fadeOutSeconds
        );
        let value;
        let c, parameterIndex;
        let time = timeOffsetSeconds;
        let duration = this._motionData.duration;
        const isCorrection = this._motionBehavior === 1 /* MotionBehavior_V2 */ && this._isLoop;
        if (this._isLoop) {
          if (this._motionBehavior === 1 /* MotionBehavior_V2 */) {
            duration += 1 / this._motionData.fps;
          }
          while (time > duration) {
            time -= duration;
          }
        }
        const curves = this._motionData.curves;
        for (c = 0; c < this._motionData.curveCount && curves[c].type == 0 /* CubismMotionCurveTarget_Model */; ++c) {
          value = evaluateCurve(this._motionData, c, time, isCorrection, duration);
          if (curves[c].id == this._modelCurveIdEyeBlink) {
            eyeBlinkValue = value;
          } else if (curves[c].id == this._modelCurveIdLipSync) {
            lipSyncValue = value;
          } else if (curves[c].id == this._modelCurveIdOpacity) {
            this._modelOpacity = value;
            model.setModelOapcity(this.getModelOpacityValue());
          }
        }
        let parameterMotionCurveCount = 0;
        for (; c < this._motionData.curveCount && curves[c].type == 1 /* CubismMotionCurveTarget_Parameter */; ++c) {
          parameterMotionCurveCount++;
          parameterIndex = model.getParameterIndex(curves[c].id);
          if (parameterIndex == -1) {
            continue;
          }
          const sourceValue = model.getParameterValueByIndex(parameterIndex);
          value = evaluateCurve(this._motionData, c, time, isCorrection, duration);
          if (eyeBlinkValue != Number.MAX_VALUE) {
            for (let i = 0; i < this._eyeBlinkParameterIds.length && i < maxTargetSize; ++i) {
              if (this._eyeBlinkParameterIds[i] == curves[c].id) {
                value *= eyeBlinkValue;
                eyeBlinkFlags |= 1 << i;
                break;
              }
            }
          }
          if (lipSyncValue != Number.MAX_VALUE) {
            for (let i = 0; i < this._lipSyncParameterIds.length && i < maxTargetSize; ++i) {
              if (this._lipSyncParameterIds[i] == curves[c].id) {
                value += lipSyncValue;
                lipSyncFlags |= 1 << i;
                break;
              }
            }
          }
          if (model.isRepeat(parameterIndex)) {
            value = model.getParameterRepeatValue(parameterIndex, value);
          }
          let v;
          if (curves[c].fadeInTime < 0 && curves[c].fadeOutTime < 0) {
            v = sourceValue + (value - sourceValue) * fadeWeight;
          } else {
            let fin;
            let fout;
            if (curves[c].fadeInTime < 0) {
              fin = tmpFadeIn;
            } else {
              fin = curves[c].fadeInTime == 0 ? 1 : CubismMath.getEasingSine(
                (userTimeSeconds - motionQueueEntry.getFadeInStartTime()) / curves[c].fadeInTime
              );
            }
            if (curves[c].fadeOutTime < 0) {
              fout = tmpFadeOut;
            } else {
              fout = curves[c].fadeOutTime == 0 || motionQueueEntry.getEndTime() < 0 ? 1 : CubismMath.getEasingSine(
                (motionQueueEntry.getEndTime() - userTimeSeconds) / curves[c].fadeOutTime
              );
            }
            const paramWeight = this._weight * fin * fout;
            v = sourceValue + (value - sourceValue) * paramWeight;
          }
          model.setParameterValueByIndex(parameterIndex, v, 1);
        }
        {
          if (eyeBlinkValue != Number.MAX_VALUE) {
            for (let i = 0; i < this._eyeBlinkParameterIds.length && i < maxTargetSize; ++i) {
              const sourceValue = model.getParameterValueById(
                this._eyeBlinkParameterIds[i]
              );
              if (eyeBlinkFlags >> i & 1) {
                continue;
              }
              const v = sourceValue + (eyeBlinkValue - sourceValue) * fadeWeight;
              model.setParameterValueById(this._eyeBlinkParameterIds[i], v);
            }
          }
          if (lipSyncValue != Number.MAX_VALUE) {
            for (let i = 0; i < this._lipSyncParameterIds.length && i < maxTargetSize; ++i) {
              const sourceValue = model.getParameterValueById(
                this._lipSyncParameterIds[i]
              );
              if (lipSyncFlags >> i & 1) {
                continue;
              }
              const v = sourceValue + (lipSyncValue - sourceValue) * fadeWeight;
              model.setParameterValueById(this._lipSyncParameterIds[i], v);
            }
          }
        }
        for (; c < this._motionData.curveCount && curves[c].type == 2 /* CubismMotionCurveTarget_PartOpacity */; ++c) {
          parameterIndex = model.getParameterIndex(curves[c].id);
          if (parameterIndex == -1) {
            continue;
          }
          value = evaluateCurve(this._motionData, c, time, isCorrection, duration);
          model.setParameterValueByIndex(parameterIndex, value);
        }
        if (timeOffsetSeconds >= duration) {
          if (this._isLoop) {
            this.updateForNextLoop(motionQueueEntry, userTimeSeconds, time);
          } else {
            if (this._onFinishedMotion) {
              this._onFinishedMotion(this);
            }
            motionQueueEntry.setIsFinished(true);
          }
        }
        this._lastWeight = fadeWeight;
      }
      /**
       * Sets the version of the Motion Behavior.
       *
       * @param Specifies the version of the Motion Behavior.
       */
      setMotionBehavior(motionBehavior) {
        this._motionBehavior = motionBehavior;
      }
      /**
       * Gets the version of the Motion Behavior.
       *
       * @return Returns the version of the Motion Behavior.
       */
      getMotionBehavior() {
        return this._motionBehavior;
      }
      /**
       * モーションの長さを取得する。
       *
       * @return  モーションの長さ[秒]
       */
      getDuration() {
        return this._isLoop ? -1 : this._loopDurationSeconds;
      }
      /**
       * モーションのループ時の長さを取得する。
       *
       * @return  モーションのループ時の長さ[秒]
       */
      getLoopDuration() {
        return this._loopDurationSeconds;
      }
      /**
       * パラメータに対するフェードインの時間を設定する。
       *
       * @param parameterId     パラメータID
       * @param value           フェードインにかかる時間[秒]
       */
      setParameterFadeInTime(parameterId, value) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
          if (parameterId == curves[i].id) {
            curves[i].fadeInTime = value;
            return;
          }
        }
      }
      /**
       * パラメータに対するフェードアウトの時間の設定
       * @param parameterId     パラメータID
       * @param value           フェードアウトにかかる時間[秒]
       */
      setParameterFadeOutTime(parameterId, value) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
          if (parameterId == curves[i].id) {
            curves[i].fadeOutTime = value;
            return;
          }
        }
      }
      /**
       * パラメータに対するフェードインの時間の取得
       * @param    parameterId     パラメータID
       * @return   フェードインにかかる時間[秒]
       */
      getParameterFadeInTime(parameterId) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
          if (parameterId == curves[i].id) {
            return curves[i].fadeInTime;
          }
        }
        return -1;
      }
      /**
       * パラメータに対するフェードアウトの時間を取得
       *
       * @param   parameterId     パラメータID
       * @return   フェードアウトにかかる時間[秒]
       */
      getParameterFadeOutTime(parameterId) {
        const curves = this._motionData.curves;
        for (let i = 0; i < this._motionData.curveCount; ++i) {
          if (parameterId == curves[i].id) {
            return curves[i].fadeOutTime;
          }
        }
        return -1;
      }
      /**
       * 自動エフェクトがかかっているパラメータIDリストの設定
       * @param eyeBlinkParameterIds    自動まばたきがかかっているパラメータIDのリスト
       * @param lipSyncParameterIds     リップシンクがかかっているパラメータIDのリスト
       */
      setEffectIds(eyeBlinkParameterIds, lipSyncParameterIds) {
        this._eyeBlinkParameterIds = eyeBlinkParameterIds;
        this._lipSyncParameterIds = lipSyncParameterIds;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._sourceFrameRate = 30;
        this._loopDurationSeconds = -1;
        this._isLoop = false;
        this._isLoopFadeIn = true;
        this._lastWeight = 0;
        this._motionData = null;
        this._modelCurveIdEyeBlink = null;
        this._modelCurveIdLipSync = null;
        this._modelCurveIdOpacity = null;
        this._eyeBlinkParameterIds = null;
        this._lipSyncParameterIds = null;
        this._modelOpacity = 1;
        this._debugMode = false;
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        this._motionData = void 0;
        this._motionData = null;
      }
      /**
       *
       * @param motionQueueEntry
       * @param userTimeSeconds
       * @param time
       */
      updateForNextLoop(motionQueueEntry, userTimeSeconds, time) {
        switch (this._motionBehavior) {
          case 1 /* MotionBehavior_V2 */:
          default:
            motionQueueEntry.setStartTime(userTimeSeconds - time);
            if (this._isLoopFadeIn) {
              motionQueueEntry.setFadeInStartTime(userTimeSeconds - time);
            }
            if (this._onFinishedMotion != null) {
              this._onFinishedMotion(this);
            }
            break;
          case 0 /* MotionBehavior_V1 */:
            motionQueueEntry.setStartTime(userTimeSeconds);
            if (this._isLoopFadeIn) {
              motionQueueEntry.setFadeInStartTime(userTimeSeconds);
            }
            break;
        }
      }
      /**
       * motion3.jsonをパースする。
       *
       * @param motionJson  motion3.jsonが読み込まれているバッファ
       * @param size        バッファのサイズ
       * @param shouldCheckMotionConsistency motion3.json整合性チェックするかどうか
       */
      parse(motionJson, size, shouldCheckMotionConsistency = false) {
        let json = new CubismMotionJson(motionJson, size);
        if (!json) {
          json.release();
          json = void 0;
          return;
        }
        if (shouldCheckMotionConsistency) {
          const consistency = json.hasConsistency();
          if (!consistency) {
            json.release();
            CubismLogError("Inconsistent motion3.json.");
            return;
          }
        }
        this._motionData = new CubismMotionData();
        this._motionData.duration = json.getMotionDuration();
        this._motionData.loop = json.isMotionLoop();
        this._motionData.curveCount = json.getMotionCurveCount();
        this._motionData.fps = json.getMotionFps();
        this._motionData.eventCount = json.getEventCount();
        const areBeziersRestructed = json.getEvaluationOptionFlag(
          0 /* EvaluationOptionFlag_AreBeziersRistricted */
        );
        if (json.isExistMotionFadeInTime()) {
          this._fadeInSeconds = json.getMotionFadeInTime() < 0 ? 1 : json.getMotionFadeInTime();
        } else {
          this._fadeInSeconds = 1;
        }
        if (json.isExistMotionFadeOutTime()) {
          this._fadeOutSeconds = json.getMotionFadeOutTime() < 0 ? 1 : json.getMotionFadeOutTime();
        } else {
          this._fadeOutSeconds = 1;
        }
        updateSize(
          this._motionData.curves,
          this._motionData.curveCount,
          CubismMotionCurve,
          true
        );
        updateSize(
          this._motionData.segments,
          json.getMotionTotalSegmentCount(),
          CubismMotionSegment,
          true
        );
        updateSize(
          this._motionData.points,
          json.getMotionTotalPointCount(),
          CubismMotionPoint,
          true
        );
        updateSize(
          this._motionData.events,
          this._motionData.eventCount,
          CubismMotionEvent,
          true
        );
        let totalPointCount = 0;
        let totalSegmentCount = 0;
        for (let curveCount = 0; curveCount < this._motionData.curveCount; ++curveCount) {
          if (json.getMotionCurveTarget(curveCount) == TargetNameModel) {
            this._motionData.curves[curveCount].type = 0 /* CubismMotionCurveTarget_Model */;
          } else if (json.getMotionCurveTarget(curveCount) == TargetNameParameter) {
            this._motionData.curves[curveCount].type = 1 /* CubismMotionCurveTarget_Parameter */;
          } else if (json.getMotionCurveTarget(curveCount) == TargetNamePartOpacity) {
            this._motionData.curves[curveCount].type = 2 /* CubismMotionCurveTarget_PartOpacity */;
          } else {
            CubismLogWarning(
              'Warning : Unable to get segment type from Curve! The number of "CurveCount" may be incorrect!'
            );
          }
          this._motionData.curves[curveCount].id = json.getMotionCurveId(curveCount);
          this._motionData.curves[curveCount].baseSegmentIndex = totalSegmentCount;
          this._motionData.curves[curveCount].fadeInTime = json.isExistMotionCurveFadeInTime(curveCount) ? json.getMotionCurveFadeInTime(curveCount) : -1;
          this._motionData.curves[curveCount].fadeOutTime = json.isExistMotionCurveFadeOutTime(curveCount) ? json.getMotionCurveFadeOutTime(curveCount) : -1;
          for (let segmentPosition = 0; segmentPosition < json.getMotionCurveSegmentCount(curveCount); ) {
            if (segmentPosition == 0) {
              this._motionData.segments[totalSegmentCount].basePointIndex = totalPointCount;
              this._motionData.points[totalPointCount].time = json.getMotionCurveSegment(curveCount, segmentPosition);
              this._motionData.points[totalPointCount].value = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
              totalPointCount += 1;
              segmentPosition += 2;
            } else {
              this._motionData.segments[totalSegmentCount].basePointIndex = totalPointCount - 1;
            }
            const segment = json.getMotionCurveSegment(
              curveCount,
              segmentPosition
            );
            const segmentType = segment;
            switch (segmentType) {
              case 0 /* CubismMotionSegmentType_Linear */: {
                this._motionData.segments[totalSegmentCount].segmentType = 0 /* CubismMotionSegmentType_Linear */;
                this._motionData.segments[totalSegmentCount].evaluate = linearEvaluate;
                this._motionData.points[totalPointCount].time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                this._motionData.points[totalPointCount].value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                totalPointCount += 1;
                segmentPosition += 3;
                break;
              }
              case 1 /* CubismMotionSegmentType_Bezier */: {
                this._motionData.segments[totalSegmentCount].segmentType = 1 /* CubismMotionSegmentType_Bezier */;
                if (areBeziersRestructed || UseOldBeziersCurveMotion) {
                  this._motionData.segments[totalSegmentCount].evaluate = bezierEvaluate;
                } else {
                  this._motionData.segments[totalSegmentCount].evaluate = bezierEvaluateCardanoInterpretation;
                }
                this._motionData.points[totalPointCount].time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                this._motionData.points[totalPointCount].value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                this._motionData.points[totalPointCount + 1].time = json.getMotionCurveSegment(curveCount, segmentPosition + 3);
                this._motionData.points[totalPointCount + 1].value = json.getMotionCurveSegment(curveCount, segmentPosition + 4);
                this._motionData.points[totalPointCount + 2].time = json.getMotionCurveSegment(curveCount, segmentPosition + 5);
                this._motionData.points[totalPointCount + 2].value = json.getMotionCurveSegment(curveCount, segmentPosition + 6);
                totalPointCount += 3;
                segmentPosition += 7;
                break;
              }
              case 2 /* CubismMotionSegmentType_Stepped */: {
                this._motionData.segments[totalSegmentCount].segmentType = 2 /* CubismMotionSegmentType_Stepped */;
                this._motionData.segments[totalSegmentCount].evaluate = steppedEvaluate;
                this._motionData.points[totalPointCount].time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                this._motionData.points[totalPointCount].value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                totalPointCount += 1;
                segmentPosition += 3;
                break;
              }
              case 3 /* CubismMotionSegmentType_InverseStepped */: {
                this._motionData.segments[totalSegmentCount].segmentType = 3 /* CubismMotionSegmentType_InverseStepped */;
                this._motionData.segments[totalSegmentCount].evaluate = inverseSteppedEvaluate;
                this._motionData.points[totalPointCount].time = json.getMotionCurveSegment(curveCount, segmentPosition + 1);
                this._motionData.points[totalPointCount].value = json.getMotionCurveSegment(curveCount, segmentPosition + 2);
                totalPointCount += 1;
                segmentPosition += 3;
                break;
              }
              default: {
                CSM_ASSERT(0);
                break;
              }
            }
            ++this._motionData.curves[curveCount].segmentCount;
            ++totalSegmentCount;
          }
        }
        for (let userdatacount = 0; userdatacount < json.getEventCount(); ++userdatacount) {
          this._motionData.events[userdatacount].fireTime = json.getEventTime(userdatacount);
          this._motionData.events[userdatacount].value = json.getEventValue(userdatacount);
        }
        json.release();
        json = void 0;
        json = null;
      }
      /**
       * モデルのパラメータ更新
       *
       * イベント発火のチェック。
       * 入力する時間は呼ばれるモーションタイミングを０とした秒数で行う。
       *
       * @param beforeCheckTimeSeconds   前回のイベントチェック時間[秒]
       * @param motionTimeSeconds        今回の再生時間[秒]
       */
      getFiredEvent(beforeCheckTimeSeconds, motionTimeSeconds) {
        updateSize(this._firedEventValues, 0);
        for (let u = 0; u < this._motionData.eventCount; ++u) {
          if (this._motionData.events[u].fireTime > beforeCheckTimeSeconds && this._motionData.events[u].fireTime <= motionTimeSeconds) {
            this._firedEventValues.push(this._motionData.events[u].value);
          }
        }
        return this._firedEventValues;
      }
      /**
       * 透明度のカーブが存在するかどうかを確認する
       *
       * @return true  -> キーが存在する
       *          false -> キーが存在しない
       */
      isExistModelOpacity() {
        for (let i = 0; i < this._motionData.curveCount; i++) {
          const curve = this._motionData.curves[i];
          if (curve.type != 0 /* CubismMotionCurveTarget_Model */) {
            continue;
          }
          if (curve.id.getString().localeCompare(IdNameOpacity) == 0) {
            return true;
          }
        }
        return false;
      }
      /**
       * 透明度のカーブのインデックスを返す
       *
       * @return success:透明度のカーブのインデックス
       */
      getModelOpacityIndex() {
        if (this.isExistModelOpacity()) {
          for (let i = 0; i < this._motionData.curveCount; i++) {
            const curve = this._motionData.curves[i];
            if (curve.type != 0 /* CubismMotionCurveTarget_Model */) {
              continue;
            }
            if (curve.id.getString().localeCompare(IdNameOpacity) == 0) {
              return i;
            }
          }
        }
        return -1;
      }
      /**
       * 透明度のIdを返す
       *
       * @param index モーションカーブのインデックス
       * @return success:透明度のカーブのインデックス
       */
      getModelOpacityId(index) {
        if (index != -1) {
          const curve = this._motionData.curves[index];
          if (curve.type == 0 /* CubismMotionCurveTarget_Model */) {
            if (curve.id.getString().localeCompare(IdNameOpacity) == 0) {
              return CubismFramework.getIdManager().getId(curve.id.getString());
            }
          }
        }
        return null;
      }
      /**
       * 現在時間の透明度の値を返す
       *
       * @return success:モーションの当該時間におけるOpacityの値
       */
      getModelOpacityValue() {
        return this._modelOpacity;
      }
      /**
       * デバッグ用フラグを設定する
       *
       * @param debugMode デバッグモードの有効・無効
       */
      setDebugMode(debugMode) {
        this._debugMode = debugMode;
      }
      _sourceFrameRate;
      // ロードしたファイルのFPS。記述が無ければデフォルト値15fpsとなる
      _loopDurationSeconds;
      // mtnファイルで定義される一連のモーションの長さ
      _motionBehavior = 1 /* MotionBehavior_V2 */;
      _lastWeight;
      // 最後に設定された重み
      _motionData;
      // 実際のモーションデータ本体
      _eyeBlinkParameterIds;
      // 自動まばたきを適用するパラメータIDハンドルのリスト。  モデル（モデルセッティング）とパラメータを対応付ける。
      _lipSyncParameterIds;
      // リップシンクを適用するパラメータIDハンドルのリスト。  モデル（モデルセッティング）とパラメータを対応付ける。
      _modelCurveIdEyeBlink;
      // モデルが持つ自動まばたき用パラメータIDのハンドル。  モデルとモーションを対応付ける。
      _modelCurveIdLipSync;
      // モデルが持つリップシンク用パラメータIDのハンドル。  モデルとモーションを対応付ける。
      _modelCurveIdOpacity;
      // モデルが持つ不透明度用パラメータIDのハンドル。  モデルとモーションを対応付ける。
      _modelOpacity;
      // モーションから取得した不透明度
      _debugMode;
      // デバッグモードかどうか
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMotion = CubismMotion;
    })(Live2DCubismFramework28 || (Live2DCubismFramework28 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismmotionmanager.ts
var CubismMotionManager, Live2DCubismFramework29;
var init_cubismmotionmanager = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismmotionmanager.ts"() {
    init_cubismmotionqueuemanager();
    init_cubismmotionmanager();
    CubismMotionManager = class extends CubismMotionQueueManager {
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._currentPriority = 0;
        this._reservePriority = 0;
      }
      /**
       * 再生中のモーションの優先度の取得
       * @return  モーションの優先度
       */
      getCurrentPriority() {
        return this._currentPriority;
      }
      /**
       * 予約中のモーションの優先度を取得する。
       * @return  モーションの優先度
       */
      getReservePriority() {
        return this._reservePriority;
      }
      /**
       * 予約中のモーションの優先度を設定する。
       * @param   val     優先度
       */
      setReservePriority(val) {
        this._reservePriority = val;
      }
      /**
       * 優先度を設定してモーションを開始する。
       *
       * @param motion          モーション
       * @param autoDelete      再生が狩猟したモーションのインスタンスを削除するならtrue
       * @param priority        優先度
       * @return                開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するIsFinished()の引数で使用する。開始できない時は「-1」
       */
      startMotionPriority(motion, autoDelete, priority) {
        if (priority == this._reservePriority) {
          this._reservePriority = 0;
        }
        this._currentPriority = priority;
        return super.startMotion(motion, autoDelete);
      }
      /**
       * モーションを更新して、モデルにパラメータ値を反映する。
       *
       * @param model   対象のモデル
       * @param deltaTimeSeconds    デルタ時間[秒]
       * @return  true    更新されている
       * @return  false   更新されていない
       */
      updateMotion(model, deltaTimeSeconds) {
        this._userTimeSeconds += deltaTimeSeconds;
        const updated = super.doUpdateMotion(model, this._userTimeSeconds);
        if (this.isFinished()) {
          this._currentPriority = 0;
        }
        return updated;
      }
      /**
       * モーションを予約する。
       *
       * @param   priority    優先度
       * @return  true    予約できた
       * @return  false   予約できなかった
       */
      reserveMotion(priority) {
        if (priority <= this._reservePriority || priority <= this._currentPriority) {
          return false;
        }
        this._reservePriority = priority;
        return true;
      }
      _currentPriority;
      // 現在再生中のモーションの優先度
      _reservePriority;
      // 再生予定のモーションの優先度。再生中は0になる。モーションファイルを別スレッドで読み込むときの機能。
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMotionManager = CubismMotionManager;
    })(Live2DCubismFramework29 || (Live2DCubismFramework29 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/physics/cubismphysicsinternal.ts
var CubismPhysicsTargetType, CubismPhysicsSource, PhysicsJsonEffectiveForces, CubismPhysicsParameter, CubismPhysicsNormalization, CubismPhysicsParticle, CubismPhysicsSubRig, CubismPhysicsInput, CubismPhysicsOutput, CubismPhysicsRig, Live2DCubismFramework30;
var init_cubismphysicsinternal = __esm({
  "vendor/live2d/sdk/Framework/src/physics/cubismphysicsinternal.ts"() {
    init_cubismvector2();
    init_cubismphysicsinternal();
    CubismPhysicsTargetType = /* @__PURE__ */ ((CubismPhysicsTargetType2) => {
      CubismPhysicsTargetType2[CubismPhysicsTargetType2["CubismPhysicsTargetType_Parameter"] = 0] = "CubismPhysicsTargetType_Parameter";
      return CubismPhysicsTargetType2;
    })(CubismPhysicsTargetType || {});
    CubismPhysicsSource = /* @__PURE__ */ ((CubismPhysicsSource2) => {
      CubismPhysicsSource2[CubismPhysicsSource2["CubismPhysicsSource_X"] = 0] = "CubismPhysicsSource_X";
      CubismPhysicsSource2[CubismPhysicsSource2["CubismPhysicsSource_Y"] = 1] = "CubismPhysicsSource_Y";
      CubismPhysicsSource2[CubismPhysicsSource2["CubismPhysicsSource_Angle"] = 2] = "CubismPhysicsSource_Angle";
      return CubismPhysicsSource2;
    })(CubismPhysicsSource || {});
    PhysicsJsonEffectiveForces = class {
      constructor() {
        this.gravity = new CubismVector2(0, 0);
        this.wind = new CubismVector2(0, 0);
      }
      gravity;
      // 重力
      wind;
      // 風
    };
    CubismPhysicsParameter = class {
      id;
      // パラメータ
      targetType;
      // 適用先の種類
    };
    CubismPhysicsNormalization = class {
      minimum;
      // 最大値
      maximum;
      // 最小値
      defalut;
      // デフォルト値
    };
    CubismPhysicsParticle = class {
      constructor() {
        this.initialPosition = new CubismVector2(0, 0);
        this.position = new CubismVector2(0, 0);
        this.lastPosition = new CubismVector2(0, 0);
        this.lastGravity = new CubismVector2(0, 0);
        this.force = new CubismVector2(0, 0);
        this.velocity = new CubismVector2(0, 0);
      }
      initialPosition;
      // 初期位置
      mobility;
      // 動きやすさ
      delay;
      // 遅れ
      acceleration;
      // 加速度
      radius;
      // 距離
      position;
      // 現在の位置
      lastPosition;
      // 最後の位置
      lastGravity;
      // 最後の重力
      force;
      // 現在かかっている力
      velocity;
      // 現在の速度
    };
    CubismPhysicsSubRig = class {
      constructor() {
        this.normalizationPosition = new CubismPhysicsNormalization();
        this.normalizationAngle = new CubismPhysicsNormalization();
      }
      inputCount;
      // 入力の個数
      outputCount;
      // 出力の個数
      particleCount;
      // 物理点の個数
      baseInputIndex;
      // 入力の最初のインデックス
      baseOutputIndex;
      // 出力の最初のインデックス
      baseParticleIndex;
      // 物理点の最初のインデックス
      normalizationPosition;
      // 正規化された位置
      normalizationAngle;
      // 正規化された角度
    };
    CubismPhysicsInput = class {
      constructor() {
        this.source = new CubismPhysicsParameter();
      }
      source;
      // 入力元のパラメータ
      sourceParameterIndex;
      // 入力元のパラメータのインデックス
      weight;
      // 重み
      type;
      // 入力の種類
      reflect;
      // 値が反転されているかどうか
      getNormalizedParameterValue;
      // 正規化されたパラメータ値の取得関数
    };
    CubismPhysicsOutput = class {
      constructor() {
        this.destination = new CubismPhysicsParameter();
        this.translationScale = new CubismVector2(0, 0);
      }
      destination;
      // 出力先のパラメータ
      destinationParameterIndex;
      // 出力先のパラメータのインデックス
      vertexIndex;
      // 振り子のインデックス
      translationScale;
      // 移動値のスケール
      angleScale;
      // 角度のスケール
      weight;
      // 重み
      type;
      // 出力の種類
      reflect;
      // 値が反転されているかどうか
      valueBelowMinimum;
      // 最小値を下回った時の値
      valueExceededMaximum;
      // 最大値をこえた時の値
      getValue;
      // 物理演算の値の取得関数
      getScale;
      // 物理演算のスケール値の取得関数
    };
    CubismPhysicsRig = class {
      constructor() {
        this.settings = new Array();
        this.inputs = new Array();
        this.outputs = new Array();
        this.particles = new Array();
        this.gravity = new CubismVector2(0, 0);
        this.wind = new CubismVector2(0, 0);
        this.fps = 0;
      }
      subRigCount;
      // 物理演算の物理点の個数
      settings;
      // 物理演算の物理点の管理のリスト
      inputs;
      // 物理演算の入力のリスト
      outputs;
      // 物理演算の出力のリスト
      particles;
      // 物理演算の物理点のリスト
      gravity;
      // 重力
      wind;
      // 風
      fps;
      //物理演算動作FPS
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismPhysicsInput = CubismPhysicsInput;
      Live2DCubismFramework51.CubismPhysicsNormalization = CubismPhysicsNormalization;
      Live2DCubismFramework51.CubismPhysicsOutput = CubismPhysicsOutput;
      Live2DCubismFramework51.CubismPhysicsParameter = CubismPhysicsParameter;
      Live2DCubismFramework51.CubismPhysicsParticle = CubismPhysicsParticle;
      Live2DCubismFramework51.CubismPhysicsRig = CubismPhysicsRig;
      Live2DCubismFramework51.CubismPhysicsSource = CubismPhysicsSource;
      Live2DCubismFramework51.CubismPhysicsSubRig = CubismPhysicsSubRig;
      Live2DCubismFramework51.CubismPhysicsTargetType = CubismPhysicsTargetType;
      Live2DCubismFramework51.PhysicsJsonEffectiveForces = PhysicsJsonEffectiveForces;
    })(Live2DCubismFramework30 || (Live2DCubismFramework30 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/physics/cubismphysicsjson.ts
var Position, X, Y, Angle, Type, Id3, Meta2, EffectiveForces, TotalInputCount, TotalOutputCount, PhysicsSettingCount, Gravity, Wind, VertexCount, Fps2, PhysicsSettings, Normalization, Minimum, Maximum, Default, Reflect2, Weight, Input, Source, Output, Scale, VertexIndex, Destination, Vertices, Mobility, Delay, Radius, Acceleration, CubismPhysicsJson, Live2DCubismFramework31;
var init_cubismphysicsjson = __esm({
  "vendor/live2d/sdk/Framework/src/physics/cubismphysicsjson.ts"() {
    init_live2dcubismframework();
    init_cubismvector2();
    init_cubismjson();
    init_cubismphysicsjson();
    Position = "Position";
    X = "X";
    Y = "Y";
    Angle = "Angle";
    Type = "Type";
    Id3 = "Id";
    Meta2 = "Meta";
    EffectiveForces = "EffectiveForces";
    TotalInputCount = "TotalInputCount";
    TotalOutputCount = "TotalOutputCount";
    PhysicsSettingCount = "PhysicsSettingCount";
    Gravity = "Gravity";
    Wind = "Wind";
    VertexCount = "VertexCount";
    Fps2 = "Fps";
    PhysicsSettings = "PhysicsSettings";
    Normalization = "Normalization";
    Minimum = "Minimum";
    Maximum = "Maximum";
    Default = "Default";
    Reflect2 = "Reflect";
    Weight = "Weight";
    Input = "Input";
    Source = "Source";
    Output = "Output";
    Scale = "Scale";
    VertexIndex = "VertexIndex";
    Destination = "Destination";
    Vertices = "Vertices";
    Mobility = "Mobility";
    Delay = "Delay";
    Radius = "Radius";
    Acceleration = "Acceleration";
    CubismPhysicsJson = class {
      /**
       * コンストラクタ
       * @param buffer physics3.jsonが読み込まれているバッファ
       * @param size バッファのサイズ
       */
      constructor(buffer, size) {
        this._json = CubismJson.create(buffer, size);
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        CubismJson.delete(this._json);
      }
      /**
       * 重力の取得
       * @return 重力
       */
      getGravity() {
        const ret = new CubismVector2(0, 0);
        ret.x = this._json.getRoot().getValueByString(Meta2).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(X).toFloat();
        ret.y = this._json.getRoot().getValueByString(Meta2).getValueByString(EffectiveForces).getValueByString(Gravity).getValueByString(Y).toFloat();
        return ret;
      }
      /**
       * 風の取得
       * @return 風
       */
      getWind() {
        const ret = new CubismVector2(0, 0);
        ret.x = this._json.getRoot().getValueByString(Meta2).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(X).toFloat();
        ret.y = this._json.getRoot().getValueByString(Meta2).getValueByString(EffectiveForces).getValueByString(Wind).getValueByString(Y).toFloat();
        return ret;
      }
      /**
       * 物理演算設定FPSの取得
       * @return 物理演算設定FPS
       */
      getFps() {
        return this._json.getRoot().getValueByString(Meta2).getValueByString(Fps2).toFloat(0);
      }
      /**
       * 物理店の管理の個数の取得
       * @return 物理店の管理の個数
       */
      getSubRigCount() {
        return this._json.getRoot().getValueByString(Meta2).getValueByString(PhysicsSettingCount).toInt();
      }
      /**
       * 入力の総合計の取得
       * @return 入力の総合計
       */
      getTotalInputCount() {
        return this._json.getRoot().getValueByString(Meta2).getValueByString(TotalInputCount).toInt();
      }
      /**
       * 出力の総合計の取得
       * @return 出力の総合計
       */
      getTotalOutputCount() {
        return this._json.getRoot().getValueByString(Meta2).getValueByString(TotalOutputCount).toInt();
      }
      /**
       * 物理点の個数の取得
       * @return 物理点の個数
       */
      getVertexCount() {
        return this._json.getRoot().getValueByString(Meta2).getValueByString(VertexCount).toInt();
      }
      /**
       * 正規化された位置の最小値の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 正規化された位置の最小値
       */
      getNormalizationPositionMinimumValue(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Minimum).toFloat();
      }
      /**
       * 正規化された位置の最大値の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 正規化された位置の最大値
       */
      getNormalizationPositionMaximumValue(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Maximum).toFloat();
      }
      /**
       * 正規化された位置のデフォルト値の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 正規化された位置のデフォルト値
       */
      getNormalizationPositionDefaultValue(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Position).getValueByString(Default).toFloat();
      }
      /**
       * 正規化された角度の最小値の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 正規化された角度の最小値
       */
      getNormalizationAngleMinimumValue(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Minimum).toFloat();
      }
      /**
       * 正規化された角度の最大値の取得
       * @param physicsSettingIndex
       * @return 正規化された角度の最大値
       */
      getNormalizationAngleMaximumValue(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Maximum).toFloat();
      }
      /**
       * 正規化された角度のデフォルト値の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 正規化された角度のデフォルト値
       */
      getNormalizationAngleDefaultValue(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Normalization).getValueByString(Angle).getValueByString(Default).toFloat();
      }
      /**
       * 入力の個数の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 入力の個数
       */
      getInputCount(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getVector().length;
      }
      /**
       * 入力の重みの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param inputIndex 入力のインデックス
       * @return 入力の重み
       */
      getInputWeight(physicsSettingIndex, inputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Weight).toFloat();
      }
      /**
       * 入力の反転の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param inputIndex 入力のインデックス
       * @return 入力の反転
       */
      getInputReflect(physicsSettingIndex, inputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Reflect2).toBoolean();
      }
      /**
       * 入力の種類の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param inputIndex 入力のインデックス
       * @return 入力の種類
       */
      getInputType(physicsSettingIndex, inputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Type).getRawString();
      }
      /**
       * 入力元のIDの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param inputIndex 入力のインデックス
       * @return 入力元のID
       */
      getInputSourceId(physicsSettingIndex, inputIndex) {
        return CubismFramework.getIdManager().getId(
          this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Input).getValueByIndex(inputIndex).getValueByString(Source).getValueByString(Id3).getRawString()
        );
      }
      /**
       * 出力の個数の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @return 出力の個数
       */
      getOutputCount(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getVector().length;
      }
      /**
       * 出力の物理点のインデックスの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param outputIndex 出力のインデックス
       * @return 出力の物理点のインデックス
       */
      getOutputVertexIndex(physicsSettingIndex, outputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(VertexIndex).toInt();
      }
      /**
       * 出力の角度のスケールを取得する
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param outputIndex 出力のインデックス
       * @return 出力の角度のスケール
       */
      getOutputAngleScale(physicsSettingIndex, outputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Scale).toFloat();
      }
      /**
       * 出力の重みの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param outputIndex 出力のインデックス
       * @return 出力の重み
       */
      getOutputWeight(physicsSettingIndex, outputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Weight).toFloat();
      }
      /**
       * 出力先のIDの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param outputIndex 出力のインデックス
       * @return 出力先のID
       */
      getOutputDestinationId(physicsSettingIndex, outputIndex) {
        return CubismFramework.getIdManager().getId(
          this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Destination).getValueByString(Id3).getRawString()
        );
      }
      /**
       * 出力の種類の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param outputIndex 出力のインデックス
       * @return 出力の種類
       */
      getOutputType(physicsSettingIndex, outputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Type).getRawString();
      }
      /**
       * 出力の反転の取得
       * @param physicsSettingIndex 物理演算のインデックス
       * @param outputIndex 出力のインデックス
       * @return 出力の反転
       */
      getOutputReflect(physicsSettingIndex, outputIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Output).getValueByIndex(outputIndex).getValueByString(Reflect2).toBoolean();
      }
      /**
       * 物理点の個数の取得
       * @param physicsSettingIndex 物理演算男設定のインデックス
       * @return 物理点の個数
       */
      getParticleCount(physicsSettingIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getVector().length;
      }
      /**
       * 物理点の動きやすさの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param vertexIndex 物理点のインデックス
       * @return 物理点の動きやすさ
       */
      getParticleMobility(physicsSettingIndex, vertexIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Mobility).toFloat();
      }
      /**
       * 物理点の遅れの取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param vertexIndex 物理点のインデックス
       * @return 物理点の遅れ
       */
      getParticleDelay(physicsSettingIndex, vertexIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Delay).toFloat();
      }
      /**
       * 物理点の加速度の取得
       * @param physicsSettingIndex 物理演算の設定
       * @param vertexIndex 物理点のインデックス
       * @return 物理点の加速度
       */
      getParticleAcceleration(physicsSettingIndex, vertexIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Acceleration).toFloat();
      }
      /**
       * 物理点の距離の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param vertexIndex 物理点のインデックス
       * @return 物理点の距離
       */
      getParticleRadius(physicsSettingIndex, vertexIndex) {
        return this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Radius).toFloat();
      }
      /**
       * 物理点の位置の取得
       * @param physicsSettingIndex 物理演算の設定のインデックス
       * @param vertexInde 物理点のインデックス
       * @return 物理点の位置
       */
      getParticlePosition(physicsSettingIndex, vertexIndex) {
        const ret = new CubismVector2(0, 0);
        ret.x = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(X).toFloat();
        ret.y = this._json.getRoot().getValueByString(PhysicsSettings).getValueByIndex(physicsSettingIndex).getValueByString(Vertices).getValueByIndex(vertexIndex).getValueByString(Position).getValueByString(Y).toFloat();
        return ret;
      }
      _json;
      // physics3.jsonデータ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismPhysicsJson = CubismPhysicsJson;
    })(Live2DCubismFramework31 || (Live2DCubismFramework31 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/physics/cubismphysics.ts
function sign(value) {
  let ret = 0;
  if (value > 0) {
    ret = 1;
  } else if (value < 0) {
    ret = -1;
  }
  return ret;
}
function getInputTranslationXFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
  targetTranslation.x += normalizeParameterValue(
    value,
    parameterMinimumValue,
    parameterMaximumValue,
    parameterDefaultValue,
    normalizationPosition.minimum,
    normalizationPosition.maximum,
    normalizationPosition.defalut,
    isInverted
  ) * weight;
}
function getInputTranslationYFromNormalizedParamterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizationPosition, normalizationAngle, isInverted, weight) {
  targetTranslation.y += normalizeParameterValue(
    value,
    parameterMinimumValue,
    parameterMaximumValue,
    parameterDefaultValue,
    normalizationPosition.minimum,
    normalizationPosition.maximum,
    normalizationPosition.defalut,
    isInverted
  ) * weight;
}
function getInputAngleFromNormalizedParameterValue(targetTranslation, targetAngle, value, parameterMinimumValue, parameterMaximumValue, parameterDefaultValue, normalizaitionPosition, normalizationAngle, isInverted, weight) {
  targetAngle.angle += normalizeParameterValue(
    value,
    parameterMinimumValue,
    parameterMaximumValue,
    parameterDefaultValue,
    normalizationAngle.minimum,
    normalizationAngle.maximum,
    normalizationAngle.defalut,
    isInverted
  ) * weight;
}
function getOutputTranslationX(translation, particles, particleIndex, isInverted, parentGravity) {
  let outputValue = translation.x;
  if (isInverted) {
    outputValue *= -1;
  }
  return outputValue;
}
function getOutputTranslationY(translation, particles, particleIndex, isInverted, parentGravity) {
  let outputValue = translation.y;
  if (isInverted) {
    outputValue *= -1;
  }
  return outputValue;
}
function getOutputAngle(translation, particles, particleIndex, isInverted, parentGravity) {
  let outputValue;
  if (particleIndex >= 2) {
    parentGravity = particles[particleIndex - 1].position.substract(
      particles[particleIndex - 2].position
    );
  } else {
    parentGravity = parentGravity.multiplyByScaler(-1);
  }
  outputValue = CubismMath.directionToRadian(parentGravity, translation);
  if (isInverted) {
    outputValue *= -1;
  }
  return outputValue;
}
function getRangeValue(min, max) {
  const maxValue = CubismMath.max(min, max);
  const minValue = CubismMath.min(min, max);
  return CubismMath.abs(maxValue - minValue);
}
function getDefaultValue(min, max) {
  const minValue = CubismMath.min(min, max);
  return minValue + getRangeValue(min, max) / 2;
}
function getOutputScaleTranslationX(translationScale, angleScale) {
  return JSON.parse(JSON.stringify(translationScale.x));
}
function getOutputScaleTranslationY(translationScale, angleScale) {
  return JSON.parse(JSON.stringify(translationScale.y));
}
function getOutputScaleAngle(translationScale, angleScale) {
  return JSON.parse(JSON.stringify(angleScale));
}
function updateParticles(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue, deltaTimeSeconds, airResistance) {
  let delay;
  let radian;
  let direction = new CubismVector2(0, 0);
  let velocity = new CubismVector2(0, 0);
  let force = new CubismVector2(0, 0);
  let newDirection = new CubismVector2(0, 0);
  strand[0].position = new CubismVector2(
    totalTranslation.x,
    totalTranslation.y
  );
  const totalRadian = CubismMath.degreesToRadian(totalAngle);
  const currentGravity = CubismMath.radianToDirection(totalRadian);
  currentGravity.normalize();
  for (let i = 1; i < strandCount; ++i) {
    strand[i].force = currentGravity.multiplyByScaler(strand[i].acceleration).add(windDirection);
    strand[i].lastPosition = new CubismVector2(
      strand[i].position.x,
      strand[i].position.y
    );
    delay = strand[i].delay * deltaTimeSeconds * 30;
    direction = strand[i].position.substract(strand[i - 1].position);
    radian = CubismMath.directionToRadian(strand[i].lastGravity, currentGravity) / airResistance;
    direction.x = CubismMath.cos(radian) * direction.x - direction.y * CubismMath.sin(radian);
    direction.y = CubismMath.sin(radian) * direction.x + direction.y * CubismMath.cos(radian);
    strand[i].position = strand[i - 1].position.add(direction);
    velocity = strand[i].velocity.multiplyByScaler(delay);
    force = strand[i].force.multiplyByScaler(delay).multiplyByScaler(delay);
    strand[i].position = strand[i].position.add(velocity).add(force);
    newDirection = strand[i].position.substract(strand[i - 1].position);
    newDirection.normalize();
    strand[i].position = strand[i - 1].position.add(
      newDirection.multiplyByScaler(strand[i].radius)
    );
    if (CubismMath.abs(strand[i].position.x) < thresholdValue) {
      strand[i].position.x = 0;
    }
    if (delay != 0) {
      strand[i].velocity = strand[i].position.substract(strand[i].lastPosition);
      strand[i].velocity = strand[i].velocity.divisionByScalar(delay);
      strand[i].velocity = strand[i].velocity.multiplyByScaler(
        strand[i].mobility
      );
    }
    strand[i].force = new CubismVector2(0, 0);
    strand[i].lastGravity = new CubismVector2(
      currentGravity.x,
      currentGravity.y
    );
  }
}
function updateParticlesForStabilization(strand, strandCount, totalTranslation, totalAngle, windDirection, thresholdValue) {
  let force = new CubismVector2(0, 0);
  strand[0].position = new CubismVector2(
    totalTranslation.x,
    totalTranslation.y
  );
  const totalRadian = CubismMath.degreesToRadian(totalAngle);
  const currentGravity = CubismMath.radianToDirection(totalRadian);
  currentGravity.normalize();
  for (let i = 1; i < strandCount; ++i) {
    strand[i].force = currentGravity.multiplyByScaler(strand[i].acceleration).add(windDirection);
    strand[i].lastPosition = new CubismVector2(
      strand[i].position.x,
      strand[i].position.y
    );
    strand[i].velocity = new CubismVector2(0, 0);
    force = strand[i].force;
    force.normalize();
    force = force.multiplyByScaler(strand[i].radius);
    strand[i].position = strand[i - 1].position.add(force);
    if (CubismMath.abs(strand[i].position.x) < thresholdValue) {
      strand[i].position.x = 0;
    }
    strand[i].force = new CubismVector2(0, 0);
    strand[i].lastGravity = new CubismVector2(
      currentGravity.x,
      currentGravity.y
    );
  }
}
function updateOutputParameterValue(parameterValue, parameterValueMinimum, parameterValueMaximum, translation, output) {
  let value;
  const outputScale = output.getScale(
    output.translationScale,
    output.angleScale
  );
  value = translation * outputScale;
  if (value < parameterValueMinimum) {
    if (value < output.valueBelowMinimum) {
      output.valueBelowMinimum = value;
    }
    value = parameterValueMinimum;
  } else if (value > parameterValueMaximum) {
    if (value > output.valueExceededMaximum) {
      output.valueExceededMaximum = value;
    }
    value = parameterValueMaximum;
  }
  const weight = output.weight / MaximumWeight;
  if (weight >= 1) {
    parameterValue[0] = value;
  } else {
    value = parameterValue[0] * (1 - weight) + value * weight;
    parameterValue[0] = value;
  }
}
function normalizeParameterValue(value, parameterMinimum, parameterMaximum, parameterDefault, normalizedMinimum, normalizedMaximum, normalizedDefault, isInverted) {
  let result = 0;
  const maxValue = CubismMath.max(parameterMaximum, parameterMinimum);
  if (maxValue < value) {
    value = maxValue;
  }
  const minValue = CubismMath.min(parameterMaximum, parameterMinimum);
  if (minValue > value) {
    value = minValue;
  }
  const minNormValue = CubismMath.min(
    normalizedMinimum,
    normalizedMaximum
  );
  const maxNormValue = CubismMath.max(
    normalizedMinimum,
    normalizedMaximum
  );
  const middleNormValue = normalizedDefault;
  const middleValue = getDefaultValue(minValue, maxValue);
  const paramValue = value - middleValue;
  switch (sign(paramValue)) {
    case 1: {
      const nLength = maxNormValue - middleNormValue;
      const pLength = maxValue - middleValue;
      if (pLength != 0) {
        result = paramValue * (nLength / pLength);
        result += middleNormValue;
      }
      break;
    }
    case -1: {
      const nLength = minNormValue - middleNormValue;
      const pLength = minValue - middleValue;
      if (pLength != 0) {
        result = paramValue * (nLength / pLength);
        result += middleNormValue;
      }
      break;
    }
    case 0: {
      result = middleNormValue;
      break;
    }
    default: {
      break;
    }
  }
  return isInverted ? result : result * -1;
}
var PhysicsTypeTagX, PhysicsTypeTagY, PhysicsTypeTagAngle, AirResistance, MaximumWeight, MovementThreshold, MaxDeltaTime, CubismPhysics, Options, PhysicsOutput, Live2DCubismFramework32;
var init_cubismphysics = __esm({
  "vendor/live2d/sdk/Framework/src/physics/cubismphysics.ts"() {
    init_cubismmath();
    init_cubismvector2();
    init_cubismarrayutils();
    init_cubismphysicsinternal();
    init_cubismphysicsjson();
    init_cubismphysics();
    PhysicsTypeTagX = "X";
    PhysicsTypeTagY = "Y";
    PhysicsTypeTagAngle = "Angle";
    AirResistance = 5;
    MaximumWeight = 100;
    MovementThreshold = 1e-3;
    MaxDeltaTime = 5;
    CubismPhysics = class _CubismPhysics {
      /**
       * インスタンスの作成
       * @param buffer    physics3.jsonが読み込まれているバッファ
       * @param size      バッファのサイズ
       * @return 作成されたインスタンス
       */
      static create(buffer, size) {
        const ret = new _CubismPhysics();
        ret.parse(buffer, size);
        ret._physicsRig.gravity.y = 0;
        return ret;
      }
      /**
       * インスタンスを破棄する
       * @param physics 破棄するインスタンス
       */
      static delete(physics) {
        if (physics != null) {
          physics.release();
          physics = null;
        }
      }
      /**
       * physics3.jsonをパースする。
       * @param physicsJson physics3.jsonが読み込まれているバッファ
       * @param size バッファのサイズ
       */
      parse(physicsJson, size) {
        this._physicsRig = new CubismPhysicsRig();
        let json = new CubismPhysicsJson(physicsJson, size);
        this._physicsRig.gravity = json.getGravity();
        this._physicsRig.wind = json.getWind();
        this._physicsRig.subRigCount = json.getSubRigCount();
        this._physicsRig.fps = json.getFps();
        updateSize(
          this._physicsRig.settings,
          this._physicsRig.subRigCount,
          CubismPhysicsSubRig,
          true
        );
        updateSize(
          this._physicsRig.inputs,
          json.getTotalInputCount(),
          CubismPhysicsInput,
          true
        );
        updateSize(
          this._physicsRig.outputs,
          json.getTotalOutputCount(),
          CubismPhysicsOutput,
          true
        );
        updateSize(
          this._physicsRig.particles,
          json.getVertexCount(),
          CubismPhysicsParticle,
          true
        );
        this._currentRigOutputs.length = 0;
        this._previousRigOutputs.length = 0;
        let inputIndex = 0, outputIndex = 0, particleIndex = 0;
        let dstIndexCurrentRigOutputs = this._currentRigOutputs.length;
        let dstIndexPreviousRigOutputs = this._previousRigOutputs.length;
        this._currentRigOutputs.length += this._physicsRig.settings.length;
        this._previousRigOutputs.length += this._physicsRig.settings.length;
        for (let i = 0; i < this._physicsRig.settings.length; ++i) {
          this._physicsRig.settings[i].normalizationPosition.minimum = json.getNormalizationPositionMinimumValue(i);
          this._physicsRig.settings[i].normalizationPosition.maximum = json.getNormalizationPositionMaximumValue(i);
          this._physicsRig.settings[i].normalizationPosition.defalut = json.getNormalizationPositionDefaultValue(i);
          this._physicsRig.settings[i].normalizationAngle.minimum = json.getNormalizationAngleMinimumValue(i);
          this._physicsRig.settings[i].normalizationAngle.maximum = json.getNormalizationAngleMaximumValue(i);
          this._physicsRig.settings[i].normalizationAngle.defalut = json.getNormalizationAngleDefaultValue(i);
          this._physicsRig.settings[i].inputCount = json.getInputCount(i);
          this._physicsRig.settings[i].baseInputIndex = inputIndex;
          for (let j = 0; j < this._physicsRig.settings[i].inputCount; ++j) {
            this._physicsRig.inputs[inputIndex + j].sourceParameterIndex = -1;
            this._physicsRig.inputs[inputIndex + j].weight = json.getInputWeight(
              i,
              j
            );
            this._physicsRig.inputs[inputIndex + j].reflect = json.getInputReflect(
              i,
              j
            );
            if (json.getInputType(i, j) == PhysicsTypeTagX) {
              this._physicsRig.inputs[inputIndex + j].type = 0 /* CubismPhysicsSource_X */;
              this._physicsRig.inputs[inputIndex + j].getNormalizedParameterValue = getInputTranslationXFromNormalizedParameterValue;
            } else if (json.getInputType(i, j) == PhysicsTypeTagY) {
              this._physicsRig.inputs[inputIndex + j].type = 1 /* CubismPhysicsSource_Y */;
              this._physicsRig.inputs[inputIndex + j].getNormalizedParameterValue = getInputTranslationYFromNormalizedParamterValue;
            } else if (json.getInputType(i, j) == PhysicsTypeTagAngle) {
              this._physicsRig.inputs[inputIndex + j].type = 2 /* CubismPhysicsSource_Angle */;
              this._physicsRig.inputs[inputIndex + j].getNormalizedParameterValue = getInputAngleFromNormalizedParameterValue;
            }
            this._physicsRig.inputs[inputIndex + j].source.targetType = 0 /* CubismPhysicsTargetType_Parameter */;
            this._physicsRig.inputs[inputIndex + j].source.id = json.getInputSourceId(i, j);
          }
          inputIndex += this._physicsRig.settings[i].inputCount;
          this._physicsRig.settings[i].outputCount = json.getOutputCount(i);
          this._physicsRig.settings[i].baseOutputIndex = outputIndex;
          const currentRigOutput = new PhysicsOutput();
          updateSize(
            currentRigOutput.outputs,
            this._physicsRig.settings[i].outputCount,
            null,
            true
          );
          const previousRigOutput = new PhysicsOutput();
          updateSize(
            previousRigOutput.outputs,
            this._physicsRig.settings[i].outputCount,
            null,
            true
          );
          for (let j = 0; j < this._physicsRig.settings[i].outputCount; ++j) {
            currentRigOutput.outputs[j] = 0;
            previousRigOutput.outputs[j] = 0;
            this._physicsRig.outputs[outputIndex + j].destinationParameterIndex = -1;
            this._physicsRig.outputs[outputIndex + j].vertexIndex = json.getOutputVertexIndex(i, j);
            this._physicsRig.outputs[outputIndex + j].angleScale = json.getOutputAngleScale(i, j);
            this._physicsRig.outputs[outputIndex + j].weight = json.getOutputWeight(
              i,
              j
            );
            this._physicsRig.outputs[outputIndex + j].destination.targetType = 0 /* CubismPhysicsTargetType_Parameter */;
            this._physicsRig.outputs[outputIndex + j].destination.id = json.getOutputDestinationId(i, j);
            if (json.getOutputType(i, j) == PhysicsTypeTagX) {
              this._physicsRig.outputs[outputIndex + j].type = 0 /* CubismPhysicsSource_X */;
              this._physicsRig.outputs[outputIndex + j].getValue = getOutputTranslationX;
              this._physicsRig.outputs[outputIndex + j].getScale = getOutputScaleTranslationX;
            } else if (json.getOutputType(i, j) == PhysicsTypeTagY) {
              this._physicsRig.outputs[outputIndex + j].type = 1 /* CubismPhysicsSource_Y */;
              this._physicsRig.outputs[outputIndex + j].getValue = getOutputTranslationY;
              this._physicsRig.outputs[outputIndex + j].getScale = getOutputScaleTranslationY;
            } else if (json.getOutputType(i, j) == PhysicsTypeTagAngle) {
              this._physicsRig.outputs[outputIndex + j].type = 2 /* CubismPhysicsSource_Angle */;
              this._physicsRig.outputs[outputIndex + j].getValue = getOutputAngle;
              this._physicsRig.outputs[outputIndex + j].getScale = getOutputScaleAngle;
            }
            this._physicsRig.outputs[outputIndex + j].reflect = json.getOutputReflect(i, j);
          }
          this._currentRigOutputs[dstIndexCurrentRigOutputs++] = currentRigOutput;
          this._previousRigOutputs[dstIndexPreviousRigOutputs++] = previousRigOutput;
          outputIndex += this._physicsRig.settings[i].outputCount;
          this._physicsRig.settings[i].particleCount = json.getParticleCount(i);
          this._physicsRig.settings[i].baseParticleIndex = particleIndex;
          for (let j = 0; j < this._physicsRig.settings[i].particleCount; ++j) {
            this._physicsRig.particles[particleIndex + j].mobility = json.getParticleMobility(i, j);
            this._physicsRig.particles[particleIndex + j].delay = json.getParticleDelay(i, j);
            this._physicsRig.particles[particleIndex + j].acceleration = json.getParticleAcceleration(i, j);
            this._physicsRig.particles[particleIndex + j].radius = json.getParticleRadius(i, j);
            this._physicsRig.particles[particleIndex + j].position = json.getParticlePosition(i, j);
          }
          particleIndex += this._physicsRig.settings[i].particleCount;
        }
        this.initialize();
        json.release();
        json = void 0;
        json = null;
      }
      /**
       * 現在のパラメータ値で物理演算が安定化する状態を演算する。
       * @param model 物理演算の結果を適用するモデル
       */
      stabilization(model) {
        let totalAngle;
        let weight;
        let radAngle;
        let outputValue;
        const totalTranslation = new CubismVector2();
        let currentSetting;
        let currentInputs;
        let currentOutputs;
        let currentParticles;
        const parameterValues = model.getModel().parameters.values;
        const parameterMaximumValues = model.getModel().parameters.maximumValues;
        const parameterMinimumValues = model.getModel().parameters.minimumValues;
        const parameterDefaultValues = model.getModel().parameters.defaultValues;
        if ((this._parameterCaches?.length ?? 0) < model.getParameterCount()) {
          this._parameterCaches = new Float32Array(model.getParameterCount());
        }
        if ((this._parameterInputCaches?.length ?? 0) < model.getParameterCount()) {
          this._parameterInputCaches = new Float32Array(model.getParameterCount());
        }
        for (let j = 0; j < model.getParameterCount(); ++j) {
          this._parameterCaches[j] = parameterValues[j];
          this._parameterInputCaches[j] = parameterValues[j];
        }
        for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
          totalAngle = { angle: 0 };
          totalTranslation.x = 0;
          totalTranslation.y = 0;
          currentSetting = this._physicsRig.settings[settingIndex];
          currentInputs = this._physicsRig.inputs.slice(
            currentSetting.baseInputIndex
          );
          currentOutputs = this._physicsRig.outputs.slice(
            currentSetting.baseOutputIndex
          );
          currentParticles = this._physicsRig.particles.slice(
            currentSetting.baseParticleIndex
          );
          for (let i = 0; i < currentSetting.inputCount; ++i) {
            weight = currentInputs[i].weight / MaximumWeight;
            if (currentInputs[i].sourceParameterIndex == -1) {
              currentInputs[i].sourceParameterIndex = model.getParameterIndex(
                currentInputs[i].source.id
              );
            }
            currentInputs[i].getNormalizedParameterValue(
              totalTranslation,
              totalAngle,
              parameterValues[currentInputs[i].sourceParameterIndex],
              parameterMinimumValues[currentInputs[i].sourceParameterIndex],
              parameterMaximumValues[currentInputs[i].sourceParameterIndex],
              parameterDefaultValues[currentInputs[i].sourceParameterIndex],
              currentSetting.normalizationPosition,
              currentSetting.normalizationAngle,
              currentInputs[i].reflect,
              weight
            );
            this._parameterCaches[currentInputs[i].sourceParameterIndex] = parameterValues[currentInputs[i].sourceParameterIndex];
          }
          radAngle = CubismMath.degreesToRadian(-totalAngle.angle);
          totalTranslation.x = totalTranslation.x * CubismMath.cos(radAngle) - totalTranslation.y * CubismMath.sin(radAngle);
          totalTranslation.y = totalTranslation.x * CubismMath.sin(radAngle) + totalTranslation.y * CubismMath.cos(radAngle);
          updateParticlesForStabilization(
            currentParticles,
            currentSetting.particleCount,
            totalTranslation,
            totalAngle.angle,
            this._options.wind,
            MovementThreshold * currentSetting.normalizationPosition.maximum
          );
          for (let i = 0; i < currentSetting.outputCount; ++i) {
            const particleIndex = currentOutputs[i].vertexIndex;
            if (currentOutputs[i].destinationParameterIndex == -1) {
              currentOutputs[i].destinationParameterIndex = model.getParameterIndex(
                currentOutputs[i].destination.id
              );
            }
            if (particleIndex < 1 || particleIndex >= currentSetting.particleCount) {
              continue;
            }
            let translation = new CubismVector2();
            translation = currentParticles[particleIndex].position.substract(
              currentParticles[particleIndex - 1].position
            );
            outputValue = currentOutputs[i].getValue(
              translation,
              currentParticles,
              particleIndex,
              currentOutputs[i].reflect,
              this._options.gravity
            );
            this._currentRigOutputs[settingIndex].outputs[i] = outputValue;
            this._previousRigOutputs[settingIndex].outputs[i] = outputValue;
            const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
            const outParameterCaches = !Float32Array.prototype.slice && "subarray" in Float32Array.prototype ? JSON.parse(
              JSON.stringify(
                parameterValues.subarray(destinationParameterIndex)
              )
            ) : parameterValues.slice(destinationParameterIndex);
            updateOutputParameterValue(
              outParameterCaches,
              parameterMinimumValues[destinationParameterIndex],
              parameterMaximumValues[destinationParameterIndex],
              outputValue,
              currentOutputs[i]
            );
            for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
              parameterValues[offset] = this._parameterCaches[offset] = outParameterCaches[outParamIndex];
            }
          }
        }
      }
      /**
       * 物理演算の評価
       *
       * Pendulum interpolation weights
       *
       * 振り子の計算結果は保存され、パラメータへの出力は保存された前回の結果で補間されます。
       * The result of the pendulum calculation is saved and
       * the output to the parameters is interpolated with the saved previous result of the pendulum calculation.
       *
       * 図で示すと[1]と[2]で補間されます。
       * The figure shows the interpolation between [1] and [2].
       *
       * 補間の重みは最新の振り子計算タイミングと次回のタイミングの間で見た現在時間で決定する。
       * The weight of the interpolation are determined by the current time seen between
       * the latest pendulum calculation timing and the next timing.
       *
       * 図で示すと[2]と[4]の間でみた(3)の位置の重みになる。
       * Figure shows the weight of position (3) as seen between [2] and [4].
       *
       * 解釈として振り子計算のタイミングと重み計算のタイミングがズレる。
       * As an interpretation, the pendulum calculation and weights are misaligned.
       *
       * physics3.jsonにFPS情報が存在しない場合は常に前の振り子状態で設定される。
       * If there is no FPS information in physics3.json, it is always set in the previous pendulum state.
       *
       * この仕様は補間範囲を逸脱したことが原因の震えたような見た目を回避を目的にしている。
       * The purpose of this specification is to avoid the quivering appearance caused by deviations from the interpolation range.
       *
       * ------------ time -------------->
       *
       *                 |+++++|------| <- weight
       * ==[1]====#=====[2]---(3)----(4)
       *          ^ output contents
       *
       * 1:_previousRigOutputs
       * 2:_currentRigOutputs
       * 3:_currentRemainTime (now rendering)
       * 4:next particles timing
       * @param model 物理演算の結果を適用するモデル
       * @param deltaTimeSeconds デルタ時間[秒]
       */
      evaluate(model, deltaTimeSeconds) {
        let totalAngle;
        let weight;
        let radAngle;
        let outputValue;
        const totalTranslation = new CubismVector2();
        let currentSetting;
        let currentInputs;
        let currentOutputs;
        let currentParticles;
        if (0 >= deltaTimeSeconds) {
          return;
        }
        const parameterValues = model.getModel().parameters.values;
        const parameterMaximumValues = model.getModel().parameters.maximumValues;
        const parameterMinimumValues = model.getModel().parameters.minimumValues;
        const parameterDefaultValues = model.getModel().parameters.defaultValues;
        let physicsDeltaTime;
        this._currentRemainTime += deltaTimeSeconds;
        if (this._currentRemainTime > MaxDeltaTime) {
          this._currentRemainTime = 0;
        }
        if ((this._parameterCaches?.length ?? 0) < model.getParameterCount()) {
          this._parameterCaches = new Float32Array(model.getParameterCount());
        }
        if ((this._parameterInputCaches?.length ?? 0) < model.getParameterCount()) {
          this._parameterInputCaches = new Float32Array(model.getParameterCount());
          for (let j = 0; j < model.getParameterCount(); ++j) {
            this._parameterInputCaches[j] = parameterValues[j];
          }
        }
        if (this._physicsRig.fps > 0) {
          physicsDeltaTime = 1 / this._physicsRig.fps;
        } else {
          physicsDeltaTime = deltaTimeSeconds;
        }
        while (this._currentRemainTime >= physicsDeltaTime) {
          for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            currentSetting = this._physicsRig.settings[settingIndex];
            currentOutputs = this._physicsRig.outputs.slice(
              currentSetting.baseOutputIndex
            );
            for (let i = 0; i < currentSetting.outputCount; ++i) {
              this._previousRigOutputs[settingIndex].outputs[i] = this._currentRigOutputs[settingIndex].outputs[i];
            }
          }
          const inputWeight = physicsDeltaTime / this._currentRemainTime;
          for (let j = 0; j < model.getParameterCount(); ++j) {
            this._parameterCaches[j] = this._parameterInputCaches[j] * (1 - inputWeight) + parameterValues[j] * inputWeight;
            this._parameterInputCaches[j] = this._parameterCaches[j];
          }
          for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
            totalAngle = { angle: 0 };
            totalTranslation.x = 0;
            totalTranslation.y = 0;
            currentSetting = this._physicsRig.settings[settingIndex];
            currentInputs = this._physicsRig.inputs.slice(
              currentSetting.baseInputIndex
            );
            currentOutputs = this._physicsRig.outputs.slice(
              currentSetting.baseOutputIndex
            );
            currentParticles = this._physicsRig.particles.slice(
              currentSetting.baseParticleIndex
            );
            for (let i = 0; i < currentSetting.inputCount; ++i) {
              weight = currentInputs[i].weight / MaximumWeight;
              if (currentInputs[i].sourceParameterIndex == -1) {
                currentInputs[i].sourceParameterIndex = model.getParameterIndex(
                  currentInputs[i].source.id
                );
              }
              currentInputs[i].getNormalizedParameterValue(
                totalTranslation,
                totalAngle,
                this._parameterCaches[currentInputs[i].sourceParameterIndex],
                parameterMinimumValues[currentInputs[i].sourceParameterIndex],
                parameterMaximumValues[currentInputs[i].sourceParameterIndex],
                parameterDefaultValues[currentInputs[i].sourceParameterIndex],
                currentSetting.normalizationPosition,
                currentSetting.normalizationAngle,
                currentInputs[i].reflect,
                weight
              );
            }
            radAngle = CubismMath.degreesToRadian(-totalAngle.angle);
            totalTranslation.x = totalTranslation.x * CubismMath.cos(radAngle) - totalTranslation.y * CubismMath.sin(radAngle);
            totalTranslation.y = totalTranslation.x * CubismMath.sin(radAngle) + totalTranslation.y * CubismMath.cos(radAngle);
            updateParticles(
              currentParticles,
              currentSetting.particleCount,
              totalTranslation,
              totalAngle.angle,
              this._options.wind,
              MovementThreshold * currentSetting.normalizationPosition.maximum,
              physicsDeltaTime,
              AirResistance
            );
            for (let i = 0; i < currentSetting.outputCount; ++i) {
              const particleIndex = currentOutputs[i].vertexIndex;
              if (currentOutputs[i].destinationParameterIndex == -1) {
                currentOutputs[i].destinationParameterIndex = model.getParameterIndex(currentOutputs[i].destination.id);
              }
              if (particleIndex < 1 || particleIndex >= currentSetting.particleCount) {
                continue;
              }
              const translation = new CubismVector2();
              translation.x = currentParticles[particleIndex].position.x - currentParticles[particleIndex - 1].position.x;
              translation.y = currentParticles[particleIndex].position.y - currentParticles[particleIndex - 1].position.y;
              outputValue = currentOutputs[i].getValue(
                translation,
                currentParticles,
                particleIndex,
                currentOutputs[i].reflect,
                this._options.gravity
              );
              this._currentRigOutputs[settingIndex].outputs[i] = outputValue;
              const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
              const outParameterCaches = !Float32Array.prototype.slice && "subarray" in Float32Array.prototype ? JSON.parse(
                JSON.stringify(
                  this._parameterCaches.subarray(destinationParameterIndex)
                )
              ) : this._parameterCaches.slice(destinationParameterIndex);
              updateOutputParameterValue(
                outParameterCaches,
                parameterMinimumValues[destinationParameterIndex],
                parameterMaximumValues[destinationParameterIndex],
                outputValue,
                currentOutputs[i]
              );
              for (let offset = destinationParameterIndex, outParamIndex = 0; offset < this._parameterCaches.length; offset++, outParamIndex++) {
                this._parameterCaches[offset] = outParameterCaches[outParamIndex];
              }
            }
          }
          this._currentRemainTime -= physicsDeltaTime;
        }
        const alpha = this._currentRemainTime / physicsDeltaTime;
        this.interpolate(model, alpha);
      }
      /**
       * 物理演算結果の適用
       * 振り子演算の最新の結果と一つ前の結果から指定した重みで適用する。
       * @param model 物理演算の結果を適用するモデル
       * @param weight 最新結果の重み
       */
      interpolate(model, weight) {
        let currentOutputs;
        let currentSetting;
        const parameterValues = model.getModel().parameters.values;
        const parameterMaximumValues = model.getModel().parameters.maximumValues;
        const parameterMinimumValues = model.getModel().parameters.minimumValues;
        for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
          currentSetting = this._physicsRig.settings[settingIndex];
          currentOutputs = this._physicsRig.outputs.slice(
            currentSetting.baseOutputIndex
          );
          for (let i = 0; i < currentSetting.outputCount; ++i) {
            if (currentOutputs[i].destinationParameterIndex == -1) {
              continue;
            }
            const destinationParameterIndex = currentOutputs[i].destinationParameterIndex;
            const outParameterValues = !Float32Array.prototype.slice && "subarray" in Float32Array.prototype ? JSON.parse(
              JSON.stringify(
                parameterValues.subarray(destinationParameterIndex)
              )
            ) : parameterValues.slice(destinationParameterIndex);
            updateOutputParameterValue(
              outParameterValues,
              parameterMinimumValues[destinationParameterIndex],
              parameterMaximumValues[destinationParameterIndex],
              this._previousRigOutputs[settingIndex].outputs[i] * (1 - weight) + this._currentRigOutputs[settingIndex].outputs[i] * weight,
              currentOutputs[i]
            );
            for (let offset = destinationParameterIndex, outParamIndex = 0; offset < parameterValues.length; offset++, outParamIndex++) {
              parameterValues[offset] = outParameterValues[outParamIndex];
            }
          }
        }
      }
      /**
       * オプションの設定
       * @param options オプション
       */
      setOptions(options) {
        this._options = options;
      }
      /**
       * オプションの取得
       * @return オプション
       */
      getOption() {
        return this._options;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._physicsRig = null;
        this._options = new Options();
        this._options.gravity.y = -1;
        this._options.gravity.x = 0;
        this._options.wind.x = 0;
        this._options.wind.y = 0;
        this._currentRigOutputs = new Array();
        this._previousRigOutputs = new Array();
        this._currentRemainTime = 0;
        this._parameterCaches = null;
        this._parameterInputCaches = null;
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        this._physicsRig = void 0;
        this._physicsRig = null;
      }
      /**
       * 初期化する
       */
      initialize() {
        let strand;
        let currentSetting;
        let radius;
        for (let settingIndex = 0; settingIndex < this._physicsRig.subRigCount; ++settingIndex) {
          currentSetting = this._physicsRig.settings[settingIndex];
          strand = this._physicsRig.particles.slice(
            currentSetting.baseParticleIndex
          );
          strand[0].initialPosition = new CubismVector2(0, 0);
          strand[0].lastPosition = new CubismVector2(
            strand[0].initialPosition.x,
            strand[0].initialPosition.y
          );
          strand[0].lastGravity = new CubismVector2(0, -1);
          strand[0].lastGravity.y *= -1;
          strand[0].velocity = new CubismVector2(0, 0);
          strand[0].force = new CubismVector2(0, 0);
          for (let i = 1; i < currentSetting.particleCount; ++i) {
            radius = new CubismVector2(0, 0);
            radius.y = strand[i].radius;
            strand[i].initialPosition = new CubismVector2(
              strand[i - 1].initialPosition.x + radius.x,
              strand[i - 1].initialPosition.y + radius.y
            );
            strand[i].position = new CubismVector2(
              strand[i].initialPosition.x,
              strand[i].initialPosition.y
            );
            strand[i].lastPosition = new CubismVector2(
              strand[i].initialPosition.x,
              strand[i].initialPosition.y
            );
            strand[i].lastGravity = new CubismVector2(0, -1);
            strand[i].lastGravity.y *= -1;
            strand[i].velocity = new CubismVector2(0, 0);
            strand[i].force = new CubismVector2(0, 0);
          }
        }
      }
      _physicsRig;
      // 物理演算のデータ
      _options;
      // オプション
      _currentRigOutputs;
      ///< 最新の振り子計算の結果
      _previousRigOutputs;
      ///< 一つ前の振り子計算の結果
      _currentRemainTime;
      ///< 物理演算が処理していない時間
      _parameterCaches;
      ///< Evaluateで利用するパラメータのキャッシュ
      _parameterInputCaches;
      ///< UpdateParticlesが動くときの入力をキャッシュ
    };
    Options = class {
      constructor() {
        this.gravity = new CubismVector2(0, 0);
        this.wind = new CubismVector2(0, 0);
      }
      gravity;
      // 重力方向
      wind;
      // 風の方向
    };
    PhysicsOutput = class {
      constructor() {
        this.outputs = new Array(0);
      }
      outputs;
      // 物理演算出力結果
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismPhysics = CubismPhysics;
      Live2DCubismFramework51.Options = Options;
    })(Live2DCubismFramework32 || (Live2DCubismFramework32 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/model/cubismmodelmultiplyandscreencolor.ts
var ColorData, CubismModelMultiplyAndScreenColor;
var init_cubismmodelmultiplyandscreencolor = __esm({
  "vendor/live2d/sdk/Framework/src/model/cubismmodelmultiplyandscreencolor.ts"() {
    init_cubismrenderer();
    init_cubismmodel();
    init_cubismdebug();
    ColorData = class {
      constructor(isOverridden = false, color = new CubismTextureColor()) {
        this.isOverridden = isOverridden;
        this.color = color;
      }
      isOverridden;
      color;
    };
    CubismModelMultiplyAndScreenColor = class {
      _model;
      // CubismModel
      _isOverriddenModelMultiplyColors;
      _isOverriddenModelScreenColors;
      _userPartScreenColors;
      _userPartMultiplyColors;
      _userDrawableScreenColors;
      _userDrawableMultiplyColors;
      _userOffscreenScreenColors;
      _userOffscreenMultiplyColors;
      /**
       * Constructor.
       *
       * @param model cubism model.
       */
      constructor(model) {
        this._model = model;
        this._isOverriddenModelMultiplyColors = false;
        this._isOverriddenModelScreenColors = false;
        this._userPartScreenColors = [];
        this._userPartMultiplyColors = [];
        this._userDrawableScreenColors = [];
        this._userDrawableMultiplyColors = [];
        this._userOffscreenScreenColors = [];
        this._userOffscreenMultiplyColors = [];
      }
      /**
       * Initialization for using multiply and screen colors.
       *
       * @param partCount number of parts.
       * @param drawableCount number of drawables.
       * @param offscreenCount number of offscreen.
       */
      initialize(partCount, drawableCount, offscreenCount) {
        const userMultiplyColor = new ColorData(
          false,
          new CubismTextureColor(1, 1, 1, 1)
        );
        const userScreenColor = new ColorData(
          false,
          new CubismTextureColor(0, 0, 0, 1)
        );
        this._userPartMultiplyColors = new Array(partCount);
        this._userPartScreenColors = new Array(partCount);
        for (let i = 0; i < partCount; i++) {
          this._userPartMultiplyColors[i] = new ColorData(
            userMultiplyColor.isOverridden,
            new CubismTextureColor(
              userMultiplyColor.color.r,
              userMultiplyColor.color.g,
              userMultiplyColor.color.b,
              userMultiplyColor.color.a
            )
          );
          this._userPartScreenColors[i] = new ColorData(
            userScreenColor.isOverridden,
            new CubismTextureColor(
              userScreenColor.color.r,
              userScreenColor.color.g,
              userScreenColor.color.b,
              userScreenColor.color.a
            )
          );
        }
        this._userDrawableMultiplyColors = new Array(drawableCount);
        this._userDrawableScreenColors = new Array(drawableCount);
        for (let i = 0; i < drawableCount; i++) {
          this._userDrawableMultiplyColors[i] = new ColorData(
            userMultiplyColor.isOverridden,
            new CubismTextureColor(
              userMultiplyColor.color.r,
              userMultiplyColor.color.g,
              userMultiplyColor.color.b,
              userMultiplyColor.color.a
            )
          );
          this._userDrawableScreenColors[i] = new ColorData(
            userScreenColor.isOverridden,
            new CubismTextureColor(
              userScreenColor.color.r,
              userScreenColor.color.g,
              userScreenColor.color.b,
              userScreenColor.color.a
            )
          );
        }
        this._userOffscreenMultiplyColors = new Array(offscreenCount);
        this._userOffscreenScreenColors = new Array(offscreenCount);
        for (let i = 0; i < offscreenCount; i++) {
          this._userOffscreenMultiplyColors[i] = new ColorData(
            userMultiplyColor.isOverridden,
            new CubismTextureColor(
              userMultiplyColor.color.r,
              userMultiplyColor.color.g,
              userMultiplyColor.color.b,
              userMultiplyColor.color.a
            )
          );
          this._userOffscreenScreenColors[i] = new ColorData(
            userScreenColor.isOverridden,
            new CubismTextureColor(
              userScreenColor.color.r,
              userScreenColor.color.g,
              userScreenColor.color.b,
              userScreenColor.color.a
            )
          );
        }
      }
      /**
       * Outputs a warning message for index out of range errors.
       *
       * @param functionName Name of the calling function
       * @param index The invalid index value
       * @param maxIndex The maximum valid index (length - 1)
       */
      warnIndexOutOfRange(functionName, index, maxIndex) {
        CubismLogWarning(
          `${functionName}: index is out of range. index=${index}, valid range=[0, ${maxIndex}].`
        );
      }
      /**
       * Validates if the given part index is within valid range.
       *
       * @param index Part index to validate
       * @param functionName Name of the calling function for error reporting
       * @return true if the index is valid; otherwise false
       */
      isValidPartIndex(index, functionName) {
        if (index < 0 || index >= this._model.getPartCount()) {
          this.warnIndexOutOfRange(
            functionName,
            index,
            this._model.getPartCount() - 1
          );
          return false;
        }
        return true;
      }
      /**
       * Validates if the given drawable index is within valid range.
       *
       * @param index Drawable index to validate
       * @param functionName Name of the calling function for error reporting
       * @return true if the index is valid; otherwise false
       */
      isValidDrawableIndex(index, functionName) {
        if (index < 0 || index >= this._model.getDrawableCount()) {
          this.warnIndexOutOfRange(
            functionName,
            index,
            this._model.getDrawableCount() - 1
          );
          return false;
        }
        return true;
      }
      /**
       * Validates if the given offscreen index is within valid range.
       *
       * @param index Offscreen index to validate
       * @param functionName Name of the calling function for error reporting
       * @return true if the index is valid; otherwise false
       */
      isValidOffscreenIndex(index, functionName) {
        if (index < 0 || index >= this._model.getOffscreenCount()) {
          this.warnIndexOutOfRange(
            functionName,
            index,
            this._model.getOffscreenCount() - 1
          );
          return false;
        }
        return true;
      }
      /**
       * Sets the flag indicating whether the color set at runtime is used as the multiply color for the entire model during rendering.
       *
       * @param value true if the color set at runtime is to be used; otherwise false.
       */
      setMultiplyColorEnabled(value) {
        this._isOverriddenModelMultiplyColors = value;
      }
      /**
       * Returns the flag indicating whether the color set at runtime is used as the multiply color for the entire model during rendering.
       *
       * @return true if the color set at runtime is used; otherwise false.
       */
      getMultiplyColorEnabled() {
        return this._isOverriddenModelMultiplyColors;
      }
      /**
       * Sets the flag indicating whether the color set at runtime is used as the screen color for the entire model during rendering.
       *
       * @param value true if the color set at runtime is to be used; otherwise false.
       */
      setScreenColorEnabled(value) {
        this._isOverriddenModelScreenColors = value;
      }
      /**
       * Returns the flag indicating whether the color set at runtime is used as the screen color for the entire model during rendering.
       *
       * @return true if the color set at runtime is used; otherwise false.
       */
      getScreenColorEnabled() {
        return this._isOverriddenModelScreenColors;
      }
      /**
       * Sets whether the part multiply color is overridden by the SDK.
       * Use true to use the color information from the SDK, or false to use the color information from the model.
       *
       * @param partIndex Part index
       * @param value true enable override, false to disable
       */
      setPartMultiplyColorEnabled(partIndex, value) {
        if (!this.isValidPartIndex(partIndex, "setPartMultiplyColorEnabled")) {
          return;
        }
        this.setPartColorEnabled(
          partIndex,
          value,
          this._userPartMultiplyColors,
          this._userDrawableMultiplyColors,
          this._userOffscreenMultiplyColors
        );
      }
      /**
       * Checks whether the part multiply color is overridden by the SDK.
       *
       * @param partIndex Part index
       *
       * @return true if the color information from the SDK is used; otherwise false.
       */
      getPartMultiplyColorEnabled(partIndex) {
        if (!this.isValidPartIndex(partIndex, "getPartMultiplyColorEnabled")) {
          return false;
        }
        return this._userPartMultiplyColors[partIndex].isOverridden;
      }
      /**
       * Sets whether the part screen color is overridden by the SDK.
       * Use true to use the color information from the SDK, or false to use the color information from the model.
       *
       * @param partIndex Part index
       * @param value true enable override, false to disable
       */
      setPartScreenColorEnabled(partIndex, value) {
        if (!this.isValidPartIndex(partIndex, "setPartScreenColorEnabled")) {
          return;
        }
        this.setPartColorEnabled(
          partIndex,
          value,
          this._userPartScreenColors,
          this._userDrawableScreenColors,
          this._userOffscreenScreenColors
        );
      }
      /**
       * Checks whether the part screen color is overridden by the SDK.
       *
       * @param partIndex Part index
       *
       * @return true if the color information from the SDK is used; otherwise false.
       */
      getPartScreenColorEnabled(partIndex) {
        if (!this.isValidPartIndex(partIndex, "getPartScreenColorEnabled")) {
          return false;
        }
        return this._userPartScreenColors[partIndex].isOverridden;
      }
      /**
       * Sets the multiply color of the part.
       *
       * @param partIndex Part index
       * @param color Multiply color to be set (CubismTextureColor)
       */
      setPartMultiplyColorByTextureColor(partIndex, color) {
        if (!this.isValidPartIndex(partIndex, "setPartMultiplyColorByTextureColor")) {
          return;
        }
        this.setPartMultiplyColorByRGBA(
          partIndex,
          color.r,
          color.g,
          color.b,
          color.a
        );
      }
      /**
       * Sets the multiply color of the part.
       *
       * @param partIndex Part index
       * @param r Red value of the multiply color to be set
       * @param g Green value of the multiply color to be set
       * @param b Blue value of the multiply color to be set
       * @param a Alpha value of the multiply color to be set
       */
      setPartMultiplyColorByRGBA(partIndex, r, g, b, a = 1) {
        if (!this.isValidPartIndex(partIndex, "setPartMultiplyColorByRGBA")) {
          return;
        }
        this.setPartColor(
          partIndex,
          r,
          g,
          b,
          a,
          this._userPartMultiplyColors,
          this._userDrawableMultiplyColors,
          this._userOffscreenMultiplyColors
        );
      }
      /**
       * Returns the multiply color of the part.
       *
       * @param partIndex Part index
       *
       * @return Multiply color (CubismTextureColor)
       */
      getPartMultiplyColor(partIndex) {
        if (!this.isValidPartIndex(partIndex, "getPartMultiplyColor")) {
          return new CubismTextureColor(1, 1, 1, 1);
        }
        return this._userPartMultiplyColors[partIndex].color;
      }
      /**
       * Sets the screen color of the part.
       *
       * @param partIndex Part index
       * @param color Screen color to be set (CubismTextureColor)
       */
      setPartScreenColorByTextureColor(partIndex, color) {
        if (!this.isValidPartIndex(partIndex, "setPartScreenColorByTextureColor")) {
          return;
        }
        this.setPartScreenColorByRGBA(
          partIndex,
          color.r,
          color.g,
          color.b,
          color.a
        );
      }
      /**
       * Sets the screen color of the part.
       *
       * @param partIndex Part index
       * @param r Red value of the screen color to be set
       * @param g Green value of the screen color to be set
       * @param b Blue value of the screen color to be set
       * @param a Alpha value of the screen color to be set
       */
      setPartScreenColorByRGBA(partIndex, r, g, b, a = 1) {
        if (!this.isValidPartIndex(partIndex, "setPartScreenColorByRGBA")) {
          return;
        }
        this.setPartColor(
          partIndex,
          r,
          g,
          b,
          a,
          this._userPartScreenColors,
          this._userDrawableScreenColors,
          this._userOffscreenScreenColors
        );
      }
      /**
       * Returns the screen color of the part.
       *
       * @param partIndex Part index
       *
       * @return Screen color (CubismTextureColor)
       */
      getPartScreenColor(partIndex) {
        if (!this.isValidPartIndex(partIndex, "getPartScreenColor")) {
          return new CubismTextureColor(0, 0, 0, 1);
        }
        return this._userPartScreenColors[partIndex].color;
      }
      /**
       * Sets the flag indicating whether the color set at runtime is used as the multiply color for the drawable during rendering.
       *
       * @param drawableIndex Drawable index
       * @param value true if the color set at runtime is to be used; otherwise false.
       */
      setDrawableMultiplyColorEnabled(drawableIndex, value) {
        if (!this.isValidDrawableIndex(
          drawableIndex,
          "setDrawableMultiplyColorEnabled"
        )) {
          return;
        }
        this._userDrawableMultiplyColors[drawableIndex].isOverridden = value;
      }
      /**
       * Returns the flag indicating whether the color set at runtime is used as the multiply color for the drawable during rendering.
       *
       * @param drawableIndex Drawable index
       *
       * @return true if the color set at runtime is used; otherwise false.
       */
      getDrawableMultiplyColorEnabled(drawableIndex) {
        if (!this.isValidDrawableIndex(
          drawableIndex,
          "getDrawableMultiplyColorEnabled"
        )) {
          return false;
        }
        return this._userDrawableMultiplyColors[drawableIndex].isOverridden;
      }
      /**
       * Sets the flag indicating whether the color set at runtime is used as the screen color for the drawable during rendering.
       *
       * @param drawableIndex Drawable index
       * @param value true if the color set at runtime is to be used; otherwise false.
       */
      setDrawableScreenColorEnabled(drawableIndex, value) {
        if (!this.isValidDrawableIndex(drawableIndex, "setDrawableScreenColorEnabled")) {
          return;
        }
        this._userDrawableScreenColors[drawableIndex].isOverridden = value;
      }
      /**
       * Returns the flag indicating whether the color set at runtime is used as the screen color for the drawable during rendering.
       *
       * @param drawableIndex Drawable index
       *
       * @return true if the color set at runtime is used; otherwise false.
       */
      getDrawableScreenColorEnabled(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, "getDrawableScreenColorEnabled")) {
          return false;
        }
        return this._userDrawableScreenColors[drawableIndex].isOverridden;
      }
      /**
       * Sets the multiply color of the drawable.
       *
       * @param drawableIndex Drawable index
       * @param color Multiply color to be set (CubismTextureColor)
       */
      setDrawableMultiplyColorByTextureColor(drawableIndex, color) {
        if (!this.isValidDrawableIndex(
          drawableIndex,
          "setDrawableMultiplyColorByTextureColor"
        )) {
          return;
        }
        this.setDrawableMultiplyColorByRGBA(
          drawableIndex,
          color.r,
          color.g,
          color.b,
          color.a
        );
      }
      /**
       * Sets the multiply color of the drawable.
       *
       * @param drawableIndex Drawable index
       * @param r Red value of the multiply color to be set
       * @param g Green value of the multiply color to be set
       * @param b Blue value of the multiply color to be set
       * @param a Alpha value of the multiply color to be set
       */
      setDrawableMultiplyColorByRGBA(drawableIndex, r, g, b, a = 1) {
        if (!this.isValidDrawableIndex(
          drawableIndex,
          "setDrawableMultiplyColorByRGBA"
        )) {
          return;
        }
        this._userDrawableMultiplyColors[drawableIndex].color.r = r;
        this._userDrawableMultiplyColors[drawableIndex].color.g = g;
        this._userDrawableMultiplyColors[drawableIndex].color.b = b;
        this._userDrawableMultiplyColors[drawableIndex].color.a = a;
      }
      /**
       * Returns the multiply color from the list of drawables.
       *
       * @param drawableIndex Drawable index
       *
       * @return Multiply color (CubismTextureColor)
       */
      getDrawableMultiplyColor(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, "getDrawableMultiplyColor")) {
          return new CubismTextureColor(1, 1, 1, 1);
        }
        if (this.getMultiplyColorEnabled() || this.getDrawableMultiplyColorEnabled(drawableIndex)) {
          return this._userDrawableMultiplyColors[drawableIndex].color;
        }
        return this._model.getDrawableMultiplyColor(drawableIndex);
      }
      /**
       * Sets the screen color of the drawable.
       *
       * @param drawableIndex Drawable index
       * @param color Screen color to be set (CubismTextureColor)
       */
      setDrawableScreenColorByTextureColor(drawableIndex, color) {
        if (!this.isValidDrawableIndex(
          drawableIndex,
          "setDrawableScreenColorByTextureColor"
        )) {
          return;
        }
        this.setDrawableScreenColorByRGBA(
          drawableIndex,
          color.r,
          color.g,
          color.b,
          color.a
        );
      }
      /**
       * Sets the screen color of the drawable.
       *
       * @param drawableIndex Drawable index
       * @param r Red value of the screen color to be set
       * @param g Green value of the screen color to be set
       * @param b Blue value of the screen color to be set
       * @param a Alpha value of the screen color to be set
       */
      setDrawableScreenColorByRGBA(drawableIndex, r, g, b, a = 1) {
        if (!this.isValidDrawableIndex(drawableIndex, "setDrawableScreenColorByRGBA")) {
          return;
        }
        this._userDrawableScreenColors[drawableIndex].color.r = r;
        this._userDrawableScreenColors[drawableIndex].color.g = g;
        this._userDrawableScreenColors[drawableIndex].color.b = b;
        this._userDrawableScreenColors[drawableIndex].color.a = a;
      }
      /**
       * Returns the screen color from the list of drawables.
       *
       * @param drawableIndex Drawable index
       *
       * @return Screen color (CubismTextureColor)
       */
      getDrawableScreenColor(drawableIndex) {
        if (!this.isValidDrawableIndex(drawableIndex, "getDrawableScreenColor")) {
          return new CubismTextureColor(0, 0, 0, 1);
        }
        if (this.getScreenColorEnabled() || this.getDrawableScreenColorEnabled(drawableIndex)) {
          return this._userDrawableScreenColors[drawableIndex].color;
        }
        return this._model.getDrawableScreenColor(drawableIndex);
      }
      /**
       * Sets whether the offscreen multiply color is overridden by the SDK.
       * Use true to use the color information from the SDK, or false to use the color information from the model.
       *
       * @param offscreenIndex Offscreen index
       * @param value true enable override, false to disable
       */
      setOffscreenMultiplyColorEnabled(offscreenIndex, value) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "setOffscreenMultiplyColorEnabled"
        )) {
          return;
        }
        this._userOffscreenMultiplyColors[offscreenIndex].isOverridden = value;
      }
      /**
       * Checks whether the offscreen multiply color is overridden by the SDK.
       *
       * @param offscreenIndex Offscreen index
       *
       * @return true if the color information from the SDK is used; otherwise false.
       */
      getOffscreenMultiplyColorEnabled(offscreenIndex) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "getOffscreenMultiplyColorEnabled"
        )) {
          return false;
        }
        return this._userOffscreenMultiplyColors[offscreenIndex].isOverridden;
      }
      /**
       * Sets whether the offscreen screen color is overridden by the SDK.
       * Use true to use the color information from the SDK, or false to use the color information from the model.
       *
       * @param offscreenIndex Offscreen index
       * @param value true enable override, false to disable
       */
      setOffscreenScreenColorEnabled(offscreenIndex, value) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "setOffscreenScreenColorEnabled"
        )) {
          return;
        }
        this._userOffscreenScreenColors[offscreenIndex].isOverridden = value;
      }
      /**
       * Checks whether the offscreen screen color is overridden by the SDK.
       *
       * @param offscreenIndex Offscreen index
       *
       * @return true if the color information from the SDK is used; otherwise false.
       */
      getOffscreenScreenColorEnabled(offscreenIndex) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "getOffscreenScreenColorEnabled"
        )) {
          return false;
        }
        return this._userOffscreenScreenColors[offscreenIndex].isOverridden;
      }
      /**
       * Sets the multiply color of the offscreen.
       *
       * @param offscreenIndex Offsscreen index
       * @param color Multiply color to be set (CubismTextureColor)
       */
      setOffscreenMultiplyColorByTextureColor(offscreenIndex, color) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "setOffscreenMultiplyColorByTextureColor"
        )) {
          return;
        }
        this.setOffscreenMultiplyColorByRGBA(
          offscreenIndex,
          color.r,
          color.g,
          color.b,
          color.a
        );
      }
      /**
       * Sets the multiply color of the offscreen.
       *
       * @param offscreenIndex Offsscreen index
       * @param r Red value of the multiply color to be set
       * @param g Green value of the multiply color to be set
       * @param b Blue value of the multiply color to be set
       * @param a Alpha value of the multiply color to be set
       */
      setOffscreenMultiplyColorByRGBA(offscreenIndex, r, g, b, a = 1) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "setOffscreenMultiplyColorByRGBA"
        )) {
          return;
        }
        this._userOffscreenMultiplyColors[offscreenIndex].color.r = r;
        this._userOffscreenMultiplyColors[offscreenIndex].color.g = g;
        this._userOffscreenMultiplyColors[offscreenIndex].color.b = b;
        this._userOffscreenMultiplyColors[offscreenIndex].color.a = a;
      }
      /**
       * Returns the multiply color from the list of offscreen.
       *
       * @param offscreenIndex Offsscreen index
       *
       * @return Multiply color (CubismTextureColor)
       */
      getOffscreenMultiplyColor(offscreenIndex) {
        if (!this.isValidOffscreenIndex(offscreenIndex, "getOffscreenMultiplyColor")) {
          return new CubismTextureColor(1, 1, 1, 1);
        }
        if (this.getMultiplyColorEnabled() || this.getOffscreenMultiplyColorEnabled(offscreenIndex)) {
          return this._userOffscreenMultiplyColors[offscreenIndex].color;
        }
        return this._model.getOffscreenMultiplyColor(offscreenIndex);
      }
      /**
       * Sets the screen color of the offscreen.
       *
       * @param offscreenIndex Offsscreen index
       * @param color Screen color to be set (CubismTextureColor)
       */
      setOffscreenScreenColorByTextureColor(offscreenIndex, color) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "setOffscreenScreenColorByTextureColor"
        )) {
          return;
        }
        this.setOffscreenScreenColorByRGBA(
          offscreenIndex,
          color.r,
          color.g,
          color.b,
          color.a
        );
      }
      /**
       * Sets the screen color of the offscreen.
       *
       * @param offscreenIndex Offsscreen index
       * @param r Red value of the screen color to be set
       * @param g Green value of the screen color to be set
       * @param b Blue value of the screen color to be set
       * @param a Alpha value of the screen color to be set
       */
      setOffscreenScreenColorByRGBA(offscreenIndex, r, g, b, a = 1) {
        if (!this.isValidOffscreenIndex(
          offscreenIndex,
          "setOffscreenScreenColorByRGBA"
        )) {
          return;
        }
        this._userOffscreenScreenColors[offscreenIndex].color.r = r;
        this._userOffscreenScreenColors[offscreenIndex].color.g = g;
        this._userOffscreenScreenColors[offscreenIndex].color.b = b;
        this._userOffscreenScreenColors[offscreenIndex].color.a = a;
      }
      /**
       * Returns the screen color from the list of offscreen.
       *
       * @param offscreenIndex Offsscreen index
       *
       * @return Screen color (CubismTextureColor)
       */
      getOffscreenScreenColor(offscreenIndex) {
        if (!this.isValidOffscreenIndex(offscreenIndex, "getOffscreenScreenColor")) {
          return new CubismTextureColor(0, 0, 0, 1);
        }
        if (this.getScreenColorEnabled() || this.getOffscreenScreenColorEnabled(offscreenIndex)) {
          return this._userOffscreenScreenColors[offscreenIndex].color;
        }
        return this._model.getOffscreenScreenColor(offscreenIndex);
      }
      /**
       * Sets the part color with hierarchical propagation (internal method)
       */
      setPartColor(partIndex, r, g, b, a, partColors, drawableColors, offscreenColors) {
        partColors[partIndex].color.r = r;
        partColors[partIndex].color.g = g;
        partColors[partIndex].color.b = b;
        partColors[partIndex].color.a = a;
        if (partColors[partIndex].isOverridden) {
          const offscreenIndices = this._model.getPartOffscreenIndices();
          const offscreenIndex = offscreenIndices[partIndex];
          if (offscreenIndex == NoOffscreenIndex) {
            const partsHierarchy = this._model.getPartsHierarchy();
            if (partsHierarchy && partsHierarchy[partIndex]) {
              for (let i = 0; i < partsHierarchy[partIndex].objects.length; ++i) {
                const objectInfo = partsHierarchy[partIndex].objects[i];
                if (objectInfo.objectType === 0 /* CubismModelObjectType_Drawable */) {
                  const drawableIndex = objectInfo.objectIndex;
                  drawableColors[drawableIndex].color.r = r;
                  drawableColors[drawableIndex].color.g = g;
                  drawableColors[drawableIndex].color.b = b;
                  drawableColors[drawableIndex].color.a = a;
                } else {
                  const childPartIndex = objectInfo.objectIndex;
                  this.setPartColor(
                    childPartIndex,
                    r,
                    g,
                    b,
                    a,
                    partColors,
                    drawableColors,
                    offscreenColors
                  );
                }
              }
            }
          } else {
            offscreenColors[offscreenIndex].color.r = r;
            offscreenColors[offscreenIndex].color.g = g;
            offscreenColors[offscreenIndex].color.b = b;
            offscreenColors[offscreenIndex].color.a = a;
          }
        }
      }
      /**
       * Sets the part color enabled flag with hierarchical propagation (internal method)
       */
      setPartColorEnabled(partIndex, value, partColors, drawableColors, offscreenColors) {
        partColors[partIndex].isOverridden = value;
        const offscreenIndices = this._model.getPartOffscreenIndices();
        const offscreenIndex = offscreenIndices[partIndex];
        if (offscreenIndex == NoOffscreenIndex) {
          const partsHierarchy = this._model.getPartsHierarchy();
          if (partsHierarchy && partsHierarchy[partIndex]) {
            for (let i = 0; i < partsHierarchy[partIndex].objects.length; ++i) {
              const objectInfo = partsHierarchy[partIndex].objects[i];
              if (objectInfo.objectType === 0 /* CubismModelObjectType_Drawable */) {
                const drawableIndex = objectInfo.objectIndex;
                drawableColors[drawableIndex].isOverridden = value;
                if (value) {
                  drawableColors[drawableIndex].color.r = partColors[partIndex].color.r;
                  drawableColors[drawableIndex].color.g = partColors[partIndex].color.g;
                  drawableColors[drawableIndex].color.b = partColors[partIndex].color.b;
                  drawableColors[drawableIndex].color.a = partColors[partIndex].color.a;
                }
              } else {
                const childPartIndex = objectInfo.objectIndex;
                if (value) {
                  partColors[childPartIndex].color.r = partColors[partIndex].color.r;
                  partColors[childPartIndex].color.g = partColors[partIndex].color.g;
                  partColors[childPartIndex].color.b = partColors[partIndex].color.b;
                  partColors[childPartIndex].color.a = partColors[partIndex].color.a;
                }
                this.setPartColorEnabled(
                  childPartIndex,
                  value,
                  partColors,
                  drawableColors,
                  offscreenColors
                );
              }
            }
          }
        } else {
          offscreenColors[offscreenIndex].isOverridden = value;
          if (value) {
            offscreenColors[offscreenIndex].color.r = partColors[partIndex].color.r;
            offscreenColors[offscreenIndex].color.g = partColors[partIndex].color.g;
            offscreenColors[offscreenIndex].color.b = partColors[partIndex].color.b;
            offscreenColors[offscreenIndex].color.a = partColors[partIndex].color.a;
          }
        }
      }
    };
  }
});

// vendor/live2d/sdk/Framework/src/model/cubismmodel.ts
var NoParentIndex, NoOffscreenIndex, CubismColorBlend, CubismAlphaBlend, ParameterRepeatData, CullingData, PartChildDrawObjects, CubismModelObjectInfo, CubismModelPartInfo, CubismModel, Live2DCubismFramework33;
var init_cubismmodel = __esm({
  "vendor/live2d/sdk/Framework/src/model/cubismmodel.ts"() {
    init_live2dcubismframework();
    init_cubismmath();
    init_cubismrenderer();
    init_cubismdebug();
    init_cubismmodelmultiplyandscreencolor();
    init_cubismmodel();
    NoParentIndex = -1;
    NoOffscreenIndex = -1;
    CubismColorBlend = ((CubismColorBlend2) => {
      CubismColorBlend2[CubismColorBlend2["ColorBlend_None"] = -1] = "ColorBlend_None";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Normal"] = Live2DCubismCore.ColorBlendType_Normal] = "ColorBlend_Normal";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_AddGlow"] = Live2DCubismCore.ColorBlendType_AddGlow] = "ColorBlend_AddGlow";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Add"] = Live2DCubismCore.ColorBlendType_Add] = "ColorBlend_Add";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Darken"] = Live2DCubismCore.ColorBlendType_Darken] = "ColorBlend_Darken";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Multiply"] = Live2DCubismCore.ColorBlendType_Multiply] = "ColorBlend_Multiply";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_ColorBurn"] = Live2DCubismCore.ColorBlendType_ColorBurn] = "ColorBlend_ColorBurn";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_LinearBurn"] = Live2DCubismCore.ColorBlendType_LinearBurn] = "ColorBlend_LinearBurn";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Lighten"] = Live2DCubismCore.ColorBlendType_Lighten] = "ColorBlend_Lighten";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Screen"] = Live2DCubismCore.ColorBlendType_Screen] = "ColorBlend_Screen";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_ColorDodge"] = Live2DCubismCore.ColorBlendType_ColorDodge] = "ColorBlend_ColorDodge";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Overlay"] = Live2DCubismCore.ColorBlendType_Overlay] = "ColorBlend_Overlay";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_SoftLight"] = Live2DCubismCore.ColorBlendType_SoftLight] = "ColorBlend_SoftLight";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_HardLight"] = Live2DCubismCore.ColorBlendType_HardLight] = "ColorBlend_HardLight";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_LinearLight"] = Live2DCubismCore.ColorBlendType_LinearLight] = "ColorBlend_LinearLight";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Hue"] = Live2DCubismCore.ColorBlendType_Hue] = "ColorBlend_Hue";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_Color"] = Live2DCubismCore.ColorBlendType_Color] = "ColorBlend_Color";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_AddCompatible"] = Live2DCubismCore.ColorBlendType_AddCompatible] = "ColorBlend_AddCompatible";
      CubismColorBlend2[CubismColorBlend2["ColorBlend_MultiplyCompatible"] = Live2DCubismCore.ColorBlendType_MultiplyCompatible] = "ColorBlend_MultiplyCompatible";
      return CubismColorBlend2;
    })(CubismColorBlend || {});
    CubismAlphaBlend = /* @__PURE__ */ ((CubismAlphaBlend2) => {
      CubismAlphaBlend2[CubismAlphaBlend2["AlphaBlend_None"] = -1] = "AlphaBlend_None";
      CubismAlphaBlend2[CubismAlphaBlend2["AlphaBlend_Over"] = 0] = "AlphaBlend_Over";
      CubismAlphaBlend2[CubismAlphaBlend2["AlphaBlend_Atop"] = 1] = "AlphaBlend_Atop";
      CubismAlphaBlend2[CubismAlphaBlend2["AlphaBlend_Out"] = 2] = "AlphaBlend_Out";
      CubismAlphaBlend2[CubismAlphaBlend2["AlphaBlend_ConjointOver"] = 3] = "AlphaBlend_ConjointOver";
      CubismAlphaBlend2[CubismAlphaBlend2["AlphaBlend_DisjointOver"] = 4] = "AlphaBlend_DisjointOver";
      return CubismAlphaBlend2;
    })(CubismAlphaBlend || {});
    ParameterRepeatData = class {
      /**
       * Constructor
       *
       * @param isOverridden whether to be overriden
       * @param isParameterRepeated override flag for settings
       */
      constructor(isOverridden = false, isParameterRepeated = false) {
        this.isOverridden = isOverridden;
        this.isParameterRepeated = isParameterRepeated;
      }
      /**
       * Whether to be overridden
       */
      isOverridden;
      /**
       * Override flag for settings
       */
      isParameterRepeated;
    };
    CullingData = class {
      /**
       * コンストラクタ
       *
       * @param isOverridden
       * @param isCulling
       */
      constructor(isOverridden = false, isCulling = false) {
        this.isOverridden = isOverridden;
        this.isCulling = isCulling;
      }
      isOverridden;
      isCulling;
    };
    PartChildDrawObjects = class {
      drawableIndices;
      offscreenIndices;
      constructor(drawableIndices = new Array(), offscreenIndices = new Array()) {
        this.drawableIndices = drawableIndices;
        this.offscreenIndices = offscreenIndices;
      }
    };
    CubismModelObjectInfo = class {
      objectType;
      // オブジェクトのタイプ (Drawable / Parts)
      objectIndex;
      // オブジェクトインデックス
      constructor(objectIndex, objectType) {
        this.objectIndex = objectIndex;
        this.objectType = objectType;
      }
    };
    CubismModelPartInfo = class {
      objects;
      childDrawObjects;
      constructor(objects = new Array(), childDrawObjects = new PartChildDrawObjects()) {
        this.objects = objects;
        this.childDrawObjects = childDrawObjects;
      }
      // 子オブジェクト数を返す関数
      getChildObjectCount() {
        return this.objects.length;
      }
    };
    CubismModel = class {
      /**
       * モデルのパラメータの更新
       */
      update() {
        this._model.update();
        this._model.drawables.resetDynamicFlags();
      }
      /**
       * PixelsPerUnitを取得する
       * @return PixelsPerUnit
       */
      getPixelsPerUnit() {
        if (this._model == null) {
          return 0;
        }
        return this._model.canvasinfo.PixelsPerUnit;
      }
      /**
       * キャンバスの幅を取得する
       */
      getCanvasWidth() {
        if (this._model == null) {
          return 0;
        }
        return this._model.canvasinfo.CanvasWidth / this._model.canvasinfo.PixelsPerUnit;
      }
      /**
       * キャンバスの高さを取得する
       */
      getCanvasHeight() {
        if (this._model == null) {
          return 0;
        }
        return this._model.canvasinfo.CanvasHeight / this._model.canvasinfo.PixelsPerUnit;
      }
      /**
       * パラメータを保存する
       */
      saveParameters() {
        const parameterCount = this._model.parameters.count;
        const savedParameterCount = this._savedParameters.length;
        for (let i = 0; i < parameterCount; ++i) {
          if (i < savedParameterCount) {
            this._savedParameters[i] = this._parameterValues[i];
          } else {
            this._savedParameters.push(this._parameterValues[i]);
          }
        }
      }
      /**
       * 乗算色・スクリーン色管理クラスを取得する
       *
       * @return CubismModelMultiplyAndScreenColorのインスタンス
       */
      getOverrideMultiplyAndScreenColor() {
        return this._overrideMultiplyAndScreenColor;
      }
      /**
       * Checks whether parameter repetition is performed for the entire model.
       *
       * @return true if parameter repetition is performed for the entire model; otherwise returns false.
       */
      getOverrideFlagForModelParameterRepeat() {
        return this._isOverriddenParameterRepeat;
      }
      /**
       * Sets whether parameter repetition is performed for the entire model.
       * Use true to perform parameter repetition for the entire model, or false to not perform it.
       */
      setOverrideFlagForModelParameterRepeat(isRepeat) {
        this._isOverriddenParameterRepeat = isRepeat;
      }
      /**
       * Returns the flag indicating whether to override the parameter repeat.
       *
       * @param parameterIndex Parameter index
       *
       * @return true if the parameter repeat is overridden, false otherwise.
       */
      getOverrideFlagForParameterRepeat(parameterIndex) {
        return this._userParameterRepeatDataList[parameterIndex].isOverridden;
      }
      /**
       * Sets the flag indicating whether to override the parameter repeat.
       *
       * @param parameterIndex Parameter index
       * @param value true if it is to be overridden; otherwise, false.
       */
      setOverrideFlagForParameterRepeat(parameterIndex, value) {
        this._userParameterRepeatDataList[parameterIndex].isOverridden = value;
      }
      /**
       * Returns the repeat flag.
       *
       * @param parameterIndex Parameter index
       *
       * @return true if repeating, false otherwise.
       */
      getRepeatFlagForParameterRepeat(parameterIndex) {
        return this._userParameterRepeatDataList[parameterIndex].isParameterRepeated;
      }
      /**
       * Sets the repeat flag.
       *
       * @param parameterIndex Parameter index
       * @param value true to enable repeating, false otherwise.
       */
      setRepeatFlagForParameterRepeat(parameterIndex, value) {
        this._userParameterRepeatDataList[parameterIndex].isParameterRepeated = value;
      }
      /**
       * Drawableのカリング情報を取得する。
       *
       * @param   drawableIndex   Drawableのインデックス
       *
       * @return  Drawableのカリング情報
       */
      getDrawableCulling(drawableIndex) {
        if (this.getOverrideFlagForModelCullings() || this.getOverrideFlagForDrawableCullings(drawableIndex)) {
          return this._userDrawableCullings[drawableIndex].isCulling;
        }
        const constantFlags = this._model.drawables.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(
          constantFlags[drawableIndex]
        );
      }
      /**
       * Drawableのカリング情報を設定する。
       *
       * @param drawableIndex Drawableのインデックス
       * @param isCulling カリング情報
       */
      setDrawableCulling(drawableIndex, isCulling) {
        this._userDrawableCullings[drawableIndex].isCulling = isCulling;
      }
      /**
       * Offscreenのカリング情報を取得する。
       *
       * @param   offscreenIndex   Offscreenのインデックス
       *
       * @return  Offscreenのカリング情報
       */
      getOffscreenCulling(offscreenIndex) {
        if (this.getOverrideFlagForModelCullings() || this.getOverrideFlagForOffscreenCullings(offscreenIndex)) {
          return this._userOffscreenCullings[offscreenIndex].isCulling;
        }
        const constantFlags = this._model.offscreens.constantFlags;
        return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(
          constantFlags[offscreenIndex]
        );
      }
      /**
       * Offscreenのカリング設定を設定する。
       *
       * @param offscreenIndex Offscreenのインデックス
       * @param isCulling カリング情報
       */
      setOffscreenCulling(offscreenIndex, isCulling) {
        this._userOffscreenCullings[offscreenIndex].isCulling = isCulling;
      }
      /**
       * SDKからモデル全体のカリング設定を上書きするか。
       *
       * @return  true    ->  SDK上のカリング設定を使用
       *          false   ->  モデルのカリング設定を使用
       */
      getOverrideFlagForModelCullings() {
        return this._isOverriddenCullings;
      }
      /**
       * SDKからモデル全体のカリング設定を上書きするかを設定する。
       *
       * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
       */
      setOverrideFlagForModelCullings(isOverriddenCullings) {
        this._isOverriddenCullings = isOverriddenCullings;
      }
      /**
       *
       * @param drawableIndex Drawableのインデックス
       * @return  true    ->  SDK上のカリング設定を使用
       *          false   ->  モデルのカリング設定を使用
       */
      getOverrideFlagForDrawableCullings(drawableIndex) {
        return this._userDrawableCullings[drawableIndex].isOverridden;
      }
      /**
       * @param offscreenIndex Offscreenのインデックス
       * @return  true    ->  SDK上のカリング設定を使用
       *          false   ->  モデルのカリング設定を使用
       */
      getOverrideFlagForOffscreenCullings(offscreenIndex) {
        return this._userOffscreenCullings[offscreenIndex].isOverridden;
      }
      /**
       *
       * @param drawableIndex Drawableのインデックス
       * @param isOverriddenCullings SDK上のカリング設定を使うならtrue、モデルのカリング設定を使うならfalse
       */
      setOverrideFlagForDrawableCullings(drawableIndex, isOverriddenCullings) {
        this._userDrawableCullings[drawableIndex].isOverridden = isOverriddenCullings;
      }
      /**
       * モデルの不透明度を取得する
       *
       * @return 不透明度の値
       */
      getModelOapcity() {
        return this._modelOpacity;
      }
      /**
       * モデルの不透明度を設定する
       *
       * @param value 不透明度の値
       */
      setModelOapcity(value) {
        this._modelOpacity = value;
      }
      /**
       * モデルを取得
       */
      getModel() {
        return this._model;
      }
      /**
       * パーツのインデックスを取得
       * @param partId パーツのID
       * @return パーツのインデックス
       */
      getPartIndex(partId) {
        let partIndex;
        const partCount = this._model.parts.count;
        for (partIndex = 0; partIndex < partCount; ++partIndex) {
          if (partId == this._partIds[partIndex]) {
            return partIndex;
          }
        }
        if (this._notExistPartId.has(partId)) {
          return this._notExistPartId.get(partId);
        }
        partIndex = partCount + this._notExistPartId.size;
        this._notExistPartId.set(partId, partIndex);
        this._notExistPartOpacities.set(partIndex, null);
        return partIndex;
      }
      /**
       * パーツのIDを取得する。
       *
       * @param partIndex 取得するパーツのインデックス
       * @return パーツのID
       */
      getPartId(partIndex) {
        const partId = this._model.parts.ids[partIndex];
        return CubismFramework.getIdManager().getId(partId);
      }
      /**
       * パーツの個数の取得
       * @return パーツの個数
       */
      getPartCount() {
        const partCount = this._model.parts.count;
        return partCount;
      }
      /**
       * パーツのオフスクリーンインデックスの取得
       * @param partIndex パーツのインデックス
       * @return オフスクリーンインデックスのリスト
       */
      getPartOffscreenIndices() {
        const offscreenIndices = this._model.parts.offscreenIndices;
        return offscreenIndices;
      }
      /**
       * パーツの親パーツインデックスのリストを取得
       *
       * @return パーツの親パーツインデックスのリスト
       */
      getPartParentPartIndices() {
        const parentIndices = this._model.parts.parentIndices;
        return parentIndices;
      }
      /**
       * パーツの不透明度の設定(Index)
       * @param partIndex パーツのインデックス
       * @param opacity 不透明度
       */
      setPartOpacityByIndex(partIndex, opacity) {
        if (this._notExistPartOpacities.has(partIndex)) {
          this._notExistPartOpacities.set(partIndex, opacity);
          return;
        }
        CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
        this._partOpacities[partIndex] = opacity;
      }
      /**
       * パーツの不透明度の設定(Id)
       * @param partId パーツのID
       * @param opacity パーツの不透明度
       */
      setPartOpacityById(partId, opacity) {
        const index = this.getPartIndex(partId);
        if (index < 0) {
          return;
        }
        this.setPartOpacityByIndex(index, opacity);
      }
      /**
       * パーツの不透明度の取得(index)
       * @param partIndex パーツのインデックス
       * @return パーツの不透明度
       */
      getPartOpacityByIndex(partIndex) {
        if (this._notExistPartOpacities.has(partIndex)) {
          return this._notExistPartOpacities.get(partIndex);
        }
        CSM_ASSERT(0 <= partIndex && partIndex < this.getPartCount());
        return this._partOpacities[partIndex];
      }
      /**
       * パーツの不透明度の取得(id)
       * @param partId パーツのＩｄ
       * @return パーツの不透明度
       */
      getPartOpacityById(partId) {
        const index = this.getPartIndex(partId);
        if (index < 0) {
          return 0;
        }
        return this.getPartOpacityByIndex(index);
      }
      /**
       * パラメータのインデックスの取得
       * @param パラメータID
       * @return パラメータのインデックス
       */
      getParameterIndex(parameterId) {
        let parameterIndex;
        const idCount = this._model.parameters.count;
        for (parameterIndex = 0; parameterIndex < idCount; ++parameterIndex) {
          if (parameterId != this._parameterIds[parameterIndex]) {
            continue;
          }
          return parameterIndex;
        }
        if (this._notExistParameterId.has(parameterId)) {
          return this._notExistParameterId.get(parameterId);
        }
        parameterIndex = this._model.parameters.count + this._notExistParameterId.size;
        this._notExistParameterId.set(parameterId, parameterIndex);
        this._notExistParameterValues.set(parameterIndex, null);
        return parameterIndex;
      }
      /**
       * パラメータの個数の取得
       * @return パラメータの個数
       */
      getParameterCount() {
        return this._model.parameters.count;
      }
      /**
       * パラメータの種類の取得
       * @param parameterIndex パラメータのインデックス
       * @return csmParameterType_Normal -> 通常のパラメータ
       *          csmParameterType_BlendShape -> ブレンドシェイプパラメータ
       */
      getParameterType(parameterIndex) {
        return this._model.parameters.types[parameterIndex];
      }
      /**
       * パラメータの最大値の取得
       * @param parameterIndex パラメータのインデックス
       * @return パラメータの最大値
       */
      getParameterMaximumValue(parameterIndex) {
        return this._model.parameters.maximumValues[parameterIndex];
      }
      /**
       * パラメータの最小値の取得
       * @param parameterIndex パラメータのインデックス
       * @return パラメータの最小値
       */
      getParameterMinimumValue(parameterIndex) {
        return this._model.parameters.minimumValues[parameterIndex];
      }
      /**
       * パラメータのデフォルト値の取得
       * @param parameterIndex パラメータのインデックス
       * @return パラメータのデフォルト値
       */
      getParameterDefaultValue(parameterIndex) {
        return this._model.parameters.defaultValues[parameterIndex];
      }
      /**
       * 指定したパラメータindexのIDを取得
       *
       * @param parameterIndex パラメータのインデックス
       * @return パラメータID
       */
      getParameterId(parameterIndex) {
        return CubismFramework.getIdManager().getId(
          this._model.parameters.ids[parameterIndex]
        );
      }
      /**
       * パラメータの値の取得
       * @param parameterIndex    パラメータのインデックス
       * @return パラメータの値
       */
      getParameterValueByIndex(parameterIndex) {
        if (this._notExistParameterValues.has(parameterIndex)) {
          return this._notExistParameterValues.get(parameterIndex);
        }
        CSM_ASSERT(
          0 <= parameterIndex && parameterIndex < this.getParameterCount()
        );
        return this._parameterValues[parameterIndex];
      }
      /**
       * パラメータの値の取得
       * @param parameterId    パラメータのID
       * @return パラメータの値
       */
      getParameterValueById(parameterId) {
        const parameterIndex = this.getParameterIndex(parameterId);
        return this.getParameterValueByIndex(parameterIndex);
      }
      /**
       * パラメータの値の設定
       * @param parameterIndex パラメータのインデックス
       * @param value パラメータの値
       * @param weight 重み
       */
      setParameterValueByIndex(parameterIndex, value, weight = 1) {
        if (this._notExistParameterValues.has(parameterIndex)) {
          this._notExistParameterValues.set(
            parameterIndex,
            weight == 1 ? value : this._notExistParameterValues.get(parameterIndex) * (1 - weight) + value * weight
          );
          return;
        }
        CSM_ASSERT(
          0 <= parameterIndex && parameterIndex < this.getParameterCount()
        );
        if (this.isRepeat(parameterIndex)) {
          value = this.getParameterRepeatValue(parameterIndex, value);
        } else {
          value = this.getParameterClampValue(parameterIndex, value);
        }
        this._parameterValues[parameterIndex] = weight == 1 ? value : this._parameterValues[parameterIndex] = this._parameterValues[parameterIndex] * (1 - weight) + value * weight;
      }
      /**
       * パラメータの値の設定
       * @param parameterId パラメータのID
       * @param value パラメータの値
       * @param weight 重み
       */
      setParameterValueById(parameterId, value, weight = 1) {
        const index = this.getParameterIndex(parameterId);
        this.setParameterValueByIndex(index, value, weight);
      }
      /**
       * パラメータの値の加算(index)
       * @param parameterIndex パラメータインデックス
       * @param value 加算する値
       * @param weight 重み
       */
      addParameterValueByIndex(parameterIndex, value, weight = 1) {
        this.setParameterValueByIndex(
          parameterIndex,
          this.getParameterValueByIndex(parameterIndex) + value * weight
        );
      }
      /**
       * パラメータの値の加算(id)
       * @param parameterId パラメータＩＤ
       * @param value 加算する値
       * @param weight 重み
       */
      addParameterValueById(parameterId, value, weight = 1) {
        const index = this.getParameterIndex(parameterId);
        this.addParameterValueByIndex(index, value, weight);
      }
      /**
       * Gets whether the parameter has the repeat setting.
       *
       * @param parameterIndex Parameter index
       *
       * @return true if it is set, otherwise returns false.
       */
      isRepeat(parameterIndex) {
        if (this._notExistParameterValues.has(parameterIndex)) {
          return false;
        }
        CSM_ASSERT(
          0 <= parameterIndex && parameterIndex < this.getParameterCount()
        );
        let isRepeat;
        if (this._isOverriddenParameterRepeat || this._userParameterRepeatDataList[parameterIndex].isOverridden) {
          isRepeat = this._userParameterRepeatDataList[parameterIndex].isParameterRepeated;
        } else {
          isRepeat = this._model.parameters.repeats[parameterIndex] != 0;
        }
        return isRepeat;
      }
      /**
       * Returns the calculated result ensuring the value falls within the parameter's range.
       *
       * @param parameterIndex Parameter index
       * @param value Parameter value
       *
       * @return a value that falls within the parameter’s range. If the parameter does not exist, returns it as is.
       */
      getParameterRepeatValue(parameterIndex, value) {
        if (this._notExistParameterValues.has(parameterIndex)) {
          return value;
        }
        CSM_ASSERT(
          0 <= parameterIndex && parameterIndex < this.getParameterCount()
        );
        const maxValue = this._model.parameters.maximumValues[parameterIndex];
        const minValue = this._model.parameters.minimumValues[parameterIndex];
        const valueSize = maxValue - minValue;
        if (maxValue < value) {
          const overValue = CubismMath.mod(value - maxValue, valueSize);
          if (!Number.isNaN(overValue)) {
            value = minValue + overValue;
          } else {
            value = maxValue;
          }
        }
        if (value < minValue) {
          const overValue = CubismMath.mod(minValue - value, valueSize);
          if (!Number.isNaN(overValue)) {
            value = maxValue - overValue;
          } else {
            value = minValue;
          }
        }
        return value;
      }
      /**
       * Returns the result of clamping the value to ensure it falls within the parameter's range.
       *
       * @param parameterIndex Parameter index
       * @param value Parameter value
       *
       * @return the clamped value. If the parameter does not exist, returns it as is.
       */
      getParameterClampValue(parameterIndex, value) {
        if (this._notExistParameterValues.has(parameterIndex)) {
          return value;
        }
        CSM_ASSERT(
          0 <= parameterIndex && parameterIndex < this.getParameterCount()
        );
        const maxValue = this._model.parameters.maximumValues[parameterIndex];
        const minValue = this._model.parameters.minimumValues[parameterIndex];
        return CubismMath.clamp(value, minValue, maxValue);
      }
      /**
       * Returns the repeat of the parameter.
       *
       * @param parameterIndex Parameter index
       *
       * @return the raw data parameter repeat from the Cubism Core.
       */
      getParameterRepeats(parameterIndex) {
        return this._model.parameters.repeats[parameterIndex] != 0;
      }
      /**
       * パラメータの値の乗算
       * @param parameterId パラメータのID
       * @param value 乗算する値
       * @param weight 重み
       */
      multiplyParameterValueById(parameterId, value, weight = 1) {
        const index = this.getParameterIndex(parameterId);
        this.multiplyParameterValueByIndex(index, value, weight);
      }
      /**
       * パラメータの値の乗算
       * @param parameterIndex パラメータのインデックス
       * @param value 乗算する値
       * @param weight 重み
       */
      multiplyParameterValueByIndex(parameterIndex, value, weight = 1) {
        this.setParameterValueByIndex(
          parameterIndex,
          this.getParameterValueByIndex(parameterIndex) * (1 + (value - 1) * weight)
        );
      }
      /**
       * Drawableのインデックスの取得
       * @param drawableId DrawableのID
       * @return Drawableのインデックス
       */
      getDrawableIndex(drawableId) {
        const drawableCount = this._model.drawables.count;
        for (let drawableIndex = 0; drawableIndex < drawableCount; ++drawableIndex) {
          if (this._drawableIds[drawableIndex] == drawableId) {
            return drawableIndex;
          }
        }
        return -1;
      }
      /**
       * Drawableの個数の取得
       * @return drawableの個数
       */
      getDrawableCount() {
        const drawableCount = this._model.drawables.count;
        return drawableCount;
      }
      /**
       * DrawableのIDを取得する
       * @param drawableIndex Drawableのインデックス
       * @return drawableのID
       */
      getDrawableId(drawableIndex) {
        const parameterIds = this._model.drawables.ids;
        return CubismFramework.getIdManager().getId(parameterIds[drawableIndex]);
      }
      /**
       * Drawableの描画順リストの取得
       * @return Drawableの描画順リスト
       */
      getRenderOrders() {
        const renderOrders = this._model.getRenderOrders();
        return renderOrders;
      }
      /**
       * Drawableのテクスチャインデックスの取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableのテクスチャインデックス
       */
      getDrawableTextureIndex(drawableIndex) {
        const textureIndices = this._model.drawables.textureIndices;
        return textureIndices[drawableIndex];
      }
      /**
       * DrawableのVertexPositionsの変化情報の取得
       *
       * 直近のCubismModel.update関数でDrawableの頂点情報が変化したかを取得する。
       *
       * @param   drawableIndex   Drawableのインデックス
       * @return  true    Drawableの頂点情報が直近のCubismModel.update関数で変化した
       *          false   Drawableの頂点情報が直近のCubismModel.update関数で変化していない
       */
      getDrawableDynamicFlagVertexPositionsDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(
          dynamicFlags[drawableIndex]
        );
      }
      /**
       * Drawableの頂点インデックスの個数の取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの頂点インデックスの個数
       */
      getDrawableVertexIndexCount(drawableIndex) {
        const indexCounts = this._model.drawables.indexCounts;
        return indexCounts[drawableIndex];
      }
      /**
       * Drawableの頂点の個数の取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの頂点の個数
       */
      getDrawableVertexCount(drawableIndex) {
        const vertexCounts = this._model.drawables.vertexCounts;
        return vertexCounts[drawableIndex];
      }
      /**
       * Drawableの頂点リストの取得
       * @param drawableIndex drawableのインデックス
       * @return drawableの頂点リスト
       */
      getDrawableVertices(drawableIndex) {
        return this.getDrawableVertexPositions(drawableIndex);
      }
      /**
       * Drawableの頂点インデックスリストの取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの頂点インデックスリスト
       */
      getDrawableVertexIndices(drawableIndex) {
        const indicesArray = this._model.drawables.indices;
        return indicesArray[drawableIndex];
      }
      /**
       * Drawableの頂点リストの取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの頂点リスト
       */
      getDrawableVertexPositions(drawableIndex) {
        const verticesArray = this._model.drawables.vertexPositions;
        return verticesArray[drawableIndex];
      }
      /**
       * Drawableの頂点のUVリストの取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの頂点UVリスト
       */
      getDrawableVertexUvs(drawableIndex) {
        const uvsArray = this._model.drawables.vertexUvs;
        return uvsArray[drawableIndex];
      }
      /**
       * Drawableの不透明度の取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの不透明度
       */
      getDrawableOpacity(drawableIndex) {
        const opacities = this._model.drawables.opacities;
        return opacities[drawableIndex];
      }
      /**
       * Drawableの乗算色の取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの乗算色(RGBA)
       * スクリーン色はRGBAで取得されるが、Aは必ず0
       */
      getDrawableMultiplyColor(drawableIndex) {
        if (this._drawableMultiplyColors == null) {
          this._drawableMultiplyColors = new Array(
            this._model.drawables.count
          );
          this._drawableMultiplyColors.fill(new CubismTextureColor());
        }
        const multiplyColors = this._model.drawables.multiplyColors;
        const index = drawableIndex * 4;
        this._drawableMultiplyColors[drawableIndex].r = multiplyColors[index];
        this._drawableMultiplyColors[drawableIndex].g = multiplyColors[index + 1];
        this._drawableMultiplyColors[drawableIndex].b = multiplyColors[index + 2];
        this._drawableMultiplyColors[drawableIndex].a = multiplyColors[index + 3];
        return this._drawableMultiplyColors[drawableIndex];
      }
      /**
       * Drawableのスクリーン色の取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableのスクリーン色(RGBA)
       * スクリーン色はRGBAで取得されるが、Aは必ず0
       */
      getDrawableScreenColor(drawableIndex) {
        if (this._drawableScreenColors == null) {
          this._drawableScreenColors = new Array(
            this._model.drawables.count
          );
          this._drawableScreenColors.fill(new CubismTextureColor());
        }
        const screenColors = this._model.drawables.screenColors;
        const index = drawableIndex * 4;
        this._drawableScreenColors[drawableIndex].r = screenColors[index];
        this._drawableScreenColors[drawableIndex].g = screenColors[index + 1];
        this._drawableScreenColors[drawableIndex].b = screenColors[index + 2];
        this._drawableScreenColors[drawableIndex].a = screenColors[index + 3];
        return this._drawableScreenColors[drawableIndex];
      }
      /**
       * Offscreenの乗算色の取得
       * @param offscreenIndex Offscreenのインデックス
       * @return Offscreenの乗算色(RGBA)
       * スクリーン色はRGBAで取得されるが、Aは必ず0
       */
      getOffscreenMultiplyColor(offscreenIndex) {
        if (this._offscreenMultiplyColors == null) {
          this._offscreenMultiplyColors = new Array(
            this._model.offscreens.count
          );
          this._offscreenMultiplyColors.fill(new CubismTextureColor());
        }
        const multiplyColors = this._model.offscreens.multiplyColors;
        const index = offscreenIndex * 4;
        this._offscreenMultiplyColors[offscreenIndex].r = multiplyColors[index];
        this._offscreenMultiplyColors[offscreenIndex].g = multiplyColors[index + 1];
        this._offscreenMultiplyColors[offscreenIndex].b = multiplyColors[index + 2];
        this._offscreenMultiplyColors[offscreenIndex].a = multiplyColors[index + 3];
        return this._offscreenMultiplyColors[offscreenIndex];
      }
      /**
       * Offscreenのスクリーン色の取得
       * @param offscreenIndex Offscreenのインデックス
       * @return Offscreenのスクリーン色(RGBA)
       * スクリーン色はRGBAで取得されるが、Aは必ず0
       */
      getOffscreenScreenColor(offscreenIndex) {
        if (this._offscreenScreenColors == null) {
          this._offscreenScreenColors = new Array(
            this._model.offscreens.count
          );
          this._offscreenScreenColors.fill(new CubismTextureColor());
        }
        const screenColors = this._model.offscreens.screenColors;
        const index = offscreenIndex * 4;
        this._offscreenScreenColors[offscreenIndex].r = screenColors[index];
        this._offscreenScreenColors[offscreenIndex].g = screenColors[index + 1];
        this._offscreenScreenColors[offscreenIndex].b = screenColors[index + 2];
        this._offscreenScreenColors[offscreenIndex].a = screenColors[index + 3];
        return this._offscreenScreenColors[offscreenIndex];
      }
      /**
       * Drawableの親パーツのインデックスの取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableの親パーツのインデックス
       */
      getDrawableParentPartIndex(drawableIndex) {
        return this._model.drawables.parentPartIndices[drawableIndex];
      }
      /**
       * Drawableのブレンドモードを取得
       * @param drawableIndex Drawableのインデックス
       * @return drawableのブレンドモード
       */
      getDrawableBlendMode(drawableIndex) {
        const constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasBlendAdditiveBit(
          constantFlags[drawableIndex]
        ) ? 1 /* CubismBlendMode_Additive */ : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(
          constantFlags[drawableIndex]
        ) ? 2 /* CubismBlendMode_Multiplicative */ : 0 /* CubismBlendMode_Normal */;
      }
      /**
       * Drawableのカラーブレンドの取得(Cubism 5.3 以降)
       *
       * @param drawableIndex Drawableのインデックス
       * @return Drawableのカラーブレンド
       */
      getDrawableColorBlend(drawableIndex) {
        if (this._drawableColorBlends[drawableIndex] == -1 /* ColorBlend_None */) {
          this._drawableColorBlends[drawableIndex] = this._model.drawables.blendModes[drawableIndex] & 255;
        }
        return this._drawableColorBlends[drawableIndex];
      }
      /**
       * Drawableのアルファブレンドの取得(Cubism 5.3 以降)
       *
       * @param drawableIndex Drawableのインデックス
       * @return Drawableのアルファブレンド
       */
      getDrawableAlphaBlend(drawableIndex) {
        if (this._drawableAlphaBlends[drawableIndex] == -1 /* AlphaBlend_None */) {
          this._drawableAlphaBlends[drawableIndex] = this._model.drawables.blendModes[drawableIndex] >> 8 & 255;
        }
        return this._drawableAlphaBlends[drawableIndex];
      }
      /**
       * Drawableのマスクの反転使用の取得
       *
       * Drawableのマスク使用時の反転設定を取得する。
       * マスクを使用しない場合は無視される。
       *
       * @param drawableIndex Drawableのインデックス
       * @return Drawableの反転設定
       */
      getDrawableInvertedMaskBit(drawableIndex) {
        const constantFlags = this._model.drawables.constantFlags;
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(
          constantFlags[drawableIndex]
        );
      }
      /**
       * Drawableのクリッピングマスクリストの取得
       * @return Drawableのクリッピングマスクリスト
       */
      getDrawableMasks() {
        const masks = this._model.drawables.masks;
        return masks;
      }
      /**
       * Drawableのクリッピングマスクの個数リストの取得
       * @return Drawableのクリッピングマスクの個数リスト
       */
      getDrawableMaskCounts() {
        const maskCounts = this._model.drawables.maskCounts;
        return maskCounts;
      }
      /**
       * クリッピングマスクの使用状態
       *
       * @return true クリッピングマスクを使用している
       * @return false クリッピングマスクを使用していない
       */
      isUsingMasking() {
        for (let d = 0; d < this._model.drawables.count; ++d) {
          if (this._model.drawables.maskCounts[d] <= 0) {
            continue;
          }
          return true;
        }
        return false;
      }
      /**
       * Offscreenでクリッピングマスクを使用しているかどうかを取得
       *
       * @return true クリッピングマスクをオフスクリーンで使用している
       */
      isUsingMaskingForOffscreen() {
        for (let d = 0; d < this.getOffscreenCount(); ++d) {
          if (this._model.offscreens.maskCounts[d] <= 0) {
            continue;
          }
          return true;
        }
        return false;
      }
      /**
       * Drawableの表示情報を取得する
       *
       * @param drawableIndex Drawableのインデックス
       * @return true Drawableが表示
       * @return false Drawableが非表示
       */
      getDrawableDynamicFlagIsVisible(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasIsVisibleBit(dynamicFlags[drawableIndex]);
      }
      /**
       * DrawableのDrawOrderの変化情報の取得
       *
       * 直近のCubismModel.update関数でdrawableのdrawOrderが変化したかを取得する。
       * drawOrderはartMesh上で指定する0から1000の情報
       * @param drawableIndex drawableのインデックス
       * @return true drawableの不透明度が直近のCubismModel.update関数で変化した
       * @return false drawableの不透明度が直近のCubismModel.update関数で変化している
       */
      getDrawableDynamicFlagVisibilityDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(
          dynamicFlags[drawableIndex]
        );
      }
      /**
       * Drawableの不透明度の変化情報の取得
       *
       * 直近のCubismModel.update関数でdrawableの不透明度が変化したかを取得する。
       *
       * @param drawableIndex drawableのインデックス
       * @return true Drawableの不透明度が直近のCubismModel.update関数で変化した
       * @return false Drawableの不透明度が直近のCubismModel.update関数で変化してない
       */
      getDrawableDynamicFlagOpacityDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasOpacityDidChangeBit(
          dynamicFlags[drawableIndex]
        );
      }
      /**
       * Drawableの描画順序の変化情報の取得
       *
       * 直近のCubismModel.update関数でDrawableの描画の順序が変化したかを取得する。
       *
       * @param drawableIndex Drawableのインデックス
       * @return true Drawableの描画の順序が直近のCubismModel.update関数で変化した
       * @return false Drawableの描画の順序が直近のCubismModel.update関数で変化してない
       */
      getDrawableDynamicFlagRenderOrderDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(
          dynamicFlags[drawableIndex]
        );
      }
      /**
       * Drawableの乗算色・スクリーン色の変化情報の取得
       *
       * 直近のCubismModel.update関数でDrawableの乗算色・スクリーン色が変化したかを取得する。
       *
       * @param drawableIndex Drawableのインデックス
       * @return true Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化した
       * @return false Drawableの乗算色・スクリーン色が直近のCubismModel.update関数で変化してない
       */
      getDrawableDynamicFlagBlendColorDidChange(drawableIndex) {
        const dynamicFlags = this._model.drawables.dynamicFlags;
        return Live2DCubismCore.Utils.hasBlendColorDidChangeBit(
          dynamicFlags[drawableIndex]
        );
      }
      /**
       * オフスクリーンの個数を取得する
       * @return オフスクリーンの個数
       */
      getOffscreenCount() {
        return this._model.offscreens.count;
      }
      /**
       * Offscreenのカラーブレンドの取得(Cubism 5.3 以降)
       *
       * @param offscreenIndex Offscreenのインデックス
       * @return Offscreenのカラーブレンド
       */
      getOffscreenColorBlend(offscreenIndex) {
        if (this._offscreenColorBlends[offscreenIndex] == -1 /* ColorBlend_None */) {
          this._offscreenColorBlends[offscreenIndex] = this._model.offscreens.blendModes[offscreenIndex] & 255;
        }
        return this._offscreenColorBlends[offscreenIndex];
      }
      /**
       * Offscreenのアルファブレンドの取得(Cubism 5.3 以降)
       *
       * @param offscreenIndex Offscreenのインデックス
       * @return Offscreenのアルファブレンド
       */
      getOffscreenAlphaBlend(offscreenIndex) {
        if (this._offscreenAlphaBlends[offscreenIndex] == -1 /* AlphaBlend_None */) {
          this._offscreenAlphaBlends[offscreenIndex] = this._model.offscreens.blendModes[offscreenIndex] >> 8 & 255;
        }
        return this._offscreenAlphaBlends[offscreenIndex];
      }
      /**
       * オフスクリーンのオーナーインデックス配列を取得する
       * @return オフスクリーンのオーナーインデックス配列
       */
      getOffscreenOwnerIndices() {
        return this._model.offscreens.ownerIndices;
      }
      /**
       * オフスクリーンの不透明度を取得
       * @param offscreenIndex オフスクリーンのインデックス
       * @return 不透明度
       */
      getOffscreenOpacity(offscreenIndex) {
        if (offscreenIndex < 0 || offscreenIndex >= this._model.offscreens.count) {
          return 1;
        }
        return this._model.offscreens.opacities[offscreenIndex];
      }
      /**
       * オフスクリーンのクリッピングマスクリストの取得
       * @return オフスクリーンのクリッピングマスクリスト
       */
      getOffscreenMasks() {
        return this._model.offscreens.masks;
      }
      /**
       * オフスクリーンのクリッピングマスクの個数リストの取得
       * @return オフスクリーンのクリッピングマスクの個数リスト
       */
      getOffscreenMaskCounts() {
        return this._model.offscreens.maskCounts;
      }
      /**
       * オフスクリーンのマスク反転設定を取得する
       * @param offscreenIndex オフスクリーンのインデックス
       * @return オフスクリーンのマスク反転設定
       */
      getOffscreenInvertedMask(offscreenIndex) {
        const constantFlags = this._model.offscreens.constantFlags;
        return Live2DCubismCore.Utils.hasIsInvertedMaskBit(
          constantFlags[offscreenIndex]
        );
      }
      /**
       * ブレンドモード使用判定
       * @return ブレンドモードを使用しているか
       */
      isBlendModeEnabled() {
        return this._isBlendModeEnabled;
      }
      /**
       * 保存されたパラメータの読み込み
       */
      loadParameters() {
        let parameterCount = this._model.parameters.count;
        const savedParameterCount = this._savedParameters.length;
        if (parameterCount > savedParameterCount) {
          parameterCount = savedParameterCount;
        }
        for (let i = 0; i < parameterCount; ++i) {
          this._parameterValues[i] = this._savedParameters[i];
        }
      }
      /**
       * 初期化する
       */
      initialize() {
        CSM_ASSERT(this._model);
        this._parameterValues = this._model.parameters.values;
        this._partOpacities = this._model.parts.opacities;
        this._offscreenOpacities = this._model.offscreens.opacities;
        this._parameterMaximumValues = this._model.parameters.maximumValues;
        this._parameterMinimumValues = this._model.parameters.minimumValues;
        {
          const parameterIds = this._model.parameters.ids;
          const parameterCount = this._model.parameters.count;
          this._parameterIds.length = parameterCount;
          this._userParameterRepeatDataList.length = parameterCount;
          for (let i = 0; i < parameterCount; ++i) {
            this._parameterIds[i] = CubismFramework.getIdManager().getId(
              parameterIds[i]
            );
            this._userParameterRepeatDataList[i] = new ParameterRepeatData(
              false,
              false
            );
          }
        }
        const partCount = this._model.parts.count;
        {
          const partIds = this._model.parts.ids;
          this._partIds.length = partCount;
          for (let i = 0; i < partCount; ++i) {
            this._partIds[i] = CubismFramework.getIdManager().getId(partIds[i]);
          }
        }
        {
          const drawableIds = this._model.drawables.ids;
          const drawableCount = this._model.drawables.count;
          this._userDrawableCullings.length = drawableCount;
          const userCulling = new CullingData(false, false);
          this._userOffscreenCullings.length = this._model.offscreens.count;
          const userOffscreenCulling = new CullingData(false, false);
          {
            for (let i = 0; i < drawableCount; ++i) {
              this._drawableIds.push(
                CubismFramework.getIdManager().getId(drawableIds[i])
              );
              this._userDrawableCullings[i] = userCulling;
            }
          }
          {
            for (let i = 0; i < this._model.offscreens.count; ++i) {
              this._userOffscreenCullings[i] = userOffscreenCulling;
            }
          }
          if (this.getOffscreenCount() > 0) {
            this._isBlendModeEnabled = true;
          } else {
            const blendModes = this._model.drawables.blendModes;
            for (let i = 0; i < drawableCount; ++i) {
              const colorBlendType = this.getDrawableColorBlend(i);
              const alphaBlendType = this.getDrawableAlphaBlend(i);
              if (!(colorBlendType == CubismColorBlend.ColorBlend_Normal && alphaBlendType == 0 /* AlphaBlend_Over */) && colorBlendType != CubismColorBlend.ColorBlend_AddCompatible && colorBlendType != CubismColorBlend.ColorBlend_MultiplyCompatible) {
                this._isBlendModeEnabled = true;
                break;
              }
            }
          }
          this.setupPartsHierarchy();
          const offscreenCount = this.getOffscreenCount();
          this._overrideMultiplyAndScreenColor.initialize(
            partCount,
            drawableCount,
            offscreenCount
          );
        }
      }
      /**
       * パーツ階層構造を取得する
       * @return パーツ階層構造の配列
       */
      getPartsHierarchy() {
        return this._partsHierarchy;
      }
      /**
       * パーツ階層構造をセットアップする
       */
      setupPartsHierarchy() {
        this._partsHierarchy.length = 0;
        const partCount = this.getPartCount();
        this._partsHierarchy.length = partCount;
        for (let i = 0; i < partCount; ++i) {
          const partInfo = new CubismModelPartInfo();
          this._partsHierarchy[i] = partInfo;
        }
        for (let i = 0; i < partCount; ++i) {
          const parentPartIndex = this.getPartParentPartIndices()[i];
          if (parentPartIndex === NoParentIndex) {
            continue;
          }
          for (let partIndex = 0; partIndex < this._partsHierarchy.length; ++partIndex) {
            if (partIndex === parentPartIndex) {
              const objectInfo = new CubismModelObjectInfo(
                i,
                1 /* CubismModelObjectType_Parts */
              );
              this._partsHierarchy[partIndex].objects.push(objectInfo);
              break;
            }
          }
        }
        const drawableCount = this.getDrawableCount();
        for (let i = 0; i < drawableCount; ++i) {
          const parentPartIndex = this.getDrawableParentPartIndex(i);
          if (parentPartIndex === NoParentIndex) {
            continue;
          }
          for (let partIndex = 0; partIndex < this._partsHierarchy.length; ++partIndex) {
            if (partIndex === parentPartIndex) {
              const objectInfo = new CubismModelObjectInfo(
                i,
                0 /* CubismModelObjectType_Drawable */
              );
              this._partsHierarchy[partIndex].objects.push(objectInfo);
              break;
            }
          }
        }
        for (let i = 0; i < this._partsHierarchy.length; ++i) {
          this.getPartChildDrawObjects(i);
        }
      }
      /**
       * 指定したパーツの子描画オブジェクト情報を取得・構築する
       * @param partInfoIndex パーツ情報のインデックス
       * @return PartChildDrawObjects
       */
      getPartChildDrawObjects(partInfoIndex) {
        if (this._partsHierarchy[partInfoIndex].getChildObjectCount() < 1) {
          return this._partsHierarchy[partInfoIndex].childDrawObjects;
        }
        const childDrawObjects = this._partsHierarchy[partInfoIndex].childDrawObjects;
        if (childDrawObjects.drawableIndices.length !== 0 || childDrawObjects.offscreenIndices.length !== 0) {
          return childDrawObjects;
        }
        const objects = this._partsHierarchy[partInfoIndex].objects;
        for (let i = 0; i < objects.length; ++i) {
          const obj = objects[i];
          if (obj.objectType === 1 /* CubismModelObjectType_Parts */) {
            this.getPartChildDrawObjects(obj.objectIndex);
            const childToChildDrawObjects = this._partsHierarchy[obj.objectIndex].childDrawObjects;
            childDrawObjects.drawableIndices.push(
              ...childToChildDrawObjects.drawableIndices
            );
            childDrawObjects.offscreenIndices.push(
              ...childToChildDrawObjects.offscreenIndices
            );
            const offscreenIndices = this.getOffscreenIndices();
            const offscreenIndex = offscreenIndices ? offscreenIndices[obj.objectIndex] : NoOffscreenIndex;
            if (offscreenIndex !== NoOffscreenIndex) {
              childDrawObjects.offscreenIndices.push(offscreenIndex);
            }
          } else if (obj.objectType === 0 /* CubismModelObjectType_Drawable */) {
            childDrawObjects.drawableIndices.push(obj.objectIndex);
          }
        }
        return childDrawObjects;
      }
      /**
       * パーツのオフスクリーンインデックス配列を取得
       * @return Int32Array offscreenIndices
       */
      getOffscreenIndices() {
        return this._model.parts.offscreenIndices;
      }
      /**
       * コンストラクタ
       * @param model モデル
       */
      constructor(model) {
        this._model = model;
        this._parameterValues = null;
        this._parameterMaximumValues = null;
        this._parameterMinimumValues = null;
        this._partOpacities = null;
        this._offscreenOpacities = null;
        this._savedParameters = new Array();
        this._parameterIds = new Array();
        this._drawableIds = new Array();
        this._partIds = new Array();
        this._isOverriddenParameterRepeat = true;
        this._isOverriddenCullings = false;
        this._modelOpacity = 1;
        this._overrideMultiplyAndScreenColor = new CubismModelMultiplyAndScreenColor(this);
        this._isBlendModeEnabled = false;
        this._drawableColorBlends = null;
        this._drawableAlphaBlends = null;
        this._offscreenColorBlends = null;
        this._offscreenAlphaBlends = null;
        this._drawableMultiplyColors = null;
        this._drawableScreenColors = null;
        this._offscreenMultiplyColors = null;
        this._offscreenScreenColors = null;
        this._userParameterRepeatDataList = new Array();
        this._userDrawableCullings = new Array();
        this._userOffscreenCullings = new Array();
        this._partsHierarchy = new Array();
        this._notExistPartId = /* @__PURE__ */ new Map();
        this._notExistParameterId = /* @__PURE__ */ new Map();
        this._notExistParameterValues = /* @__PURE__ */ new Map();
        this._notExistPartOpacities = /* @__PURE__ */ new Map();
        this._drawableColorBlends = new Array(
          model.drawables.count
        ).fill(-1 /* ColorBlend_None */);
        this._drawableAlphaBlends = new Array(
          model.drawables.count
        ).fill(-1 /* AlphaBlend_None */);
        this._offscreenColorBlends = new Array(
          model.offscreens.count
        ).fill(-1 /* ColorBlend_None */);
        this._offscreenAlphaBlends = new Array(
          model.offscreens.count
        ).fill(-1 /* AlphaBlend_None */);
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        this._model.release();
        this._model = null;
        this._drawableColorBlends = null;
        this._drawableAlphaBlends = null;
        this._offscreenColorBlends = null;
        this._offscreenAlphaBlends = null;
        this._drawableMultiplyColors = null;
        this._drawableScreenColors = null;
        this._offscreenMultiplyColors = null;
        this._offscreenScreenColors = null;
      }
      _notExistPartOpacities;
      // 存在していないパーツの不透明度のリスト
      _notExistPartId;
      // 存在していないパーツIDのリスト
      _notExistParameterValues;
      // 存在していないパラメータの値のリスト
      _notExistParameterId;
      // 存在していないパラメータIDのリスト
      _savedParameters;
      // 保存されたパラメータ
      /**
       * Flag to determine whether to override model-wide parameter repeats on the SDK
       */
      _isOverriddenParameterRepeat;
      _overrideMultiplyAndScreenColor;
      // 乗算色・スクリーン色の管理クラス
      /**
       * List to manage ParameterRepeat and Override flag to be set for each Parameter
       */
      _userParameterRepeatDataList;
      _partsHierarchy;
      // Partの親子構造
      _model;
      // モデル
      _parameterValues;
      // パラメータの値のリスト
      _parameterMaximumValues;
      // パラメータの最大値のリスト
      _parameterMinimumValues;
      // パラメータの最小値のリスト
      _partOpacities;
      // パーツの不透明度のリスト
      _offscreenOpacities;
      // オフスクリーンの不透明度のリスト
      _modelOpacity;
      // モデルの不透明度
      _parameterIds;
      _partIds;
      _drawableIds;
      _isOverriddenCullings;
      // モデルのカリング設定をすべて上書きするか？
      _userDrawableCullings;
      // カリング設定の配列
      _userOffscreenCullings;
      // オフスクリーンのカリング設定を使用するか？
      _isBlendModeEnabled;
      // ブレンドモードを使用しているか
      _drawableColorBlends;
      // Drawableのカラーブレンドの配列
      _drawableAlphaBlends;
      // Drawableのアルファブレンドの配列
      _offscreenColorBlends;
      // Offscreen のカラーブレンドの配列
      _offscreenAlphaBlends;
      // Offscreen のアルファブレンドの配列
      _drawableMultiplyColors;
      // Drawableの乗算色の配列
      _drawableScreenColors;
      // Drawableのスクリーン色の配列
      _offscreenMultiplyColors;
      // Offscreenの乗算色の配列
      _offscreenScreenColors;
      // Offscreenのスクリーン色の配列
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismModel = CubismModel;
    })(Live2DCubismFramework33 || (Live2DCubismFramework33 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismclippingmanager.ts
var ColorChannelCount, ClippingMaskMaxCountOnDefault, ClippingMaskMaxCountOnMultiRenderTexture, CubismClippingManager;
var init_cubismclippingmanager = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismclippingmanager.ts"() {
    init_live2dcubismframework();
    init_csmrectf();
    init_cubismmatrix44();
    init_cubismrenderer();
    init_cubismdebug();
    ColorChannelCount = 4;
    ClippingMaskMaxCountOnDefault = 36;
    ClippingMaskMaxCountOnMultiRenderTexture = 32;
    CubismClippingManager = class {
      /**
       * コンストラクタ
       */
      constructor(clippingContextFactory) {
        this._renderTextureCount = 0;
        this._clippingMaskBufferSize = 256;
        this._clippingContextListForMask = new Array();
        this._clippingContextListForDraw = new Array();
        this._clippingContextListForOffscreen = new Array();
        this._tmpBoundsOnModel = new csmRect();
        this._tmpMatrix = new CubismMatrix44();
        this._tmpMatrixForMask = new CubismMatrix44();
        this._tmpMatrixForDraw = new CubismMatrix44();
        this._clearedMaskBufferFlags = new Array();
        this._clippingContexttConstructor = clippingContextFactory;
        this._channelColors = [
          new CubismTextureColor(1, 0, 0, 0),
          new CubismTextureColor(0, 1, 0, 0),
          new CubismTextureColor(0, 0, 1, 0),
          new CubismTextureColor(0, 0, 0, 1)
        ];
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        for (let i = 0; i < this._clippingContextListForMask.length; i++) {
          if (this._clippingContextListForMask[i]) {
            this._clippingContextListForMask[i].release();
            this._clippingContextListForMask[i] = void 0;
          }
          this._clippingContextListForMask[i] = null;
        }
        this._clippingContextListForMask = null;
        for (let i = 0; i < this._clippingContextListForDraw.length; i++) {
          this._clippingContextListForDraw[i] = null;
        }
        this._clippingContextListForDraw = null;
        for (let i = 0; i < this._channelColors.length; i++) {
          this._channelColors[i] = null;
        }
        this._channelColors = null;
        if (this._clearedMaskBufferFlags != null) {
          this._clearedMaskBufferFlags.length = 0;
        }
        this._clearedMaskBufferFlags = null;
      }
      /**
       * マネージャの初期化処理
       * クリッピングマスクを使う描画オブジェクトの登録を行う
       * @param model モデルのインスタンス
       * @param renderTextureCount バッファの生成数
       */
      initializeForDrawable(model, renderTextureCount) {
        if (renderTextureCount % 1 != 0) {
          CubismLogWarning(
            "The number of render textures must be specified as an integer. The decimal point is rounded down and corrected to an integer."
          );
          renderTextureCount = ~~renderTextureCount;
        }
        if (renderTextureCount < 1) {
          CubismLogWarning(
            "The number of render textures must be an integer greater than or equal to 1. Set the number of render textures to 1."
          );
        }
        this._renderTextureCount = renderTextureCount < 1 ? 1 : renderTextureCount;
        this._clearedMaskBufferFlags = new Array(this._renderTextureCount);
        this._clippingContextListForDraw.length = model.getDrawableCount();
        for (let i = 0; i < model.getDrawableCount(); i++) {
          if (model.getDrawableMaskCounts()[i] <= 0) {
            this._clippingContextListForDraw[i] = null;
            continue;
          }
          let clippingContext = this.findSameClip(
            model.getDrawableMasks()[i],
            model.getDrawableMaskCounts()[i]
          );
          if (clippingContext == null) {
            clippingContext = new this._clippingContexttConstructor(
              this,
              model.getDrawableMasks()[i],
              model.getDrawableMaskCounts()[i]
            );
            this._clippingContextListForMask.push(clippingContext);
          }
          clippingContext.addClippedDrawable(i);
          this._clippingContextListForDraw[i] = clippingContext;
        }
      }
      /**
       * オフスクリーン用の初期化処理
       *
       * @param model モデルのインスタンス
       * @param maskBufferCount オフスクリーン用のマスクバッファの数
       */
      initializeForOffscreen(model, maskBufferCount) {
        this._renderTextureCount = maskBufferCount;
        this._clearedMaskBufferFlags.length = this._renderTextureCount;
        for (let i = 0; i < this._renderTextureCount; ++i) {
          this._clearedMaskBufferFlags[i] = false;
        }
        this._clippingContextListForOffscreen.length = model.getOffscreenCount();
        for (let i = 0; i < model.getOffscreenCount(); ++i) {
          if (model.getOffscreenMaskCounts()[i] <= 0) {
            this._clippingContextListForOffscreen.push(null);
            continue;
          }
          let cc = this.findSameClip(
            model.getOffscreenMasks()[i],
            model.getOffscreenMaskCounts()[i]
          );
          if (cc == null) {
            cc = new this._clippingContexttConstructor(
              this,
              model.getOffscreenMasks()[i],
              model.getOffscreenMaskCounts()[i]
            );
            this._clippingContextListForMask.push(cc);
          }
          cc.addClippedOffscreen(i);
          this._clippingContextListForOffscreen[i] = cc;
        }
      }
      /**
       * 既にマスクを作っているかを確認
       * 作っている様であれば該当するクリッピングマスクのインスタンスを返す
       * 作っていなければNULLを返す
       * @param drawableMasks 描画オブジェクトをマスクする描画オブジェクトのリスト
       * @param drawableMaskCounts 描画オブジェクトをマスクする描画オブジェクトの数
       * @return 該当するクリッピングマスクが存在すればインスタンスを返し、なければNULLを返す
       */
      findSameClip(drawableMasks, drawableMaskCounts) {
        for (let i = 0; i < this._clippingContextListForMask.length; i++) {
          const clippingContext = this._clippingContextListForMask[i];
          const count = clippingContext._clippingIdCount;
          if (count != drawableMaskCounts) {
            continue;
          }
          let sameCount = 0;
          for (let j = 0; j < count; j++) {
            const clipId = clippingContext._clippingIdList[j];
            for (let k = 0; k < count; k++) {
              if (drawableMasks[k] == clipId) {
                sameCount++;
                break;
              }
            }
          }
          if (sameCount == count) {
            return clippingContext;
          }
        }
        return null;
      }
      /**
       * 高精細マスク処理用の行列を計算する
       * @param model モデルのインスタンス
       * @param isRightHanded 処理が右手系であるか
       */
      setupMatrixForHighPrecision(model, isRightHanded) {
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
          const cc = this._clippingContextListForMask[clipIndex];
          this.calcClippedDrawableTotalBounds(model, cc);
          if (cc._isUsing) {
            usingClipCount++;
          }
        }
        if (usingClipCount > 0) {
          this.setupLayoutBounds(0);
          if (this._clearedMaskBufferFlags.length != this._renderTextureCount) {
            this._clearedMaskBufferFlags.length = this._renderTextureCount;
            for (let i = 0; i < this._renderTextureCount; i++) {
              this._clearedMaskBufferFlags[i] = false;
            }
          } else {
            for (let i = 0; i < this._renderTextureCount; i++) {
              this._clearedMaskBufferFlags[i] = false;
            }
          }
          for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
            const clipContext = this._clippingContextListForMask[clipIndex];
            const allClippedDrawRect = clipContext._allClippedDrawRect;
            const layoutBoundsOnTex01 = clipContext._layoutBounds;
            const margin = 0.05;
            let scaleX = 0;
            let scaleY = 0;
            const ppu = model.getPixelsPerUnit();
            const maskPixelSize = clipContext.getClippingManager().getClippingMaskBufferSize();
            const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixelSize;
            const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixelSize;
            this._tmpBoundsOnModel.setRect(allClippedDrawRect);
            if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
              this._tmpBoundsOnModel.expand(allClippedDrawRect.width * margin, 0);
              scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
            } else {
              scaleX = ppu / physicalMaskWidth;
            }
            if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
              this._tmpBoundsOnModel.expand(
                0,
                allClippedDrawRect.height * margin
              );
              scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
            } else {
              scaleY = ppu / physicalMaskHeight;
            }
            this.createMatrixForMask(
              isRightHanded,
              layoutBoundsOnTex01,
              scaleX,
              scaleY
            );
            clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
            clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
          }
        }
      }
      /**
       * オフスクリーンの高精細マスク処理用の行列を計算する
       *
       * @param model モデルのインスタンス
       * @param isRightHanded 処理が右手系であるか
       * @param mvp モデルビュー投影行列
       */
      setupMatrixForOffscreenHighPrecision(model, isRightHanded, mvp) {
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
          const cc = this._clippingContextListForMask[clipIndex];
          this.calcClippedOffscreenTotalBounds(model, cc);
          if (cc._isUsing) {
            usingClipCount++;
          }
        }
        if (usingClipCount <= 0) {
          return;
        }
        this.setupLayoutBounds(0);
        if (this._clearedMaskBufferFlags.length != this._renderTextureCount) {
          this._clearedMaskBufferFlags.length = this._renderTextureCount;
          for (let i = 0; i < this._renderTextureCount; ++i) {
            this._clearedMaskBufferFlags[i] = false;
          }
        } else {
          for (let i = 0; i < this._renderTextureCount; ++i) {
            this._clearedMaskBufferFlags[i] = false;
          }
        }
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
          const clipContext = this._clippingContextListForMask[clipIndex];
          const allClippedDrawRect = clipContext._allClippedDrawRect;
          const layoutBoundsOnTex01 = clipContext._layoutBounds;
          const margin = 0.05;
          let scaleX = 0;
          let scaleY = 0;
          const ppu = model.getPixelsPerUnit();
          const maskPixel = clipContext.getClippingManager().getClippingMaskBufferSize();
          const physicalMaskWidth = layoutBoundsOnTex01.width * maskPixel;
          const physicalMaskHeight = layoutBoundsOnTex01.height * maskPixel;
          this._tmpBoundsOnModel.setRect(allClippedDrawRect);
          if (this._tmpBoundsOnModel.width * ppu > physicalMaskWidth) {
            this._tmpBoundsOnModel.expand(allClippedDrawRect.width * margin, 0);
            scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
          } else {
            scaleX = ppu / physicalMaskWidth;
          }
          if (this._tmpBoundsOnModel.height * ppu > physicalMaskHeight) {
            this._tmpBoundsOnModel.expand(0, allClippedDrawRect.height * margin);
            scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
          } else {
            scaleY = ppu / physicalMaskHeight;
          }
          this.createMatrixForMask(
            isRightHanded,
            layoutBoundsOnTex01,
            scaleX,
            scaleY
          );
          clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
          clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
          const invertMvp = mvp.getInvert();
          clipContext._matrixForDraw.multiplyByMatrix(invertMvp);
        }
      }
      /**
       * マスクを使う描画オブジェクトの全体の矩形を計算する。
       *
       * @param model モデルのインスタンス
       * @param clippingContext クリッピングコンテキスト
       */
      calcClippedOffscreenTotalBounds(model, clippingContext) {
        let clippedDrawTotalMinX = Number.MAX_VALUE, clippedDrawTotalMinY = Number.MAX_VALUE;
        let clippedDrawTotalMaxX = -Number.MAX_VALUE, clippedDrawTotalMaxY = -Number.MAX_VALUE;
        const clippedOffscreenCount = clippingContext._clippedOffscreenIndexList.length;
        const clippedOffscreenChildDrawableIndexList = new Array();
        for (let clippedOffscreenIndex = 0; clippedOffscreenIndex < clippedOffscreenCount; clippedOffscreenIndex++) {
          const offscreenIndex = clippingContext._clippedOffscreenIndexList[clippedOffscreenIndex];
          this.getOffscreenChildDrawableIndexList(
            model,
            offscreenIndex,
            clippedOffscreenChildDrawableIndexList
          );
        }
        const childDrawableCount = clippedOffscreenChildDrawableIndexList.length;
        for (let childDrawableIndex = 0; childDrawableIndex < childDrawableCount; childDrawableIndex++) {
          const drawableVertexCount = model.getDrawableVertexCount(
            clippedOffscreenChildDrawableIndexList[childDrawableIndex]
          );
          const drawableVertexes = model.getDrawableVertices(
            clippedOffscreenChildDrawableIndexList[childDrawableIndex]
          );
          let minX = Number.MAX_VALUE, minY = Number.MAX_VALUE;
          let maxX = -Number.MAX_VALUE, maxY = -Number.MAX_VALUE;
          const loop = drawableVertexCount * Constant.vertexStep;
          for (let pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
            const x = drawableVertexes[pi];
            const y = drawableVertexes[pi + 1];
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
          if (minX == Number.MAX_VALUE) continue;
          if (minX < clippedDrawTotalMinX) clippedDrawTotalMinX = minX;
          if (minY < clippedDrawTotalMinY) clippedDrawTotalMinY = minY;
          if (maxX > clippedDrawTotalMaxX) clippedDrawTotalMaxX = maxX;
          if (maxY > clippedDrawTotalMaxY) clippedDrawTotalMaxY = maxY;
        }
        if (clippedDrawTotalMinX == Number.MAX_VALUE) {
          clippingContext._allClippedDrawRect.x = 0;
          clippingContext._allClippedDrawRect.y = 0;
          clippingContext._allClippedDrawRect.width = 0;
          clippingContext._allClippedDrawRect.height = 0;
          clippingContext._isUsing = false;
        } else {
          clippingContext._isUsing = true;
          const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
          const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
          clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
          clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
          clippingContext._allClippedDrawRect.width = w;
          clippingContext._allClippedDrawRect.height = h;
        }
      }
      /**
       * マスクを使う描画オブジェクトの全体の矩形を計算する。
       *
       * @param model モデルのインスタンス
       * @param offscreenIndex オフスクリーンのインデックス
       * @param childDrawableIndexList オフスクリーンの子Drawableのインデックスリスト
       */
      getOffscreenChildDrawableIndexList(model, offscreenIndex, childDrawableIndexList) {
        const ownerIndex = model.getOffscreenOwnerIndices()[offscreenIndex];
        this.getPartChildDrawableIndexList(
          model,
          ownerIndex,
          childDrawableIndexList
        );
      }
      /**
       * パーツの子Drawableのインデックスリストを取得する。
       *
       * @param model モデルのインスタンス
       * @param partIndex パーツのインデックス
       * @param childDrawableIndexList パーツの子Drawableのインデックスリスト
       */
      getPartChildDrawableIndexList(model, partIndex, childDrawableIndexList) {
        const childDrawObjects = model.getPartsHierarchy()[partIndex].childDrawObjects;
        childDrawableIndexList.push(...childDrawObjects.drawableIndices);
        for (let i = 0; i < childDrawObjects.offscreenIndices.length; ++i) {
          this.getOffscreenChildDrawableIndexList(
            model,
            childDrawObjects.offscreenIndices[i],
            childDrawableIndexList
          );
        }
      }
      /**
       * マスク作成・描画用の行列を作成する。
       * @param isRightHanded 座標を右手系として扱うかを指定
       * @param layoutBoundsOnTex01 マスクを収める領域
       * @param scaleX 描画オブジェクトの伸縮率
       * @param scaleY 描画オブジェクトの伸縮率
       */
      createMatrixForMask(isRightHanded, layoutBoundsOnTex01, scaleX, scaleY) {
        this._tmpMatrix.loadIdentity();
        {
          this._tmpMatrix.translateRelative(-1, -1);
          this._tmpMatrix.scaleRelative(2, 2);
        }
        {
          this._tmpMatrix.translateRelative(
            layoutBoundsOnTex01.x,
            layoutBoundsOnTex01.y
          );
          this._tmpMatrix.scaleRelative(scaleX, scaleY);
          this._tmpMatrix.translateRelative(
            -this._tmpBoundsOnModel.x,
            -this._tmpBoundsOnModel.y
          );
        }
        this._tmpMatrixForMask.setMatrix(this._tmpMatrix.getArray());
        this._tmpMatrix.loadIdentity();
        {
          this._tmpMatrix.translateRelative(
            layoutBoundsOnTex01.x,
            layoutBoundsOnTex01.y * (isRightHanded ? -1 : 1)
          );
          this._tmpMatrix.scaleRelative(
            scaleX,
            scaleY * (isRightHanded ? -1 : 1)
          );
          this._tmpMatrix.translateRelative(
            -this._tmpBoundsOnModel.x,
            -this._tmpBoundsOnModel.y
          );
        }
        this._tmpMatrixForDraw.setMatrix(this._tmpMatrix.getArray());
      }
      /**
       * クリッピングコンテキストを配置するレイアウト
       * 指定された数のレンダーテクスチャを極力いっぱいに使ってマスクをレイアウトする
       * マスクグループの数が4以下ならRGBA各チャンネルに一つずつマスクを配置し、5以上6以下ならRGBAを2,2,1,1と配置する。
       *
       * @param usingClipCount 配置するクリッピングコンテキストの数
       */
      setupLayoutBounds(usingClipCount) {
        const useClippingMaskMaxCount = this._renderTextureCount <= 1 ? ClippingMaskMaxCountOnDefault : ClippingMaskMaxCountOnMultiRenderTexture * this._renderTextureCount;
        if (usingClipCount <= 0 || usingClipCount > useClippingMaskMaxCount) {
          if (usingClipCount > useClippingMaskMaxCount) {
            CubismLogError(
              "not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}",
              usingClipCount - useClippingMaskMaxCount,
              this._renderTextureCount,
              usingClipCount
            );
          }
          for (let index = 0; index < this._clippingContextListForMask.length; index++) {
            const clipContext = this._clippingContextListForMask[index];
            clipContext._layoutChannelIndex = 0;
            clipContext._layoutBounds.x = 0;
            clipContext._layoutBounds.y = 0;
            clipContext._layoutBounds.width = 1;
            clipContext._layoutBounds.height = 1;
            clipContext._bufferIndex = 0;
          }
          return;
        }
        const layoutCountMaxValue = this._renderTextureCount <= 1 ? 9 : 8;
        let countPerSheetDiv = usingClipCount / this._renderTextureCount;
        const reduceLayoutTextureCount = usingClipCount % this._renderTextureCount;
        countPerSheetDiv = Math.ceil(countPerSheetDiv);
        let divCount = countPerSheetDiv / ColorChannelCount;
        const modCount = countPerSheetDiv % ColorChannelCount;
        divCount = ~~divCount;
        let curClipIndex = 0;
        for (let renderTextureIndex = 0; renderTextureIndex < this._renderTextureCount; renderTextureIndex++) {
          for (let channelIndex = 0; channelIndex < ColorChannelCount; channelIndex++) {
            let layoutCount = divCount + (channelIndex < modCount ? 1 : 0);
            const checkChannelIndex = modCount + (divCount < 1 ? -1 : 0);
            if (channelIndex == checkChannelIndex && reduceLayoutTextureCount > 0) {
              layoutCount -= !(renderTextureIndex < reduceLayoutTextureCount) ? 1 : 0;
            }
            if (layoutCount == 0) {
            } else if (layoutCount == 1) {
              const clipContext = this._clippingContextListForMask[curClipIndex++];
              clipContext._layoutChannelIndex = channelIndex;
              clipContext._layoutBounds.x = 0;
              clipContext._layoutBounds.y = 0;
              clipContext._layoutBounds.width = 1;
              clipContext._layoutBounds.height = 1;
              clipContext._bufferIndex = renderTextureIndex;
            } else if (layoutCount == 2) {
              for (let i = 0; i < layoutCount; i++) {
                let xpos = i % 2;
                xpos = ~~xpos;
                const cc = this._clippingContextListForMask[curClipIndex++];
                cc._layoutChannelIndex = channelIndex;
                cc._layoutBounds.x = xpos * 0.5;
                cc._layoutBounds.y = 0;
                cc._layoutBounds.width = 0.5;
                cc._layoutBounds.height = 1;
                cc._bufferIndex = renderTextureIndex;
              }
            } else if (layoutCount <= 4) {
              for (let i = 0; i < layoutCount; i++) {
                let xpos = i % 2;
                let ypos = i / 2;
                xpos = ~~xpos;
                ypos = ~~ypos;
                const cc = this._clippingContextListForMask[curClipIndex++];
                cc._layoutChannelIndex = channelIndex;
                cc._layoutBounds.x = xpos * 0.5;
                cc._layoutBounds.y = ypos * 0.5;
                cc._layoutBounds.width = 0.5;
                cc._layoutBounds.height = 0.5;
                cc._bufferIndex = renderTextureIndex;
              }
            } else if (layoutCount <= layoutCountMaxValue) {
              for (let i = 0; i < layoutCount; i++) {
                let xpos = i % 3;
                let ypos = i / 3;
                xpos = ~~xpos;
                ypos = ~~ypos;
                const cc = this._clippingContextListForMask[curClipIndex++];
                cc._layoutChannelIndex = channelIndex;
                cc._layoutBounds.x = xpos / 3;
                cc._layoutBounds.y = ypos / 3;
                cc._layoutBounds.width = 1 / 3;
                cc._layoutBounds.height = 1 / 3;
                cc._bufferIndex = renderTextureIndex;
              }
            } else {
              CubismLogError(
                "not supported mask count : {0}\n[Details] render texture count : {1}, mask count : {2}",
                usingClipCount - useClippingMaskMaxCount,
                this._renderTextureCount,
                usingClipCount
              );
              for (let index = 0; index < layoutCount; index++) {
                const cc = this._clippingContextListForMask[curClipIndex++];
                cc._layoutChannelIndex = 0;
                cc._layoutBounds.x = 0;
                cc._layoutBounds.y = 0;
                cc._layoutBounds.width = 1;
                cc._layoutBounds.height = 1;
                cc._bufferIndex = 0;
              }
            }
          }
        }
      }
      /**
       * マスクされる描画オブジェクト群全体を囲む矩形（モデル座標系）を計算する
       * @param model モデルのインスタンス
       * @param clippingContext クリッピングマスクのコンテキスト
       */
      calcClippedDrawableTotalBounds(model, clippingContext) {
        let clippedDrawTotalMinX = Number.MAX_VALUE;
        let clippedDrawTotalMinY = Number.MAX_VALUE;
        let clippedDrawTotalMaxX = Number.MIN_VALUE;
        let clippedDrawTotalMaxY = Number.MIN_VALUE;
        const clippedDrawCount = clippingContext._clippedDrawableIndexList.length;
        for (let clippedDrawableIndex = 0; clippedDrawableIndex < clippedDrawCount; clippedDrawableIndex++) {
          const drawableIndex = clippingContext._clippedDrawableIndexList[clippedDrawableIndex];
          const drawableVertexCount = model.getDrawableVertexCount(drawableIndex);
          const drawableVertexes = model.getDrawableVertices(drawableIndex);
          let minX = Number.MAX_VALUE;
          let minY = Number.MAX_VALUE;
          let maxX = -Number.MAX_VALUE;
          let maxY = -Number.MAX_VALUE;
          const loop = drawableVertexCount * Constant.vertexStep;
          for (let pi = Constant.vertexOffset; pi < loop; pi += Constant.vertexStep) {
            const x = drawableVertexes[pi];
            const y = drawableVertexes[pi + 1];
            if (x < minX) {
              minX = x;
            }
            if (x > maxX) {
              maxX = x;
            }
            if (y < minY) {
              minY = y;
            }
            if (y > maxY) {
              maxY = y;
            }
          }
          if (minX == Number.MAX_VALUE) {
            continue;
          }
          if (minX < clippedDrawTotalMinX) {
            clippedDrawTotalMinX = minX;
          }
          if (minY < clippedDrawTotalMinY) {
            clippedDrawTotalMinY = minY;
          }
          if (maxX > clippedDrawTotalMaxX) {
            clippedDrawTotalMaxX = maxX;
          }
          if (maxY > clippedDrawTotalMaxY) {
            clippedDrawTotalMaxY = maxY;
          }
          if (clippedDrawTotalMinX == Number.MAX_VALUE) {
            clippingContext._allClippedDrawRect.x = 0;
            clippingContext._allClippedDrawRect.y = 0;
            clippingContext._allClippedDrawRect.width = 0;
            clippingContext._allClippedDrawRect.height = 0;
            clippingContext._isUsing = false;
          } else {
            clippingContext._isUsing = true;
            const w = clippedDrawTotalMaxX - clippedDrawTotalMinX;
            const h = clippedDrawTotalMaxY - clippedDrawTotalMinY;
            clippingContext._allClippedDrawRect.x = clippedDrawTotalMinX;
            clippingContext._allClippedDrawRect.y = clippedDrawTotalMinY;
            clippingContext._allClippedDrawRect.width = w;
            clippingContext._allClippedDrawRect.height = h;
          }
        }
      }
      /**
       * 画面描画に使用するクリッピングマスクのリストを取得する
       * @return 画面描画に使用するクリッピングマスクのリスト
       */
      getClippingContextListForDraw() {
        return this._clippingContextListForDraw;
      }
      getClippingContextListForOffscreen() {
        return this._clippingContextListForOffscreen;
      }
      /**
       * クリッピングマスクバッファのサイズを取得する
       * @return クリッピングマスクバッファのサイズ
       */
      getClippingMaskBufferSize() {
        return this._clippingMaskBufferSize;
      }
      /**
       * このバッファのレンダーテクスチャの枚数を取得する
       * @return このバッファのレンダーテクスチャの枚数
       */
      getRenderTextureCount() {
        return this._renderTextureCount;
      }
      /**
       * カラーチャンネル（RGBA）のフラグを取得する
       * @param channelNo カラーチャンネル（RGBA）の番号（0:R, 1:G, 2:B, 3:A）
       */
      getChannelFlagAsColor(channelNo) {
        return this._channelColors[channelNo];
      }
      /**
       * クリッピングマスクバッファのサイズを設定する
       * @param size クリッピングマスクバッファのサイズ
       */
      setClippingMaskBufferSize(size) {
        this._clippingMaskBufferSize = size;
      }
      _clearedMaskBufferFlags;
      //マスクのクリアフラグの配列
      _channelColors;
      _clippingContextListForMask;
      // マスク用クリッピングコンテキストのリスト
      _clippingContextListForDraw;
      // 描画用クリッピングコンテキストのリスト
      _clippingContextListForOffscreen;
      // オフスクリーン用クリッピングコンテキストのリスト
      _clippingMaskBufferSize;
      // クリッピングマスクのバッファサイズ（初期値:256）
      _renderTextureCount;
      // 生成するレンダーテクスチャの枚数
      _tmpMatrix;
      // マスク計算用の行列
      _tmpMatrixForMask;
      // マスク計算用の行列
      _tmpMatrixForDraw;
      // マスク計算用の行列
      _tmpBoundsOnModel;
      // マスク配置計算用の矩形
      _clippingContexttConstructor;
    };
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismshader_webgl.ts
var VertShaderSrcPath, VertShaderSrcMaskedPath, VertShaderSrcSetupMaskPath, FragShaderSrcSetupMaskPath, FragShaderSrcPremultipliedAlphaPath, FragShaderSrcMaskPremultipliedAlphaPath, FragShaderSrcMaskInvertedPremultipliedAlphaPath, VertShaderSrcCopyPath, FragShaderSrcCopyPath, FragShaderSrcColorBlendPath, FragShaderSrcAlphaBlendPath, VertShaderSrcBlendPath, FragShaderSrcBlendPath, ColorBlendPrefix, AlphaBlendPrefix, s_instance, s_renderTargetVertexArray, s_renderTargetUvArray, s_renderTargetReverseUvArray, CubismShader_WebGL, CubismShaderManager_WebGL, CubismShaderSet, ShaderNames, Live2DCubismFramework34;
var init_cubismshader_webgl = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismshader_webgl.ts"() {
    init_cubismmatrix44();
    init_cubismmodel();
    init_cubismdebug();
    init_cubismrendertarget_webgl();
    init_cubismrenderer();
    init_cubismshader_webgl();
    VertShaderSrcPath = "vertshadersrc.vert";
    VertShaderSrcMaskedPath = "vertshadersrcmasked.vert";
    VertShaderSrcSetupMaskPath = "vertshadersrcsetupmask.vert";
    FragShaderSrcSetupMaskPath = "fragshadersrcsetupmask.frag";
    FragShaderSrcPremultipliedAlphaPath = "fragshadersrcpremultipliedalpha.frag";
    FragShaderSrcMaskPremultipliedAlphaPath = "fragshadersrcmaskpremultipliedalpha.frag";
    FragShaderSrcMaskInvertedPremultipliedAlphaPath = "fragshadersrcmaskinvertedpremultipliedalpha.frag";
    VertShaderSrcCopyPath = "vertshadersrccopy.vert";
    FragShaderSrcCopyPath = "fragshadersrccopy.frag";
    FragShaderSrcColorBlendPath = "fragshadersrccolorblend.frag";
    FragShaderSrcAlphaBlendPath = "fragshadersrcalphablend.frag";
    VertShaderSrcBlendPath = "vertshadersrcblend.vert";
    FragShaderSrcBlendPath = "fragshadersrcpremultipliedalphablend.frag";
    ColorBlendPrefix = "ColorBlend_";
    AlphaBlendPrefix = "AlphaBlend_";
    s_renderTargetVertexArray = new Float32Array([
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      1
    ]);
    s_renderTargetUvArray = new Float32Array([
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1
    ]);
    s_renderTargetReverseUvArray = new Float32Array([
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0
    ]);
    CubismShader_WebGL = class {
      /**
       * 非同期でシェーダーをパスから読み込む
       *
       * @param url シェーダーのURL
       *
       * @return シェーダーのソースコード
       */
      async loadShader(url) {
        const response = await fetch(url);
        return await response.text();
      }
      /**
       * ブレンドモード用のシェーダーを読み込む
       */
      async loadShaders() {
        const shaderDir = this._shaderPath ?? this._defaultShaderPath;
        const shaderFiles = [
          { path: shaderDir + VertShaderSrcPath, prop: "_vertShaderSrc" },
          {
            path: shaderDir + VertShaderSrcMaskedPath,
            prop: "_vertShaderSrcMasked"
          },
          {
            path: shaderDir + VertShaderSrcSetupMaskPath,
            prop: "_vertShaderSrcSetupMask"
          },
          {
            path: shaderDir + FragShaderSrcSetupMaskPath,
            prop: "_fragShaderSrcSetupMask"
          },
          {
            path: shaderDir + FragShaderSrcPremultipliedAlphaPath,
            prop: "_fragShaderSrcPremultipliedAlpha"
          },
          {
            path: shaderDir + FragShaderSrcMaskPremultipliedAlphaPath,
            prop: "_fragShaderSrcMaskPremultipliedAlpha"
          },
          {
            path: shaderDir + FragShaderSrcMaskInvertedPremultipliedAlphaPath,
            prop: "_fragShaderSrcMaskInvertedPremultipliedAlpha"
          },
          { path: shaderDir + VertShaderSrcCopyPath, prop: "_vertShaderSrcCopy" },
          { path: shaderDir + FragShaderSrcCopyPath, prop: "_fragShaderSrcCopy" },
          {
            path: shaderDir + FragShaderSrcColorBlendPath,
            prop: "_fragShaderSrcColorBlend"
          },
          {
            path: shaderDir + FragShaderSrcAlphaBlendPath,
            prop: "_fragShaderSrcAlphaBlend"
          },
          { path: shaderDir + VertShaderSrcBlendPath, prop: "_vertShaderSrcBlend" },
          { path: shaderDir + FragShaderSrcBlendPath, prop: "_fragShaderSrcBlend" }
        ];
        const results = await Promise.all(
          shaderFiles.map(
            (file) => this.loadShader(file.path).then((data) => ({ prop: file.prop, data })).catch((error) => {
              console.error(`Error loading ${file.path} shader:`, error);
              return { prop: file.prop, data: "" };
            })
          )
        );
        results.forEach((result) => {
          this[result.prop] = result.data;
        });
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._shaderSets = new Array();
        this._isShaderLoading = false;
        this._isShaderLoaded = false;
        this._colorBlendMap = /* @__PURE__ */ new Map();
        this._colorBlendValues = new Array();
        const colorBlendKeys = Object.keys(CubismColorBlend);
        const colorBlendRawValues = Object.keys(CubismColorBlend).map(
          (k) => CubismColorBlend[k]
        );
        for (let i = 0; i < colorBlendKeys.length; i++) {
          const colorBlendKey = colorBlendKeys[i];
          if (colorBlendKey.includes(ColorBlendPrefix)) {
            const blendModeName = colorBlendKey.slice(ColorBlendPrefix.length);
            const colorBlendNumber = parseInt(colorBlendRawValues[i].toString());
            this._colorBlendMap.set(colorBlendNumber, blendModeName);
            this._colorBlendValues.push(colorBlendNumber);
          }
        }
        this._alphaBlendMap = /* @__PURE__ */ new Map();
        this._alphaBlendValues = new Array();
        const alphaBlendKeys = Object.keys(CubismAlphaBlend);
        const alphaBlendRawValues = Object.keys(CubismAlphaBlend).map(
          (k) => CubismAlphaBlend[k]
        );
        for (let i = 0; i < alphaBlendKeys.length; i++) {
          const alphaBlendKey = alphaBlendKeys[i];
          if (alphaBlendKey.includes(AlphaBlendPrefix)) {
            const blendModeName = alphaBlendKey.slice(AlphaBlendPrefix.length);
            const alphaBlendNumber = parseInt(alphaBlendRawValues[i].toString());
            this._alphaBlendMap.set(alphaBlendNumber, blendModeName);
            this._alphaBlendValues.push(alphaBlendNumber);
          }
        }
        this._blendShaderSetMap = /* @__PURE__ */ new Map();
        this._shaderCount = 10 /* ShaderNames_ShaderCount */ + 1 + (this._colorBlendValues.length - 3) * (this._alphaBlendValues.length - 1) * 3;
        this._defaultShaderPath = "../../Framework/Shaders/WebGL/";
        this._shaderPath = this._defaultShaderPath;
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        this.releaseShaderProgram();
      }
      /**
       * 描画用のシェーダプログラムの一連のセットアップを実行する
       *
       * @param renderer レンダラー
       * @param model 描画対象のモデル
       * @param index 描画対象のメッシュのインデックス
       */
      setupShaderProgramForDrawable(renderer, model, index) {
        if (!renderer.isPremultipliedAlpha()) {
          CubismLogError("NoPremultipliedAlpha is not allowed");
        }
        if (this._shaderSets.length == 0) {
          this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
          CubismLogWarning("Shader program is not initialized.");
          return;
        }
        let srcColor;
        let dstColor;
        let srcAlpha;
        let dstAlpha;
        const masked = renderer.getClippingContextBufferForDrawable() != null;
        const invertedMask = model.getDrawableInvertedMaskBit(index);
        const offset = masked ? invertedMask ? 2 : 1 : 0;
        let shaderSet;
        let isUsingCompatible = true;
        if (model.isBlendModeEnabled()) {
          const colorBlendMode = model.getDrawableColorBlend(index);
          const alphaBlendMode = model.getDrawableAlphaBlend(index);
          if (colorBlendMode == -1 /* ColorBlend_None */ || alphaBlendMode == -1 /* AlphaBlend_None */ || colorBlendMode == CubismColorBlend.ColorBlend_Normal && alphaBlendMode == 0 /* AlphaBlend_Over */) {
            shaderSet = this._shaderSets[1 /* ShaderNames_NormalPremultipliedAlpha */ + offset];
            srcColor = this.gl.ONE;
            dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
            srcAlpha = this.gl.ONE;
            dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
          } else {
            switch (colorBlendMode) {
              // Cubism 5.2以前のシェーダを使用する。
              case CubismColorBlend.ColorBlend_AddCompatible:
                shaderSet = this._shaderSets[4 /* ShaderNames_AddPremultipliedAlpha */ + offset];
                srcColor = this.gl.ONE;
                dstColor = this.gl.ONE;
                srcAlpha = this.gl.ZERO;
                dstAlpha = this.gl.ONE;
                break;
              // Cubism 5.2以前のシェーダを使用する。
              case CubismColorBlend.ColorBlend_MultiplyCompatible:
                shaderSet = this._shaderSets[7 /* ShaderNames_MultPremultipliedAlpha */ + offset];
                srcColor = this.gl.DST_COLOR;
                dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
                srcAlpha = this.gl.ZERO;
                dstAlpha = this.gl.ONE;
                break;
              // ブレンドモードの組み合わせでシェーダーを決定
              default:
                {
                  const srcBuffer = renderer._currentOffscreen != null ? renderer._currentOffscreen : renderer.getModelRenderTarget(0);
                  CubismRenderTarget_WebGL.copyBuffer(
                    this.gl,
                    srcBuffer,
                    renderer.getModelRenderTarget(1)
                  );
                  const baseShaderSetIndex = this._blendShaderSetMap.get(
                    this._colorBlendMap.get(colorBlendMode) + this._alphaBlendMap.get(alphaBlendMode)
                  );
                  shaderSet = this._shaderSets[baseShaderSetIndex + offset];
                  srcColor = this.gl.ONE;
                  dstColor = this.gl.ZERO;
                  srcAlpha = this.gl.ONE;
                  dstAlpha = this.gl.ZERO;
                  isUsingCompatible = false;
                }
                break;
            }
          }
        } else {
          switch (model.getDrawableBlendMode(index)) {
            case 0 /* CubismBlendMode_Normal */:
            default:
              shaderSet = this._shaderSets[1 /* ShaderNames_NormalPremultipliedAlpha */ + offset];
              srcColor = this.gl.ONE;
              dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
              srcAlpha = this.gl.ONE;
              dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
              break;
            case 1 /* CubismBlendMode_Additive */:
              shaderSet = this._shaderSets[4 /* ShaderNames_AddPremultipliedAlpha */ + offset];
              srcColor = this.gl.ONE;
              dstColor = this.gl.ONE;
              srcAlpha = this.gl.ZERO;
              dstAlpha = this.gl.ONE;
              break;
            case 2 /* CubismBlendMode_Multiplicative */:
              shaderSet = this._shaderSets[7 /* ShaderNames_MultPremultipliedAlpha */ + offset];
              srcColor = this.gl.DST_COLOR;
              dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
              srcAlpha = this.gl.ZERO;
              dstAlpha = this.gl.ONE;
              break;
          }
        }
        this.gl.useProgram(shaderSet.shaderProgram);
        if (renderer._bufferData.vertex == null) {
          renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        const vertexArray = model.getDrawableVertices(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributePositionLocation,
          2,
          this.gl.FLOAT,
          false,
          0,
          0
        );
        if (renderer._bufferData.uv == null) {
          renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        const uvArray = model.getDrawableVertexUvs(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributeTexCoordLocation,
          2,
          this.gl.FLOAT,
          false,
          0,
          0
        );
        if (masked) {
          this.gl.activeTexture(this.gl.TEXTURE1);
          const tex = renderer.getDrawableMaskBuffer(
            renderer.getClippingContextBufferForDrawable()._bufferIndex
          ).getColorBuffer();
          this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
          this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
          this.gl.uniformMatrix4fv(
            shaderSet.uniformClipMatrixLocation,
            false,
            renderer.getClippingContextBufferForDrawable()._matrixForDraw.getArray()
          );
          const channelIndex = renderer.getClippingContextBufferForDrawable()._layoutChannelIndex;
          const colorChannel = renderer.getClippingContextBufferForDrawable().getClippingManager().getChannelFlagAsColor(channelIndex);
          this.gl.uniform4f(
            shaderSet.uniformChannelFlagLocation,
            colorChannel.r,
            colorChannel.g,
            colorChannel.b,
            colorChannel.a
          );
          if (model.isBlendModeEnabled()) {
            this.gl.uniform1f(
              shaderSet.uniformInvertMaskFlagLocation,
              invertedMask ? 1 : 0
            );
          }
        }
        const textureNo = model.getDrawableTextureIndex(index);
        const textureId = renderer.getBindedTextures().get(textureNo);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        const matrix4x4 = renderer.getMvpMatrix();
        this.gl.uniformMatrix4fv(
          shaderSet.uniformMatrixLocation,
          false,
          matrix4x4.getArray()
        );
        let baseColor = null;
        if (model.isBlendModeEnabled()) {
          const drawableOpacity = model.getDrawableOpacity(index);
          baseColor = new CubismTextureColor(
            drawableOpacity,
            drawableOpacity,
            drawableOpacity,
            drawableOpacity
          );
        } else {
          baseColor = renderer.getModelColorWithOpacity(
            model.getDrawableOpacity(index)
          );
        }
        const multiplyAndScreenColor = model.getOverrideMultiplyAndScreenColor();
        const multiplyColor = multiplyAndScreenColor.getDrawableMultiplyColor(index);
        const screenColor = multiplyAndScreenColor.getDrawableScreenColor(index);
        this.gl.uniform4f(
          shaderSet.uniformBaseColorLocation,
          baseColor.r,
          baseColor.g,
          baseColor.b,
          baseColor.a
        );
        this.gl.uniform4f(
          shaderSet.uniformMultiplyColorLocation,
          multiplyColor.r,
          multiplyColor.g,
          multiplyColor.b,
          multiplyColor.a
        );
        this.gl.uniform4f(
          shaderSet.uniformScreenColorLocation,
          screenColor.r,
          screenColor.g,
          screenColor.b,
          screenColor.a
        );
        if (model.isBlendModeEnabled()) {
          this.gl.activeTexture(this.gl.TEXTURE2);
          if (!isUsingCompatible) {
            const tex = renderer.getModelRenderTarget(1).getColorBuffer();
            this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
            this.gl.uniform1i(shaderSet.samplerFrameBufferTextureLocation, 2);
          }
        }
        if (renderer._bufferData.index == null) {
          renderer._bufferData.index = this.gl.createBuffer();
        }
        const indexArray = model.getDrawableVertexIndices(index);
        this.gl.bindBuffer(
          this.gl.ELEMENT_ARRAY_BUFFER,
          renderer._bufferData.index
        );
        this.gl.bufferData(
          this.gl.ELEMENT_ARRAY_BUFFER,
          indexArray,
          this.gl.DYNAMIC_DRAW
        );
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
      }
      /**
       * オフスクリーン用のシェーダプログラムの一連のセットアップを実行する
       *
       * @param renderer レンダラー
       * @param model 描画対象のモデル
       * @param offscreen 描画対象のオフスクリーン
       */
      setupShaderProgramForOffscreen(renderer, model, offscreen) {
        if (!renderer.isPremultipliedAlpha()) {
          CubismLogError("NoPremultipliedAlpha is not allowed");
        }
        if (this._shaderSets.length == 0) {
          this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
          CubismLogWarning("Shader program is not initialized.");
          return;
        }
        let srcColor;
        let dstColor;
        let srcAlpha;
        let dstAlpha;
        const offscreenIndex = offscreen.getOffscreenIndex();
        const masked = renderer.getClippingContextBufferForOffscreen() != null;
        const invertedMask = model.getOffscreenInvertedMask(offscreenIndex);
        const offset = masked ? invertedMask ? 2 : 1 : 0;
        let shaderSet;
        let isUsingCompatible = true;
        const colorBlendMode = model.getOffscreenColorBlend(offscreenIndex);
        const alphaBlendMode = model.getOffscreenAlphaBlend(offscreenIndex);
        if (colorBlendMode == -1 /* ColorBlend_None */ || alphaBlendMode == -1 /* AlphaBlend_None */ || colorBlendMode == CubismColorBlend.ColorBlend_Normal && alphaBlendMode == 0 /* AlphaBlend_Over */) {
          shaderSet = this._shaderSets[1 /* ShaderNames_NormalPremultipliedAlpha */ + offset];
          srcColor = this.gl.ONE;
          dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
          srcAlpha = this.gl.ONE;
          dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
        } else {
          switch (colorBlendMode) {
            // Cubism 5.2以前のシェーダを使用する。
            case CubismColorBlend.ColorBlend_AddCompatible:
              shaderSet = this._shaderSets[4 /* ShaderNames_AddPremultipliedAlpha */ + offset];
              srcColor = this.gl.ONE;
              dstColor = this.gl.ONE;
              srcAlpha = this.gl.ZERO;
              dstAlpha = this.gl.ONE;
              break;
            case CubismColorBlend.ColorBlend_MultiplyCompatible:
              shaderSet = this._shaderSets[7 /* ShaderNames_MultPremultipliedAlpha */ + offset];
              srcColor = this.gl.DST_COLOR;
              dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
              srcAlpha = this.gl.ZERO;
              dstAlpha = this.gl.ONE;
              break;
            default:
              {
                const srcBuffer = offscreen.getOldOffscreen() != null ? offscreen.getOldOffscreen() : renderer.getModelRenderTarget(0);
                CubismRenderTarget_WebGL.copyBuffer(
                  this.gl,
                  srcBuffer,
                  renderer.getModelRenderTarget(1)
                );
                const baseShaderSetIndex = this._blendShaderSetMap.get(
                  this._colorBlendMap.get(colorBlendMode) + this._alphaBlendMap.get(alphaBlendMode)
                );
                shaderSet = this._shaderSets[baseShaderSetIndex + offset];
                srcColor = this.gl.ONE;
                dstColor = this.gl.ZERO;
                srcAlpha = this.gl.ONE;
                dstAlpha = this.gl.ZERO;
                isUsingCompatible = false;
              }
              break;
          }
        }
        this.gl.useProgram(shaderSet.shaderProgram);
        CubismRenderTarget_WebGL.copyBuffer(
          this.gl,
          offscreen,
          renderer.getModelRenderTarget(2)
        );
        this.gl.activeTexture(this.gl.TEXTURE0);
        const tex0 = renderer.getModelRenderTarget(2).getColorBuffer();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex0);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        const matrix4x4 = new CubismMatrix44();
        matrix4x4.loadIdentity();
        this.gl.uniformMatrix4fv(
          shaderSet.uniformMatrixLocation,
          false,
          matrix4x4.getArray()
        );
        const offscreenOpacity = model.getOffscreenOpacity(offscreenIndex);
        const baseColor = new CubismTextureColor(
          offscreenOpacity,
          offscreenOpacity,
          offscreenOpacity,
          offscreenOpacity
        );
        const multiplyAndScreenColor = model.getOverrideMultiplyAndScreenColor();
        const multiplyColor = multiplyAndScreenColor.getOffscreenMultiplyColor(offscreenIndex);
        const screenColor = multiplyAndScreenColor.getOffscreenScreenColor(offscreenIndex);
        this.gl.uniform4f(
          shaderSet.uniformBaseColorLocation,
          baseColor.r,
          baseColor.g,
          baseColor.b,
          baseColor.a
        );
        this.gl.uniform4f(
          shaderSet.uniformMultiplyColorLocation,
          multiplyColor.r,
          multiplyColor.g,
          multiplyColor.b,
          multiplyColor.a
        );
        this.gl.uniform4f(
          shaderSet.uniformScreenColorLocation,
          screenColor.r,
          screenColor.g,
          screenColor.b,
          screenColor.a
        );
        this.gl.activeTexture(this.gl.TEXTURE2);
        if (!isUsingCompatible) {
          const tex1 = renderer.getModelRenderTarget(1).getColorBuffer();
          this.gl.bindTexture(this.gl.TEXTURE_2D, tex1);
          this.gl.uniform1i(shaderSet.samplerFrameBufferTextureLocation, 2);
        }
        if (masked) {
          this.gl.activeTexture(this.gl.TEXTURE1);
          const tex2 = renderer.getOffscreenMaskBuffer(
            renderer.getClippingContextBufferForOffscreen()._bufferIndex
          ).getColorBuffer();
          this.gl.bindTexture(this.gl.TEXTURE_2D, tex2);
          this.gl.uniform1i(shaderSet.samplerTexture1Location, 1);
          this.gl.uniformMatrix4fv(
            shaderSet.uniformClipMatrixLocation,
            false,
            renderer.getClippingContextBufferForOffscreen()._matrixForDraw.getArray()
          );
          const channelIndex = renderer.getClippingContextBufferForOffscreen()._layoutChannelIndex;
          const colorChannel = renderer.getClippingContextBufferForOffscreen().getClippingManager().getChannelFlagAsColor(channelIndex);
          this.gl.uniform4f(
            shaderSet.uniformChannelFlagLocation,
            colorChannel.r,
            colorChannel.g,
            colorChannel.b,
            colorChannel.a
          );
          if (model.isBlendModeEnabled()) {
            this.gl.uniform1f(
              shaderSet.uniformInvertMaskFlagLocation,
              invertedMask ? 1 : 0
            );
          }
        }
        if (!renderer._bufferData.vertex) {
          renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          s_renderTargetVertexArray,
          this.gl.STATIC_DRAW
        );
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributePositionLocation,
          2,
          this.gl.FLOAT,
          false,
          Float32Array.BYTES_PER_ELEMENT * 2,
          0
        );
        if (!renderer._bufferData.uv) {
          renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          s_renderTargetReverseUvArray,
          this.gl.STATIC_DRAW
        );
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributeTexCoordLocation,
          2,
          this.gl.FLOAT,
          false,
          Float32Array.BYTES_PER_ELEMENT * 2,
          0
        );
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
      }
      /**
       * マスク用のシェーダプログラムの一連のセットアップを実行する
       *
       * @param renderer レンダラー
       * @param model 描画対象のモデル
       * @param index 描画対象のメッシュのインデックス
       */
      setupShaderProgramForMask(renderer, model, index) {
        if (!renderer.isPremultipliedAlpha()) {
          CubismLogError("NoPremultipliedAlpha is not allowed");
        }
        if (this._shaderSets.length == 0) {
          this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
          CubismLogWarning("Shader program is not initialized.");
          return;
        }
        const shaderSet = this._shaderSets[0 /* ShaderNames_SetupMask */];
        this.gl.useProgram(shaderSet.shaderProgram);
        if (renderer._bufferData.vertex == null) {
          renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        const vertexArray = model.getDrawableVertices(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, vertexArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributePositionLocation,
          2,
          this.gl.FLOAT,
          false,
          0,
          0
        );
        if (renderer._bufferData.uv == null) {
          renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        const textureNo = model.getDrawableTextureIndex(index);
        const textureId = renderer.getBindedTextures().get(textureNo);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textureId);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        if (renderer._bufferData.uv == null) {
          renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        const uvArray = model.getDrawableVertexUvs(index);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, uvArray, this.gl.DYNAMIC_DRAW);
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributeTexCoordLocation,
          2,
          this.gl.FLOAT,
          false,
          0,
          0
        );
        const channelIndex = renderer.getClippingContextBufferForMask()._layoutChannelIndex;
        const colorChannel = renderer.getClippingContextBufferForMask().getClippingManager().getChannelFlagAsColor(channelIndex);
        this.gl.uniform4f(
          shaderSet.uniformChannelFlagLocation,
          colorChannel.r,
          colorChannel.g,
          colorChannel.b,
          colorChannel.a
        );
        this.gl.uniformMatrix4fv(
          shaderSet.uniformClipMatrixLocation,
          false,
          renderer.getClippingContextBufferForMask()._matrixForMask.getArray()
        );
        const rect = renderer.getClippingContextBufferForMask()._layoutBounds;
        this.gl.uniform4f(
          shaderSet.uniformBaseColorLocation,
          rect.x * 2 - 1,
          rect.y * 2 - 1,
          rect.getRight() * 2 - 1,
          rect.getBottom() * 2 - 1
        );
        const srcColor = this.gl.ZERO;
        const dstColor = this.gl.ONE_MINUS_SRC_COLOR;
        const srcAlpha = this.gl.ZERO;
        const dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
        if (renderer._bufferData.index == null) {
          renderer._bufferData.index = this.gl.createBuffer();
        }
        const indexArray = model.getDrawableVertexIndices(index);
        this.gl.bindBuffer(
          this.gl.ELEMENT_ARRAY_BUFFER,
          renderer._bufferData.index
        );
        this.gl.bufferData(
          this.gl.ELEMENT_ARRAY_BUFFER,
          indexArray,
          this.gl.DYNAMIC_DRAW
        );
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
      }
      /**
       * オフスクリーンのレンダリングターゲット用のシェーダープログラムを設定する
       *
       * @param renderer レンダラー
       */
      setupShaderProgramForOffscreenRenderTarget(renderer) {
        if (this._shaderSets.length == 0) {
          this.generateShaders();
        }
        if (this._isShaderLoaded == false) {
          CubismLogWarning("Shader program is not initialized.");
          return;
        }
        const baseColor = renderer.getModelColor();
        baseColor.r *= baseColor.a;
        baseColor.g *= baseColor.a;
        baseColor.b *= baseColor.a;
        this.copyTexture(renderer, baseColor);
      }
      /**
       * オフスクリーンのレンダリングターゲットの内容をコピーする
       *
       * @param renderer レンダラー
       * @param baseColor ベースカラー
       */
      copyTexture(renderer, baseColor) {
        const srcColor = this.gl.ONE;
        const dstColor = this.gl.ONE_MINUS_SRC_ALPHA;
        const srcAlpha = this.gl.ONE;
        const dstAlpha = this.gl.ONE_MINUS_SRC_ALPHA;
        const shaderSet = this._shaderSets[10];
        this.gl.useProgram(shaderSet.shaderProgram);
        this.gl.uniform4f(
          shaderSet.uniformBaseColorLocation,
          baseColor.r,
          baseColor.g,
          baseColor.b,
          baseColor.a
        );
        this.gl.activeTexture(this.gl.TEXTURE0);
        const tex = renderer.getModelRenderTarget(0).getColorBuffer();
        this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
        this.gl.uniform1i(shaderSet.samplerTexture0Location, 0);
        if (!renderer._bufferData.vertex) {
          renderer._bufferData.vertex = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.vertex);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          s_renderTargetVertexArray,
          this.gl.STATIC_DRAW
        );
        this.gl.enableVertexAttribArray(shaderSet.attributePositionLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributePositionLocation,
          2,
          this.gl.FLOAT,
          false,
          Float32Array.BYTES_PER_ELEMENT * 2,
          0
        );
        if (!renderer._bufferData.uv) {
          renderer._bufferData.uv = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, renderer._bufferData.uv);
        this.gl.bufferData(
          this.gl.ARRAY_BUFFER,
          s_renderTargetUvArray,
          this.gl.STATIC_DRAW
        );
        this.gl.enableVertexAttribArray(shaderSet.attributeTexCoordLocation);
        this.gl.vertexAttribPointer(
          shaderSet.attributeTexCoordLocation,
          2,
          this.gl.FLOAT,
          false,
          Float32Array.BYTES_PER_ELEMENT * 2,
          0
        );
        this.gl.blendFuncSeparate(srcColor, dstColor, srcAlpha, dstAlpha);
      }
      /**
       * シェーダープログラムを解放する
       */
      releaseShaderProgram() {
        for (let i = 0; i < this._shaderSets.length; i++) {
          this.gl.deleteProgram(this._shaderSets[i].shaderProgram);
          this._shaderSets[i].shaderProgram = 0;
          this._shaderSets[i] = void 0;
          this._shaderSets[i] = null;
        }
      }
      /**
       * シェーダープログラムを初期化する
       *
       * @param vertShaderSrc 頂点シェーダのソース
       * @param fragShaderSrc フラグメントシェーダのソース
       */
      generateShaders() {
        if (this._isShaderLoading) {
          return;
        }
        this._isShaderLoading = true;
        this._isShaderLoaded = false;
        this._shaderSets.length = this._shaderCount;
        for (let i = 0; i < this._shaderCount; i++) {
          this._shaderSets[i] = new CubismShaderSet();
        }
        this.loadShaders().then(() => {
          this.registerShader();
          this.registerBlendShader();
          this._isShaderLoading = false;
          this._isShaderLoaded = true;
        }).catch((error) => {
          this._isShaderLoading = false;
          console.error("Failed to load shaders:", error);
        });
      }
      /**
       * シェーダープログラムを登録する
       */
      registerShader() {
        const vertexShaderSrc = this._vertShaderSrc;
        const vertexShaderSrcMasked = this._vertShaderSrcMasked;
        const vertexShaderSrcSetupMask = this._vertShaderSrcSetupMask;
        const fragmentShaderSrcSetupMask = this._fragShaderSrcSetupMask;
        const fragmentShaderSrcPremultipliedAlpha = this._fragShaderSrcPremultipliedAlpha;
        const fragmentShaderSrcMaskPremultipliedAlpha = this._fragShaderSrcMaskPremultipliedAlpha;
        const fragmentShaderSrcMaskInvertedPremultipliedAlpha = this._fragShaderSrcMaskInvertedPremultipliedAlpha;
        this._shaderSets[0].shaderProgram = this.loadShaderProgram(
          vertexShaderSrcSetupMask,
          fragmentShaderSrcSetupMask
        );
        this._shaderSets[1].shaderProgram = this.loadShaderProgram(
          vertexShaderSrc,
          fragmentShaderSrcPremultipliedAlpha
        );
        this._shaderSets[2].shaderProgram = this.loadShaderProgram(
          vertexShaderSrcMasked,
          fragmentShaderSrcMaskPremultipliedAlpha
        );
        this._shaderSets[3].shaderProgram = this.loadShaderProgram(
          vertexShaderSrcMasked,
          fragmentShaderSrcMaskInvertedPremultipliedAlpha
        );
        this._shaderSets[4].shaderProgram = this._shaderSets[1].shaderProgram;
        this._shaderSets[5].shaderProgram = this._shaderSets[2].shaderProgram;
        this._shaderSets[6].shaderProgram = this._shaderSets[3].shaderProgram;
        this._shaderSets[7].shaderProgram = this._shaderSets[1].shaderProgram;
        this._shaderSets[8].shaderProgram = this._shaderSets[2].shaderProgram;
        this._shaderSets[9].shaderProgram = this._shaderSets[3].shaderProgram;
        this._shaderSets[0].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[0].shaderProgram,
          "a_position"
        );
        this._shaderSets[0].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[0].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[0].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[0].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[0].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[0].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[0].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[0].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[0].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[0].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[1].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[1].shaderProgram,
          "a_position"
        );
        this._shaderSets[1].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[1].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[1].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[1].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[1].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[1].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[1].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[1].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[1].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[1].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[1].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[1].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[2].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[2].shaderProgram,
          "a_position"
        );
        this._shaderSets[2].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[2].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[2].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[2].samplerTexture1Location = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "s_texture1"
        );
        this._shaderSets[2].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[2].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[2].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[2].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[2].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[2].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[2].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[3].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[3].shaderProgram,
          "a_position"
        );
        this._shaderSets[3].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[3].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[3].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[3].samplerTexture1Location = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "s_texture1"
        );
        this._shaderSets[3].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[3].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[3].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[3].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[3].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[3].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[3].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[4].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[4].shaderProgram,
          "a_position"
        );
        this._shaderSets[4].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[4].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[4].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[4].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[4].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[4].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[4].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[4].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[4].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[4].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[4].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[4].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[5].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[5].shaderProgram,
          "a_position"
        );
        this._shaderSets[5].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[5].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[5].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[5].samplerTexture1Location = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "s_texture1"
        );
        this._shaderSets[5].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[5].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[5].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[5].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[5].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[5].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[5].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[6].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[6].shaderProgram,
          "a_position"
        );
        this._shaderSets[6].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[6].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[6].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[6].samplerTexture1Location = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "s_texture1"
        );
        this._shaderSets[6].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[6].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[6].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[6].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[6].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[6].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[6].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[7].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[7].shaderProgram,
          "a_position"
        );
        this._shaderSets[7].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[7].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[7].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[7].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[7].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[7].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[7].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[7].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[7].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[7].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[7].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[7].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[8].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[8].shaderProgram,
          "a_position"
        );
        this._shaderSets[8].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[8].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[8].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[8].samplerTexture1Location = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "s_texture1"
        );
        this._shaderSets[8].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[8].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[8].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[8].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[8].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[8].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[8].shaderProgram,
          "u_screenColor"
        );
        this._shaderSets[9].attributePositionLocation = this.gl.getAttribLocation(
          this._shaderSets[9].shaderProgram,
          "a_position"
        );
        this._shaderSets[9].attributeTexCoordLocation = this.gl.getAttribLocation(
          this._shaderSets[9].shaderProgram,
          "a_texCoord"
        );
        this._shaderSets[9].samplerTexture0Location = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "s_texture0"
        );
        this._shaderSets[9].samplerTexture1Location = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "s_texture1"
        );
        this._shaderSets[9].uniformMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "u_matrix"
        );
        this._shaderSets[9].uniformClipMatrixLocation = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "u_clipMatrix"
        );
        this._shaderSets[9].uniformChannelFlagLocation = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "u_channelFlag"
        );
        this._shaderSets[9].uniformBaseColorLocation = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "u_baseColor"
        );
        this._shaderSets[9].uniformMultiplyColorLocation = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "u_multiplyColor"
        );
        this._shaderSets[9].uniformScreenColorLocation = this.gl.getUniformLocation(
          this._shaderSets[9].shaderProgram,
          "u_screenColor"
        );
      }
      /**
       * ブレンドモード用のシェーダープログラムを登録する
       */
      registerBlendShader() {
        const vertShaderSrcCopy = this._vertShaderSrcCopy;
        const fragShaderSrcCopy = this._fragShaderSrcCopy;
        const copyShaderSet = this._shaderSets[10];
        copyShaderSet.shaderProgram = this.loadShaderProgram(
          vertShaderSrcCopy,
          fragShaderSrcCopy
        );
        copyShaderSet.attributeTexCoordLocation = this.gl.getAttribLocation(
          copyShaderSet.shaderProgram,
          "a_texCoord"
        );
        copyShaderSet.attributePositionLocation = this.gl.getAttribLocation(
          copyShaderSet.shaderProgram,
          "a_position"
        );
        copyShaderSet.uniformBaseColorLocation = this.gl.getUniformLocation(
          copyShaderSet.shaderProgram,
          "u_baseColor"
        );
        let shaderSetIndex = 11;
        for (let colorBlendIndex = 0; colorBlendIndex < this._colorBlendValues.length; colorBlendIndex++) {
          if (this._colorBlendValues[colorBlendIndex] == -1 /* ColorBlend_None */ || this._colorBlendValues[colorBlendIndex] == CubismColorBlend.ColorBlend_AddCompatible || this._colorBlendValues[colorBlendIndex] == CubismColorBlend.ColorBlend_MultiplyCompatible) {
            continue;
          }
          const colorBlendValue = this._colorBlendValues[colorBlendIndex];
          const colorBlendName = this._colorBlendMap.get(colorBlendValue).toUpperCase();
          const colorBlendMacro = `#define COLOR_BLEND_${colorBlendName}
`;
          for (let alphablendIndex = 0; alphablendIndex < this._alphaBlendValues.length; alphablendIndex++) {
            if (this._alphaBlendValues[alphablendIndex] == -1 /* AlphaBlend_None */ || this._colorBlendValues[colorBlendIndex] == CubismColorBlend.ColorBlend_Normal && this._alphaBlendValues[alphablendIndex] == 0 /* AlphaBlend_Over */) {
              continue;
            }
            const alphaBlendValue = this._alphaBlendValues[alphablendIndex];
            const alphaBlendName = this._alphaBlendMap.get(alphaBlendValue).toUpperCase();
            const alphaBlendMacro = `#define ALPHA_BLEND_${alphaBlendName}
`;
            this.generateBlendShader(
              colorBlendMacro,
              alphaBlendMacro,
              shaderSetIndex
            );
            this._blendShaderSetMap.set(
              this._colorBlendMap.get(this._colorBlendValues[colorBlendIndex]) + this._alphaBlendMap.get(this._alphaBlendValues[alphablendIndex]),
              shaderSetIndex
            );
            shaderSetIndex += 3 /* ShaderType_Count */;
          }
        }
      }
      /**
       * ブレンドモード用のシェーダープログラムを生成する
       *
       * @param colorBlendMacro カラーブレンド用のマクロ
       * @param alphaBlendMacro アルファブレンド用のマクロ
       * @param shaderSetBaseIndex _shaderSets のインデックス
       */
      generateBlendShader(colorBlendMacro, alphaBlendMacro, shaderSetBaseIndex) {
        for (let shaderTypeIndex = 0; shaderTypeIndex < 3 /* ShaderType_Count */; shaderTypeIndex++) {
          let vertexShaderSrc = "";
          let fragmentShaderStr = "precision mediump float;\n";
          const shaderSetIndex = shaderSetBaseIndex + shaderTypeIndex;
          fragmentShaderStr += colorBlendMacro;
          fragmentShaderStr += alphaBlendMacro;
          fragmentShaderStr += this._fragShaderSrcColorBlend;
          fragmentShaderStr += this._fragShaderSrcAlphaBlend;
          if (shaderTypeIndex == 1 /* ShaderType_Masked */ || shaderTypeIndex == 2 /* ShaderType_MaskedInverted */) {
            const clippingMaskMacro = "#define CLIPPING_MASK\n";
            vertexShaderSrc += clippingMaskMacro;
            fragmentShaderStr += clippingMaskMacro;
          }
          vertexShaderSrc += this._vertShaderSrcBlend;
          fragmentShaderStr += this._fragShaderSrcBlend;
          this._shaderSets[shaderSetIndex].shaderProgram = this.loadShaderProgram(
            vertexShaderSrc,
            fragmentShaderStr
          );
          this._shaderSets[shaderSetIndex].attributePositionLocation = this.gl.getAttribLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "a_position"
          );
          this._shaderSets[shaderSetIndex].attributeTexCoordLocation = this.gl.getAttribLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "a_texCoord"
          );
          this._shaderSets[shaderSetIndex].samplerTexture0Location = this.gl.getUniformLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "s_texture0"
          );
          this._shaderSets[shaderSetIndex].uniformMatrixLocation = this.gl.getUniformLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "u_matrix"
          );
          this._shaderSets[shaderSetIndex].uniformBaseColorLocation = this.gl.getUniformLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "u_baseColor"
          );
          this._shaderSets[shaderSetIndex].uniformMultiplyColorLocation = this.gl.getUniformLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "u_multiplyColor"
          );
          this._shaderSets[shaderSetIndex].uniformScreenColorLocation = this.gl.getUniformLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "u_screenColor"
          );
          this._shaderSets[shaderSetIndex].samplerFrameBufferTextureLocation = this.gl.getUniformLocation(
            this._shaderSets[shaderSetIndex].shaderProgram,
            "s_blendTexture"
          );
          if (shaderTypeIndex == 1 /* ShaderType_Masked */ || shaderTypeIndex == 2 /* ShaderType_MaskedInverted */) {
            this._shaderSets[shaderSetIndex].samplerTexture1Location = this.gl.getUniformLocation(
              this._shaderSets[shaderSetIndex].shaderProgram,
              "s_texture1"
            );
            this._shaderSets[shaderSetIndex].uniformClipMatrixLocation = this.gl.getUniformLocation(
              this._shaderSets[shaderSetIndex].shaderProgram,
              "u_clipMatrix"
            );
            this._shaderSets[shaderSetIndex].uniformChannelFlagLocation = this.gl.getUniformLocation(
              this._shaderSets[shaderSetIndex].shaderProgram,
              "u_channelFlag"
            );
            this._shaderSets[shaderSetIndex].uniformInvertMaskFlagLocation = this.gl.getUniformLocation(
              this._shaderSets[shaderSetIndex].shaderProgram,
              "u_invertClippingMask"
            );
          }
        }
      }
      /**
       * シェーダプログラムをロードしてアドレスを返す
       *
       * @param vertexShaderSource    頂点シェーダのソース
       * @param fragmentShaderSource  フラグメントシェーダのソース
       *
       * @return シェーダプログラムのアドレス
       */
      loadShaderProgram(vertexShaderSource, fragmentShaderSource) {
        let shaderProgram = this.gl.createProgram();
        let vertShader = this.compileShaderSource(
          this.gl.VERTEX_SHADER,
          vertexShaderSource
        );
        if (!vertShader) {
          CubismLogError("Vertex shader compile error!");
          return 0;
        }
        let fragShader = this.compileShaderSource(
          this.gl.FRAGMENT_SHADER,
          fragmentShaderSource
        );
        if (!fragShader) {
          CubismLogError("Fragment shader compile error!");
          return 0;
        }
        this.gl.attachShader(shaderProgram, vertShader);
        this.gl.attachShader(shaderProgram, fragShader);
        this.gl.linkProgram(shaderProgram);
        const linkStatus = this.gl.getProgramParameter(
          shaderProgram,
          this.gl.LINK_STATUS
        );
        if (!linkStatus) {
          CubismLogError("Failed to link program: {0}", shaderProgram);
          this.gl.deleteShader(vertShader);
          vertShader = 0;
          this.gl.deleteShader(fragShader);
          fragShader = 0;
          if (shaderProgram) {
            this.gl.deleteProgram(shaderProgram);
            shaderProgram = 0;
          }
          return 0;
        }
        this.gl.deleteShader(vertShader);
        this.gl.deleteShader(fragShader);
        return shaderProgram;
      }
      /**
       * シェーダープログラムをコンパイルする
       *
       * @param shaderType シェーダタイプ(Vertex/Fragment)
       * @param shaderSource シェーダソースコード
       *
       * @return コンパイルされたシェーダープログラム
       */
      compileShaderSource(shaderType, shaderSource) {
        const source = shaderSource;
        const shader = this.gl.createShader(shaderType);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        if (!shader) {
          const log = this.gl.getShaderInfoLog(shader);
          CubismLogError("Shader compile log: {0} ", log);
        }
        const status = this.gl.getShaderParameter(
          shader,
          this.gl.COMPILE_STATUS
        );
        if (!status) {
          const log = this.gl.getShaderInfoLog(shader);
          CubismLogError("Shader compile log: {0} ", log);
          this.gl.deleteShader(shader);
          return null;
        }
        return shader;
      }
      /**
       * WebGLレンダリングコンテキストを設定する
       *
       * @param gl WebGLレンダリングコンテキスト
       */
      setGl(gl) {
        this.gl = gl;
      }
      /**
       * ブレンドモード用のシェーダーパスを設定する
       *
       * @param shaderPath シェーダーパス
       */
      setShaderPath(shaderPath) {
        this._shaderPath = shaderPath;
      }
      /**
       * シェーダーパスを取得する
       *
       * @return シェーダーパス
       */
      getShaderPath() {
        return this._shaderPath;
      }
      _shaderSets;
      // ロードしたシェーダープログラムを保持する変数
      gl;
      // webglコンテキスト
      _colorBlendMap;
      // カラーブレンドの値と名称を紐づけする変数
      _alphaBlendMap;
      // アルファブレンドの値と名称を紐づけする変数
      _colorBlendValues;
      // カラーブレンドの値を保持する変数
      _alphaBlendValues;
      // アルファブレンドの値を保持する変数
      _blendShaderSetMap;
      // ブレンドモード用のシェーダーの名称とインデックスを紐づけする変数
      _shaderCount;
      // シェーダープログラムの数
      _vertShaderSrc;
      // 頂点シェーダーのソース
      _vertShaderSrcMasked;
      // マスク用の頂点シェーダーのソース
      _vertShaderSrcSetupMask;
      // マスク用の頂点シェーダーのソース
      _fragShaderSrcSetupMask;
      // マスク用のフラグメントシェーダーのソース
      _fragShaderSrcPremultipliedAlpha;
      // プレマルチプライドアルファ用のフラグメントシェーダーのソース
      _fragShaderSrcMaskPremultipliedAlpha;
      // マスク用プレマルチプライドアルファのフラグメントシェーダーのソース
      _fragShaderSrcMaskInvertedPremultipliedAlpha;
      // 反転マスク用プレマルチプライドアルファのフラグメントシェーダーのソース
      _vertShaderSrcCopy;
      // 頂点シェーダーのソース
      _fragShaderSrcCopy;
      // コピー用のフラグメントシェーダーのソース
      _fragShaderSrcColorBlend;
      // ブレンドモード用のシェーダーのソース
      _fragShaderSrcAlphaBlend;
      // アルファブレンド用のシェーダーのソース
      _vertShaderSrcBlend;
      // 頂点シェーダーのソース
      _fragShaderSrcBlend;
      // フラグメントシェーダーのソース
      _isShaderLoading;
      // シェーダーの読み込み中かどうか
      _isShaderLoaded;
      // シェーダーの読み込みが完了したかどうか
      _defaultShaderPath;
      // デフォルトのシェーダーパス
      _shaderPath;
      // シェーダーパス
    };
    CubismShaderManager_WebGL = class _CubismShaderManager_WebGL {
      /**
       * インスタンスを取得する（シングルトン）
       *
       * @return インスタンス
       */
      static getInstance() {
        if (s_instance == null) {
          s_instance = new _CubismShaderManager_WebGL();
        }
        return s_instance;
      }
      /**
       * インスタンスを開放する（シングルトン）
       */
      static deleteInstance() {
        if (s_instance) {
          s_instance.release();
          s_instance = null;
        }
      }
      /**
       * Privateなコンストラクタ
       */
      constructor() {
        this._shaderMap = /* @__PURE__ */ new Map();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        for (const item of this._shaderMap) {
          item[1].release();
        }
        this._shaderMap.clear();
      }
      /**
       * GLContextをキーにShaderを取得する
       *
       * @param gl glコンテキスト
       *
       * @return shaderを返す
       */
      getShader(gl) {
        return this._shaderMap.get(gl);
      }
      /**
       * GLContextを登録する
       *
       * @param gl glコンテキスト
       */
      setGlContext(gl) {
        if (!this._shaderMap.has(gl)) {
          const instance2 = new CubismShader_WebGL();
          instance2.setGl(gl);
          this._shaderMap.set(gl, instance2);
        }
      }
      /**
       * GLContextごとのShaderを保持する変数
       */
      _shaderMap;
    };
    CubismShaderSet = class {
      shaderProgram;
      // シェーダープログラムのアドレス
      attributePositionLocation;
      // シェーダープログラムに渡す変数のアドレス（Position）
      attributeTexCoordLocation;
      // シェーダープログラムに渡す変数のアドレス（TexCoord）
      uniformMatrixLocation;
      // シェーダープログラムに渡す変数のアドレス（Matrix）
      uniformClipMatrixLocation;
      // シェーダープログラムに渡す変数のアドレス（ClipMatrix）
      samplerTexture0Location;
      // シェーダープログラムに渡す変数のアドレス（Texture0）
      samplerTexture1Location;
      // シェーダープログラムに渡す変数のアドレス（Texture1）
      uniformBaseColorLocation;
      // シェーダープログラムに渡す変数のアドレス（BaseColor）
      uniformChannelFlagLocation;
      // シェーダープログラムに渡す変数のアドレス（ChannelFlag）
      uniformMultiplyColorLocation;
      // シェーダープログラムに渡す変数のアドレス（MultiplyColor）
      uniformScreenColorLocation;
      // シェーダープログラムに渡す変数のアドレス（ScreenColor）
      samplerFrameBufferTextureLocation;
      // シェーダープログラムに渡す変数のアドレス（BlendTexture）
      uniformInvertMaskFlagLocation;
      // シェーダープログラムに渡す変数のアドレス（InvertMask）
    };
    ShaderNames = /* @__PURE__ */ ((ShaderNames2) => {
      ShaderNames2[ShaderNames2["ShaderNames_SetupMask"] = 0] = "ShaderNames_SetupMask";
      ShaderNames2[ShaderNames2["ShaderNames_NormalPremultipliedAlpha"] = 1] = "ShaderNames_NormalPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_NormalMaskedPremultipliedAlpha"] = 2] = "ShaderNames_NormalMaskedPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_NomralMaskedInvertedPremultipliedAlpha"] = 3] = "ShaderNames_NomralMaskedInvertedPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_AddPremultipliedAlpha"] = 4] = "ShaderNames_AddPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_AddMaskedPremultipliedAlpha"] = 5] = "ShaderNames_AddMaskedPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_AddMaskedPremultipliedAlphaInverted"] = 6] = "ShaderNames_AddMaskedPremultipliedAlphaInverted";
      ShaderNames2[ShaderNames2["ShaderNames_MultPremultipliedAlpha"] = 7] = "ShaderNames_MultPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_MultMaskedPremultipliedAlpha"] = 8] = "ShaderNames_MultMaskedPremultipliedAlpha";
      ShaderNames2[ShaderNames2["ShaderNames_MultMaskedPremultipliedAlphaInverted"] = 9] = "ShaderNames_MultMaskedPremultipliedAlphaInverted";
      ShaderNames2[ShaderNames2["ShaderNames_ShaderCount"] = 10] = "ShaderNames_ShaderCount";
      return ShaderNames2;
    })(ShaderNames || {});
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismShaderSet = CubismShaderSet;
      Live2DCubismFramework51.CubismShader_WebGL = CubismShader_WebGL;
      Live2DCubismFramework51.CubismShaderManager_WebGL = CubismShaderManager_WebGL;
      Live2DCubismFramework51.ShaderNames = ShaderNames;
    })(Live2DCubismFramework34 || (Live2DCubismFramework34 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismoffscreenrendertarget_webgl.ts
var CubismOffscreenRenderTarget_WebGL;
var init_cubismoffscreenrendertarget_webgl = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismoffscreenrendertarget_webgl.ts"() {
    init_cubismrendertarget_webgl();
    init_cubismoffscreenmanager();
    init_cubismdebug();
    CubismOffscreenRenderTarget_WebGL = class extends CubismRenderTarget_WebGL {
      /**
       * リソースコンテナマネージャを初期化する。
       *
       * @param displayBufferWidth レンダーターゲットの幅
       * @param displayBufferHeight レンダーターゲットの高さ
       */
      initializeOffscreenManager(gl, displayBufferWidth, displayBufferHeight) {
        this._gl = gl;
        this._webGLOffscreenManager = CubismWebGLOffscreenManager.getInstance();
        if (this._webGLOffscreenManager.getContainerSize(gl) === 0) {
          this._webGLOffscreenManager.initialize(
            gl,
            displayBufferWidth,
            displayBufferHeight
          );
        }
      }
      /**
       * オフスクリーン描画用レンダーターゲットをセットする。
       *
       * @param gl WebGLRenderingContextまたはWebGL2RenderingContext
       *          NOTE: Cubism 5.3以降のモデルが使用される場合はWebGL2RenderingContextを使用すること。
       * @param displayBufferWidth レンダーターゲットの幅
       * @param displayBufferHeight レンダーターゲットの高さ
       * @param previousFramebuffer 前のフレームバッファ
       */
      setOffscreenRenderTarget(gl, displayBufferWidth, displayBufferHeight, previousFramebuffer) {
        if (this._webGLOffscreenManager == null) {
          this.initializeOffscreenManager(
            gl,
            displayBufferWidth,
            displayBufferHeight
          );
        }
        const offscreenRenderTargetContainer = this._webGLOffscreenManager.getOffscreenRenderTargetContainers(
          gl,
          displayBufferWidth,
          displayBufferHeight,
          previousFramebuffer
        );
        if (offscreenRenderTargetContainer == null) {
          CubismLogError("Failed to acquire offscreen render texture container.");
          return;
        }
        this._colorBuffer = offscreenRenderTargetContainer.getColorBuffer();
        this._renderTexture = offscreenRenderTargetContainer.getRenderTexture();
        this._bufferWidth = displayBufferWidth;
        this._bufferHeight = displayBufferHeight;
        this._gl = gl;
        if (this._renderTexture == null) {
          this._renderTexture = previousFramebuffer;
          CubismLogError("Failed to create offscreen render texture.");
        }
        return;
      }
      /**
       * リソースコンテナの使用状態を取得
       *
       * @return 使用中はtrue、未使用の場合はfalse
       */
      getUsingRenderTextureState() {
        if (this._webGLOffscreenManager == null || this._gl == null) {
          return true;
        }
        return this._webGLOffscreenManager.getUsingRenderTextureState(
          this._gl,
          this._renderTexture
        );
      }
      /**
       * リソースコンテナの使用を開始する。
       */
      startUsingRenderTexture() {
        if (this._webGLOffscreenManager == null || this._gl == null) {
          return;
        }
        this._webGLOffscreenManager.startUsingRenderTexture(
          this._gl,
          this._renderTexture
        );
      }
      /**
       * リソースコンテナの使用を終了する。
       */
      stopUsingRenderTexture() {
        if (this._webGLOffscreenManager == null || this._gl == null) {
          return;
        }
        this._webGLOffscreenManager.stopUsingRenderTexture(
          this._gl,
          this._renderTexture
        );
      }
      /**
       * オフスクリーンのインデックスを設定する。
       *
       * @param offscreenIndex オフスクリーンのインデックス
       */
      setOffscreenIndex(offscreenIndex) {
        this._offscreenIndex = offscreenIndex;
      }
      /**
       * オフスクリーンのインデックスを取得する。
       *
       * @return オフスクリーンのインデックス
       */
      getOffscreenIndex() {
        return this._offscreenIndex;
      }
      /**
       * 以前のオフスクリーン描画用レンダーターゲットを設定する。
       *
       * @param oldOffscreen 以前のオフスクリーン描画用レンダーターゲット
       */
      setOldOffscreen(oldOffscreen) {
        this._oldOffscreen = oldOffscreen;
      }
      /**
       * 以前のオフスクリーン描画用レンダーターゲットを取得する。
       *
       * @return 以前のオフスクリーン描画用レンダーターゲット
       */
      getOldOffscreen() {
        return this._oldOffscreen;
      }
      /**
       * 親のオフスクリーン描画用レンダーターゲットを設定する。
       *
       * @param parentOffscreenRenderTarget 親のオフスクリーン描画用レンダーターゲット
       */
      setParentPartOffscreen(parentOffscreenRenderTarget) {
        this._parentOffscreenRenderTarget = parentOffscreenRenderTarget;
      }
      /**
       * 親のオフスクリーン描画用レンダーターゲットを取得する。
       *
       * @return 親のオフスクリーン描画用レンダーターゲット
       */
      getParentPartOffscreen() {
        return this._parentOffscreenRenderTarget;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._offscreenIndex = -1;
        this._parentOffscreenRenderTarget = null;
        this._oldOffscreen = null;
        this._webGLOffscreenManager = null;
      }
      release() {
        if (this._webGLOffscreenManager != null && this._gl != null && this._renderTexture != null) {
          this._webGLOffscreenManager.stopUsingRenderTexture(
            this._gl,
            this._renderTexture
          );
        }
        if (this._colorBuffer && this._gl) {
          this._gl.deleteTexture(this._colorBuffer);
          this._colorBuffer = null;
        }
        if (this._renderTexture && this._gl) {
          this._gl.deleteFramebuffer(this._renderTexture);
          this._renderTexture = null;
        }
        if (this._webGLOffscreenManager != null) {
          this._webGLOffscreenManager = null;
        }
        this._oldOffscreen = null;
        this._parentOffscreenRenderTarget = null;
      }
      _offscreenIndex;
      // オフスクリーンのインデックス
      _parentOffscreenRenderTarget;
      // 親のオフスクリーン描画用レンダーターゲット
      _oldOffscreen;
      // 以前のオフスクリーン描画用レンダーターゲット
      _webGLOffscreenManager;
      // オフスクリーン描画用レンダーターゲットマネージャ
      _gl;
      // WebGLコンテキスト
    };
  }
});

// vendor/live2d/sdk/Framework/src/rendering/cubismrenderer_webgl.ts
var s_invalidValue, s_renderTargetIndexArray, CubismClippingManager_WebGL, CubismClippingContext_WebGL, CubismRendererProfile_WebGL, CubismRenderer_WebGL, Live2DCubismFramework35;
var init_cubismrenderer_webgl = __esm({
  "vendor/live2d/sdk/Framework/src/rendering/cubismrenderer_webgl.ts"() {
    init_cubismmodel();
    init_cubismdebug();
    init_cubismarrayutils();
    init_cubismclippingmanager();
    init_cubismrenderer();
    init_cubismshader_webgl();
    init_cubismrenderer_webgl();
    init_cubismrendertarget_webgl();
    init_cubismoffscreenrendertarget_webgl();
    s_invalidValue = -1;
    s_renderTargetIndexArray = new Uint16Array([
      0,
      1,
      2,
      2,
      1,
      3
    ]);
    CubismClippingManager_WebGL = class extends CubismClippingManager {
      /**
       * WebGLレンダリングコンテキストを設定する
       *
       * @param gl WebGLレンダリングコンテキスト
       */
      setGL(gl) {
        this.gl = gl;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        super(CubismClippingContext_WebGL);
      }
      /**
       * クリッピングコンテキストを作成する。モデル描画時に実行する。
       *
       * @param model モデルのインスタンス
       * @param renderer レンダラのインスタンス
       * @param lastFbo フレームバッファ
       * @param lastViewport ビューポート
       * @param drawObjectType 描画オブジェクトのタイプ
       */
      setupClippingContext(model, renderer, lastFbo, lastViewport, drawObjectType) {
        let usingClipCount = 0;
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
          const cc = this._clippingContextListForMask[clipIndex];
          switch (drawObjectType) {
            case 0 /* DrawableObjectType_Drawable */:
            default:
              this.calcClippedDrawableTotalBounds(model, cc);
              break;
            case 1 /* DrawableObjectType_Offscreen */:
              this.calcClippedOffscreenTotalBounds(model, cc);
              break;
          }
          if (cc._isUsing) {
            usingClipCount++;
          }
        }
        if (usingClipCount <= 0) {
          return;
        }
        this.gl.viewport(
          0,
          0,
          this._clippingMaskBufferSize,
          this._clippingMaskBufferSize
        );
        switch (drawObjectType) {
          case 0 /* DrawableObjectType_Drawable */:
          default:
            this._currentMaskBuffer = renderer.getDrawableMaskBuffer(0);
            break;
          case 1 /* DrawableObjectType_Offscreen */:
            this._currentMaskBuffer = renderer.getOffscreenMaskBuffer(0);
            break;
        }
        this._currentMaskBuffer.beginDraw(lastFbo);
        renderer.preDraw();
        this.setupLayoutBounds(usingClipCount);
        if (this._clearedMaskBufferFlags.length != this._renderTextureCount) {
          this._clearedMaskBufferFlags.length = 0;
          this._clearedMaskBufferFlags = new Array(
            this._renderTextureCount
          );
          for (let i = 0; i < this._clearedMaskBufferFlags.length; i++) {
            this._clearedMaskBufferFlags[i] = false;
          }
        }
        for (let index = 0; index < this._clearedMaskBufferFlags.length; index++) {
          this._clearedMaskBufferFlags[index] = false;
        }
        for (let clipIndex = 0; clipIndex < this._clippingContextListForMask.length; clipIndex++) {
          const clipContext = this._clippingContextListForMask[clipIndex];
          const allClipedDrawRect = clipContext._allClippedDrawRect;
          const layoutBoundsOnTex01 = clipContext._layoutBounds;
          const margin = 0.05;
          let scaleX = 0;
          let scaleY = 0;
          let maskBuffer;
          switch (drawObjectType) {
            case 0 /* DrawableObjectType_Drawable */:
            default:
              maskBuffer = renderer.getDrawableMaskBuffer(clipContext._bufferIndex);
              break;
            case 1 /* DrawableObjectType_Offscreen */:
              maskBuffer = renderer.getOffscreenMaskBuffer(
                clipContext._bufferIndex
              );
              break;
          }
          if (this._currentMaskBuffer != maskBuffer) {
            this._currentMaskBuffer.endDraw();
            this._currentMaskBuffer = maskBuffer;
            this._currentMaskBuffer.beginDraw(lastFbo);
            renderer.preDraw();
          }
          this._tmpBoundsOnModel.setRect(allClipedDrawRect);
          this._tmpBoundsOnModel.expand(
            allClipedDrawRect.width * margin,
            allClipedDrawRect.height * margin
          );
          scaleX = layoutBoundsOnTex01.width / this._tmpBoundsOnModel.width;
          scaleY = layoutBoundsOnTex01.height / this._tmpBoundsOnModel.height;
          this.createMatrixForMask(false, layoutBoundsOnTex01, scaleX, scaleY);
          clipContext._matrixForMask.setMatrix(this._tmpMatrixForMask.getArray());
          clipContext._matrixForDraw.setMatrix(this._tmpMatrixForDraw.getArray());
          if (drawObjectType == 1 /* DrawableObjectType_Offscreen */) {
            const invertMvp = renderer.getMvpMatrix().getInvert();
            clipContext._matrixForDraw.multiplyByMatrix(invertMvp);
          }
          const clipDrawCount = clipContext._clippingIdCount;
          for (let i = 0; i < clipDrawCount; i++) {
            const clipDrawIndex = clipContext._clippingIdList[i];
            if (!model.getDrawableDynamicFlagVertexPositionsDidChange(clipDrawIndex)) {
              continue;
            }
            renderer.setIsCulling(model.getDrawableCulling(clipDrawIndex) != false);
            if (!this._clearedMaskBufferFlags[clipContext._bufferIndex]) {
              this.gl.clearColor(1, 1, 1, 1);
              this.gl.clear(this.gl.COLOR_BUFFER_BIT);
              this._clearedMaskBufferFlags[clipContext._bufferIndex] = true;
            }
            renderer.setClippingContextBufferForMask(clipContext);
            renderer.drawMeshWebGL(model, clipDrawIndex);
          }
        }
        this._currentMaskBuffer.endDraw();
        renderer.setClippingContextBufferForMask(null);
        this.gl.viewport(
          lastViewport[0],
          lastViewport[1],
          lastViewport[2],
          lastViewport[3]
        );
      }
      /**
       * マスクの合計数をカウント
       *
       * @return マスクの合計数を返す
       */
      getClippingMaskCount() {
        return this._clippingContextListForMask.length;
      }
      _currentMaskBuffer;
      // マスク用オフスクリーンサーフェス
      gl;
      // WebGLレンダリングコンテキスト
    };
    CubismClippingContext_WebGL = class extends CubismClippingContext {
      /**
       * 引数付きコンストラクタ
       *
       * @param manager マスクを管理しているマネージャのインスタンス
       * @param clippingDrawableIndices クリップしているDrawableのインデックスリスト
       * @param clipCount クリップしているDrawableの個数
       */
      constructor(manager, clippingDrawableIndices, clipCount) {
        super(clippingDrawableIndices, clipCount);
        this._owner = manager;
      }
      /**
       * このマスクを管理するマネージャのインスタンスを取得する
       *
       * @return クリッピングマネージャのインスタンス
       */
      getClippingManager() {
        return this._owner;
      }
      /**
       * WebGLレンダリングコンテキストを設定する
       *
       * @param gl WebGLレンダリングコンテキスト
       */
      setGl(gl) {
        this._owner.setGL(gl);
      }
      _owner;
      // このマスクを管理しているマネージャのインスタンス
    };
    CubismRendererProfile_WebGL = class {
      /**
       * WebGLの有効・無効をセットする
       *
       * @param index 有効・無効にする機能
       * @param enabled trueなら有効にする
       */
      setGlEnable(index, enabled) {
        if (enabled) this.gl.enable(index);
        else this.gl.disable(index);
      }
      /**
       * WebGLのVertex Attribute Array機能の有効・無効をセットする
       *
       * @param   index   有効・無効にする機能
       * @param   enabled trueなら有効にする
       */
      setGlEnableVertexAttribArray(index, enabled) {
        if (enabled) this.gl.enableVertexAttribArray(index);
        else this.gl.disableVertexAttribArray(index);
      }
      /**
       * WebGLのステートを保持する
       */
      save() {
        if (this.gl == null) {
          CubismLogError(
            "'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function."
          );
          return;
        }
        this._lastArrayBufferBinding = this.gl.getParameter(
          this.gl.ARRAY_BUFFER_BINDING
        );
        this._lastElementArrayBufferBinding = this.gl.getParameter(
          this.gl.ELEMENT_ARRAY_BUFFER_BINDING
        );
        this._lastProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
        this._lastActiveTexture = this.gl.getParameter(this.gl.ACTIVE_TEXTURE);
        this.gl.activeTexture(this.gl.TEXTURE1);
        this._lastTexture1Binding2D = this.gl.getParameter(
          this.gl.TEXTURE_BINDING_2D
        );
        this.gl.activeTexture(this.gl.TEXTURE0);
        this._lastTexture0Binding2D = this.gl.getParameter(
          this.gl.TEXTURE_BINDING_2D
        );
        this._lastVertexAttribArrayEnabled[0] = this.gl.getVertexAttrib(
          0,
          this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
        );
        this._lastVertexAttribArrayEnabled[1] = this.gl.getVertexAttrib(
          1,
          this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
        );
        this._lastVertexAttribArrayEnabled[2] = this.gl.getVertexAttrib(
          2,
          this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
        );
        this._lastVertexAttribArrayEnabled[3] = this.gl.getVertexAttrib(
          3,
          this.gl.VERTEX_ATTRIB_ARRAY_ENABLED
        );
        this._lastScissorTest = this.gl.isEnabled(this.gl.SCISSOR_TEST);
        this._lastStencilTest = this.gl.isEnabled(this.gl.STENCIL_TEST);
        this._lastDepthTest = this.gl.isEnabled(this.gl.DEPTH_TEST);
        this._lastCullFace = this.gl.isEnabled(this.gl.CULL_FACE);
        this._lastBlend = this.gl.isEnabled(this.gl.BLEND);
        this._lastFrontFace = this.gl.getParameter(this.gl.FRONT_FACE);
        this._lastColorMask = this.gl.getParameter(this.gl.COLOR_WRITEMASK);
        this._lastBlending[0] = this.gl.getParameter(this.gl.BLEND_SRC_RGB);
        this._lastBlending[1] = this.gl.getParameter(this.gl.BLEND_DST_RGB);
        this._lastBlending[2] = this.gl.getParameter(this.gl.BLEND_SRC_ALPHA);
        this._lastBlending[3] = this.gl.getParameter(this.gl.BLEND_DST_ALPHA);
      }
      /**
       * 保持したWebGLのステートを復帰させる
       */
      restore() {
        if (this.gl == null) {
          CubismLogError(
            "'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function."
          );
          return;
        }
        this.gl.useProgram(this._lastProgram);
        this.setGlEnableVertexAttribArray(0, this._lastVertexAttribArrayEnabled[0]);
        this.setGlEnableVertexAttribArray(1, this._lastVertexAttribArrayEnabled[1]);
        this.setGlEnableVertexAttribArray(2, this._lastVertexAttribArrayEnabled[2]);
        this.setGlEnableVertexAttribArray(3, this._lastVertexAttribArrayEnabled[3]);
        this.setGlEnable(this.gl.SCISSOR_TEST, this._lastScissorTest);
        this.setGlEnable(this.gl.STENCIL_TEST, this._lastStencilTest);
        this.setGlEnable(this.gl.DEPTH_TEST, this._lastDepthTest);
        this.setGlEnable(this.gl.CULL_FACE, this._lastCullFace);
        this.setGlEnable(this.gl.BLEND, this._lastBlend);
        this.gl.frontFace(this._lastFrontFace);
        this.gl.colorMask(
          this._lastColorMask[0],
          this._lastColorMask[1],
          this._lastColorMask[2],
          this._lastColorMask[3]
        );
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this._lastArrayBufferBinding);
        this.gl.bindBuffer(
          this.gl.ELEMENT_ARRAY_BUFFER,
          this._lastElementArrayBufferBinding
        );
        this.gl.activeTexture(this.gl.TEXTURE1);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture1Binding2D);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this._lastTexture0Binding2D);
        this.gl.activeTexture(this._lastActiveTexture);
        this.gl.blendFuncSeparate(
          this._lastBlending[0],
          this._lastBlending[1],
          this._lastBlending[2],
          this._lastBlending[3]
        );
      }
      /**
       * WebGLレンダリングコンテキストを設定する
       *
       * @param gl WebGLレンダリングコンテキスト
       */
      setGl(gl) {
        this.gl = gl;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._lastVertexAttribArrayEnabled = new Array(4);
        this._lastColorMask = new Array(4);
        this._lastBlending = new Array(4);
      }
      _lastArrayBufferBinding;
      ///< モデル描画直前の頂点バッファ
      _lastElementArrayBufferBinding;
      ///< モデル描画直前のElementバッファ
      _lastProgram;
      ///< モデル描画直前のシェーダプログラムバッファ
      _lastActiveTexture;
      ///< モデル描画直前のアクティブなテクスチャ
      _lastTexture0Binding2D;
      ///< モデル描画直前のテクスチャユニット0
      _lastTexture1Binding2D;
      ///< モデル描画直前のテクスチャユニット1
      _lastVertexAttribArrayEnabled;
      ///< モデル描画直前のテクスチャユニット1
      _lastScissorTest;
      ///< モデル描画直前のGL_VERTEX_ATTRIB_ARRAY_ENABLEDパラメータ
      _lastBlend;
      ///< モデル描画直前のGL_SCISSOR_TESTパラメータ
      _lastStencilTest;
      ///< モデル描画直前のGL_STENCIL_TESTパラメータ
      _lastDepthTest;
      ///< モデル描画直前のGL_DEPTH_TESTパラメータ
      _lastCullFace;
      ///< モデル描画直前のGL_CULL_FACEパラメータ
      _lastFrontFace;
      ///< モデル描画直前のGL_CULL_FACEパラメータ
      _lastColorMask;
      ///< モデル描画直前のGL_COLOR_WRITEMASKパラメータ
      _lastBlending;
      ///< モデル描画直前のカラーブレンディングパラメータ
      gl;
    };
    CubismRenderer_WebGL = class extends CubismRenderer {
      /**
       * レンダラの初期化処理を実行する
       * 引数に渡したモデルからレンダラの初期化処理に必要な情報を取り出すことができる
       * NOTE: WebGLコンテキストが初期化されていない可能性があるため、ここではWebGLコンテキストを使う初期化は行わない。
       *
       * @param model モデルのインスタンス
       * @param maskBufferCount バッファの生成数
       */
      initialize(model, maskBufferCount = 1) {
        if (model.isUsingMasking()) {
          this._drawableClippingManager = new CubismClippingManager_WebGL();
          this._drawableClippingManager.initializeForDrawable(
            model,
            maskBufferCount
          );
        }
        if (model.isUsingMaskingForOffscreen()) {
          this._offscreenClippingManager = new CubismClippingManager_WebGL();
          this._offscreenClippingManager.initializeForOffscreen(
            model,
            maskBufferCount
          );
        }
        updateSize(
          this._sortedObjectsIndexList,
          model.getDrawableCount() + (model.getOffscreenCount ? model.getOffscreenCount() : 0),
          0,
          true
        );
        updateSize(
          this._sortedObjectsTypeList,
          model.getDrawableCount() + (model.getOffscreenCount ? model.getOffscreenCount() : 0),
          0,
          true
        );
        super.initialize(model);
      }
      /**
       * オフスクリーンの親を探して設定する
       *
       * @param model モデルのインスタンス
       * @param offscreenCount オフスクリーンの数
       */
      setupParentOffscreens(model, offscreenCount) {
        let parentOffscreen;
        for (let offscreenIndex = 0; offscreenIndex < offscreenCount; ++offscreenIndex) {
          parentOffscreen = null;
          const ownerIndex = model.getOffscreenOwnerIndices()[offscreenIndex];
          let parentIndex = model.getPartParentPartIndices()[ownerIndex];
          while (parentIndex != NoParentIndex) {
            for (let i = 0; i < offscreenCount; ++i) {
              const ownerIndex2 = model.getOffscreenOwnerIndices()[this._offscreenList[i].getOffscreenIndex()];
              if (ownerIndex2 != parentIndex) {
                continue;
              }
              parentOffscreen = this._offscreenList[i];
              break;
            }
            if (parentOffscreen != null) {
              break;
            }
            parentIndex = model.getPartParentPartIndices()[parentIndex];
          }
          this._offscreenList[offscreenIndex].setParentPartOffscreen(
            parentOffscreen
          );
        }
      }
      /**
       * WebGLテクスチャのバインド処理
       * CubismRendererにテクスチャを設定し、CubismRenderer内でその画像を参照するためのIndex値を戻り値とする
       *
       * @param modelTextureNo セットするモデルテクスチャの番号
       * @param glTextureNo WebGLテクスチャの番号
       */
      bindTexture(modelTextureNo, glTexture) {
        this._textures.set(modelTextureNo, glTexture);
      }
      /**
       * WebGLにバインドされたテクスチャのリストを取得する
       *
       * @return テクスチャのリスト
       */
      getBindedTextures() {
        return this._textures;
      }
      /**
       * クリッピングマスクバッファのサイズを設定する
       * マスク用のFrameBufferを破棄、再作成する為処理コストは高い
       *
       * @param size クリッピングマスクバッファのサイズ
       */
      setClippingMaskBufferSize(size) {
        if (!this._model.isUsingMasking()) {
          return;
        }
        const renderTextureCount = this._drawableClippingManager.getRenderTextureCount();
        this._drawableClippingManager.release();
        this._drawableClippingManager = void 0;
        this._drawableClippingManager = null;
        this._drawableClippingManager = new CubismClippingManager_WebGL();
        this._drawableClippingManager.setClippingMaskBufferSize(size);
        this._drawableClippingManager.initializeForDrawable(
          this.getModel(),
          renderTextureCount
          // インスタンス破棄前に保存したレンダーテクスチャの数
        );
      }
      /**
       * クリッピングマスクバッファのサイズを取得する
       *
       * @return クリッピングマスクバッファのサイズ
       */
      getClippingMaskBufferSize() {
        return this._model.isUsingMasking() ? this._drawableClippingManager.getClippingMaskBufferSize() : s_invalidValue;
      }
      /**
       * ブレンドモード用のフレームバッファを取得する
       *
       * @return ブレンドモード用のフレームバッファ
       */
      getModelRenderTarget(index) {
        return this._modelRenderTargets[index];
      }
      /**
       * レンダーテクスチャの枚数を取得する
       * @return レンダーテクスチャの枚数
       */
      getRenderTextureCount() {
        return this._model.isUsingMasking() ? this._drawableClippingManager.getRenderTextureCount() : s_invalidValue;
      }
      /**
       * コンストラクタ
       */
      constructor(width, height) {
        super(width, height);
        this._clippingContextBufferForMask = null;
        this._clippingContextBufferForDraw = null;
        this._rendererProfile = new CubismRendererProfile_WebGL();
        this._textures = /* @__PURE__ */ new Map();
        this._sortedObjectsIndexList = new Array();
        this._sortedObjectsTypeList = new Array();
        this._bufferData = {
          vertex: WebGLBuffer = null,
          uv: WebGLBuffer = null,
          index: WebGLBuffer = null
        };
        this._modelRenderTargets = new Array();
        this._drawableMasks = new Array();
        this._currentFbo = null;
        this._drawableClippingManager = null;
        this._offscreenClippingManager = null;
        this._offscreenMasks = new Array();
        this._offscreenList = new Array();
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        if (this._drawableClippingManager) {
          this._drawableClippingManager.release();
          this._drawableClippingManager = void 0;
          this._drawableClippingManager = null;
        }
        if (this.gl == null) {
          return;
        }
        this.gl.deleteBuffer(this._bufferData.vertex);
        this._bufferData.vertex = null;
        this.gl.deleteBuffer(this._bufferData.uv);
        this._bufferData.uv = null;
        this.gl.deleteBuffer(this._bufferData.index);
        this._bufferData.index = null;
        this._bufferData = null;
        this._textures = null;
        for (let i = 0; i < this._modelRenderTargets.length; i++) {
          if (this._modelRenderTargets[i] != null && this._modelRenderTargets[i].isValid()) {
            this._modelRenderTargets[i].destroyRenderTarget();
          }
        }
        this._modelRenderTargets.length = 0;
        this._modelRenderTargets = null;
        for (let i = 0; i < this._drawableMasks.length; i++) {
          if (this._drawableMasks[i] != null && this._drawableMasks[i].isValid()) {
            this._drawableMasks[i].destroyRenderTarget();
          }
        }
        this._drawableMasks.length = 0;
        this._drawableMasks = null;
        for (let i = 0; i < this._offscreenMasks.length; i++) {
          if (this._offscreenMasks[i] != null && this._offscreenMasks[i].isValid()) {
            this._offscreenMasks[i].destroyRenderTarget();
          }
        }
        this._offscreenMasks.length = 0;
        this._offscreenMasks = null;
        for (let i = 0; i < this._offscreenList.length; i++) {
          if (this._offscreenList[i] != null && this._offscreenList[i].isValid()) {
            this._offscreenList[i].destroyRenderTarget();
          }
        }
        this._offscreenList.length = 0;
        this._offscreenList = null;
        this._offscreenClippingManager = null;
        this._drawableClippingManager = null;
        this._clippingContextBufferForMask = null;
        this._clippingContextBufferForDraw = null;
        this._rendererProfile = null;
        this._sortedObjectsIndexList = null;
        this._sortedObjectsTypeList = null;
        this._currentFbo = null;
        this._model = null;
        this.gl = null;
      }
      /**
       * Shaderの読み込みを行う
       * @param shaderPath シェーダのパス
       */
      loadShaders(shaderPath = null) {
        if (this.gl == null) {
          CubismLogError(
            "'gl' is null. WebGLRenderingContext is required.\nPlease call 'CubimRenderer_WebGL.startUp' function."
          );
          return;
        }
        if (CubismShaderManager_WebGL.getInstance().getShader(this.gl)._shaderSets.length == 0 || !CubismShaderManager_WebGL.getInstance().getShader(this.gl)._isShaderLoaded) {
          const shader = CubismShaderManager_WebGL.getInstance().getShader(this.gl);
          if (shaderPath != null) {
            shader.setShaderPath(shaderPath);
          }
          shader.generateShaders();
        }
      }
      /**
       * モデルを描画する実際の処理
       * @param shaderPath シェーダのパス
       */
      doDrawModel(shaderPath = null) {
        this.loadShaders(shaderPath);
        this.beforeDrawModelRenderTarget();
        const lastFbo = this.gl.getParameter(
          this.gl.FRAMEBUFFER_BINDING
        );
        const lastViewport = this.gl.getParameter(this.gl.VIEWPORT);
        if (this._drawableClippingManager != null) {
          this.preDraw();
          for (let i = 0; i < this._drawableClippingManager.getRenderTextureCount(); ++i) {
            if (this._drawableMasks[i].getBufferWidth() != this._drawableClippingManager.getClippingMaskBufferSize() || this._drawableMasks[i].getBufferHeight() != this._drawableClippingManager.getClippingMaskBufferSize()) {
              this._drawableMasks[i].createRenderTarget(
                this.gl,
                this._drawableClippingManager.getClippingMaskBufferSize(),
                this._drawableClippingManager.getClippingMaskBufferSize(),
                lastFbo
              );
            }
          }
          if (this.isUsingHighPrecisionMask()) {
            this._drawableClippingManager.setupMatrixForHighPrecision(
              this.getModel(),
              false
            );
          } else {
            this._drawableClippingManager.setupClippingContext(
              this.getModel(),
              this,
              lastFbo,
              lastViewport,
              0 /* DrawableObjectType_Drawable */
            );
          }
        }
        if (this._offscreenClippingManager != null) {
          this.preDraw();
          for (let i = 0; i < this._offscreenClippingManager.getRenderTextureCount(); ++i) {
            if (this._offscreenMasks[i].getBufferWidth() != this._offscreenClippingManager.getClippingMaskBufferSize() || this._offscreenMasks[i].getBufferHeight() != this._offscreenClippingManager.getClippingMaskBufferSize()) {
              this._offscreenMasks[i].createRenderTarget(
                this.gl,
                this._offscreenClippingManager.getClippingMaskBufferSize(),
                this._offscreenClippingManager.getClippingMaskBufferSize(),
                lastFbo
              );
            }
          }
          if (this.isUsingHighPrecisionMask()) {
            this._offscreenClippingManager.setupMatrixForOffscreenHighPrecision(
              this.getModel(),
              false,
              this.getMvpMatrix()
            );
          } else {
            this._offscreenClippingManager.setupClippingContext(
              this.getModel(),
              this,
              lastFbo,
              lastViewport,
              1 /* DrawableObjectType_Offscreen */
            );
          }
        }
        this.preDraw();
        this.drawObjectLoop(lastFbo);
        this.afterDrawModelRenderTarget();
      }
      /**
       * 描画オブジェクトのループ処理を行う。
       *
       * @param lastFbo 前回のフレームバッファ
       */
      drawObjectLoop(lastFbo) {
        const model = this.getModel();
        const drawableCount = model.getDrawableCount();
        const offscreenCount = model.getOffscreenCount();
        const totalCount = drawableCount + offscreenCount;
        const renderOrder = model.getRenderOrders();
        this._currentOffscreen = null;
        this._currentFbo = lastFbo;
        this._modelRootFbo = lastFbo;
        for (let i = 0; i < totalCount; ++i) {
          const order = renderOrder[i];
          if (i < drawableCount) {
            this._sortedObjectsIndexList[order] = i;
            this._sortedObjectsTypeList[order] = 0 /* DrawableObjectType_Drawable */;
          } else if (i < totalCount) {
            this._sortedObjectsIndexList[order] = i - drawableCount;
            this._sortedObjectsTypeList[order] = 1 /* DrawableObjectType_Offscreen */;
          }
        }
        for (let i = 0; i < totalCount; ++i) {
          const objectIndex = this._sortedObjectsIndexList[i];
          const objectType = this._sortedObjectsTypeList[i];
          this.renderObject(objectIndex, objectType);
        }
        while (this._currentOffscreen != null) {
          this.submitDrawToParentOffscreen(
            this._currentOffscreen.getOffscreenIndex(),
            1 /* DrawableObjectType_Offscreen */
          );
        }
      }
      /**
       * 描画オブジェクトを描画する。
       *
       * @param objectIndex 描画対象のオブジェクトのインデックス
       * @param objectType 描画対象のオブジェクトのタイプ
       * @param lastFbo 前回のフレームバッファ
       * @param lastViewport 前回のビューポート
       */
      renderObject(objectIndex, objectType) {
        switch (objectType) {
          case 0 /* DrawableObjectType_Drawable */:
            this.drawDrawable(objectIndex, this._modelRootFbo);
            break;
          case 1 /* DrawableObjectType_Offscreen */:
            this.addOffscreen(objectIndex);
            break;
          default:
            CubismLogError("Unknown object type: " + objectType);
            break;
        }
      }
      /**
       * 描画オブジェクト（アートメッシュ）を描画する。
       *
       * @param model 描画対象のモデル
       * @param index 描画対象のメッシュのインデックス
       */
      drawDrawable(drawableIndex, rootFbo) {
        if (!this.getModel().getDrawableDynamicFlagIsVisible(drawableIndex)) {
          return;
        }
        this.submitDrawToParentOffscreen(
          drawableIndex,
          0 /* DrawableObjectType_Drawable */
        );
        const clipContext = this._drawableClippingManager != null ? this._drawableClippingManager.getClippingContextListForDraw()[drawableIndex] : null;
        if (clipContext != null && this.isUsingHighPrecisionMask()) {
          if (clipContext._isUsing) {
            this.gl.viewport(
              0,
              0,
              this._drawableClippingManager.getClippingMaskBufferSize(),
              this._drawableClippingManager.getClippingMaskBufferSize()
            );
            this.preDraw();
            this.getDrawableMaskBuffer(clipContext._bufferIndex).beginDraw(
              this._currentFbo
            );
            this.gl.clearColor(1, 1, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
          }
          {
            const clipDrawCount = clipContext._clippingIdCount;
            for (let index = 0; index < clipDrawCount; index++) {
              const clipDrawIndex = clipContext._clippingIdList[index];
              if (!this._model.getDrawableDynamicFlagVertexPositionsDidChange(
                clipDrawIndex
              )) {
                continue;
              }
              this.setIsCulling(
                this._model.getDrawableCulling(clipDrawIndex) != false
              );
              this.setClippingContextBufferForMask(clipContext);
              this.drawMeshWebGL(this._model, clipDrawIndex);
            }
            this.getDrawableMaskBuffer(clipContext._bufferIndex).endDraw();
            this.setClippingContextBufferForMask(null);
            this.gl.viewport(
              0,
              0,
              this._modelRenderTargetWidth,
              this._modelRenderTargetHeight
            );
            this.preDraw();
          }
        }
        this.setClippingContextBufferForDrawable(clipContext);
        this.setIsCulling(this.getModel().getDrawableCulling(drawableIndex));
        this.drawMeshWebGL(this._model, drawableIndex);
      }
      /**
       * 描画オブジェクト（アートメッシュ）を描画する。
       *
       * @param model 描画対象のモデル
       * @param index 描画対象のメッシュのインデックス
       */
      drawMeshWebGL(model, index) {
        if (this.isCulling()) {
          this.gl.enable(this.gl.CULL_FACE);
        } else {
          this.gl.disable(this.gl.CULL_FACE);
        }
        this.gl.frontFace(this.gl.CCW);
        if (this.isGeneratingMask()) {
          CubismShaderManager_WebGL.getInstance().getShader(this.gl).setupShaderProgramForMask(this, model, index);
        } else {
          CubismShaderManager_WebGL.getInstance().getShader(this.gl).setupShaderProgramForDrawable(this, model, index);
        }
        if (!CubismShaderManager_WebGL.getInstance().getShader(this.gl)._isShaderLoaded) {
          return;
        }
        {
          const indexCount = model.getDrawableVertexIndexCount(index);
          this.gl.drawElements(
            this.gl.TRIANGLES,
            indexCount,
            this.gl.UNSIGNED_SHORT,
            0
          );
        }
        this.gl.useProgram(null);
        this.setClippingContextBufferForDrawable(null);
        this.setClippingContextBufferForMask(null);
      }
      /**
       * オフスクリーンを親のオフスクリーンにコピーする。
       *
       * @param objectIndex オブジェクトのインデックス
       * @param objectType  オブジェクトの種類
       */
      submitDrawToParentOffscreen(objectIndex, objectType) {
        if (this._currentOffscreen == null || objectIndex == s_invalidValue) {
          return;
        }
        const currentOwnerIndex = this.getModel().getOffscreenOwnerIndices()[this._currentOffscreen.getOffscreenIndex()];
        if (currentOwnerIndex == s_invalidValue) {
          return;
        }
        let targetParentIndex = NoParentIndex;
        switch (objectType) {
          case 0 /* DrawableObjectType_Drawable */:
            targetParentIndex = this.getModel().getDrawableParentPartIndex(objectIndex);
            break;
          case 1 /* DrawableObjectType_Offscreen */:
            targetParentIndex = this.getModel().getPartParentPartIndices()[this.getModel().getOffscreenOwnerIndices()[objectIndex]];
            break;
          default:
            return;
        }
        while (targetParentIndex != NoParentIndex) {
          if (targetParentIndex == currentOwnerIndex) {
            return;
          }
          targetParentIndex = this.getModel().getPartParentPartIndices()[targetParentIndex];
        }
        this.drawOffscreen(this._currentOffscreen);
        this.submitDrawToParentOffscreen(objectIndex, objectType);
      }
      /**
       * 描画オブジェクト（オフスクリーン）を追加する。
       *
       * @param offscreenIndex オフスクリーンのインデックス
       */
      addOffscreen(offscreenIndex) {
        if (this._currentOffscreen != null && this._currentOffscreen.getOffscreenIndex() != offscreenIndex) {
          let isParent = false;
          const ownerIndex = this.getModel().getOffscreenOwnerIndices()[offscreenIndex];
          let parentIndex = this.getModel().getPartParentPartIndices()[ownerIndex];
          const currentOffscreenIndex = this._currentOffscreen.getOffscreenIndex();
          const currentOffscreenOwnerIndex = this.getModel().getOffscreenOwnerIndices()[currentOffscreenIndex];
          while (parentIndex != NoParentIndex) {
            if (parentIndex == currentOffscreenOwnerIndex) {
              isParent = true;
              break;
            }
            parentIndex = this.getModel().getPartParentPartIndices()[parentIndex];
          }
          if (!isParent) {
            this.submitDrawToParentOffscreen(
              offscreenIndex,
              1 /* DrawableObjectType_Offscreen */
            );
          }
        }
        const offscreen = this._offscreenList[offscreenIndex];
        if (offscreen.getRenderTexture() == null || offscreen.getBufferWidth() != this._modelRenderTargetWidth || offscreen.getBufferHeight() != this._modelRenderTargetHeight || offscreen.getUsingRenderTextureState()) {
          offscreen.setOffscreenRenderTarget(
            this.gl,
            this._modelRenderTargetWidth,
            this._modelRenderTargetHeight,
            this._currentFbo
          );
        } else {
          offscreen.startUsingRenderTexture();
        }
        const oldOffscreen = offscreen.getParentPartOffscreen();
        offscreen.setOldOffscreen(oldOffscreen);
        let oldFBO = null;
        if (oldOffscreen != null) {
          oldFBO = oldOffscreen.getRenderTexture();
        }
        if (oldFBO == null) {
          oldFBO = this._modelRootFbo;
        }
        offscreen.beginDraw(oldFBO);
        this.gl.viewport(
          0,
          0,
          this._modelRenderTargetWidth,
          this._modelRenderTargetHeight
        );
        offscreen.clear(0, 0, 0, 0);
        this._currentOffscreen = offscreen;
        this._currentFbo = offscreen.getRenderTexture();
      }
      /**
       * オフスクリーン描画を行う。
       *
       * @param offscreen オフスクリーンレンダリングターゲット
       */
      drawOffscreen(offscreen) {
        const offscreenIndex = offscreen.getOffscreenIndex();
        const clipContext = this._offscreenClippingManager != null ? this._offscreenClippingManager.getClippingContextListForOffscreen()[offscreenIndex] : null;
        if (clipContext != null && this.isUsingHighPrecisionMask()) {
          if (clipContext._isUsing) {
            this.gl.viewport(
              0,
              0,
              this._offscreenClippingManager.getClippingMaskBufferSize(),
              this._offscreenClippingManager.getClippingMaskBufferSize()
            );
            this.preDraw();
            this.getOffscreenMaskBuffer(clipContext._bufferIndex).beginDraw(
              this._currentFbo
            );
            this.gl.clearColor(1, 1, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
          }
          {
            const clipDrawCount = clipContext._clippingIdCount;
            for (let index = 0; index < clipDrawCount; index++) {
              const clipDrawIndex = clipContext._clippingIdList[index];
              if (!this.getModel().getDrawableDynamicFlagVertexPositionsDidChange(
                clipDrawIndex
              )) {
                continue;
              }
              this.setIsCulling(
                this.getModel().getDrawableCulling(clipDrawIndex) != false
              );
              this.setClippingContextBufferForMask(clipContext);
              this.drawMeshWebGL(this.getModel(), clipDrawIndex);
            }
          }
          {
            this.getOffscreenMaskBuffer(clipContext._bufferIndex).endDraw();
            this.setClippingContextBufferForMask(null);
            this.gl.viewport(
              0,
              0,
              this._modelRenderTargetWidth,
              this._modelRenderTargetHeight
            );
            this.preDraw();
          }
        }
        this.setClippingContextBufferForOffscreen(clipContext);
        this.setIsCulling(this._model.getOffscreenCulling(offscreenIndex) != false);
        this.drawOffscreenWebGL(this.getModel(), offscreen);
      }
      /**
       * オフスクリーン描画のWebGL実装
       *
       * @param model モデル
       * @param index オフスクリーンインデックス
       */
      drawOffscreenWebGL(model, offscreen) {
        if (this.isCulling()) {
          this.gl.enable(this.gl.CULL_FACE);
        } else {
          this.gl.disable(this.gl.CULL_FACE);
        }
        this.gl.frontFace(this.gl.CCW);
        CubismShaderManager_WebGL.getInstance().getShader(this.gl).setupShaderProgramForOffscreen(this, model, offscreen);
        offscreen.endDraw();
        this._currentOffscreen = this._currentOffscreen.getOldOffscreen();
        this._currentFbo = offscreen.getOldFBO();
        if (this._currentFbo == null) {
          this._currentOffscreen = this._modelRenderTargets[0];
          this._currentFbo = this._modelRenderTargets[0].getRenderTexture();
          this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentFbo);
        }
        {
          const indexBuffer = this.gl.createBuffer();
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            s_renderTargetIndexArray,
            this.gl.STATIC_DRAW
          );
          this.gl.drawElements(
            this.gl.TRIANGLES,
            s_renderTargetIndexArray.length,
            this.gl.UNSIGNED_SHORT,
            0
          );
          this.gl.deleteBuffer(indexBuffer);
        }
        offscreen.stopUsingRenderTexture();
        this.gl.useProgram(null);
        this.setClippingContextBufferForMask(null);
        this.setClippingContextBufferForOffscreen(null);
      }
      /**
       * モデル描画直前のレンダラのステートを保持する
       */
      saveProfile() {
        this._rendererProfile.save();
      }
      /**
       * モデル描画直前のレンダラのステートを復帰させる
       */
      restoreProfile() {
        this._rendererProfile.restore();
      }
      /**
       * モデル描画直前のオフスクリーン設定を行う
       */
      beforeDrawModelRenderTarget() {
        if (this._modelRenderTargets.length == 0) {
          return;
        }
        for (let i = 0; i < this._modelRenderTargets.length; ++i) {
          if (this._modelRenderTargets[i].getBufferWidth() != this._modelRenderTargetWidth || this._modelRenderTargets[i].getBufferHeight() != this._modelRenderTargetHeight) {
            this._modelRenderTargets[i].createRenderTarget(
              this.gl,
              this._modelRenderTargetWidth,
              this._modelRenderTargetHeight,
              this._currentFbo
            );
          }
        }
        this._modelRenderTargets[0].beginDraw();
        this._modelRenderTargets[0].clear(0, 0, 0, 0);
      }
      /**
       * モデル描画後のオフスクリーン設定を行う
       */
      afterDrawModelRenderTarget() {
        if (this._modelRenderTargets.length == 0) {
          return;
        }
        this._modelRenderTargets[0].endDraw();
        CubismShaderManager_WebGL.getInstance().getShader(this.gl).setupShaderProgramForOffscreenRenderTarget(this);
        if (CubismShaderManager_WebGL.getInstance().getShader(this.gl)._isShaderLoaded) {
          const indexBuffer = this.gl.createBuffer();
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
          this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            s_renderTargetIndexArray,
            this.gl.STATIC_DRAW
          );
          this.gl.drawElements(
            this.gl.TRIANGLES,
            s_renderTargetIndexArray.length,
            this.gl.UNSIGNED_SHORT,
            0
          );
          this.gl.deleteBuffer(indexBuffer);
        }
        this.gl.useProgram(null);
      }
      /**
       * オフスクリーンのクリッピングマスクのバッファを取得する
       *
       * @param index オフスクリーンのクリッピングマスクのバッファのインデックス
       *
       * @return オフスクリーンのクリッピングマスクのバッファへのポインタ
       */
      getOffscreenMaskBuffer(index) {
        return this._offscreenMasks[index];
      }
      /**
       * レンダラが保持する静的なリソースを解放する
       * WebGLの静的なシェーダープログラムを解放する
       */
      static doStaticRelease() {
        CubismShaderManager_WebGL.deleteInstance();
      }
      /**
       * レンダーステートを設定する
       *
       * @param fbo アプリケーション側で指定しているフレームバッファ
       * @param viewport ビューポート
       */
      setRenderState(fbo, viewport) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, fbo);
        this.gl.viewport(viewport[0], viewport[1], viewport[2], viewport[3]);
        if (this._modelRenderTargetWidth != viewport[2] || this._modelRenderTargetHeight != viewport[3]) {
          this._modelRenderTargetWidth = viewport[2];
          this._modelRenderTargetHeight = viewport[3];
        }
      }
      /**
       * 描画開始時の追加処理
       * モデルを描画する前にクリッピングマスクに必要な処理を実装している
       */
      preDraw() {
        this.gl.disable(this.gl.SCISSOR_TEST);
        this.gl.disable(this.gl.STENCIL_TEST);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.frontFace(this.gl.CW);
        this.gl.enable(this.gl.BLEND);
        this.gl.colorMask(true, true, true, true);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        if (this.getAnisotropy() > 0 && this._extension) {
          for (let i = 0; i < this._textures.size; ++i) {
            this.gl.bindTexture(this.gl.TEXTURE_2D, this._textures.get(i));
            this.gl.texParameterf(
              this.gl.TEXTURE_2D,
              this._extension.TEXTURE_MAX_ANISOTROPY_EXT,
              this.getAnisotropy()
            );
          }
        }
      }
      /**
       * Drawableのマスク用のオフスクリーンサーフェースを取得する
       *
       * @param index オフスクリーンサーフェースのインデックス
       *
       * @return マスク用のオフスクリーンサーフェース
       */
      getDrawableMaskBuffer(index) {
        return this._drawableMasks[index];
      }
      /**
       * マスクテクスチャに描画するクリッピングコンテキストをセットする
       */
      setClippingContextBufferForMask(clip) {
        this._clippingContextBufferForMask = clip;
      }
      /**
       * マスクテクスチャに描画するクリッピングコンテキストを取得する
       *
       * @return マスクテクスチャに描画するクリッピングコンテキスト
       */
      getClippingContextBufferForMask() {
        return this._clippingContextBufferForMask;
      }
      /**
       * Drawableの画面上に描画するクリッピングコンテキストをセットする
       *
       * @param clip drawableで画面上に描画するクリッピングコンテキスト
       */
      setClippingContextBufferForDrawable(clip) {
        this._clippingContextBufferForDraw = clip;
      }
      /**
       * Drawableの画面上に描画するクリッピングコンテキストを取得する
       *
       * @return Drawableの画面上に描画するクリッピングコンテキスト
       */
      getClippingContextBufferForDrawable() {
        return this._clippingContextBufferForDraw;
      }
      /**
       * offscreenで画面上に描画するクリッピングコンテキストをセットする。
       *
       * @param clip offscreenで画面上に描画するクリッピングコンテキスト
       */
      setClippingContextBufferForOffscreen(clip) {
        this._clippingContextBufferForOffscreen = clip;
      }
      /**
       * offscreenで画面上に描画するクリッピングコンテキストを取得する。
       *
       * @return offscreenで画面上に描画するクリッピングコンテキスト
       */
      getClippingContextBufferForOffscreen() {
        return this._clippingContextBufferForOffscreen;
      }
      /**
       * マスク生成時かを判定する
       *
       * @return 判定値
       */
      isGeneratingMask() {
        return this.getClippingContextBufferForMask() != null;
      }
      /**
       * glの設定
       */
      startUp(gl) {
        this.gl = gl;
        if (this._drawableClippingManager) {
          this._drawableClippingManager.setGL(gl);
        }
        if (this._offscreenClippingManager) {
          this._offscreenClippingManager.setGL(gl);
        }
        CubismShaderManager_WebGL.getInstance().setGlContext(gl);
        this._rendererProfile.setGl(gl);
        this._extension = this.gl.getExtension("EXT_texture_filter_anisotropic") || this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
        if (this._model.isUsingMasking()) {
          this._drawableMasks.length = this._drawableClippingManager.getRenderTextureCount();
          for (let i = 0; i < this._drawableMasks.length; ++i) {
            const renderTarget = new CubismRenderTarget_WebGL();
            renderTarget.createRenderTarget(
              this.gl,
              this._drawableClippingManager.getClippingMaskBufferSize(),
              this._drawableClippingManager.getClippingMaskBufferSize(),
              this._currentFbo
            );
            this._drawableMasks[i] = renderTarget;
          }
        }
        if (this._model.isBlendModeEnabled()) {
          this._modelRenderTargets.length = 0;
          const createSize = 3;
          this._modelRenderTargets.length = createSize;
          for (let i = 0; i < createSize; ++i) {
            const offscreenRenderTarget = new CubismOffscreenRenderTarget_WebGL();
            offscreenRenderTarget.createRenderTarget(
              this.gl,
              this._modelRenderTargetWidth,
              this._modelRenderTargetHeight,
              this._currentFbo
            );
            this._modelRenderTargets[i] = offscreenRenderTarget;
          }
          if (this._model.isUsingMaskingForOffscreen()) {
            this._offscreenMasks.length = this._offscreenClippingManager.getRenderTextureCount();
            for (let i = 0; i < this._offscreenMasks.length; ++i) {
              const offscreenMask = new CubismRenderTarget_WebGL();
              offscreenMask.createRenderTarget(
                this.gl,
                this._offscreenClippingManager.getClippingMaskBufferSize(),
                this._offscreenClippingManager.getClippingMaskBufferSize(),
                this._currentFbo
              );
              this._offscreenMasks[i] = offscreenMask;
            }
          }
          const offscreenCount = this._model.getOffscreenCount();
          if (offscreenCount > 0) {
            this._offscreenList = new Array(
              offscreenCount
            );
            for (let offscreenIndex = 0; offscreenIndex < offscreenCount; ++offscreenIndex) {
              const offscreenRenderTarget = new CubismOffscreenRenderTarget_WebGL();
              offscreenRenderTarget.setOffscreenIndex(offscreenIndex);
              this._offscreenList[offscreenIndex] = offscreenRenderTarget;
            }
            this.setupParentOffscreens(this._model, offscreenCount);
          }
        }
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this._currentFbo);
      }
      _textures;
      // モデルが参照するテクスチャとレンダラでバインドしているテクスチャとのマップ
      _sortedObjectsIndexList;
      // 描画オブジェクトのインデックスを描画順に並べたリスト
      _sortedObjectsTypeList;
      // 描画オブジェクトのオブジェクトタイプを描画順に並べたリスト
      _rendererProfile;
      _drawableClippingManager;
      // クリッピングマスク管理オブジェクト
      _clippingContextBufferForMask;
      // マスクテクスチャに描画するためのクリッピングコンテキスト
      _clippingContextBufferForDraw;
      // 画面上描画するためのクリッピングコンテキスト
      _clippingContextBufferForOffscreen;
      // オフスクリーン描画用のクリッピングコンテキスト
      _offscreenClippingManager;
      // オフスクリーン描画用のクリッピングマスク管理オブジェクト
      _modelRenderTargets;
      ///< モデル全体を描画する先のフレームバッファ
      _drawableMasks;
      // マスク用のオフスクリーンサーフェースのリスト
      _offscreenMasks;
      ///< オフスクリーン機能マスク描画用のフレームバッファ
      _offscreenList;
      ///< モデルのオフスクリーン
      _currentFbo;
      ///< 現在のフレームバッファオブジェクト
      _currentOffscreen;
      // 現在のオフスクリーン
      _modelRootFbo;
      // モデルのルートフレームバッファ
      _bufferData;
      // 頂点バッファデータ
      _extension;
      // 拡張機能
      gl;
      // webglコンテキスト
    };
    CubismRenderer.staticRelease = () => {
      CubismRenderer_WebGL.doStaticRelease();
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismClippingContext = CubismClippingContext_WebGL;
      Live2DCubismFramework51.CubismClippingManager_WebGL = CubismClippingManager_WebGL;
      Live2DCubismFramework51.CubismRenderer_WebGL = CubismRenderer_WebGL;
    })(Live2DCubismFramework35 || (Live2DCubismFramework35 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/model/cubismmoc.ts
var CubismMoc, Live2DCubismFramework36;
var init_cubismmoc = __esm({
  "vendor/live2d/sdk/Framework/src/model/cubismmoc.ts"() {
    init_cubismdebug();
    init_cubismmodel();
    init_cubismmoc();
    CubismMoc = class _CubismMoc {
      /**
       * Mocデータの作成
       */
      static create(mocBytes, shouldCheckMocConsistency) {
        let cubismMoc = null;
        if (shouldCheckMocConsistency) {
          const consistency = this.hasMocConsistency(mocBytes);
          if (!consistency) {
            CubismLogError(`Inconsistent MOC3.`);
            return cubismMoc;
          }
        }
        const moc = Live2DCubismCore.Moc.fromArrayBuffer(mocBytes);
        if (moc) {
          cubismMoc = new _CubismMoc(moc);
          cubismMoc._mocVersion = Live2DCubismCore.Version.csmGetMocVersion(mocBytes);
        }
        return cubismMoc;
      }
      /**
       * Mocデータを削除
       *
       * Mocデータを削除する
       */
      static delete(moc) {
        moc._moc._release();
        moc._moc = null;
        moc = null;
      }
      /**
       * モデルを作成する
       *
       * @return Mocデータから作成されたモデル
       */
      createModel() {
        let cubismModel = null;
        const model = Live2DCubismCore.Model.fromMoc(
          this._moc
        );
        if (model) {
          cubismModel = new CubismModel(model);
          cubismModel.initialize();
          ++this._modelCount;
        }
        return cubismModel;
      }
      /**
       * モデルを削除する
       */
      deleteModel(model) {
        if (model != null) {
          model.release();
          model = null;
          --this._modelCount;
        }
      }
      /**
       * コンストラクタ
       */
      constructor(moc) {
        this._moc = moc;
        this._modelCount = 0;
        this._mocVersion = 0;
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        CSM_ASSERT(this._modelCount == 0);
        this._moc._release();
        this._moc = null;
      }
      /**
       * 最新の.moc3 Versionを取得
       */
      getLatestMocVersion() {
        return Live2DCubismCore.Version.csmGetLatestMocVersion();
      }
      /**
       * 読み込んだモデルの.moc3 Versionを取得
       */
      getMocVersion() {
        return this._mocVersion;
      }
      /**
       * Mocファイルのbufferから.moc3 Versionを取得
       * @param mocBytes Mocファイルのバイト配列
       * @returns .moc3 Version番号
       */
      static getMocVersionFromBuffer(mocBytes) {
        return Live2DCubismCore.Version.csmGetMocVersion(mocBytes);
      }
      /**
       * .moc3 の整合性を検証する
       */
      static hasMocConsistency(mocBytes) {
        const isConsistent = Live2DCubismCore.Moc.prototype.hasMocConsistency(mocBytes);
        return isConsistent === 1 ? true : false;
      }
      _moc;
      // Mocデータ
      _modelCount;
      // Mocデータから作られたモデルの個数
      _mocVersion;
      // 読み込んだモデルの.moc3 Version
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismMoc = CubismMoc;
    })(Live2DCubismFramework36 || (Live2DCubismFramework36 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/model/cubismmodeluserdatajson.ts
var Meta3, UserDataCount2, TotalUserDataSize2, UserData2, Target2, Id4, Value7, CubismModelUserDataJson, Live2DCubismFramework37;
var init_cubismmodeluserdatajson = __esm({
  "vendor/live2d/sdk/Framework/src/model/cubismmodeluserdatajson.ts"() {
    init_live2dcubismframework();
    init_cubismjson();
    init_cubismmodeluserdatajson();
    Meta3 = "Meta";
    UserDataCount2 = "UserDataCount";
    TotalUserDataSize2 = "TotalUserDataSize";
    UserData2 = "UserData";
    Target2 = "Target";
    Id4 = "Id";
    Value7 = "Value";
    CubismModelUserDataJson = class {
      /**
       * コンストラクタ
       * @param buffer    userdata3.jsonが読み込まれているバッファ
       * @param size      バッファのサイズ
       */
      constructor(buffer, size) {
        this._json = CubismJson.create(buffer, size);
      }
      /**
       * デストラクタ相当の処理
       */
      release() {
        CubismJson.delete(this._json);
      }
      /**
       * ユーザーデータ個数の取得
       * @return ユーザーデータの個数
       */
      getUserDataCount() {
        return this._json.getRoot().getValueByString(Meta3).getValueByString(UserDataCount2).toInt();
      }
      /**
       * ユーザーデータ総文字列数の取得
       *
       * @return ユーザーデータ総文字列数
       */
      getTotalUserDataSize() {
        return this._json.getRoot().getValueByString(Meta3).getValueByString(TotalUserDataSize2).toInt();
      }
      /**
       * ユーザーデータのタイプの取得
       *
       * @return ユーザーデータのタイプ
       */
      getUserDataTargetType(i) {
        return this._json.getRoot().getValueByString(UserData2).getValueByIndex(i).getValueByString(Target2).getRawString();
      }
      /**
       * ユーザーデータのターゲットIDの取得
       *
       * @param i インデックス
       * @return ユーザーデータターゲットID
       */
      getUserDataId(i) {
        return CubismFramework.getIdManager().getId(
          this._json.getRoot().getValueByString(UserData2).getValueByIndex(i).getValueByString(Id4).getRawString()
        );
      }
      /**
       * ユーザーデータの文字列の取得
       *
       * @param i インデックス
       * @return ユーザーデータ
       */
      getUserDataValue(i) {
        return this._json.getRoot().getValueByString(UserData2).getValueByIndex(i).getValueByString(Value7).getRawString();
      }
      _json;
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismModelUserDataJson = CubismModelUserDataJson;
    })(Live2DCubismFramework37 || (Live2DCubismFramework37 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/model/cubismmodeluserdata.ts
var ArtMesh, CubismModelUserDataNode, CubismModelUserData, Live2DCubismFramework38;
var init_cubismmodeluserdata = __esm({
  "vendor/live2d/sdk/Framework/src/model/cubismmodeluserdata.ts"() {
    init_live2dcubismframework();
    init_cubismmodeluserdatajson();
    init_cubismmodeluserdata();
    ArtMesh = "ArtMesh";
    CubismModelUserDataNode = class {
      targetType;
      // ユーザーデータターゲットタイプ
      targetId;
      // ユーザーデータターゲットのID
      value;
      // ユーザーデータ
    };
    CubismModelUserData = class _CubismModelUserData {
      /**
       * インスタンスの作成
       *
       * @param buffer    userdata3.jsonが読み込まれているバッファ
       * @param size      バッファのサイズ
       * @return 作成されたインスタンス
       */
      static create(buffer, size) {
        const ret = new _CubismModelUserData();
        ret.parseUserData(buffer, size);
        return ret;
      }
      /**
       * インスタンスを破棄する
       *
       * @param modelUserData 破棄するインスタンス
       */
      static delete(modelUserData) {
        if (modelUserData != null) {
          modelUserData.release();
          modelUserData = null;
        }
      }
      /**
       * ArtMeshのユーザーデータのリストの取得
       *
       * @return ユーザーデータリスト
       */
      getArtMeshUserDatas() {
        return this._artMeshUserDataNode;
      }
      /**
       * userdata3.jsonのパース
       *
       * @param buffer    userdata3.jsonが読み込まれているバッファ
       * @param size      バッファのサイズ
       */
      parseUserData(buffer, size) {
        let json = new CubismModelUserDataJson(
          buffer,
          size
        );
        if (!json) {
          json.release();
          json = void 0;
          return;
        }
        const typeOfArtMesh = CubismFramework.getIdManager().getId(ArtMesh);
        const nodeCount = json.getUserDataCount();
        let dstIndex = this._userDataNodes.length;
        this._userDataNodes.length = nodeCount;
        for (let i = 0; i < nodeCount; i++) {
          const addNode = new CubismModelUserDataNode();
          addNode.targetId = json.getUserDataId(i);
          addNode.targetType = CubismFramework.getIdManager().getId(
            json.getUserDataTargetType(i)
          );
          addNode.value = json.getUserDataValue(i);
          this._userDataNodes[dstIndex++] = addNode;
          if (addNode.targetType == typeOfArtMesh) {
            this._artMeshUserDataNode.push(addNode);
          }
        }
        json.release();
        json = void 0;
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._userDataNodes = new Array();
        this._artMeshUserDataNode = new Array();
      }
      /**
       * デストラクタ相当の処理
       *
       * ユーザーデータ構造体配列を解放する
       */
      release() {
        for (let i = 0; i < this._userDataNodes.length; ++i) {
          this._userDataNodes[i] = null;
        }
        this._userDataNodes = null;
      }
      _userDataNodes;
      // ユーザーデータ構造体配列
      _artMeshUserDataNode;
      // 閲覧リストの保持
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismModelUserData = CubismModelUserData;
      Live2DCubismFramework51.CubismModelUserDataNode = CubismModelUserDataNode;
    })(Live2DCubismFramework38 || (Live2DCubismFramework38 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/model/cubismusermodel.ts
var CubismUserModel, Live2DCubismFramework39;
var init_cubismusermodel = __esm({
  "vendor/live2d/sdk/Framework/src/model/cubismusermodel.ts"() {
    init_cubismbreath();
    init_cubismeyeblink();
    init_cubismpose();
    init_live2dcubismframework();
    init_cubismmodelmatrix();
    init_cubismtargetpoint();
    init_cubismexpressionmotion();
    init_cubismexpressionmotionmanager();
    init_cubismmotion();
    init_cubismmotionmanager();
    init_cubismphysics();
    init_cubismrenderer_webgl();
    init_cubismdebug();
    init_cubismmoc();
    init_cubismmodeluserdata();
    init_cubismusermodel();
    CubismUserModel = class _CubismUserModel {
      /**
       * 初期化状態の取得
       *
       * 初期化されている状態か？
       *
       * @return true     初期化されている
       * @return false    初期化されていない
       */
      isInitialized() {
        return this._initialized;
      }
      /**
       * 初期化状態の設定
       *
       * 初期化状態を設定する。
       *
       * @param v 初期化状態
       */
      setInitialized(v) {
        this._initialized = v;
      }
      /**
       * 更新状態の取得
       *
       * 更新されている状態か？
       *
       * @return true     更新されている
       * @return false    更新されていない
       */
      isUpdating() {
        return this._updating;
      }
      /**
       * 更新状態の設定
       *
       * 更新状態を設定する
       *
       * @param v 更新状態
       */
      setUpdating(v) {
        this._updating = v;
      }
      /**
       * マウスドラッグ情報の設定
       *
       * @param ドラッグしているカーソルのX位置
       * @param ドラッグしているカーソルのY位置
       */
      setDragging(x, y) {
        this._dragManager.set(x, y);
      }
      /**
       * モデル行列を取得する
       * @return モデル行列
       */
      getModelMatrix() {
        return this._modelMatrix;
      }
      /**
       * モデルを描画したバッファを設定する
       *
       * @param width モデルを描画したバッファの幅
       * @param height モデルを描画したバッファの高さ
       */
      setRenderTargetSize(width, height) {
        if (this._renderer) {
          this._renderer.setRenderTargetSize(width, height);
        }
      }
      /**
       * 不透明度の設定
       *
       * @param a 不透明度
       */
      setOpacity(a) {
        this._opacity = a;
      }
      /**
       * 不透明度の取得
       *
       * @return 不透明度
       */
      getOpacity() {
        return this._opacity;
      }
      /**
       * モデルデータを読み込む
       *
       * @param buffer    moc3ファイルが読み込まれているバッファ
       */
      loadModel(buffer, shouldCheckMocConsistency = false) {
        this._moc = CubismMoc.create(buffer, shouldCheckMocConsistency);
        if (this._moc == null) {
          CubismLogError("Failed to CubismMoc.create().");
          return;
        }
        this._model = this._moc.createModel();
        if (this._model == null) {
          CubismLogError("Failed to CreateModel().");
          return;
        }
        this._model.saveParameters();
        this._modelMatrix = new CubismModelMatrix(
          this._model.getCanvasWidth(),
          this._model.getCanvasHeight()
        );
      }
      /**
       * モーションデータを読み込む
       * @param buffer motion3.jsonファイルが読み込まれているバッファ
       * @param size バッファのサイズ
       * @param name モーションの名前
       * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
       * @param onBeganMotionHandler モーション再生開始時に呼び出されるコールバック関数
       * @param modelSetting モデル設定
       * @param group モーショングループ名
       * @param index モーションインデックス
       * @param shouldCheckMotionConsistency motion3.json整合性チェックするかどうか
       * @return モーションクラス
       */
      loadMotion(buffer, size, name2, onFinishedMotionHandler, onBeganMotionHandler, modelSetting, group, index, shouldCheckMotionConsistency = false) {
        if (buffer == null || size == 0) {
          CubismLogError("Failed to loadMotion().");
          return null;
        }
        const motion = CubismMotion.create(
          buffer,
          size,
          onFinishedMotionHandler,
          onBeganMotionHandler,
          shouldCheckMotionConsistency
        );
        if (motion == null) {
          CubismLogError(`Failed to create motion from buffer in LoadMotion()`);
          return null;
        }
        if (modelSetting) {
          const fadeInTime = modelSetting.getMotionFadeInTimeValue(
            group,
            index
          );
          if (fadeInTime >= 0) {
            motion.setFadeInTime(fadeInTime);
          }
          const fadeOutTime = modelSetting.getMotionFadeOutTimeValue(group, index);
          if (fadeOutTime >= 0) {
            motion.setFadeOutTime(fadeOutTime);
          }
        }
        return motion;
      }
      /**
       * 表情データの読み込み
       * @param buffer expファイルが読み込まれているバッファ
       * @param size バッファのサイズ
       * @param name 表情の名前
       */
      loadExpression(buffer, size, name2) {
        if (buffer == null || size == 0) {
          CubismLogError("Failed to loadExpression().");
          return null;
        }
        return CubismExpressionMotion.create(buffer, size);
      }
      /**
       * ポーズデータの読み込み
       * @param buffer pose3.jsonが読み込まれているバッファ
       * @param size バッファのサイズ
       */
      loadPose(buffer, size) {
        if (buffer == null || size == 0) {
          CubismLogError("Failed to loadPose().");
          return;
        }
        this._pose = CubismPose.create(buffer, size);
      }
      /**
       * モデルに付属するユーザーデータを読み込む
       * @param buffer userdata3.jsonが読み込まれているバッファ
       * @param size バッファのサイズ
       */
      loadUserData(buffer, size) {
        if (buffer == null || size == 0) {
          CubismLogError("Failed to loadUserData().");
          return;
        }
        this._modelUserData = CubismModelUserData.create(buffer, size);
      }
      /**
       * 物理演算データの読み込み
       * @param buffer  physics3.jsonが読み込まれているバッファ
       * @param size    バッファのサイズ
       */
      loadPhysics(buffer, size) {
        if (buffer == null || size == 0) {
          CubismLogError("Failed to loadPhysics().");
          return;
        }
        this._physics = CubismPhysics.create(buffer, size);
      }
      /**
       * 当たり判定の取得
       * @param drawableId 検証したいDrawableのID
       * @param pointX X位置
       * @param pointY Y位置
       * @return true ヒットしている
       * @return false ヒットしていない
       */
      isHit(drawableId, pointX, pointY) {
        const drawIndex = this._model.getDrawableIndex(drawableId);
        if (drawIndex < 0) {
          return false;
        }
        const count = this._model.getDrawableVertexCount(drawIndex);
        const vertices = this._model.getDrawableVertices(drawIndex);
        let left = vertices[0];
        let right = vertices[0];
        let top = vertices[1];
        let bottom = vertices[1];
        for (let j = 1; j < count; ++j) {
          const x = vertices[Constant.vertexOffset + j * Constant.vertexStep];
          const y = vertices[Constant.vertexOffset + j * Constant.vertexStep + 1];
          if (x < left) {
            left = x;
          }
          if (x > right) {
            right = x;
          }
          if (y < top) {
            top = y;
          }
          if (y > bottom) {
            bottom = y;
          }
        }
        const tx = this._modelMatrix.invertTransformX(pointX);
        const ty = this._modelMatrix.invertTransformY(pointY);
        return left <= tx && tx <= right && top <= ty && ty <= bottom;
      }
      /**
       * モデルの取得
       * @return モデル
       */
      getModel() {
        return this._model;
      }
      /**
       * 読み込めないMocファイルの.moc3 Versionを取得
       * @param mocBytes 読み込めないMocファイルのバイト配列
       * @returns .moc3 Version番号
       */
      getMocVersionFromBuffer(mocBytes) {
        return CubismMoc.getMocVersionFromBuffer(mocBytes);
      }
      /**
       * レンダラの取得
       * @return レンダラ
       */
      getRenderer() {
        return this._renderer;
      }
      /**
       * レンダラを作成して初期化を実行する
       * @param width レンダリングする幅
       * @param height レンダリングする高さ
       * @param maskBufferCount バッファの生成数
       */
      createRenderer(width, height, maskBufferCount = 1) {
        if (this._renderer) {
          this.deleteRenderer();
        }
        this._renderer = new CubismRenderer_WebGL(width, height);
        this._renderer.initialize(this._model, maskBufferCount);
      }
      /**
       * レンダラの解放
       */
      deleteRenderer() {
        if (this._renderer != null) {
          this._renderer.release();
          this._renderer = null;
        }
      }
      /**
       * イベント発火時の標準処理
       *
       * Eventが再生処理時にあった場合の処理をする。
       * 継承で上書きすることを想定している。
       * 上書きしない場合はログ出力をする。
       *
       * @param eventValue 発火したイベントの文字列データ
       */
      motionEventFired(eventValue) {
        CubismLogInfo("{0}", eventValue);
      }
      /**
       * イベント用のコールバック
       *
       * CubismMotionQueueManagerにイベント用に登録するためのCallback。
       * CubismUserModelの継承先のEventFiredを呼ぶ。
       *
       * @param caller 発火したイベントを管理していたモーションマネージャー、比較用
       * @param eventValue 発火したイベントの文字列データ
       * @param customData CubismUserModelを継承したインスタンスを想定
       */
      static cubismDefaultMotionEventCallback(caller, eventValue, customData) {
        const model = customData;
        if (model != null) {
          model.motionEventFired(eventValue);
        }
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._moc = null;
        this._model = null;
        this._motionManager = null;
        this._expressionManager = null;
        this._eyeBlink = null;
        this._breath = null;
        this._modelMatrix = null;
        this._pose = null;
        this._dragManager = null;
        this._physics = null;
        this._modelUserData = null;
        this._initialized = false;
        this._updating = false;
        this._opacity = 1;
        this._mocConsistency = false;
        this._debugMode = false;
        this._renderer = null;
        this._motionManager = new CubismMotionManager();
        this._motionManager.setEventCallback(
          _CubismUserModel.cubismDefaultMotionEventCallback,
          this
        );
        this._expressionManager = new CubismExpressionMotionManager();
        this._dragManager = new CubismTargetPoint();
      }
      /**
       * デストラクタに相当する処理
       */
      release() {
        if (this._motionManager != null) {
          this._motionManager.release();
          this._motionManager = null;
        }
        if (this._expressionManager != null) {
          this._expressionManager.release();
          this._expressionManager = null;
        }
        if (this._moc != null) {
          this._moc.deleteModel(this._model);
          this._moc.release();
          this._moc = null;
        }
        this._modelMatrix = null;
        CubismPose.delete(this._pose);
        CubismEyeBlink.delete(this._eyeBlink);
        CubismBreath.delete(this._breath);
        this._dragManager = null;
        CubismPhysics.delete(this._physics);
        CubismModelUserData.delete(this._modelUserData);
        this.deleteRenderer();
      }
      _moc;
      // Mocデータ
      _model;
      // Modelインスタンス
      _motionManager;
      // モーション管理
      _expressionManager;
      // 表情管理
      _eyeBlink;
      // 自動まばたき
      _breath;
      // 呼吸
      _modelMatrix;
      // モデル行列
      _pose;
      // ポーズ管理
      _dragManager;
      // マウスドラッグ
      _physics;
      // 物理演算
      _modelUserData;
      // ユーザーデータ
      _initialized;
      // 初期化されたかどうか
      _updating;
      // 更新されたかどうか
      _opacity;
      // 不透明度
      _mocConsistency;
      // MOC3整合性検証するかどうか
      _motionConsistency;
      // motion3.json整合性検証するかどうか
      _debugMode;
      // デバッグモードかどうか
      _renderer;
      // レンダラ
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismUserModel = CubismUserModel;
    })(Live2DCubismFramework39 || (Live2DCubismFramework39 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/icubismupdater.ts
var CubismUpdateOrder, ICubismUpdater, Live2DCubismFramework40;
var init_icubismupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/icubismupdater.ts"() {
    init_icubismupdater();
    CubismUpdateOrder = ((CubismUpdateOrder2) => {
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_EyeBlink"] = 200] = "CubismUpdateOrder_EyeBlink";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_Expression"] = 300] = "CubismUpdateOrder_Expression";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_Drag"] = 400] = "CubismUpdateOrder_Drag";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_Breath"] = 500] = "CubismUpdateOrder_Breath";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_Physics"] = 600] = "CubismUpdateOrder_Physics";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_LipSync"] = 700] = "CubismUpdateOrder_LipSync";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_Pose"] = 800] = "CubismUpdateOrder_Pose";
      CubismUpdateOrder2[CubismUpdateOrder2["CubismUpdateOrder_Max"] = Number.MAX_SAFE_INTEGER] = "CubismUpdateOrder_Max";
      return CubismUpdateOrder2;
    })(CubismUpdateOrder || {});
    ICubismUpdater = class {
      /**
       * Comparison function used when sorting ICubismUpdater objects.
       *
       * @param left The first ICubismUpdater object to be compared.
       * @param right The second ICubismUpdater object to be compared.
       *
       * @return negative if left should be placed before right,
       *         positive if right should be placed before left,
       *         zero if they are equal.
       */
      static sortFunction(left, right) {
        if (!left || !right) {
          if (!left && !right) return 0;
          if (!left) return 1;
          if (!right) return -1;
        }
        return left.getExecutionOrder() - right.getExecutionOrder();
      }
      _executionOrder;
      _changeListeners = [];
      /**
       * Constructor
       */
      constructor(executionOrder = 0) {
        this._executionOrder = executionOrder;
      }
      getExecutionOrder() {
        return this._executionOrder;
      }
      setExecutionOrder(executionOrder) {
        if (this._executionOrder !== executionOrder) {
          this._executionOrder = executionOrder;
          this.notifyChangeListeners();
        }
      }
      /**
       * Adds a listener to be notified when this updater's properties change.
       *
       * @param listener The listener to add
       */
      addChangeListener(listener) {
        if (listener && this._changeListeners.indexOf(listener) === -1) {
          this._changeListeners.push(listener);
        }
      }
      /**
       * Removes a listener from the notification list.
       *
       * @param listener The listener to remove
       */
      removeChangeListener(listener) {
        const index = this._changeListeners.indexOf(listener);
        if (index >= 0) {
          this._changeListeners.splice(index, 1);
        }
      }
      /**
       * Notifies all registered listeners that this updater has changed.
       */
      notifyChangeListeners() {
        for (const listener of this._changeListeners) {
          listener.onUpdaterChanged(this);
        }
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.ICubismUpdater = ICubismUpdater;
    })(Live2DCubismFramework40 || (Live2DCubismFramework40 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismupdatescheduler.ts
var CubismUpdateScheduler, Live2DCubismFramework41;
var init_cubismupdatescheduler = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismupdatescheduler.ts"() {
    init_icubismupdater();
    init_cubismupdatescheduler();
    CubismUpdateScheduler = class {
      _cubismUpdatableList;
      _needsSort;
      /**
       * Constructor
       */
      constructor() {
        this._cubismUpdatableList = [];
        this._needsSort = false;
      }
      /**
       * Destructor equivalent - releases all updaters and removes listeners
       */
      release() {
        for (const updater of this._cubismUpdatableList) {
          if (updater) {
            updater.removeChangeListener(this);
          }
        }
        this._cubismUpdatableList.length = 0;
      }
      /**
       * Adds ICubismUpdater to the update list.
       * The list will be automatically sorted by execution order before the next update.
       *
       * @param updatable The ICubismUpdater instance to be added.
       */
      addUpdatableList(updatable) {
        if (!updatable) {
          return;
        }
        if (this.hasUpdatable(updatable)) {
          return;
        }
        this._cubismUpdatableList.push(updatable);
        updatable.addChangeListener(this);
        this._needsSort = true;
      }
      /**
       * Removes ICubismUpdater from the update list.
       *
       * @param updatable The ICubismUpdater instance to be removed.
       * @return true if the updater was found and removed, false otherwise.
       */
      removeUpdatableList(updatable) {
        if (!updatable) {
          return false;
        }
        const index = this._cubismUpdatableList.indexOf(updatable);
        if (index >= 0) {
          this._cubismUpdatableList.splice(index, 1);
          updatable.removeChangeListener(this);
          return true;
        }
        return false;
      }
      /**
       * Sorts the update list using the ICubismUpdater sort function.
       */
      sortUpdatableList() {
        this._cubismUpdatableList.sort(ICubismUpdater.sortFunction);
        this._needsSort = false;
      }
      /**
       * Updates every element in the list.
       * The list is automatically sorted by execution order before execution.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        if (this._needsSort) {
          this.sortUpdatableList();
        }
        for (let i = 0; i < this._cubismUpdatableList.length; ++i) {
          const updater = this._cubismUpdatableList[i];
          if (updater) {
            updater.onLateUpdate(model, deltaTimeSeconds);
          }
        }
      }
      /**
       * Gets the number of updaters in the list.
       *
       * @return Number of updaters
       */
      getUpdatableCount() {
        return this._cubismUpdatableList.length;
      }
      /**
       * Gets the updater at the specified index.
       *
       * @param index Index of the updater to retrieve
       * @return The updater at the specified index, or null if index is out of bounds
       */
      getUpdatable(index) {
        if (index < 0 || index >= this._cubismUpdatableList.length) {
          return null;
        }
        return this._cubismUpdatableList[index];
      }
      /**
       * Checks if the specified updater exists in the list.
       *
       * @param updatable The updater to check for
       * @return true if the updater exists in the list, false otherwise
       */
      hasUpdatable(updatable) {
        return this._cubismUpdatableList.indexOf(updatable) >= 0;
      }
      /**
       * Clears all updaters from the list.
       */
      clearUpdatableList() {
        for (const updater of this._cubismUpdatableList) {
          if (updater) {
            updater.removeChangeListener(this);
          }
        }
        this._cubismUpdatableList.length = 0;
        this._needsSort = false;
      }
      /**
       * Called when an updater's execution order has changed.
       * Marks the list for re-sorting.
       *
       * @param updater The updater that was changed
       */
      onUpdaterChanged(updater) {
        this._needsSort = true;
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismUpdateScheduler = CubismUpdateScheduler;
    })(Live2DCubismFramework41 || (Live2DCubismFramework41 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismbreathupdater.ts
var CubismBreathUpdater, Live2DCubismFramework42;
var init_cubismbreathupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismbreathupdater.ts"() {
    init_icubismupdater();
    init_cubismbreathupdater();
    CubismBreathUpdater = class extends ICubismUpdater {
      _breath;
      constructor(breath, executionOrder) {
        super(executionOrder ?? 500 /* CubismUpdateOrder_Breath */);
        this._breath = breath;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        this._breath.updateParameters(model, deltaTimeSeconds);
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismBreathUpdater = CubismBreathUpdater;
    })(Live2DCubismFramework42 || (Live2DCubismFramework42 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismlookupdater.ts
var CubismLookUpdater, Live2DCubismFramework43;
var init_cubismlookupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismlookupdater.ts"() {
    init_icubismupdater();
    init_cubismlookupdater();
    CubismLookUpdater = class extends ICubismUpdater {
      _look;
      _dragManager;
      constructor(look, dragManager, executionOrder) {
        super(executionOrder ?? 400 /* CubismUpdateOrder_Drag */);
        this._look = look;
        this._dragManager = dragManager;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        this._dragManager.update(deltaTimeSeconds);
        const dragX = this._dragManager.getX();
        const dragY = this._dragManager.getY();
        this._look.updateParameters(model, dragX, dragY);
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismLookUpdater = CubismLookUpdater;
    })(Live2DCubismFramework43 || (Live2DCubismFramework43 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismeyeblinkupdater.ts
var CubismEyeBlinkUpdater, Live2DCubismFramework44;
var init_cubismeyeblinkupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismeyeblinkupdater.ts"() {
    init_icubismupdater();
    init_cubismeyeblinkupdater();
    CubismEyeBlinkUpdater = class extends ICubismUpdater {
      _motionUpdated;
      _eyeBlink;
      constructor(motionUpdated, eyeBlink, executionOrder) {
        super(executionOrder ?? 200 /* CubismUpdateOrder_EyeBlink */);
        this._motionUpdated = motionUpdated;
        this._eyeBlink = eyeBlink;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        if (!this._motionUpdated()) {
          this._eyeBlink.updateParameters(model, deltaTimeSeconds);
        }
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismEyeBlinkUpdater = CubismEyeBlinkUpdater;
    })(Live2DCubismFramework44 || (Live2DCubismFramework44 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismexpressionupdater.ts
var CubismExpressionUpdater, Live2DCubismFramework45;
var init_cubismexpressionupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismexpressionupdater.ts"() {
    init_icubismupdater();
    init_cubismexpressionupdater();
    CubismExpressionUpdater = class extends ICubismUpdater {
      _expressionManager;
      constructor(expressionManager, executionOrder) {
        super(executionOrder ?? 300 /* CubismUpdateOrder_Expression */);
        this._expressionManager = expressionManager;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        this._expressionManager.updateMotion(model, deltaTimeSeconds);
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismExpressionUpdater = CubismExpressionUpdater;
    })(Live2DCubismFramework45 || (Live2DCubismFramework45 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismphysicsupdater.ts
var CubismPhysicsUpdater, Live2DCubismFramework46;
var init_cubismphysicsupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismphysicsupdater.ts"() {
    init_icubismupdater();
    init_cubismphysicsupdater();
    CubismPhysicsUpdater = class extends ICubismUpdater {
      _physics;
      constructor(physics, executionOrder) {
        super(executionOrder ?? 600 /* CubismUpdateOrder_Physics */);
        this._physics = physics;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        this._physics.evaluate(model, deltaTimeSeconds);
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismPhysicsUpdater = CubismPhysicsUpdater;
    })(Live2DCubismFramework46 || (Live2DCubismFramework46 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismposeupdater.ts
var CubismPoseUpdater, Live2DCubismFramework47;
var init_cubismposeupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismposeupdater.ts"() {
    init_icubismupdater();
    init_cubismposeupdater();
    CubismPoseUpdater = class extends ICubismUpdater {
      _pose;
      constructor(pose, executionOrder) {
        super(executionOrder ?? 800 /* CubismUpdateOrder_Pose */);
        this._pose = pose;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        this._pose.updateParameters(model, deltaTimeSeconds);
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismPoseUpdater = CubismPoseUpdater;
    })(Live2DCubismFramework47 || (Live2DCubismFramework47 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/cubismlipsyncupdater.ts
var CubismLipSyncUpdater, Live2DCubismFramework48;
var init_cubismlipsyncupdater = __esm({
  "vendor/live2d/sdk/Framework/src/motion/cubismlipsyncupdater.ts"() {
    init_icubismupdater();
    init_cubismlipsyncupdater();
    CubismLipSyncUpdater = class extends ICubismUpdater {
      _lipSyncIds;
      _audioProvider;
      constructor(lipSyncIds, audioProvider, executionOrder) {
        super(executionOrder ?? 700 /* CubismUpdateOrder_LipSync */);
        this._lipSyncIds = [...lipSyncIds];
        this._audioProvider = audioProvider;
      }
      /**
       * Update process.
       *
       * @param model Model to update
       * @param deltaTimeSeconds Delta time in seconds.
       */
      onLateUpdate(model, deltaTimeSeconds) {
        if (!model) {
          return;
        }
        if (this._audioProvider) {
          const updateSuccessful = this._audioProvider.update(deltaTimeSeconds);
          if (updateSuccessful) {
            const lipSyncValue = this._audioProvider.getParameter();
            for (let i = 0; i < this._lipSyncIds.length; i++) {
              model.addParameterValueById(this._lipSyncIds[i], lipSyncValue);
            }
          }
        }
      }
      /**
       * Set audio parameter provider.
       *
       * @param audioProvider Audio parameter provider to set
       */
      setAudioProvider(audioProvider) {
        this._audioProvider = audioProvider;
      }
      /**
       * Get audio parameter provider.
       *
       * @return Current audio parameter provider
       */
      getAudioProvider() {
        return this._audioProvider;
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismLipSyncUpdater = CubismLipSyncUpdater;
    })(Live2DCubismFramework48 || (Live2DCubismFramework48 = {}));
  }
});

// vendor/live2d/sdk/Framework/src/motion/iparameterprovider.ts
var IParameterProvider, Live2DCubismFramework49;
var init_iparameterprovider = __esm({
  "vendor/live2d/sdk/Framework/src/motion/iparameterprovider.ts"() {
    init_iparameterprovider();
    IParameterProvider = class {
      /**
       * Constructor
       */
      constructor() {
      }
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.IParameterProvider = IParameterProvider;
    })(Live2DCubismFramework49 || (Live2DCubismFramework49 = {}));
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappwavfilehandler.ts
var LAppWavFileHandler, WavFileInfo, ByteReader;
var init_lappwavfilehandler = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappwavfilehandler.ts"() {
    init_iparameterprovider();
    LAppWavFileHandler = class extends IParameterProvider {
      update(deltaTimeSeconds) {
        let goalOffset;
        let rms;
        if (this._pcmData == null || this._sampleOffset >= this._wavFileInfo._samplesPerChannel) {
          this._lastRms = 0;
          return false;
        }
        const actualDeltaTime = deltaTimeSeconds ?? 1 / 60;
        this._userTimeSeconds += actualDeltaTime;
        goalOffset = Math.floor(
          this._userTimeSeconds * this._wavFileInfo._samplingRate
        );
        if (goalOffset > this._wavFileInfo._samplesPerChannel) {
          goalOffset = this._wavFileInfo._samplesPerChannel;
        }
        rms = 0;
        for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
          for (let sampleCount = this._sampleOffset; sampleCount < goalOffset; sampleCount++) {
            const pcm = this._pcmData[channelCount][sampleCount];
            rms += pcm * pcm;
          }
        }
        rms = Math.sqrt(
          rms / (this._wavFileInfo._numberOfChannels * (goalOffset - this._sampleOffset))
        );
        this._lastRms = rms;
        this._sampleOffset = goalOffset;
        return true;
      }
      start(filePath) {
        this._sampleOffset = 0;
        this._userTimeSeconds = 0;
        this._lastRms = 0;
        this.loadWavFile(filePath);
      }
      /**
       * Get parameter value for lip sync.
       *
       * @return RMS value from audio
       */
      getParameter() {
        return this.getRms();
      }
      getRms() {
        return this._lastRms;
      }
      loadWavFile(filePath) {
        return new Promise((resolveValue) => {
          let ret = false;
          if (this._pcmData != null) {
            this.releasePcmData();
          }
          const asyncFileLoad = async () => {
            return fetch(filePath).then((responce) => {
              return responce.arrayBuffer();
            });
          };
          const asyncWavFileManager = (async () => {
            this._byteReader._fileByte = await asyncFileLoad();
            this._byteReader._fileDataView = new DataView(
              this._byteReader._fileByte
            );
            this._byteReader._fileSize = this._byteReader._fileByte.byteLength;
            this._byteReader._readOffset = 0;
            if (this._byteReader._fileByte == null || this._byteReader._fileSize < 4) {
              resolveValue(false);
              return;
            }
            this._wavFileInfo._fileName = filePath;
            try {
              if (!this._byteReader.getCheckSignature("RIFF")) {
                ret = false;
                throw new Error('Cannot find Signeture "RIFF".');
              }
              this._byteReader.get32LittleEndian();
              if (!this._byteReader.getCheckSignature("WAVE")) {
                ret = false;
                throw new Error('Cannot find Signeture "WAVE".');
              }
              if (!this._byteReader.getCheckSignature("fmt ")) {
                ret = false;
                throw new Error('Cannot find Signeture "fmt".');
              }
              const fmtChunkSize = this._byteReader.get32LittleEndian();
              if (this._byteReader.get16LittleEndian() != 1) {
                ret = false;
                throw new Error("File is not linear PCM.");
              }
              this._wavFileInfo._numberOfChannels = this._byteReader.get16LittleEndian();
              this._wavFileInfo._samplingRate = this._byteReader.get32LittleEndian();
              this._byteReader.get32LittleEndian();
              this._byteReader.get16LittleEndian();
              this._wavFileInfo._bitsPerSample = this._byteReader.get16LittleEndian();
              if (fmtChunkSize > 16) {
                this._byteReader._readOffset += fmtChunkSize - 16;
              }
              while (!this._byteReader.getCheckSignature("data") && this._byteReader._readOffset < this._byteReader._fileSize) {
                this._byteReader._readOffset += this._byteReader.get32LittleEndian() + 4;
              }
              if (this._byteReader._readOffset >= this._byteReader._fileSize) {
                ret = false;
                throw new Error('Cannot find "data" Chunk.');
              }
              {
                const dataChunkSize = this._byteReader.get32LittleEndian();
                this._wavFileInfo._samplesPerChannel = dataChunkSize * 8 / (this._wavFileInfo._bitsPerSample * this._wavFileInfo._numberOfChannels);
              }
              this._pcmData = new Array(this._wavFileInfo._numberOfChannels);
              for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
                this._pcmData[channelCount] = new Float32Array(
                  this._wavFileInfo._samplesPerChannel
                );
              }
              for (let sampleCount = 0; sampleCount < this._wavFileInfo._samplesPerChannel; sampleCount++) {
                for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
                  this._pcmData[channelCount][sampleCount] = this.getPcmSample();
                }
              }
              ret = true;
              resolveValue(ret);
            } catch (e) {
              console.log(e);
            }
          })().then(() => {
            resolveValue(ret);
          });
        });
      }
      getPcmSample() {
        let pcm32;
        switch (this._wavFileInfo._bitsPerSample) {
          case 8:
            pcm32 = this._byteReader.get8() - 128;
            pcm32 <<= 24;
            break;
          case 16:
            pcm32 = this._byteReader.get16LittleEndian() << 16;
            break;
          case 24:
            pcm32 = this._byteReader.get24LittleEndian() << 8;
            break;
          default:
            pcm32 = 0;
            break;
        }
        return pcm32 / 2147483647;
      }
      /**
       * 指定したチャンネルから音声サンプルの配列を取得する
       *
       * @param usechannel 利用するチャンネル
       * @return 指定したチャンネルの音声サンプルの配列
       */
      getPcmDataChannel(usechannel) {
        if (!this._pcmData || !(usechannel < this._pcmData.length)) {
          return null;
        }
        return Float32Array.from(this._pcmData[usechannel]);
      }
      /**
       * 音声のサンプリング周波数を取得する。
       *
       * @return 音声のサンプリング周波数
       */
      getWavSamplingRate() {
        if (!this._wavFileInfo || this._wavFileInfo._samplingRate < 1) {
          return null;
        }
        return this._wavFileInfo._samplingRate;
      }
      releasePcmData() {
        for (let channelCount = 0; channelCount < this._wavFileInfo._numberOfChannels; channelCount++) {
          this._pcmData[channelCount] = null;
        }
        delete this._pcmData;
        this._pcmData = null;
      }
      constructor() {
        super();
        this._pcmData = null;
        this._userTimeSeconds = 0;
        this._lastRms = 0;
        this._sampleOffset = 0;
        this._wavFileInfo = new WavFileInfo();
        this._byteReader = new ByteReader();
      }
      _pcmData;
      _userTimeSeconds;
      _lastRms;
      _sampleOffset;
      _wavFileInfo;
      _byteReader;
      loadFiletoBytes = (arrayBuffer, length) => {
        this._byteReader._fileByte = arrayBuffer;
        this._byteReader._fileDataView = new DataView(this._byteReader._fileByte);
        this._byteReader._fileSize = length;
      };
    };
    WavFileInfo = class {
      constructor() {
        this._fileName = "";
        this._numberOfChannels = 0;
        this._bitsPerSample = 0;
        this._samplingRate = 0;
        this._samplesPerChannel = 0;
      }
      _fileName;
      ///< ファイル名
      _numberOfChannels;
      ///< チャンネル数
      _bitsPerSample;
      ///< サンプルあたりビット数
      _samplingRate;
      ///< サンプリングレート
      _samplesPerChannel;
      ///< 1チャンネルあたり総サンプル数
    };
    ByteReader = class {
      constructor() {
        this._fileByte = null;
        this._fileDataView = null;
        this._fileSize = 0;
        this._readOffset = 0;
      }
      /**
       * @brief 8ビット読み込み
       * @return Csm::csmUint8 読み取った8ビット値
       */
      get8() {
        const ret = this._fileDataView.getUint8(this._readOffset);
        this._readOffset++;
        return ret;
      }
      /**
       * @brief 16ビット読み込み（リトルエンディアン）
       * @return Csm::csmUint16 読み取った16ビット値
       */
      get16LittleEndian() {
        const ret = this._fileDataView.getUint8(this._readOffset + 1) << 8 | this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 2;
        return ret;
      }
      /**
       * @brief 24ビット読み込み（リトルエンディアン）
       * @return Csm::csmUint32 読み取った24ビット値（下位24ビットに設定）
       */
      get24LittleEndian() {
        const ret = this._fileDataView.getUint8(this._readOffset + 2) << 16 | this._fileDataView.getUint8(this._readOffset + 1) << 8 | this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 3;
        return ret;
      }
      /**
       * @brief 32ビット読み込み（リトルエンディアン）
       * @return Csm::csmUint32 読み取った32ビット値
       */
      get32LittleEndian() {
        const ret = this._fileDataView.getUint8(this._readOffset + 3) << 24 | this._fileDataView.getUint8(this._readOffset + 2) << 16 | this._fileDataView.getUint8(this._readOffset + 1) << 8 | this._fileDataView.getUint8(this._readOffset);
        this._readOffset += 4;
        return ret;
      }
      /**
       * @brief シグネチャの取得と参照文字列との一致チェック
       * @param[in] reference 検査対象のシグネチャ文字列
       * @return  true    一致している
       *          false   一致していない
       */
      getCheckSignature(reference) {
        const getSignature = new Uint8Array(4);
        const referenceString = new TextEncoder().encode(reference);
        if (reference.length != 4) {
          return false;
        }
        for (let signatureOffset = 0; signatureOffset < 4; signatureOffset++) {
          getSignature[signatureOffset] = this.get8();
        }
        return getSignature[0] == referenceString[0] && getSignature[1] == referenceString[1] && getSignature[2] == referenceString[2] && getSignature[3] == referenceString[3];
      }
      _fileByte;
      ///< ロードしたファイルのバイト列
      _fileDataView;
      _fileSize;
      ///< ファイルサイズ
      _readOffset;
      ///< ファイル参照位置
    };
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappmodel.ts
var LAppModel;
var init_lappmodel = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappmodel.ts"() {
    init_cubismdefaultparameterid();
    init_cubismmodelsettingjson();
    init_cubismbreath();
    init_cubismlook();
    init_cubismeyeblink();
    init_live2dcubismframework();
    init_cubismusermodel();
    init_acubismmotion();
    init_cubismmotionqueuemanager();
    init_cubismupdatescheduler();
    init_cubismbreathupdater();
    init_cubismlookupdater();
    init_cubismeyeblinkupdater();
    init_cubismexpressionupdater();
    init_cubismphysicsupdater();
    init_cubismposeupdater();
    init_cubismlipsyncupdater();
    init_cubismdebug();
    init_platform_define();
    init_lapppal();
    init_lappwavfilehandler();
    init_cubismmoc();
    LAppModel = class extends CubismUserModel {
      /**
       * model3.jsonが置かれたディレクトリとファイルパスからモデルを生成する
       * @param dir
       * @param fileName
       */
      loadAssets(dir, fileName) {
        this._modelHomeDir = dir;
        fetch(`${this._modelHomeDir}${fileName}`).then((response) => response.arrayBuffer()).then((arrayBuffer) => {
          const setting = new CubismModelSettingJson(
            arrayBuffer,
            arrayBuffer.byteLength
          );
          this._state = 1 /* LoadModel */;
          this.setupModel(setting);
        }).catch((error) => {
          CubismLogError(`Failed to load file ${this._modelHomeDir}${fileName}`);
        });
      }
      /**
       * model3.jsonからモデルを生成する。
       * model3.jsonの記述に従ってモデル生成、モーション、物理演算などのコンポーネント生成を行う。
       *
       * @param setting ICubismModelSettingのインスタンス
       */
      setupModel(setting) {
        this._updating = true;
        this._initialized = false;
        this._modelSetting = setting;
        if (this._modelSetting.getModelFileName() != "") {
          const modelFileName = this._modelSetting.getModelFileName();
          fetch(`${this._modelHomeDir}${modelFileName}`).then((response) => {
            if (response.ok) {
              return response.arrayBuffer();
            } else if (response.status >= 400) {
              CubismLogError(
                `Failed to load file ${this._modelHomeDir}${modelFileName}`
              );
              return new ArrayBuffer(0);
            }
          }).then((arrayBuffer) => {
            this.loadModel(arrayBuffer, this._mocConsistency);
            this._state = 3 /* LoadExpression */;
            loadCubismExpression();
          });
          this._state = 2 /* WaitLoadModel */;
        } else {
          LAppPal.printMessage("Model data does not exist.");
        }
        const loadCubismExpression = () => {
          if (this._modelSetting.getExpressionCount() > 0) {
            const count = this._modelSetting.getExpressionCount();
            for (let i = 0; i < count; i++) {
              const expressionName = this._modelSetting.getExpressionName(i);
              const expressionFileName = this._modelSetting.getExpressionFileName(i);
              fetch(`${this._modelHomeDir}${expressionFileName}`).then((response) => {
                if (response.ok) {
                  return response.arrayBuffer();
                } else if (response.status >= 400) {
                  CubismLogError(
                    `Failed to load file ${this._modelHomeDir}${expressionFileName}`
                  );
                  return new ArrayBuffer(0);
                }
              }).then((arrayBuffer) => {
                const motion = this.loadExpression(
                  arrayBuffer,
                  arrayBuffer.byteLength,
                  expressionName
                );
                if (this._expressions.get(expressionName) != null) {
                  ACubismMotion.delete(this._expressions.get(expressionName));
                  this._expressions.set(expressionName, null);
                }
                this._expressions.set(expressionName, motion);
                this._expressionCount++;
                if (this._expressionCount >= count) {
                  if (this._expressionManager != null) {
                    const expressionUpdater = new CubismExpressionUpdater(
                      this._expressionManager
                    );
                    this._updateScheduler.addUpdatableList(expressionUpdater);
                  }
                  this._state = 5 /* LoadPhysics */;
                  loadCubismPhysics();
                }
              });
            }
            this._state = 4 /* WaitLoadExpression */;
          } else {
            this._state = 5 /* LoadPhysics */;
            loadCubismPhysics();
          }
        };
        const loadCubismPhysics = () => {
          if (this._modelSetting.getPhysicsFileName() != "") {
            const physicsFileName = this._modelSetting.getPhysicsFileName();
            fetch(`${this._modelHomeDir}${physicsFileName}`).then((response) => {
              if (response.ok) {
                return response.arrayBuffer();
              } else if (response.status >= 400) {
                CubismLogError(
                  `Failed to load file ${this._modelHomeDir}${physicsFileName}`
                );
                return new ArrayBuffer(0);
              }
            }).then((arrayBuffer) => {
              this.loadPhysics(arrayBuffer, arrayBuffer.byteLength);
              if (this._physics) {
                const physicsUpdater = new CubismPhysicsUpdater(this._physics);
                this._updateScheduler.addUpdatableList(physicsUpdater);
              }
              this._state = 7 /* LoadPose */;
              loadCubismPose();
            });
            this._state = 6 /* WaitLoadPhysics */;
          } else {
            this._state = 7 /* LoadPose */;
            loadCubismPose();
          }
        };
        const loadCubismPose = () => {
          if (this._modelSetting.getPoseFileName() != "") {
            const poseFileName = this._modelSetting.getPoseFileName();
            fetch(`${this._modelHomeDir}${poseFileName}`).then((response) => {
              if (response.ok) {
                return response.arrayBuffer();
              } else if (response.status >= 400) {
                CubismLogError(
                  `Failed to load file ${this._modelHomeDir}${poseFileName}`
                );
                return new ArrayBuffer(0);
              }
            }).then((arrayBuffer) => {
              this.loadPose(arrayBuffer, arrayBuffer.byteLength);
              if (this._pose) {
                const poseUpdater = new CubismPoseUpdater(this._pose);
                this._updateScheduler.addUpdatableList(poseUpdater);
              }
              this._state = 9 /* SetupEyeBlink */;
              setupEyeBlink();
            });
            this._state = 8 /* WaitLoadPose */;
          } else {
            this._state = 9 /* SetupEyeBlink */;
            setupEyeBlink();
          }
        };
        const setupEyeBlink = () => {
          if (this._modelSetting.getEyeBlinkParameterCount() > 0) {
            this._eyeBlink = CubismEyeBlink.create(this._modelSetting);
            const eyeBlinkUpdater = new CubismEyeBlinkUpdater(
              () => this._motionUpdated,
              this._eyeBlink
            );
            this._updateScheduler.addUpdatableList(eyeBlinkUpdater);
          }
          this._state = 10 /* SetupBreath */;
          setupBreath();
        };
        const setupBreath = () => {
          this._breath = CubismBreath.create();
          const breathParameters = [
            new BreathParameterData(this._idParamAngleX, 0, 15, 6.5345, 0.5),
            new BreathParameterData(this._idParamAngleY, 0, 8, 3.5345, 0.5),
            new BreathParameterData(this._idParamAngleZ, 0, 10, 5.5345, 0.5),
            new BreathParameterData(
              this._idParamBodyAngleX,
              0,
              4,
              15.5345,
              0.5
            ),
            new BreathParameterData(
              CubismFramework.getIdManager().getId(
                CubismDefaultParameterId.ParamBreath
              ),
              0.5,
              0.5,
              3.2345,
              1
            )
          ];
          this._breath.setParameters(breathParameters);
          const breathUpdater = new CubismBreathUpdater(this._breath);
          this._updateScheduler.addUpdatableList(breathUpdater);
          this._state = 11 /* LoadUserData */;
          loadUserData();
        };
        const loadUserData = () => {
          if (this._modelSetting.getUserDataFile() != "") {
            const userDataFile = this._modelSetting.getUserDataFile();
            fetch(`${this._modelHomeDir}${userDataFile}`).then((response) => {
              if (response.ok) {
                return response.arrayBuffer();
              } else if (response.status >= 400) {
                CubismLogError(
                  `Failed to load file ${this._modelHomeDir}${userDataFile}`
                );
                return new ArrayBuffer(0);
              }
            }).then((arrayBuffer) => {
              this.loadUserData(arrayBuffer, arrayBuffer.byteLength);
              this._state = 13 /* SetupEyeBlinkIds */;
              setupEyeBlinkIds();
            });
            this._state = 12 /* WaitLoadUserData */;
          } else {
            this._state = 13 /* SetupEyeBlinkIds */;
            setupEyeBlinkIds();
          }
        };
        const setupEyeBlinkIds = () => {
          const eyeBlinkIdCount = this._modelSetting.getEyeBlinkParameterCount();
          this._eyeBlinkIds.length = eyeBlinkIdCount;
          for (let i = 0; i < eyeBlinkIdCount; ++i) {
            this._eyeBlinkIds[i] = this._modelSetting.getEyeBlinkParameterId(i);
          }
          this._state = 14 /* SetupLipSyncIds */;
          setupLipSyncIds();
        };
        const setupLipSyncIds = () => {
          const lipSyncIdCount = this._modelSetting.getLipSyncParameterCount();
          this._lipSyncIds.length = lipSyncIdCount;
          for (let i = 0; i < lipSyncIdCount; ++i) {
            this._lipSyncIds[i] = this._modelSetting.getLipSyncParameterId(i);
          }
          if (this._lipSyncIds.length > 0) {
            const lipSyncUpdater = new CubismLipSyncUpdater(
              this._lipSyncIds,
              this._wavFileHandler
            );
            this._updateScheduler.addUpdatableList(lipSyncUpdater);
          }
          this._state = 15 /* SetupLook */;
          setupLook();
        };
        const setupLook = () => {
          this._look = CubismLook.create();
          const lookParameters = [
            new LookParameterData(this._idParamAngleX, 30, 0, 0),
            new LookParameterData(this._idParamAngleY, 0, 30, 0),
            new LookParameterData(this._idParamAngleZ, 0, 0, -30),
            new LookParameterData(this._idParamBodyAngleX, 10, 0, 0),
            new LookParameterData(
              CubismFramework.getIdManager().getId(
                CubismDefaultParameterId.ParamEyeBallX
              ),
              1,
              0,
              0
            ),
            new LookParameterData(
              CubismFramework.getIdManager().getId(
                CubismDefaultParameterId.ParamEyeBallY
              ),
              0,
              1,
              0
            )
          ];
          this._look.setParameters(lookParameters);
          const lookUpdater = new CubismLookUpdater(this._look, this._dragManager);
          this._updateScheduler.addUpdatableList(lookUpdater);
          finalizeUpdaters();
        };
        const finalizeUpdaters = () => {
          this._updateScheduler.sortUpdatableList();
          this._state = 16 /* SetupLayout */;
          setupLayout();
        };
        const setupLayout = () => {
          const layout = /* @__PURE__ */ new Map();
          if (this._modelSetting == null || this._modelMatrix == null) {
            CubismLogError("Failed to setupLayout().");
            return;
          }
          this._modelSetting.getLayoutMap(layout);
          this._modelMatrix.setupFromLayout(layout);
          this._state = 17 /* LoadMotion */;
          loadCubismMotion();
        };
        const loadCubismMotion = () => {
          this._state = 18 /* WaitLoadMotion */;
          this._model.saveParameters();
          this._allMotionCount = 0;
          this._motionCount = 0;
          const group = [];
          const motionGroupCount = this._modelSetting.getMotionGroupCount();
          for (let i = 0; i < motionGroupCount; i++) {
            group[i] = this._modelSetting.getMotionGroupName(i);
            this._allMotionCount += this._modelSetting.getMotionCount(group[i]);
          }
          for (let i = 0; i < motionGroupCount; i++) {
            this.preLoadMotionGroup(group[i]);
          }
          if (motionGroupCount == 0) {
            this._state = 21 /* LoadTexture */;
            this._motionManager.stopAllMotions();
            this._updating = false;
            this._initialized = true;
            this.createRenderer(
              this._subdelegate.getCanvas().width,
              this._subdelegate.getCanvas().height
            );
            this.setupTextures();
            this.getRenderer().startUp(this._subdelegate.getGlManager().getGl());
            this.getRenderer().loadShaders(ShaderPath);
          }
        };
      }
      /**
       * テクスチャユニットにテクスチャをロードする
       */
      setupTextures() {
        const usePremultiply = true;
        if (this._state == 21 /* LoadTexture */) {
          const textureCount = this._modelSetting.getTextureCount();
          for (let modelTextureNumber = 0; modelTextureNumber < textureCount; modelTextureNumber++) {
            if (this._modelSetting.getTextureFileName(modelTextureNumber) == "") {
              console.log("getTextureFileName null");
              continue;
            }
            let texturePath = this._modelSetting.getTextureFileName(modelTextureNumber);
            texturePath = this._modelHomeDir + texturePath;
            const onLoad = (textureInfo) => {
              this.getRenderer().bindTexture(modelTextureNumber, textureInfo.id);
              this._textureCount++;
              if (this._textureCount >= textureCount) {
                this._state = 23 /* CompleteSetup */;
              }
            };
            this._subdelegate.getTextureManager().createTextureFromPngFile(texturePath, usePremultiply, onLoad);
            this.getRenderer().setIsPremultipliedAlpha(usePremultiply);
          }
          this._state = 22 /* WaitLoadTexture */;
        }
      }
      /**
       * レンダラを再構築する
       */
      reloadRenderer() {
        this.deleteRenderer();
        this.createRenderer(
          this._subdelegate.getCanvas().width,
          this._subdelegate.getCanvas().height
        );
        this.setupTextures();
      }
      /**
       * 更新
       */
      update() {
        if (this._state != 23 /* CompleteSetup */) return;
        const deltaTimeSeconds = LAppPal.getDeltaTime();
        this._userTimeSeconds += deltaTimeSeconds;
        this._model.loadParameters();
        this._motionUpdated = false;
        if (this._motionManager.isFinished()) {
          if (EnableAutoIdleMotion) {
            this.startRandomMotion(
              MotionGroupIdle,
              PriorityIdle
            );
          }
        } else {
          this._motionUpdated = this._motionManager.updateMotion(
            this._model,
            deltaTimeSeconds
          );
        }
        this._model.saveParameters();
        this._updateScheduler.onLateUpdate(this._model, deltaTimeSeconds);
        this._model.update();
      }
      /**
       * 引数で指定したモーションの再生を開始する
       * @param group モーショングループ名
       * @param no グループ内の番号
       * @param priority 優先度
       * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
       * @return 開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するisFinished()の引数で使用する。開始できない時は[-1]
       */
      startMotion(group, no, priority, onFinishedMotionHandler, onBeganMotionHandler) {
        if (priority == PriorityForce) {
          this._motionManager.setReservePriority(priority);
        } else if (!this._motionManager.reserveMotion(priority)) {
          if (this._debugMode) {
            LAppPal.printMessage("[APP]can't start motion.");
          }
          return InvalidMotionQueueEntryHandleValue;
        }
        const motionFileName = this._modelSetting.getMotionFileName(group, no);
        const name2 = `${group}_${no}`;
        let motion = this._motions.get(name2);
        let autoDelete = false;
        if (motion == null) {
          fetch(`${this._modelHomeDir}${motionFileName}`).then((response) => {
            if (response.ok) {
              return response.arrayBuffer();
            } else if (response.status >= 400) {
              CubismLogError(
                `Failed to load file ${this._modelHomeDir}${motionFileName}`
              );
              return new ArrayBuffer(0);
            }
          }).then((arrayBuffer) => {
            motion = this.loadMotion(
              arrayBuffer,
              arrayBuffer.byteLength,
              null,
              onFinishedMotionHandler,
              onBeganMotionHandler,
              this._modelSetting,
              group,
              no,
              this._motionConsistency
            );
          });
          if (motion) {
            motion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
            autoDelete = true;
          } else {
            CubismLogError("Can't start motion {0} .", motionFileName);
            this._motionManager.setReservePriority(PriorityNone);
            return InvalidMotionQueueEntryHandleValue;
          }
        } else {
          motion.setBeganMotionHandler(onBeganMotionHandler);
          motion.setFinishedMotionHandler(onFinishedMotionHandler);
        }
        const voice = this._modelSetting.getMotionSoundFileName(group, no);
        if (voice.localeCompare("") != 0) {
          let path = voice;
          path = this._modelHomeDir + path;
          this._wavFileHandler.start(path);
        }
        if (this._debugMode) {
          LAppPal.printMessage(`[APP]start motion: [${group}_${no}]`);
        }
        return this._motionManager.startMotionPriority(
          motion,
          autoDelete,
          priority
        );
      }
      /**
       * ランダムに選ばれたモーションの再生を開始する。
       * @param group モーショングループ名
       * @param priority 優先度
       * @param onFinishedMotionHandler モーション再生終了時に呼び出されるコールバック関数
       * @return 開始したモーションの識別番号を返す。個別のモーションが終了したか否かを判定するisFinished()の引数で使用する。開始できない時は[-1]
       */
      startRandomMotion(group, priority, onFinishedMotionHandler, onBeganMotionHandler) {
        if (this._modelSetting.getMotionCount(group) == 0) {
          return InvalidMotionQueueEntryHandleValue;
        }
        const no = Math.floor(
          Math.random() * this._modelSetting.getMotionCount(group)
        );
        return this.startMotion(
          group,
          no,
          priority,
          onFinishedMotionHandler,
          onBeganMotionHandler
        );
      }
      /**
       * 引数で指定した表情モーションをセットする
       *
       * @param expressionId 表情モーションのID
       */
      setExpression(expressionId) {
        const motion = this._expressions.get(expressionId);
        if (this._debugMode) {
          LAppPal.printMessage(`[APP]expression: [${expressionId}]`);
        }
        if (motion != null) {
          this._expressionManager.startMotion(motion, false);
        } else {
          if (this._debugMode) {
            LAppPal.printMessage(`[APP]expression[${expressionId}] is null`);
          }
        }
      }
      /**
       * ランダムに選ばれた表情モーションをセットする
       */
      setRandomExpression() {
        if (this._expressions.size == 0) {
          return;
        }
        const no = Math.floor(Math.random() * this._expressions.size);
        for (let i = 0; i < this._expressions.size; i++) {
          if (i == no) {
            const expressionsArray = [...this._expressions.entries()];
            const name2 = expressionsArray[i][0];
            this.setExpression(name2);
            return;
          }
        }
      }
      /**
       * イベントの発火を受け取る
       */
      motionEventFired(eventValue) {
        CubismLogInfo("{0} is fired on LAppModel!!", eventValue);
      }
      /**
       * 当たり判定テスト
       * 指定ＩＤの頂点リストから矩形を計算し、座標をが矩形範囲内か判定する。
       *
       * @param hitArenaName  当たり判定をテストする対象のID
       * @param x             判定を行うX座標
       * @param y             判定を行うY座標
       */
      hitTest(hitArenaName, x, y) {
        if (this._opacity < 1) {
          return false;
        }
        const count = this._modelSetting.getHitAreasCount();
        for (let i = 0; i < count; i++) {
          if (this._modelSetting.getHitAreaName(i) == hitArenaName) {
            const drawId = this._modelSetting.getHitAreaId(i);
            return this.isHit(drawId, x, y);
          }
        }
        return false;
      }
      /**
       * モーションデータをグループ名から一括でロードする。
       * モーションデータの名前は内部でModelSettingから取得する。
       *
       * @param group モーションデータのグループ名
       */
      preLoadMotionGroup(group) {
        for (let i = 0; i < this._modelSetting.getMotionCount(group); i++) {
          const motionFileName = this._modelSetting.getMotionFileName(group, i);
          const name2 = `${group}_${i}`;
          if (this._debugMode) {
            LAppPal.printMessage(
              `[APP]load motion: ${motionFileName} => [${name2}]`
            );
          }
          fetch(`${this._modelHomeDir}${motionFileName}`).then((response) => {
            if (response.ok) {
              return response.arrayBuffer();
            } else if (response.status >= 400) {
              CubismLogError(
                `Failed to load file ${this._modelHomeDir}${motionFileName}`
              );
              return new ArrayBuffer(0);
            }
          }).then((arrayBuffer) => {
            const tmpMotion = this.loadMotion(
              arrayBuffer,
              arrayBuffer.byteLength,
              name2,
              null,
              null,
              this._modelSetting,
              group,
              i,
              this._motionConsistency
            );
            if (tmpMotion != null) {
              tmpMotion.setEffectIds(this._eyeBlinkIds, this._lipSyncIds);
              if (this._motions.get(name2) != null) {
                ACubismMotion.delete(this._motions.get(name2));
              }
              this._motions.set(name2, tmpMotion);
              this._motionCount++;
            } else {
              this._allMotionCount--;
            }
            if (this._motionCount >= this._allMotionCount) {
              this._state = 21 /* LoadTexture */;
              this._motionManager.stopAllMotions();
              this._updating = false;
              this._initialized = true;
              this.createRenderer(
                this._subdelegate.getCanvas().width,
                this._subdelegate.getCanvas().height
              );
              this.setupTextures();
              this.getRenderer().startUp(
                this._subdelegate.getGlManager().getGl()
              );
              this.getRenderer().loadShaders(ShaderPath);
            }
          });
        }
      }
      /**
       * すべてのモーションデータを解放する。
       */
      releaseMotions() {
        this._motions.clear();
      }
      /**
       * 全ての表情データを解放する。
       */
      releaseExpressions() {
        this._expressions.clear();
      }
      /**
       * モデルを描画する処理。モデルを描画する空間のView-Projection行列を渡す。
       */
      doDraw() {
        if (this._model == null) return;
        const canvas = this._subdelegate.getCanvas();
        const viewport = [0, 0, canvas.width, canvas.height];
        this.getRenderer().setRenderState(
          this._subdelegate.getFrameBuffer(),
          viewport
        );
        this.getRenderer().drawModel(ShaderPath);
      }
      /**
       * モデルを描画する処理。モデルを描画する空間のView-Projection行列を渡す。
       */
      draw(matrix) {
        if (this._model == null) {
          return;
        }
        if (this._state == 23 /* CompleteSetup */) {
          matrix.multiplyByMatrix(this._modelMatrix);
          this.getRenderer().setMvpMatrix(matrix);
          this.doDraw();
        }
      }
      async hasMocConsistencyFromFile() {
        CSM_ASSERT(this._modelSetting.getModelFileName().localeCompare(``));
        if (this._modelSetting.getModelFileName() != "") {
          const modelFileName = this._modelSetting.getModelFileName();
          const response = await fetch(`${this._modelHomeDir}${modelFileName}`);
          const arrayBuffer = await response.arrayBuffer();
          this._consistency = CubismMoc.hasMocConsistency(arrayBuffer);
          if (!this._consistency) {
            CubismLogInfo("Inconsistent MOC3.");
          } else {
            CubismLogInfo("Consistent MOC3.");
          }
          return this._consistency;
        } else {
          LAppPal.printMessage("Model data does not exist.");
        }
      }
      setSubdelegate(subdelegate) {
        this._subdelegate = subdelegate;
      }
      /**
       * デストラクタに相当する処理のオーバーライド
       */
      release() {
        if (this._look) {
          CubismLook.delete(this._look);
          this._look = null;
        }
        if (this._updateScheduler) {
          this._updateScheduler.release();
        }
        super.release();
      }
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._modelSetting = null;
        this._modelHomeDir = null;
        this._userTimeSeconds = 0;
        this._eyeBlinkIds = new Array();
        this._lipSyncIds = new Array();
        this._motions = /* @__PURE__ */ new Map();
        this._expressions = /* @__PURE__ */ new Map();
        this._hitArea = new Array();
        this._userArea = new Array();
        this._idParamAngleX = CubismFramework.getIdManager().getId(
          CubismDefaultParameterId.ParamAngleX
        );
        this._idParamAngleY = CubismFramework.getIdManager().getId(
          CubismDefaultParameterId.ParamAngleY
        );
        this._idParamAngleZ = CubismFramework.getIdManager().getId(
          CubismDefaultParameterId.ParamAngleZ
        );
        this._idParamBodyAngleX = CubismFramework.getIdManager().getId(
          CubismDefaultParameterId.ParamBodyAngleX
        );
        if (MOCConsistencyValidationEnable) {
          this._mocConsistency = true;
        }
        if (MotionConsistencyValidationEnable) {
          this._motionConsistency = true;
        }
        this._state = 0 /* LoadAssets */;
        this._expressionCount = 0;
        this._textureCount = 0;
        this._motionCount = 0;
        this._allMotionCount = 0;
        this._wavFileHandler = new LAppWavFileHandler();
        this._consistency = false;
        this._look = null;
        this._updateScheduler = new CubismUpdateScheduler();
        this._motionUpdated = false;
      }
      _updateScheduler;
      // アップデートスケジューラー
      _motionUpdated;
      // モーション更新フラグ
      _subdelegate;
      // サブデリゲート
      _modelSetting;
      // モデルセッティング情報
      _modelHomeDir;
      // モデルセッティングが置かれたディレクトリ
      _userTimeSeconds;
      // デルタ時間の積算値[秒]
      _eyeBlinkIds;
      // モデルに設定された瞬き機能用パラメータID
      _lipSyncIds;
      // モデルに設定されたリップシンク機能用パラメータID
      _motions;
      // 読み込まれているモーションのリスト
      _expressions;
      // 読み込まれている表情のリスト
      _hitArea;
      _userArea;
      _idParamAngleX;
      // パラメータID: ParamAngleX
      _idParamAngleY;
      // パラメータID: ParamAngleY
      _idParamAngleZ;
      // パラメータID: ParamAngleZ
      _idParamBodyAngleX;
      // パラメータID: ParamBodyAngleX
      _look;
      // ドラッグ追従
      _state;
      // 現在のステータス管理用
      _expressionCount;
      // 表情データカウント
      _textureCount;
      // テクスチャカウント
      _motionCount;
      // モーションデータカウント
      _allMotionCount;
      // モーション総数
      _wavFileHandler;
      //wavファイルハンドラ
      _consistency;
      // MOC3整合性チェック管理用
    };
  }
});

// vendor/live2d/live2d-player/engine/watermarkSkip.ts
function isWatermarkLabel(name2) {
  return Boolean(name2 && WATERMARK_LABEL.test(name2));
}
function parseWatermarkSkipFromCdi(cdi) {
  const parameters = [];
  const parts = [];
  if (!cdi || typeof cdi !== "object") {
    return { parameters, parts };
  }
  const root = cdi;
  if (Array.isArray(root.Parameters)) {
    for (const item of root.Parameters) {
      if (!item || typeof item !== "object") {
        continue;
      }
      const record = item;
      if (typeof record.Id === "string" && isWatermarkLabel(String(record.Name ?? ""))) {
        parameters.push({ id: record.Id, value: null });
      }
    }
  }
  if (Array.isArray(root.Parts)) {
    for (const item of root.Parts) {
      if (!item || typeof item !== "object") {
        continue;
      }
      const record = item;
      if (typeof record.Id === "string" && isWatermarkLabel(String(record.Name ?? ""))) {
        parts.push(record.Id);
      }
    }
  }
  return { parameters, parts };
}
function parseSpaceHotkeyExpressionFile(vtube) {
  if (!vtube || typeof vtube !== "object") {
    return null;
  }
  const hotkeys = vtube.Hotkeys;
  if (!Array.isArray(hotkeys)) {
    return null;
  }
  for (const hotkey of hotkeys) {
    if (!hotkey || typeof hotkey !== "object") {
      continue;
    }
    const record = hotkey;
    const triggers = record.Triggers;
    if (!triggers || typeof triggers !== "object") {
      continue;
    }
    const keys = Object.values(triggers).filter((value) => typeof value === "string");
    if (!keys.some((key) => key.toLowerCase() === "space")) {
      continue;
    }
    if (typeof record.File === "string" && record.File.toLowerCase().endsWith(".exp3.json")) {
      return record.File.replace(/\\/g, "/");
    }
  }
  return null;
}
function parseExpressionParameterValues(expression) {
  if (!expression || typeof expression !== "object") {
    return [];
  }
  const parameters = expression.Parameters;
  if (!Array.isArray(parameters)) {
    return [];
  }
  const result = [];
  for (const item of parameters) {
    if (!item || typeof item !== "object") {
      continue;
    }
    const record = item;
    if (typeof record.Id !== "string") {
      continue;
    }
    const value = typeof record.Value === "number" ? record.Value : null;
    result.push({ id: record.Id, value });
  }
  return result;
}
function mergeWatermarkPlans(cdi, expressionValues) {
  const byId = /* @__PURE__ */ new Map();
  for (const parameter of cdi.parameters) {
    byId.set(parameter.id, { ...parameter });
  }
  const cdiIds = new Set(byId.keys());
  for (const parameter of expressionValues) {
    if (!cdiIds.has(parameter.id)) {
      continue;
    }
    byId.set(parameter.id, {
      id: parameter.id,
      value: parameter.value
    });
  }
  return {
    parameters: [...byId.values()],
    parts: [...cdi.parts]
  };
}
function hasWatermarkSkip(plan) {
  return plan.parameters.length > 0 || plan.parts.length > 0;
}
async function fetchJson(url) {
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}
function joinUrl(dir, file) {
  const base3 = dir.endsWith("/") ? dir : `${dir}/`;
  return `${base3}${file.replace(/^\/+/, "")}`;
}
async function loadWatermarkSkipPlan(modelDirUrl, model3Json) {
  const model3 = await fetchJson(joinUrl(modelDirUrl, model3Json));
  const displayInfo = model3 && typeof model3 === "object" ? model3.FileReferences?.DisplayInfo : null;
  const cdi = typeof displayInfo === "string" && displayInfo ? await fetchJson(joinUrl(modelDirUrl, displayInfo)) : null;
  const fromCdi = parseWatermarkSkipFromCdi(cdi);
  const vtubeName = model3Json.replace(/\.model3\.json$/i, ".vtube.json");
  const vtube = await fetchJson(joinUrl(modelDirUrl, vtubeName));
  const expressionFile = parseSpaceHotkeyExpressionFile(vtube);
  const expression = expressionFile ? await fetchJson(joinUrl(modelDirUrl, expressionFile)) : null;
  const fromExpression = parseExpressionParameterValues(expression);
  return mergeWatermarkPlans(fromCdi, fromExpression);
}
function applyWatermarkSkip(cubismModel, idManager, plan) {
  for (const parameter of plan.parameters) {
    const handle = idManager.getId(parameter.id);
    const index = cubismModel.getParameterIndex(handle);
    if (index < 0) {
      continue;
    }
    const value = parameter.value == null ? cubismModel.getParameterMaximumValue(index) : parameter.value;
    cubismModel.setParameterValueByIndex(index, value);
  }
  for (const partId of plan.parts) {
    cubismModel.setPartOpacityById(idManager.getId(partId), 0);
  }
}
var WATERMARK_LABEL;
var init_watermarkSkip = __esm({
  "vendor/live2d/live2d-player/engine/watermarkSkip.ts"() {
    WATERMARK_LABEL = /水印|watermark|logo/i;
  }
});

// vendor/live2d/live2d-player/engine/idleLife.ts
function clamp2(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
var CLOSE_MS, OPEN_MS_MIN, OPEN_MS_MAX, INTERVAL_MIN, INTERVAL_MAX, LOOK_HOLD_MS, IdleLife;
var init_idleLife = __esm({
  "vendor/live2d/live2d-player/engine/idleLife.ts"() {
    init_platform_define();
    CLOSE_MS = 75;
    OPEN_MS_MIN = 150;
    OPEN_MS_MAX = 300;
    INTERVAL_MIN = 3e3;
    INTERVAL_MAX = 8e3;
    LOOK_HOLD_MS = 900;
    IdleLife = class {
      phase = "idle";
      phaseStart = 0;
      openDuration = OPEN_MS_MIN;
      nextBlinkAt = performance.now() + this.nextInterval();
      lookX = 0;
      lookY = 0;
      gazeX = 0;
      gazeY = 0;
      lookUntil = 0;
      nextSaccadeAt = performance.now() + 1200;
      saccadeX = 0;
      saccadeY = 0;
      shouldYield(priority) {
        return priority > PriorityIdle;
      }
      /** 指针在画面内时更新注视目标，坐标约 -1 到 1。 */
      setLook(x, y, nowMs) {
        this.lookX = clamp2(x, -1, 1);
        this.lookY = clamp2(y, -1, 1);
        this.lookUntil = nowMs + LOOK_HOLD_MS;
      }
      /**
       * 返回本帧要写入的参数。眼开度是绝对值，眼球是平滑后的目标。
       * openBase 用模型默认睁眼值；默认值过低时按 1 处理。
       */
      frame(nowMs, openBase) {
        const looking = nowMs < this.lookUntil;
        const goalX = looking ? this.lookX : this.saccade(nowMs, "x");
        const goalY = looking ? this.lookY : this.saccade(nowMs, "y");
        this.gazeX += (goalX - this.gazeX) * 0.18;
        this.gazeY += (goalY - this.gazeY) * 0.18;
        const eye = Math.max(openBase, 1) * this.blinkFactor(nowMs);
        return [
          ["ParamEyeLOpen", eye],
          ["ParamEyeROpen", eye],
          ["ParamEyeBallX", this.gazeX * 0.85],
          ["ParamEyeBallY", this.gazeY * 0.65],
          ["ParamAngleX", this.gazeX * 12],
          ["ParamAngleY", this.gazeY * 8]
        ];
      }
      saccade(nowMs, axis) {
        if (nowMs >= this.nextSaccadeAt) {
          this.saccadeX = (Math.random() * 2 - 1) * 0.35;
          this.saccadeY = (Math.random() * 2 - 1) * 0.22;
          this.nextSaccadeAt = nowMs + 1400 + Math.random() * 1800;
        }
        return axis === "x" ? this.saccadeX : this.saccadeY;
      }
      blinkFactor(nowMs) {
        if (this.phase === "idle") {
          if (nowMs < this.nextBlinkAt) {
            return 1;
          }
          this.phase = "closing";
          this.phaseStart = nowMs;
        }
        if (this.phase === "closing") {
          const t2 = Math.min(1, (nowMs - this.phaseStart) / CLOSE_MS);
          if (t2 >= 1) {
            this.phase = "opening";
            this.phaseStart = nowMs;
            this.openDuration = OPEN_MS_MIN + Math.random() * (OPEN_MS_MAX - OPEN_MS_MIN);
            return 0;
          }
          const remain = 1 - t2;
          return remain * remain;
        }
        const t = Math.min(1, (nowMs - this.phaseStart) / this.openDuration);
        if (t >= 1) {
          this.phase = "idle";
          this.nextBlinkAt = nowMs + this.nextInterval();
          return 1;
        }
        return t * t;
      }
      nextInterval() {
        return INTERVAL_MIN + Math.random() * (INTERVAL_MAX - INTERVAL_MIN);
      }
    };
  }
});

// vendor/live2d/live2d-player/engine/platform-live2dmanager.ts
function stopExpressionQueue(model) {
  const manager = model._expressionManager;
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
function resolveModelAssetsPath(resourcesPath, modelDir) {
  const base3 = resourcesPath.endsWith("/") ? resourcesPath : `${resourcesPath}/`;
  if (!modelDir || modelDir === ".") {
    return base3;
  }
  return `${base3}${modelDir}/`;
}
function findMotionGroupForHitArea(areaName, motionGroups) {
  const keys = Object.keys(motionGroups);
  const exact = keys.find(
    (key) => key === `Tap${areaName}` || key === `Tap@${areaName}` || key === "Tap"
  );
  if (exact) {
    return exact;
  }
  return keys.find((key) => {
    const normalized = key.replace(/^Tap@?/i, "");
    return normalized === areaName || key.includes(areaName);
  }) ?? null;
}
var LAppLive2DManager;
var init_platform_live2dmanager = __esm({
  "vendor/live2d/live2d-player/engine/platform-live2dmanager.ts"() {
    init_live2dcubismframework();
    init_cubismmatrix44();
    init_cubismmotionqueuemanager();
    init_cubismoffscreenmanager();
    init_platform_define();
    init_lappmodel();
    init_lapppal();
    init_watermarkSkip();
    init_idleLife();
    LAppLive2DManager = class {
      portraitHead = null;
      _lipSyncValue = 0;
      _watermarkPlan = { parameters: [], parts: [] };
      _watermarkLoadToken = 0;
      _paramOverlay = null;
      _idleLife = new IdleLife();
      /**
       * 現在のシーンで保持しているすべてのモデルを解放する
       */
      releaseAllModel() {
        this._models.length = 0;
      }
      setOffscreenSize(width, height) {
        for (let i = 0; i < this._models.length; i++) {
          const model = this._models[i];
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
      onDrag(_x, _y) {
        const model = this._models[0];
        if (model) {
          model.setDragging(0, 0);
        }
      }
      /**
       * 画面をタップした時の処理
       * 默认禁用随机动作；仅 playMotion / 智能体参数可播放
       *
       * @param x 画面のX座標
       * @param y 画面のY座標
       */
      onTap(x, y) {
        if (!EnableTapMotion) {
          return;
        }
        if (DebugLogEnable) {
          LAppPal.printMessage(
            `[APP]tap point: {x: ${x.toFixed(2)} y: ${y.toFixed(2)}}`
          );
        }
        const model = this._models[0];
        if (!model) {
          return;
        }
        const runtime = ActiveCharacter;
        const hitAreas = runtime?.hitAreas ?? [
          { name: HitAreaNameHead, id: "Head" },
          { name: HitAreaNameBody, id: "Body" }
        ];
        const motionGroups = runtime?.motionGroups ?? {};
        for (const area of hitAreas) {
          if (!model.hitTest(area.name, x, y)) {
            continue;
          }
          if (DebugLogEnable) {
            LAppPal.printMessage(`[APP]hit area: [${area.name}]`);
          }
          const motionGroup = findMotionGroupForHitArea(area.name, motionGroups);
          if (motionGroup) {
            model.startRandomMotion(
              motionGroup,
              PriorityNormal,
              this.finishedMotion,
              this.beganMotion
            );
            return;
          }
          model.setRandomExpression();
          return;
        }
        const fallbackGroup = MotionGroupTapBody ?? Object.keys(motionGroups).find((key) => /^Tap/i.test(key));
        if (fallbackGroup) {
          model.startRandomMotion(
            fallbackGroup,
            PriorityNormal,
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
      playMotion(group, index = 0, timeoutMs = 15e3) {
        const model = this._models[0];
        if (!model || !group) {
          console.warn("[live2d] playMotion: no model", group);
          return Promise.resolve(false);
        }
        const runtime = ActiveCharacter;
        const motions = runtime?.motionGroups?.[group];
        if (!motions || motions.length === 0) {
          console.warn("[live2d] playMotion: group missing in runtime", group, runtime?.id);
          LAppPal.printMessage(`[APP]motion group not found: ${group}`);
          return Promise.resolve(false);
        }
        const no = Math.max(0, Math.min(index, motions.length - 1));
        const file = motions[no] ?? "";
        if (/\.exp3(\.json)?$/i.test(file)) {
          const name2 = file.split(/[\\/]/).pop()?.replace(/\.exp3(\.json)?$/i, "") ?? file;
          stopExpressionQueue(model);
          const ok = this.setExpression(name2) || this.setExpression(file);
          LAppPal.printMessage(`[APP]play expression: ${name2} ok=${ok}`);
          return Promise.resolve(ok);
        }
        LAppPal.printMessage(`[APP]play motion: ${group}[${no}]`);
        return new Promise((resolve) => {
          let settled = false;
          const finish = (ok) => {
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
          const onFinished = (self) => {
            this.finishedMotion(self);
            finish(true);
          };
          const onBegan = (self) => {
            this.beganMotion(self);
          };
          const handle = model.startMotion(
            group,
            no,
            PriorityForce,
            onFinished,
            onBegan
          );
          if (handle === InvalidMotionQueueEntryHandleValue) {
            LAppPal.printMessage(
              `[APP]motion start pending/async: ${group}[${no}]`
            );
          }
        });
      }
      /** 复位头部朝向，保持正对屏幕 */
      resetFacing() {
        const model = this._models[0];
        if (model) {
          model.setDragging(0, 0);
        }
      }
      /** 仅写入 model3.json 声明的全部 LipSync 参数。 */
      setLipSyncValue(value) {
        this._lipSyncValue = Math.max(0, Math.min(1, value));
      }
      /** 每帧在 model.update 之后、draw 之前调用，用于 keyframe / blink 叠参。 */
      setParamOverlay(overlay) {
        this._paramOverlay = overlay;
      }
      getParameterValue(paramId) {
        const model = this._models[0];
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
      setParameterValue(paramId, value) {
        const model = this._models[0];
        const cubismModel = model?.getModel();
        if (!cubismModel || !paramId) {
          return;
        }
        try {
          const id = CubismFramework.getIdManager().getId(paramId);
          cubismModel.setParameterValueById(id, value);
        } catch {
        }
      }
      /** 指针在画面上时驱动自动看。坐标为相对画布中心的 -1 到 1。 */
      setLookTarget(x, y) {
        this._idleLife.setLook(x, y, performance.now());
      }
      /**
       * 低优先级眨眼、注视和空闲眼动。显式动作使用 PriorityForce，播放期间不写这些参数。
       * 眨眼写成绝对眼开度：缺少 Cubism EyeBlink 分组的模型，乘当前值会在动作为 0 之后一直闭眼。
       */
      applyIdleLife(model) {
        const priority = model._motionManager?.getCurrentPriority?.() ?? PriorityNone;
        if (this._idleLife.shouldYield(priority)) {
          return;
        }
        const cubismModel = model.getModel();
        if (!cubismModel) {
          return;
        }
        const idManager = CubismFramework.getIdManager();
        const parameterCount = cubismModel.getParameterCount();
        const eyeHandle = idManager.getId("ParamEyeLOpen");
        const eyeIndex = cubismModel.getParameterIndex(eyeHandle);
        const eyeDefault = eyeIndex >= 0 && eyeIndex < parameterCount ? cubismModel.getParameterDefaultValue(eyeIndex) : 1;
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
      setExpression(expressionId) {
        expressionId = ActiveCharacter?.expressionNames?.[expressionId] || expressionId;
        const model = this._models[0];
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
      onUpdate() {
        const gl = this._subdelegate.getGl();
        CubismWebGLOffscreenManager.getInstance().beginFrameProcess(gl);
        const { width, height } = this._subdelegate.getCanvas();
        const projection = new CubismMatrix44();
        const model = this._models[0];
        if (!model) {
          CubismWebGLOffscreenManager.getInstance().endFrameProcess(gl);
          return;
        }
        if (model.getModel()) {
          if (model.getModel().getCanvasWidth() > 1 && width < height) {
            model.getModelMatrix().setWidth(2);
            projection.scale(1, width / height);
          } else {
            projection.scale(height / width, 1);
          }
          if (this._viewMatrix != null) {
            projection.multiplyByMatrix(this._viewMatrix);
          }
        }
        const portrait = this._subdelegate.getCanvas().dataset.portrait === "true";
        if (!portrait) model.update();
        const cubismModel = model.getModel();
        if (portrait && cubismModel) cubismModel.update();
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
              }
            }
          );
        }
        if (!portrait) this.applyIdleLife(model);
        if (hasWatermarkSkip(this._watermarkPlan)) {
          applyWatermarkSkip(
            cubismModel,
            CubismFramework.getIdManager(),
            this._watermarkPlan
          );
        }
        if (cubismModel) cubismModel.update();
        model.draw(projection);
        if (portrait && cubismModel) {
          const head = ActiveCharacter?.hitAreas.find((area) => /head|face|头|脸/i.test(area.name));
          if (head) {
            const index = cubismModel.getDrawableIndex(CubismFramework.getIdManager().getId(head.id));
            if (index >= 0) {
              const vertices = cubismModel.getDrawableVertices(index);
              let left = Infinity, right = -Infinity, top = Infinity, bottom = -Infinity;
              for (let i = 0; i < vertices.length; i += 2) {
                const x = (projection.transformX(vertices[i]) + 1) * width / 2, y = (1 - projection.transformY(vertices[i + 1])) * height / 2;
                left = Math.min(left, x);
                right = Math.max(right, x);
                top = Math.min(top, y);
                bottom = Math.max(bottom, y);
              }
              if (right > left && bottom > top) this.portraitHead = { x: left, y: top, width: right - left, height: bottom - top };
            }
          }
        }
        CubismWebGLOffscreenManager.getInstance().endFrameProcess(gl);
        CubismWebGLOffscreenManager.getInstance().releaseStaleRenderTextures(gl);
      }
      /**
       * 次のシーンに切りかえる
       * サンプルアプリケーションではモデルセットの切り替えを行う。
       */
      nextScene() {
        const no = (this._sceneIndex + 1) % ModelDirSize;
        this.changeScene(no);
      }
      /**
       * シーンを切り替える
       * サンプルアプリケーションではモデルセットの切り替えを行う。
       * @param index
       */
      changeScene(index) {
        this._sceneIndex = index;
        if (DebugLogEnable) {
          LAppPal.printMessage(`[APP]model index: ${this._sceneIndex}`);
        }
        const modelDir = this._modelDir ?? ModelDir[index] ?? ".";
        const resourcesPath = this._resourcesPath ?? ResourcesPath;
        const modelPath = resolveModelAssetsPath(resourcesPath, modelDir);
        const modelJsonName = this._model3Json ?? ModelJsonNames[index] ?? `${modelDir === "." || modelDir === "" ? "model" : modelDir}.model3.json`;
        this.releaseAllModel();
        const instance2 = new LAppModel();
        instance2.setSubdelegate(this._subdelegate);
        instance2.loadAssets(modelPath, modelJsonName);
        this._models.push(instance2);
        this.beginWatermarkSkip(modelPath, modelJsonName);
      }
      beginWatermarkSkip(modelPath, modelJsonName) {
        const token = ++this._watermarkLoadToken;
        this._watermarkPlan = { parameters: [], parts: [] };
        void loadWatermarkSkipPlan(modelPath, modelJsonName).then((plan) => {
          if (token !== this._watermarkLoadToken) {
            return;
          }
          this._watermarkPlan = plan;
          if (hasWatermarkSkip(plan) && DebugLogEnable) {
            LAppPal.printMessage("[APP]auto skip watermark (space)");
          }
        });
      }
      switchCharacter(resourcesPath, modelDir, model3Json) {
        this._resourcesPath = resourcesPath.endsWith("/") ? resourcesPath : `${resourcesPath}/`;
        this._modelDir = modelDir;
        this._model3Json = model3Json;
        this._sceneIndex = 0;
        this.changeScene(0);
      }
      setViewMatrix(m) {
        for (let i = 0; i < 16; i++) {
          this._viewMatrix.getArray()[i] = m.getArray()[i];
        }
      }
      /**
       * モデルの追加
       */
      addModel(sceneIndex = 0) {
        this._sceneIndex = sceneIndex;
        this.changeScene(this._sceneIndex);
      }
      /**
       * コンストラクタ
       */
      constructor() {
        this._viewMatrix = new CubismMatrix44();
        this._models = new Array();
        this._sceneIndex = 0;
      }
      /**
       * 解放する。
       */
      release() {
      }
      /**
       * 初期化する。
       * @param subdelegate
       */
      initialize(subdelegate) {
        this._subdelegate = subdelegate;
        this.changeScene(this._sceneIndex);
      }
      /**
       * 自身が所属するSubdelegate
       */
      _subdelegate;
      _viewMatrix;
      // モデル描画に用いるview行列
      _models;
      // モデルインスタンスのコンテナ
      _sceneIndex;
      // 表示するシーンのインデックス値
      _resourcesPath = null;
      _modelDir = null;
      _model3Json = null;
      // モーション再生開始のコールバック関数
      beganMotion = (self) => {
        LAppPal.printMessage("Motion Began:");
        console.log(self);
      };
      // モーション再生終了のコールバック関数
      finishedMotion = (self) => {
        LAppPal.printMessage("Motion Finished:");
        console.log(self);
      };
    };
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/lapptexturemanager.ts
var LAppTextureManager, TextureInfo;
var init_lapptexturemanager = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/lapptexturemanager.ts"() {
    LAppTextureManager = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._textures = new Array();
      }
      /**
       * 解放する。
       */
      release() {
        for (let i = 0; i < this._textures.length; i++) {
          this._glManager.getGl().deleteTexture(this._textures[i].id);
        }
        this._textures = null;
      }
      /**
       * 画像読み込み
       *
       * @param fileName 読み込む画像ファイルパス名
       * @param usePremultiply Premult処理を有効にするか
       * @return 画像情報、読み込み失敗時はnullを返す
       */
      createTextureFromPngFile(fileName, usePremultiply, callback) {
        for (let i = 0; i < this._textures.length; i++) {
          if (this._textures[i].fileName == fileName && this._textures[i].usePremultply == usePremultiply) {
            this._textures[i].img = new Image();
            this._textures[i].img.addEventListener(
              "load",
              () => callback(this._textures[i]),
              {
                passive: true
              }
            );
            this._textures[i].img.src = fileName;
            return;
          }
        }
        const img = new Image();
        img.addEventListener(
          "load",
          () => {
            const tex = this._glManager.getGl().createTexture();
            this._glManager.getGl().bindTexture(this._glManager.getGl().TEXTURE_2D, tex);
            this._glManager.getGl().texParameteri(
              this._glManager.getGl().TEXTURE_2D,
              this._glManager.getGl().TEXTURE_MIN_FILTER,
              this._glManager.getGl().LINEAR_MIPMAP_LINEAR
            );
            this._glManager.getGl().texParameteri(
              this._glManager.getGl().TEXTURE_2D,
              this._glManager.getGl().TEXTURE_MAG_FILTER,
              this._glManager.getGl().LINEAR
            );
            if (usePremultiply) {
              this._glManager.getGl().pixelStorei(
                this._glManager.getGl().UNPACK_PREMULTIPLY_ALPHA_WEBGL,
                1
              );
            }
            this._glManager.getGl().texImage2D(
              this._glManager.getGl().TEXTURE_2D,
              0,
              this._glManager.getGl().RGBA,
              this._glManager.getGl().RGBA,
              this._glManager.getGl().UNSIGNED_BYTE,
              img
            );
            this._glManager.getGl().generateMipmap(this._glManager.getGl().TEXTURE_2D);
            this._glManager.getGl().bindTexture(this._glManager.getGl().TEXTURE_2D, null);
            const textureInfo = new TextureInfo();
            if (textureInfo != null) {
              textureInfo.fileName = fileName;
              textureInfo.width = img.width;
              textureInfo.height = img.height;
              textureInfo.id = tex;
              textureInfo.img = img;
              textureInfo.usePremultply = usePremultiply;
              if (this._textures != null) {
                this._textures.push(textureInfo);
              }
            }
            callback(textureInfo);
          },
          { passive: true }
        );
        img.src = fileName;
      }
      /**
       * 画像の解放
       *
       * 配列に存在する画像全てを解放する。
       */
      releaseTextures() {
        for (let i = 0; i < this._textures.length; i++) {
          this._glManager.getGl().deleteTexture(this._textures[i].id);
          this._textures[i] = null;
        }
        this._textures.length = 0;
      }
      /**
       * 画像の解放
       *
       * 指定したテクスチャの画像を解放する。
       * @param texture 解放するテクスチャ
       */
      releaseTextureByTexture(texture) {
        for (let i = 0; i < this._textures.length; i++) {
          if (this._textures[i].id != texture) {
            continue;
          }
          this._glManager.getGl().deleteTexture(this._textures[i].id);
          this._textures[i] = null;
          this._textures.splice(i, 1);
          break;
        }
      }
      /**
       * 画像の解放
       *
       * 指定した名前の画像を解放する。
       * @param fileName 解放する画像ファイルパス名
       */
      releaseTextureByFilePath(fileName) {
        for (let i = 0; i < this._textures.length; i++) {
          if (this._textures[i].fileName == fileName) {
            this._glManager.getGl().deleteTexture(this._textures[i].id);
            this._textures[i] = null;
            this._textures.splice(i, 1);
            break;
          }
        }
      }
      /**
       * setter
       * @param glManager
       */
      setGlManager(glManager) {
        this._glManager = glManager;
      }
      _textures;
      _glManager;
    };
    TextureInfo = class {
      img;
      // 画像
      id = null;
      // テクスチャ
      width = 0;
      // 横幅
      height = 0;
      // 高さ
      usePremultply;
      // Premult処理を有効にするか
      fileName;
      // ファイル名
    };
  }
});

// vendor/live2d/sdk/Framework/src/math/cubismviewmatrix.ts
var CubismViewMatrix, Live2DCubismFramework50;
var init_cubismviewmatrix = __esm({
  "vendor/live2d/sdk/Framework/src/math/cubismviewmatrix.ts"() {
    init_cubismmatrix44();
    init_cubismviewmatrix();
    CubismViewMatrix = class extends CubismMatrix44 {
      /**
       * コンストラクタ
       */
      constructor() {
        super();
        this._screenLeft = 0;
        this._screenRight = 0;
        this._screenTop = 0;
        this._screenBottom = 0;
        this._maxLeft = 0;
        this._maxRight = 0;
        this._maxTop = 0;
        this._maxBottom = 0;
        this._maxScale = 0;
        this._minScale = 0;
      }
      /**
       * 移動を調整
       *
       * @param x X軸の移動量
       * @param y Y軸の移動量
       */
      adjustTranslate(x, y) {
        if (this._tr[0] * this._maxLeft + (this._tr[12] + x) > this._screenLeft) {
          x = this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12];
        }
        if (this._tr[0] * this._maxRight + (this._tr[12] + x) < this._screenRight) {
          x = this._screenRight - this._tr[0] * this._maxRight - this._tr[12];
        }
        if (this._tr[5] * this._maxTop + (this._tr[13] + y) < this._screenTop) {
          y = this._screenTop - this._tr[5] * this._maxTop - this._tr[13];
        }
        if (this._tr[5] * this._maxBottom + (this._tr[13] + y) > this._screenBottom) {
          y = this._screenBottom - this._tr[5] * this._maxBottom - this._tr[13];
        }
        const tr1 = new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          x,
          y,
          0,
          1
        ]);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
      }
      /**
       * 拡大率を調整
       *
       * @param cx 拡大を行うX軸の中心位置
       * @param cy 拡大を行うY軸の中心位置
       * @param scale 拡大率
       */
      adjustScale(cx, cy, scale) {
        const maxScale = this.getMaxScale();
        const minScale = this.getMinScale();
        const targetScale = scale * this._tr[0];
        if (targetScale < minScale) {
          if (this._tr[0] > 0) {
            scale = minScale / this._tr[0];
          }
        } else if (targetScale > maxScale) {
          if (this._tr[0] > 0) {
            scale = maxScale / this._tr[0];
          }
        }
        const tr1 = new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          cx,
          cy,
          0,
          1
        ]);
        const tr2 = new Float32Array([
          scale,
          0,
          0,
          0,
          0,
          scale,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1
        ]);
        const tr3 = new Float32Array([
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          -cx,
          -cy,
          0,
          1
        ]);
        CubismMatrix44.multiply(tr3, this._tr, this._tr);
        CubismMatrix44.multiply(tr2, this._tr, this._tr);
        CubismMatrix44.multiply(tr1, this._tr, this._tr);
      }
      /**
       * デバイスに対応する論理座養生の範囲の設定
       *
       * @param left      左辺のX軸の位置
       * @param right     右辺のX軸の位置
       * @param bottom    下辺のY軸の位置
       * @param top       上辺のY軸の位置
       */
      setScreenRect(left, right, bottom, top) {
        this._screenLeft = left;
        this._screenRight = right;
        this._screenBottom = bottom;
        this._screenTop = top;
      }
      /**
       * デバイスに対応する論理座標上の移動可能範囲の設定
       * @param left      左辺のX軸の位置
       * @param right     右辺のX軸の位置
       * @param bottom    下辺のY軸の位置
       * @param top       上辺のY軸の位置
       */
      setMaxScreenRect(left, right, bottom, top) {
        this._maxLeft = left;
        this._maxRight = right;
        this._maxTop = top;
        this._maxBottom = bottom;
      }
      /**
       * 最大拡大率の設定
       * @param maxScale 最大拡大率
       */
      setMaxScale(maxScale) {
        this._maxScale = maxScale;
      }
      /**
       * 最小拡大率の設定
       * @param minScale 最小拡大率
       */
      setMinScale(minScale) {
        this._minScale = minScale;
      }
      /**
       * 最大拡大率の取得
       * @return 最大拡大率
       */
      getMaxScale() {
        return this._maxScale;
      }
      /**
       * 最小拡大率の取得
       * @return 最小拡大率
       */
      getMinScale() {
        return this._minScale;
      }
      /**
       * 拡大率が最大になっているかを確認する
       *
       * @return true 拡大率は最大
       * @return false 拡大率は最大ではない
       */
      isMaxScale() {
        return this.getScaleX() >= this._maxScale;
      }
      /**
       * 拡大率が最小になっているかを確認する
       *
       * @return true 拡大率は最小
       * @return false 拡大率は最小ではない
       */
      isMinScale() {
        return this.getScaleX() <= this._minScale;
      }
      /**
       * デバイスに対応する論理座標の左辺のＸ軸位置を取得する
       * @return デバイスに対応する論理座標の左辺のX軸位置
       */
      getScreenLeft() {
        return this._screenLeft;
      }
      /**
       * デバイスに対応する論理座標の右辺のＸ軸位置を取得する
       * @return デバイスに対応する論理座標の右辺のX軸位置
       */
      getScreenRight() {
        return this._screenRight;
      }
      /**
       * デバイスに対応する論理座標の下辺のY軸位置を取得する
       * @return デバイスに対応する論理座標の下辺のY軸位置
       */
      getScreenBottom() {
        return this._screenBottom;
      }
      /**
       * デバイスに対応する論理座標の上辺のY軸位置を取得する
       * @return デバイスに対応する論理座標の上辺のY軸位置
       */
      getScreenTop() {
        return this._screenTop;
      }
      /**
       * 左辺のX軸位置の最大値の取得
       * @return 左辺のX軸位置の最大値
       */
      getMaxLeft() {
        return this._maxLeft;
      }
      /**
       * 右辺のX軸位置の最大値の取得
       * @return 右辺のX軸位置の最大値
       */
      getMaxRight() {
        return this._maxRight;
      }
      /**
       * 下辺のY軸位置の最大値の取得
       * @return 下辺のY軸位置の最大値
       */
      getMaxBottom() {
        return this._maxBottom;
      }
      /**
       * 上辺のY軸位置の最大値の取得
       * @return 上辺のY軸位置の最大値
       */
      getMaxTop() {
        return this._maxTop;
      }
      _screenLeft;
      // デバイスに対応する論理座標上の範囲（左辺X軸位置）
      _screenRight;
      // デバイスに対応する論理座標上の範囲（右辺X軸位置）
      _screenTop;
      // デバイスに対応する論理座標上の範囲（上辺Y軸位置）
      _screenBottom;
      // デバイスに対応する論理座標上の範囲（下辺Y軸位置）
      _maxLeft;
      // 論理座標上の移動可能範囲（左辺X軸位置）
      _maxRight;
      // 論理座標上の移動可能範囲（右辺X軸位置）
      _maxTop;
      // 論理座標上の移動可能範囲（上辺Y軸位置）
      _maxBottom;
      // 論理座標上の移動可能範囲（下辺Y軸位置）
      _maxScale;
      // 拡大率の最大値
      _minScale;
      // 拡大率の最小値
    };
    ((Live2DCubismFramework51) => {
      Live2DCubismFramework51.CubismViewMatrix = CubismViewMatrix;
    })(Live2DCubismFramework50 || (Live2DCubismFramework50 = {}));
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappsprite.ts
var LAppSprite, Rect;
var init_lappsprite = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappsprite.ts"() {
    LAppSprite = class {
      /**
       * コンストラクタ
       * @param x            x座標
       * @param y            y座標
       * @param width        横幅
       * @param height       高さ
       * @param textureId    テクスチャ
       */
      constructor(x, y, width, height, textureId) {
        this._rect = new Rect();
        this._rect.left = x - width * 0.5;
        this._rect.right = x + width * 0.5;
        this._rect.up = y + height * 0.5;
        this._rect.down = y - height * 0.5;
        this._texture = textureId;
        this._vertexBuffer = null;
        this._uvBuffer = null;
        this._indexBuffer = null;
        this._positionLocation = null;
        this._uvLocation = null;
        this._textureLocation = null;
        this._positionArray = null;
        this._uvArray = null;
        this._indexArray = null;
        this._firstDraw = true;
      }
      /**
       * 解放する。
       */
      release() {
        this._rect = null;
        const gl = this._subdelegate.getGlManager().getGl();
        gl.deleteTexture(this._texture);
        this._texture = null;
        gl.deleteBuffer(this._uvBuffer);
        this._uvBuffer = null;
        gl.deleteBuffer(this._vertexBuffer);
        this._vertexBuffer = null;
        gl.deleteBuffer(this._indexBuffer);
        this._indexBuffer = null;
      }
      /**
       * テクスチャを返す
       */
      getTexture() {
        return this._texture;
      }
      /**
       * 描画する。
       * @param programId シェーダープログラム
       * @param canvas 描画するキャンパス情報
       */
      render(programId) {
        if (this._texture == null) {
          return;
        }
        const gl = this._subdelegate.getGlManager().getGl();
        if (this._firstDraw) {
          this._positionLocation = gl.getAttribLocation(programId, "position");
          gl.enableVertexAttribArray(this._positionLocation);
          this._uvLocation = gl.getAttribLocation(programId, "uv");
          gl.enableVertexAttribArray(this._uvLocation);
          this._textureLocation = gl.getUniformLocation(programId, "texture");
          gl.uniform1i(this._textureLocation, 0);
          {
            this._uvArray = new Float32Array([
              1,
              0,
              0,
              0,
              0,
              1,
              1,
              1
            ]);
            this._uvBuffer = gl.createBuffer();
          }
          {
            const maxWidth = this._subdelegate.getCanvas().width;
            const maxHeight = this._subdelegate.getCanvas().height;
            this._positionArray = new Float32Array([
              (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
              (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
              (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
              (this._rect.up - maxHeight * 0.5) / (maxHeight * 0.5),
              (this._rect.left - maxWidth * 0.5) / (maxWidth * 0.5),
              (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5),
              (this._rect.right - maxWidth * 0.5) / (maxWidth * 0.5),
              (this._rect.down - maxHeight * 0.5) / (maxHeight * 0.5)
            ]);
            this._vertexBuffer = gl.createBuffer();
          }
          {
            this._indexArray = new Uint16Array([0, 1, 2, 3, 2, 0]);
            this._indexBuffer = gl.createBuffer();
          }
          this._firstDraw = false;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._uvArray, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this._uvLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this._positionArray, gl.STATIC_DRAW);
        gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._indexArray, gl.DYNAMIC_DRAW);
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.drawElements(
          gl.TRIANGLES,
          this._indexArray.length,
          gl.UNSIGNED_SHORT,
          0
        );
      }
      /**
       * 当たり判定
       * @param pointX x座標
       * @param pointY y座標
       */
      isHit(pointX, pointY) {
        const { height } = this._subdelegate.getCanvas();
        const y = height - pointY;
        return pointX >= this._rect.left && pointX <= this._rect.right && y <= this._rect.up && y >= this._rect.down;
      }
      /**
       * setter
       * @param subdelegate
       */
      setSubdelegate(subdelegate) {
        this._subdelegate = subdelegate;
      }
      _texture;
      // テクスチャ
      _vertexBuffer;
      // 頂点バッファ
      _uvBuffer;
      // uv頂点バッファ
      _indexBuffer;
      // 頂点インデックスバッファ
      _rect;
      // 矩形
      _positionLocation;
      _uvLocation;
      _textureLocation;
      _positionArray;
      _uvArray;
      _indexArray;
      _firstDraw;
      _subdelegate;
    };
    Rect = class {
      left;
      // 左辺
      right;
      // 右辺
      up;
      // 上辺
      down;
      // 下辺
    };
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/touchmanager.ts
var TouchManager;
var init_touchmanager = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/touchmanager.ts"() {
    TouchManager = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._startX = 0;
        this._startY = 0;
        this._lastX = 0;
        this._lastY = 0;
        this._lastX1 = 0;
        this._lastY1 = 0;
        this._lastX2 = 0;
        this._lastY2 = 0;
        this._lastTouchDistance = 0;
        this._deltaX = 0;
        this._deltaY = 0;
        this._scale = 1;
        this._touchSingle = false;
        this._flipAvailable = false;
      }
      getCenterX() {
        return this._lastX;
      }
      getCenterY() {
        return this._lastY;
      }
      getDeltaX() {
        return this._deltaX;
      }
      getDeltaY() {
        return this._deltaY;
      }
      getStartX() {
        return this._startX;
      }
      getStartY() {
        return this._startY;
      }
      getScale() {
        return this._scale;
      }
      getX() {
        return this._lastX;
      }
      getY() {
        return this._lastY;
      }
      getX1() {
        return this._lastX1;
      }
      getY1() {
        return this._lastY1;
      }
      getX2() {
        return this._lastX2;
      }
      getY2() {
        return this._lastY2;
      }
      isSingleTouch() {
        return this._touchSingle;
      }
      isFlickAvailable() {
        return this._flipAvailable;
      }
      disableFlick() {
        this._flipAvailable = false;
      }
      /**
       * タッチ開始時イベント
       * @param deviceX タッチした画面のxの値
       * @param deviceY タッチした画面のyの値
       */
      touchesBegan(deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._startX = deviceX;
        this._startY = deviceY;
        this._lastTouchDistance = -1;
        this._flipAvailable = true;
        this._touchSingle = true;
      }
      /**
       * ドラッグ時のイベント
       * @param deviceX タッチした画面のxの値
       * @param deviceY タッチした画面のyの値
       */
      touchesMoved(deviceX, deviceY) {
        this._lastX = deviceX;
        this._lastY = deviceY;
        this._lastTouchDistance = -1;
        this._touchSingle = true;
      }
      /**
       * フリックの距離測定
       * @return フリック距離
       */
      getFlickDistance() {
        return this.calculateDistance(
          this._startX,
          this._startY,
          this._lastX,
          this._lastY
        );
      }
      /**
       * 点１から点２への距離を求める
       *
       * @param x1 １つ目のタッチした画面のxの値
       * @param y1 １つ目のタッチした画面のyの値
       * @param x2 ２つ目のタッチした画面のxの値
       * @param y2 ２つ目のタッチした画面のyの値
       */
      calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
      }
      /**
       * ２つ目の値から、移動量を求める。
       * 違う方向の場合は移動量０。同じ方向の場合は、絶対値が小さい方の値を参照する。
       *
       * @param v1 １つ目の移動量
       * @param v2 ２つ目の移動量
       *
       * @return 小さい方の移動量
       */
      calculateMovingAmount(v1, v2) {
        if (v1 > 0 != v2 > 0) {
          return 0;
        }
        const sign2 = v1 > 0 ? 1 : -1;
        const absoluteValue1 = Math.abs(v1);
        const absoluteValue2 = Math.abs(v2);
        return sign2 * (absoluteValue1 < absoluteValue2 ? absoluteValue1 : absoluteValue2);
      }
      _startY;
      // タッチを開始した時のxの値
      _startX;
      // タッチを開始した時のyの値
      _lastX;
      // シングルタッチ時のxの値
      _lastY;
      // シングルタッチ時のyの値
      _lastX1;
      // ダブルタッチ時の一つ目のxの値
      _lastY1;
      // ダブルタッチ時の一つ目のyの値
      _lastX2;
      // ダブルタッチ時の二つ目のxの値
      _lastY2;
      // ダブルタッチ時の二つ目のyの値
      _lastTouchDistance;
      // 2本以上でタッチしたときの指の距離
      _deltaX;
      // 前回の値から今回の値へのxの移動距離。
      _deltaY;
      // 前回の値から今回の値へのyの移動距離。
      _scale;
      // このフレームで掛け合わせる拡大率。拡大操作中以外は1。
      _touchSingle;
      // シングルタッチ時はtrue
      _flipAvailable;
      // フリップが有効かどうか
    };
  }
});

// vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappview.ts
var LAppView;
var init_lappview = __esm({
  "vendor/live2d/sdk/Samples/TypeScript/Demo/src/lappview.ts"() {
    init_cubismmatrix44();
    init_cubismviewmatrix();
    init_platform_define();
    init_lapppal();
    init_lappsprite();
    init_touchmanager();
    LAppView = class {
      /**
       * コンストラクタ
       */
      constructor() {
        this._programId = null;
        this._back = null;
        this._gear = null;
        this._touchManager = new TouchManager();
        this._deviceToScreen = new CubismMatrix44();
        this._viewMatrix = new CubismViewMatrix();
      }
      /**
       * 初期化する。
       */
      initialize(subdelegate) {
        this._subdelegate = subdelegate;
        const { width, height } = subdelegate.getCanvas();
        const ratio = width / height;
        const left = -ratio;
        const right = ratio;
        const bottom = ViewLogicalLeft;
        const top = ViewLogicalRight;
        this._viewMatrix.setScreenRect(left, right, bottom, top);
        this._viewMatrix.scale(ViewScale, ViewScale);
        this._deviceToScreen.loadIdentity();
        if (width > height) {
          const screenW = Math.abs(right - left);
          this._deviceToScreen.scaleRelative(screenW / width, -screenW / width);
        } else {
          const screenH = Math.abs(top - bottom);
          this._deviceToScreen.scaleRelative(screenH / height, -screenH / height);
        }
        this._deviceToScreen.translateRelative(-width * 0.5, -height * 0.5);
        this._viewMatrix.setMaxScale(ViewMaxScale);
        this._viewMatrix.setMinScale(ViewMinScale);
        this._viewMatrix.setMaxScreenRect(
          ViewLogicalMaxLeft,
          ViewLogicalMaxRight,
          ViewLogicalMaxBottom,
          ViewLogicalMaxTop
        );
      }
      /**
       * 解放する
       */
      release() {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
        this._gear.release();
        this._gear = null;
        this._back.release();
        this._back = null;
        this._subdelegate.getGlManager().getGl().deleteProgram(this._programId);
        this._programId = null;
      }
      /**
       * 描画する。
       */
      render() {
        this._subdelegate.getGlManager().getGl().useProgram(this._programId);
        if (this._back) {
          this._back.render(this._programId);
        }
        if (this._gear) {
          this._gear.render(this._programId);
        }
        this._subdelegate.getGlManager().getGl().flush();
        const lapplive2dmanager = this._subdelegate.getLive2DManager();
        if (lapplive2dmanager != null) {
          lapplive2dmanager.setViewMatrix(this._viewMatrix);
          lapplive2dmanager.onUpdate();
        }
      }
      /**
       * 画像の初期化を行う。
       */
      initializeSprite() {
        const width = this._subdelegate.getCanvas().width;
        const height = this._subdelegate.getCanvas().height;
        const textureManager = this._subdelegate.getTextureManager();
        const resourcesPath = ResourcesPath;
        let imageName = "";
        imageName = BackImageName;
        const initBackGroundTexture = (textureInfo) => {
          const x = width * 0.5;
          const y = height * 0.5;
          const fheight = height * 0.95;
          const ratio = fheight / textureInfo.height;
          const fwidth = textureInfo.width * ratio;
          this._back = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
          this._back.setSubdelegate(this._subdelegate);
        };
        textureManager.createTextureFromPngFile(
          resourcesPath + imageName,
          false,
          initBackGroundTexture
        );
        imageName = GearImageName;
        const initGearTexture = (textureInfo) => {
          const x = width - textureInfo.width * 0.5;
          const y = height - textureInfo.height * 0.5;
          const fwidth = textureInfo.width;
          const fheight = textureInfo.height;
          this._gear = new LAppSprite(x, y, fwidth, fheight, textureInfo.id);
          this._gear.setSubdelegate(this._subdelegate);
        };
        textureManager.createTextureFromPngFile(
          resourcesPath + imageName,
          false,
          initGearTexture
        );
        if (this._programId == null) {
          this._programId = this._subdelegate.createShader();
        }
      }
      /**
       * タッチされた時に呼ばれる。
       *
       * @param pointX スクリーンX座標
       * @param pointY スクリーンY座標
       */
      onTouchesBegan(pointX, pointY) {
        this._touchManager.touchesBegan(
          pointX * window.devicePixelRatio,
          pointY * window.devicePixelRatio
        );
      }
      /**
       * タッチしているときにポインタが動いたら呼ばれる。
       *
       * @param pointX スクリーンX座標
       * @param pointY スクリーンY座標
       */
      onTouchesMoved(pointX, pointY) {
        const posX = pointX * window.devicePixelRatio;
        const posY = pointY * window.devicePixelRatio;
        const lapplive2dmanager = this._subdelegate.getLive2DManager();
        const viewX = this.transformViewX(this._touchManager.getX());
        const viewY = this.transformViewY(this._touchManager.getY());
        this._touchManager.touchesMoved(posX, posY);
        lapplive2dmanager.onDrag(viewX, viewY);
      }
      /**
       * タッチが終了したら呼ばれる。
       *
       * @param pointX スクリーンX座標
       * @param pointY スクリーンY座標
       */
      onTouchesEnded(pointX, pointY) {
        const posX = pointX * window.devicePixelRatio;
        const posY = pointY * window.devicePixelRatio;
        const lapplive2dmanager = this._subdelegate.getLive2DManager();
        lapplive2dmanager.onDrag(0, 0);
        const x = this.transformViewX(posX);
        const y = this.transformViewY(posY);
        if (DebugTouchLogEnable) {
          LAppPal.printMessage(`[APP]touchesEnded x: ${x} y: ${y}`);
        }
        lapplive2dmanager.onTap(x, y);
        if (this._gear.isHit(posX, posY)) {
          lapplive2dmanager.nextScene();
        }
      }
      /**
       * X座標をView座標に変換する。
       *
       * @param deviceX デバイスX座標
       */
      transformViewX(deviceX) {
        const screenX = this._deviceToScreen.transformX(deviceX);
        return this._viewMatrix.invertTransformX(screenX);
      }
      /**
       * Y座標をView座標に変換する。
       *
       * @param deviceY デバイスY座標
       */
      transformViewY(deviceY) {
        const screenY = this._deviceToScreen.transformY(deviceY);
        return this._viewMatrix.invertTransformY(screenY);
      }
      /**
       * X座標をScreen座標に変換する。
       * @param deviceX デバイスX座標
       */
      transformScreenX(deviceX) {
        return this._deviceToScreen.transformX(deviceX);
      }
      /**
       * Y座標をScreen座標に変換する。
       *
       * @param deviceY デバイスY座標
       */
      transformScreenY(deviceY) {
        return this._deviceToScreen.transformY(deviceY);
      }
      _touchManager;
      // タッチマネージャー
      _deviceToScreen;
      // デバイスからスクリーンへの行列
      _viewMatrix;
      // viewMatrix
      _programId;
      // シェーダID
      _back;
      // 背景画像
      _gear;
      // ギア画像
      _changeModel;
      // モデル切り替えフラグ
      _isClick;
      // クリック中
      _subdelegate;
    };
  }
});

// vendor/live2d/live2d-player/engine/platform-subdelegate.ts
var StageView, LAppSubdelegate;
var init_platform_subdelegate = __esm({
  "vendor/live2d/live2d-player/engine/platform-subdelegate.ts"() {
    init_platform_define();
    init_platform_gl_manager();
    init_platform_live2dmanager();
    init_lapppal();
    init_lapptexturemanager();
    init_lappview();
    StageView = class extends LAppView {
      initializeSprite() {
      }
      onTouchesEnded(pointX, pointY) {
        const manager = this._subdelegate.getLive2DManager();
        manager.onDrag(0, 0);
        const x = this.transformViewX(pointX * window.devicePixelRatio);
        const y = this.transformViewY(pointY * window.devicePixelRatio);
        manager.onTap(x, y);
      }
      render() {
        const manager = this._subdelegate.getLive2DManager();
        manager.setViewMatrix(this._viewMatrix);
        manager.onUpdate();
      }
      release() {
        this._viewMatrix = null;
        this._touchManager = null;
        this._deviceToScreen = null;
      }
    };
    LAppSubdelegate = class {
      /**
       * コンストラクタ
       */
      constructor() {
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
      release() {
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
      initialize(canvas) {
        if (!this._glManager.initialize(canvas)) {
          return false;
        }
        this._canvas = canvas;
        if (CanvasSize === "auto") {
          this.resizeCanvas();
        } else {
          canvas.width = CanvasSize.width;
          canvas.height = CanvasSize.height;
        }
        this._textureManager.setGlManager(this._glManager);
        const gl = this._glManager.getGl();
        if (!this._frameBuffer) {
          this._frameBuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
        }
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this._view.initialize(this);
        this._live2dManager.setOffscreenSize(
          this._canvas.width,
          this._canvas.height
        );
        this._view.initializeSprite();
        this._live2dManager.initialize(this);
        this._resizeObserver = new ResizeObserver(
          (entries, observer) => this.resizeObserverCallback.call(this, entries, observer)
        );
        this._resizeObserver.observe(this._canvas);
        return true;
      }
      /**
       * Resize canvas and re-initialize view.
       */
      onResize() {
        const transform = new Float32Array(this._view._viewMatrix.getArray());
        this.resizeCanvas();
        this._view.initialize(this);
        this._view._viewMatrix.setMatrix(transform);
        this._view.initializeSprite();
      }
      resizeObserverCallback(entries, observer) {
        void entries;
        void observer;
        if (CanvasSize === "auto") {
          this._needResize = true;
        }
      }
      /**
       * ループ処理
       */
      update() {
        if (this._glManager.getGl().isContextLost()) {
          return;
        }
        if (this._needResize) {
          this.onResize();
          this._needResize = false;
        }
        const gl = this._glManager.getGl();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this._frameBuffer);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.colorMask(true, true, true, true);
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearDepth(1);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        this._view.render();
      }
      /**
       * シェーダーを登録する。
       */
      createShader() {
        const gl = this._glManager.getGl();
        const vertexShaderId = gl.createShader(gl.VERTEX_SHADER);
        if (vertexShaderId == null) {
          LAppPal.printMessage("failed to create vertexShader");
          return null;
        }
        const vertexShader = "precision mediump float;attribute vec3 position;attribute vec2 uv;varying vec2 vuv;void main(void){   gl_Position = vec4(position, 1.0);   vuv = uv;}";
        gl.shaderSource(vertexShaderId, vertexShader);
        gl.compileShader(vertexShaderId);
        const fragmentShaderId = gl.createShader(gl.FRAGMENT_SHADER);
        if (fragmentShaderId == null) {
          LAppPal.printMessage("failed to create fragmentShader");
          return null;
        }
        const fragmentShader = "precision mediump float;varying vec2 vuv;uniform sampler2D texture;void main(void){   gl_FragColor = texture2D(texture, vuv);}";
        gl.shaderSource(fragmentShaderId, fragmentShader);
        gl.compileShader(fragmentShaderId);
        const programId = gl.createProgram();
        if (programId == null) {
          LAppPal.printMessage("failed to create WebGL program");
          return null;
        }
        gl.attachShader(programId, vertexShaderId);
        gl.attachShader(programId, fragmentShaderId);
        gl.deleteShader(vertexShaderId);
        gl.deleteShader(fragmentShaderId);
        gl.linkProgram(programId);
        gl.useProgram(programId);
        return programId;
      }
      getTextureManager() {
        return this._textureManager;
      }
      getFrameBuffer() {
        return this._frameBuffer;
      }
      getCanvas() {
        return this._canvas;
      }
      getGlManager() {
        return this._glManager;
      }
      getGl() {
        return this._glManager.getGl();
      }
      getLive2DManager() {
        return this._live2dManager;
      }
      /**
       * Resize the canvas to fill the screen.
       */
      resizeCanvas() {
        this._canvas.width = this._canvas.clientWidth * window.devicePixelRatio;
        this._canvas.height = this._canvas.clientHeight * window.devicePixelRatio;
        const gl = this._glManager.getGl();
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      /**
       * マウスダウン、タッチダウンしたときに呼ばれる。
       */
      onPointBegan(clientX, clientY) {
        if (!this._view) {
          LAppPal.printMessage("view notfound");
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
      noteLook(clientX, clientY) {
        const canvas = this.getCanvas();
        if (!canvas || !this._live2dManager) {
          return;
        }
        const rect = canvas.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) {
          return;
        }
        const x = (clientX - rect.left) / rect.width * 2 - 1;
        const y = -((clientY - rect.top) / rect.height * 2 - 1);
        this._live2dManager.setLookTarget(x, y);
      }
      onPointMoved(clientX, clientY) {
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
      onPointEnded(clientX, clientY) {
        this._captured = false;
        if (!this._view) {
          LAppPal.printMessage("view notfound");
          return;
        }
        const { x: localX, y: localY } = this.toLocalPoint(clientX, clientY);
        if (this._dragDistance < 5) {
          this._view.onTouchesEnded(localX, localY);
        } else {
          this._live2dManager.onDrag(0, 0);
        }
        this._dragDistance = 0;
      }
      /**
       * タッチがキャンセルされると呼ばれる。
       */
      onTouchCancel(clientX, clientY) {
        this._captured = false;
        void clientX;
        void clientY;
        if (!this._view) {
          LAppPal.printMessage("view notfound");
          return;
        }
        this._live2dManager.onDrag(0, 0);
        this._dragDistance = 0;
      }
      onWheel(clientX, clientY, deltaY) {
        if (!this._view) {
          return;
        }
        const { x, y } = this.toLocalPoint(clientX, clientY);
        const ratio = window.devicePixelRatio;
        const centerX = this._view.transformScreenX(x * ratio);
        const centerY = this._view.transformScreenY(y * ratio);
        const scale = Math.exp(-deltaY * 1e-3);
        this._view._viewMatrix.adjustScale(centerX, centerY, scale);
      }
      panView(deltaX, deltaY) {
        const ratio = window.devicePixelRatio;
        const originX = this._view.transformScreenX(0);
        const originY = this._view.transformScreenY(0);
        const translatedX = this._view.transformScreenX(deltaX * ratio) - originX;
        const translatedY = this._view.transformScreenY(deltaY * ratio) - originY;
        this._view._viewMatrix.adjustTranslate(translatedX, translatedY);
      }
      toLocalPoint(clientX, clientY) {
        const rect = this._canvas.getBoundingClientRect();
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      }
      isContextLost() {
        return this._glManager.getGl().isContextLost();
      }
      _canvas;
      /**
       * View情報
       */
      _view;
      /**
       * テクスチャマネージャー
       */
      _textureManager;
      _frameBuffer = null;
      _glManager;
      _live2dManager;
      /**
       * ResizeObserver
       */
      _resizeObserver = null;
      /**
       * クリックしているか
       */
      _captured;
      _lastPointX;
      _lastPointY;
      _dragDistance;
      _needResize = false;
    };
  }
});

// vendor/live2d/live2d-player/engine/PlatformDelegate.ts
var instance, PlatformDelegate;
var init_PlatformDelegate = __esm({
  "vendor/live2d/live2d-player/engine/PlatformDelegate.ts"() {
    init_live2dcubismframework();
    init_cubismdebug();
    init_lapppal();
    init_platform_subdelegate();
    init_platform_define();
    init_platform_define();
    instance = null;
    PlatformDelegate = class _PlatformDelegate {
      cubismOption = new Option();
      subdelegate = null;
      canvas = null;
      rafId = 0;
      pointerDown = null;
      pointerMove = null;
      pointerUp = null;
      pointerCancel = null;
      wheel = null;
      static getInstance() {
        if (!instance) {
          instance = new _PlatformDelegate();
        }
        return instance;
      }
      static releaseInstance() {
        instance?.release();
        instance = null;
      }
      initialize(canvas) {
        this.canvas = canvas;
        LAppPal.updateTime();
        this.cubismOption.logFunction = LAppPal.printMessage;
        this.cubismOption.loggingLevel = CubismLoggingLevel;
        CubismFramework.startUp(this.cubismOption);
        CubismFramework.initialize();
        this.subdelegate = new LAppSubdelegate();
        if (!this.subdelegate.initialize(canvas)) {
          return false;
        }
        if (this.subdelegate.isContextLost()) {
          CubismLogError("WebGL context was lost during Live2D initialization.");
          return false;
        }
        this.bindPointerEvents();
        return true;
      }
      run() {
        const loop = () => {
          if (!instance || !this.subdelegate) {
            return;
          }
          LAppPal.updateTime();
          this.subdelegate.update();
          this.rafId = requestAnimationFrame(loop);
        };
        this.rafId = requestAnimationFrame(loop);
      }
      onResize() {
        this.subdelegate?.onResize();
      }
      /** Copy immediately after rendering, before WebGL discards its drawing buffer. */
      snapshot() {
        if (!this.canvas || !this.subdelegate) return null;
        LAppPal.updateTime();
        this.subdelegate.update();
        const copy = document.createElement("canvas");
        copy.width = this.canvas.width;
        copy.height = this.canvas.height;
        copy.getContext("2d").drawImage(this.canvas, 0, 0);
        return copy;
      }
      portraitHead() {
        return this.subdelegate?.getLive2DManager().portraitHead ?? null;
      }
      switchCharacter(runtime) {
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
      playMotion(group, index = 0) {
        return this.subdelegate?.getLive2DManager().playMotion(group, index) ?? Promise.resolve(false);
      }
      resetFacing() {
        this.subdelegate?.getLive2DManager().resetFacing();
      }
      setLipSyncValue(value) {
        this.subdelegate?.getLive2DManager().setLipSyncValue(value);
      }
      setParamOverlay(overlay) {
        this.subdelegate?.getLive2DManager().setParamOverlay(overlay);
      }
      getParameterValue(paramId) {
        return this.subdelegate?.getLive2DManager().getParameterValue(paramId) ?? 0;
      }
      setLookTarget(x, y) {
        this.subdelegate?.getLive2DManager().setLookTarget(x, y);
      }
      setParameterValue(paramId, value) {
        this.subdelegate?.getLive2DManager().setParameterValue(paramId, value);
      }
      setExpression(expressionId) {
        return this.subdelegate?.getLive2DManager().setExpression(expressionId) ?? false;
      }
      bindPointerEvents() {
        this.pointerDown = (event) => {
          if (this.canvas?.dataset.interactive === "false") return;
          if (event.pointerType === "mouse" && event.button !== 0) {
            return;
          }
          this.canvas?.setPointerCapture(event.pointerId);
          this.subdelegate?.onPointBegan(event.clientX, event.clientY);
        };
        this.pointerMove = (event) => {
          if (this.canvas?.dataset.interactive === "false") return;
          this.subdelegate?.noteLook(event.clientX, event.clientY);
          this.subdelegate?.onPointMoved(event.clientX, event.clientY);
        };
        this.pointerUp = (event) => {
          this.subdelegate?.onPointEnded(event.clientX, event.clientY);
          if (this.canvas?.hasPointerCapture(event.pointerId)) {
            this.canvas.releasePointerCapture(event.pointerId);
          }
        };
        this.pointerCancel = (event) => {
          this.subdelegate?.onTouchCancel(event.clientX, event.clientY);
        };
        this.wheel = (event) => {
          if (this.canvas?.dataset.interactive === "false") return;
          event.preventDefault();
          this.subdelegate?.onWheel(event.clientX, event.clientY, event.deltaY);
        };
        this.canvas?.addEventListener("pointerdown", this.pointerDown, { passive: true });
        this.canvas?.addEventListener("pointermove", this.pointerMove, { passive: true });
        this.canvas?.addEventListener("pointerup", this.pointerUp, { passive: true });
        this.canvas?.addEventListener("pointercancel", this.pointerCancel, { passive: true });
        this.canvas?.addEventListener("wheel", this.wheel, { passive: false });
      }
      releasePointerEvents() {
        if (this.pointerDown) {
          this.canvas?.removeEventListener("pointerdown", this.pointerDown);
        }
        if (this.pointerMove) {
          this.canvas?.removeEventListener("pointermove", this.pointerMove);
        }
        if (this.pointerUp) {
          this.canvas?.removeEventListener("pointerup", this.pointerUp);
        }
        if (this.pointerCancel) {
          this.canvas?.removeEventListener("pointercancel", this.pointerCancel);
        }
        if (this.wheel) {
          this.canvas?.removeEventListener("wheel", this.wheel);
        }
        this.pointerDown = null;
        this.pointerMove = null;
        this.pointerUp = null;
        this.pointerCancel = null;
        this.wheel = null;
      }
      release() {
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
    };
  }
});

// vendor/live2d/live2d-player/types.ts
function toActiveRuntime(character) {
  return {
    expressionNames: character.expressionNames,
    id: character.id,
    name: character.name,
    resourcesPath: character.resourcesPath,
    modelDir: character.defaultModelDir,
    model3Json: character.defaultModel3Json,
    idleGroup: character.idleGroup,
    motionGroups: character.motionGroups,
    hitAreas: character.hitAreas
  };
}
var init_types = __esm({
  "vendor/live2d/live2d-player/types.ts"() {
  }
});

// vendor/live2d/live2d-player/useLive2DPlayer.ts
function waitForCanvasSize(canvas, signal) {
  return new Promise((resolve) => {
    let frame = 0;
    const stop = () => {
      cancelAnimationFrame(frame);
      resolve(false);
    };
    signal.addEventListener("abort", stop, { once: true });
    const check = () => {
      if (signal.aborted) {
        stop();
        return;
      }
      const { clientWidth, clientHeight } = canvas;
      if (clientWidth > 0 && clientHeight > 0) {
        signal.removeEventListener("abort", stop);
        resolve(true);
        return;
      }
      frame = requestAnimationFrame(check);
    };
    check();
  });
}
function useLive2DPlayer(character, translate = defaultPlayerTranslator) {
  const translateRef = (0, import_react3.useRef)(translate);
  translateRef.current = translate;
  const t = (message, values) => translateRef.current(message, values);
  const canvasRef = (0, import_react3.useRef)(null);
  const initializedRef = (0, import_react3.useRef)(false);
  const bootCharacterRef = (0, import_react3.useRef)(null);
  if (character?.defaultModel3Json && !bootCharacterRef.current) {
    bootCharacterRef.current = character;
  }
  const bootCharacter = bootCharacterRef.current;
  const [activeCharacterId, setActiveCharacterId] = (0, import_react3.useState)(null);
  const [diagnostics, setDiagnostics] = (0, import_react3.useState)({
    status: "idle",
    message: t("\u7B49\u5F85\u521D\u59CB\u5316")
  });
  (0, import_react3.useEffect)(() => {
    const canvas = canvasRef.current;
    const initial = bootCharacterRef.current;
    if (!canvas || !initial) {
      return;
    }
    let disposed = false;
    const lifetime = new AbortController();
    const boot = async () => {
      setDiagnostics({ status: "initializing", message: t("\u6B63\u5728\u52A0\u8F7D Live2D \u89D2\u8272...") });
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
        setDiagnostics({ status: "error", message: t("Live2D \u521D\u59CB\u5316\u5931\u8D25\uFF0C\u8BF7\u786E\u8BA4\u6D4F\u89C8\u5668\u652F\u6301 WebGL2") });
        return;
      }
      delegate.switchCharacter(runtime);
      delegate.onResize();
      delegate.run();
      initializedRef.current = true;
      setDiagnostics({ status: "ready", message: t("{0} \u5DF2\u5C31\u7EEA", [runtime.name]) });
    };
    void boot().catch((error) => {
      if (!disposed) setDiagnostics({ status: "error", message: error instanceof Error ? error.message : String(error) });
    });
    const onWindowResize = () => {
      PlatformDelegate.getInstance().onResize();
    };
    window.addEventListener("resize", onWindowResize);
    return () => {
      disposed = true;
      lifetime.abort();
      initializedRef.current = false;
      window.removeEventListener("resize", onWindowResize);
      PlatformDelegate.releaseInstance();
      setDiagnostics({ status: "idle", message: t("\u5DF2\u5378\u8F7D") });
    };
  }, [bootCharacter?.id]);
  const switchCharacter = (0, import_react3.useCallback)((next) => {
    if (!initializedRef.current || !next.defaultModel3Json) {
      return;
    }
    const runtime = toActiveRuntime(next);
    setActiveCharacter(runtime);
    setActiveCharacterId(runtime.id);
    setDiagnostics({ status: "initializing", message: t("\u6B63\u5728\u5207\u6362\u81F3 {0}...", [runtime.name]) });
    const delegate = PlatformDelegate.getInstance();
    delegate.switchCharacter(runtime);
    delegate.onResize();
    setDiagnostics({ status: "ready", message: t("{0} \u5DF2\u5C31\u7EEA", [runtime.name]) });
  }, []);
  const actor = {
    playMotion: async (group, index = 0) => {
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
    setLipSyncValue: (value) => {
      if (!initializedRef.current) {
        return;
      }
      PlatformDelegate.getInstance().setLipSyncValue(value);
    },
    setExpression: (expressionId) => {
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
    getParameterValue: (paramId) => {
      if (!initializedRef.current) {
        return 0;
      }
      return PlatformDelegate.getInstance().getParameterValue(paramId);
    },
    setParameterValue: (paramId, value) => {
      if (!initializedRef.current) {
        return;
      }
      PlatformDelegate.getInstance().setParameterValue(paramId, value);
    }
  };
  return {
    canvasRef,
    diagnostics,
    activeCharacterId,
    switchCharacter,
    actor
  };
}
var import_react3;
var init_useLive2DPlayer = __esm({
  "vendor/live2d/live2d-player/useLive2DPlayer.ts"() {
    init_messages();
    import_react3 = require("react");
    init_PlatformDelegate();
    init_platform_define();
    init_types();
  }
});

// vendor/live2d/live2d-player/Live2DPlayer.css
var css2, style2;
var init_Live2DPlayer = __esm({
  "vendor/live2d/live2d-player/Live2DPlayer.css"() {
    css2 = ".live2d-player {\r\n  position: absolute;\r\n  inset: 0;\r\n  width: 100%;\r\n  height: 100%;\n  overflow: hidden;\n  container: live2d-stage / size;\n  z-index: 1;\n}\r\n\r\n.live2d-player__canvas {\r\n  position: absolute;\r\n  inset: 0;\r\n  z-index: 1;\r\n  width: 100%;\r\n  height: 100%;\r\n  display: block;\r\n  background: transparent;\r\n  touch-action: none;\r\n  cursor: grab;\r\n}\r\n\r\n.live2d-player__canvas:active {\r\n  cursor: grabbing;\r\n}\r\n\r\n.live2d-player__hint {\r\n  position: absolute;\r\n  left: 50%;\r\n  bottom: 92px;\r\n  z-index: 3;\r\n  transform: translateX(-50%);\r\n  padding: 5px 11px;\r\n  border-radius: 999px;\r\n  color: color-mix(in srgb,var(--blue) 62%,transparent);\r\n  background: rgba(255, 255, 255, 0.48);\r\n  font-size: 0.72rem;\r\n  letter-spacing: 0.03em;\r\n  pointer-events: none;\r\n  backdrop-filter: blur(8px);\r\n}\r\n\r\n.live2d-player__status {\r\n  position: absolute;\r\n  inset: 0;\r\n  display: grid;\r\n  place-items: center;\r\n  font-size: 0.95rem;\r\n  color: var(--ink-soft);\r\n  pointer-events: none;\r\n  z-index: 2;\r\n}\r\n\r\n.live2d-player__status--error {\r\n  color: var(--danger);\r\n}\r\n\r\n@media (max-width: 900px) {\r\n  .live2d-player__hint {\r\n    bottom: 82px;\r\n  }\r\n}\r\n";
    style2 = document.createElement("style");
    style2.dataset.plugin = "dsh-plugin-live2d-stage";
    style2.dataset.pluginCss = "E:\\DSHLive2d-plugin\\vendor\\live2d\\live2d-player\\Live2DPlayer.css";
    style2.textContent = css2;
    document.head.append(style2);
  }
});

// vendor/live2d/live2d-player/Live2DPlayer.tsx
var import_react4, import_jsx_runtime4, Live2DPlayer;
var init_Live2DPlayer2 = __esm({
  "vendor/live2d/live2d-player/Live2DPlayer.tsx"() {
    init_messages();
    import_react4 = require("react");
    init_useLive2DPlayer();
    init_Live2DPlayer();
    import_jsx_runtime4 = require("react/jsx-runtime");
    Live2DPlayer = (0, import_react4.forwardRef)(
      function Live2DPlayer2({ character, className, translate: t = defaultPlayerTranslator, hint = t("\u62D6\u62FD\u79FB\u52A8\u753B\u9762 \xB7 \u6EDA\u8F6E\u7F29\u653E"), children, interactive = true }, ref) {
        const { canvasRef, diagnostics, activeCharacterId, switchCharacter, actor } = useLive2DPlayer(character, t);
        const actorRef = (0, import_react4.useRef)(actor);
        actorRef.current = actor;
        const switchRef = (0, import_react4.useRef)(switchCharacter);
        switchRef.current = switchCharacter;
        const diagnosticsRef = (0, import_react4.useRef)(diagnostics);
        diagnosticsRef.current = diagnostics;
        const loadedModel = (0, import_react4.useRef)("");
        const modelKey = character?.defaultModel3Json ? JSON.stringify([character.id, character.resourcesPath, character.defaultModelDir, character.defaultModel3Json]) : "";
        if (!loadedModel.current && modelKey) loadedModel.current = modelKey;
        (0, import_react4.useEffect)(() => {
          if (!character || !modelKey || !activeCharacterId || diagnostics.status !== "ready" || loadedModel.current === modelKey) return;
          loadedModel.current = modelKey;
          switchRef.current(character);
        }, [character, activeCharacterId, diagnostics.status, modelKey]);
        (0, import_react4.useImperativeHandle)(ref, () => ({
          playMotion: (group, index) => actorRef.current.playMotion(group, index),
          resetFacing: () => actorRef.current.resetFacing(),
          setLipSyncValue: (value) => actorRef.current.setLipSyncValue(value),
          setExpression: (expressionId) => actorRef.current.setExpression(expressionId),
          setParamOverlay: (overlay) => actorRef.current.setParamOverlay?.(overlay ?? null),
          getParameterValue: (paramId) => actorRef.current.getParameterValue?.(paramId) ?? 0,
          setParameterValue: (paramId, value) => actorRef.current.setParameterValue?.(paramId, value),
          switchCharacter: (next) => switchRef.current(next),
          getDiagnostics: () => diagnosticsRef.current
        }), []);
        const classes = ["live2d-player", className].filter(Boolean).join(" ");
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: classes, "aria-label": t("Live2D \u89D2\u8272\u821E\u53F0"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("canvas", { ref: canvasRef, className: "live2d-player__canvas", style: { visibility: character?.defaultModel3Json ? "visible" : "hidden" }, "data-interactive": interactive && Boolean(character?.defaultModel3Json) }),
          character && !character.defaultModel3Json && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "live2d-player__status", children: t("\u8BF7\u5728\u52A8\u753B\u8D44\u6E90\u4E2D\u4E3A\u5F53\u524D\u89D2\u8272\u9009\u62E9\u6A21\u578B") }),
          children,
          hint ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "live2d-player__hint", "aria-hidden": true, children: hint }) : null,
          diagnostics.status === "initializing" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "live2d-player__status", children: t("\u89D2\u8272\u52A0\u8F7D\u4E2D...") }),
          diagnostics.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "live2d-player__status live2d-player__status--error", children: diagnostics.message })
        ] });
      }
    );
  }
});

// src/client/player.tsx
var player_exports = {};
__export(player_exports, {
  default: () => Player
});
function Player({ character, onStatus }) {
  const player = (0, import_react5.useRef)(null), issues = (0, import_react5.useRef)([]);
  (0, import_react5.useEffect)(() => {
    const error = (e) => {
      issues.current.push(String(e.error?.stack || e.message).slice(0, 2e3));
      issues.current = issues.current.slice(-5);
    };
    const rejection = (e) => {
      issues.current.push(String(e.reason?.stack || e.reason).slice(0, 2e3));
      issues.current = issues.current.slice(-5);
    };
    window.addEventListener("error", error);
    window.addEventListener("unhandledrejection", rejection);
    return () => {
      window.removeEventListener("error", error);
      window.removeEventListener("unhandledrejection", rejection);
    };
  }, []);
  (0, import_react5.useEffect)(() => {
    let media;
    function changed() {
      if (player.current?.getDiagnostics()?.status === "ready") window.dispatchEvent(new Event("resize"));
      watch();
    }
    function watch() {
      media?.removeEventListener("change", changed);
      media = matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      media.addEventListener("change", changed);
    }
    watch();
    return () => media.removeEventListener("change", changed);
  }, []);
  (0, import_react5.useEffect)(() => {
    let pointer = null;
    const move = (e) => {
      if (e.pointerType === "mouse") pointer = { x: e.clientX, y: e.clientY };
    };
    const leave = (e) => {
      if (!e.relatedTarget) pointer = null;
    };
    const clear = () => {
      pointer = null;
    };
    const native = (e) => {
      const d = e.data;
      if (d?.type === "live2d-pointer" && Number.isFinite(d.x) && Number.isFinite(d.y)) pointer = { x: d.x, y: d.y };
    };
    const webview = window.chrome?.webview;
    window.addEventListener("pointermove", move, true);
    window.addEventListener("mouseout", leave);
    window.addEventListener("blur", clear);
    webview?.addEventListener?.("message", native);
    const timer = window.setInterval(() => {
      if (!pointer || document.hidden) return;
      const canvas = document.querySelector(".l2ds canvas");
      const rect = canvas?.getBoundingClientRect();
      if (!rect?.width || !rect.height) return;
      PlatformDelegate.getInstance().setLookTarget((pointer.x - rect.left - rect.width / 2) / (rect.width / 2), (rect.top + rect.height / 2 - pointer.y) / (rect.height / 2));
    }, 50);
    return () => {
      clearInterval(timer);
      window.removeEventListener("pointermove", move, true);
      window.removeEventListener("mouseout", leave);
      window.removeEventListener("blur", clear);
      webview?.removeEventListener?.("message", native);
    };
  }, [character.id]);
  const model = (0, import_react5.useMemo)(() => {
    const split = character.modelPath.lastIndexOf("/"), dir = split < 0 ? "" : character.modelPath.slice(0, split + 1);
    const refs = character.model.FileReferences;
    return { id: character.id, name: character.name, resourcesPath: "/live2d-stage/models/" + character.id + "/" + dir, defaultModelDir: ".", defaultModel3Json: character.modelPath.slice(split + 1), icon: "", models: [], idleGroup: Object.keys(refs.Motions ?? {}).find((x) => /^idle$/i.test(x)) ?? null, motionGroups: Object.fromEntries(Object.entries(refs.Motions ?? {}).map(([g, rows]) => [g, rows.map((r) => r.File)])), hitAreas: (character.model.HitAreas ?? []).map((h) => ({ id: h.Id, name: h.Name })) };
  }, [character.id, character.modelPath]);
  (0, import_react5.useEffect)(() => {
    let closed = false, after, epoch;
    const client = crypto.randomUUID();
    let timer, lastReport = 0;
    async function tick() {
      try {
        const diagnostics = player.current?.getDiagnostics();
        const ready = diagnostics?.status === "ready";
        onStatus(diagnostics?.message ?? "\u6A21\u578B\u52A0\u8F7D\u4E2D\u2026");
        if (Date.now() - lastReport > 5e3) {
          lastReport = Date.now();
          const canvas = document.querySelector(".l2ds canvas");
          let pixels = 0, drawError = "";
          try {
            const snapshot = ready ? PlatformDelegate.getInstance().snapshot() : null;
            if (snapshot) {
              const sample = document.createElement("canvas");
              sample.width = 64;
              sample.height = 64;
              const ctx = sample.getContext("2d");
              ctx.drawImage(snapshot, 0, 0, 64, 64);
              const data = ctx.getImageData(0, 0, 64, 64).data;
              for (let i = 3; i < data.length; i += 4) if (data[i] > 10) pixels++;
            }
          } catch (e) {
            drawError = String(e.stack || e);
          }
          const delegate = PlatformDelegate.getInstance(), sub = delegate.subdelegate, manager = sub?._live2dManager, loaded = manager?._models?.[0], gl = sub?._glManager?.getGl();
          const render = { modelState: loaded?._state, modelLoaded: !!loaded?._model, textureCount: sub?._textureManager?._textures?.length, gpu: gl?.getParameter(gl.RENDERER), contextLost: gl?.isContextLost(), glError: gl?.getError() };
          void api("diagnostics", { render, client, characterId: character.id, protocol: location.protocol, status: diagnostics, pixels, drawError, issues: issues.current, canvas: canvas ? { width: canvas.width, height: canvas.height, rect: canvas.getBoundingClientRect().toJSON() } : null }).catch(() => {
          });
        }
        const page = await api("events?client=" + client + "&character=" + character.id + "&ready=" + ready + (after === void 0 ? "" : "&after=" + after));
        if (closed) return;
        if (epoch && epoch !== page.epoch) {
          after = page.sequence;
          epoch = page.epoch;
          return;
        }
        epoch = page.epoch;
        for (const event of page.events) {
          void (async () => {
            if (closed) return;
            let played = false;
            if (ready) {
              const a = event.action;
              played = a.kind === "motion" ? await player.current.playMotion(a.group, a.index) : player.current.setExpression(a.expressionId);
            }
            await api("receipt", { eventId: event.id, status: played ? "played" : "failed" });
            if (!closed) onStatus(played ? "\u5DF2\u64AD\u653E\uFF1A" + event.action.name : "\u52A8\u4F5C\u64AD\u653E\u5931\u8D25");
          })().catch((e) => {
            if (!closed) onStatus(e.message);
          });
        }
        after = page.sequence;
      } catch (e) {
        if (!closed) onStatus(e.message);
      } finally {
        if (!closed) timer = setTimeout(tick, 650);
      }
    }
    void tick();
    return () => {
      closed = true;
      clearTimeout(timer);
    };
  }, [character.id, onStatus]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Live2DPlayer, { ref: player, character: model, translate: (message, values = []) => message.replace(/\{(\d+)\}/g, (match, index) => Number(index) < values.length ? String(values[Number(index)]) : match), hint: null, interactive: false });
}
var import_react5, import_jsx_runtime5;
var init_player = __esm({
  "src/client/player.tsx"() {
    import_react5 = require("react");
    init_Live2DPlayer2();
    init_PlatformDelegate();
    init_api();
    import_jsx_runtime5 = require("react/jsx-runtime");
  }
});

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react6 = require("react");

// src/client/stage.css
var css = ".l2ds{position:fixed;z-index:90;width:320px;max-width:95vw;pointer-events:auto;color:var(--foreground,#ddd);font:13px system-ui;background:transparent;border:0;border-radius:0;box-shadow:none;overflow:hidden}.l2ds header{display:flex;justify-content:space-between;gap:6px;align-items:center;padding:9px;cursor:move;touch-action:none;font-weight:600}.l2ds button{border:0;border-radius:0;padding:4px 7px;background:transparent;color:inherit;cursor:pointer;font-size:12px}.l2ds-stage{height:310px;position:relative;background:transparent}.l2ds-stage>p{padding:30px}.l2ds>small{display:block;padding:5px 10px}.l2ds .live2d-player__hint{bottom:10px;white-space:nowrap;background:transparent;border:0;box-shadow:none;backdrop-filter:none}\r\n.l2ds-config{color:inherit;font-family:inherit;font-size:14px;line-height:1.55;max-width:850px;min-width:0;padding-bottom:24px}.l2ds-config h2{font-size:20px;font-weight:600;margin:0 0 8px}.l2ds-config h3{font-size:15px;font-weight:600;margin:0}.l2ds-muted{font-size:13px;opacity:1;margin:7px 0 16px;line-height:1.65}.l2ds-config-card{border:1px solid #8884;border-radius:12px;padding:16px;margin:18px 0}.l2ds-config-card p{margin-bottom:0}.l2ds-toggle{display:flex;align-items:center;justify-content:space-between;gap:16px}.l2ds-toggle label{display:flex;align-items:center;gap:7px;white-space:nowrap}.l2ds-config-heading{display:flex;align-items:center;justify-content:space-between;gap:14px;margin:25px 0 10px}.l2ds-config-heading h3 span{font-size:12px;opacity:1;margin-left:6px}.l2ds-config button,.l2ds-config input:not([type=checkbox]),.l2ds-config select{font:inherit;color:inherit;background:transparent;border:1px solid #8885;border-radius:8px;padding:8px 10px;box-sizing:border-box;min-width:0}.l2ds-config button{cursor:pointer;white-space:nowrap;font-size:13px}.l2ds-config button:hover{background:#8881}.l2ds-config button:disabled{opacity:1;cursor:default}.l2ds-config input:focus,.l2ds-config select:focus{outline:2px solid #6d8be0;outline-offset:1px}.l2ds-fields{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:18px 0}.l2ds-fields label{display:grid;gap:7px;font-size:13px}.l2ds-config select option{background:Canvas;color:CanvasText}.l2ds-file{display:none}.l2ds-empty{padding:28px 16px;border:1px dashed #8885;border-radius:10px;text-align:center;font-size:13px;opacity:1}.l2ds-action-list{display:grid;gap:8px}.l2ds-action{display:grid;grid-template-columns:38px minmax(0,1fr) auto;align-items:center;gap:10px}.l2ds-kind{font-size:11px;opacity:1}.l2ds-config-heading input{width:160px;font-size:12px!important}.l2ds-error{color:#cf4444;font-size:13px}.l2ds-save{min-height:24px;margin:10px 0;font-size:12px;color:#43835b}@media(max-width:620px){.l2ds-fields{grid-template-columns:1fr}.l2ds-config-heading{flex-wrap:wrap}}\r\n\r\n\r\n\r\n.l2ds{color:#16191f;text-shadow:0 0 2px #fff,1px 0 #fff,-1px 0 #fff,0 1px #fff,0 -1px #fff}.l2ds .live2d-player__hint{color:#16191f;opacity:1}.l2ds-config{color:CanvasText}.l2ds-config input::placeholder{color:CanvasText;opacity:1}.l2ds-native{position:absolute;inset:0;width:100%;max-width:none}.l2ds-native .l2ds-stage{height:calc(100% - 28px)}\r\n\r\n.l2ds-action:has(button:nth-of-type(2)){grid-template-columns:38px minmax(0,1fr) auto auto}\r\n\r\n.l2ds-native{inset:0;width:100%;height:100%}.l2ds-app{inset:0;width:0;height:0;overflow:visible}.l2ds-adjust{position:relative;overflow:hidden;touch-action:none;cursor:move}.l2ds-model{position:absolute;inset:0;transform-origin:center;pointer-events:none}.l2ds-model .live2d-player{width:100%;height:100%}.l2ds .live2d-player__hint,.l2ds .live2d-player__status{display:none}.l2ds-adjust.is-editing{outline:1px dashed #6078a0;outline-offset:-1px;background:#b4c4dd18}\r\n\r\n/* Keep a real compositor layer; only the character canvas receives pointer input. */\r\n.l2ds-app{width:100vw;height:100vh;max-width:none;pointer-events:none;overflow:visible}.l2ds-app .l2ds-adjust{pointer-events:auto}\r\n\r\n.l2ds-viewport{position:absolute;left:0;top:0;overflow:hidden;pointer-events:none}.l2ds-controls{position:absolute;top:0;height:100%;width:52px;pointer-events:none}.l2ds-toolbar{position:absolute;left:5px;top:25%;display:flex;flex-direction:column;gap:7px;pointer-events:auto;text-shadow:none}.l2ds-toolbar button{width:42px;min-height:34px;display:grid;place-items:center;background:#fff;color:#202636;border:1px solid #cbd1dc;border-radius:7px;font:12px system-ui;box-shadow:0 1px 4px #0002}.l2ds-toolbar .l2ds-drag-handle{cursor:move;touch-action:none}.l2ds-sidepanel{position:absolute;left:52px;top:0;bottom:0;width:320px;box-sizing:border-box;background:#fff;color:#202636;text-shadow:none;pointer-events:auto;border-radius:12px;padding:14px;overflow:auto;font:13px system-ui;cursor:default}.l2ds-sidepanel button{border:1px solid #cad0db;border-radius:5px;color:#202636;background:#f6f8fc;padding:7px}.l2ds-panel-close{position:absolute;right:8px;top:8px}.l2ds-chat{height:100%;display:flex;flex-direction:column;gap:10px}.l2ds-chat strong{padding-right:32px}.l2ds-chat select,.l2ds-chat textarea{color:#202636;background:#fff;border:1px solid #c5cbd7;border-radius:5px;padding:7px;font:13px system-ui;min-width:0}.l2ds-chat textarea{height:65px;resize:none}.l2ds-messages{flex:1;min-height:90px;overflow:auto}.l2ds-message{white-space:pre-wrap;overflow-wrap:anywhere;margin:8px 0;padding:8px;background:#f2f4f8;border-radius:6px}.l2ds-message.user{background:#eaf1ff}.l2ds-message small{display:block;color:#505b70;margin-bottom:4px}.l2ds-preview-actions{display:grid;gap:8px;margin-top:22px}.l2ds-toolbar-error{position:absolute;right:0;bottom:8px;width:250px;background:#fff;color:#b12424;text-shadow:none;font:12px system-ui;padding:8px;pointer-events:auto}.l2ds-sidepanel [role=alert]{color:#b12424}\r\n\r\n.l2ds-adjust.is-editing{outline:none;background:transparent}.l2ds-resize-frame{position:absolute;left:0;top:0;pointer-events:none;box-sizing:border-box;border:1px dashed #6078a0;z-index:2}.l2ds-resize{position:absolute;pointer-events:auto;touch-action:none}.l2ds-resize-n,.l2ds-resize-s{left:10px;right:10px;height:8px;cursor:ns-resize}.l2ds-resize-n{top:0}.l2ds-resize-s{bottom:0}.l2ds-resize-e,.l2ds-resize-w{top:10px;bottom:10px;width:8px;cursor:ew-resize}.l2ds-resize-e{right:0}.l2ds-resize-w{left:0}.l2ds-resize-ne,.l2ds-resize-nw,.l2ds-resize-se,.l2ds-resize-sw{width:10px;height:10px;border:1px solid #6078a0;background:#fff;box-sizing:border-box}.l2ds-resize-ne{right:0;top:0;cursor:nesw-resize}.l2ds-resize-nw{left:0;top:0;cursor:nwse-resize}.l2ds-resize-se{right:0;bottom:0;cursor:nwse-resize}.l2ds-resize-sw{left:0;bottom:0;cursor:nesw-resize}.l2ds-toolbar svg{display:block;width:21px;height:21px}.l2ds-toolbar button:focus-visible{outline:2px solid #557bd5;outline-offset:1px}\r\n\r\n.l2ds-resize{background:rgba(96,120,160,.01)}.l2ds-resize-ne,.l2ds-resize-nw,.l2ds-resize-se,.l2ds-resize-sw{background:#fff}\r\n\r\n.l2ds-adjust:focus{outline:none}.l2ds-adjust-hint{position:absolute;bottom:12px;left:12px;right:12px;text-align:center;font:11px/1.5 system-ui;color:#202636;opacity:1;text-shadow:0 0 3px #fff,1px 0 #fff,-1px 0 #fff,0 1px #fff,0 -1px #fff;pointer-events:none}\r\n";
var style = document.createElement("style");
style.dataset.plugin = "dsh-plugin-live2d-stage";
style.dataset.pluginCss = "E:\\DSHLive2d-plugin\\src\\client\\stage.css";
style.textContent = css;
document.head.append(style);

// src/client/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var icons = { "type": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-type"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="M12 4v16" />\n  <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />\n  <path d="M9 20h6" />\n</svg>\n', "face-slightly-smiling-plus": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-face-slightly-smiling-plus"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="M13.267 2.08a10 10 0 108.653 8.653" />\n  <path d="M15 10V9" />\n  <path d="M16 5h6" />\n  <path d="M16.472 15a6 6 0 01-8.943 0" />\n  <path d="M19 2v6" />\n  <path d="M9 10V9" />\n</svg>\n', "move": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-move"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="M12 2v20" />\n  <path d="m15 19-3 3-3-3" />\n  <path d="m19 9 3 3-3 3" />\n  <path d="M2 12h20" />\n  <path d="m5 9-3 3 3 3" />\n  <path d="m9 5 3-3 3 3" />\n</svg>\n', "reload": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-rotate-cw"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />\n  <path d="M21 3v5h-5" />\n</svg>\n', "square-arrow-right-exit": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-square-arrow-right-exit"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="M10 12h11" />\n  <path d="m17 16 4-4-4-4" />\n  <path d="M21 6.344V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1.344" />\n</svg>\n', "square-arrow-right-enter": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-square-arrow-right-enter"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="m10 16 4-4-4-4" />\n  <path d="M3 12h11" />\n  <path d="M3 8V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />\n</svg>\n', "x": '<!-- @license lucide-static v1.49.0 - ISC -->\n<svg\n  class="lucide lucide-x"\n  xmlns="http://www.w3.org/2000/svg"\n  width="24"\n  height="24"\n  viewBox="0 0 24 24"\n  fill="none"\n  stroke="currentColor"\n  stroke-width="2"\n  stroke-linecap="round"\n  stroke-linejoin="round"\n>\n  <path d="M18 6 6 18" />\n  <path d="m6 6 12 12" />\n</svg>\n' };
function Icon({ name: name2 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true", "data-icon": name2, dangerouslySetInnerHTML: { __html: icons[name2] } });
}

// src/client/toolbar.tsx
var import_react = require("react");
init_api();
var import_jsx_runtime2 = require("react/jsx-runtime");
function ChatPanel() {
  const [sessions, setSessions] = (0, import_react.useState)([]), [workspaces, setWorkspaces] = (0, import_react.useState)([]), [workspace, setWorkspace] = (0, import_react.useState)(""), [session, setSession] = (0, import_react.useState)(""), [ready, setReady] = (0, import_react.useState)(false), [draft, setDraft] = (0, import_react.useState)(""), [history, setHistory] = (0, import_react.useState)({ messages: [] }), [error, setError] = (0, import_react.useState)(""), [sending, setSending] = (0, import_react.useState)(false);
  const pending = (0, import_react.useRef)(null), list = (0, import_react.useRef)(null);
  async function refreshSessions() {
    const data = await api("chat/sessions");
    setSessions(data.items ?? []);
    setWorkspaces(data.workspaces ?? []);
    setReady(true);
    return data;
  }
  (0, import_react.useEffect)(() => {
    let active = true;
    async function refresh() {
      try {
        const data = await api("chat/sessions");
        if (!active) return;
        setSessions(data.items ?? []);
        setWorkspaces(data.workspaces ?? []);
        setReady(true);
      } catch (e) {
        if (active) setError(e.message);
      }
    }
    void refresh();
    const timer = setInterval(refresh, 3e3);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!ready) return;
    if (workspace && !workspaces.some((w) => w.workspaceId === workspace)) {
      setWorkspace("");
      setSession("");
    } else if (session && !sessions.some((s) => s.sessionId === session && (!workspace || s.workspaceId === workspace))) setSession("");
  }, [sessions, workspaces, workspace, session, ready]);
  (0, import_react.useEffect)(() => {
    setHistory({ messages: [] });
    if (!session) return;
    let active = true, timer;
    async function poll() {
      try {
        const next = await api("chat/history?session=" + encodeURIComponent(session));
        if (active) setHistory(next);
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) timer = setTimeout(poll, 1e3);
      }
    }
    void poll();
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [session]);
  (0, import_react.useEffect)(() => {
    if (list.current) list.current.scrollTop = list.current.scrollHeight;
  }, [history.messages?.length]);
  async function send() {
    if (sending || !ready || !draft.trim() || !session && !workspace) return;
    setSending(true);
    setError("");
    if (!pending.current || pending.current.text !== draft || pending.current.sessionId !== session || (pending.current.workspaceId || "") !== workspace) pending.current = { text: draft, sessionId: session, workspaceId: workspace || void 0, requestId: crypto.randomUUID(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
    try {
      const result = await api("chat/send", pending.current);
      await refreshSessions();
      setSession(result.sessionId);
      setDraft("");
      pending.current = null;
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "l2ds-chat", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "Harness \u6587\u672C\u5BF9\u8BDD" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { "aria-label": "\u9009\u62E9\u5DE5\u4F5C\u533A", value: workspace, disabled: sending || !ready, onChange: (e) => {
      setWorkspace(e.target.value);
      setSession("");
      setError("");
      pending.current = null;
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: "\u5168\u90E8 Harness \u4F1A\u8BDD" }),
      workspaces.map((w) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: w.workspaceId, children: w.title || w.path }, w.workspaceId))
    ] }),
    workspace && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { className: "l2ds-workspace-path", children: workspaces.find((w) => w.workspaceId === workspace)?.path }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { "aria-label": "\u9009\u62E9\u5BF9\u8BDD", value: session, disabled: sending, onChange: (e) => {
      setSession(e.target.value);
      setError("");
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: workspace ? "\u5728\u6B64\u5DE5\u4F5C\u533A\u65B0\u5EFA\u5BF9\u8BDD" : "\u8BF7\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD" }),
      sessions.filter((s) => !workspace || s.workspaceId === workspace).map((s) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: s.sessionId, children: s.title || s.sessionId }, s.sessionId))
    ] }),
    !workspace && !session && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: "\u9009\u62E9 Harness \u5DE5\u4F5C\u533A\u4EE5\u65B0\u5EFA\u5BF9\u8BDD\uFF0C\u6216\u9009\u62E9\u5DF2\u6709\u4F1A\u8BDD\u7EE7\u7EED\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { ref: list, className: "l2ds-messages", children: [
      history.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "l2ds-message " + m.role, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("small", { children: m.role === "user" ? "\u4F60" : "Agent" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: m.text })
      ] }, m.id)),
      history.running && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "\u6B63\u5728\u5904\u7406\u2026" }),
      history.error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { role: "alert", children: history.error })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { role: "alert", children: error }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { "aria-label": "\u5BF9\u8BDD\u5185\u5BB9", value: draft, maxLength: 32e3, onChange: (e) => setDraft(e.target.value), placeholder: "\u8F93\u5165\u6D88\u606F\uFF0CCtrl+Enter \u53D1\u9001", onKeyDown: (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !e.nativeEvent.isComposing) {
        e.preventDefault();
        void send();
      }
    } }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: sending || !ready || !draft.trim() || !session && !workspace, onClick: () => void send(), children: sending ? "\u53D1\u9001\u4E2D\u2026" : "\u53D1\u9001" })
  ] });
}
function Toolbar({ character, native, panel, setPanel, reset, startDrag }) {
  const [error, setError] = (0, import_react.useState)(""), [busy, setBusy] = (0, import_react.useState)(false);
  async function run(fn) {
    setError("");
    setBusy(true);
    try {
      await fn();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "l2ds-toolbar", "aria-label": "\u4EBA\u7269\u63A7\u5236", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { title: "\u6587\u672C", "aria-label": "\u6587\u672C", disabled: busy, onClick: () => native ? setPanel(panel === "chat" ? "" : "chat") : void run(() => api("chat/open", {})), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "type" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { title: "\u52A8\u4F5C", "aria-label": "\u52A8\u4F5C", onClick: () => setPanel(panel === "actions" ? "" : "actions"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "face-slightly-smiling-plus" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "l2ds-drag-handle", title: "\u62D6\u62FD\u753B\u5E03", "aria-label": "\u62D6\u62FD\u753B\u5E03", onPointerDown: startDrag, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "move" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { title: "\u91CD\u7F6E", "aria-label": "\u91CD\u7F6E", onClick: reset, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "reload" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { title: native ? "\u79FB\u5165 Harness" : "\u79FB\u51FA Harness", "aria-label": native ? "\u79FB\u5165 Harness" : "\u79FB\u51FA Harness", disabled: busy, onClick: () => void run(() => api("dock", { outside: !native })), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: native ? "square-arrow-right-enter" : "square-arrow-right-exit" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { title: "\u5173\u95ED", "aria-label": "\u5173\u95ED", disabled: busy, onClick: () => void run(() => api("close", {})), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Icon, { name: "x" }) })
    ] }),
    panel && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("aside", { className: "l2ds-sidepanel", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "l2ds-panel-close", "aria-label": "\u6536\u8D77\u9762\u677F", onClick: () => setPanel(""), children: "\xD7" }),
      panel === "chat" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChatPanel, {}) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: "\u52A8\u4F5C\u9884\u89C8" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "l2ds-preview-actions", children: character.actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { disabled: busy, onClick: () => void run(() => api("play", { characterId: character.id, actionId: a.id })), children: a.name }, a.id)) })
      ] })
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { role: "alert", className: "l2ds-toolbar-error", children: error })
  ] });
}

// src/client/adjustment.tsx
var import_react2 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var clamp = (v, a, b) => Math.max(a, Math.min(b, v));
var edges = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
function Adjustment({ characterId, character, chatRequest = 0, native = false, children }) {
  const key = "live2d-stage.layout." + (native ? "native." : "app.") + characterId;
  const defaults = { width: 350, height: 470, scale: 1, x: 0, y: 0, left: Math.max(0, window.innerWidth - 426), top: Math.max(0, window.innerHeight - 494) };
  const initial = () => {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "{}");
      return { ...defaults, width: clamp(Number(v.width) || 350, 240, 1e3), height: clamp(Number(v.height) || 470, 300, 1200), scale: clamp(Number(v.scale) || 1, 0.3, 3), x: clamp(Number(v.x) || 0, -800, 800), y: clamp(Number(v.y) || 0, -800, 800), left: clamp(Number(v.left ?? defaults.left), 0, Math.max(0, window.innerWidth - 80)), top: clamp(Number(v.top ?? defaults.top), 0, Math.max(0, window.innerHeight - 80)) };
    } catch {
      return defaults;
    }
  };
  const [layout, setLayout] = (0, import_react2.useState)(initial), [editing, setEditing] = (0, import_react2.useState)(false), [panel, setPanel] = (0, import_react2.useState)("");
  const surface = (0, import_react2.useRef)(null), drag = (0, import_react2.useRef)(null), tap = (0, import_react2.useRef)(null), nativeDouble = (0, import_react2.useRef)(-1e3), pointerDouble = (0, import_react2.useRef)(-1e3), current = (0, import_react2.useRef)(layout);
  current.current = layout;
  const post = (text) => window.chrome?.webview?.postMessage(text);
  const update = (value) => {
    current.current = value;
    setLayout(value);
  };
  const save = () => {
    try {
      localStorage.setItem(key, JSON.stringify(current.current));
    } catch {
    }
    if (native) {
      post("layout:" + JSON.stringify({ key, value: JSON.stringify(current.current) }));
      post("save");
    }
  };
  (0, import_react2.useEffect)(() => {
    if (native) post("resize:" + (layout.width + 52 + (panel ? 320 : 0)) + ":" + layout.height);
    else setLayout((v) => ({ ...v, left: clamp(v.left, 0, Math.max(0, window.innerWidth - v.width - 52 - (panel ? 320 : 0))), top: clamp(v.top, 0, Math.max(0, window.innerHeight - v.height)) }));
  }, [layout.width, layout.height, native, panel]);
  (0, import_react2.useEffect)(() => {
    if (native && chatRequest) setPanel("chat");
  }, [native, chatRequest]);
  function reset() {
    update({ ...defaults, left: Math.max(0, window.innerWidth - 426), top: Math.max(0, window.innerHeight - 494) });
    setPanel("");
    setEditing(false);
    tap.current = null;
    save();
    if (native) post("reset");
  }
  function begin(e, canvas = false, edge = "") {
    if (e.button !== 0) return;
    e.stopPropagation();
    drag.current = { x: e.screenX, y: e.screenY, pointerId: e.pointerId, start: current.current, canvas, edge, moved: false, offsetX: 0, offsetY: 0 };
    e.currentTarget.closest(".l2ds-adjust").setPointerCapture(e.pointerId);
  }
  function move(e) {
    const d = drag.current;
    if (!d) return;
    const dx = e.screenX - d.x, dy = e.screenY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 4) return;
    d.moved = true;
    tap.current = null;
    const v = d.start;
    if (d.edge) {
      const width = clamp(v.width + (d.edge.includes("e") ? dx : d.edge.includes("w") ? -dx : 0), 240, 1e3);
      const height = clamp(v.height + (d.edge.includes("s") ? dy : d.edge.includes("n") ? -dy : 0), 300, 1200);
      const ox = d.edge.includes("w") ? v.width - width : 0, oy = d.edge.includes("n") ? v.height - height : 0;
      if (native) {
        post("move:" + (ox - d.offsetX) + ":" + (oy - d.offsetY));
        d.offsetX = ox;
        d.offsetY = oy;
      }
      update({ ...v, width, height, left: native ? v.left : Math.max(0, v.left + ox), top: native ? v.top : Math.max(0, v.top + oy) });
    } else if (d.canvas || !editing) {
      if (native) {
        post("move:" + (dx - d.offsetX) + ":" + (dy - d.offsetY));
        d.offsetX = dx;
        d.offsetY = dy;
      } else update({ ...v, left: clamp(v.left + dx, 0, Math.max(0, window.innerWidth - 80)), top: clamp(v.top + dy, 0, Math.max(0, window.innerHeight - 80)) });
    } else update({ ...v, x: clamp(v.x + dx, -800, 800), y: clamp(v.y + dy, -800, 800) });
  }
  function end(e, cancel = false) {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (!cancel && !d.moved && !d.canvas && !d.edge) {
      const prev = tap.current, now = performance.now();
      if (prev && now - prev.time < 500 && Math.hypot(e.screenX - prev.x, e.screenY - prev.y) < 8) {
        if (!native || now - nativeDouble.current > 250) {
          setEditing((v) => !v);
          pointerDouble.current = now;
        }
        tap.current = null;
      } else tap.current = { time: now, x: e.screenX, y: e.screenY };
    } else tap.current = null;
    save();
  }
  (0, import_react2.useEffect)(() => {
    if (!native) return;
    function doubleClick(event) {
      const { x, y } = event.detail || {};
      const target = document.elementFromPoint(x, y);
      if (!target?.closest(".l2ds-adjust") || target.closest(".l2ds-toolbar,.l2ds-sidepanel,.l2ds-resize")) return;
      const now = performance.now();
      nativeDouble.current = now;
      tap.current = null;
      if (now - pointerDouble.current > 250) {
        save();
        setEditing((v) => !v);
      }
    }
    window.addEventListener("live2d-native-doubleclick", doubleClick);
    return () => window.removeEventListener("live2d-native-doubleclick", doubleClick);
  }, [native]);
  (0, import_react2.useEffect)(() => {
    if (editing) {
      surface.current?.focus({ preventScroll: true });
      if (native) post("focus");
    }
  }, [editing, native]);
  (0, import_react2.useEffect)(() => {
    function finish() {
      const d = drag.current;
      drag.current = null;
      if (d && surface.current?.hasPointerCapture(d.pointerId)) surface.current.releasePointerCapture(d.pointerId);
      save();
      setEditing(false);
      tap.current = null;
    }
    function keydown(e) {
      if (e.key === "Escape" && editing) {
        e.preventDefault();
        e.stopImmediatePropagation();
        finish();
      }
    }
    function nativeEscape() {
      if (editing) finish();
    }
    window.addEventListener("keydown", keydown, true);
    window.addEventListener("live2d-native-escape", nativeEscape);
    return () => {
      window.removeEventListener("keydown", keydown, true);
      window.removeEventListener("live2d-native-escape", nativeEscape);
    };
  }, [editing]);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { ref: surface, tabIndex: -1, className: "l2ds-adjust" + (editing ? " is-editing" : ""), "aria-label": "Live2D \u753B\u5E03", style: native ? { width: "100%", height: "100%" } : { position: "fixed", left: layout.left, top: layout.top, width: layout.width + 52 + (panel ? 320 : 0), height: layout.height }, onDoubleClick: (e) => e.preventDefault(), onPointerDown: (e) => {
    if (!e.target.closest(".l2ds-toolbar,.l2ds-sidepanel,.l2ds-resize")) begin(e);
  }, onPointerMove: move, onPointerUp: (e) => end(e), onPointerCancel: (e) => end(e, true), onWheel: (e) => {
    if (!editing || e.target.closest(".l2ds-toolbar,.l2ds-sidepanel")) return;
    update({ ...current.current, scale: clamp(current.current.scale * (e.deltaY < 0 ? 1.05 : 1 / 1.05), 0.3, 3) });
    save();
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "l2ds-viewport", style: { width: layout.width, height: layout.height }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "l2ds-model", style: { width: `${layout.scale * 100}%`, height: `${layout.scale * 100}%`, left: `calc(${(1 - layout.scale) * 50}% + ${layout.x}px)`, top: `calc(${(1 - layout.scale) * 50}% + ${layout.y}px)`, right: "auto", bottom: "auto" }, children }) }),
    editing && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "l2ds-resize-frame", style: { width: layout.width, height: layout.height }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("small", { className: "l2ds-adjust-hint", children: "Esc \u9000\u51FA\u4FDD\u5B58\uFF0C\u6EDA\u8F6E\u63A7\u5236\u4EBA\u7269\u653E\u5927" }),
      edges.map((edge) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "l2ds-resize l2ds-resize-" + edge, "aria-label": "\u8C03\u6574\u753B\u5E03 " + edge, onPointerDown: (e) => begin(e, false, edge) }, edge))
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "l2ds-controls", style: { left: layout.width }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Toolbar, { character, native, panel, setPanel, reset, startDrag: (e) => begin(e, true) }) })
  ] });
}

// src/client/index.tsx
init_api();
var import_jsx_runtime6 = require("react/jsx-runtime");
var base2 = "/live2d-stage/";
var loading;
function core() {
  return loading ??= new Promise((resolve, reject) => {
    if ("Live2DCubismCore" in globalThis) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = base2 + "assets/core.js";
    s.onload = () => resolve();
    s.onerror = () => {
      s.remove();
      loading = void 0;
      reject(new Error("Live2D Core \u52A0\u8F7D\u5931\u8D25"));
    };
    document.head.append(s);
  });
}
var Player2 = (0, import_react6.lazy)(() => core().then(() => Promise.resolve().then(() => (init_player(), player_exports))));
var PreviewBoundary = class extends import_react6.Component {
  state = { error: "" };
  static getDerivedStateFromError(e) {
    return { error: e.message };
  }
  render() {
    return this.state.error ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { role: "alert", children: [
      "\u9884\u89C8\u52A0\u8F7D\u5931\u8D25\uFF1A",
      this.state.error
    ] }) : this.props.children;
  }
};
function createState() {
  let state = { characters: [], selectedId: null, visible: true, error: "", generation: 0, playerStatus: "" };
  try {
    state.visible = localStorage.getItem("live2d-stage.visible") !== "false";
  } catch {
  }
  const listeners = /* @__PURE__ */ new Set();
  const publish = (patch) => {
    state = { ...state, ...patch };
    listeners.forEach((fn) => fn());
  };
  let pending;
  return {
    subscribe: (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    getSnapshot: () => state,
    refresh: () => pending ??= api("state").then((data) => publish({ ...data, error: "" })).catch((e) => {
      publish({ error: e.message });
      throw e;
    }).finally(() => {
      pending = void 0;
    }),
    status: (value) => {
      if (state.playerStatus !== value) publish({ playerStatus: value });
    },
    visible: (value) => {
      try {
        localStorage.setItem("live2d-stage.visible", String(value));
      } catch {
      }
      publish({ visible: value });
    }
  };
}
function useStage(store) {
  const state = (0, import_react6.useSyncExternalStore)(store.subscribe, store.getSnapshot);
  (0, import_react6.useEffect)(() => {
    void store.refresh().catch(() => {
    });
    const timer = setInterval(() => void store.refresh().catch(() => {
    }), 2e3);
    return () => clearInterval(timer);
  }, [store]);
  return state;
}
function Panel({ store }) {
  const state = useStage(store);
  const character = state.characters.find((c) => c.id === state.selectedId);
  if (state.preferences?.desktopFloating) return null;
  if (state.preferences?.visible === false || !character) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("section", { className: "l2ds l2ds-app", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Adjustment, { characterId: character.id, character, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(PreviewBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_react6.Suspense, { fallback: null, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Player2, { character, onStatus: store.status }, character.id) }) }, character.id) }, character.id) });
}
function Settings({ store, close }) {
  const state = useStage(store), [error, setError] = (0, import_react6.useState)(""), [busy, setBusy] = (0, import_react6.useState)(false), [saved, setSaved] = (0, import_react6.useState)(""), [query, setQuery] = (0, import_react6.useState)("");
  const file = (0, import_react6.useRef)(null), lock = (0, import_react6.useRef)(false), character = state.characters.find((c) => c.id === state.selectedId);
  async function run(fn) {
    if (lock.current) return false;
    lock.current = true;
    setError("");
    setSaved("");
    setBusy(true);
    try {
      await fn();
      await store.refresh();
      setSaved("\u5DF2\u4FDD\u5B58");
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      lock.current = false;
      setBusy(false);
    }
  }
  (0, import_react6.useEffect)(() => setQuery(""), [state.selectedId]);
  async function preview(actionId) {
    setError("");
    if (state.preferences?.visible === false && !state.preferences?.desktopFloating) {
      setError("\u8BF7\u5148\u542F\u7528\u300CHarness \u5185\u4F7F\u7528\u300D\u6216\u300C\u684C\u9762\u60AC\u6D6E\u300D\uFF0C\u7B49\u5F85\u6A21\u578B\u5C31\u7EEA\u540E\u518D\u8BD5\u64AD\u3002");
      return;
    }
    try {
      await api("play", { characterId: character.id, actionId });
      close?.();
    } catch (e) {
      setError(e.message);
    }
  }
  const actions = character?.actions.filter((a) => a.name.toLowerCase().includes(query.toLowerCase())) ?? [];
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("section", { className: "l2ds-config", "aria-label": "DSHLive2D \u914D\u7F6E", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { children: "DSHLive2D" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "l2ds-muted", children: [
      "\u4F5C\u8005\uFF1A\u5C0F\u7EA2\u4E66\u53F7 4190947207 \xB7 GitHub\uFF1A",
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("a", { href: "https://github.com/B612plant", target: "_blank", rel: "noreferrer", children: "B612plant" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u914D\u7F6E\u89D2\u8272\u6A21\u578B\u4E0E\u6F14\u51FA\u52A8\u4F5C\uFF0C\u8BA9 Agent \u6839\u636E\u5F53\u524D\u89D2\u8272\u9009\u62E9\u52A8\u4F5C\u3002" }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-config-card l2ds-toggle", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Harness \u5185\u4F7F\u7528" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u4EC5\u663E\u793A\u89D2\u8272\u3002\u62D6\u62FD\u79FB\u52A8\u753B\u5E03\uFF0C\u53CC\u51FB\u540E\u5206\u522B\u8C03\u6574\u753B\u5E03\u548C\u4EBA\u7269\u7684\u5927\u5C0F\u3001\u4F4D\u7F6E\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { type: "checkbox", checked: state.preferences?.visible !== false, disabled: busy, onChange: (e) => void run(() => api("preferences", { visible: e.target.checked })) }),
        "\u542F\u7528"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-config-card l2ds-toggle", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "\u684C\u9762\u60AC\u6D6E" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u72EC\u7ACB\u900F\u660E\u7F6E\u9876\u7A97\u53E3\uFF0C\u5207\u6362\u5230\u5176\u4ED6\u5E94\u7528\u540E\u4ECD\u53EF\u4F7F\u7528\u3002\u62D6\u62FD\u89D2\u8272\u79FB\u52A8\u7A97\u53E3\uFF0C\u53CC\u51FB\u8FDB\u5165\u8C03\u6574\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { "aria-label": "\u684C\u9762\u60AC\u6D6E", type: "checkbox", disabled: busy, checked: !!state.preferences?.desktopFloating, onChange: (e) => void run(() => api("preferences", { desktopFloating: e.target.checked })) }),
        "\u542F\u7528"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-config-card l2ds-toggle", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "\u52A8\u4F5C\u63A7\u5236\uFF08\u5C06\u6D88\u8017\u66F4\u591A token\uFF09" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u5141\u8BB8 Agent \u5728\u5BF9\u8BDD\u4E2D\u8BFB\u53D6\u52A8\u4F5C\u5217\u8868\uFF0C\u9009\u62E9\u4E0E\u5185\u5BB9\u6700\u5408\u9002\u7684\u52A8\u4F5C\u64AD\u653E\u3002\u8BF7\u5148\u8BD5\u64AD\u5E76\u51C6\u786E\u547D\u540D\u52A8\u4F5C\u3002" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { "aria-label": "\u52A8\u4F5C\u63A7\u5236", type: "checkbox", disabled: busy, checked: !!state.preferences?.actionControl, onChange: (e) => void run(() => api("preferences", { actionControl: e.target.checked })) }),
        "\u542F\u7528"
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-config-heading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { children: "\u89D2\u8272\u6A21\u578B" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { disabled: busy, onClick: () => file.current?.click(), children: busy ? "\u6B63\u5728\u4FDD\u5B58\u2026" : "\u5BFC\u5165\u89D2\u8272 ZIP" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { ref: file, className: "l2ds-file", type: "file", accept: ".zip,application/zip", disabled: busy, "aria-label": "\u4E0A\u4F20\u89D2\u8272 ZIP", onChange: (e) => {
      const zip = e.target.files?.[0];
      if (!zip) return;
      void run(async () => {
        if (zip.size > 128 * 1024 * 1024) throw new Error("ZIP \u5927\u5C0F\u987B\u5C0F\u4E8E 128 MiB");
        const r = await fetch(base2 + "import?name=" + encodeURIComponent(zip.name.replace(/\.zip$/i, "")), { method: "POST", headers: { "Content-Type": "application/zip" }, body: zip });
        const value = await r.json();
        if (!r.ok) throw new Error(value.message);
      });
      e.target.value = "";
    } }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u4ECE ZIP \u6839\u76EE\u5F55\u53CA\u5B50\u76EE\u5F55\u67E5\u627E moc3\u3002\u8BF7\u5305\u542B\u914D\u5957\u7EB9\u7406\u3001\u52A8\u4F5C\u6587\u4EF6\uFF0C\u5EFA\u8BAE\u4FDD\u7559 model3.json\u3002\u6BCF\u4E2A ZIP \u5BF9\u5E94\u4E00\u4E2A\u89D2\u8272\uFF0C\u6700\u5927 128 MiB\u3002" }),
    state.characters.length ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-fields", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
        "\u5F53\u524D\u89D2\u8272",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("select", { value: state.selectedId ?? "", disabled: busy, onChange: (e) => run(() => api("update", { characterId: e.target.value, select: true })), children: state.characters.map((c) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("option", { value: c.id, children: c.name }, c.id)) })
      ] }),
      character && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("label", { children: [
        "\u89D2\u8272\u540D\u79F0",
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { defaultValue: character.name, maxLength: 80, disabled: busy, onBlur: (e) => {
          if (e.target.value !== character.name) void run(() => api("update", { characterId: character.id, name: e.target.value }));
        } }, character.id + character.name)
      ] })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "l2ds-empty", children: "\u8FD8\u6CA1\u6709\u89D2\u8272\u3002\u5BFC\u5165\u4E00\u4E2A Live2D ZIP \u5F00\u59CB\u914D\u7F6E\u3002" }),
    character && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-config-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h3", { children: [
          "\u52A8\u4F5C\u5217\u8868 ",
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: character.actions.length })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { type: "search", "aria-label": "\u641C\u7D22\u52A8\u4F5C", placeholder: "\u641C\u7D22\u52A8\u4F5C", value: query, onChange: (e) => setQuery(e.target.value) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u8BF7\u4EE5\u5B9E\u9645\u52A8\u4F5C\u547D\u540D\uFF0C\u4F8B\u5982\u201C\u4F4E\u5934\u7728\u773C\u201D\uFF0C\u907F\u514D\u628A\u6B6A\u5934\u6807\u4E3A\u62DB\u624B\u3002\u4FEE\u6539\u540D\u79F0\u540E\u79FB\u5F00\u7126\u70B9\u5373\u4FDD\u5B58\u3002\u53EA\u6709\u5DF2\u547D\u540D\u786E\u8BA4\u7684\u52A8\u4F5C\u624D\u4F1A\u63D0\u4F9B\u7ED9 Agent\uFF1B\u70B9\u51FB\u8BD5\u64AD\u4F1A\u5173\u95ED\u8BBE\u7F6E\uFF0C\u5C55\u793A\u6F14\u51FA\u3002" }),
      !actions.length && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "l2ds-empty", children: query ? "\u6CA1\u6709\u5339\u914D\u7684\u52A8\u4F5C\u3002" : "\u6A21\u578B\u6CA1\u6709\u52A8\u4F5C\u6216\u8868\u60C5\u6587\u4EF6\uFF0C\u53EF\u9884\u89C8\u9759\u6001\u6A21\u578B\u3002" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "l2ds-action-list", children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-action", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "l2ds-kind", title: a.named ? "\u5DF2\u547D\u540D" : "\u8BF7\u5148\u8BD5\u64AD\u5E76\u786E\u8BA4\u540D\u79F0", children: a.named ? a.kind === "motion" ? "\u52A8\u4F5C" : "\u8868\u60C5" : "\u5F85\u547D\u540D" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { "aria-label": "\u52A8\u4F5C\u540D\u79F0", defaultValue: a.name, maxLength: 80, disabled: busy, onBlur: (e) => {
          if (e.target.value !== a.name) void run(() => api("update", { characterId: character.id, actionId: a.id, actionName: e.target.value }));
        } }, a.name),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { title: "\u8BD5\u64AD\u540E\uFF0C\u4FEE\u6539\u540D\u79F0\u6216\u70B9\u51FB\u786E\u8BA4\u540D\u79F0\uFF0C\u624D\u4F1A\u63D0\u4F9B\u7ED9 Agent", disabled: busy || state.preferences?.visible === false && !state.preferences?.desktopFloating, onClick: () => void preview(a.id), children: "\u8BD5\u64AD" }),
        !a.named && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { disabled: busy, onClick: () => void run(() => api("update", { characterId: character.id, actionId: a.id, actionName: a.name })), children: "\u786E\u8BA4\u540D\u79F0" })
      ] }, character.id + a.id)) })
    ] }),
    (error || state.error) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { role: "alert", className: "l2ds-error", children: error || state.error }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "l2ds-save", "aria-live": "polite", children: busy ? "\u6B63\u5728\u4FDD\u5B58\u2026" : saved }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "l2ds-config-card", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: "Agent \u6F14\u51FA\u80FD\u529B" }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "l2ds-muted", children: "\u52A8\u4F5C\u63A7\u5236\u9ED8\u8BA4\u5173\u95ED\uFF1B\u5F00\u542F\u540E\u624D\u5411 Agent \u63D0\u4F9B\u6F14\u51FA\u5DE5\u5177\u4E0E\u9009\u62E9\u8BF4\u660E\u3002Harness \u5185\u7684\u89D2\u8272\u6216\u684C\u9762\u60AC\u6D6E\u89D2\u8272\u5C31\u7EEA\u540E\u5747\u53EF\u64AD\u653E\uFF1B\u6CA1\u6709\u5408\u9002\u52A8\u4F5C\u65F6\u7EE7\u7EED\u6B63\u5E38\u56DE\u590D\u3002" })
    ] })
  ] });
}
var name = "live2d-stage-client";
var inject = ["slots"];
function apply(ctx) {
  const store = createState();
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({ name: "shell.overlay", id: "live2d-stage", order: 45, inject: () => ({ store }) }, Panel));
  ctx.slots.inject("settings.section", () => ctx.slots.register({ name: "settings.section", id: "live2d-stage", label: () => "DSHLive2D", order: 60, inject: () => ({ store }) }, Settings));
}
return module.exports;}});
