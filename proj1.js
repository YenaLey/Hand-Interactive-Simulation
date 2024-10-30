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
  const mat_base = new THREE.MeshPhongMaterial({ color: "#888" });

  const base = new THREE.Object3D();
  scene.add(base);

  const grid_base = new THREE.GridHelper(30, 30);
  grid_base.renderOrder = 1;
  scene.add(grid_base);

  const mesh_base = new THREE.Mesh(geom, mat_base);
  mesh_base.scale.set(1, 0.5, 1);
  base.add(mesh_base);

  base.position.y = mesh_base.scale.y;

  // palm
  const palmPivot = new THREE.Object3D();
  palmPivot.position.y = mesh_base.scale.y;
  base.add(palmPivot);

  const mesh_palm = new THREE.Mesh(geom, mat_base);
  mesh_palm.scale.set(3.8, 3, 1);
  mesh_palm.position.y = mesh_palm.scale.y;
  palmPivot.add(mesh_palm);

  // thumb finger
  const thumbPivot = new THREE.Object3D();
  thumbPivot.position.y = mesh_palm.scale.y / 1.5;
  thumbPivot.position.x = -mesh_palm.scale.x - 0.7;
  thumbPivot.rotation.z = THREE.MathUtils.degToRad(20);
  palmPivot.add(thumbPivot);

  const mesh_thumb = new THREE.Mesh(geom, mat_base);
  mesh_thumb.scale.set(0.7, 1.3, 0.7);
  mesh_thumb.position.y = mesh_thumb.scale.y;
  thumbPivot.add(mesh_thumb);

  // thumb finger(middle)
  const thumbMiddlePivot = new THREE.Object3D();
  thumbMiddlePivot.position.y = mesh_thumb.scale.y * 2;
  thumbPivot.add(thumbMiddlePivot);

  const mesh_thumb_middle = new THREE.Mesh(geom, mat_base);
  mesh_thumb_middle.scale.set(0.7, 1.3, 0.7);
  mesh_thumb_middle.position.y = mesh_thumb_middle.scale.y;
  thumbMiddlePivot.rotation.z = 0;
  thumbMiddlePivot.add(mesh_thumb_middle);

  // index finger
  const indexPivot = new THREE.Object3D();
  indexPivot.position.y = mesh_palm.scale.y * 2;
  palmPivot.add(indexPivot);

  const mesh_index = new THREE.Mesh(geom, mat_base);
  mesh_index.scale.set(0.6, 0.9, 0.6);
  mesh_index.position.x = -mesh_palm.scale.x + mesh_index.scale.x;
  mesh_index.position.y = mesh_index.scale.y;
  indexPivot.add(mesh_index);

  // index finger(middle)
  const indexMiddlePivot = new THREE.Object3D();
  indexMiddlePivot.position.y = mesh_index.scale.y * 2;
  indexPivot.add(indexMiddlePivot);

  const mesh_index_middle = new THREE.Mesh(geom, mat_base);
  mesh_index_middle.scale.set(0.6, 0.9, 0.6);
  mesh_index_middle.position.x = -mesh_palm.scale.x + mesh_index_middle.scale.x;
  mesh_index_middle.position.y = mesh_index_middle.scale.y;
  indexMiddlePivot.add(mesh_index_middle);

  // index finger(top)
  const indexTopPivot = new THREE.Object3D();
  indexTopPivot.position.y = mesh_index_middle.scale.y * 2;
  indexMiddlePivot.add(indexTopPivot);

  const mesh_index_top = new THREE.Mesh(geom, mat_base);
  mesh_index_top.scale.set(0.6, 0.9, 0.6);
  mesh_index_top.position.x = -mesh_palm.scale.x + mesh_index_top.scale.x;
  mesh_index_top.position.y = mesh_index_top.scale.y;
  indexTopPivot.add(mesh_index_top);

  // middle finger
  const middlePivot = new THREE.Object3D();
  middlePivot.position.y = mesh_palm.scale.y * 2;
  palmPivot.add(middlePivot);

  const mesh_middle = new THREE.Mesh(geom, mat_base);
  mesh_middle.scale.set(0.6, 1.1, 0.6);
  mesh_middle.position.x =
    mesh_index.position.x + ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_middle.position.y = mesh_middle.scale.y;
  middlePivot.add(mesh_middle);

  // middle finger(middle)
  const middleMiddlePivot = new THREE.Object3D();
  middleMiddlePivot.position.y = mesh_middle.scale.y * 2;
  middlePivot.add(middleMiddlePivot);

  const mesh_middle_middle = new THREE.Mesh(geom, mat_base);
  mesh_middle_middle.scale.set(0.6, 1.1, 0.6);
  mesh_middle_middle.position.x =
    mesh_index.position.x + ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_middle_middle.position.y = mesh_middle_middle.scale.y;
  middleMiddlePivot.add(mesh_middle_middle);

  // middle finger(top)
  const middleTopPivot = new THREE.Object3D();
  middleTopPivot.position.y = mesh_middle_middle.scale.y * 2;
  middleMiddlePivot.add(middleTopPivot);

  const mesh_middle_top = new THREE.Mesh(geom, mat_base);
  mesh_middle_top.scale.set(0.6, 1.1, 0.6);
  mesh_middle_top.position.x =
    mesh_index.position.x + ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_middle_top.position.y = mesh_middle_top.scale.y;
  middleTopPivot.add(mesh_middle_top);

  // ring finger
  const ringPivot = new THREE.Object3D();
  ringPivot.position.y = mesh_palm.scale.y * 2;
  palmPivot.add(ringPivot);

  const mesh_ring = new THREE.Mesh(geom, mat_base);
  mesh_ring.scale.set(0.6, 0.9, 0.6);
  mesh_ring.position.x =
    mesh_middle.position.x + ((mesh_palm.scale.x - mesh_ring.scale.x) * 2) / 3;
  mesh_ring.position.y = mesh_ring.scale.y;
  ringPivot.add(mesh_ring);

  // ring finger(middle)
  const ringMiddlePivot = new THREE.Object3D();
  ringMiddlePivot.position.y = mesh_ring.scale.y * 2;
  ringPivot.add(ringMiddlePivot);

  const mesh_ring_middle = new THREE.Mesh(geom, mat_base);
  mesh_ring_middle.scale.set(0.6, 0.9, 0.6);
  mesh_ring_middle.position.x =
    mesh_middle.position.x +
    ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_ring_middle.position.y = mesh_ring_middle.scale.y;
  ringMiddlePivot.add(mesh_ring_middle);

  // ring finger(top)
  const ringTopPivot = new THREE.Object3D();
  ringTopPivot.position.y = mesh_ring_middle.scale.y * 2;
  ringMiddlePivot.add(ringTopPivot);

  const mesh_ring_top = new THREE.Mesh(geom, mat_base);
  mesh_ring_top.scale.set(0.6, 0.9, 0.6);
  mesh_ring_top.position.x =
    mesh_middle.position.x +
    ((mesh_palm.scale.x - mesh_middle.scale.x) * 2) / 3;
  mesh_ring_top.position.y = mesh_ring_top.scale.y;
  ringTopPivot.add(mesh_ring_top);

  // small finger
  const smallPivot = new THREE.Object3D();
  smallPivot.position.y = mesh_palm.scale.y * 2;
  palmPivot.add(smallPivot);

  const mesh_small = new THREE.Mesh(geom, mat_base);
  mesh_small.scale.set(0.6, 0.7, 0.6);
  mesh_small.position.x = mesh_palm.scale.x - mesh_index_top.scale.x;
  mesh_small.position.y = mesh_small.scale.y;
  smallPivot.add(mesh_small);

  // small finger(middle)
  const smallMiddlePivot = new THREE.Object3D();
  smallMiddlePivot.position.y = mesh_small.scale.y * 2;
  smallPivot.add(smallMiddlePivot);

  const mesh_small_middle = new THREE.Mesh(geom, mat_base);
  mesh_small_middle.scale.set(0.6, 0.7, 0.6);
  mesh_small_middle.position.x = mesh_palm.scale.x - mesh_index_top.scale.x;
  mesh_small_middle.position.y = mesh_small_middle.scale.y;
  smallMiddlePivot.add(mesh_small_middle);

  // small finger(top)
  const smallTopPivot = new THREE.Object3D();
  smallTopPivot.position.y = mesh_small_middle.scale.y * 2;
  smallMiddlePivot.add(smallTopPivot);

  const mesh_small_top = new THREE.Mesh(geom, mat_base);
  mesh_small_top.scale.set(0.6, 0.7, 0.6);
  mesh_small_top.position.x = mesh_palm.scale.x - mesh_index_top.scale.x;
  mesh_small_top.position.y = mesh_small_top.scale.y;
  smallTopPivot.add(mesh_small_top);

  // Logging Slider Values
  function onChange(event, ui) {
    let id = event.target.id;
    const value = $("#" + id).slider("value");
    const radians = THREE.MathUtils.degToRad(value);

    document.querySelector("#log").innerHTML =
      "" + id + ": " + $("#" + id).slider("value");

    if (id === "slider-wrist-twist") {
      palmPivot.rotation.y = radians;
    } else if (id === "slider-wrist-bend") {
      palmPivot.rotation.x = -radians;
    } else if (id === "slider-thumb-joint2") {
      thumbPivot.rotation.x = -radians;
      thumbPivot.rotation.z = THREE.MathUtils.degToRad(20) - radians;
    } else if (id === "slider-thumb-joint1") {
      thumbMiddlePivot.rotation.x = -radians;
      thumbMiddlePivot.rotation.z = -radians;
    } else if (id === "slider-index-joint3") {
      indexPivot.rotation.x = -radians;
    } else if (id === "slider-index-joint2") {
      indexMiddlePivot.rotation.x = -radians;
    } else if (id === "slider-index-joint1") {
      indexTopPivot.rotation.x = -radians;
    } else if (id === "slider-middle-joint3") {
      middlePivot.rotation.x = -radians;
    } else if (id === "slider-middle-joint2") {
      middleMiddlePivot.rotation.x = -radians;
    } else if (id === "slider-middle-joint1") {
      middleTopPivot.rotation.x = -radians;
    } else if (id === "slider-ring-joint3") {
      ringPivot.rotation.x = -radians;
    } else if (id === "slider-ring-joint2") {
      ringMiddlePivot.rotation.x = -radians;
    } else if (id === "slider-ring-joint1") {
      ringTopPivot.rotation.x = -radians;
    } else if (id === "slider-small-joint3") {
      smallPivot.rotation.x = -radians;
    } else if (id === "slider-small-joint2") {
      smallMiddlePivot.rotation.x = -radians;
    } else if (id === "slider-small-joint1") {
      smallTopPivot.rotation.x = -radians;
    } else if (id === "slider-fingers") {
      thumbPivot.rotation.z = THREE.MathUtils.degToRad(20) + radians;
      indexPivot.rotation.z = radians;
      middlePivot.rotation.z = radians / 2;
      ringPivot.rotation.z = -radians / 2;
      smallPivot.rotation.z = -radians;
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
      camera.left = -size;
      camera.right = size;
      camera.top = size;
      camera.bottom = -size;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Define Sliders
  let sliders = [
    // Thumb Sliders
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
    // Index Finger Sliders
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
    // Middle Finger Sliders
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
    // Ring Finger Sliders
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
    // Small Finger Sliders
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
    // Wrist Bend Slider
    {
      id: "slider-wrist-bend",
      orientation: "vertical",
      min: -45,
      max: 45,
      value: 0,
    },
    // Fingers Slider
    {
      id: "slider-fingers",
      orientation: "horizontal",
      min: 0,
      max: 10,
      value: 0,
    },
    // Wrist Twist Slider
    {
      id: "slider-wrist-twist",
      orientation: "horizontal",
      min: 0,
      max: 360,
      value: 0,
    },
  ];

  // Initialize Sliders
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
