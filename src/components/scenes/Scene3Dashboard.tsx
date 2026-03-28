'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Scene3Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.dash-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      // Cards appear and float up
      tl.fromTo(cards,
        { y: 100, opacity: 0, scale: 0.9, rotationX: 15 },
        {
          y: 0, opacity: 1, scale: 1, rotationX: 0,
          duration: 1.5, stagger: 0.2, ease: "back.out(1.2)"
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-transparent flex flex-col items-center justify-center overflow-hidden perspective-1000">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />

      <h2 className="dash-card absolute top-24 text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500 tracking-tight">
        Transformation
      </h2>

      <div ref={cardsRef} className="flex flex-col md:flex-row gap-6 md:gap-8 mt-16 z-10 px-6 w-full max-w-6xl justify-center">

        {/* Education Card */}
        <div className="dash-card flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30 group-hover:scale-110 transition-transform">
            <span className="text-xl">🎓</span>
          </div>
          <h3 className="text-white font-medium text-xl mb-2">Education</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Transitioning from traditional studies to full-scale digital creation and interactive media.
          </p>
        </div>

        {/* Skills Card */}
        <div className="dash-card flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30 group-hover:scale-110 transition-transform">
            <span className="text-xl">🛠️</span>
          </div>
          <h3 className="text-white font-medium text-xl mb-2">Skills Found</h3>
          <div className="flex flex-wrap gap-2 mt-4">
            {['UI/UX', 'Figma', 'Prototyping', 'Visual Design'].map(skill => (
              <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/5">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements Card */}
        <div className="dash-card flex-1 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30 group-hover:scale-110 transition-transform">
            <span className="text-xl">🏆</span>
          </div>
          <h3 className="text-white font-medium text-xl mb-2">3+ Years</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Consistently delivering high-impact designs, evolving from simple interfaces to immersive experiences.
          </p>
        </div>

      </div>
    </section>
  );
}
