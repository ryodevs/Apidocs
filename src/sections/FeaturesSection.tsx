import { useRef, useEffect } from 'react';
import { MessageSquare, Image, Tv } from 'lucide-react';

const features = [
  {
    icon: MessageSquare,
    title: 'AI Assistant',
    description:
      'Integrate smart chat and conversational AI into your applications. Support for multiple AI models with contextual understanding.',
    endpoints: ['/api/gemini', '/api/gpt'],
  },
  {
    icon: Image,
    title: 'Image Tools',
    description:
      'Generate QR codes and enhance image resolution. Process images with advanced AI-powered tools for better quality outputs.',
    endpoints: ['/api/qr', '/api/remini'],
  },
  {
    icon: Tv,
    title: 'Anime Database',
    description:
      'Fetch detailed data from the anime world. Search characters, get information, and explore the vast anime universe.',
    endpoints: ['/api/anime'],
  },
];

export default function FeaturesSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="py-24 md:py-32"
      style={{ backgroundColor: '#fff', borderTop: '1px solid #e0e0e0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <p
            className="text-xs font-medium uppercase tracking-[0.25em] mb-4"
            style={{ color: '#a0b6cd' }}
          >
            What We Offer
          </p>
          <h2
            className="text-3xl md:text-5xl font-normal leading-tight"
            style={{ color: '#000' }}
          >
            Everything you need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="group border p-8 transition-all duration-300 opacity-0 translate-y-6"
                style={{
                  borderColor: '#e0e0e0',
                  borderRadius: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                <style>{`
                  .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                  }
                `}</style>
                <div
                  className="w-10 h-10 flex items-center justify-center mb-6"
                  style={{ color: '#14213d' }}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <h3
                  className="text-xl font-medium mb-3"
                  style={{ color: '#000' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#14213d', opacity: 0.6 }}
                >
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.endpoints.map((ep) => (
                    <span
                      key={ep}
                      className="text-[10px] font-mono px-2.5 py-1.5 uppercase tracking-wider"
                      style={{
                        backgroundColor: '#f7f7f7',
                        color: '#14213d',
                        borderRadius: 4,
                      }}
                    >
                      {ep}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
