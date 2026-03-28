'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Scene2Sketch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const pathsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const paths = pathsRef.current?.querySelectorAll('path') || [];

      // Calculate path lengths for drawing effect
      paths.forEach((path) => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.out",
        stagger: 0.1
      })
        .fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        )
        .to({}, { duration: 0.5 }); // padding at the end
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-transparent flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

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
         <h2 ref={textRef} className="text-white text-3xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight opacity-0">
            Constructing <br/> <span className="text-cyan-400">Digital Realities</span>
         </h2>
      </div>
    </section>
  );
}
