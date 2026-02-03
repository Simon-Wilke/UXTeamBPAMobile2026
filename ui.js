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
  const colors = ['#FF6B81','#FF9500','#FFD166','#34C759','#00C2A8','#5AC8FA','#1E90FF','#5856D6','#C277E0','#FF2D55','#F78DA7','#FF7F50'];
  function _hash(s){ let h=0; for(let i=0;i<s.length;i++){ h=(h*31 + s.charCodeAt(i))>>>0; } return h; }
  function colorFor(name){ return colors[_hash(name||'') % colors.length]; }
  const aColor = colorFor(match.teamA||match.teamAName||'A');
  const bColor = colorFor(match.teamB||match.teamBName||'B');
  return `<div class="relative p-3 rounded-lg border bg-surface border-white/5 mb-3">
    <div class="flex items-center justify-between mb-1.5 gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background:${aColor};box-shadow:0 6px 18px ${aColor}33">${(match.teamA||'').charAt(0) || ''}</div>
        <div class="min-w-0"><span class="text-sm font-semibold text-textMain truncate">${match.teamA}</span></div>
      </div>
      <div class="text-sm font-mono text-textMuted">${match.scoreA ?? '-'}</div>
    </div>
    <div class="w-full h-px bg-white/5 my-2"></div>
    <div class="flex items-center justify-between gap-3">
      <div class="min-w-0"><span class="text-sm font-semibold text-textMain truncate">${match.teamB}</span></div>
      <div class="flex items-center gap-3">
        <div class="text-sm font-mono text-textMuted">${match.scoreB ?? '-'}</div>
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style="background:${bColor};box-shadow:0 6px 18px ${bColor}33">${(match.teamB||'').charAt(0) || ''}</div>
      </div>
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
