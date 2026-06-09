import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import {
  ChevronRight, Copy, Check, Menu, X, ArrowLeft, Terminal, Play, 
  Loader2, AlertCircle, ImageIcon
} from 'lucide-react';
import { endpoints } from '../data/apis';

const BASE_URL = 'https://api.ryodev.my.id';
const categories = [...new Set(endpoints.map((e) => e.category))];

type ExecState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: object; imageUrl?: string }
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
      // Jika endpoint bertipe image, kita langsung arahkan ke URL gambar tersebut
      if (activeEp.responseType === 'image') {
        setExecState({ status: 'success', data: { status: 200, result: url }, imageUrl: url });
      } else {
        const res = await fetch(url);
        const data = await res.json();
        setExecState({ status: 'success', data });
      }
    } catch (err) {
      setExecState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Request failed.',
      });
    }
  };

  const builtUrl = activeEp ? `${BASE_URL}${activeEp.path}?${new URLSearchParams(Object.entries(paramValues).filter(([,v]) => v)).toString()}` : '';

  return (
    <div className="min-h-screen flex bg-white">
      {sidebarOpen && <div className="fixed inset-0 z-40 lg:hidden bg-black/30" onClick={() => setSidebarOpen(false)} />}
      
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] bg-[#f7f7f7] border-r transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <Link to="/" className="text-sm font-medium mb-8 block">RyodevAPI Docs</Link>
          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a0b6cd] mb-3">{cat}</p>
              {endpoints.filter((e) => e.category === cat).map((ep) => (
                <button key={ep.id} onClick={() => setActiveEndpoint(ep.id)} className={`w-full text-left px-3 py-2 text-xs rounded-md ${activeEndpoint === ep.id ? 'bg-white border' : ''}`}>
                  {ep.title}
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen p-10">
        <h1 className="text-4xl font-light mb-6">{activeEp.title}</h1>
        <p className="text-gray-600 mb-10">{activeEp.description}</p>

        <div className="border rounded-lg p-6 bg-[#fafafa]">
          <h2 className="text-lg font-medium mb-4">Try It</h2>
          {activeEp.params.map((p) => (
            <input key={p.name} placeholder={p.name} className="w-full border p-2 mb-3 text-sm rounded" onChange={(e) => setParamValues(prev => ({...prev, [p.name]: e.target.value}))} />
          ))}
          <button onClick={handleExecute} className="bg-black text-white px-6 py-2 rounded-full text-xs font-bold uppercase">
            {execState.status === 'loading' ? 'Loading...' : 'Execute'}
          </button>

          {execState.status === 'success' && (
            <div className="mt-6 border-t pt-6">
              {execState.imageUrl ? (
                <img src={execState.imageUrl} alt="Result" className="w-full rounded border" style={{ display: 'block' }} />
              ) : (
                <pre className="text-xs bg-white p-4 border rounded">{JSON.stringify(execState.data, null, 2)}</pre>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
