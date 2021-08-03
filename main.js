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

const fontLoader = new THREE.FontLoader()
var hello
fontLoader.load('/3D/font.json', function (font) {
  const geometrySetup = {
    font: font,
    size: 2,
    height: 0.5,
    curveSegments: 1,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelOffset: 0,
    bevelSegments: 5
  }
  const helloText = new THREE.TextGeometry('HALO', geometrySetup);
  const helloMat = new THREE.MeshLambertMaterial({ color: 0xce2121 })

  hello = new THREE.Mesh(helloText, helloMat)

  hello.position.set(-5, 0, -20)
  scene.add(hello)

  animate();

})

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

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.20;
  console.log(camera.position.z)
  if (camera.position.z >= 34) {
    hello.position.z = -1000
  } else if (camera.position.z <= 34) {
    hello.position.z = -15
  }
  camera.position.x = t * 0;
  camera.rotation.y = t * 0;
}

document.body.onscroll = moveCamera;
moveCamera();

function render() {
  var delta = clock.getDelta();

  if (mixer) mixer.update(delta);

  renderer.render(scene, camera);
}


function animate() {
  requestAnimationFrame(animate);
  hello.rotation.y += -0.00009
  hello.rotation.x += 0.00009
  render()
}
