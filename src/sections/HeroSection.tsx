import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import MeshGradient from '../components/MeshGradient';

export default function HeroSection() {
  const widgetRef = useRef<HTMLDivElement>(null);
  const [typedResponse, setTypedResponse] = useState('');

  useEffect(() => {
    let frame: number;
    const floatWidget = () => {
      if (widgetRef.current) {
        const y = Math.sin(Date.now() * 0.0015) * 8;
        widgetRef.current.style.transform = `translateY(${y}px)`;
      }
      frame = requestAnimationFrame(floatWidget);
    };
    floatWidget();
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const fullResponse = JSON.stringify(
      {
        status: 200,
        creator: 'RyodevAPI',
        result: 'https://cdn.ryodev.my.id/qr/hello.png',
      },
      null,
      2
    );
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullResponse.length) {
        setTypedResponse(fullResponse.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: '#fff' }}
    >
      <div className="hidden md:block"><MeshGradient /></div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="max-w-[500px]">
            <p
              className="text-xs font-medium uppercase tracking-[0.25em] mb-6"
              style={{ color: '#a0b6cd' }}
            >
              Open-Source REST API
            </p>
            <h1
              className="text-5xl md:text-7xl font-light leading-none mb-6"
              style={{ color: '#000' }}
            >
              Build faster with reliable tools
            </h1>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: '#14213d', opacity: 0.7 }}
            >
              Access AI chat, QR generators, image enhancers, and anime data
              &mdash; engineered for Indonesian developers.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/docs"
                className="inline-block text-xs font-medium uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-[0.98]"
                style={{ backgroundColor: '#000', color: '#fff' }}
              >
                View Documentation
              </Link>
              <button
                onClick={() => {
                  const el = document.getElementById('playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-block text-xs font-medium uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-200"
                style={{
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: '#000',
                  color: '#000',
                  backgroundColor: 'transparent',
                  WebkitTapHighlightColor: 'transparent',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#000'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
              >
                Try Playground
              </button>
            </div>
          </div>

          {/* Right: Live Request Widget */}
          <div className="hidden lg:flex justify-end">
            <div
              ref={widgetRef}
              className="w-full max-w-[420px] border transition-shadow duration-300 hover:shadow-lg"
              style={{
                backgroundColor: '#fff',
                borderColor: '#e0e0e0',
                borderRadius: 8,
              }}
            >
              {/* Widget Header */}
              <div
                className="flex items-center gap-2 px-5 py-3 border-b"
                style={{ borderColor: '#e0e0e0' }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#e0e0e0' }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#e0e0e0' }}
                />
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: '#e0e0e0' }}
                />
                <span
                  className="ml-3 text-[10px] font-medium uppercase tracking-wider"
                  style={{ color: '#a0b6cd' }}
                >
                  Live Request
                </span>
              </div>

              {/* Request */}
              <div className="px-5 py-4 border-b" style={{ borderColor: '#e0e0e0' }}>
                <p
                  className="text-[10px] font-medium uppercase tracking-wider mb-2"
                  style={{ color: '#a0b6cd' }}
                >
                  Request
                </p>
                <code
                  className="text-xs block font-mono"
                  style={{ color: '#14213d' }}
                >
                  <span style={{ color: '#a0b6cd' }}>GET</span>{' '}
                  https://ryodev.my.id/api/qr?text=hello
                </code>
              </div>

              {/* Response */}
              <div className="px-5 py-4" style={{ backgroundColor: '#f7f7f7' }}>
                <p
                  className="text-[10px] font-medium uppercase tracking-wider mb-2"
                  style={{ color: '#a0b6cd' }}
                >
                  Response
                </p>
                <pre
                  className="text-xs font-mono whitespace-pre-wrap break-all"
                  style={{ color: '#14213d' }}
                >
                  {typedResponse}
                  <span
                    className="inline-block w-2 h-4 ml-0.5 align-middle"
                    style={{
                      backgroundColor: '#a0b6cd',
                      animation: 'blink 1s step-end infinite',
                    }}
                  />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
