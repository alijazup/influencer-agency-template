import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let mesh: THREE.Mesh;
    let material: THREE.ShaderMaterial;
    let animationFrameId: number;

    let targetMouse = { x: 0, y: 0 };
    let currentMouse = { x: 0, y: 0 };

    const vertexShader = `
      uniform float uTime;
      uniform vec2 uMouse;
      varying vec2 vUv;
      varying float vElevation;

      // Mathematical wave displacement
      float calculateWave(vec2 p, float time) {
        float d = sin(p.x * 2.2 + time * 0.7) * cos(p.y * 1.8 + time * 0.5) * 0.45;
        d += sin(p.x * 4.5 - time * 1.1 + p.y * 2.5) * 0.22;
        
        // Mouse influence distortion wave
        float distToMouse = length(p - uMouse * 2.5);
        d += cos(distToMouse * 3.5 - time * 1.8) * 0.25 * exp(-distToMouse * 0.8);
        
        return d;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        
        float elevation = calculateWave(pos.xy, uTime);
        pos.z += elevation * 0.7;
        vElevation = elevation;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      varying vec2 vUv;
      varying float vElevation;

      void main() {
        // Deep Oceanic Electric Blue / Azure / Cyan Shader Palette
        vec3 baseBg      = vec3(0.010, 0.015, 0.030); // Deep oceanic dark
        vec3 blueColor   = vec3(0.120, 0.420, 0.950); // Deep Cobalt / Electric Blue
        vec3 azureColor  = vec3(0.150, 0.720, 0.980); // Bright Azure / Cyan Wave
        vec3 indigoColor = vec3(0.250, 0.150, 0.650); // Deep Indigo Shadow

        float normalizedElevation = vElevation * 0.5 + 0.5;
        
        // Dynamic mathematical blue chromatic blend
        vec3 waveColor = mix(indigoColor, blueColor, sin(normalizedElevation * 3.14159 + uTime * 0.5) * 0.5 + 0.5);
        waveColor = mix(waveColor, azureColor, cos(normalizedElevation * 2.2 - uTime * 0.35) * 0.5 + 0.5);

        // Specular sheen / rim lighting
        float rim = pow(1.0 - abs(vElevation), 2.4);
        vec3 finalColor = mix(baseBg, waveColor, normalizedElevation * 0.35 + rim * 0.18);

        // Radial vignette towards edges for crisp contrast focus
        float distFromCenter = length(vUv - vec2(0.5));
        float vignette = smoothstep(0.85, 0.12, distFromCenter);
        finalColor *= vignette;

        gl_FragColor = vec4(finalColor, 0.95);
      }
    `;

    function initThree() {
      if (!canvasContainerRef.current) return;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x020202);

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, -1.2, 2.4);
      camera.lookAt(0, 0, 0);

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        while (canvasContainerRef.current.firstChild) {
          canvasContainerRef.current.removeChild(canvasContainerRef.current.firstChild);
        }
        canvasContainerRef.current.appendChild(renderer.domElement);
      } catch (error) {
        console.error("WebGL initialization error:", error);
        return;
      }

      const geometry = new THREE.PlaneGeometry(16, 16, 128, 128);

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        },
        wireframe: false,
        side: THREE.DoubleSide,
        transparent: true,
      });

      mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI * 0.25;
      scene.add(mesh);

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);

      animate(0);
    }

    function onMouseMove(e: MouseEvent) {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    function onWindowResize() {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate(time: number) {
      animationFrameId = requestAnimationFrame(animate);

      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      if (material) {
        material.uniforms.uTime.value = time * 0.001;
        material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
      }

      if (mesh) {
        mesh.rotation.z = currentMouse.x * 0.08;
      }

      if (renderer && scene && camera) {
        renderer.render(scene, camera);
      }
    }

    initThree();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    />
  );
}
