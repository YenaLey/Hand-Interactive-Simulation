// https://www.tutorialspoint.com/jquery/jquery-syntax.htm
// handling document ready event

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

function main() {
  const canvas = document.querySelector("#threejs");
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  const near = 0.1;
  const far = 100;
  const size = 10;
  const camera = new THREE.OrthographicCamera(
    -size,
    size,
    size,
    -size,
    near,
    far
  );
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  const geom = new THREE.CylinderGeometry(1, 1, 2, 16);

  const base = new THREE.Object3D();
  scene.add(base);
  const grid_base = new THREE.GridHelper(30, 30);
  grid_base.renderOrder = 1;
  scene.add(grid_base);

  const mat_base = new THREE.MeshPhongMaterial({ color: "#888" });

  //wrist(base) mesh
  const mesh_base = new THREE.Mesh(geom, mat_base);
  mesh_base.scale.set(1, 0.5, 1);
  base.add(mesh_base);

  base.position.y = mesh_base.scale.y;

  //palm mesh
  const mesh_palm = new THREE.Mesh(geom, mat_base);
  mesh_palm.scale.set(3, 4.5, 1);
  mesh_base.add(mesh_palm);

  mesh_palm.position.y =
    mesh_base.position.y + mesh_base.scale.y + mesh_palm.scale.y;

  //thumb finger mesh
  const mesh_thumb = new THREE.Mesh(geom, mat_base);
  mesh_thumb.scale.set(0.55, 3.5, 0.55);
  mesh_base.add(mesh_thumb);

  mesh_thumb.position.x = -mesh_palm.scale.x - mesh_thumb.scale.x;
  mesh_thumb.position.y = mesh_palm.position.y + mesh_palm.scale.y / 6;

  mesh_thumb.rotation.z = THREE.MathUtils.degToRad(10);

  //index finger mesh
  const mesh_index = new THREE.Mesh(geom, mat_base);
  mesh_index.scale.set(0.5, 4.5, 0.5);
  mesh_base.add(mesh_index);

  mesh_index.position.x = -mesh_palm.scale.x + mesh_index.scale.x;
  mesh_index.position.y =
    mesh_palm.position.y + mesh_palm.scale.y + mesh_index.scale.y;

  //middle finger mesh
  const mesh_middle = new THREE.Mesh(geom, mat_base);
  mesh_middle.scale.set(0.5, 5.5, 0.5);
  mesh_base.add(mesh_middle);

  mesh_middle.position.x =
    mesh_index.position.x + ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_middle.position.y =
    mesh_palm.position.y + mesh_palm.scale.y + mesh_middle.scale.y;

  //ring finger mesh
  const mesh_ring = new THREE.Mesh(geom, mat_base);
  mesh_ring.scale.set(0.5, 4.5, 0.5);
  mesh_base.add(mesh_ring);

  mesh_ring.position.x =
    mesh_middle.position.x +
    ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_ring.position.y =
    mesh_palm.position.y + mesh_palm.scale.y + mesh_ring.scale.y;

  //small finger mesh
  const mesh_small = new THREE.Mesh(geom, mat_base);
  mesh_small.scale.set(0.5, 3.5, 0.5);
  mesh_base.add(mesh_small);

  mesh_small.position.x = mesh_palm.scale.x - mesh_small.scale.x;
  mesh_small.position.y =
    mesh_palm.position.y + mesh_palm.scale.y + mesh_small.scale.y;

  //control
  function onChange(event, ui) {
    let id = event.target.id;

    document.querySelector("#log").innerHTML =
      "" + id + ": " + $("#" + id).slider("value");

    if (id === "slider-wrist-twist") {
      const rotationValue = $("#" + id).slider("value");
      mesh_base.rotation.y = THREE.MathUtils.degToRad(rotationValue);
    }
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }
  {
    const color = 0xffffff;
    const intensity = 0.1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  let sliders = [
    {
      id: "slider-thumb-joint1",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-thumb-joint2",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-index-joint1",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-index-joint2",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-index-joint3",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-middle-joint1",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-middle-joint2",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-middle-joint3",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-ring-joint1",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-ring-joint2",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-ring-joint3",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-small-joint1",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-small-joint2",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-small-joint3",
      orientation: "vertical",
      min: 0,
      max: 45,
      value: 0,
    },
    {
      id: "slider-wrist-bend",
      orientation: "vertical",
      min: -45,
      max: 45,
      value: 0,
    },
    {
      id: "slider-fingers",
      orientation: "horizontal",
      min: 0,
      max: 10,
      value: 0,
    },
    {
      id: "slider-wrist-twist",
      orientation: "horizontal",
      min: 0,
      max: 360,
      value: 0,
    },
  ];

  for (let slider of sliders) {
    $("#" + slider.id).slider({
      orientation: slider.orientation,
      range: "min",
      min: slider.min,
      max: slider.max,
      value: slider.value,
      slide: onChange,
    });
  }
}

main();
