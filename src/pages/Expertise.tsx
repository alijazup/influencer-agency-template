import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import { siteConfig } from '../config/siteConfig';

export default function Expertise() {
    const { slug } = useParams();
    const serviceItem = siteConfig.expertise.find(item => item.slug === slug) || siteConfig.expertise[0];
    const data = {
        title: serviceItem?.title || 'Talent Management',
        subtitle: serviceItem?.tagline || 'Strategic Partnership',
        description: serviceItem?.description || '',
        points: serviceItem?.features || []
    };
    const containerRef = React.useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.expertise-fade', {
                y: 40,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
            gsap.fromTo('.reveal-mask-inner', {
                y: '100%',
                opacity: 0
            }, {
                y: '0%',
                opacity: 1,
                duration: 1.2,
                ease: 'power4.out',
                stagger: 0.1
            });
        }, containerRef);

        return () => ctx.revert();
    }, [slug]);

    return (
        <section ref={containerRef} className="min-h-screen pt-40 pb-24 px-6 relative z-10 flex flex-col items-center text-white">
            <div className="max-w-4xl w-full">
                <div className="mb-12">
                    <Link to="/#services" className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-white font-semibold transition-colors cursor-hover flex items-center gap-2 expertise-fade opacity-0 font-mono">
                        <span>&larr; Back to Expertise</span>
                    </Link>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold brand-font mb-6 leading-none tracking-tighter text-white">
                    <div className="overflow-hidden pb-4">
                        <span className="reveal-mask-inner opacity-0 liquid-metal font-bold">{data.title}</span>
                    </div>
                </h1>
                
                <p className="text-xl md:text-3xl text-gray-300 font-normal mb-16 expertise-fade opacity-0 max-w-2xl italic">
                    {data.subtitle}
                </p>

                <div className="glass-card p-8 md:p-16 rounded-[2rem] relative overflow-hidden expertise-fade opacity-0 border border-white/12 group shadow-lg">
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 p-40 bg-[#ebac38]/10 group-hover:bg-[#ebac38]/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-500"></div>
                    
                    <p className="text-lg md:text-xl text-gray-300 font-normal leading-relaxed mb-12">
                        {data.description}
                    </p>

                    <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-semibold font-mono">Key Deliverables</h3>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <span className="p-1.5 rounded-full bg-white/10 text-white mt-1">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-300 font-medium">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-16 pt-8 border-t border-white/15 flex items-center justify-between">
                        <Link to={`/signup?type=${slug === 'talent-management' ? 'creator' : 'brand'}`} className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-bold cursor-hover group flex items-center gap-4 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)]">
                            Work With Us
                            <span className="p-2 border border-black/20 rounded-full group-hover:bg-black group-hover:text-white transition-all">
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
