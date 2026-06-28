'use client';

import { Mail, ArrowUpRight, Github, Linkedin, Dribbble, Instagram } from 'lucide-react';

export default function Scene9Contact() {
  return (
    <section className="min-h-screen w-full bg-transparent text-white flex flex-col justify-between py-20 px-6 md:px-20 relative overflow-hidden perspective-2000">
      
      {/* Deep Ground Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150vw] h-[50vh] bg-blue-600/10 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full z-10 transform-style-3d">
        <div className="group relative bg-white/5 backdrop-blur-3xl border border-white/10 p-6 md:p-20 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] transition-all duration-1000 hover:rotate-x-2 hover:rotate-y-2 hover:shadow-blue-500/10 active:scale-95">
          <h2 className="text-[clamp(2.5rem,15vw,8rem)] font-black uppercase tracking-tighter mb-8 leading-[0.85] mix-blend-difference">
            Next Level <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Starts Here
            </span>
          </h2>
          
          <p className="text-gray-400 text-lg md:text-3xl max-w-2xl font-mono opacity-60 mb-8 md:mb-16 border-l-4 border-blue-500 pl-8">
            Available for high-impact collaborations and architectural design challenges.
          </p>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <a 
              href="mailto:muskanbharti65124@gmail.com" 
              className="group/btn relative overflow-hidden bg-white text-black px-6 py-4 md:px-12 md:py-6 rounded-full font-black text-base md:text-xl hover:scale-105 transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors">
                <Mail className="w-5 h-5" /> START_CONVO
              </span>
              <ArrowUpRight className="relative z-10 w-5 h-5 group-hover/btn:rotate-45 group-hover/btn:text-white transition-all text-blue-500" />
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="group/sec flex items-center justify-center border-2 border-white/10 px-6 py-4 md:px-12 md:py-6 rounded-full font-bold text-base md:text-xl hover:bg-white hover:text-black transition-all duration-500 gap-3"
            >
              <span>GET_RESUME</span>
              <ArrowUpRight className="w-5 h-5 opacity-30 group-hover/sec:opacity-100 group-hover/sec:rotate-45 transition-all text-blue-500" />
            </a>
          </div>
        </div>
      </div>

      <footer className="w-full flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 z-10 mx-auto max-w-7xl mt-20 font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <p>[ STATUS: READY ] · © {new Date().getFullYear()} MUSKAN BHARTI</p>
          <a 
            href="https://abvicky.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-black tracking-[0.8em] text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-pulse transition-all duration-300 hover:brightness-150 hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] cursor-pointer no-underline border-none outline-none"
          >
            POWERED BY MANIKARNIKA
          </a>
        </div>
        
        <div className="flex gap-10">
          {[
            { Icon: Linkedin, href: "https://www.linkedin.com/in/muskan072024/", target: "_blank", rel: "noopener noreferrer" },
            { Icon: Instagram, href: "https://www.instagram.com/brandkibaat_studio?igsh=MXE3ZHd1ZW44MHl4MA==", target: "_blank", rel: "noopener noreferrer" },
            { Icon: Dribbble, href: "#" },
            { Icon: Github, href: "#" }
          ].map(({ Icon, href, target, rel }, i) => (
            <a key={i} href={href} target={target} rel={rel} className="hover:text-blue-500 hover:scale-150 transition-all duration-300">
               <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </footer>
    </section>
  );
}
