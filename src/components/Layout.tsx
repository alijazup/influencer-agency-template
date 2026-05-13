import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeBackground } from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

export function Layout() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<any>(null);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    // --------------------------------------------------------
    // MOUSE LOGIC (Cursor)
    // --------------------------------------------------------
    const handleMouseMove = (e: MouseEvent) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        if (cursorDotRef.current) {
            cursorDotRef.current.style.left = `${posX}px`;
            cursorDotRef.current.style.top = `${posY}px`;
        }
        
        if (cursorOutlineRef.current) {
            cursorOutlineRef.current.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        }

        const xPct = (e.clientX / window.innerWidth) * 100;
        document.documentElement.style.setProperty('--mouse-x-pct', `${xPct}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // --------------------------------------------------------
    // LENIS LOGIC
    // --------------------------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;
    
    let lenisFrameId: number;
    function raf(time: number) {
        lenis.raf(time);
        lenisFrameId = requestAnimationFrame(raf);
    }
    lenisFrameId = requestAnimationFrame(raf);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(lenisFrameId);
        lenis.destroy();
        lenisRef.current = null;
    };
  }, []);

  React.useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Scroll to top or hash on route change
    if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element && lenisRef.current) {
            setTimeout(() => {
                lenisRef.current.scrollTo(element, { offset: -100 });
            }, 100);
        } else if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        window.scrollTo(0, 0);
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
            lenisRef.current.resize();
        }
    }

    // Refresh ScrollTrigger on route change
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);

    // Reattach cursor hover events on route change
    const attachHoverEvents = () => {
        document.querySelectorAll('.cursor-hover').forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter as EventListener);
            el.addEventListener('mouseleave', handleMouseLeave as EventListener);
        });
    }
    setTimeout(attachHoverEvents, 300);

    return () => {
        document.querySelectorAll('.cursor-hover').forEach(el => {
            el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
            el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
        });
    }
  }, [location.pathname, location.hash]);

  const handleMouseEnter = () => {
      if (cursorOutlineRef.current) {
          cursorOutlineRef.current.style.width = '60px';
          cursorOutlineRef.current.style.height = '60px';
          cursorOutlineRef.current.style.backgroundColor = 'rgba(255,255,255,0.1)';
      }
  };
  const handleMouseLeave = () => {
      if (cursorOutlineRef.current) {
          cursorOutlineRef.current.style.width = '40px';
          cursorOutlineRef.current.style.height = '40px';
          cursorOutlineRef.current.style.backgroundColor = 'transparent';
      }
  };

  return (
    <div className="antialiased text-white">
      <div className="cursor-dot hidden md:block" ref={cursorDotRef}></div>
      <div className="cursor-outline hidden md:block" ref={cursorOutlineRef}></div>

      <ThreeBackground />
      <div className="overlay-gradient"></div>

      <nav className="fixed top-0 w-full z-50 px-4 py-4 md:px-8 md:py-8 flex justify-between items-center mix-blend-difference nav-animate">
          <Link to="/" className="flex items-center gap-3 cursor-hover">
            <img src="/logo.png" alt="Strong Fluence" className="h-16 sm:h-20 md:h-36 w-auto mix-blend-screen" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium text-gray-300">
              <Link to="/#about" className="hover:text-white transition-colors cursor-hover">Agency</Link>
              <Link to="/#services" className="hover:text-white transition-colors cursor-hover">Expertise</Link>
              <Link to="/signup" className="hover:text-white transition-colors cursor-hover text-white">Partnership</Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 cursor-hover relative z-[60]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`block w-6 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'rotate-45 translate-y-[0px]' : '-translate-y-[4px]'}`}></span>
            <span className={`block w-6 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? '-rotate-45 translate-y-[-1.5px]' : 'translate-y-[4px]'}`}></span>
          </button>

          {/* Desktop Contact Button */}
          <Link to="/#contact" className="hidden md:block">
              <button
                  className="rounded-full text-[10px] md:text-sm uppercase tracking-widest cursor-hover relative group p-[1px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#cdb4db] via-[#ffffff] to-[#b4dbcd] rounded-full"></div>
                  <div className="w-full h-full bg-[#020202] rounded-full relative z-10 transition-colors group-hover:bg-transparent">
                      <span className="relative px-6 py-2 md:px-8 md:py-3 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                          Contact Us
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                              <path d="M1 11L11 1M11 1H3M11 1V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                      </span>
                  </div>
              </button>
          </Link>
      </nav>

      {/* ====== MOBILE MENU OVERLAY ====== */}
      <div className={`fixed inset-0 z-[55] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${mobileMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#020202]/95 backdrop-blur-xl transition-opacity duration-700 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`relative z-10 flex flex-col justify-center items-center h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col items-center gap-8 mb-16">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold brand-font uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold brand-font uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              Agency
            </Link>
            <Link
              to="/#services"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold brand-font uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              Expertise
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold brand-font uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              Partnership
            </Link>
            <Link
              to="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-bold brand-font uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Social links in mobile menu */}
          <div className="flex gap-6 text-xs uppercase tracking-[0.3em] text-gray-500">
            <a href="https://instagram.com/strongfluence" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://tiktok.com/@strongfluence" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
            <a href="https://linkedin.com/company/strongfluence" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <section id="contact" className="min-h-[80vh] flex flex-col justify-between py-16 md:py-24 px-4 md:px-8 bg-[#030303] relative z-10 w-full">
          <div className="max-w-7xl mx-auto w-full">
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 md:mb-10">General Inquiries</p>
              <div className="overflow-hidden">
                  <a href="mailto:connect@strongfluence.com"
                      className="block text-[11vw] sm:text-5xl md:text-8xl font-bold hover:text-gray-400 transition-colors duration-500 brand-font footer-email transform cursor-hover">
                      connect@<br />strongfluence.com
                  </a>
              </div>
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end mt-16 md:mt-20 text-[10px] md:text-xs text-gray-500 font-mono gap-6 md:gap-8">
              <div className="flex flex-col gap-2 md:gap-3">
                  <span className="text-white">NOVI PAZAR, SERBIA</span>
                  <span>&copy; 2026 STRONG FLUENCE. ALL RIGHTS RESERVED.</span>
              </div>
              <div className="flex flex-wrap gap-6 mt-4 md:mt-0 uppercase tracking-wider">
                  <a href="https://instagram.com/strongfluence" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">Instagram</a>
                  <a href="https://tiktok.com/@strongfluence" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">TikTok</a>
                  <a href="https://linkedin.com/company/strongfluence" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">LinkedIn</a>
              </div>
          </div>
      </section>
    </div>
  );
}
