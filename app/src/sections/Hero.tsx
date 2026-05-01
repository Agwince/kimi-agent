import { useEffect, useRef } from 'react';
import { createAmberSphere, destroyAmberSphere, type AmberSphereState } from '../lib/AmberSphere';

const isMobile = () =>
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent) ||
  window.innerWidth < 768;

export default function Hero() {
  const sphereRef = useRef<AmberSphereState | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Skip 3D animation on mobile
    if (isMobile()) return;

    sphereRef.current = createAmberSphere('hero-canvas-container');
    return () => {
      if (sphereRef.current) {
        destroyAmberSphere(sphereRef.current);
        sphereRef.current = null;
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', backgroundColor: '#1f1e1d' }}
    >
      {/* Three.js Canvas Container - desktop only */}
      <div
        id="hero-canvas-container"
        data-cursor-expand
        className="absolute inset-0"
        style={{ zIndex: 0 }}
      />

      {/* Mobile static background - shows only on mobile */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          zIndex: 0,
          background: 'radial-gradient(ellipse 70% 70% at 80% 40%, rgba(255,165,2,0.15) 0%, rgba(31,30,29,0) 70%)',
        }}
      >
        {/* Amber glow orb for mobile */}
        <div style={{
          position: 'absolute',
          right: '10%',
          top: '20%',
          width: 260,
          height: 260,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,165,2,0.18) 0%, rgba(255,165,2,0.06) 50%, transparent 70%)',
          filter: 'blur(8px)',
        }} />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,15,15,0.3) 0%, rgba(15,15,15,0.7) 100%)',
        }}
      />

      {/* Hero Content */}
      <div
        className="relative w-full h-full flex flex-col justify-between"
        style={{ zIndex: 10, padding: 'clamp(1.5rem, 5vw, 4rem)' }}
      >
        {/* Top Left - "Legal excellence" */}
        <div className="pt-24 md:pt-32">
          <h1
            className="font-serif text-white text-shadow-hero"
            style={{
              fontSize: 'clamp(4rem, 8vw, 10rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
            }}
          >
            Legal excellence
          </h1>
        </div>

        {/* Bottom Left - remaining tagline */}
        <div className="pb-8 md:pb-12 max-w-3xl">
          <h1
            className="font-serif text-white text-shadow-hero"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 3.5rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.15,
              fontWeight: 400,
            }}
          >
            <span className="block">fueled by tradition and</span>
            <span className="block">driven by contemporary</span>
            <span className="block" style={{ color: '#ffa502' }}>
              legal strategy
            </span>
          </h1>
          <p
            className="mt-6 text-legal-silver"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              maxWidth: 480,
            }}
          >
            Mwangi & Associates is a premier Kenyan law firm providing
            sophisticated counsel in corporate law, intellectual property,
            litigation, and family matters.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <div
          className="flex flex-col items-center gap-2 text-legal-silver"
          style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
        >
          <span>SCROLL</span>
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}