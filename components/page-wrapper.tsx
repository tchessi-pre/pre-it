'use client';

import { useState, useEffect } from 'react';
import { Loader } from './loader';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if this is the first visit in this session
    const hasLoaded = sessionStorage.getItem('preit-loaded');
    if (hasLoaded) {
      setIsLoading(false);
      setShowContent(true);
    }
  }, []);

  const handleLoadComplete = () => {
    sessionStorage.setItem('preit-loaded', 'true');
    setIsLoading(false);
    // Delay showing content for smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  // On server and before mount, render children with opacity-0
  // This ensures consistent HTML between server and client
  if (!mounted) {
    return (
      <div className="opacity-0">
        {children}
      </div>
    );
  }

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}
      <div
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </>
  );
}
