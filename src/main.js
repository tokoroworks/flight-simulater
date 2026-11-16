import * as THREE from 'three';
import { SKY_COLOR } from './config.js';
import { Aircraft } from './aircraft/Aircraft.js';
import { createWorld } from './world/World.js';
import { ChaseCamera } from './camera/ChaseCamera.js';
import { Keyboard } from './input/Keyboard.js';

// シーン
const scene = new THREE.Scene();
scene.background = new THREE.Color(SKY_COLOR);

// 描画
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ゲームオブジェクト
const aircraft = new Aircraft();
const chaseCamera = new ChaseCamera(window.innerWidth / window.innerHeight);
const keyboard = new Keyboard();

scene.add(createWorld());
scene.add(aircraft.object);
chaseCamera.snapTo(aircraft.object);

// ウィンドウサイズ変更に追従
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  chaseCamera.setAspect(window.innerWidth / window.innerHeight);
});

// アニメーションループ
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const deltaTime = clock.getDelta();

  aircraft.update(deltaTime, keyboard.getControls());
  chaseCamera.update(deltaTime, aircraft.object);

  renderer.render(scene, chaseCamera.camera);
});
