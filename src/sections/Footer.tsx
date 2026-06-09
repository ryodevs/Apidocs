import { Link } from 'react-router';
import CircularTextSpinner from '../components/CircularTextSpinner';
import { Github, Twitter, Heart } from 'lucide-react';

const footerLinks = {
  API: [
    { label: 'AI Chat', to: '/docs' },
    { label: 'QR Generator', to: '/docs' },
    { label: 'Image Enhancer', to: '/docs' },
    { label: 'Anime Data', to: '/docs' },
  ],
  Resources: [
    { label: 'Documentation', to: '/docs' },
    { label: 'Status Page', to: '#' },
    { label: 'Changelog', to: '#' },
    { label: 'GitHub', to: 'https://github.com/ryodevs' },
  ],
  Legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'MIT License', to: '#' },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative pt-20 pb-8"
      style={{
        backgroundColor: '#f7f7f7',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-lg font-medium tracking-wide inline-block mb-4"
              style={{ color: '#000' }}
            >
              RyodevAPI
            </Link>
            <p
              className="text-xs leading-relaxed"
              style={{ color: '#14213d', opacity: 0.5 }}
            >
              Open-source REST API built for Indonesian developers. Free, fast,
              and reliable.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com/ryodevs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 hover:border-black hover:text-black"
                style={{ borderColor: '#e0e0e0', color: '#a0b6cd' }}
              >
                <Github size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-200 hover:border-black hover:text-black"
                style={{ borderColor: '#e0e0e0', color: '#a0b6cd' }}
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                className="text-[10px] font-medium uppercase tracking-[0.2em] mb-5"
                style={{ color: '#a0b6cd' }}
              >
                {category}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs transition-colors duration-200 hover:text-black"
                      style={{ color: '#14213d', opacity: 0.6 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Circular Spinner - positioned absolute */}
        <div className="hidden md:block absolute bottom-12 right-12 lg:right-20">
          <CircularTextSpinner />
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid #e0e0e0' }}
        >
          <p
            className="text-[10px] font-medium uppercase tracking-wider"
            style={{ color: '#a0b6cd' }}
          >
            &copy; 2025 RyodevAPI. All rights reserved.
          </p>
          <p
            className="text-[10px] flex items-center gap-1"
            style={{ color: '#a0b6cd' }}
          >
            Made with <Heart size={10} fill="currentColor" /> in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
