import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './stylethree.css';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const torusRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.setZ(30);
    camera.position.setX(-3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#bg'),
      antialias: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Gradient shader material for the torus
    const gradientMaterial = new THREE.ShaderMaterial({
      uniforms: {
        opacity: { value: 1.0 } // Default opacity
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          vec3 color1 = vec3(82.0 / 255.0, 25.0 / 255.0, 108.0 / 255.0); // Start color (blue)
          vec3 color2 = vec3(32.0 / 255.0, 39.0 / 255.0, 103.0 / 255.0); // End color
          vec3 color = mix(color1, color2, vUv.y); // Interpolate colors based on vertical position
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    // Torus geometry with gradient material
    const geometry = new THREE.TorusGeometry(20, 9, 25, 150);
    const torus = new THREE.Mesh(geometry, gradientMaterial);
    torusRef.current = torus;
    scene.add(torus);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Background
    const spaceTexture = new THREE.TextureLoader().load('../assest/space.jpg');
    scene.background = spaceTexture;

    // Slower random movement values
    const torusRotationSpeed = {
      x: Math.random() * 0.004,
      y: Math.random() * 0.004,
      z: Math.random() * 0.004,
    };

    // Scroll Animation
    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;
      camera.position.z = t * -0.01;
      camera.position.x = t * -0.0002;
      camera.rotation.y = t * -0.0002;
    };

    document.body.onscroll = moveCamera;
    moveCamera();

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (torusRef.current) {
        torusRef.current.rotation.x += torusRotationSpeed.x;
        torusRef.current.rotation.y += torusRotationSpeed.y;
        torusRef.current.rotation.z += torusRotationSpeed.z;
      }
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      document.body.onscroll = null;
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      id="bg"
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: '#191E2E',
      }}
    />
  );
};

export default ThreeScene;
