import React, { useEffect, useRef, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../config/siteConfig';
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

      {/* 2026 ARCHITECTURAL EDGE-TO-EDGE HEADER */}
      <nav className="fixed top-0 left-0 right-0 w-full z-50 px-6 py-5 md:px-12 md:py-6 flex justify-between items-center bg-gradient-to-b from-[#020202]/80 via-[#020202]/30 to-transparent backdrop-blur-sm transition-all duration-500 nav-animate">
          <Link to="/" className="flex items-center gap-3 cursor-hover">
            <img src={siteConfig.brand.logoUrl} alt={siteConfig.brand.name} className="h-14 sm:h-20 md:h-24 max-h-24 w-auto object-contain transition-transform duration-300 hover:scale-105" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.25em] font-medium text-gray-300">
              {siteConfig.navLinks.map((link, idx) => (
                <Link key={idx} to={link.href} className="hover:text-white transition-colors cursor-hover relative group py-1">
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-hover relative z-[60]"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'rotate-45 translate-y-[0px]' : '-translate-y-[3px]'}`}></span>
            <span className={`block w-5 h-[1.5px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? '-rotate-45 translate-y-[-1.5px]' : 'translate-y-[3px]'}`}></span>
          </button>

          {/* Desktop Contact Button */}
          <Link to="/#contact" className="hidden md:block">
              <button className="rounded-full text-[11px] uppercase tracking-widest cursor-hover px-6 py-2.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-white transition-all duration-300 flex items-center gap-2 font-medium backdrop-blur-md">
                  Contact Us
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                      <path d="M1 11L11 1M11 1H3M11 1V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
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
            {siteConfig.navLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-bold brand-font uppercase tracking-wider text-white hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
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
            {siteConfig.socialLinks.instagram && (
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            )}
            {siteConfig.socialLinks.tiktok && (
              <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
            )}
            {siteConfig.socialLinks.linkedin && (
              <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            )}
            {siteConfig.socialLinks.twitter && (
              <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a>
            )}
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>

      {/* FOOTER */}
      <section id="contact" className="min-h-[50vh] flex flex-col justify-between py-16 md:py-20 px-4 md:px-8 bg-transparent relative z-10 w-full">
          <div className="max-w-7xl mx-auto w-full glass-card rounded-[2.5rem] md:rounded-full p-8 md:px-14 md:py-10 border border-white/15 flex flex-col md:flex-row justify-between items-center gap-6 backdrop-blur-xl">
              <div>
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">General Inquiries</p>
                  <a href={`mailto:${siteConfig.contact.email}`}
                      className="block text-2xl sm:text-4xl md:text-5xl font-bold text-white hover:text-gray-300 transition-colors duration-300 brand-font footer-email cursor-hover">
                      {siteConfig.contact.email}
                  </a>
              </div>
              <Link to="/signup" className="rounded-full text-xs uppercase tracking-widest cursor-hover px-8 py-4 bg-white text-black hover:bg-gray-200 font-semibold transition-all whitespace-nowrap">
                  Get In Touch
              </Link>
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end mt-12 md:mt-16 text-[10px] md:text-xs text-gray-500 font-mono gap-6 md:gap-8 border-t border-white/10 pt-8">
              <div className="flex flex-col gap-2">
                  <span className="text-white font-semibold">{siteConfig.contact.location}</span>
                  <span>&copy; {new Date().getFullYear()} {siteConfig.brand.name.toUpperCase()}. ALL RIGHTS RESERVED.</span>
              </div>
              <div className="flex flex-wrap gap-6 mt-2 md:mt-0 uppercase tracking-wider">
                  {siteConfig.socialLinks.instagram && (
                    <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">Instagram</a>
                  )}
                  {siteConfig.socialLinks.tiktok && (
                    <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">TikTok</a>
                  )}
                  {siteConfig.socialLinks.linkedin && (
                    <a href={siteConfig.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">LinkedIn</a>
                  )}
                  {siteConfig.socialLinks.twitter && (
                    <a href={siteConfig.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-hover">Twitter</a>
                  )}
              </div>
          </div>
      </section>
    </div>
  );
}
