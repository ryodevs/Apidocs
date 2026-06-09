import { useState } from 'react';
import { Check, Copy, Terminal, Zap } from 'lucide-react';

const codeExamples = [
  {
    label: 'cURL',
    lang: 'bash',
    code: `curl "https://api.ryodev.my.id/api/gemini?text=hai&apikey=YOUR_API_KEY"`,
  },
  {
    label: 'JavaScript',
    lang: 'javascript',
    code: `fetch('https://api.ryodev.my.id/api/gemini?text=hai&apikey=YOUR_API_KEY')
  .then(res => res.json())
  .then(data => console.log(data.result));`,
  },
  {
    label: 'Python',
    lang: 'python',
    code: `import requests

response = requests.get(
    'https://api.ryodev.my.id/api/gemini',
    params={'text': 'hai', 'apikey': 'YOUR_API_KEY'}
)
print(response.json()['result'])`,
  },
];

const jsonResponse = {
  status: 200,
  creator: 'RyodevAPI',
  result: 'Halo! Ada yang bisa saya bantu? Senang berbincang dengan Anda.',
};

export default function PlaygroundTeaser() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="playground"
      className="py-24 md:py-32"
      style={{ backgroundColor: '#000' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <p
              className="text-xs font-medium uppercase tracking-[0.25em] mb-4"
              style={{ color: '#a0b6cd' }}
            >
              Interactive Testing
            </p>
            <h2
              className="text-3xl md:text-5xl font-normal leading-tight mb-6"
              style={{ color: '#fff' }}
            >
              Test endpoints instantly
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: '#a0b6cd', opacity: 0.8 }}
            >
              Try our API directly from the browser. Switch between different
              programming languages and see live responses in real-time.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(160,182,205,0.15)' }}
                >
                  <Zap size={14} style={{ color: '#a0b6cd' }} />
                </div>
                <span className="text-xs" style={{ color: '#a0b6cd' }}>
                  Low latency
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(160,182,205,0.15)' }}
                >
                  <Terminal size={14} style={{ color: '#a0b6cd' }} />
                </div>
                <span className="text-xs" style={{ color: '#a0b6cd' }}>
                  Multi-language support
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('playground');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block text-xs font-medium uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-200 hover:scale-[0.98]"
              style={{ backgroundColor: '#fff', color: '#000' }}
            >
              Open Playground
            </button>
          </div>

          {/* Right: Code Block */}
          <div
            className="border overflow-hidden"
            style={{ borderColor: '#333', borderRadius: 8 }}
          >
            {/* Tabs */}
            <div
              className="flex items-center gap-0 border-b"
              style={{ borderColor: '#333', backgroundColor: '#0a0a0a' }}
            >
              {codeExamples.map((ex, i) => (
                <button
                  key={ex.label}
                  onClick={() => setActiveTab(i)}
                  className="px-5 py-3 text-[11px] font-medium uppercase tracking-wider transition-colors duration-200"
                  style={{
                    color: activeTab === i ? '#fff' : '#666',
                    borderBottom:
                      activeTab === i ? '2px solid #a0b6cd' : '2px solid transparent',
                  }}
                >
                  {ex.label}
                </button>
              ))}
              <div className="flex-1" />
              <button
                onClick={handleCopy}
                className="px-4 py-3 transition-colors duration-200 hover:text-white"
                style={{ color: '#666' }}
                title="Copy code"
              >
                {copied ? (
                  <Check size={14} style={{ color: '#4ade80' }} />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>

            {/* Code */}
            <div
              className="px-5 py-5 overflow-x-auto"
              style={{ backgroundColor: '#0a0a0a' }}
            >
              <pre
                className="text-xs font-mono leading-relaxed"
                style={{ color: '#d4d4d4' }}
              >
                <code>{codeExamples[activeTab].code}</code>
              </pre>
            </div>

            {/* Response Preview */}
            <div
              className="px-5 py-4 border-t"
              style={{
                borderColor: '#333',
                backgroundColor: '#0a0a0a',
              }}
            >
              <p
                className="text-[10px] font-medium uppercase tracking-wider mb-3"
                style={{ color: '#666' }}
              >
                Response Preview
              </p>
              <pre
                className="text-xs font-mono leading-relaxed"
                style={{ color: '#a0b6cd' }}
              >
                {JSON.stringify(jsonResponse, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
