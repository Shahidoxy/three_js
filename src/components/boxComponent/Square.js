import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Square = () => {
    let ref = useRef(null)
    useEffect(() => {
        if (ref.current == null) {
            // Scene
            const scene = new THREE.Scene();

            // Add a cube to the scene
            const geometry = new THREE.BoxGeometry(3, 1, 3); // width, height, depth
            const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0);
            mesh.castShadow = true;
            mesh.receiveShadow = false;
            scene.add(mesh);

            // Set up lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
            directionalLight.position.set(10, 20, 0); // x, y, z
            scene.add(directionalLight);




            //Create a SpotLight and turn on shadows for the light
            const light = new THREE.SpotLight( 0xffffff, 1, 100 );

            light.castShadow = true; // default false
            scene.add(light);

            //Set up shadow properties for the light
            light.shadow.mapSize.width = 512; // default
            light.shadow.mapSize.height = 512; // default
            light.shadow.camera.near = 0.5; // default
            light.shadow.camera.far = 500; // default
            light.shadow.focus = 1; // default

            //Create a helper for the shadow camera (optional)
            const helper = new THREE.CameraHelper(light.shadow.camera);
            scene.add(helper);

            // Camera
            const width = 10;
            const height = width * (window.innerHeight / window.innerWidth);
            const camera = new THREE.OrthographicCamera(
                width / -2, // left
                width / 2, // right
                height / 2, // top
                height / -2, // bottom
                1, // near
                100 // far
            );

            camera.position.set(4, 4, 4);
            camera.lookAt(0, 0, 0);

            // Renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);

            // renderer.render(scene, camera);



            function animate() {

                requestAnimationFrame(animate);

                // mesh.rotation.x += 0.01;
                mesh.rotation.y += 0.01;

                renderer.render(scene, camera);

            }

            animate()
            // Add it to HTML
            document.body.appendChild(renderer.domElement);
            ref.current = 10;
        }
    }, [ref])

    return (
        <div>
        </div>
    )
}

export default Square;