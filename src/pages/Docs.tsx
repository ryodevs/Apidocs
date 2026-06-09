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
} from 'lucide-react';
import { endpoints } from '../data/apis';

const categories = [...new Set(endpoints.map((e) => e.category))];

export default function Docs() {
  const [activeEndpoint, setActiveEndpoint] = useState<string>(endpoints[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeEp = endpoints.find((e) => e.id === activeEndpoint)!;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setSidebarOpen(false);
  }, [activeEndpoint]);

  // lock body scroll when mobile sidebar open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#fff' }}>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-[280px] flex-shrink-0 overflow-y-auto
          border-r lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          backgroundColor: '#f7f7f7',
          borderColor: '#e0e0e0',
          transition: 'transform 300ms ease',
        }}
      >
        <div className="p-6">
          {/* Close button (mobile) */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <Link
              to="/"
              className="text-sm font-medium tracking-wide"
              style={{ color: '#000' }}
            >
              RyodevAPI
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Back to home */}
          <Link
            to="/"
            className="hidden lg:flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider mb-8 transition-colors hover:text-black"
            style={{ color: '#a0b6cd' }}
          >
            <ArrowLeft size={12} />
            Back to Portal
          </Link>

          {/* Getting Started */}
          <div className="mb-8">
            <p
              className="text-[10px] font-medium uppercase tracking-[0.2em] mb-3"
              style={{ color: '#a0b6cd' }}
            >
              Getting Started
            </p>
            <button
              onClick={() => setActiveEndpoint('')}
              className="w-full text-left px-3 py-2 text-xs rounded-md transition-colors duration-200"
              style={{
                backgroundColor: activeEndpoint === '' ? '#fff' : 'transparent',
                color: '#14213d',
                border: activeEndpoint === '' ? '1px solid #e0e0e0' : '1px solid transparent',
              }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={12} />
                Introduction
              </div>
            </button>
          </div>

          {/* Endpoints by category */}
          {categories.map((category) => (
            <div key={category} className="mb-6">
              <p
                className="text-[10px] font-medium uppercase tracking-[0.2em] mb-3"
                style={{ color: '#a0b6cd' }}
              >
                {category}
              </p>
              <div className="space-y-1">
                {endpoints
                  .filter((e) => e.category === category)
                  .map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => setActiveEndpoint(ep.id)}
                      className="w-full text-left px-3 py-2 text-xs rounded-md transition-all duration-200"
                      style={{
                        backgroundColor:
                          activeEndpoint === ep.id ? '#fff' : 'transparent',
                        color: activeEndpoint === ep.id ? '#000' : '#14213d',
                        border:
                          activeEndpoint === ep.id
                            ? '1px solid #e0e0e0'
                            : '1px solid transparent',
                        opacity: activeEndpoint === ep.id ? 1 : 0.6,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[9px] font-mono font-bold px-1 py-0.5 rounded"
                          style={{
                            backgroundColor:
                              ep.method === 'GET'
                                ? 'rgba(160,182,205,0.2)'
                                : 'rgba(20,33,61,0.1)',
                            color: ep.method === 'GET' ? '#a0b6cd' : '#14213d',
                          }}
                        >
                          {ep.method}
                        </span>
                        <span className="truncate">{ep.title}</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main ref={contentRef} className="flex-1 min-w-0 overflow-y-auto h-screen">
        {/* Mobile Header */}
        <div
          className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b"
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            borderColor: '#e0e0e0',
          }}
        >
          <button onClick={() => setSidebarOpen(true)} className="flex items-center gap-2">
            <Menu size={18} />
            <span className="text-xs font-medium" style={{ color: '#14213d' }}>
              Menu
            </span>
          </button>
          <Link to="/" className="text-sm font-medium" style={{ color: '#000' }}>
            RyodevAPI Docs
          </Link>
        </div>

        <div className="max-w-[800px] mx-auto px-6 md:px-10 py-12">
          {activeEndpoint === '' ? (
            /* ── Introduction Page ── */
            <div>
              <p
                className="text-xs font-medium uppercase tracking-[0.25em] mb-4"
                style={{ color: '#a0b6cd' }}
              >
                Documentation
              </p>
              <h1
                className="text-4xl md:text-5xl font-light mb-6"
                style={{ color: '#000' }}
              >
                Introduction
              </h1>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: '#14213d', opacity: 0.7 }}
              >
                Welcome to the RyodevAPI documentation. Our API provides a suite of
                utility endpoints designed to help Indonesian developers build
                applications faster. All endpoints are free to use and require a
                simple API key.
              </p>

              {/* Base URL */}
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Base URL
                </h2>
                <div
                  className="border p-4 flex items-center justify-between group"
                  style={{ borderColor: '#e0e0e0', borderRadius: 8, backgroundColor: '#f7f7f7' }}
                >
                  <code className="text-sm font-mono" style={{ color: '#14213d' }}>
                    https://api.ryodev.my.id
                  </code>
                  <button
                    onClick={() => handleCopy('https://api.ryodev.my.id', 'baseurl')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedId === 'baseurl' ? (
                      <Check size={14} style={{ color: '#4ade80' }} />
                    ) : (
                      <Copy size={14} style={{ color: '#a0b6cd' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Authentication */}
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Authentication
                </h2>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: '#14213d', opacity: 0.7 }}
                >
                  All API endpoints require an API key passed as a query parameter.
                  You can obtain a free API key by contacting us or using the default
                  key provided in the examples.
                </p>
                <div
                  className="border p-4"
                  style={{ borderColor: '#e0e0e0', borderRadius: 8, backgroundColor: '#f7f7f7' }}
                >
                  <code className="text-sm font-mono" style={{ color: '#14213d' }}>
                    ?apikey=YOUR_API_KEY
                  </code>
                </div>
              </div>

              {/* Response Format */}
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Response Format
                </h2>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: '#14213d', opacity: 0.7 }}
                >
                  All responses are returned in JSON format with a consistent structure:
                </p>
                <div
                  className="border p-4 overflow-x-auto"
                  style={{ borderColor: '#e0e0e0', borderRadius: 8, backgroundColor: '#f7f7f7' }}
                >
                  <pre className="text-sm font-mono" style={{ color: '#14213d' }}>
                    {`{\n  "status": 200,\n  "creator": "RyodevAPI",\n  "result": "..."\n}`}
                  </pre>
                </div>
              </div>

              {/* Quick Start */}
              <div className="mb-12">
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Quick Start
                </h2>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: '#14213d', opacity: 0.7 }}
                >
                  Here is a simple example to get you started:
                </p>
                <div
                  className="border overflow-hidden"
                  style={{ borderColor: '#e0e0e0', borderRadius: 8 }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 border-b"
                    style={{ borderColor: '#e0e0e0', backgroundColor: '#f7f7f7' }}
                  >
                    <span
                      className="text-[10px] font-medium uppercase tracking-wider"
                      style={{ color: '#a0b6cd' }}
                    >
                      JavaScript
                    </span>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <pre className="text-sm font-mono" style={{ color: '#14213d' }}>
                      {`fetch('https://api.ryodev.my.id/api/gemini?text=Hello&apikey=free')\n  .then(res => res.json())\n  .then(data => console.log(data.result));`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Endpoints Overview */}
              <div>
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Available Endpoints
                </h2>
                <div className="space-y-3">
                  {endpoints.map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => setActiveEndpoint(ep.id)}
                      className="w-full text-left border p-4 flex items-center gap-4 transition-all duration-200 hover:border-black group"
                      style={{ borderColor: '#e0e0e0', borderRadius: 8 }}
                    >
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-1 rounded flex-shrink-0"
                        style={{
                          backgroundColor:
                            ep.method === 'GET'
                              ? 'rgba(160,182,205,0.2)'
                              : 'rgba(20,33,61,0.1)',
                          color: ep.method === 'GET' ? '#a0b6cd' : '#14213d',
                        }}
                      >
                        {ep.method}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: '#000' }}>
                          {ep.title}
                        </p>
                        <p
                          className="text-xs truncate"
                          style={{ color: '#14213d', opacity: 0.5 }}
                        >
                          {ep.path}
                        </p>
                      </div>
                      <ChevronRight
                        size={14}
                        className="flex-shrink-0"
                        style={{ color: '#a0b6cd' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ── Endpoint Detail Page ── */
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => setActiveEndpoint('')}
                  className="text-[11px] font-medium uppercase tracking-wider transition-colors hover:text-black"
                  style={{ color: '#a0b6cd' }}
                >
                  Docs
                </button>
                <ChevronRight size={12} style={{ color: '#a0b6cd' }} />
                <span
                  className="text-[11px] font-medium uppercase tracking-wider"
                  style={{ color: '#14213d', opacity: 0.5 }}
                >
                  {activeEp.category}
                </span>
              </div>

              {/* Title & Method */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[10px] font-mono font-bold px-2 py-1 rounded"
                  style={{
                    backgroundColor:
                      activeEp.method === 'GET'
                        ? 'rgba(160,182,205,0.2)'
                        : 'rgba(20,33,61,0.1)',
                    color: activeEp.method === 'GET' ? '#a0b6cd' : '#14213d',
                  }}
                >
                  {activeEp.method}
                </span>
                <code
                  className="text-sm font-mono"
                  style={{ color: '#14213d', opacity: 0.6 }}
                >
                  {activeEp.path}
                </code>
              </div>
              <h1
                className="text-3xl md:text-4xl font-light mb-6"
                style={{ color: '#000' }}
              >
                {activeEp.title}
              </h1>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: '#14213d', opacity: 0.7 }}
              >
                {activeEp.description}
              </p>

              {/* Parameters */}
              <div className="mb-10">
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Parameters
                </h2>
                <div className="border overflow-hidden" style={{ borderColor: '#e0e0e0', borderRadius: 8 }}>
                  {/* mobile: card layout */}
                  <div className="md:hidden divide-y" style={{ borderColor: '#e0e0e0' }}>
                    {activeEp.params.map((param) => (
                      <div key={param.name} className="p-4" style={{ backgroundColor: '#fff' }}>
                        <div className="flex items-center justify-between mb-1">
                          <code className="text-sm font-mono font-medium" style={{ color: '#14213d' }}>
                            {param.name}
                          </code>
                          <div className="flex items-center gap-2">
                            <span className="text-xs" style={{ color: '#a0b6cd' }}>{param.type}</span>
                            {param.required ? (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(20,33,61,0.08)', color: '#14213d' }}>
                                required
                              </span>
                            ) : (
                              <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#f7f7f7', color: '#a0b6cd' }}>
                                optional
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs" style={{ color: '#14213d', opacity: 0.6 }}>{param.description}</p>
                      </div>
                    ))}
                  </div>
                  {/* desktop: table layout */}
                  <table className="w-full hidden md:table">
                    <thead>
                      <tr style={{ backgroundColor: '#f7f7f7' }}>
                        {['Name', 'Type', 'Required', 'Description'].map((h) => (
                          <th
                            key={h}
                            className="text-left text-[10px] font-medium uppercase tracking-wider px-4 py-3 border-b"
                            style={{ borderColor: '#e0e0e0', color: '#a0b6cd' }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeEp.params.map((param) => (
                        <tr key={param.name} className="transition-colors hover:bg-[#fafafa]">
                          <td className="px-4 py-3 text-sm font-mono border-b" style={{ borderColor: '#e0e0e0', color: '#14213d' }}>
                            {param.name}
                          </td>
                          <td className="px-4 py-3 text-xs border-b" style={{ borderColor: '#e0e0e0', color: '#a0b6cd' }}>
                            {param.type}
                          </td>
                          <td className="px-4 py-3 text-xs border-b" style={{ borderColor: '#e0e0e0' }}>
                            {param.required ? (
                              <span className="font-medium" style={{ color: '#14213d' }}>Yes</span>
                            ) : (
                              <span style={{ color: '#a0b6cd' }}>No</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs border-b" style={{ borderColor: '#e0e0e0', color: '#14213d', opacity: 0.7 }}>
                            {param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Example Request */}
              <div className="mb-10">
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Example Request
                </h2>
                <div className="border overflow-hidden" style={{ borderColor: '#e0e0e0', borderRadius: 8 }}>
                  <div
                    className="flex items-center justify-between px-4 py-2 border-b"
                    style={{ borderColor: '#e0e0e0', backgroundColor: '#f7f7f7' }}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#a0b6cd' }}>
                      cURL
                    </span>
                    <button onClick={() => handleCopy(activeEp.example.request, `req-${activeEp.id}`)}>
                      {copiedId === `req-${activeEp.id}` ? (
                        <Check size={14} style={{ color: '#4ade80' }} />
                      ) : (
                        <Copy size={14} style={{ color: '#a0b6cd' }} />
                      )}
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono whitespace-pre" style={{ color: '#14213d' }}>
                      {activeEp.example.request}
                    </code>
                  </div>
                </div>
              </div>

              {/* Example Response */}
              <div>
                <h2 className="text-lg font-medium mb-4" style={{ color: '#000' }}>
                  Example Response
                </h2>
                <div className="border overflow-hidden" style={{ borderColor: '#e0e0e0', borderRadius: 8 }}>
                  <div
                    className="flex items-center justify-between px-4 py-2 border-b"
                    style={{ borderColor: '#e0e0e0', backgroundColor: '#f7f7f7' }}
                  >
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#a0b6cd' }}>
                      JSON
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(JSON.stringify(activeEp.example.response, null, 2), `res-${activeEp.id}`)
                      }
                    >
                      {copiedId === `res-${activeEp.id}` ? (
                        <Check size={14} style={{ color: '#4ade80' }} />
                      ) : (
                        <Copy size={14} style={{ color: '#a0b6cd' }} />
                      )}
                    </button>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <pre className="text-sm font-mono" style={{ color: '#14213d' }}>
                      {JSON.stringify(activeEp.example.response, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
