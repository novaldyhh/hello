import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });

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
  const material = new THREE.MeshStandardMaterial({ color: "#FF2D00" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(100)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar3);

material.metalness = 1
material.roughness = 0.6
material.color = new THREE.Color('#898585');

const moonTexture = new THREE.TextureLoader().load('moon.jpg');

var hello1
const loader = new GLTFLoader();
loader.load('/3D/hello.glb', function (gltf) {
  hello1 = gltf.scene
  hello1.mater
  scene.add(hello1)
  hello1.position.z = -5;
  hello1.position.setX(0);
});

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 50, 50),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

moon.position.z = 50;
moon.position.setX(0);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.020;
  camera.position.z += -0.001;
  camera.position.x = t * -0;
  camera.rotation.y = t * 0;
}

document.body.onscroll = moveCamera;
moveCamera();

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.y += 0.02;

  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}

animate();
