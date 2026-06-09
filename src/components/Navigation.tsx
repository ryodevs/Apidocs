import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    if (!isHome) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  const navLinks = [
    { label: 'Docs', to: '/docs', isRoute: true },
    { label: 'Status', to: '#playground', isRoute: false, id: 'playground' },
    { label: 'Playground', to: '#playground', isRoute: false, id: 'playground' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
        backgroundColor: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid #e0e0e0' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-lg font-medium tracking-wide"
          style={{ color: '#000' }}
        >
          RyodevAPI
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.label}
                to={link.to}
                className="relative text-xs font-medium uppercase tracking-widest group"
                style={{ color: '#14213d' }}
              >
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 h-px bg-current transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ width: '100%' }}
                />
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.id!)}
                className="relative text-xs font-medium uppercase tracking-widest group"
                style={{ color: '#14213d' }}
              >
                {link.label}
                <span
                  className="absolute left-0 -bottom-1 h-px bg-current transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ width: '100%' }}
                />
              </button>
            )
          )}
          <Link
            to="/docs"
            className="text-xs font-medium uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-[0.98]"
            style={{ backgroundColor: '#000', color: '#fff' }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 border-b"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            borderColor: '#e0e0e0',
          }}
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm font-medium uppercase tracking-widest py-2"
                  style={{ color: '#14213d' }}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id!)}
                  className="text-left text-sm font-medium uppercase tracking-widest py-2"
                  style={{ color: '#14213d' }}
                >
                  {link.label}
                </button>
              )
            )}
            <Link
              to="/docs"
              className="text-xs font-medium uppercase tracking-widest px-5 py-2.5 rounded-full text-center transition-all duration-200"
              style={{ backgroundColor: '#000', color: '#fff' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
