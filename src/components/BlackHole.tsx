import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function BlackHole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const accretionDiskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !accretionDiskRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Subtle 3D perspective shift on scroll 
      gsap.to(accretionDiskRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        rotateX: "85deg", // Tilts more extremely as you scroll
        rotateY: "-5deg",
        y: 40,
        ease: "none",
        force3D: true,
      });
      
      // Gentle parallax for the whole container
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
        y: 80,
        ease: "none",
        force3D: true,
      });
    });

    return () => mm.revert();
  }, []);

  // Soft holographic gradient for the gas
  const chromeGradient = `conic-gradient(from 0deg, #444444, #999999, #cdb4db, #ffffff, #ffffff, #b4dbcd, #999999, #444444, #999999, #cdb4db, #ffffff, #ffffff, #b4dbcd, #999999, #444444)`;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[250px] sm:h-[350px] lg:h-[450px] -my-12 sm:-my-16 flex items-center justify-center overflow-visible z-[1] pointer-events-none opacity-90 mix-blend-screen scale-110 black-hole-target"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-spin-fast {
          animation: spin-slow 8s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-slow-reverse 20s linear infinite;
        }
      ` }} />

      {/* Gravitational Lensing Halo (Behind the hole) */}
      <div 
        className="absolute w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] rounded-full mix-blend-screen animate-spin-reverse opacity-80"
        style={{
          background: chromeGradient,
          WebkitMaskImage: 'radial-gradient(circle, transparent 42%, black 50%, black 60%, transparent 68%)',
          maskImage: 'radial-gradient(circle, transparent 42%, black 50%, black 60%, transparent 68%)',
          filter: 'blur(3px)',
        }}
      />

      {/* Tilted Accretion Disk Container */}
      <div 
        ref={accretionDiskRef}
        className="absolute w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] mix-blend-screen"
        style={{ 
          transform: 'rotateX(74deg) rotateY(-18deg)', // Standard NASA tilt
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main sweeping accretion disk (soft volumetric glow) */}
        <div 
          className="absolute inset-0 rounded-full animate-spin-slow"
          style={{
            background: chromeGradient,
            WebkitMaskImage: 'radial-gradient(circle, transparent 31%, black 40%, black 56%, transparent 68%)',
            maskImage: 'radial-gradient(circle, transparent 31%, black 40%, black 56%, transparent 68%)',
            filter: 'blur(3px)', 
            opacity: 0.85
          }}
        />

        {/* Sharp inner photon ring (much faster) */}
        <div 
          className="absolute inset-[8%] rounded-full animate-spin-fast"
          style={{
            background: chromeGradient,
            WebkitMaskImage: 'radial-gradient(circle, transparent 32%, black 34%, black 38%, transparent 42%)',
            maskImage: 'radial-gradient(circle, transparent 32%, black 34%, black 38%, transparent 42%)',
            filter: 'blur(0.5px)',
            opacity: 1
          }}
        />

        {/* Doppler Beaming / Brightness Mask (Static) */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none mix-blend-overlay"
          style={{
            background: 'linear-gradient(210deg, transparent 30%, rgba(255,255,255,1) 75%, rgba(255,255,255,0.7) 100%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 28%, black 45%, transparent 75%)',
            maskImage: 'radial-gradient(circle, transparent 28%, black 45%, transparent 75%)',
            opacity: 0.95
          }}
        />
      </div>

      {/* Event Horizon (Pure Black Center) */}
      <div 
        className="absolute z-10 w-[130px] h-[130px] sm:w-[180px] sm:h-[180px] lg:w-[230px] lg:h-[230px] rounded-full bg-[#020202]"
        style={{
          boxShadow: '0 0 20px 6px #020202, inset 0 0 30px #000000'
        }}
      />
      
    </div>
  );
}
