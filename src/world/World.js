import * as THREE from 'three';

// 地面・滑走路などの地形をまとめて作る
export function createWorld() {
  const world = new THREE.Group();

  // 地面
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshBasicMaterial({ color: 0x228b22 })
  );
  ground.rotation.x = -Math.PI / 2;
  world.add(ground);

  // 滑走路
  const runway = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 80),
    new THREE.MeshBasicMaterial({ color: 0x444444 })
  );
  runway.position.y = 0.01;
  runway.rotation.x = -Math.PI / 2;
  world.add(runway);

  // センターライン
  const lineGeometry = new THREE.PlaneGeometry(0.3, 5);
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  for (let i = 0; i < 8; i++) {
    const line = new THREE.Mesh(lineGeometry, lineMaterial);
    line.position.set(0, 0.02, -35 + i * 10);
    line.rotation.x = -Math.PI / 2;
    world.add(line);
  }

  return world;
}
