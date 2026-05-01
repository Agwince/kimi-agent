export default function Footer() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: '#1f1e1d',
        padding: 'clamp(80px, 12vw, 200px) clamp(1.5rem, 5vw, 4rem) 60px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        {/* Giant firm name */}
        <h2
          className="font-serif text-white mb-20 md:mb-32"
          style={{
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            opacity: 0.15,
          }}
        >
          Mwangi
          <br />
          &amp; Associates
        </h2>

        {/* Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Column 1 - Nairobi */}
          <div>
            <h4
              className="text-white text-sm font-medium mb-6 uppercase tracking-widest"
            >
              Nairobi Office
            </h4>
            <address className="text-legal-silver not-italic space-y-2" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
              <p>5th Floor, ACK Garden House</p>
              <p>1st Ngong Avenue</p>
              <p>Nairobi, Kenya</p>
              <p className="pt-2">+254 20 222 0000</p>
              <p>nairobi@mwangiassociates.co.ke</p>
            </address>
          </div>

          {/* Column 2 - Mombasa */}
          <div>
            <h4
              className="text-white text-sm font-medium mb-6 uppercase tracking-widest"
            >
              Mombasa Office
            </h4>
            <address className="text-legal-silver not-italic space-y-2" style={{ fontSize: '0.9375rem', lineHeight: 1.7 }}>
              <p>Suite 301, Jubilee Insurance Centre</p>
              <p>Moi Avenue</p>
              <p>Mombasa, Kenya</p>
              <p className="pt-2">+254 41 222 1111</p>
              <p>mombasa@mwangiassociates.co.ke</p>
            </address>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h4
              className="text-white text-sm font-medium mb-6 uppercase tracking-widest"
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Profile', href: '#profile' },
                { label: 'Practice Areas', href: '#practice' },
                { label: 'Publications', href: '#publications' },
                { label: 'Careers', href: '#' },
                { label: 'Privacy Policy', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-legal-silver transition-colors duration-300 hover:text-white"
                    style={{ fontSize: '0.9375rem' }}
                    onClick={(e) => {
                      if (link.href.startsWith('#') && link.href !== '#') {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - CTA */}
          <div>
            <h4
              className="text-white text-sm font-medium mb-6 uppercase tracking-widest"
            >
              Get in Touch
            </h4>
            <p className="text-legal-silver mb-6" style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>
              Schedule a confidential consultation with our senior partners.
            </p>
            <button
              className="px-8 py-4 font-medium transition-all duration-300 hover:brightness-110"
              style={{
                backgroundColor: '#ffa502',
                color: '#0f0f0f',
                fontSize: '0.9375rem',
                borderRadius: 4,
              }}
            >
              Book a Consultation
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-legal-silver text-sm">
            &copy; {new Date().getFullYear()} Mwangi &amp; Associates Law Group. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['LinkedIn', 'Twitter', 'X'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-legal-silver text-sm transition-colors duration-300 hover:text-white"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
