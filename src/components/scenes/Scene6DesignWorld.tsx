'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Visual Identity', type: 'Branding & UI', image: '/works/work1.jpg', width: 1024, height: 1536 },
  { id: 2, title: 'Digital Space', type: 'Web Experience', image: '/works/work2.jpg', width: 1024, height: 1536 },
  { id: 3, title: 'Future Hub', type: 'Product Design', image: '/works/work3.jpg', width: 1600, height: 872 },
  { id: 4, title: 'Interface Flow', type: 'UX Research', image: '/works/work4.jpg', width: 1024, height: 1536 },
  { id: 5, title: 'Smart App', type: 'App Design', image: '/works/work5.jpg', width: 387, height: 1600 },
  { id: 6, title: 'Creative Art', type: 'Social Media', image: '/works/work6.jpg', width: 1536, height: 1024 },
  { id: 7, title: 'Geometric Forms', type: 'Digital Art', image: '/works/IMG-20260510-WA0004.jpg', width: 1254, height: 1254 },
  { id: 8, title: 'Fluid Design', type: 'Visual Concept', image: '/works/IMG-20260510-WA0005.jpg', width: 1254, height: 1254 },
  { id: 9, title: 'Cosmic Voyage', type: 'Illustration', image: '/works/IMG-20260510-WA0006.jpg', width: 1254, height: 1254 },
  { id: 10, title: 'Urban Grid', type: 'Architectural', image: '/works/IMG-20260510-WA0007.jpg', width: 1254, height: 1254 },
  { id: 11, title: 'Neon Dreams', type: 'Cyberpunk Art', image: '/works/IMG-20260510-WA0008.jpg', width: 1254, height: 1254 },
  { id: 12, title: 'Organic Shapes', type: 'Graphic Poster', image: '/works/IMG-20260510-WA0009.jpg', width: 1254, height: 1254 },
  { id: 13, title: 'Minimalist Space', type: 'Spatial Design', image: '/works/IMG-20260510-WA0010.jpg', width: 1254, height: 1254 },
  { id: 14, title: 'Dynamic Motion', type: 'Animation Frame', image: '/works/IMG-20260510-WA0011.jpg', width: 1254, height: 1254 },
  { id: 15, title: 'Harmony', type: 'Color Study', image: '/works/IMG-20260510-WA0012.jpg', width: 1254, height: 1254 },
  { id: 16, title: 'Retro Wave', type: 'Vector Graphics', image: '/works/IMG-20260510-WA0013.jpg', width: 1254, height: 1254 },
  { id: 17, title: 'Abstract Logic', type: 'Concept UI', image: '/works/IMG-20260510-WA0014.jpg', width: 1254, height: 1254 },
  { id: 18, title: 'Texture Study', type: 'Material Design', image: '/works/IMG-20260510-WA0015.jpg', width: 1254, height: 1254 },
];

export default function Scene6DesignWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const navigateProject = (direction: number) => {
    if (!selectedProject) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = projects.length - 1;
    if (nextIndex >= projects.length) nextIndex = 0;
    setSelectedProject(projects[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === 'Escape') setSelectedProject(null);
      if (e.key === 'ArrowRight') navigateProject(1);
      if (e.key === 'ArrowLeft') navigateProject(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const refreshScroll = () => {
        const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
        const windowWidth = window.innerWidth;
        
        if (scrollWidth === 0) return;

        gsap.to(scrollContainerRef.current, {
          x: -(scrollWidth - windowWidth),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${scrollWidth}`, 
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        });
        
        // Card entrance animation
        gsap.from('.project-card', {
          opacity: 0,
          y: 60,
          scale: 0.9,
          stagger: 0.05,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          }
        });
      };

      // Initial call with a slight delay
      const timer = setTimeout(() => {
        refreshScroll();
        ScrollTrigger.refresh();
      }, 500);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-transparent flex items-center overflow-hidden relative">
      {/* HUD-aligned Title Card */}
      <div className="absolute top-24 left-6 md:top-36 md:left-12 z-20">
        <h2 className="text-white text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 border-b-2 border-cyan-400/20 pb-1">Works</span>
        </h2>
        <p className="text-gray-400 mt-4 font-mono text-sm max-w-md bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/5 hidden md:block">
          Exploring the boundaries of digital interaction through visual storytelling.
        </p>
      </div>

      <div ref={scrollContainerRef} className="flex gap-16 md:gap-32 px-[5vw] pt-24 h-[70vh] items-center z-10">
        {projects.map((project) => {
          const ratio = project.width / project.height;
          // Clamp display aspect ratio to keep horizontal card rhythms balanced
          const displayRatio = Math.max(0.55, Math.min(1.8, ratio));
          
          return (
            <div 
              key={project.id} 
              onClick={() => setSelectedProject(project)}
              className="project-card relative group h-full flex-shrink-0 cursor-pointer perspective-2000"
              style={{ width: `calc(min(70vh * ${displayRatio}, 85vw))` }}
            >
              <div className="absolute inset-0 rounded-3xl transition-all duration-700 ease-out transform-style-3d group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-105 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                
                {/* Image Container with Parallax Effect */}
                <div className="absolute inset-0 bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-colors duration-500 group-hover:border-white/30">
                  <div 
                    className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-125 transition-transform duration-[2s] ease-out opacity-60 group-hover:opacity-100"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10 z-10">
                    <span className="text-white/40 font-mono text-xs mb-2 tracking-widest group-hover:text-white/70 transition-colors uppercase">
                      Case Study 0{project.id}
                    </span>
                    <h3 className="text-white text-4xl md:text-6xl font-bold mb-3 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 uppercase tracking-tighter">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                      <p className="text-gray-400 uppercase tracking-[0.3em] text-[10px] sm:text-xs">
                        {project.type}
                      </p>
                      <div className="h-px flex-1 bg-white/20" />
                    </div>
                  </div>

                  {/* Floating Micro Interaction Button */}
                  <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700 delay-300 bg-white/5 backdrop-blur-xl group-hover:bg-white/20 group-hover:border-white/30 shadow-2xl">
                    <span className="text-white text-2xl group-hover:rotate-45 transition-transform duration-500">↗</span>
                  </div>
                </div>

                {/* Back Glow Effect */}
                <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal Overlay */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 transition-opacity duration-300 pointer-events-auto"
          onClick={() => setSelectedProject(null)}
        >
          {/* Close Button */}
          <button 
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/25 hover:border-white/30 transition-all text-white text-3xl font-light cursor-pointer shadow-lg"
          >
            ×
          </button>

          {/* Navigation Controls */}
          <button 
            onClick={(e) => { e.stopPropagation(); navigateProject(-1); }}
            className="absolute left-4 md:left-8 z-[10000] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/25 hover:border-white/30 transition-all text-white text-2xl cursor-pointer select-none shadow-lg"
          >
            ‹
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); navigateProject(1); }}
            className="absolute right-4 md:right-8 z-[10000] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/25 hover:border-white/30 transition-all text-white text-2xl cursor-pointer select-none shadow-lg"
          >
            ›
          </button>

          {/* Lightbox Content Container */}
          <div 
            className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-16 relative z-10 pointer-events-auto bg-black/50 p-6 md:p-8 rounded-3xl border border-white/5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* High-Resolution Full Image (object-contain) */}
            <div className="relative w-full md:w-[65%] h-[40vh] md:h-[75vh] flex items-center justify-center bg-zinc-950/40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-25 blur-3xl scale-110"
                style={{ backgroundImage: `url(${selectedProject.image})` }}
              />
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="max-h-full max-w-full object-contain relative z-10 rounded-xl shadow-2xl"
              />
            </div>

            {/* Metadata Card */}
            <div className="w-full md:w-[35%] text-left space-y-4 md:space-y-6">
              <div>
                <span className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] block mb-2">
                  CASE_STUDY_0{selectedProject.id}
                </span>
                <h3 className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none mb-3">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-400 uppercase tracking-[0.2em] text-xs font-semibold">
                  {selectedProject.type}
                </p>
              </div>
              
              <div className="h-[1px] w-full bg-white/10" />

              <div className="space-y-2 font-mono text-[9px] md:text-[11px] text-gray-500 uppercase tracking-widest">
                <p><span className="text-white/40">RESOLUTION:</span> {selectedProject.width} × {selectedProject.height} PX</p>
                <p><span className="text-white/40">ASPECT RATIO:</span> {(selectedProject.width / selectedProject.height).toFixed(2)}:1</p>
                <p><span className="text-white/40">STATUS:</span> ACTIVE_VISIBILITY</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
