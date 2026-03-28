'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Scene4Glitch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        }
      });

      // Quick Glitch sequence
      tl.to(containerRef.current, { filter: 'invert(1) hue-rotate(90deg)', duration: 0.1 })
        .to(containerRef.current, { filter: 'none', duration: 0.1 })
        .to(containerRef.current, { filter: 'contrast(200%) grayscale(1)', duration: 0.1 })
        .to(containerRef.current, { filter: 'none', duration: 0.1 })
        .fromTo(textRef.current,
          { scale: 1, opacity: 1, textShadow: 'none' },
          {
            scale: 1.1,
            opacity: 1,
            textShadow: '4px 4px 0px rgba(255,0,0,0.8), -4px -4px 0px rgba(0,255,0,0.8), 0px 0px 10px rgba(0,0,255,0.8)',
            duration: 0.5,
            ease: "steps(5)"
          }
        )
        .to(textRef.current, { opacity: 0, scale: 5, duration: 1, ease: 'power4.in' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-transparent flex flex-col items-center justify-center overflow-hidden relative">
      <h2 ref={textRef} className="text-white text-5xl md:text-8xl font-black uppercase tracking-tighter">
        Reality Break
      </h2>
      <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38bIhsXACAQYAOQAQ6sBoJ/9u+WAAAAAElFTkSuQmCC')] opacity-20 pointer-events-none mix-blend-overlay" />
    </section>
  );
}
