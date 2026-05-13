import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { BlackHole } from '../components/BlackHole';

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
        {/* HERO SECTION */}
        <section className="min-h-screen w-full flex flex-col justify-center items-center relative px-6 py-32 md:py-40">
            {/* Added BlackHole for mobile view at the bottom of the hero section */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] opacity-100 pointer-events-none z-0 mix-blend-screen scale-110 w-full flex justify-center md:hidden">
                <BlackHole />
            </div>

            <div className="text-center z-10 hero-text-wrap relative w-full max-w-7xl mx-auto flex flex-col items-center mt-12 md:mt-0">
                <h1 className="text-[16vw] sm:text-[14vw] md:text-[8rem] lg:text-[11rem] xl:text-[13rem] leading-[0.85] font-bold uppercase tracking-tight brand-font flex flex-col items-center w-full">
                    <div className="reveal-mask w-full flex justify-center">
                        <span className="reveal-text-inner hero-anim-title text-white">Strong</span>
                    </div>

                    <div className="reveal-mask w-full flex justify-center mt-[-2%] md:mt-[-1%]">
                        <span className="liquid-metal reveal-text-inner hero-anim-title w-full cursor-hover"
                            style={{ paddingBottom: '10px' }}>Fluence</span>
                    </div>
                </h1>

                <div className="mt-8 md:mt-16 overflow-hidden flex flex-col gap-2 w-full justify-center px-4">
                    <p className="text-[#a0a0a0] max-w-[280px] sm:max-w-md md:max-w-xl mx-auto font-light text-sm sm:text-base md:text-[1.1rem] leading-relaxed tracking-wide hero-anim-desc opacity-0 transform translate-y-10">
                        Navigating the digital chaos. <br className="hidden md:block" /> Connecting brands with voices that matter.
                    </p>
                </div>
                
                <div className="mt-12 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 hero-anim-desc opacity-0 transform translate-y-10 w-full px-4 md:px-0">
                    <Link to="/#services" className="rounded-full text-[10px] md:text-sm uppercase tracking-widest cursor-hover relative group p-[1px] overflow-hidden inline-flex w-full md:w-auto md:min-w-[220px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#cdb4db] via-[#ffffff] to-[#b4dbcd] rounded-full"></div>
                        <div className="w-full h-full bg-[#020202] rounded-full relative z-10 transition-colors group-hover:bg-transparent">
                            <span className="relative px-6 py-4 md:px-8 md:py-4 w-full flex justify-center items-center gap-3 group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                                Our Expertise
                                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                                    <path d="M1 11L11 1M11 1H3M11 1V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </div>
                    </Link>
                    
                    <Link to="/signup" className="rounded-full text-[10px] md:text-sm uppercase tracking-widest cursor-hover relative group p-[1px] overflow-hidden inline-flex w-full md:w-auto md:min-w-[220px]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#cdb4db] via-[#ffffff] to-[#b4dbcd] rounded-full"></div>
                        <div className="w-full h-full bg-[#020202] rounded-full relative z-10 transition-colors group-hover:bg-transparent">
                            <span className="relative px-6 py-4 md:px-8 md:py-4 w-full flex justify-center items-center gap-3 group-hover:text-black transition-colors duration-300 whitespace-nowrap">
                                Partner With Us
                                <svg className="w-3 h-3 md:w-4 md:h-4" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                                    <path d="M1 11L11 1M11 1H3M11 1V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="min-h-[90vh] flex items-center justify-center py-16 md:py-24 px-4 md:px-6 relative z-10">
            <div className="hidden md:block absolute right-0 top-0 translate-x-[20%] -translate-y-[10%] opacity-20 pointer-events-none z-0 mix-blend-screen scale-75">
                <BlackHole />
            </div>
            <div className="max-w-7xl w-full relative z-10">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start md:items-end">
                    <div>
                        <span className="block w-12 md:w-16 h-[1px] bg-white/50 mb-6 md:mb-8 scroll-line"></span>
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-none brand-font">
                            <span className="block overflow-hidden"><span className="block split-line">We don't
                                    just</span></span>
                            <span className="block overflow-hidden"><span className="block split-line">follow
                                    trends.</span></span>
                            <span className="block overflow-hidden pt-2">
                                <span className="split-line italic liquid-metal cursor-hover px-2 -ml-2">We build the
                                    bridges.</span>
                            </span>
                        </h2>
                    </div>
                    <div className="text-gray-300 text-base md:text-xl font-light leading-relaxed">
                        <p className="fade-up-text opacity-0 translate-y-8">
                            In an era of content overload, average is invisible.
                            <strong>Strong Fluence</strong> is more than an agency—we are architects of influence.
                            We blend data-driven insights, consumer psychology, and raw creativity to turn passive followers
                            into a loyal community.
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
                    <span className="hidden sm:inline-block text-sm text-gray-500 tracking-widest">2026 VISION</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[650px]">
                    <Link to="/expertise/talent-management"
                        className="glass-card service-card md:col-span-2 md:row-span-2 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group relative overflow-hidden cursor-hover">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-40 bg-blue-900/10 blur-[120px] rounded-full group-hover:bg-blue-800/20 transition-colors duration-500">
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Talent Management</h3>
                            <p className="text-gray-400 max-w-md text-base md:text-lg">Bespoke strategy and representation for the next generation of culture-shifting
                                creators. From contract negotiation to 360° creative direction.</p>
                        </div>
                        <div className="relative z-10 flex flex-wrap gap-2 md:gap-3 mt-8 md:mt-10">
                            <span
                                className="px-3 py-1.5 md:px-4 md:py-2 border border-white/10 rounded-full text-[10px] md:text-xs uppercase tracking-wider text-gray-300">Strategy</span>
                            <span
                                className="px-3 py-1.5 md:px-4 md:py-2 border border-white/10 rounded-full text-[10px] md:text-xs uppercase tracking-wider text-gray-300">Growth</span>
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

                    <Link to="/expertise/brand-campaigns"
                        className="glass-card service-card rounded-[2rem] p-8 md:p-10 flex flex-col justify-center group relative overflow-hidden cursor-hover delay-100">
                        <div
                            className="absolute top-0 right-0 p-40 bg-purple-900/10 blur-[100px] rounded-full group-hover:bg-purple-800/20 transition-colors duration-500">
                        </div>
                        <h3 className="text-2xl font-bold mb-3 md:mb-4 relative z-10">Brand Campaigns</h3>
                        <p className="text-xs md:text-sm text-gray-400 relative z-10 leading-relaxed">Narrative-driven campaigns that
                            capture attention, going beyond vanity metrics to build true brand affinity.</p>
                    </Link>

                    <Link to="/expertise/campaign-strategy"
                        className="glass-card service-card rounded-[2rem] p-8 md:p-10 flex flex-col justify-center group relative overflow-hidden cursor-hover delay-200">
                        <div
                            className="absolute bottom-0 left-0 p-40 bg-indigo-900/10 blur-[100px] rounded-full group-hover:bg-indigo-800/20 transition-colors duration-500">
                        </div>
                        <h3 className="text-2xl font-bold mb-3 md:mb-4 relative z-10">Campaign Strategy</h3>
                        <p className="text-xs md:text-sm text-gray-400 relative z-10 leading-relaxed">Strategic orchestration and narrative
                            direction that aligns your brand with the voices that truly matter.</p>
                    </Link>
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
