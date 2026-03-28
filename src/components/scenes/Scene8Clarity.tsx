'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Scene8Clarity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      });

      tl.fromTo(text1Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(text1Ref.current, { opacity: 0.3, duration: 0.5 })
        .fromTo(text2Ref.current, { opacity: 0, y: 50, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power2.out' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-[120vh] w-full bg-transparent flex flex-col items-center justify-center relative">
      <h2 className="text-4xl md:text-7xl font-sans text-center max-w-5xl px-4 leading-tight text-white tracking-tighter">
        <span ref={text1Ref} className="block mb-4 text-gray-500 font-light">
          I don't just design visuals.
        </span>
        <span ref={text2Ref} className="block font-black italic">
          I design <span className="text-blue-500 uppercase">experiences</span>.
        </span>
      </h2>
    </section>
  );
}
