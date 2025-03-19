
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  interactive?: boolean;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    if (interactive) {
      renderer.domElement.classList.add('canvas-interactive');
    }

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // Set positions and colors
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 100;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
      
      // Colors - purple to blue gradient
      const colorChoice = Math.random();
      
      if (colorChoice < 0.33) {
        // Blue
        colorArray[i] = 0.4;
        colorArray[i + 1] = 0.7;
        colorArray[i + 2] = 0.95;
      } else if (colorChoice < 0.66) {
        // Purple
        colorArray[i] = 0.55;
        colorArray[i + 1] = 0.36;
        colorArray[i + 2] = 0.95;
      } else {
        // Pink/Purple
        colorArray[i] = 0.9;
        colorArray[i + 1] = 0.2;
        colorArray[i + 2] = 0.6;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      sizeAttenuation: true
    });
    
    // Mesh
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Add a sphere in the center
    const sphereGeometry = new THREE.SphereGeometry(8, 64, 64);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: 0x270f4c,
      transparent: true,
      opacity: 0.9,
      wireframe: false
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Add an ambient light
    const ambientLight = new THREE.AmbientLight(0x3c096c, 0.5);
    scene.add(ambientLight);

    // Add a point light
    const pointLight = new THREE.PointLight(0x7209b7, 1);
    pointLight.position.set(0, 0, 30);
    scene.add(pointLight);

    // Add another point light
    const pointLight2 = new THREE.PointLight(0x4cc9f0, 1);
    pointLight2.position.set(0, 0, -30);
    scene.add(pointLight2);

    // Mouse move event
    const onMouseMove = (event: MouseEvent) => {
      if (!interactive) return;
      
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!interactive || !event.touches[0]) return;
      
      mousePosition.current.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    };

    // Animation
    let req: number | null = null;

    const animate = () => {
      req = requestAnimationFrame(animate);
      
      // Rotate the sphere
      sphere.rotation.y += 0.001;
      sphere.rotation.x += 0.0005;
      
      // Move particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        
        if (interactive) {
          // Particles follow mouse
          particlesRef.current.rotation.x += mousePosition.current.y * 0.0003;
          particlesRef.current.rotation.y += mousePosition.current.x * 0.0003;
        }
      }
      
      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);

    // Resize event
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (req) cancelAnimationFrame(req);
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
      renderer.dispose();
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [interactive]);

  return <div ref={containerRef} className="three-container" />;
};

export default ThreeScene;
