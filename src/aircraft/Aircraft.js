import * as THREE from 'three';
import { AIRCRAFT } from '../config.js';

// 航空機の見た目と動き
export class Aircraft {
  constructor() {
    this.object = createModel();
    this.object.position.set(...AIRCRAFT.startPosition);
    this.rotationSpeed = AIRCRAFT.rotationSpeed;
    this.flightSpeed = AIRCRAFT.flightSpeed;
  }

  // controls: { pitch, roll, yaw } それぞれ -1 / 0 / 1
  update(deltaTime, controls) {
    const step = this.rotationSpeed * deltaTime;
    this.object.rotateX(controls.pitch * step);
    this.object.rotateZ(controls.roll * step);
    this.object.rotateY(controls.yaw * step);

    // 航空機前進
    this.object.translateZ(-this.flightSpeed * deltaTime);
  }
}

function createModel() {
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  // 胴体
  const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 6, 16), material);
  fuselage.rotation.x = Math.PI / 2;

  // 主翼
  const mainWing = new THREE.Mesh(new THREE.BoxGeometry(10, 0.2, 1.5), material);

  // 水平尾翼
  const horizontalTail = new THREE.Mesh(new THREE.BoxGeometry(4, 0.15, 1), material);
  horizontalTail.position.set(0, 0, 2.5);

  // 垂直尾翼
  const verticalTail = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.5, 1.2), material);
  verticalTail.position.set(0, 0.75, 2.5);

  // 航空機のパーツをグループ化
  const group = new THREE.Group();
  group.add(fuselage, mainWing, horizontalTail, verticalTail);
  return group;
}
