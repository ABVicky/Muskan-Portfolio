'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from '@/components/Cursor';

const City3D = dynamic(() => import('@/components/City3D'), { ssr: false });
const Scene1Void = dynamic(() => import('@/components/scenes/Scene1Void'), { ssr: false });
const Scene2Sketch = dynamic(() => import('@/components/scenes/Scene2Sketch'), { ssr: false });
const Scene3Dashboard = dynamic(() => import('@/components/scenes/Scene3Dashboard'), { ssr: false });
const Scene4Glitch = dynamic(() => import('@/components/scenes/Scene4Glitch'), { ssr: false });
const Scene5AbstractFall = dynamic(() => import('@/components/scenes/Scene5AbstractFall'), { ssr: false });
const Scene6DesignWorld = dynamic(() => import('@/components/scenes/Scene6DesignWorld'), { ssr: false });
const Scene7Process = dynamic(() => import('@/components/scenes/Scene7Process'), { ssr: false });
const Scene8Clarity = dynamic(() => import('@/components/scenes/Scene8Clarity'), { ssr: false });
const Scene9Contact = dynamic(() => import('@/components/scenes/Scene9Contact'), { ssr: false });

export default function Home() {
  const [mode, setMode] = useState<'story' | 'quick' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollCounterRef = useRef<HTMLParagraphElement>(null);

  // High-performance scroll tracking for the HUD counter only
  useLenis(({ scroll }) => {
    if (scrollCounterRef.current) {
      scrollCounterRef.current.innerText = Math.floor(scroll).toString().padStart(6, '0');
    }
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
        const sections = gsap.utils.toArray('.warp-section');
        sections.forEach((section: any) => {
            gsap.fromTo(section, 
                { opacity: 0, y: 100 },
                { 
                    opacity: 1, y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        end: "top 30%",
                        scrub: 1,
                    }
                }
            );
        });
    }, containerRef);

    return () => ctx.revert();
  }, [mode]);

  return (
    <main ref={containerRef} className="relative min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden scanlines">
      <Cursor />
      {/* 3D City Background - Persistent Atmosphere */}
      {mode && <City3D />}

      {/* Futuristic HUD Overlay */}
      {mode && (
        <div className="fixed inset-0 pointer-events-none z-50 p-6 md:p-12 flex flex-col justify-between mix-blend-difference">
          <div className="flex justify-between items-start font-mono text-[10px] md:text-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="tracking-[0.4em] text-white">PROTO_ID: MUSKAN_01</span>
              </div>
              <p className="opacity-60">DESIGNER // VISUAL_STRATEGIST</p>
            </div>
            <div className="text-right">
               <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter text-shimmer">
                 MUSKAN
               </h1>
            </div>
          </div>

          <div className="flex justify-between items-end font-mono text-[10px] md:text-xs">
             <div className="max-w-xs space-y-2 opacity-60">
                <div className="h-[1px] w-32 bg-white/20" />
                <p>STATUS: PORTFOLIO_MODE_ACTIVE</p>
                <p>KOLKATA_COORDS: 22.57N | 88.36E</p>
             </div>
             <div className="text-right flex flex-col items-end">
                <div className="w-32 h-[1px] bg-white/10 mb-2" />
                <p ref={scrollCounterRef} className="text-[24px] font-black tracking-tighter tabular-nums text-white">
                   000000
                </p>
             </div>
          </div>
        </div>
      )}

      {/* Extreme overlay - Noise */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://res.cloudinary.com/dzvxs72nx/image/upload/v1711617006/static/grain_overlay.png')] mix-blend-overlay" />

      {!mode ? (
        <Scene1Void onStart={(selectedMode) => {
          window.scrollTo(0, 0); // Reset scroll on start
          setMode(selectedMode);
        }} />
      ) : (
        <div className="w-full relative z-10 transform-style-3d">
          {/* We render the origin sequence only if the user chooses 'story' */}
          {mode === 'story' && (
            <div className="space-y-0">
              <div className="warp-section"><Scene2Sketch /></div>
              <div className="warp-section"><Scene3Dashboard /></div>
              <div className="warp-section"><Scene4Glitch /></div>
              <div className="warp-section"><Scene5AbstractFall /></div>
            </div>
          )}

          {/* Quick mode users skip directly here, Story mode users flow naturally into here */}
          <div className="space-y-0">
            <div className="warp-section"><Scene6DesignWorld /></div>
            <div className="warp-section"><Scene7Process /></div>
            <div className="warp-section"><Scene8Clarity /></div>
            <div className="warp-section"><Scene9Contact /></div>
          </div>
        </div>
      )}
    </main>
  );
}


