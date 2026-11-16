// ゲーム全体の調整値をまとめる場所

export const SKY_COLOR = 0x87ceeb;

export const CAMERA = {
  fov: 60,
  near: 0.1,
  far: 5000,
  // 航空機から見たカメラ位置のオフセット
  offset: [0, 5, 15],
  // カメラ追従速度
  followSpeed: 6,
};

export const AIRCRAFT = {
  startPosition: [0, 2, 0],
  // 回転速度 (ラジアン/秒)
  rotationSpeed: (30 * Math.PI) / 180,
  // 前進速度 (単位/秒)
  flightSpeed: 5,
};

// キー割り当て（小文字で指定）
export const KEY_BINDINGS = {
  pitchUp: 'i',
  pitchDown: 'k',
  rollLeft: 'j',
  rollRight: 'l',
  yawLeft: 'u',
  yawRight: 'o',
};
