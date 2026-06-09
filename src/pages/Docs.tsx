import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  ChevronRight,
  Copy,
  Check,
  Menu,
  X,
  ArrowLeft,
  Terminal,
  Play,
  Loader2,
  AlertCircle,
  ImageIcon,
} from 'lucide-react';
import { endpoints } from '../data/apis';

const BASE_URL = 'https://api.ryodev.my.id';
const categories = [...new Set(endpoints.map((e) => e.category))];

type ExecState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: object; imageUrl?: string; imageType?: 'blob' | 'svg' }
  | { status: 'error'; message: string };

export default function Docs() {
  const [activeEndpoint, setActiveEndpoint] = useState<string>(endpoints[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [execState, setExecState] = useState<ExecState>({ status: 'idle' });
  const contentRef = useRef<HTMLDivElement>(null);

  const activeEp = endpoints.find((e) => e.id === activeEndpoint)!;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setSidebarOpen(false);
    setExecState({ status: 'idle' });
    if (activeEp) {
      const defaults: Record<string, string> = {};
      activeEp.params.forEach((p) => { defaults[p.name] = ''; });
      setParamValues(defaults);
    }
  }, [activeEndpoint]);

  useEffect(() => {
    return () => {
      if (execState.status === 'success' && execState.imageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(execState.imageUrl);
      }
    };
  }, [execState]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleExecute = async () => {
    if (!activeEp) return;
    setExecState({ status: 'loading' });

    const qs = new URLSearchParams();
    activeEp.params.forEach((p) => {
      const val = paramValues[p.name]?.trim();
      if (val) qs.set(p.name, val);
    });

    const url = `${BASE_URL}${activeEp.path}?${qs.toString()}`;

    try {
      const res = await fetch(url);
      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('svg')) {
        const svgText = await res.text();
        const blob = new Blob([svgText], { type: 'image/svg+xml' });
        const imageUrl = URL.createObjectURL(blob);
        const mockData = { status: 200, creator: 'RyodevAPI', result: url };
        setExecState({ status: 'success', data: mockData, imageUrl: imageUrl, imageType: 'blob' });
        return;
      }

      if (contentType.includes('image')) {
        const mockData = { status: 200, creator: 'RyodevAPI', result: url };
        setExecState({ status: 'success', data: mockData, imageUrl: url, imageType: 'blob' });
        return;
      }

      const data = await res.json();
      if (activeEp.responseType === 'image' && data.result && typeof data.result === 'string') {
        setExecState({ status: 'success', data, imageUrl: data.result, imageType: 'blob' });
        return;
      }
      setExecState({ status: 'success', data });
    } catch (err) {
      setExecState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Request failed.',
      });
    }
  };

  const builtUrl = activeEp
    ? (() => {
        const qs = new URLSearchParams();
        activeEp.params.forEach((p) => {
          const val = paramValues[p.name]?.trim();
          if (val) qs.set(p.name, val);
        });
        const q = qs.toString();
        return `${BASE_URL}${activeEp.path}${q ? '?' + q : ''}`;
      })()
    : '';

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#fff' }}>
      {sidebarOpen && <div className="fixed inset-0 z-40 lg:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={() => setSidebarOpen(false)} />}
      
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] flex-shrink-0 overflow-y-auto border-r lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} style={{ backgroundColor: '#f7f7f7', borderColor: '#e0e0e0', transition: 'transform 300ms ease' }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <Link to="/" className="text-sm font-medium tracking-wide">RyodevAPI</Link>
            <button onClick={() => setSidebarOpen(false)}><X size={18} /></button>
          </div>
          <Link to="/" className="hidden lg:flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider mb-8" style={{ color: '#a0b6cd' }}><ArrowLeft size={12} /> Back</Link>
          
          <div className="mb-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] mb-3" style={{ color: '#a0b6cd' }}>Getting Started</p>
            <button onClick={() => setActiveEndpoint('')} className="w-full text-left px-3 py-2 text-xs rounded-md" style={{ backgroundColor: activeEndpoint === '' ? '#fff' : 'transparent', border: activeEndpoint === '' ? '1px solid #e0e0e0' : '1px solid transparent' }}>
              <div className="flex items-center gap-2"><Terminal size={12} />Introduction</div>
            </button>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] mb-3" style={{ color: '#a0b6cd' }}>{category}</p>
              <div className="space-y-1">
                {endpoints.filter((e) => e.category === category).map((ep) => (
                  <button key={ep.id} onClick={() => setActiveEndpoint(ep.id)} className="w-full text-left px-3 py-2 text-xs rounded-md" style={{ backgroundColor: activeEndpoint === ep.id ? '#fff' : 'transparent', border: activeEndpoint === ep.id ? '1px solid #e0e0e0' : '1px solid transparent' }}>
                    <div className="flex items-center gap-2"><span className="text-[9px] font-mono font-bold px-1 py-0.5 rounded" style={{ backgroundColor: ep.method === 'GET' ? 'rgba(160,182,205,0.2)' : 'rgba(20,33,61,0.1)' }}>{ep.method}</span>{ep.title}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main ref={contentRef} className="flex-1 min-w-0 overflow-y-auto h-screen">
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b" style={{ backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
          <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2"><Menu size={18} /> Menu</button>
        </div>

        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-12">
          {activeEndpoint === '' ? (
            <div>
              <h1 className="text-4xl font-light mb-6">Introduction</h1>
              <p className="text-base leading-relaxed mb-10">Welcome to RyodevAPI documentation.</p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-light mb-6">{activeEp.title}</h1>
              <div className="mb-10">
                <h2 className="text-lg font-medium mb-4">Try It</h2>
                <div className="border overflow-hidden rounded-lg">
                  <div className="p-5 space-y-3" style={{ backgroundColor: '#fafafa' }}>
                    {activeEp.params.map((param) => (
                      <div key={param.name}>
                        <label className="block text-[10px] font-medium uppercase mb-1.5">{param.name}</label>
                        <input type="text" value={paramValues[param.name] ?? ''} onChange={(e) => setParamValues((prev) => ({ ...prev, [param.name]: e.target.value }))} className="w-full px-3 py-2.5 text-sm font-mono rounded-md border" />
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-4 border-t">
                    <button onClick={handleExecute} disabled={execState.status === 'loading'} className="flex items-center gap-2 text-xs font-medium uppercase px-6 py-2.5 rounded-full" style={{ backgroundColor: '#000', color: '#fff' }}>
                      {execState.status === 'loading' ? 'Sending...' : 'Execute'}
                    </button>
                  </div>
                  {execState.status === 'success' && execState.imageUrl && (
                    <div className="p-5 border-t">
                      <img src={execState.imageUrl} alt="Result" className="w-full rounded-lg border" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
