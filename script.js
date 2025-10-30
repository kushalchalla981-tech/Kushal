// Basic THREE.js Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas'), antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

// Create interactive spheres
const geometry = new THREE.SphereGeometry(0.2, 32, 32);
const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff00cc, emissive: 0x440055 }),
  new THREE.MeshStandardMaterial({ color: 0x3333ff, emissive: 0x000055 }),
  new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x003333 })
];

let spheres = [];
for (let i = 0; i < 30; i++) {
  let sphere = new THREE.Mesh(geometry, materials[Math.floor(Math.random() * materials.length)]);
  sphere.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 5
  );
  scene.add(sphere);
  spheres.push(sphere);
}

// Lighting
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Animate
function animate() {
  requestAnimationFrame(animate);
  spheres.forEach(s => {
    s.rotation.x += 0.01;
    s.rotation.y += 0.01;
  });
  renderer.render(scene, camera);
}

animate();

// GSAP Intro Animation
gsap.from(".title", { y: -50, opacity: 0, duration: 1 });
gsap.from(".tagline", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
gsap.from(".cta", { scale: 0, opacity: 0, duration: 0.8, delay: 0.8 });

// Responsive Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
