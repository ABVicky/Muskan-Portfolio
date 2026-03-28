'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
  { id: 1, title: 'Visual Identity', type: 'Branding & UI', image: '/works/work1.jpg' },
  { id: 2, title: 'Digital Space', type: 'Web Experience', image: '/works/work2.jpg' },
  { id: 3, title: 'Future Hub', type: 'Product Design', image: '/works/work3.jpg' },
  { id: 4, title: 'Interface Flow', type: 'UX Research', image: '/works/work4.jpg' },
  { id: 5, title: 'Smart App', type: 'App Design', image: '/works/work5.jpg' },
  { id: 6, title: 'Creative Art', type: 'Social Media', image: '/works/work6.jpg' },
];

export default function Scene6DesignWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainerRef.current?.scrollWidth || 0;
      const windowWidth = window.innerWidth;

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
        }
      });
      
      // Card entrance animation
      gsap.from('.project-card', {
        opacity: 0,
        y: 100,
        scale: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top center",
          scrub: 1,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-transparent flex items-center overflow-hidden relative">
      <div className="absolute top-12 left-12 z-20">
        <h2 className="text-white text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-none">
          Selected <span className="text-transparent border-b-2 border-white/20 pb-1">Works</span>
        </h2>
        <p className="text-gray-400 mt-4 font-mono text-sm max-w-md bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/5">
          Exploring the boundaries of digital interaction through visual storytelling.
        </p>
      </div>

      <div ref={scrollContainerRef} className="flex gap-20 px-[15vw] pt-24 h-[70vh] items-center z-10">
        {projects.map((project, i) => (
          <div key={project.id} className="project-card relative group w-[75vw] md:w-[45vw] h-full flex-shrink-0 cursor-pointer perspective-2000">
            <div className={`absolute inset-0 rounded-3xl transition-all duration-700 ease-out transform-style-3d group-hover:rotate-y-12 group-hover:rotate-x-6 group-hover:scale-105 shadow-[0_0_50px_rgba(0,0,0,0.5)]`}>
              
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
        ))}
      </div>
    </section>
  );
}

