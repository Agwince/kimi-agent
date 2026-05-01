import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const publications = [
  {
    category: 'White Paper',
    date: 'March 2025',
    title: 'The Future of Digital Asset Regulation in East Africa',
    excerpt:
      'An in-depth analysis of emerging regulatory frameworks for cryptocurrency and blockchain technology across Kenya, Tanzania, and Uganda.',
  },
  {
    category: 'Judicial Review',
    date: 'January 2025',
    title: 'Constitutional Interpretation in the Post-2010 Era',
    excerpt:
      'Honourable Mwangi examines how Kenya\'s 2010 Constitution has reshaped judicial precedent and the evolving role of the Supreme Court.',
  },
  {
    category: 'News Feature',
    date: 'November 2024',
    title: 'Mwangi & Associates Advises on Landmark Infrastructure Deal',
    excerpt:
      'The firm served as lead counsel on the $2.3 billion Nairobi-Mombasa Expressway public-private partnership agreement.',
  },
  {
    category: 'Academic',
    date: 'September 2024',
    title: 'Arbitration vs. Litigation: Strategic Considerations for Multinationals',
    excerpt:
      'Published in the East African Law Journal, this paper compares dispute resolution mechanisms for cross-border commercial disputes.',
  },
  {
    category: 'Op-Ed',
    date: 'July 2024',
    title: 'Protecting Indigenous Knowledge Through IP Reform',
    excerpt:
      'Honourable Mwangi argues for stronger legal protections for traditional knowledge and cultural expressions in Kenyan IP law.',
  },
  {
    category: 'News Feature',
    date: 'May 2024',
    title: 'Firm Expands to Kigali with New Office Opening',
    excerpt:
      'Mwangi & Associates continues its regional expansion with a new presence in Rwanda\'s growing legal market.',
  },
];

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      const tween = gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=10%',
            toggleActions: 'play none none none',
          },
        }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="publications"
      ref={sectionRef}
      style={{
        backgroundColor: '#0f0f0f',
        padding: 'clamp(80px, 12vw, 200px) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24">
          <h2
            className="font-serif text-white"
            style={{
              fontSize: 'clamp(3rem, 5vw, 6rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.0,
            }}
          >
            Publications
            <br />
            <span style={{ color: '#ffa502' }}>&amp; News</span>
          </h2>
          <p
            className="text-legal-silver mt-6 md:mt-0 max-w-md"
            style={{ fontSize: '1.0625rem', lineHeight: 1.6 }}
          >
            Insights, analysis, and updates from the firm's senior partners on 
            matters shaping the legal landscape of East Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          {publications.map((pub, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
              style={{
                backgroundColor: '#0f0f0f',
                padding: 'clamp(2rem, 4vw, 3.5rem)',
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: '#ffa502' }}
                >
                  {pub.category}
                </span>
                <span
                  style={{
                    width: 20,
                    height: 1,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }}
                />
                <span className="text-legal-silver text-xs">{pub.date}</span>
              </div>

              <h3
                className="font-serif text-white mb-4 transition-colors duration-300 group-hover:text-amber-orange"
                style={{
                  fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {pub.title}
              </h3>

              <p
                className="text-legal-silver"
                style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}
              >
                {pub.excerpt}
              </p>

              <div
                className="mt-6 flex items-center gap-2 text-legal-silver transition-all duration-300 group-hover:text-white"
                style={{ fontSize: '0.875rem' }}
              >
                <span>Read more</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <line x1="0" y1="8" x2="14" y2="8" />
                  <polyline points="8,2 14,8 8,14" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
