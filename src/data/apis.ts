/**
 * ============================================================
 *  apis.ts — File konfigurasi API RyodevAPI
 * ============================================================
 *  Cara nambahin endpoint baru:
 *  1. Tambah object baru ke array `endpoints` di bawah
 *  2. Isi semua field (id, method, path, title, category, dst.)
 *  3. responseType: 'text' untuk teks biasa, 'image' untuk endpoint
 *     yang result-nya URL gambar (auto tampil preview pas di-execute)
 *  4. Simpan file → langsung ke-render di halaman Docs
 * ============================================================
 */

export interface EndpointParam {
  name: string;
  type: string;
  required: boolean;
  description: string;
  placeholder?: string;
}

export interface Endpoint {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  title: string;
  category: string;
  description: string;
  responseType: 'text' | 'image';
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
    responseType: 'text',
    description:
      'Send a text message to Google Gemini AI and receive a conversational response. Perfect for chatbots, Q&A systems, and content generation.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'The message or question to send to the AI', placeholder: 'Explain quantum computing' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/gemini?text=Explain%20quantum%20computing`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'Quantum computing is a type of computation that harnesses the principles of quantum mechanics...',
      },
    },
  },
  {
    id: 'gpt',
    method: 'GET',
    path: '/api/gpt',
    title: 'AI Chat (GPT)',
    category: 'AI Assistant',
    responseType: 'text',
    description:
      'Send a text message to GPT-based AI models and receive a conversational response. Alternative model option with different capabilities.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'The message or question to send to the AI', placeholder: 'Write a poem' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/gpt?text=Write%20a%20poem`,
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
    responseType: 'image',
    description:
      'Generate a QR code image from any text or URL. Returns a direct link to the generated QR code image.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text or URL to encode in the QR code', placeholder: 'https://ryodev.my.id' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/qr?text=https://ryodev.my.id`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'data:image/png;base64,...',
      },
    },
  },
  {
    id: 'upload',
    method: 'GET',
    path: '/api/upload',
    title: 'Image to URL',
    category: 'Image Tools',
    responseType: 'text',
    description:
      'Upload an image from a URL to a permanent hosting service and receive a new shareable link. Useful for converting temporary image URLs into permanent ones.',
    params: [
      { name: 'url', type: 'string', required: true, description: 'URL of the image to upload', placeholder: 'https://example.com/photo.jpg' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/upload?url=https://example.com/photo.jpg`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        original: 'https://example.com/photo.jpg',
        result: 'https://files.catbox.moe/abc123.jpg',
      },
    },
  },
  {
    id: 'brat',
    method: 'GET',
    path: '/api/brat',
    title: 'Brat Maker',
    category: 'Image Tools',
    responseType: 'image',
    description:
      'Generate a brat-style image with custom text. Returns a brat aesthetic image with your text — popular for memes and social media content.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text to display on the brat image', placeholder: 'brat summer' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/brat?text=brat%20summer`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'data:image/svg+xml;base64,...',
      },
    },
  },
  {
    id: 'remini',
    method: 'GET',
    path: '/api/remini',
    title: 'Image Enhancer (Remini)',
    category: 'Image Tools',
    responseType: 'image',
    description:
      'Enhance image quality using Remini AI. Automatically improves face detail, background sharpness, and overall image clarity. Pass an image URL and receive an enhanced version.',
    params: [
      { name: 'url', type: 'string', required: true, description: 'URL of the image to enhance', placeholder: 'https://example.com/photo.jpg' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/remini?url=https://example.com/photo.jpg`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'https://storage.remini.ai/enhanced/photo_hd.jpg',
      },
    },
  },

  // ── Tools ────────────────────────────────────────────────
  {
    id: 'summarize',
    method: 'GET',
    path: '/api/summarize',
    title: 'Article Summarizer',
    category: 'Tools',
    responseType: 'text',
    description:
      'Summarize any article or webpage into concise key points using Gemini AI. Pass a URL and receive a short summary in Indonesian.',
    params: [
      { name: 'url', type: 'string', required: true, description: 'URL of the article or webpage to summarize', placeholder: 'https://news.com/artikel' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/summarize?url=https://news.com/artikel`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        url: 'https://news.com/artikel',
        result: '- Artikel ini membahas tentang perkembangan AI terbaru...',
      },
    },
  },
  {
    id: 'translator',
    method: 'GET',
    path: '/api/translator',
    title: 'Translator',
    category: 'Tools',
    responseType: 'text',
    description:
      'Translate text between languages using Gemini AI. Supports auto-detection of source language. Available languages: id, en, ja, ko, zh, ar, fr, de, es, pt, ru, it, th, vi, ms.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text to translate', placeholder: 'Hello, how are you?' },
      { name: 'to', type: 'string', required: true, description: 'Target language code (e.g. id, en, ja, ko)', placeholder: 'id' },
      { name: 'from', type: 'string', required: false, description: 'Source language code. Default: auto-detect', placeholder: 'en' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/translator?text=Hello%20world&to=id`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        from: 'auto',
        to: 'id',
        original: 'Hello world',
        result: 'Halo dunia',
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
    responseType: 'text',
    description:
      'Search for anime characters and retrieve detailed information including name, description, anime appearances, and image.',
    params: [
      { name: 'q', type: 'string', required: true, description: 'Character name or search query', placeholder: 'Monkey D. Luffy' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/anime?q=Monkey%20D.%20Luffy`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: {
          name: 'Monkey D. Luffy',
          anime: 'One Piece',
          description: 'Captain of the Straw Hat Pirates, aims to become the Pirate King.',
          image: 'https://cdn.myanimelist.net/images/characters/9/310307.jpg',
        },
      },
    },
  },

  // ── Cara nambahin endpoint baru ───────────────────────────
  // {
  //   id: 'tts',
  //   method: 'GET',
  //   path: '/api/tts',
  //   title: 'Text to Speech',
  //   category: 'Audio Tools',
  //   responseType: 'text',
  //   description: 'Convert text to speech audio file.',
  //   params: [
  //     { name: 'text', type: 'string', required: true, description: 'Text to convert', placeholder: 'Hello world' },
  //   ],
  //   example: {
  //     request: `GET https://api.ryodev.my.id/api/tts?text=hello`,
  //     response: { status: 200, creator: 'RyodevAPI', result: 'https://cdn.ryodev.my.id/tts/hello.mp3' },
  //   },
  // },
];
