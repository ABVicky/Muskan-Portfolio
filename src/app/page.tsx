'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLenis } from '@studio-freight/react-lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor from '@/components/Cursor';
import SmoothScroll from '@/components/SmoothScroll';

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
  const [scroll, setScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollCounterRef = useRef<HTMLParagraphElement>(null);

  // Sync global scroll state for fixed narrative elements
  useLenis(({ scroll }) => {
    setScroll(scroll);
    if (scrollCounterRef.current) {
      scrollCounterRef.current.innerText = Math.floor(scroll).toString().padStart(6, '0');
    }
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
        gsap.set('.warp-section', { opacity: 1, y: 0 });
    }, containerRef);

    return () => ctx.revert();
  }, [mode]);

  return (
    <>
      <Cursor />
      
      {/* Fixed Cinematic Layer - ALWAYS STATIONARY */}
      {mode && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
           <City3D />
           
           {/* Fixed Narrative Elements (Scene 2 & 3) */}
           {mode === 'story' && (
             <div className="absolute inset-0 z-10 pointer-events-none">
                <Scene2Sketch scroll={scroll} />
                <Scene3Dashboard scroll={scroll} />
             </div>
           )}
           
           {/* Futuristic HUD Overlay */}
           <div className="absolute inset-0 z-50 p-4 md:p-10 flex flex-col justify-between pointer-events-none">
              <div className="flex justify-between items-start font-mono text-[9px] md:text-xs">
                <div className="space-y-1 bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-2xl pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="tracking-[0.5em] text-white font-black">PROTO_ID: MUSKAN_01</span>
                  </div>
                  <p className="opacity-80 text-[8px] md:text-[10px] text-cyan-300">SYSTEMS INITIALIZED // VISUAL_ENGINE</p>
                </div>
                <div className="text-right pointer-events-auto">
                   <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter text-shimmer leading-none drop-shadow-2xl">
                     MUSKAN
                   </h1>
                </div>
              </div>

              <div className="flex justify-between items-end font-mono text-[9px] md:text-xs">
                 <div className="max-w-xs space-y-2 bg-black/60 backdrop-blur-xl p-4 rounded-xl border border-white/20 shadow-2xl pointer-events-auto">
                    <div className="h-[1px] w-28 bg-cyan-400/40" />
                    <p className="text-white tracking-widest"><span className="text-emerald-500">LIVE:</span> PORTFOLIO_V2.0</p>
                    <p className="text-white">KOLKATA_NET: 22.57N | 88.36E</p>
                 </div>
                 <div className="text-right flex flex-col items-end pointer-events-auto">
                    <div className="w-28 h-[1px] bg-white/30 mb-2" />
                    <p ref={scrollCounterRef} className="text-[24px] md:text-[52px] font-black tracking-tighter tabular-nums text-white text-shimmer leading-none">
                       000000
                    </p>
                 </div>
              </div>
           </div>
           
           <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.05] bg-[url('https://res.cloudinary.com/dzvxs72nx/image/upload/v1711617006/static/grain_overlay.png')]" />
        </div>
      )}

      {/* Wrapped Scrollable Content - Only this part uses smooth scroll */}
      <SmoothScroll>
        <main ref={containerRef} className="text-white selection:bg-white selection:text-black overflow-x-hidden scanlines min-h-screen">
          {!mode ? (
            <Scene1Void onStart={(selectedMode) => {
              window.scrollTo(0, 0); 
              setMode(selectedMode);
            }} />
          ) : (
            <div className="w-full relative z-10 transform-style-3d">
              <div className="w-full">
                {/* Story Placeholder Sections to provide scroll length for fixed narrations */}
                {mode === 'story' && (
                  <div className="flex flex-col">
                    <div id="story-trigger-2" className="h-[250vh] w-full border-t border-transparent" />
                    <div id="story-trigger-3" className="h-[200vh] w-full border-t border-transparent" />
                    <div className="warp-section"><Scene4Glitch /></div>
                    <div className="warp-section"><Scene5AbstractFall /></div>
                  </div>
                )}

                {/* Main Works Section */}
                <div className="flex flex-col">
                  <div className="warp-section"><Scene6DesignWorld /></div>
                  <div className="warp-section"><Scene7Process /></div>
                  <div className="warp-section"><Scene8Clarity /></div>
                  <div className="warp-section"><Scene9Contact /></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </SmoothScroll>
    </>
  );
}


