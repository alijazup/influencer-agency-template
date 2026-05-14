import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, stars: THREE.Points, starGeo: THREE.BufferGeometry;
    const starCount = 900;
    const speed = 1.5;
    const depth = 1500;
    const fov = 75;
    const repulsionRadius = 450;
    const repulsionStrength = 4.0;

    let mouseX = 0, mouseY = 0, camX = 0, camY = 0;
    let initialX = new Float32Array(starCount);
    let initialY = new Float32Array(starCount);
    let offsetX = new Float32Array(starCount);
    let offsetY = new Float32Array(starCount);

    let animationFrameId: number;

    function initThree() {
        if (!canvasContainerRef.current) return;
        
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020202, 0.001);
        scene.background = new THREE.Color(0x020202);

        camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 1;

        try {
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            while (canvasContainerRef.current.firstChild) {
                canvasContainerRef.current.removeChild(canvasContainerRef.current.firstChild);
            }
            canvasContainerRef.current.appendChild(renderer.domElement);
        } catch (error) {
            console.error("WebGL context could not be created. Falling back to CSS background.", error);
            if (canvasContainerRef.current) canvasContainerRef.current.classList.add('loaded');
            return; // Skip the rest of Three.js setup
        }

        setTimeout(() => { 
            if (canvasContainerRef.current) canvasContainerRef.current.classList.add('loaded'); 
        }, 500);

        starGeo = new THREE.BufferGeometry();
        const positions = [];
        
        for (let i = 0; i < starCount; i++) {
            let x = (Math.random() - 0.5) * 2200;
            let y = (Math.random() - 0.5) * 2200;
            let z = (Math.random() - 0.5) * depth * 2;
            positions.push(x, y, z);
            initialX[i] = x; initialY[i] = y; offsetX[i] = 0; offsetY[i] = 0;
        }

        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

        const sprite = createStarTexture();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xaaaaaa,
            size: 12.0,
            map: sprite,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        stars = new THREE.Points(starGeo, starMaterial);
        scene.add(stars);

        window.addEventListener('resize', onWindowResize, false);
        animate();
    }

    function createStarTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return new THREE.Texture();
        
        // Fill base with solid black. Additive blending treats black as transparent.
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 64, 64);
        
        // Inner core glow
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
        grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);

        // Horizontal flare
        const hGrad = ctx.createLinearGradient(0, 32, 64, 32);
        hGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        hGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.6)');
        hGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        hGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.6)');
        hGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = hGrad;
        ctx.fillRect(0, 31, 64, 2);

        // Vertical flare
        const vGrad = ctx.createLinearGradient(32, 0, 32, 64);
        vGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        vGrad.addColorStop(0.45, 'rgba(255, 255, 255, 0.6)');
        vGrad.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
        vGrad.addColorStop(0.55, 'rgba(255, 255, 255, 0.6)');
        vGrad.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = vGrad;
        ctx.fillRect(31, 0, 2, 64);

        return new THREE.CanvasTexture(canvas);
    }
  
    function animate() {
        if (!starGeo) return;
        const positions = starGeo.attributes.position.array as Float32Array;
        const aspect = window.innerWidth / window.innerHeight;
        const tanFov = Math.tan((fov * Math.PI / 180) / 2);

        // Fetch black hole positions
        const blackHoles = document.querySelectorAll('.black-hole-target');
        const bhForces: {x: number, y: number}[] = [];
        blackHoles.forEach((bh) => {
            const rect = bh.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const ndcX = (centerX / window.innerWidth) * 2 - 1;
                const ndcY = -(centerY / window.innerHeight) * 2 + 1;
                bhForces.push({ x: ndcX, y: ndcY });
            }
        });

        for (let i = 0; i < starCount; i++) {
            let z = positions[i * 3 + 2];
            z += speed;
            if (z > 200) { z = -depth; offsetX[i] = 0; offsetY[i] = 0; }
            positions[i * 3 + 2] = z;

            const distZ = Math.abs(1 - z);
            const visibleHeight = 2 * tanFov * distZ;
            const visibleWidth = visibleHeight * aspect;

            const mouseWorldX = camera.position.x + (mouseX * visibleWidth / 2);
            const mouseWorldY = camera.position.y + (mouseY * visibleHeight / 2);

            const baseX = initialX[i];
            const baseY = initialY[i];

            const dx = mouseWorldX - (baseX + offsetX[i]);
            const dy = mouseWorldY - (baseY + offsetY[i]);
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) / repulsionRadius;
                const angle = Math.atan2(dy, dx);
                offsetX[i] -= Math.cos(angle) * force * repulsionStrength;
                offsetY[i] -= Math.sin(angle) * force * repulsionStrength;
            }

            // Black Hole Attraction
            for (const bh of bhForces) {
                const bhWorldX = camera.position.x + (bh.x * visibleWidth / 2);
                const bhWorldY = camera.position.y + (bh.y * visibleHeight / 2);

                const bdx = bhWorldX - (baseX + offsetX[i]);
                const bdy = bhWorldY - (baseY + offsetY[i]);
                const bdist = Math.sqrt(bdx * bdx + bdy * bdy);

                const pullRadius = 350; 
                const suckRadius = 80; 

                if (bdist < pullRadius) {
                    const force = Math.pow((pullRadius - bdist) / pullRadius, 2); 
                    const angle = Math.atan2(bdy, bdx);
                    
                    offsetX[i] += Math.cos(angle) * force * 15.0; 
                    offsetY[i] += Math.sin(angle) * force * 15.0;

                    // Spiraling effect
                    offsetX[i] += Math.cos(angle + Math.PI/2) * force * 8.0;
                    offsetY[i] += Math.sin(angle + Math.PI/2) * force * 8.0;

                    if (bdist < suckRadius || z > 200) {
                        z = -depth;
                        positions[i * 3 + 2] = z;
                        initialX[i] = (Math.random() - 0.5) * 2200;
                        initialY[i] = (Math.random() - 0.5) * 2200;
                        offsetX[i] = 0;
                        offsetY[i] = 0;
                    }
                }
            }

            offsetX[i] *= 0.94; offsetY[i] *= 0.94;
            positions[i * 3] = initialX[i] + offsetX[i];
            positions[i * 3 + 1] = initialY[i] + offsetY[i];
        }
        starGeo.attributes.position.needsUpdate = true;

        let targetX = -mouseX * 50;
        let targetY = -mouseY * 50;
        camX += (targetX - camX) * 0.03;
        camY += (targetY - camY) * 0.03;
        camera.position.x = camX;
        camera.position.y = camY;
        camera.lookAt(0, 0, -500);

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
    }

    function onWindowResize() {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    initThree();

    return () => {
        window.removeEventListener('resize', onWindowResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
        renderer?.dispose();
    };
  }, []);

  return <div id="canvas-container" ref={canvasContainerRef}></div>;
}
