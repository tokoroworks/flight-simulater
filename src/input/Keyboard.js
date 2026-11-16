import { KEY_BINDINGS } from '../config.js';

// キーボードの押下状態を操作量 (pitch / roll / yaw) に変換する
export class Keyboard {
  constructor(bindings = KEY_BINDINGS) {
    this.bindings = bindings;
    this.pressed = new Set();

    window.addEventListener('keydown', (e) => this.pressed.add(e.key.toLowerCase()));
    window.addEventListener('keyup', (e) => this.pressed.delete(e.key.toLowerCase()));
    // ウィンドウからフォーカスが外れたらキーを離した扱いにする
    window.addEventListener('blur', () => this.pressed.clear());
  }

  isDown(action) {
    return this.pressed.has(this.bindings[action]);
  }

  // 正方向キーと負方向キーから -1 / 0 / 1 を返す
  axis(positive, negative) {
    return (this.isDown(positive) ? 1 : 0) - (this.isDown(negative) ? 1 : 0);
  }

  getControls() {
    return {
      pitch: this.axis('pitchUp', 'pitchDown'),
      roll: this.axis('rollLeft', 'rollRight'),
      yaw: this.axis('yawLeft', 'yawRight'),
    };
  }
}
