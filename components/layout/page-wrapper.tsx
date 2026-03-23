'use client';

import { useState, useEffect } from 'react';
import { Loader } from '@/components/effects/loader';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const enableLoader =
      process.env.NODE_ENV !== 'production' ||
      process.env.NEXT_PUBLIC_ENABLE_LOADER === 'true';

    if (!enableLoader) return;

    const hasLoaded = sessionStorage.getItem('preit-loaded');
    if (!hasLoaded) setShowLoader(true);
  }, []);

  const handleLoadComplete = () => {
    sessionStorage.setItem('preit-loaded', 'true');
    setShowLoader(false);
  };

  return (
    <>
      {children}
      {showLoader ? <Loader onComplete={handleLoadComplete} /> : null}
    </>
  );
}
