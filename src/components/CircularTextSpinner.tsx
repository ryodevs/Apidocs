import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CircularTextSpinner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll<HTMLSpanElement>('.spinner-char');
    const spacing = 360 / chars.length;

    gsap.set(chars, {
      transformOrigin: 'center center',
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(chars, {
      rotation: (i: number) => i * spacing,
    });

    const tween = gsap.to(chars, {
      rotation: '+=360',
      duration: 40,
      ease: 'none',
      repeat: -1,
      stagger: {
        amount: 0,
        from: 'end',
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  const text = 'RYODEVAPI \u2022 FREE API SERVICE \u2022 ';
  const chars = text.split('');

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: 200,
        height: 200,
        borderRadius: '50%',
      }}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="spinner-char absolute"
          style={{
            textTransform: 'uppercase',
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "'Outfit', sans-serif",
            letterSpacing: 2,
            color: '#000',
            transformOrigin: '0 100px',
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
