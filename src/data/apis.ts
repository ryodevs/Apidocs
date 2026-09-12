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
    method: 'POST',
    path: '/api/upload',
    title: 'Image to URL',
    category: 'Image Tools',
    responseType: 'text',
    description:
      'Upload an image from your device and receive a permanent shareable URL. Useful as a step before using other image APIs like Remini.',
    params: [],
    example: {
      request: `POST https://api.ryodev.my.id/api/upload\nContent-Type: multipart/form-data\n\nfile=<image file>`,
      response: {
        status: 200,
        creator: 'RyodevAPI',
        result: 'https://tmpfiles.org/dl/abc123/image.jpg',
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
    method: 'POST',
    path: '/api/remini',
    title: 'Image Enhancer (Remini)',
    category: 'Image Tools',
    responseType: 'image',
    description:
      'Enhance image quality using Remini AI. Automatically improves face detail, background sharpness, and overall image clarity. Upload an image directly from your device.',
    params: [],
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

  // ── Downloader ───────────────────────────────────────────
  {
    id: 'tiktok',
    method: 'GET',
    path: '/api/tiktok',
    title: 'TikTok Downloader',
    category: 'Downloader',
    responseType: 'text',
    description: 'Download TikTok video without watermark. Returns HD play URL, cover and author info.',
    params: [{ name: 'url', type: 'string', required: true, description: 'TikTok video URL', placeholder: 'https://www.tiktok.com/@user/video/123' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/tiktok?url=https://www.tiktok.com/@user/video/123`,
      response: { status: 200, creator: 'RyodevAPI', result: { title: 'Video title', play: 'https://...mp4', hdplay: 'https://...mp4' } },
    },
  },
  {
    id: 'instagram',
    method: 'GET',
    path: '/api/instagram',
    title: 'Instagram Downloader',
    category: 'Downloader',
    responseType: 'text',
    description: 'Download Instagram reels, posts and stories. Returns media URLs.',
    params: [{ name: 'url', type: 'string', required: true, description: 'Instagram URL', placeholder: 'https://www.instagram.com/reel/ABC' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/instagram?url=https://www.instagram.com/reel/ABC`,
      response: { status: 200, creator: 'RyodevAPI', result: [{ url: 'https://...mp4', type: 'video' }] },
    },
  },
  {
    id: 'youtube',
    method: 'GET',
    path: '/api/youtube',
    title: 'YouTube Downloader',
    category: 'Downloader',
    responseType: 'text',
    description: 'Get YouTube video metadata and download links. Supports shorts and regular videos.',
    params: [{ name: 'url', type: 'string', required: true, description: 'YouTube URL or video ID', placeholder: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/youtube?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ`,
      response: { status: 200, creator: 'RyodevAPI', result: { title: 'Never Gonna Give You Up', thumbnail: 'https://...' } },
    },
  },
  {
    id: 'facebook',
    method: 'GET',
    path: '/api/facebook',
    title: 'Facebook Downloader',
    category: 'Downloader',
    responseType: 'text',
    description: 'Download Facebook videos. Returns HD and SD URLs.',
    params: [{ name: 'url', type: 'string', required: true, description: 'Facebook video URL', placeholder: 'https://www.facebook.com/watch/?v=123' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/facebook?url=https://www.facebook.com/watch/?v=123`,
      response: { status: 200, creator: 'RyodevAPI', result: { hd: 'https://...mp4', sd: 'https://...mp4' } },
    },
  },

  // ── Islamic ────────────────────────────────────────────────
  {
    id: 'quran',
    method: 'GET',
    path: '/api/quran',
    title: 'Al-Quran',
    category: 'Islamic',
    responseType: 'text',
    description: 'Get Quran chapter info or specific ayah with translation and audio. Use surah (1-114) and optional ayah.',
    params: [
      { name: 'surah', type: 'string', required: true, description: 'Surah number 1-114', placeholder: '1' },
      { name: 'ayah', type: 'string', required: false, description: 'Ayah number (empty = surah info)', placeholder: '5' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/quran?surah=1&ayah=5`,
      response: { status: 200, creator: 'RyodevAPI', result: { text: 'إِيَّاكَ نَعْبُدُ', translation: 'Hanya Engkaulah...' } },
    },
  },
  {
    id: 'hadith',
    method: 'GET',
    path: '/api/hadith',
    title: 'Hadith',
    category: 'Islamic',
    responseType: 'text',
    description: 'Get hadith by book and number. Books: bukhari, muslim, abu-daud, tirmidzi, nasai, ibn-majah, ahmad.',
    params: [
      { name: 'book', type: 'string', required: false, description: 'Hadith book', placeholder: 'bukhari' },
      { name: 'number', type: 'string', required: false, description: 'Hadith number', placeholder: '1' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/hadith?book=bukhari&number=1`,
      response: { status: 200, creator: 'RyodevAPI', result: { arab: '...', indonesian: '...' } },
    },
  },

  // ── Tools Extended ───────────────────────────────────────
  {
    id: 'weather',
    method: 'GET',
    path: '/api/weather',
    title: 'Weather Forecast',
    category: 'Tools',
    responseType: 'text',
    description: 'Get current weather and 7-day forecast for any city using Open-Meteo. No API key required.',
    params: [{ name: 'city', type: 'string', required: true, description: 'City name', placeholder: 'Jakarta' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/weather?city=Jakarta`,
      response: { status: 200, creator: 'RyodevAPI', result: { city: 'Jakarta', current: { temperature_2m: 30 } } },
    },
  },
  {
    id: 'news',
    method: 'GET',
    path: '/api/news',
    title: 'News Search',
    category: 'Tools',
    responseType: 'text',
    description: 'Search latest news by keyword. Returns Indonesian news or HackerNews fallback.',
    params: [{ name: 'q', type: 'string', required: false, description: 'Search query', placeholder: 'teknologi' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/news?q=teknologi`,
      response: { status: 200, creator: 'RyodevAPI', result: [{ title: 'Berita terbaru', url: 'https://...' }] },
    },
  },
  {
    id: 'shortlink',
    method: 'GET',
    path: '/api/shortlink',
    title: 'URL Shortener',
    category: 'Tools',
    responseType: 'text',
    description: 'Shorten any long URL using is.gd and tinyurl fallback. Returns short URL.',
    params: [{ name: 'url', type: 'string', required: true, description: 'Long URL to shorten', placeholder: 'https://example.com/very/long/url' }],
    example: {
      request: `GET https://api.ryodev.my.id/api/shortlink?url=https://example.com`,
      response: { status: 200, creator: 'RyodevAPI', result: { original: 'https://example.com', short: 'https://is.gd/abc123' } },
    },
  },

  // ── Image / Audio / AI ───────────────────────────────────
  {
    id: 'meme',
    method: 'GET',
    path: '/api/meme',
    title: 'Meme Generator',
    category: 'Image Tools',
    responseType: 'image',
    description: 'Generate meme image with top and bottom text using memegen.link templates.',
    params: [
      { name: 'top', type: 'string', required: false, description: 'Top text', placeholder: 'when you' },
      { name: 'bottom', type: 'string', required: false, description: 'Bottom text', placeholder: 'code works' },
      { name: 'template', type: 'string', required: false, description: 'Template id (drake, distracted, etc)', placeholder: 'drake' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/meme?top=when%20you&bottom=code%20works`,
      response: { status: 200, creator: 'RyodevAPI', result: 'data:image/png;base64,...' },
    },
  },
  {
    id: 'tts',
    method: 'GET',
    path: '/api/tts',
    title: 'Text to Speech',
    category: 'Audio Tools',
    responseType: 'text',
    description: 'Convert text to speech audio (Google TTS). Supports lang codes: id, en, ja, ko, etc. Returns base64 audio.',
    params: [
      { name: 'text', type: 'string', required: true, description: 'Text to convert', placeholder: 'Halo dunia' },
      { name: 'lang', type: 'string', required: false, description: 'Language code', placeholder: 'id' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/tts?text=Halo%20dunia&lang=id`,
      response: { status: 200, creator: 'RyodevAPI', result: 'data:audio/mpeg;base64,...' },
    },
  },
  {
    id: 'ai-image',
    method: 'GET',
    path: '/api/ai-image',
    title: 'AI Image Generator',
    category: 'AI Assistant',
    responseType: 'image',
    description: 'Generate image from text prompt using Pollinations AI. No API key required.',
    params: [
      { name: 'prompt', type: 'string', required: true, description: 'Image description', placeholder: 'a cute cat astronaut' },
      { name: 'width', type: 'string', required: false, description: 'Width px', placeholder: '512' },
      { name: 'height', type: 'string', required: false, description: 'Height px', placeholder: '512' },
    ],
    example: {
      request: `GET https://api.ryodev.my.id/api/ai-image?prompt=a%20cute%20cat%20astronaut`,
      response: { status: 200, creator: 'RyodevAPI', result: 'data:image/jpeg;base64,...' },
    },
  },
];
