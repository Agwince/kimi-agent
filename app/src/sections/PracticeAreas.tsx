import { useState } from 'react';

const practiceAreas = [
  {
    number: '01',
    title: 'Corporate Law',
    description:
      'Comprehensive legal counsel for mergers, acquisitions, corporate governance, and commercial transactions. We advise multinational corporations, startups, and state-owned enterprises on complex corporate matters across East Africa.',
    image: '/images/corporate.jpg',
  },
  {
    number: '02',
    title: 'Intellectual Property',
    description:
      'Strategic protection of patents, trademarks, copyrights, and trade secrets. Our IP practice helps innovators secure their competitive advantage in an increasingly knowledge-driven economy.',
    image: '/images/ip.jpg',
  },
  {
    number: '03',
    title: 'Litigation & Arbitration',
    description:
      'Fearless advocacy in high-stakes disputes. From commercial litigation to international arbitration, our team delivers results in the courtroom and at the negotiating table.',
    image: '/images/litigation.jpg',
  },
  {
    number: '04',
    title: 'Family & Succession Law',
    description:
      'Sensitive handling of matrimonial disputes, estate planning, wills, and succession matters. We protect families and preserve legacies with discretion and compassion.',
    image: '/images/family.jpg',
  },
];

export default function PracticeAreas() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section
      id="practice"
      style={{
        backgroundColor: '#1f1e1d',
        padding: 'clamp(80px, 12vw, 200px) clamp(1.5rem, 5vw, 4rem)',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <h2
          className="font-serif text-white mb-16 md:mb-24"
          style={{
            fontSize: 'clamp(3rem, 5vw, 6rem)',
            letterSpacing: '-0.01em',
            lineHeight: 1.0,
          }}
        >
          Practice Areas
        </h2>

        <div className="space-y-0">
          {practiceAreas.map((area, index) => (
            <div
              key={area.number}
              className="relative overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="flex items-center justify-between py-6 md:py-8 cursor-pointer transition-transform duration-500"
                style={{
                  transform:
                    activeIndex === index ? 'translateX(20px)' : 'translateX(0)',
                }}
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span
                    className="text-legal-silver font-mono text-sm"
                    style={{ minWidth: 30 }}
                  >
                    {area.number}
                  </span>
                  <h3
                    className="font-serif text-white"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw, 3rem)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                    }}
                  >
                    {area.title}
                  </h3>
                </div>
                <div
                  className="text-legal-silver transition-transform duration-500"
                  style={{
                    transform:
                      activeIndex === index
                        ? 'rotate(45deg)'
                        : 'rotate(0deg)',
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>

              {/* Expandable content */}
              <div
                className="overflow-hidden transition-all duration-700"
                style={{
                  maxHeight: activeIndex === index ? 400 : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <div className="pb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                      style={{
                        transform:
                          activeIndex === index
                            ? 'scale(1)'
                            : 'scale(1.1)',
                      }}
                    />
                  </div>
                  <p
                    className="text-legal-silver leading-relaxed"
                    style={{ fontSize: '1.0625rem', lineHeight: 1.7 }}
                  >
                    {area.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />
        </div>
      </div>
    </section>
  );
}
