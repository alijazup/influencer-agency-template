import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import gsap from "gsap";
import { siteConfig } from "../config/siteConfig";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "creator";
  const [signupType, setSignupType] = useState(initialType);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (isSubmitted) {
        tl.fromTo(
          ".success-anim",
          { opacity: 0, scale: 0.98, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          },
        );
      } else {
        // MATCHING HOME PAGE SECTION ANIMATION VIBE
        tl.fromTo(
          ".signup-left",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        )
        .to( /* Important: reveal-text-inner has opacity:0 in CSS */
          ".reveal-text-inner",
          { y: "0%", opacity: 1, duration: 1.4, stagger: 0.1, ease: "power4.out" },
          "-=1.0"
        )
        .fromTo(
          ".service-card-anim",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
          "-=1.0"
        )
        .fromTo(
          ".signup-field",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" },
          "-=0.6"
        );
      }
    });

    return () => ctx.revert();
  }, [isSubmitted, signupType]);

  // Global mouse X for liquid metal text effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        const xPct = (e.clientX / window.innerWidth) * 100;
        document.documentElement.style.setProperty('--mouse-x-pct', `${xPct}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const fname = formData.get('fname') as string || '';
    const lname = formData.get('lname') as string || '';
    const email = formData.get('email') as string || '';
    
    let subject = `Partnership Request from ${fname} ${lname}`;
    let data: any = {
      _subject: subject,
      Name: `${fname} ${lname}`,
      Email: email,
      Type: signupType
    };

    if (signupType === "creator") {
        data.Handle = formData.get('handle') as string || '';
        data.Niche = formData.get('niche') as string || '';
    } else {
        data.Brand = formData.get('brand') as string || '';
        data.Objective = formData.get('objective') as string || '';
    }

    try {
        // Using formsubmit.co to send the email directly in the background
        await fetch(siteConfig.contact.formActionUrl, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        setIsSubmitted(true);
    } catch (error) {
        console.error("Form submission failed:", error);
        alert("Something went wrong with the submission. Please try again later.");
    }
  };

  const inputClasses =
    "w-full bg-white/5 border border-white/15 rounded-[1.25rem] px-6 py-4 text-sm text-white focus:outline-none focus:border-white focus:bg-white/10 transition-all duration-300 placeholder:text-gray-500 font-medium outline-none shadow-sm";

  const labelClasses = "text-[10px] uppercase tracking-[0.4em] text-gray-400 font-semibold mb-3 ml-1 block font-mono";

  if (isSubmitted) {
    return (
      <section className="min-h-screen w-full flex flex-col justify-center items-center relative px-4 z-10 pt-32">
        <div className="glass-card rounded-[2.5rem] p-12 md:p-24 text-center max-w-2xl w-full relative overflow-hidden group success-anim opacity-0 border border-white/12 shadow-lg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-40 bg-[#ebac38]/10 blur-[120px] rounded-full group-hover:bg-[#ebac38]/20 transition-colors duration-500 pointer-events-none"></div>
          
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold brand-font text-white pb-2">
              Application Sent
            </h2>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed max-w-md mx-auto font-normal">
            Our team will review your profile and reach out within 48 hours. Let's build something iconic.
          </p>

          <Link to="/">
            <button className="mt-12 bg-white text-black hover:bg-gray-100 px-10 py-5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300 cursor-hover shadow-[0_0_30px_rgba(255,255,255,0.25)]">
              Return Home
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center relative px-4 md:px-8 z-10 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Strategic Copy - 1:1 with Home Section Headers */}
        <div className="signup-left opacity-0 max-w-2xl lg:max-w-none lg:w-5/12 xl:w-1/2 flex flex-col items-start justify-center">
          
          <div className="signup-tabs flex p-1.5 bg-white/5 rounded-full border border-white/15 w-full max-w-xs relative mb-12 backdrop-blur-sm">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] bg-white rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${signupType === "creator" ? "left-1.5" : "left-[calc(50%+0.375rem)]"}`}
            ></div>
            <button
              type="button"
              onClick={() => setSignupType("creator")}
              className={`flex-1 py-3.5 rounded-full text-[10px] uppercase tracking-[0.4em] font-mono transition-colors duration-500 cursor-hover relative z-10 ${signupType === "creator" ? "text-black font-bold" : "text-gray-400 hover:text-white font-semibold"}`}
            >
              Creator
            </button>
            <button
              type="button"
              onClick={() => setSignupType("brand")}
              className={`flex-1 py-3.5 rounded-full text-[10px] uppercase tracking-[0.4em] font-mono transition-colors duration-500 cursor-hover relative z-10 ${signupType === "brand" ? "text-black font-bold" : "text-gray-400 hover:text-white font-semibold"}`}
            >
              Brand
            </button>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-extrabold brand-font leading-[0.85] mb-10 text-white">
            <div className="reveal-mask h-[1.1em] overflow-hidden -mb-2">
                <span className="block italic font-light opacity-90 reveal-text-inner text-gray-400">Join</span>
            </div>
            <div className="reveal-mask h-[1.1em] overflow-hidden -mb-2">
                <span className="block font-medium opacity-90 reveal-text-inner text-white">The</span>
            </div>
            <div className="reveal-mask overflow-hidden">
                <span className="liquid-metal pb-4 reveal-text-inner font-bold">Movement.</span>
            </div>
          </h1>
          <p className="signup-desc text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
            Strategy meets culture. Connecting innovative brands with voices that command attention. Join a movement that understands that in the digital era, only the bold survive.
          </p>
        </div>

        <div className="relative w-full max-w-xl mx-auto lg:mx-0 lg:ml-auto mt-12 md:mt-0 xl:max-w-2xl">
          
          <div className="glass-card service-card-anim rounded-[2.5rem] p-8 md:p-14 flex flex-col justify-between group relative overflow-hidden cursor-hover w-full border border-white/12 opacity-0 relative z-10 shadow-lg">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 p-40 bg-[#ebac38]/10 group-hover:bg-[#ebac38]/20 blur-[120px] rounded-full pointer-events-none transition-colors duration-500"></div>
              
              <div className="relative z-10 w-full mb-8 flex-1">
                <h3 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 brand-font text-white tracking-tight">Send Request</h3>
                <form id="signup-form" onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="flex flex-col signup-field opacity-0">
                      <label className={labelClasses}>First Name</label>
                      <input name="fname" required type="text" className={inputClasses} placeholder="Your name" />
                    </div>
                    <div className="flex flex-col signup-field opacity-0">
                      <label className={labelClasses}>Last Name</label>
                      <input name="lname" required type="text" className={inputClasses} placeholder="Last name" />
                    </div>
                  </div>

                  <div className="flex flex-col signup-field opacity-0">
                    <label className={labelClasses}>Email Address</label>
                    <input name="email" required type="email" className={inputClasses} placeholder="example@agency.com" />
                  </div>

                  {signupType === "creator" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col signup-field opacity-0">
                        <label className={labelClasses}>Handle</label>
                        <input name="handle" required type="text" className={inputClasses} placeholder="@username" />
                      </div>
                      <div className="flex flex-col signup-field opacity-0">
                        <label className={labelClasses}>Niche</label>
                        <input name="niche" required type="text" className={inputClasses} placeholder="Your focus" />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col signup-field opacity-0">
                        <label className={labelClasses}>Brand</label>
                        <input name="brand" required type="text" className={inputClasses} placeholder="Company Name" />
                      </div>
                      <div className="flex flex-col signup-field opacity-0">
                        <label className={labelClasses}>Objective</label>
                        <input name="objective" required type="text" className={inputClasses} placeholder="What are we scaling?" />
                      </div>
                    </div>
                  )}
                </form>
              </div>

              <div className="relative z-10 flex items-center justify-between mt-12 pt-8 border-t border-white/10">
                  {/* The Badges */}
                  <div className="flex flex-wrap gap-3 opacity-90 group-hover:opacity-100 transition-opacity">
                      <span className="px-5 py-2.5 border border-white/15 rounded-full text-[10px] uppercase tracking-widest text-gray-300 font-semibold font-mono backdrop-blur-sm bg-white/5">
                        {signupType === "creator" ? "Strategy" : "Growth"}
                      </span>
                      <span className="px-5 py-2.5 border border-white/15 rounded-full text-[10px] uppercase tracking-widest text-gray-300 font-semibold font-mono backdrop-blur-sm bg-white/5 hidden sm:block">
                        {signupType === "creator" ? "Scaling" : "Campaigns"}
                      </span>
                  </div>

                  {/* The Arrow Button */}
                  <button
                      form="signup-form"
                      type="submit"
                      className="relative p-5 bg-white text-black hover:bg-gray-100 border border-white rounded-full transition-all duration-300 z-20 cursor-hover shadow-[0_0_30px_rgba(255,255,255,0.25)] overflow-hidden group/btn flex-shrink-0"
                  >
                  <div className="absolute inset-0 bg-gray-100 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 relative z-10 block"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
