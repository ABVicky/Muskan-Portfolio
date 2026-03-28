'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Use dynamic import to prevent "window is not defined" on SSR
const ReactLenis = dynamic(() => import('@studio-freight/react-lenis').then(m => m.ReactLenis), { ssr: false });

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root>
      {children as any}
    </ReactLenis>
  );
}
