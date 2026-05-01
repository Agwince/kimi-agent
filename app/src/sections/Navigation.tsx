import { useEffect, useRef, useState } from 'react';

const navLinks = [
  { label: 'Profile', href: '#profile' },
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Publications', href: '#publications' },
  { label: 'Contact', href: '#footer' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAudio = () => {
    setAudioStarted((prev) => !prev);
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 z-50"
      style={{
        transform: 'translateX(-50%)',
        transition: 'all 0.5s ease',
      }}
    >
      <div
        className="glass-nav flex items-center gap-8 px-8 py-3"
        style={{
          borderRadius: 100,
          border: '1px solid rgba(255,255,255,0.06)',
          opacity: scrolled ? 1 : 0.7,
        }}
      >
        <a
          href="#"
          className="font-serif text-white text-lg tracking-tight"
          style={{ letterSpacing: '-0.01em' }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          M&A
        </a>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-legal-silver text-sm font-medium transition-colors duration-300 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 text-xs text-legal-silver transition-colors duration-300 hover:text-amber-orange"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: 16 }}
        >
          <span
            className="inline-block"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: audioStarted ? '#ffa502' : '#555',
              transition: 'background-color 0.3s',
            }}
          />
          {audioStarted ? 'Sound On' : 'Sound Off'}
        </button>
      </div>
    </nav>
  );
}
