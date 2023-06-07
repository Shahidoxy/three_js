import React from 'react';
import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const Cube = () => {
  function setup(container) {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true

    const controls = new OrbitControls(camera, renderer.domElement);

    // RESIZE HAMDLER
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // INIT CAMERA
    camera.position.z = 25;
    camera.position.x = 3;
    camera.position.y = 6;
    camera.lookAt(0, 0, -10)
    // controls.update();

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    scene.background = new THREE.Color(0xffffff);

    // FLOOR
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 32), new THREE.MeshPhongMaterial({ color: '#cccccc' }));
    // plane.rotation.x = - Math.PI / 2
    plane.rotation.set(-Math.PI / 2, 0, 0);
    plane.position.set(0, -2, 0);
    plane.receiveShadow = true
    scene.add(plane);

    // BOX
    const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xfab74b });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    scene.add(box);

    // DIRECTIONAL LIGHT
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10)
    
    directionalLight.target.position.set(100, 100, 100);
    directionalLight.intensity = 0.5;
    directionalLight.castShadow = true;
    directionalLight.shadowCameraNear = 100;
    directionalLight.shadowCameraFar = 0;

    scene.add(directionalLight);

    // scene.add(new THREE.CameraHelper(directionalLight.shadow.camera));

    // ANIMATE
    function animate() {
      directionalLight.position.x = camera.position.x * 5;
      directionalLight.position.y = camera.position.y * 5;

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate()
    document.body.appendChild(renderer.domElement);
  }

  return (
    <div ref={setup} />
  )
}

export default Cube;