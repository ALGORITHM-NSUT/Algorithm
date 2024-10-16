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

    // Warning !!
    //  This geometery  can be used  to   later in the  project so dont delete or  alter this

    // Torus geometry
    // const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    // const material = new THREE.MeshStandardMaterial({ color: 0x004680 });
    // const torus = new THREE.Mesh(geometry, material);
    // torusRef.current = torus;
    // scene.add(torus);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    // Adding star geometries to the background
    function addStar() {
      const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
      const starMaterial = new THREE.MeshStandardMaterial({ color: 0x191A30 });
      const star = new THREE.Mesh(starGeometry, starMaterial);
      const [x, y, z] = Array(20).fill().map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }

    Array(3800).fill().forEach(addStar);

    // Background
    const spaceTexture = new THREE.TextureLoader().load('./space.jpg');
    scene.background = spaceTexture;

    // Moon geometry without texture
    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xaaaaba }) // Simple material instead of textured
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
      }}
    />
  );
};

export default ThreeScene;
