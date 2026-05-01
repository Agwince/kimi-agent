import { useEffect, useState } from 'react';

interface PageLoaderProps {
  onComplete: () => void;
}

export default function PageLoader({ onComplete }: PageLoaderProps) {
  const [phase, setPhase] = useState<'enter' | 'split' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('split'), 1200);
    const t2 = setTimeout(() => {
      setPhase('exit');
      setTimeout(onComplete, 800);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: '#0f0f0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: phase === 'exit' ? 'none' : 'auto',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.8s ease',
      }}
    >
      <div className="relative overflow-hidden" style={{ height: 'clamp(2rem, 6vw, 5rem)' }}>
        <div
          className="font-serif text-white"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            transform:
              phase === 'split' || phase === 'exit'
                ? 'translateY(-100%)'
                : 'translateY(0)',
            transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          Mwangi & Associates
        </div>
        <div
          className="font-serif text-white"
          style={{
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            transform:
              phase === 'split' || phase === 'exit'
                ? 'translateY(100%)'
                : 'translateY(0)',
            transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
          }}
        >
          Mwangi & Associates
        </div>
      </div>
    </div>
  );
}
