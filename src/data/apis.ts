/**
 * ============================================================
 *  apis.ts — File konfigurasi API RyodevAPI
 * ============================================================
 *  Cara nambahin endpoint baru:
 *  1. Tambah object baru ke array `endpoints` di bawah
 *  2. Isi semua field (id, method, path, title, category, dst.)
 *  3. Simpan file → langsung ke-render di halaman Docs
 *
 *  Cara nambahin kategori baru:
 *  - Isi field `category` dengan nama kategori baru
 *  - Otomatis muncul di sidebar dan halaman docs
 * ============================================================
 */

export interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

export interface Endpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  title: string;
  category: string;
  description: string;
  params: EndpointParam[];
  example: { request: string; response: object };
}

export const endpoints: Endpoint[] = [
  // ── AI Assistant ──────────────────────────────────────────
  {
    id: 'gemini',
    method: 'GET',
    path: '/api/gemini',
    title: 'AI Chat (Gemini)',
    category: 'AI Assistant',
    description:
      'Send a text message to Google Gemini AI and receive a conversational response. Perfect for chatbots, Q&A systems, and content generation.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'The message or question to send to the AI' },
      { name: 'apikey', type: 'string', required: true, description: 'Your RyodevAPI API key' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/gemini?text=Explain%20quantum%20computing&apikey=YOUR_API_KEY`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'Quantum computing is a type of computation that harnesses the principles of quantum mechanics to process information...',
      },
    },
  },
  {
    id: 'gpt',
    method: 'GET',
    path: '/api/gpt',
    title: 'AI Chat (GPT)',
    category: 'AI Assistant',
    description:
      'Send a text message to GPT-based AI models and receive a conversational response. Alternative model option with different capabilities.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'The message or question to send to the AI' },
      { name: 'apikey', type: 'string', required: true, description: 'Your RyodevAPI API key' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/gpt?text=Write%20a%20poem&apikey=YOUR_API_KEY`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'In the twilight of a thousand dreams, where stars collide in silent streams...',
      },
    },
  },

  // ── Image Tools ───────────────────────────────────────────
  {
    id: 'qr',
    method: 'GET',
    path: '/api/qr',
    title: 'QR Code Generator',
    category: 'Image Tools',
    description:
      'Generate a QR code image from any text or URL. Returns a direct link to the generated QR code image.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text or URL to encode in the QR code' },
      { name: 'apikey', type: 'string', required: true, description: 'Your RyodevAPI API key' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/qr?text=https://ryodev.my.id&apikey=YOUR_API_KEY`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'https://cdn.ryodev.my.id/qr/abc123.png',
      },
    },
  },
  {
    id: 'remini',
    method: 'GET',
    path: '/api/remini',
    title: 'Image Enhancer',
    category: 'Image Tools',
    description:
      'Enhance image resolution and quality using AI. Pass an image URL and receive an enhanced version with improved clarity and detail.',
    params: [
      { name: 'url', type: 'string', required: true, description: 'URL of the image to enhance' },
      { name: 'apikey', type: 'string', required: true, description: 'Your RyodevAPI API key' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/remini?url=https://example.com/photo.jpg&apikey=YOUR_API_KEY`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'https://cdn.ryodev.my.id/enhanced/photo_hd.png',
      },
    },
  },

  // ── Anime Database ────────────────────────────────────────
  {
    id: 'anime',
    method: 'GET',
    path: '/api/anime',
    title: 'Anime Search',
    category: 'Anime Database',
    description:
      'Search for anime characters and retrieve detailed information including name, description, anime appearances, and image.',
    params: [
      { name: 'q', type: 'string', required: true, description: 'Character name or search query' },
      { name: 'apikey', type: 'string', required: true, description: 'Your RyodevAPI API key' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/anime?q=Monkey%20D.%20Luffy&apikey=YOUR_API_KEY`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: {
          name: 'Monkey D. Luffy',
          anime: 'One Piece',
          description: 'Captain of the Straw Hat Pirates, aims to become the Pirate King.',
          image: 'https://cdn.ryodev.my.id/anime/luffy.png',
        },
      },
    },
  },

  // ── Contoh: cara nambahin endpoint baru ──────────────────
  // {
  //   id: 'tts',
  //   method: 'GET',
  //   path: '/api/tts',
  //   title: 'Text to Speech',
  //   category: 'Audio Tools',   // <-- kategori baru, auto muncul di sidebar
  //   description: 'Convert text to speech audio file.',
  //   params: [
  //     { name: 'text', type: 'string', required: true, description: 'Text to convert' },
  //     { name: 'apikey', type: 'string', required: true, description: 'Your API key' },
  //   ],
  //   example: {
  //     request: `GET https://api.ryodev.my.id/api/tts?text=hello&apikey=YOUR_API_KEY`,
  //     response: { status: 200, creator: 'RyodevAPI', result: 'https://cdn.ryodev.my.id/tts/hello.mp3' },
  //   },
  // },
];
