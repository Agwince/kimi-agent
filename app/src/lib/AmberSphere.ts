import * as THREE from 'three';

function createStarTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 1.5;
    const opacity = Math.random() * 0.8;
    ctx.fillStyle = `rgba(255, 165, 2, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

export interface AmberSphereState {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  glassSphere: THREE.Mesh;
  stars: THREE.Group;
  mouseX: number;
  mouseY: number;
  targetX: number;
  targetY: number;
  windowHalfX: number;
  windowHalfY: number;
  clock: THREE.Clock;
  animationId: number;
  destroyed: boolean;
}

export function createAmberSphere(containerId: string): AmberSphereState {
  const container = document.getElementById(containerId);
  if (!container) throw new Error(`Container #${containerId} not found`);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x1f1e1d, 0.02);

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 12;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  container.appendChild(renderer.domElement);

  const starTexture = createStarTexture();
  const stars = new THREE.Group();

  const scales = [2, 1.5, 1];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.SpriteMaterial({
      map: starTexture,
      color: 0xffa502,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.setScalar(scales[i]);
    stars.add(sprite);
  }
  scene.add(stars);

  const sphereGeo = new THREE.SphereGeometry(3.2, 64, 64);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x1f1e1d,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95,
    thickness: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.0,
    ior: 1.8,
    sheen: 0.5,
    sheenColor: 0xffa502,
    transparent: true,
    opacity: 1,
  });
  const glassSphere = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(glassSphere);

  const keyLight = new THREE.PointLight(0xffffff, 100, 100, 2);
  keyLight.position.set(5, 5, 5);
  scene.add(keyLight);

  const fillLight = new THREE.PointLight(0xffd700, 80, 100, 2);
  fillLight.position.set(-5, 0, 5);
  scene.add(fillLight);

  const backLight = new THREE.PointLight(0x4444ff, 120, 100, 2);
  backLight.position.set(0, 5, -10);
  scene.add(backLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const state: AmberSphereState = {
    scene,
    camera,
    renderer,
    glassSphere,
    stars,
    mouseX: 0,
    mouseY: 0,
    targetX: 0,
    targetY: 0,
    windowHalfX: window.innerWidth / 2,
    windowHalfY: window.innerHeight / 2,
    clock: new THREE.Clock(),
    animationId: 0,
    destroyed: false,
  };

  const onMouseMove = (e: MouseEvent) => {
    state.mouseX = (e.clientX - state.windowHalfX) * 0.001;
    state.mouseY = (e.clientY - state.windowHalfY) * 0.001;
  };
  document.addEventListener('mousemove', onMouseMove);

  const onResize = () => {
    state.windowHalfX = window.innerWidth / 2;
    state.windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  window.addEventListener('resize', onResize);

  (state as any)._onMouseMove = onMouseMove;
  (state as any)._onResize = onResize;

  function animate() {
    if (state.destroyed) return;
    state.animationId = requestAnimationFrame(animate);
    const time = state.clock.getElapsedTime();

    state.targetX += (state.mouseX - state.targetX) * 0.04;
    state.targetY += (state.mouseY - state.targetY) * 0.04;

    glassSphere.rotation.y = state.targetX * 15 + Math.sin(time * 0.2) * 0.1;
    glassSphere.rotation.x = state.targetY * 15 + Math.cos(time * 0.15) * 0.1;

    stars.rotation.y = time * 0.05;
    stars.rotation.x = time * 0.03;

    glassSphere.position.y = Math.sin(time * 0.5) * 0.2;

    for (let i = 0; i < stars.children.length; i++) {
      stars.children[i].position.y =
        Math.sin(time * (0.5 + i * 0.2)) * 0.2 + i * 0.1;
    }

    renderer.render(scene, camera);
  }
  animate();

  return state;
}

export function destroyAmberSphere(state: AmberSphereState) {
  state.destroyed = true;
  cancelAnimationFrame(state.animationId);
  document.removeEventListener('mousemove', (state as any)._onMouseMove);
  window.removeEventListener('resize', (state as any)._onResize);
  state.renderer.dispose();
  state.renderer.domElement.remove();
}
