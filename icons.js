// Minimal inline SVG icon set (Lucide-inspired) for vanilla usage
// Size defaults to 20, color via currentColor

function svg(pathD, opts = {}) {
  const { size = 20, stroke = 'currentColor', strokeWidth = 2, fill = 'none' } = opts;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${pathD}"/></svg>`;
}

const ICONS = {
  // Bottom nav
  home: () => svg('m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22'),
  barChart: () => svg('M18 20V10M12 20V4M6 20v-6'),
  trophy: () => svg('M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M18 2H6v7a6 6 0 0 0 12 0V2Z'),
  calendar: () => svg('M3 4h18M3 8h18M5 2v4M19 2v4M5 12h14M5 16h14M5 20h14'),
  activity: () => svg('M22 12h-4l-3 7L9 5l-3 7H2'),
  playCircle: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16" fill="currentColor"/></svg>`,
  gitMerge: () => svg('M18 7a3 3 0 1 0-2.83-4H15a3 3 0 1 0 3 3zm-12 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm0 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3zm2-12v8a4 4 0 0 0 4 4h4'),
  messageSquare: () => svg('M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z'),

  // App bar
  bell: () => svg('M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0'),
  userCircle: () => svg('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 6a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm6 10a6 6 0 0 0-12 0'),

  // Common actions
  x: () => svg('M18 6 6 18M6 6l12 12'),
  arrowLeft: () => svg('M19 12H5M12 19l-7-7 7-7'),
  shoppingCart: () => svg('M6 6h15l-1.5 9H8.5L7 6M6 6l-2-2M10 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4'),
  search: () => svg('M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0'),
  shield: () => svg('M12 2l8 4v6c0 5.25-3.4 9.91-8 11-4.6-1.09-8-5.75-8-11V6z'),
  send: () => svg('M22 2L11 13M22 2l-7 20-4-9-9-4z'),
  check: () => svg('M20 6L9 17l-5-5'),
  creditCard: () => svg('M2 7h20v10H2V7zm0 4h20'),
  trash: () => svg('M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14'),
  loader: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.2"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>`,
  checkCircle: () => `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/></svg>`,
};

function icon(name, size = 20) { const fn = ICONS[name]; return fn ? fn({ size }) : ''; }
