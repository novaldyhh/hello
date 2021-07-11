import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Setup
var mixer
var clock = new THREE.Clock()
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

// scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(15, 15, 15);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 10, 10);
  const material = new THREE.MeshStandardMaterial({ color: "#ff9472" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(200)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(3000).fill().forEach(addStar);

function addStar2() {
  const geometry = new THREE.SphereGeometry(0.6, 10, 10);
  const material = new THREE.MeshStandardMaterial({ color: "#e847ae" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(100)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar2);

function addStar3() {
  const geometry = new THREE.SphereGeometry(0.5, 10, 10);
  const material = new THREE.MeshStandardMaterial({ color: "#3b27ba" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(100)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar3);

// Background

// const spaceTexture = new THREE.TextureLoader().load('space.jpg');
// scene.background = spaceTexture;

// Avatar
material.metalness = 1
material.roughness = 0.6
material.color = new THREE.Color('#898585');

// Moon

const moonTexture = new THREE.TextureLoader().load('vivi.jpg');
const moonTexture2 = new THREE.TextureLoader().load('spiral.png');
const moonTexture3 = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

var hello1
var hello2
var hello3
var hello4
var hello5
var hello6
var hello7
var hello8
var hello9
const loader = new GLTFLoader();
loader.load('/3D/hello1.glb', function (gltf) {
  hello1 = gltf.scene
  scene.add(hello1)
  hello1.position.z = 10;
  hello1.position.setX(0);
});
loader.load('/3D/hello2.glb', function (gltf) {
  hello2 = gltf.scene
  scene.add(hello2)
  hello2.position.z = 40;
  hello2.position.setX(0);
});
loader.load('/3D/hello3.glb', function (gltf) {
  hello3 = gltf.scene
  scene.add(hello3)
  hello3.position.z = 60;
  hello3.position.setX(0);
});
loader.load('/3D/hello4.glb', function (gltf) {
  hello4 = gltf.scene
  scene.add(hello4)
  hello4.position.z = 65;
  hello4.position.setX(0);
  hello4.position.setY(-1);
  hello4.rotateX(5);
});
loader.load('/3D/hello5.glb', function (gltf) {
  hello5 = gltf.scene
  scene.add(hello5)
  hello5.position.z = 70;
  hello5.position.setX(0);
  hello5.position.setY(-2);
  hello5.rotateX(5);
});
loader.load('/3D/hello6.glb', function (gltf) {
  hello6 = gltf.scene
  scene.add(hello6)
  hello6.position.z = 80;
  hello6.position.setX(0);
});
loader.load('/3D/hello7.glb', function (gltf) {
  hello7 = gltf.scene
  scene.add(hello7)
  hello7.position.z = 100;
  hello7.position.setY(-.5);
  hello7.position.setX(0);
});
loader.load('/3D/hello8.glb', function (gltf) {
  hello8 = gltf.scene
  scene.add(hello8)
  hello8.position.z = 120;
  hello8.position.setY(-.5);
  hello8.position.setX(0);
});
loader.load('/3D/hello9.glb', function (gltf) {
  hello9 = gltf.scene
  scene.add(hello9)
  hello9.position.z = 200;
  hello9.position.setX(0);
  hello9.position.setY(-5);
  hello9.rotateX(5.1);
});

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 50, 50),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

const vivitexture = new THREE.TextureLoader().load('cube.jpg')
const box1 = new THREE.Mesh(new THREE.BoxGeometry(30, 30, 30), new THREE.MeshBasicMaterial({ map: vivitexture }))

scene.add(moon);
scene.add(box1);

moon.position.z = 50;
moon.position.setX(0);

box1.position.z = 140;
box1.position.x = 0;



// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.020;
  camera.position.x = t * -0;
  camera.rotation.y = t * 0;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.02;

  box1.rotation.x += 0.01;
  box1.rotation.y += 0.005;
  box1.rotation.z += 0.01;

  // controls.update();
  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

animate();
