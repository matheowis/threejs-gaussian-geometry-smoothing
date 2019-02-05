import * as THREE from 'three';
import { OrbitControls } from './controls/OrbitControls';
import { CreateProceduralMesh } from './ProceduralMesh';
import {gaussianGeometrySmooth} from './gaussianGeometrySmooth';
// import { CreateProceduralMeshBase } from './ProceduralMeshBase'
const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 16 / 9, 0.1, 2000);
renderer.setSize(1280, 720);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera);

// const box = new THREE.BoxGeometry(100, 100, 100);
// const boxMesh = new THREE.Mesh(box);
camera.position.set(0, 50, 200);
controls.update();

const procMesh = CreateProceduralMesh(10, 2);

scene.add(procMesh);
console.log('geo=', procMesh.geometry)

gaussianGeometrySmooth(procMesh.geometry);

procMesh.geometry.attributes.position.needsUpdate = true;

// procMesh.geometry.attributes.position.array

render();
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}