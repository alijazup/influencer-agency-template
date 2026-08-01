import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    // --------------------------------------------------------
    // GSAP LOGIC
    // --------------------------------------------------------
    const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.to('.nav-animate', { opacity: 1, duration: 1, ease: 'power2.out' })
          .to('.hero-anim-title', {
              y: 0,
              opacity: 1,
              duration: 1.6,
              stagger: 0.1,
              ease: 'power4.out'
          }, "-=0.5")
          .from('.hero-anim-sub', { opacity: 0, x: -20, duration: 1 }, "-=1.2")
          .to('.hero-anim-desc', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "-=1")
          .to('.hero-anim-scroll', { opacity: 0.6, duration: 1 }, "-=0.5");

        gsap.utils.toArray('.split-line').forEach(line => {
            gsap.from(line as Element, {
                scrollTrigger: { trigger: line as Element, start: "top 85%" },
                yPercent: 100, duration: 1.2, ease: "power4.out"
            });
        });

        gsap.to('.fade-up-text', {
            scrollTrigger: { trigger: '.fade-up-text', start: "top 85%" },
            opacity: 1, y: 0, duration: 1, ease: "power2.out"
        });

        gsap.to('.scroll-line', {
            scrollTrigger: { trigger: '#about', start: "top 70%" },
            width: 100, duration: 1.5, ease: "power2.out"
        });

        gsap.from('.service-card', {
            scrollTrigger: { trigger: '#services', start: "top 75%" },
            y: 100, opacity: 0, duration: 1.2, stagger: 0.2, ease: "power3.out"
        });

        gsap.from('.join-card', {
            scrollTrigger: { trigger: '#join', start: "top 80%" },
            y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
        });

        gsap.to(".animate-marquee", {
            xPercent: -50, ease: "none", repeat: -1, duration: 20
        });
    });

    return () => {
        ctx.revert();
    };
  }, []);

  // --------------------------------------------------------
  // Location handling is now in Layout.tsx with Lenis
  // --------------------------------------------------------

  return (
    <>
        {/* HERO SECTION - 2026 Architectural Studio Standard (Spacious Full Mobile Height) */}
        <section className="min-h-[100vh] sm:min-h-screen md:min-h-[105vh] w-full flex flex-col justify-between items-center relative px-4 sm:px-6 pt-32 pb-16 sm:pt-36 md:pt-48 md:pb-28 z-10 overflow-hidden">
            
            {/* Center Stage Bold Statement */}
            <div className="text-center hero-text-wrap relative w-full max-w-7xl mx-auto flex flex-col items-center my-auto">
                
                {/* Eyebrow Label */}
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 mb-4 sm:mb-6 md:mb-8 hero-anim-desc opacity-0">
                    {siteConfig.brand.name} • TALENT & INFLUENCE MANAGEMENT
                </p>

                {/* Hero Title - Clean 2-Line Fluid Scale (Zero Mobile Clipping) */}
                <h1 className="text-[5.8vw] xs:text-[6vw] sm:text-[6vw] md:text-[5.2vw] lg:text-[4.8vw] xl:text-[5.4rem] leading-[0.96] font-extrabold uppercase tracking-tight brand-font flex flex-col items-center w-full max-w-full">
                    <div className="reveal-mask w-full flex justify-center py-1 sm:py-2 px-0 sm:px-6">
                        <span className="reveal-text-inner hero-anim-title text-white whitespace-nowrap px-1 sm:px-3 py-1">{siteConfig.brand.heroTitleLine1}</span>
                    </div>

                    <div className="reveal-mask w-full flex justify-center mt-1 py-1 sm:py-2 px-0 sm:px-6">
                        <span className="liquid-metal reveal-text-inner hero-anim-title cursor-hover whitespace-nowrap px-1 sm:px-3 py-1">
                            {siteConfig.brand.heroTitleLine2}
                        </span>
                    </div>
                </h1>

                {/* Subtitle - Punchy & Clean */}
                <p className="text-[#a0a0a0] max-w-lg mx-auto font-light text-xs sm:text-base md:text-lg leading-relaxed tracking-wide mt-6 md:mt-10 hero-anim-desc opacity-0 transform translate-y-8 px-2">
                    {siteConfig.brand.tagline}
                </p>
                
                {/* Hero Action Buttons */}
                <div className="mt-8 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 hero-anim-desc opacity-0 transform translate-y-8 w-full px-4 md:px-0">
                    <Link to="/signup" className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3.5 sm:py-4 text-xs md:text-sm uppercase tracking-widest font-bold shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 cursor-hover inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px]">
                        Partner With Us ↗
                    </Link>
                    
                    <Link to="/#services" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white rounded-full px-8 py-3.5 sm:py-4 text-xs md:text-sm uppercase tracking-widest font-medium backdrop-blur-md transition-all duration-300 hover:scale-105 cursor-hover inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px]">
                        Our Expertise ↗
                    </Link>
                </div>
            </div>

            {/* Bottom Scroll Indicator */}
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-500 hero-anim-desc opacity-0 pt-6 md:pt-16">
                <span>SCROLL TO EXPLORE</span>
                <div className="w-8 sm:w-12 h-[1px] bg-white/20"></div>
                <span>2026 EDITION</span>
            </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-[90vh] flex items-center justify-center py-16 md:py-24 px-4 md:px-6 relative z-10">
            <div className="max-w-7xl w-full relative z-10">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start md:items-end">
                    <div>
                        <span className="block w-12 md:w-16 h-[1px] bg-white/50 mb-6 md:mb-8 scroll-line"></span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none brand-font">
                            <span className="block overflow-hidden"><span className="block split-line">Crafting</span></span>
                            <span className="block overflow-hidden"><span className="block split-line">digital</span></span>
                            <span className="block overflow-hidden pt-2">
                                <span className="split-line italic liquid-metal cursor-hover px-2 -ml-2">impact.</span>
                            </span>
                        </h2>
                    </div>
                    <div className="text-gray-300 text-base md:text-xl font-light leading-relaxed">
                        <p className="fade-up-text opacity-0 translate-y-8">
                            <strong>{siteConfig.brand.name}</strong> is {siteConfig.brand.aboutHeading} {siteConfig.brand.aboutDescription}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* SERVICES BENTO GRID */}
        <section id="services" className="py-16 md:py-24 px-4 md:px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 md:mb-20 border-b border-white/10 pb-6 md:pb-8 fade-in-trigger">
                    <h2 className="text-4xl md:text-6xl brand-font">Our Expertise</h2>
                    <span className="hidden sm:inline-block text-sm text-gray-500 tracking-widest">{new Date().getFullYear()} VISION</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[650px]">
                    {siteConfig.expertise[0] && (
                        <Link to={`/expertise/${siteConfig.expertise[0].slug}`}
                            className="glass-card service-card md:col-span-2 md:row-span-2 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group relative overflow-hidden cursor-hover">
                            <div
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-40 bg-blue-900/10 blur-[120px] rounded-full group-hover:bg-blue-800/20 transition-colors duration-500">
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{siteConfig.expertise[0].title}</h3>
                                <p className="text-gray-400 max-w-md text-base md:text-lg">{siteConfig.expertise[0].description}</p>
                            </div>
                            <div className="relative z-10 flex flex-wrap gap-2 md:gap-3 mt-8 md:mt-10">
                                {siteConfig.expertise[0].features.slice(0, 2).map((feat, idx) => (
                                    <span key={idx} className="px-3 py-1.5 md:px-4 md:py-2 border border-white/10 rounded-full text-[10px] md:text-xs uppercase tracking-wider text-gray-300">
                                        {feat}
                                    </span>
                                ))}
                            </div>
                            <div
                                className="absolute bottom-8 right-8 md:bottom-10 md:right-10 p-3 md:p-4 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6 transform group-hover:rotate-45 transition-transform duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </div>
                        </Link>
                    )}

                    {siteConfig.expertise[1] && (
                        <Link to={`/expertise/${siteConfig.expertise[1].slug}`}
                            className="glass-card service-card rounded-[2rem] p-8 md:p-10 flex flex-col justify-center group relative overflow-hidden cursor-hover delay-100">
                            <div
                                className="absolute top-0 right-0 p-40 bg-purple-900/10 blur-[100px] rounded-full group-hover:bg-purple-800/20 transition-colors duration-500">
                            </div>
                            <h3 className="text-2xl font-bold mb-3 md:mb-4 relative z-10">{siteConfig.expertise[1].title}</h3>
                            <p className="text-xs md:text-sm text-gray-400 relative z-10 leading-relaxed">{siteConfig.expertise[1].description}</p>
                        </Link>
                    )}

                    {siteConfig.expertise[2] && (
                        <Link to={`/expertise/${siteConfig.expertise[2].slug}`}
                            className="glass-card service-card rounded-[2rem] p-8 md:p-10 flex flex-col justify-center group relative overflow-hidden cursor-hover delay-200">
                            <div
                                className="absolute bottom-0 left-0 p-40 bg-indigo-900/10 blur-[100px] rounded-full group-hover:bg-indigo-800/20 transition-colors duration-500">
                            </div>
                            <h3 className="text-2xl font-bold mb-3 md:mb-4 relative z-10">{siteConfig.expertise[2].title}</h3>
                            <p className="text-xs md:text-sm text-gray-400 relative z-10 leading-relaxed">{siteConfig.expertise[2].description}</p>
                        </Link>
                    )}
                </div>
            </div>
        </section>

        {/* PARTNERSHIP / JOIN US SECTION */}
        <section id="join" className="py-16 md:py-32 px-4 md:px-6 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-white/10 pb-6">
                    <h2 className="text-3xl md:text-5xl brand-font">Partnership</h2>
                    <span className="hidden sm:inline-block text-sm text-gray-500 tracking-widest">JOIN THE MOVEMENT</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-8">

                    {/* For Creators */}
                    <Link to="/signup?type=creator" className="w-full md:w-1/2">
                        <div
                            className="w-full h-full glass-card join-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden group cursor-hover">
                            <div
                                className="absolute top-1/2 right-0 -translate-y-1/2 p-40 bg-pink-900/10 blur-[120px] rounded-full group-hover:bg-pink-800/20 transition-colors duration-500">
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <span
                                        className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 md:mb-4 block">Talent</span>
                                    <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 brand-font">Creators</h3>
                                    <p className="text-gray-400 text-base md:text-lg max-w-md">Ready for your next big partnership? We bridge the
                                        gap between your voice and visionary brands. We manage the business so you can focus on the craft.</p>
                                </div>

                                <div className="mt-8 md:mt-12 flex items-center justify-between border-t border-white/10 pt-6 md:pt-8">
                                    <span
                                        className="text-xs md:text-sm uppercase tracking-widest group-hover:text-white transition-colors">Apply
                                        Now</span>
                                    <div
                                        className="p-2 md:p-3 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-rotate-45 transition-transform duration-300"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* For Brands */}
                    <Link to="/signup?type=brand" className="w-full md:w-1/2">
                        <div
                            className="w-full h-full glass-card join-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden group cursor-hover">
                            <div
                                className="absolute top-1/2 left-0 -translate-y-1/2 p-40 bg-emerald-900/10 blur-[120px] rounded-full group-hover:bg-emerald-800/20 transition-colors duration-500">
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <span
                                        className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 md:mb-4 block">Business</span>
                                    <h3 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 brand-font">Brands</h3>
                                    <p className="text-gray-400 text-base md:text-lg max-w-md">Stop searching for the right voice. We bridge the gap to visionary creators, architecting partnerships that move the needle.</p>
                                </div>

                                <div className="mt-8 md:mt-12 flex items-center justify-between border-t border-white/10 pt-6 md:pt-8">
                                    <span
                                        className="text-xs md:text-sm uppercase tracking-widest group-hover:text-white transition-colors">Partner
                                        With Us</span>
                                    <div
                                        className="p-2 md:p-3 border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <svg className="w-4 h-4 md:w-5 md:h-5 transform group-hover:-rotate-45 transition-transform duration-300"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>

        {/* INFINITE MARQUEE */}
        <div className="py-16 bg-black border-y border-white/5 overflow-hidden">
            <div className="whitespace-nowrap flex gap-16 text-7xl md:text-9xl font-bold text-transparent opacity-20 select-none brand-font"
                style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
                <span className="animate-marquee">STRATEGY • INFLUENCE • CULTURE • IMPACT •</span>
                <span className="animate-marquee">STRATEGY • INFLUENCE • CULTURE • IMPACT •</span>
            </div>
        </div>
    </>
  );
}
