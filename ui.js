// Small UI helpers to render chunks

function badge(text, variant = 'primary') {
  const styles = {
    primary: 'bg-surface text-textMuted border border-white/10',
    secondary: 'bg-cyan/10 text-cyan border border-cyan/20',
    live: 'bg-crimson text-white animate-pulse shadow-[0_0_10px_rgba(201,42,42,0.6)]',
    upcoming: 'bg-white/10 text-white border border-white/20'
  };
  return `<span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[variant]}">${text}</span>`;
}

function matchNode(match) {
  return `<div class="relative p-3 rounded-lg border bg-surface border-white/5 mb-3">
    <div class="flex justify-between items-center mb-1.5">
      <span class="text-sm font-semibold text-textMain">${match.teamA}</span>
      <span class="text-sm font-mono text-textMuted">${match.scoreA ?? '-'}</span>
    </div>
    <div class="w-full h-px bg-white/5 mb-1.5"></div>
    <div class="flex justify-between items-center">
      <span class="text-sm font-semibold text-textMain">${match.teamB}</span>
      <span class="text-sm font-mono text-textMuted">${match.scoreB ?? '-'}</span>
    </div>
  </div>`;
}

function radarSVG(stats) {
  // Simple radar-like polygon with 6 axes
  const toCoord = (i, value, maxR = 60) => {
    const angle = (Math.PI * 2 / stats.length) * i - Math.PI / 2;
    const r = (value / 150) * maxR; // domain 0..150
    return [Math.cos(angle) * r, Math.sin(angle) * r];
  };
  const points = stats.map((s, i) => toCoord(i, s.A)).map(([x,y]) => `${x+75},${y+75}`).join(' ');
  return `<svg width="150" height="150" viewBox="0 0 150 150" class="mx-auto">
    <circle cx="75" cy="75" r="60" fill="none" stroke="#ffffff20" />
    <polygon points="${points}" fill="#C92A2A80" stroke="#C92A2A" stroke-width="2" />
  </svg>`;
}
