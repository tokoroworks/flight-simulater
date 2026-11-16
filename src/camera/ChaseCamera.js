import * as THREE from 'three';
import { CAMERA } from '../config.js';

// 航空機の後ろを滑らかに追いかけるカメラ
export class ChaseCamera {
  constructor(aspect) {
    this.camera = new THREE.PerspectiveCamera(CAMERA.fov, aspect, CAMERA.near, CAMERA.far);
    this.offset = new THREE.Vector3(...CAMERA.offset);
    this.followSpeed = CAMERA.followSpeed;

    // 毎フレーム使い回す作業用ベクトル
    this.rotatedOffset = new THREE.Vector3();
    this.targetPosition = new THREE.Vector3();
  }

  // 初期位置へ即座に移動
  snapTo(target) {
    this.camera.position.copy(target.position).add(this.offset);
    this.camera.lookAt(target.position);
  }

  update(deltaTime, target) {
    // オフセットに航空機の回転姿勢を適用する
    this.rotatedOffset.copy(this.offset).applyQuaternion(target.quaternion);
    this.targetPosition.copy(target.position).add(this.rotatedOffset);

    // フレームレートに依存しない補間率
    const alpha = 1 - Math.exp(-this.followSpeed * deltaTime);
    this.camera.position.lerp(this.targetPosition, alpha);

    // カメラの上方向を航空機に合わせる
    this.camera.up.set(0, 1, 0).applyQuaternion(target.quaternion);
    this.camera.lookAt(target.position);
  }

  setAspect(aspect) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}
