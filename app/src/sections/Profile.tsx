import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const bioParagraphs = [
  "The Honourable James Mwangi is one of Kenya's most distinguished jurists, with a career spanning over three decades in the legal profession. Having served as a Senior Principal Magistrate before transitioning to private practice, he brings an unparalleled depth of judicial insight to every matter entrusted to the firm.",
  "Called to the Kenyan Bar in 1992, Honourable Mwangi quickly established himself as a formidable advocate with a reputation for meticulous preparation and eloquent courtroom presence. His judicial appointment in 2005 marked the beginning of a fourteen-year tenure on the bench, during which he presided over landmark cases that continue to shape Kenyan jurisprudence.",
  "In 2019, Honourable Mwangi founded Mwangi \u0026 Associates Law Group, assembling a team of exceptional legal minds dedicated to delivering world-class counsel. The firm has since grown to become a trusted advisor to multinational corporations, government agencies, and high-net-worth individuals across East Africa.",
  "A Fellow of the Chartered Institute of Arbitrators and a published author on constitutional law, Honourable Mwangi remains committed to advancing the rule of law and mentoring the next generation of Kenyan legal practitioners. His vision is simple: justice, delivered with excellence.",
];

export default function Profile() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    const bios = bioRefs.current.filter(Boolean) as HTMLParagraphElement[];
    const triggers: ScrollTrigger[] = [];

    bios.forEach((el) => {
      const text = el.textContent || '';
      const words = text.split(/\s+/);

      el.innerHTML = '';
      const wrapperSpans: HTMLSpanElement[] = [];

      words.forEach((word) => {
        const wordWrapper = document.createElement('span');
        wordWrapper.style.display = 'inline-block';
        wordWrapper.style.whiteSpace = 'nowrap';

        const chars = word.split('');
        chars.forEach((char) => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.style.display = 'inline-block';
          charSpan.style.opacity = '0.1';
          wordWrapper.appendChild(charSpan);
        });

        wrapperSpans.push(wordWrapper);
      });

      wrapperSpans.forEach((span, i) => {
        el.appendChild(span);
        if (i < wrapperSpans.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '\u00A0';
          space.style.display = 'inline-block';
          space.style.width = '0.3em';
          el.appendChild(space);
        }
      });

      const allChars = el.querySelectorAll('span > span');

      const tween = gsap.fromTo(
        allChars,
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=20%',
            end: 'bottom center+=20%',
            scrub: true,
          },
        }
      );

      if (tween.scrollTrigger) {
        triggers.push(tween.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: '#0f0f0f',
        padding: 'clamp(80px, 12vw, 200px) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        style={{ maxWidth: 1440 }}
      >
        {/* Left Column - Portrait */}
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
            <img
              src="/images/portrait.jpg"
              alt="The Honourable James Mwangi"
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) contrast(1.1)' }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(15,15,15,0.5) 0%, transparent 40%)',
              }}
            />
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div
              style={{
                width: 40,
                height: 1,
                backgroundColor: '#ffa502',
              }}
            />
            <span className="text-legal-silver text-sm" style={{ letterSpacing: '0.05em' }}>
              The Honourable James Mwangi
            </span>
          </div>
        </div>

        {/* Right Column - Bio */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <h2
            className="font-serif text-white mb-12"
            style={{
              fontSize: 'clamp(3rem, 5vw, 6rem)',
              letterSpacing: '-0.01em',
              lineHeight: 1.0,
            }}
          >
            The Hon.
            <br />
            Mwangi
          </h2>

          <div className="space-y-8">
            {bioParagraphs.map((text, i) => (
              <p
                key={i}
                ref={(el) => { bioRefs.current[i] = el; }}
                className="text-legal-silver leading-relaxed"
                style={{
                  fontSize: '1.0625rem',
                  lineHeight: 1.7,
                }}
              >
                {text}
              </p>
            ))}
          </div>

          <div
            className="mt-12 pt-8"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: '30+', label: 'Years Experience' },
                { number: '500+', label: 'Cases Handled' },
                { number: '14', label: 'Years on Bench' },
                { number: '25+', label: 'Awards & Honors' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="font-serif text-amber-orange"
                    style={{ fontSize: 'clamp(2rem, 3vw, 3rem)', lineHeight: 1 }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-legal-silver text-sm mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
