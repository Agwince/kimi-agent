import { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import CustomCursor from './sections/CustomCursor';
import PageLoader from './sections/PageLoader';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Profile from './sections/Profile';
import PracticeAreas from './sections/PracticeAreas';
import Publications from './sections/Publications';
import Footer from './sections/Footer';
import { ProceduralAudio } from './lib/ProceduralAudio';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loaded, setLoaded] = useState(false);
  const audioEngineRef = useRef<ProceduralAudio | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;

    const initAudio = () => {
      if (!audioEngineRef.current) {
        audioEngineRef.current = new ProceduralAudio();
      }
      document.removeEventListener('click', initAudio);
    };

    document.addEventListener('click', initAudio);
    return () => {
      document.removeEventListener('click', initAudio);
      if (audioEngineRef.current) {
        audioEngineRef.current.stop();
      }
    };
  }, [loaded]);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <PageLoader onComplete={handleLoaderComplete} />}
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Profile />
        <PracticeAreas />
        <Publications />
        <Footer />
      </main>
    </>
  );
}

export default App;
