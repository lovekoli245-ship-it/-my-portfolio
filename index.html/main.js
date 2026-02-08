// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 5;


// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);


// Torus
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);

const material = new THREE.MeshStandardMaterial({
  color: 0x6366f1
});

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);


// Light
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);


// Stars
function addStar() {

  const geo = new THREE.SphereGeometry(0.1, 24, 24);

  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff
  });

  const star = new THREE.Mesh(geo, mat);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);

  scene.add(star);
}

Array(200).fill().forEach(addStar);


// Animation
function animate() {

  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();


// Resize
window.addEventListener('resize', () => {

  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

});