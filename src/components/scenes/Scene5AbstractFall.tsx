'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Scene5AbstractFall() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.falling-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        }
      });

      // tunnel effect placeholder removed for snappiness

      // Words falling up as we fall down
      tl.fromTo(words,
        { y: '80vh', opacity: 0, scale: 0.5 },
        {
          y: '-80vh', opacity: 1, scale: () => 1.2 + Math.random(),
          duration: 2, stagger: 0.3, ease: 'power1.inOut'
        }
      );

      // Transform into a confident designer
      tl.fromTo('.transformation-text',
          { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
          { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'power2.out' }
        );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full relative bg-transparent overflow-hidden">

      {/* Floating Words Container */}
      <div ref={wordsRef} className="absolute inset-0 flex items-center justify-center font-bold text-4xl md:text-7xl">
        <span className="falling-word absolute text-red-500/80 left-[10%] drop-shadow-lg">Tried</span>
        <span className="falling-word absolute text-orange-500/80 right-[20%] drop-shadow-lg">Failed</span>
        <span className="falling-word absolute text-blue-500/80 left-[30%] drop-shadow-lg">Learned</span>
        <span className="falling-word absolute text-emerald-500/80 right-[15%] text-6xl md:text-9xl drop-shadow-2xl">Built Again</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="transformation-text text-white text-3xl md:text-6xl font-serif text-center px-4 opacity-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          Becoming a <br className="md:hidden" /><span className="text-yellow-400 italic">Confident Designer</span>
        </h2>
      </div>

    </section>
  );
}
