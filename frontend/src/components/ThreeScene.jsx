import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './stylethree.css';

const ThreeScene = () => {
  const mountRef = useRef(null);
  const torusRef = useRef(null);
  const moonRef = useRef(null);
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
        opacity: { value: 0.4 } // Default opacity
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
          vec3 color1 = vec3(102.0 / 255.0, 11.0 / 255.0, 189.0 / 255.0); // Start color (blue)
          vec3 color2 = vec3(54.0 / 255.0, 64.0 / 255.0, 114.0 / 255.0); // End color
          vec3 color = mix(color1, color2, vUv.y); // Interpolate colors based on vertical position
          gl_FragColor = vec4(color, 1.0);
        }
      `
    });

    // Torus geometry with gradient material
    const geometry = new THREE.TorusGeometry(20, 9, 20, 100);
    const torus = new THREE.Mesh(geometry, gradientMaterial);
    torusRef.current = torus;
    scene.add(torus);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Background
    const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
    scene.background = spaceTexture;

    // Moon geometry without texture
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xa56aba }) // Simple material instead of textured
    );
    moonRef.current = moon;
    scene.add(moon);
    moon.position.z = 30;
    moon.position.setX(-10);

    // Slower random movement values
    const torusRotationSpeed = {
      x: Math.random() * 0.01,
      y: Math.random() * 0.01,
      z: Math.random() * 0.01,
    };

    const moonRotationSpeed = {
      x: Math.random() * 0.001,
      y: Math.random() * 0.001,
      z: Math.random() * 0.001,
    };

    // Scroll Animation
    const moveCamera = () => {
      const t = document.body.getBoundingClientRect().top;
      moon.rotation.x += moonRotationSpeed.x;
      moon.rotation.y += moonRotationSpeed.y;
      moon.rotation.z += moonRotationSpeed.z;

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
      moon.rotation.x += moonRotationSpeed.x;
      moon.rotation.y += moonRotationSpeed.y;
      moon.rotation.z += moonRotationSpeed.z;
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
