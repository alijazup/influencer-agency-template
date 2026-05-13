import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

export default function NotFound() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo('.nf-code', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' })
        .fromTo('.nf-title', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
        .fromTo('.nf-desc', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .fromTo('.nf-btn', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4');
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative px-4 z-10 pt-32">
      <div className="text-center max-w-2xl w-full">
        <h1 className="nf-code text-[20vw] md:text-[12rem] font-bold brand-font leading-none liquid-metal opacity-0 pb-4">
          404
        </h1>
        <h2 className="nf-title text-2xl md:text-4xl font-bold brand-font mb-6 opacity-0">
          Page Not Found
        </h2>
        <p className="nf-desc text-gray-400 text-base md:text-lg font-light leading-relaxed mb-12 opacity-0 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <Link to="/" className="nf-btn opacity-0 inline-block">
          <button className="border border-white/20 px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all duration-500 cursor-hover">
            Return Home
          </button>
        </Link>
      </div>
    </section>
  );
}
