import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import gsap from 'gsap';

const serviceData = {
    'talent-management': {
        title: 'Talent Management',
        subtitle: 'Strategic Partnership',
        description: 'We manage the chaos so you can focus on the art. From strategic positioning to 360° creative direction, we handle the business of being you.',
        points: ['Strategic Career Architecture', 'Brand Alignment & Strategy', 'IP Development & Protection', 'Partnership Strategy']
    },
    'brand-campaigns': {
        title: 'Brand Campaigns',
        subtitle: 'Attention that Converts',
        description: 'Go beyond vanity metrics. We design multi-platform content strategies that move people, not just numbers, ensuring your brand resonates in the digital noise.',
        points: ['Creator Strategy & Selection', 'Narrative-Driven Campaigns', 'Engagement Analysis', 'Media Amplification Strategy']
    },
    'campaign-strategy': {
        title: 'Campaign Strategy',
        subtitle: 'Strategic Storytelling',
        description: 'We don\'t just track trends; we orchestrate narratives. We find the right creators and direct the strategy that ensures your message resonates with the right audience at the right time.',
        points: ['Influencer Mapping & Vetting', 'Strategic Narrative Design', 'Partnership Ecosystems', 'Campaign Performance Direction']
    }
};

export default function Expertise() {
    const { slug } = useParams();
    const data = serviceData[slug as keyof typeof serviceData] || serviceData['talent-management'];
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
        <section ref={containerRef} className="min-h-screen pt-40 pb-24 px-6 relative z-10 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <div className="mb-12">
                    <Link to="/#services" className="text-xs uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors cursor-hover flex items-center gap-2 expertise-fade opacity-0">
                        <span>&larr; Back to Expertise</span>
                    </Link>
                </div>
                
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold brand-font mb-6 leading-none tracking-tighter mix-blend-difference">
                    <div className="overflow-hidden pb-4">
                        <span className="reveal-mask-inner opacity-0 liquid-metal">{data.title}</span>
                    </div>
                </h1>
                
                <p className="text-xl md:text-3xl text-gray-400 font-light mb-16 expertise-fade opacity-0 max-w-2xl italic">
                    {data.subtitle}
                </p>

                <div className="glass-card p-8 md:p-16 rounded-[2rem] relative overflow-hidden expertise-fade opacity-0 border border-white/10 group">
                    <div className={`absolute top-1/2 right-0 -translate-y-1/2 p-40 blur-[120px] rounded-full pointer-events-none transition-colors duration-500 ${
                        slug === 'talent-management' ? 'bg-blue-900/10 group-hover:bg-blue-800/20' :
                        slug === 'brand-campaigns' ? 'bg-purple-900/10 group-hover:bg-purple-800/20' :
                        'bg-pink-900/10 group-hover:bg-pink-800/20'
                    }`}></div>
                    
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
                        {data.description}
                    </p>

                    <h3 className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Key Deliverables</h3>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-4">
                                <span className="p-1 rounded-full bg-white/10 mt-1">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="text-gray-300">{point}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between">
                        <Link to={`/signup?type=${slug === 'talent-management' ? 'creator' : 'brand'}`} className="text-white hover:text-gray-300 transition-colors uppercase tracking-[0.2em] text-sm font-bold cursor-hover group flex items-center gap-4">
                            Work With Us
                            <span className="p-3 border border-white/20 rounded-full group-hover:bg-white group-hover:text-black transition-all">
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
