import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Group } from 'three';


//Einstellungen
var width, height;
var scale = 8;
var zeitraffer = 1;
var stars = [];
// einmal Erde um die Sonne = 6283185301 t
var time = zeitraffer * 0.000000001;

// Setup
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 15000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.set(680, 80, 750);

camera.lookAt(new THREE.Vector3(1427 *4/20, 10, 0), 1427 *4/20, 10);

renderer.render(scene, camera);

//----------------------------------------------------------------------------

function addStar() {
  const geometry = new THREE.SphereGeometry(0.2, 0.1, 0.1);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  stars.push(star);
  scene.add(star);
}

//----------------------------------------------------------------------------
// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');

//----------------------------------------------------------------------------
// Lights
const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(0, 10, 0);
scene.add(pointLight);

const light2 = new THREE.SpotLight()
light2.position.set(20, 50, 0)
light2.angle = Math.PI / 10
light2.penumbra = 0.5
light2.castShadow = true
light2.shadow.mapSize.width = 139
light2.shadow.mapSize.height = 139
light2.shadow.camera.near = 0.5
light2.shadow.camera.far = 20
scene.add(light2)

const light3 = new THREE.SpotLight()
light3.position.set(-20, -50, 0)
light3.angle = Math.PI / 10
light3.penumbra = 0.5
light3.castShadow = true
light3.shadow.mapSize.width = 139
light3.shadow.mapSize.height = 139
light3.shadow.camera.near = 0.5
light3.shadow.camera.far = 20
scene.add(light3)


const ambientLight = new THREE.AmbientLight(0xffffff);

//----------------------------------------------------------------------------
// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const light2Helper = new THREE.PointLightHelper(light2);
const light3Helper = new THREE.PointLightHelper(light3);
const gridHelper = new THREE.GridHelper(3000, 200);

//----------------------------------------------------------------------------
// Sun

const geometry = new THREE.SphereGeometry(139 /20, 100, 100);
const material = new THREE.MeshPhysicalMaterial({ color: 0xe49814, wireframe: true , });
const sun = new THREE.Mesh(geometry, material);

scene.add(sun);

sun.position.setX(0);
sun.position.setY(10);
sun.position.setZ(0);

//----------------------------------------------------------------------------
// Merkur
const merkurX = 58 *4/20;
const merkurY = 10;
const Z = 0;

// Venus
const venusX = 108 *4/20;
const venusY = 10;

// Earth
const earthX = 150 *4/20;
const earthY = 10;

// Mars
const marsX = 228 *4/20;
const marsY = 10;

// Jupiter
const jupiterX = 778 *4/20;
const jupiterY = 10;


// Saturn
const saturnX = 1427 *4/20;
const saturnY = 10;

// Uranus
const uranusX = 2884 *4/20;
const uranusY = 10;

// Neptun
const neptunX = 4509 *4/20;
const neptunY = 10;

//----------------------------------------------------------------------------

const planets = [
                  ["merkur", "mercury.jpg", 0.4 /20, [merkurX, merkurY, Z]],
                  ["venus", "venus.jpg", 0.9 /20, [venusX, venusY, Z]],
                  ["erde", "earth.jpg", 1/20, [earthX, earthY, Z]],
                  ["mars", "mars.jpg", 0.5 /20, [marsX, marsY, Z]],
                  ["jupiter", "jupiter.jpg", 11.2 /20, [jupiterX, jupiterY, Z]],
                  ["saturn", "saturn.jpg", 9.4 /20, [saturnX, saturnY, Z]],
                  ["uranus", "uranus.jpg", 4/20, [uranusX, uranusY, Z]],
                  ["neptun", "neptune.jpg", 4/20, [neptunX, neptunY, Z]]
                ];

//----------------------------------------------------------------------------

function addPlanet(planets) {
  var texture, group, planet;

  for (var i=0; i<8; i++){
    group = new Group();
    texture = new THREE.TextureLoader().load(planets[i][1]);
    planet = new THREE.Mesh(
      new THREE.SphereGeometry(planets[i][2] *scale, 40, 40),
      new THREE.MeshStandardMaterial({
        map: texture
      })
    );
    group.add(planet);
    planets[i][0] = group;
    
    scene.add(planets[i][0]);

    planets[i][0].position.setX(planets[i][3][0]);
    planets[i][0].position.setY(planets[i][3][1]);
    planets[i][0].position.setZ(planets[i][3][2]);    
  }
}
addPlanet(planets);

//----------------------------------------------------------------------------

function addPlanetWithSphere(planets) {
  var geo, sphere;

  for (var i=0; i<8; i++){
    geo = new THREE.SphereGeometry(planets[i][2] *scale*8, 40, 40);
    sphere = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
      color: "red",
      transparent: true,
      opacity: 0.2,
      wireframe: true
    }));
    planets[i][0].add(sphere)

    scene.add(planets[i][0]);

    planets[i][0].position.setX(planets[i][3][0]);
    planets[i][0].position.setY(planets[i][3][1]);
    planets[i][0].position.setZ(planets[i][3][2]);    
  }
}

//----------------------------------------------------------------------------

function addPlanetWithStick(planets) {
  var line, cylinder;

  for (var i=0; i<8; i++){
    line = new THREE.CylinderGeometry(1/8/200*scale, 1/8/200*scale, 4*planets[i][2]*scale, 6, 1);
    cylinder = new THREE.Mesh(line, new THREE.MeshBasicMaterial({
      color: "white",
      transparent: true,
      opacity: 0.2,
      wireframe: true
    }));
    planets[i][0].add(cylinder);
    scene.add(planets[i][0]);
  }
}

var moon, ring, ringgeometry;
const moonX = earthX + 0.38*scale;
const moonY = earthY + 0.38*scale;

function addRest() {
  // Moon

  const moonTexture = new THREE.TextureLoader().load('moon.jpg');
  const normalTexture = new THREE.TextureLoader().load('normal.jpg');

  moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.34/20 *scale, 40, 40),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  );

  scene.add(moon);

  moon.position.setX(moonX);
  moon.position.setY(earthY);
  moon.position.setZ(Z);


  // Saturn Ring
  const thetaSegments = 2048;
  const phiSegments = 1;
  var saturnRingTexture = new THREE.TextureLoader().load('saturn_ring.png');
  //-------------------------------------------------------------------------------------------------------------------------------------
  ringgeometry = new THREE.RingBufferGeometry(20/20*scale, 60/20 *scale, thetaSegments, phiSegments);
    var pos = ringgeometry.attributes.position; var v3 = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++){ v3.fromBufferAttribute(pos, i);
      ringgeometry.attributes.uv.setXY(i, v3.length()<scale+1 ? 0:1, 1);
    }
  ring = new THREE.Mesh(ringgeometry, new THREE.MeshBasicMaterial({map: saturnRingTexture, color: 0xffffff, wireframe: false,
      side: THREE.DoubleSide, transparent: true }));

  scene.add(ring);

  ring.rotateX(1.5);
  ring.rotateZ(0.4);

  ring.position.setX(saturnX);
  ring.position.setY(saturnY);
  ring.position.setZ(Z);
}
addRest();

//----------------------------------------------------------------------------

// Animation Loop
var t = 0;
const w = 107000; //29.78 km/s
var coordinates = [];

//----------------------------------------------------------------------------

function orbit(pointX, centerX, centerZ, w, t) {
  var x = Math.cos(w*t)*pointX - Math.sin(w*t)*pointX + centerX;
  var y = Math.cos(w*t)*pointX + Math.sin(w*t)*pointX + centerZ;
  return [x, y];
}

//----------------------------------------------------------------------------

function animate() {
  requestAnimationFrame(animate);
  //------------------------------------
  const earthDay = 1/24;
  planets[0][0].rotation.y +=  zeitraffer*   earthDay/58.646;
  planets[1][0].rotation.y +=  zeitraffer*   earthDay/243.6;
  //planets[2][0].rotation.z +=  6/180*Math.PI;
  //planets[2][0].rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), 20);
  moon.rotation.y          += -zeitraffer*   earthDay/15;
  planets[3][0].rotation.y +=  zeitraffer*   earthDay/24.6228;
  planets[4][0].rotation.y +=  zeitraffer*   earthDay/9.9258;
  planets[5][0].rotation.y +=  zeitraffer*   earthDay/10.6564;
  planets[6][0].rotation.y +=  zeitraffer*   earthDay/17.24;
  planets[7][0].rotation.y +=  zeitraffer*   earthDay/15.9664;

  //------------------------------------
  coordinates = orbit(merkurX, 0, 0, w*1.59, t);
  planets[0][0].position.setX(coordinates[0]);
  planets[0][0].position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(venusX, 0, 0, w*1.175, t);
  planets[1][0].position.setX(coordinates[0]);
  planets[1][0].position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(earthX, 0, 0, w, t);
  planets[2][0].position.setX(coordinates[0]);
  planets[2][0].position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(moonX-earthX, coordinates[0], coordinates[1], w*30, t);
  moon.position.setX(coordinates[0]);
  moon.position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(marsX, 0, 0, w*0.81, t);
  planets[3][0].position.setX(coordinates[0]);
  planets[3][0].position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(jupiterX, 0, 0, w*0.44, t);
  planets[4][0].position.setX(coordinates[0]);
  planets[4][0].position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(saturnX, 0, 0, w*0.325, t);
  planets[5][0].position.setX(coordinates[0]);
  planets[5][0].position.setZ(coordinates[1]);
  ring.position.setX(coordinates[0]);
  ring.position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(uranusX, 0, 0, w*0.23, t);
  planets[6][0].position.setX(coordinates[0]);
  planets[6][0].position.setZ(coordinates[1]);
  //------------------------------------
  coordinates = orbit(neptunX, 0, 0, w*0.18, t);
  planets[7][0].position.setX(coordinates[0]);
  planets[7][0].position.setZ(coordinates[1]);

  //------------------------------------
  t += time*1;
  controls.update();
  renderer.render(scene, camera);
}

animate();

//----------------------------------------------------------------------------

let button = document.getElementById("gooey-button");
let inputLight = document.querySelector('input[name="light"]');
let inputStars = document.querySelector('input[name="stars"]');
let inputBackground = document.querySelector('input[name="background"]');
let inputHelper = document.querySelector('input[name="helper"]');
let inputGrid = document.querySelector('input[name="grid"]');
let inputFinder = document.querySelector('input[name="finder"]');
let inputAxis = document.querySelector('input[name="axis"]');
let inputScale = document.querySelector('input[name="scale"]');
let inputTime = document.querySelector('input[name="time"]');

inputLight.addEventListener("change", il);
button.addEventListener("click", btn);
inputStars.addEventListener("change", is);
inputBackground.addEventListener("change", ib);
inputHelper.addEventListener("change", ih);
inputGrid.addEventListener("change", ig);
inputFinder.addEventListener("change", iF);
inputAxis.addEventListener("change", ia);

function il(){
  if (inputLight.checked === true) {
    scene.add(ambientLight);
  }
  else {
    scene.remove(ambientLight);
  }
}
il();
function is(){
  if (inputStars.checked === true) {
    Array(2000).fill().forEach(addStar);
  } else {
    for (var i=0; i<2000; i++) {
      stars.forEach(myFunction);
    }
  }
  function myFunction(item, index) {
    scene.remove(item); 
  }
}
function ib(){
  if (inputBackground.checked === true) {
    scene.background = spaceTexture;
  } else {
    scene.background = "black.jpg";
  }
}
function ih(){
  if (inputHelper.checked === true) {
    scene.add(lightHelper, light2Helper, light3Helper);
  } else {
    scene.remove(lightHelper, light2Helper, light3Helper);
  }
}
function ig(){
  if (inputGrid.checked === true) {
    scene.add(gridHelper);
  } else {
    scene.remove(gridHelper);
  }
}
function iF(){
  if (inputFinder.checked === true) {
    addPlanetWithSphere(planets);
  } else {
    scene.remove(moon);
    scene.remove(ring);
    planets.forEach(removePlanets);
    addPlanet(planets);
    addRest();
  }
  if (inputAxis.checked === true) {
    addPlanetWithStick(planets);
  }
}
function ia(){
  if (inputAxis.checked === true) {
    addPlanetWithStick(planets);
  } else {
    scene.remove(moon);
    scene.remove(ring);
    planets.forEach(removePlanets);
    addPlanet(planets);
    addRest();
  }
  if (inputFinder.checked === true) {
    addPlanetWithSphere(planets);
  }
}
function btn() {
  if (inputTime.value != "") {
    zeitraffer = inputTime.value;
    time = zeitraffer * 0.000000001;
  }

  if (inputScale.value != "") {
    scale = inputScale.value;
    scene.remove(moon);
    scene.remove(ring);
    planets.forEach(removePlanets);
    addPlanet(planets);
    addRest();
  }
  iF(); il(); ib(); ia(); ih(); ig(); is();
}

function removePlanets(item, index) {
  scene.remove(item[0]);
}
