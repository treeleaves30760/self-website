// Generates public/og.png (1200x630), public/apple-touch-icon.png (180) and
// public/favicon.ico (32, PNG payload) from inline SVG using resvg with explicit
// font files, so the Chinese name renders identically on every run.
// Override fonts with OG_FONTS="path1;path2" if not on Windows.
import { mkdirSync, writeFileSync } from 'node:fs';
import { Resvg } from '@resvg/resvg-js';

const FONTS = process.env.OG_FONTS?.split(';').filter(Boolean) ?? [
  'C:/Windows/Fonts/segoeui.ttf',
  'C:/Windows/Fonts/segoeuib.ttf',
  'C:/Windows/Fonts/msjh.ttc',
  'C:/Windows/Fonts/msjhbd.ttc',
];

const font = { fontFiles: FONTS, loadSystemFonts: false, defaultFontFamily: 'Segoe UI' };

function renderPng(svg, width) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: width }, font });
  return resvg.render().asPng();
}

const LEAF =
  'M46 16c-14 0-26 10-26 26 0 3 .5 5 1 7 2-9 8-16 16-20-6 6-11 14-13 22 2 .6 4 1 6 1 14 0 20-12 20-24 0-4-1-8-4-12z';

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.88" cy="0.18" r="0.55">
      <stop offset="0" stop-color="#34d399" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#34d399" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(940 60) scale(3.4)"><path d="${LEAF}" fill="#34d399" fill-opacity="0.9"/></g>
  <text x="80" y="300" font-family="Segoe UI" font-weight="700" font-size="88" fill="#f1f5f9">Po-Hsiang Hsu</text>
  <text x="80" y="385" font-family="Microsoft JhengHei" font-weight="700" font-size="60" fill="#94a3b8">許博翔</text>
  <text x="80" y="455" font-family="Segoe UI" font-size="32" fill="#cbd5e1">LLM &amp; VLM research · M.S. student, NTHU EE</text>
  <text x="80" y="560" font-family="Segoe UI" font-weight="700" font-size="28" fill="#34d399">www.treeleaves30760.com</text>
</svg>`;

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0f172a"/>
  <path d="${LEAF}" fill="#34d399"/>
</svg>`;

/** Wrap a PNG in a single-image ICO container. */
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size >= 256 ? 0 : size, 6); // width
  header.writeUInt8(size >= 256 ? 0 : size, 7); // height
  header.writeUInt8(0, 8); // palette
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  return Buffer.concat([header, png]);
}

mkdirSync('public', { recursive: true });
writeFileSync('public/og.png', renderPng(og, 1200));
writeFileSync('public/apple-touch-icon.png', renderPng(icon, 180));
writeFileSync('public/favicon.ico', pngToIco(renderPng(icon, 32), 32));
console.log('wrote public/og.png, public/apple-touch-icon.png, public/favicon.ico');
