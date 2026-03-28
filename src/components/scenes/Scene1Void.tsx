'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, FastForward } from 'lucide-react';

interface Scene1Props {
  onStart: (mode: 'story' | 'quick') => void;
}

export default function Scene1Void({ onStart }: Scene1Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const [showActions, setShowActions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRef.current,
      { opacity: 0, y: 20, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 2.5, ease: "power2.out", delay: 0.5 }
    ).to(textRef.current, {
      opacity: 0, y: -20, filter: 'blur(5px)', duration: 1.5, ease: "power2.in", delay: 2,
      onComplete: () => setShowActions(true)
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (showActions && actionsRef.current) {
      gsap.fromTo(
        actionsRef.current,
        { opacity: 0, scale: 0.9, filter: 'brightness(0.5)' },
        { opacity: 1, scale: 1, filter: 'brightness(1)', duration: 1.5, ease: "expo.out" }
      );
    }
  }, [showActions]);

  const handleStart = (mode: 'story' | 'quick') => {
    setIsTransitioning(true);
    
    const isQuick = mode === 'quick';
    const tl = gsap.timeline({
      onComplete: () => onStart(mode)
    });

    // Intro Glitch Sequence
    tl.to(containerRef.current, {
       duration: isQuick ? 0.05 : 0.1,
       filter: 'invert(1) hue-rotate(90deg) contrast(200%)',
       x: 15,
       skewX: 10
    })
    .to(containerRef.current, {
       duration: isQuick ? 0.05 : 0.1,
       filter: 'none',
       x: -15,
       skewX: -10
    })
    .to(containerRef.current, {
       duration: isQuick ? 0.05 : 0.1,
       filter: 'contrast(500%) sepia(1)',
       scale: 1.12
    })
    .to(containerRef.current, {
       duration: isQuick ? 0.2 : 0.5,
       opacity: 0,
       scale: 1.5,
       filter: 'blur(30px)',
       ease: isQuick ? "expo.out" : "power4.in"
    });
  };

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center font-sans z-[100] ${isTransitioning ? 'pointer-events-none' : ''}`}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] pointer-events-none" />
      
      {!showActions && (
        <div
          ref={textRef}
          className="text-2xl md:text-5xl font-light text-white opacity-0 tracking-[0.2em] text-center px-4 uppercase"
        >
          Every story starts <br /> from nothing...
        </div>
      )}

      {showActions && !isTransitioning && (
        <div ref={actionsRef} className="flex flex-col items-center gap-12 opacity-0">
          <button
            onClick={() => handleStart('story')}
            className="group flex flex-col items-center gap-6 hover:scale-105 transition-transform duration-500"
          >
            <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/50 transition-all duration-700 backdrop-blur-xl relative overflow-hidden">
               {/* Animated Ring */}
               <div className="absolute inset-0 border-2 border-transparent border-t-white/20 rounded-full animate-spin duration-3000" />
               <Play className="w-10 h-10 text-white fill-white/10 ml-1 group-hover:text-cyan-400 group-hover:fill-cyan-400/20 transition-all duration-500" />
            </div>
            <div className="flex flex-col items-center gap-1">
               <span className="text-white/80 tracking-[0.5em] text-sm uppercase group-hover:text-white transition-colors duration-500">
                 Enter Story
               </span>
               <span className="text-[10px] text-white/30 tracking-widest font-mono group-hover:text-cyan-400/50 transition-colors">
                 INIT_KOLKATA_PROTOCOL
               </span>
            </div>
          </button>

          <button
            onClick={() => handleStart('quick')}
            className="group flex flex-col items-center gap-2 mt-8 text-white/40 hover:text-white transition-all duration-300"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.3em]">Direct Access</span>
              <FastForward className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="h-[1px] w-0 group-hover:w-full bg-white/20 transition-all duration-500" />
          </button>
        </div>
      )}

      {/* Grid Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}

