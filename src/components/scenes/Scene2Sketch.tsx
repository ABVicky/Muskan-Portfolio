'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Scene2Sketch({ scroll }: { scroll: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pathsRef = useRef<SVGGElement>(null);

  // Narrative Range for Scene 2 (Adjusted to match placeholder in page.tsx)
  const START = 600; 
  const END = 2600; 
  const isActive = scroll >= START - 500 && scroll <= END + 500;

  useEffect(() => {
    if (!isActive) return;

    const paths = pathsRef.current?.querySelectorAll('path') || [];
    const progress = Math.max(0, Math.min(1, (scroll - START) / (END - START)));
    
    // Draw paths based on scroll progress
    paths.forEach((path: any) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length * (1 - progress * 1.5)}`; // Multiply by 1.5 for faster drawing
    });

    // Content Opacity (Peaks in the middle)
    const contentOpacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;
    if (containerRef.current) {
      containerRef.current.style.opacity = Math.max(0, Math.min(1, contentOpacity)).toString();
    }
  }, [scroll, isActive]);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <svg
        width="600" height="600" viewBox="0 0 100 100"
        className="stroke-white fill-transparent relative z-10 transform-style-3d drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
        style={{ strokeWidth: 0.8 }}
      >
        <g ref={pathsRef} className="animate-glow-breath">
          <path d="M10 50 L50 15 L90 50" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20 50 L20 85 L80 85 L80 50" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 85 L40 60 L60 60 L60 85" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M65 40 L65 20 L75 20 L75 48" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>

      <div className="absolute bottom-24 text-center z-20">
         <h2 ref={textRef} className="text-white text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight drop-shadow-2xl">
            Constructing <br/> <span className="text-cyan-400">Digital Realities</span>
         </h2>
      </div>
    </div>
  );
}
