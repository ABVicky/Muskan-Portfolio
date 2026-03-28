'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
  { id: '01', title: 'Problem Definition', desc: 'Understanding the core user pain points and business goals.' },
  { id: '02', title: 'Research & Discover', desc: 'Analyzing competitors, user interviews, and market trends.' },
  { id: '03', title: 'Wireframing', desc: 'Structuring the layout and user flow before visual design.' },
  { id: '04', title: 'UI Design', desc: 'Applying colors, typography, and interactive elements.' },
  { id: '05', title: 'Final Output', desc: 'Delivering a polished, development-ready experience.' }
];

export default function Scene7Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Use a timeout to ensure preceding pinned sections (Scene 6) have calculated their spacers
      const timer = setTimeout(() => {
        const stepElements = gsap.utils.toArray('.process-step');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const index = Math.min(Math.floor(self.progress * steps.length), steps.length - 1);
              setActiveStep(index);
            }
          }
        });

        // Parallax on the list container
        tl.to(stepsContainerRef.current, { y: -200, duration: 1 });
        
        ScrollTrigger.refresh();
      }, 750); // Matching/Exceeding Scene 6 stabilization

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-transparent text-white flex items-center overflow-hidden relative perspective-2000">
      {/* Dynamic 3D Grid background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          transform: `perspective(500px) rotateX(60deg) translateY(${activeStep * -20}px)`,
          transition: 'transform 1s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }} 
      />

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">

        {/* Left Side: Fixed Title & Dynamic Content with 3D Float */}
        <div className="flex flex-col justify-center transform-style-3d">
          <div className="relative group transition-all duration-1000 transform hover:scale-105 hover:rotate-y-1">
            <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-gray-800 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
              The Process
            </h2>
            <p className="text-xl text-gray-400 font-mono italic mb-12 max-w-md border-l-2 border-blue-500/40 pl-6 bg-blue-500/5 py-4 rounded-r-xl">
              Mapping chaos into <span className="text-blue-400 underline decoration-dotted">structured output</span>.
            </p>
          </div>

          <div className="relative h-48 perspective-1000">
            {steps.map((step, index) => (
              <div
                key={step.id} 
                className={`absolute inset-0 transition-all duration-1000 ease-out transform ${index === activeStep ? 'opacity-100 translate-y-0 translate-z-0 scale-100 blur-0' : 'opacity-0 -translate-y-20 -translate-z-20 scale-90 blur-xl'}`}
              >
                <div className="text-[10rem] font-black text-blue-500/10 absolute -z-10 -top-24 -left-12 select-none tracking-tighter animate-pulse">{step.id}</div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                  <h3 className="text-3xl font-bold mb-3 flex items-center gap-3">
                     <span className="w-2 h-8 bg-blue-500 rounded-full" />
                     {step.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed font-light">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Tech Vertical Timeline */}
        <div className="relative h-[80vh] overflow-hidden hidden md:block border-l border-white/10 pl-16">
          {/* Vertical Progress Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-white/5 overflow-hidden">
             <div 
                className="w-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,1)] transition-all duration-700 ease-out"
                style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
             />
          </div>

          <div ref={stepsContainerRef} className="flex flex-col gap-24 pt-[40vh]">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`process-step flex items-center gap-6 transition-all duration-700 ${index === activeStep ? 'opacity-100 scale-110 translate-x-4 brightness-125' : 'opacity-20 scale-100 translate-x-0 brightness-50'}`}
              >
                <span className={`text-sm font-mono ${index === activeStep ? 'text-blue-400' : 'text-white/20'}`}>
                   [{index + 1}]
                </span>
                <h4 className="text-2xl font-black tracking-widest uppercase italic">{step.title}</h4>
                {index === activeStep && (
                   <div className="w-12 h-px bg-blue-500 animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
