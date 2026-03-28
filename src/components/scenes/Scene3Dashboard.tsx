'use client';

import { useEffect, useRef } from 'react';

const stats = [
  { id: 1, label: 'Graphic Design', value: 'PRO', icon: '🎨' },
  { id: 2, label: 'Industry Exp', value: '3 YRS', icon: '⚡' },
  { id: 3, label: 'Creative Depth', value: 'MAX', icon: '✨' },
];

export default function Scene3Dashboard({ scroll }: { scroll: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Narrative Range (Matches placeholder in page.tsx)
  const START = 2600;
  const END = 4600;
  const isActive = scroll >= START - 500 && scroll <= END + 500;

  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const progress = Math.max(0, Math.min(1, (scroll - START) / (END - START)));
    
    // Content Opacity (Peaks in the middle)
    const opacity = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;
    containerRef.current.style.opacity = Math.max(0, Math.min(1, opacity)).toString();
    
    // Animate cards based on progress
    const cards = containerRef.current.querySelectorAll('.dashboard-card');
    cards.forEach((card: any, i) => {
      const cardProgress = Math.max(0, Math.min(1, (progress - (i * 0.15)) * 3));
      card.style.opacity = Math.max(0, Math.min(1, cardProgress)).toString();
      card.style.transform = `translateY(${(1 - Math.max(0, Math.min(1, cardProgress))) * 40}px) scale(${0.95 + Math.max(0, Math.min(1, cardProgress)) * 0.05})`;
    });

  }, [scroll, isActive]);

  if (!isActive) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full flex flex-col items-center justify-center p-6 md:p-32 transition-opacity duration-300 pointer-events-none"
      style={{ opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 w-full pointer-events-auto">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="dashboard-card glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-white/20 transition-all duration-500 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-4xl">{stat.icon}</span>
              </div>
              
              <h3 className="text-white/40 font-mono text-xs mb-2 tracking-widest uppercase">{stat.label}</h3>
              <p className="text-white text-4xl md:text-6xl font-black italic tracking-tighter mb-4">{stat.value}</p>
              
              <div className="space-y-2">
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-cyan-400 w-3/4 animate-[shimmer_2s_infinite]" />
                </div>
                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Efficiency: OPTIMIZED</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
