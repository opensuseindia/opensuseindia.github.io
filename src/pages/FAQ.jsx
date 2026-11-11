import React, { useEffect } from 'react';
import ModernGlassFAQSection from '../components/events/ModernGlassFAQSection';

export default function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#040807] relative overflow-hidden">
      {/* Ambient background matrix emerald glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(115,186,37,0.12)_0%,transparent_70%)] pointer-events-none" />
      <ModernGlassFAQSection isPage={true} />
    </div>
  );
}
