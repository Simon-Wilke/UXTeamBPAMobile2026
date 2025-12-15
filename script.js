// Vanilla JS app wiring

const Screen = {
  Home: 'scores',
  Stats: 'stats',
  Replays: 'replays',
  Brackets: 'brackets',
  Community: 'community',
};

let state = {
  activeTab: Screen.Home,
  isProfileOpen: false,
  isStoreOpen: false,
  chatMessages: [...MESSAGES],
  storeView: 'browse',
  cart: [],
  isProcessing: false,
  activeGameFilter: 'All',
  expandedTeam: null,
  selectedPlayerId: null,
  heroIndex: 0,
  viewAllReplays: false,
};

const root = document.getElementById('app');
const screenContainer = document.getElementById('screenContainer');
const bottomNav = document.getElementById('bottomNav');
const profileModal = document.getElementById('profileModal');
const ticketStore = document.getElementById('ticketStore');
const titleEl = document.getElementById('title');
const logoEl = document.getElementById('logo');
logoEl.src = LOGO_URL;
const bellIconEl = document.getElementById('bellIcon');
if (bellIconEl) bellIconEl.innerHTML = icon('bell', 20);

document.getElementById('openProfileBtn').addEventListener('click', () => { state.isProfileOpen = true; render(); });
document.getElementById('openProfileAvatar').addEventListener('click', () => { state.isProfileOpen = true; render(); });

function setActiveTab(id) {
  state.activeTab = id;
  render();
}

function setTitle() {
  const map = {
    [Screen.Home]: 'NECS 2026',
    [Screen.Stats]: 'Team Stats',
    [Screen.Replays]: 'Qualifiers',
    [Screen.Brackets]: 'Brackets',
    [Screen.Community]: 'Chat',
  };
  titleEl.textContent = map[state.activeTab];
}

function renderBottomNav() {
  const items = [
    { id: Screen.Home, label: 'Home' },
    { id: Screen.Stats, label: 'Stats' },
    { id: Screen.Replays, label: 'Quals' },
    { id: Screen.Brackets, label: 'Bracket' },
    { id: Screen.Community, label: 'Chat' },
  ];
  bottomNav.innerHTML = items.map(item => {
    const isActive = state.activeTab === item.id;
    const name = item.id===Screen.Home?'home': item.id===Screen.Stats?'barChart': item.id===Screen.Replays?'playCircle': item.id===Screen.Brackets?'trophy':'messageSquare';
    return `<button class="nav-btn flex flex-col items-center justify-center w-full h-16 space-y-1 transition-all duration-300 relative ${isActive ? 'text-cyan' : 'text-textMuted/60 hover:text-textMuted'}" onclick="setActiveTab('${item.id}')">
      ${isActive ? '<div class=\"absolute -top-[1px] w-8 h-[2px] bg-cyan shadow-[0_0_10px_#00B7E6]\"></div>' : ''}
      <span class="inline-block">${icon(name, 20)}</span>
      <span class="text-[10px] font-medium">${item.label}</span>
    </button>`;
  }).join('');
}

function HomeScreen() {
  const HEROES = [
    'https://placehold.co/600x400/0f172a/00b7e6?text=NECS+Arena',
    'https://placehold.co/600x400/0f172a/C92A2A?text=Valorant+Stage',
    'https://placehold.co/600x400/0f172a/ffffff?text=Rocket+League+Stadium',
  ];
  const heroImg = HEROES[state.heroIndex % HEROES.length];
  return `
  <div class="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex items-center justify-between bg-surface/50 border border-white/5 p-3 rounded-xl backdrop-blur-md text-xs">
      <div class="flex items-center gap-2 text-cyan"><span class="font-semibold tracking-wide">Nashville, TN</span></div>
      <div class="h-4 w-px bg-white/10"></div>
      <div class="flex items-center gap-2 text-textMuted"><span class="font-medium">May 6-10, 2026</span></div>
    </div>

    <div class="relative rounded-2xl overflow-hidden group border border-white/5 h-72 shadow-2xl">
      <div class="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/80 to-transparent z-10"></div>
      <img src="${heroImg}" alt="Event Arena" class="w-full h-full object-cover opacity-70" />
      <div class="absolute inset-0 z-20 p-4 flex flex-col justify-end items-center text-center">
        <img src="${LOGO_URL}" alt="NECS 2026" class="w-12 h-12 object-contain mb-2 drop-shadow-[0_0_15px_rgba(0,183,230,0.5)]" />
        ${badge('Opening Ceremony','upcoming')}
        <h2 class="text-2xl font-display font-bold text-white mt-2 mb-0.5">The Finals Await</h2>
        <p class="text-cyan font-medium text-xs mb-4">Nashville Music City Center</p>
        <div class="flex items-center gap-3 mb-4">
          <div class="text-center"><div class="text-xl font-bold font-mono bg-white/10 rounded px-1.5 py-0.5 backdrop-blur border border-white/10">04</div><div class="text-[9px] text-textMuted uppercase mt-0.5">Days</div></div>
          <div class="text-lg font-bold text-white/30">:</div>
          <div class="text-center"><div class="text-xl font-bold font-mono bg-white/10 rounded px-1.5 py-0.5 backdrop-blur border border-white/10">12</div><div class="text-[9px] text-textMuted uppercase mt-0.5">Hrs</div></div>
          <div class="text-lg font-bold text-white/30">:</div>
          <div class="text-center"><div class="text-xl font-bold font-mono bg-white/10 rounded px-1.5 py-0.5 backdrop-blur border border-white/10">30</div><div class="text-[9px] text-textMuted uppercase mt-0.5">Min</div></div>
        </div>
        <button class="bg-white text-midnight font-bold py-2 px-5 rounded-full text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] btn" onclick="openStore()">Get Tickets</button>
      </div>
    </div>

    <div>
      <h3 class="text-base font-display font-semibold mb-3 flex items-center gap-2">Opening Schedule<div class="h-px bg-white/10 flex-grow ml-2"></div></h3>
      <div class="space-y-2">
        ${MATCHES.map(match => `
          <div class="glass-panel card p-3 rounded-lg flex items-center justify-between text-xs">
            <div class="flex items-center gap-2 w-1/3 min-w-0">
              <div class="w-6 h-6 rounded-md overflow-hidden border border-white/5 flex-shrink-0">
                <img src="https://placehold.co/48x48/071026/00B7E6?text=${encodeURIComponent(match.teamA.logo)}" alt="${match.teamA.name}" class="w-full h-full object-cover" />
              </div>
              <div class="flex flex-col min-w-0"><span class="font-bold truncate">${match.teamA.name}</span></div>
            </div>
            <div class="flex flex-col items-center justify-center w-1/3 text-center flex-shrink-0">
              <div class="flex items-center gap-1 text-cyan font-bold bg-cyan/10 px-1.5 py-0.5 rounded border border-cyan/20 text-[8px] whitespace-nowrap">${match.time.split('•')[1]}</div>
              <span class="text-[8px] text-textMuted/60 mt-0.5 uppercase tracking-wide">${match.game}</span>
            </div>
            <div class="flex items-center gap-2 w-1/3 justify-end min-w-0 text-right">
              <div class="flex flex-col min-w-0"><span class="font-bold truncate">${match.teamB.name}</span></div>
              <div class="w-6 h-6 rounded-md overflow-hidden border border-white/5 flex-shrink-0">
                <img src="https://placehold.co/48x48/071026/C92A2A?text=${encodeURIComponent(match.teamB.logo)}" alt="${match.teamB.name}" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  </div>`;
}

function PlayerStatsScreen() {
  const games = ['All','Valorant','Rocket League','Super Smash Bros'];
  const active = state.activeGameFilter;
  const filtered = active === 'All' ? PLAYERS : PLAYERS.filter(p => p.game === active);
  const teams = {};
  filtered.forEach(p => { (teams[p.team] ||= []).push(p);});
  const selected = state.selectedPlayerId ? PLAYERS.find(p => p.id === state.selectedPlayerId) : null;
  
  if (selected) {
    return `
    <div class="animate-in fade-in zoom-in-95 duration-300 pb-8">
      <button class="mb-4 text-xs text-textMuted btn ripple hover-glow flex items-center gap-1" onclick="clearSelectedPlayer()">${icon('arrowLeft', 14)} Back to Teams</button>
      
      <div class="glass-panel rounded-3xl p-6 relative overflow-hidden mb-6 border border-white/10">
        <div class="absolute top-0 right-0 p-4 opacity-20">
          <img src="https://placehold.co/100x100/ffffff/000000?text=${selected.team.charAt(0)}" class="w-32 h-32 object-contain" />
        </div>
        <div class="relative z-10">
          <div class="flex items-center gap-5 mb-6">
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-surface to-black border-2 border-cyan/30 overflow-hidden shadow-xl shadow-cyan/10">
              <img src="${selected.image}" alt="${selected.handle}" class="w-full h-full object-cover" />
            </div>
            <div>
              <h2 class="text-3xl font-display font-bold text-white tracking-tight">${selected.handle}</h2>
              <div class="flex flex-col text-sm text-textMuted">
                <span class="text-cyan font-bold text-base">${selected.name}</span>
                <span class="text-xs mt-1 bg-white/5 px-2 py-0.5 rounded-full w-fit border border-white/5">${selected.team} • ${selected.role}</span>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div class="bg-midnight/60 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div class="text-[10px] uppercase text-textMuted tracking-wider mb-1 font-bold">Rating</div>
              <div class="text-3xl font-display font-bold text-white">${selected.kda}</div>
              <div class="text-[10px] text-green-400 font-bold flex items-center gap-1">▲ Top 5% <span class="text-textMuted font-normal">Region</span></div>
            </div>
            <div class="bg-midnight/60 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div class="text-[10px] uppercase text-textMuted tracking-wider mb-1 font-bold">Win Rate</div>
              <div class="text-3xl font-display font-bold text-white">${selected.winRate}</div>
              <div class="text-[10px] text-cyan font-bold flex items-center gap-1">● Consistent <span class="text-textMuted font-normal">Form</span></div>
            </div>
          </div>
          
          <div class="bg-midnight/40 rounded-2xl p-2 border border-white/5">
            <div class="h-56 w-full flex items-center justify-center">${radarSVG(selected.stats)}</div>
          </div>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-sm font-bold text-white px-1">Recent Performance</h3>
        <div class="space-y-2">
          <div class="bg-surface/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-8 bg-green-500 rounded-full"></div>
              <div>
                <div class="text-xs font-bold text-white">vs. Neon Spectre</div>
                <div class="text-[10px] text-textMuted">May 2 • 2-0 Victory</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-bold text-green-400">WIN</div>
              <div class="text-[10px] text-textMuted">MVP</div>
            </div>
          </div>
          <div class="bg-surface/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-8 bg-red-500 rounded-full"></div>
              <div>
                <div class="text-xs font-bold text-white">vs. Iron Legion</div>
                <div class="text-[10px] text-textMuted">Apr 28 • 1-2 Defeat</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-bold text-red-400">LOSS</div>
              <div class="text-[10px] text-textMuted">2nd Fragger</div>
            </div>
          </div>
          <div class="bg-surface/40 p-3 rounded-xl border border-white/5 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-1 h-8 bg-green-500 rounded-full"></div>
              <div>
                <div class="text-xs font-bold text-white">vs. Quantum</div>
                <div class="text-[10px] text-textMuted">Apr 25 • 2-1 Victory</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-bold text-green-400">WIN</div>
              <div class="text-[10px] text-textMuted">Match MVP</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
  return `
  <div class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
    <div class="flex gap-3 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 select-none">
      ${games.map(g => `<button class="px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 border btn ripple flex-shrink-0 ${active===g ? 'bg-gradient-to-r from-cyan to-blue-500 text-white border-transparent shadow-lg shadow-cyan/25 scale-105' : 'bg-surface/50 text-textMuted border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white'}" onclick="setGameFilter('${g}')">${g}</button>`).join('')}
    </div>
    
    <div class="bg-gradient-to-r from-cyan/20 to-blue-600/20 p-4 rounded-2xl border border-cyan/20 relative overflow-hidden">
      <div class="relative z-10">
        <h4 class="text-sm font-bold text-white mb-1">Qualifier Data</h4>
        <p class="text-xs text-textMuted max-w-[80%]">Stats based on regional qualifier performance leading up to NECS 2026.</p>
      </div>
      <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cyan/10 to-transparent"></div>
      <div class="absolute -right-4 -bottom-4 text-cyan/10 transform rotate-12">
        ${icon('activity', 80)}
      </div>
    </div>

    <div class="space-y-4 pb-8">
      ${Object.entries(teams).map(([teamName, players]) => `
        <div class="border border-white/5 rounded-2xl overflow-hidden bg-surface/30 transition-all duration-300 ${state.expandedTeam===teamName ? 'ring-1 ring-cyan/30 bg-surface/50' : ''}">
          <button class="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors btn ripple" onclick="toggleTeam('${teamName}')">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-midnight border border-white/10 flex items-center justify-center text-lg font-bold text-textMuted">
                ${teamName.charAt(0)}
              </div>
              <div class="text-left">
                <h3 class="font-bold text-sm text-white">${teamName}</h3>
                <p class="text-[10px] text-textMuted uppercase tracking-wider font-semibold text-cyan">${players[0].game}</p>
              </div>
            </div>
            <span class="text-textMuted chev ${state.expandedTeam===teamName?'open':''} w-6 h-6 flex items-center justify-center bg-white/5 rounded-full">▾</span>
          </button>
          ${state.expandedTeam===teamName ? `<div class="divide-y divide-white/5 bg-midnight/30 border-t border-white/5 animate-in slide-down">${players.map(p=>`
            <button class="w-full flex items-center justify-between p-3 pl-4 hover:bg-white/5 transition-colors btn ripple group" onclick="selectPlayer('${p.id}')">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-surface overflow-hidden border border-white/10 group-hover:border-cyan/50 transition-colors"><img src="${p.image}" alt="${p.handle}" class="w-full h-full object-cover"/></div>
                <div class="text-left">
                  <span class="block text-sm font-bold text-white group-hover:text-cyan transition-colors">${p.handle}</span>
                  <span class="block text-[10px] text-textMuted">${p.role}</span>
                </div>
              </div>
              <div class="flex items-center gap-3 pr-2">
                <div class="text-right">
                  <div class="text-[10px] text-textMuted uppercase">Rating</div>
                  <div class="text-xs font-bold text-white font-mono">${p.kda}</div>
                </div>
                <span class="text-textMuted group-hover:translate-x-1 transition-transform">›</span>
              </div>
            </button>`).join('')}</div>` : ''}
        </div>
      `).join('')}
    </div>
  </div>`;
}

function ReplaysScreen() {
  return `<div class="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div class="flex justify-between items-center"><h2 class="text-xl font-display font-bold">Qualifier Highlights</h2><button class="text-cyan text-xs font-semibold hover:text-white transition-colors" onclick="state.viewAllReplays=true; render()">View All</button></div>
    <div class="space-y-4">${REPLAYS.slice(0, 3).map(r => `
      <div class="group relative rounded-xl overflow-hidden bg-surface border border-white/5 active:scale-[0.98] transition-all shadow-lg">
        <div class="relative aspect-video">
          <img src="${r.thumbnail}" alt="${r.title}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div class="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold border border-white/10">${r.duration}</div>
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity scale-75 group-hover:scale-100">
            ${icon('playCircle', 24)}
          </div>
        </div>
        <div class="p-3">
          <div class="flex justify-between items-start mb-1"><span class="text-[10px] font-bold text-cyan uppercase tracking-wider bg-cyan/10 px-1.5 py-0.5 rounded">${r.game}</span><span class="text-[10px] text-textMuted">${r.date}</span></div>
          <h3 class="font-semibold text-sm leading-tight mb-2 pr-4 text-white group-hover:text-cyan transition-colors">${r.title}</h3>
          <div class="flex items-center gap-3 text-textMuted text-xs">
            <span class="flex items-center gap-1">${icon('activity', 12)} ${r.views} views</span>
            <span class="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">Share</span>
          </div>
        </div>
      </div>`).join('')}</div>
  </div>`;
}

function AllReplaysScreen() {
  return `<div class="space-y-4 animate-in fade-in slide-in-from-right duration-300">
    <div class="flex items-center gap-3 mb-2">
      <button class="p-2 hover:bg-white/5 rounded-full transition-colors btn" onclick="state.viewAllReplays=false; render()">${icon('arrowLeft', 20)}</button>
      <h2 class="text-xl font-display font-bold">All Highlights</h2>
    </div>
    <div class="grid grid-cols-1 gap-4 pb-4">
      ${REPLAYS.map(r => `
        <div class="flex gap-3 bg-surface/50 p-2 rounded-xl border border-white/5 hover:bg-surface transition-colors group">
          <div class="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
            <img src="${r.thumbnail}" alt="${r.title}" class="w-full h-full object-cover" />
            <div class="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-bold">${r.duration}</div>
          </div>
          <div class="flex flex-col justify-center min-w-0">
            <span class="text-[9px] font-bold text-cyan uppercase tracking-wider mb-0.5">${r.game}</span>
            <h3 class="font-semibold text-xs leading-tight mb-1 text-white truncate pr-2">${r.title}</h3>
            <div class="flex items-center gap-2 text-textMuted text-[10px]">
              <span>${r.views} views</span>
              <span>•</span>
              <span>${r.date}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  </div>`;
}

function BracketScreen() {
  const rounds = ['Quarterfinals','Semifinals','Grand Final'];
  return `<div class="space-y-6 h-full animate-in fade-in zoom-in-95 duration-500">
    <div class="flex items-center justify-between mb-4"><div><h2 class="text-xl font-display font-bold">Projected Bracket</h2><p class="text-xs text-textMuted">Matches start May 6th</p></div></div>
    <div class="space-y-8 relative">
      <div class="absolute left-[7px] top-4 bottom-10 w-px bg-white/5 z-0"></div>
      ${rounds.map(round => `
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-3"><div class="w-3 h-3 rounded-full bg-cyan border-2 border-midnight"></div><h3 class="text-sm font-bold text-textMuted uppercase tracking-wider">${round}</h3></div>
          <div class="pl-6 space-y-3">${BRACKET.filter(m=>m.round===round).map(match=>matchNode(match)).join('')}</div>
        </div>`).join('')}
    </div>
  </div>`;
}

function ChatScreen() {
  const msgs = state.chatMessages;
  return `<div class="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div class="flex-1 overflow-y-auto hide-scrollbar space-y-4 pb-24 px-1" id="chatScroll">
      <div class="text-center py-2"><span class="text-[10px] text-textMuted uppercase tracking-widest bg-surface/50 px-3 py-1 rounded-full border border-white/5">Pre-Event Discussion</span></div>
      ${msgs.map(msg => `
        <div class="flex gap-3 ${msg.isMe?'flex-row-reverse':''} animate-in slide-up">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border border-white/10 flex-shrink-0 ${msg.role==='admin'?'bg-crimson text-white':msg.role==='mod'?'bg-cyan text-white':'bg-surface text-textMuted'}">${msg.avatar}</div>
          <div class="max-w-[75%] ${msg.isMe?'items-end':'items-start'} flex flex-col">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-xs font-bold ${msg.role==='admin'?'text-crimson':msg.role==='mod'?'text-cyan':'text-textMain'}">${msg.user}</span>
              ${msg.role?`<span class="text-[9px] px-1 rounded text-white uppercase font-bold ${msg.role==='admin'?'bg-crimson/50':'bg-cyan/50'}">${msg.role}</span>`:''}
              <span class="text-[9px] text-textMuted opacity-50">${msg.timestamp}</span>
            </div>
            <div class="p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isMe?'bg-cyan text-midnight rounded-tr-none font-medium':'bg-surface border border-white/10 text-textMain rounded-tl-none'}">
              ${msg.message}
            </div>
          </div>
        </div>`).join('')}
    </div>
    <div class="fixed bottom-[64px] left-0 right-0 p-4 z-40 bg-gradient-to-t from-midnight via-midnight/95 to-transparent pt-8">
      <div class="glass-panel rounded-full p-1 pl-4 flex items-center gap-2 hover-glow shadow-lg shadow-black/50">
        <input type="text" id="chatInput" placeholder="Discuss the upcoming event..." class="bg-transparent border-none outline-none text-sm text-white flex-grow h-10 placeholder:text-textMuted/50" />
        <button class="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white btn ripple" onclick="sendChat()">${icon('send',20)}</button>
      </div>
    </div>
  </div>`;
}

function openStore() { state.isStoreOpen = true; render(); }
function closeStore() { state.isStoreOpen = false; render(); }

const tickets = [
  { id: 'ga', name: 'General Admission', price: 45, description: 'Access to all arenas.', features: ['Standing room only','Expo hall entry'], color:'border-white/10', btnColor:'hover:bg-white/10' },
  { id: 'vip', name: 'VIP', price: 125, description: 'Reserved seating and swag.', features: ['Exclusive VIP lounge access','Complimentary snacks','Priority Entry'], color:'border-cyan/50', btnColor:'hover:bg-cyan/20 hover:text-cyan hover:border-cyan/50', popular:true },
  { id: 'all', name: 'All-Access', price: 299, description: 'Backstage access and merch.', features: ['Meet & Greet with players','Exclusive merchandise','After-party Access','Front Row Seating'], color:'border-crimson/50', btnColor:'hover:bg-crimson/20 hover:text-crimson hover:border-crimson/50' },
];

function addToCart(id) {
  const t = tickets.find(x=>x.id===id);
  state.cart.push({ ...t, cartId: Date.now()+Math.random() });
  render();
}

function renderStore() {
  const subtotal = state.cart.reduce((acc,i)=>acc+i.price,0);
  const fees = subtotal * 0.05;
  const total = subtotal + fees;
  ticketStore.className = "absolute inset-0 z-[101] bg-midnight flex flex-col animate-in slide-up duration-300" + (state.isStoreOpen?"":" hidden");
  let inner = '';
  const header = `
    <div class="p-4 border-b border-white/5 bg-surface/90 backdrop-blur flex items-center justify-between shadow-md z-10 pt-safe">
      <div class="flex items-center gap-4">
        <button class="p-2 hover:bg-white/5 rounded-full transition-colors btn" onclick="${state.storeView==='browse'?'closeStore()':'setStoreView(\''+(state.storeView==='checkout'?'cart':'browse')+'\')'}">${state.storeView==='browse'?icon('x',20):icon('arrowLeft',20)}</button>
        <h2 class="text-xl font-display font-bold">${state.storeView==='browse'?'Box Office':state.storeView==='cart'?'Your Cart':state.storeView==='checkout'?'Checkout':'Success'}</h2>
      </div>
      ${state.storeView!=='success' && state.storeView!=='checkout' ? `<button class="relative p-2 hover:bg-white/5 rounded-full transition-colors btn" onclick="setStoreView('cart')">${icon('shoppingCart',20)}${state.cart.length>0?`<span class=\"absolute -top-1 -right-1 w-4 h-4 bg-crimson rounded-full flex items-center justify-center text-[9px] font-bold text-white border border-midnight\">${state.cart.length}</span>`:''}</button>`:''}
    </div>`;
  const browse = `
    <div class="flex-1 overflow-y-auto p-4 space-y-4 pb-32 hide-scrollbar">
      <div class="bg-gradient-to-r from-cyan/20 to-blue-600/20 p-4 rounded-xl border border-cyan/20 mb-6 flex items-start gap-3">
        <div class="w-6 h-6">${icon('creditCard',20)}</div>
        <div><h3 class="font-bold text-sm text-white">Tickets Selling Fast!</h3><p class="text-xs text-textMuted mt-1">Grand Finals seating is 85% sold out. Secure your spot today.</p></div>
      </div>
      ${tickets.map(t=>`
        <div class="relative bg-surface rounded-2xl p-5 border ${t.color} shadow-lg overflow-hidden group transition-all card">
          ${t.popular?`<div class="absolute top-0 right-0 bg-cyan text-midnight text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-lg">Best Value</div>`:''}
          <h3 class="text-2xl font-display font-bold mb-1 text-white">${t.name}</h3>
          <div class="flex items-baseline gap-1 mb-4"><span class="text-3xl font-mono font-bold text-white">$${t.price}</span><span class="text-textMuted text-xs">/ person</span></div>
          <p class="text-textMuted text-sm mb-6 border-b border-white/5 pb-4">${t.description}</p>
          <div class="space-y-3 mb-8">${t.features.map(f=>`<div class="flex items-center gap-3 text-sm"><div class="w-5 h-5 rounded-full bg-white/5"></div><span class="text-textMain">${f}</span></div>`).join('')}</div>
          <button class="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide bg-white/5 border border-white/10 ${t.btnColor} btn ripple hover-glow" onclick="addToCart('${t.id}')">Add to Cart</button>
        </div>`).join('')}
    </div>`;
  const cartView = `
    <div class="flex-1 flex flex-col p-4 space-y-4">
      ${state.cart.length===0?`
        <div class="flex-1 flex flex-col items-center justify-center text-textMuted space-y-4 py-12">
          <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-3xl">${icon('shoppingCart',40)}</div>
          <div class="text-center">
            <p class="font-bold text-white mb-2">Your cart is empty</p>
            <p class="text-xs text-textMuted">Add tickets to get started</p>
          </div>
          <button onclick="setStoreView('browse')" class="text-cyan text-sm font-bold px-6 py-2 rounded-lg border border-cyan/30 hover:bg-cyan/10 transition-colors">Browse Tickets</button>
        </div>`:
        `
        <div class="space-y-1 mb-2">
          <h3 class="text-xs text-textMuted uppercase tracking-wider font-bold">Items in Cart (${state.cart.length})</h3>
        </div>
        <div class="flex-1 overflow-y-auto space-y-3 hide-scrollbar pr-2">
          ${state.cart.map(item=>`
            <div class="flex items-center justify-between bg-surface/60 p-4 rounded-xl border border-white/10 hover:border-cyan/30 transition-all group">
              <div class="flex-1">
                <h4 class="font-bold text-white text-sm group-hover:text-cyan transition-colors">${item.name}</h4>
                <p class="text-xs text-textMuted mt-1">$${item.price} per ticket</p>
              </div>
              <button class="p-2 text-textMuted hover:text-crimson hover:bg-crimson/10 rounded-lg transition-all btn" onclick="removeFromCart(${item.cartId})" title="Remove from cart">${icon('trash',18)}</button>
            </div>`).join('')}
        </div>
        <div class="bg-surface/80 border border-white/10 p-4 rounded-2xl space-y-3 sticky bottom-0">
          <div class="space-y-2">
            <div class="flex justify-between text-xs text-textMuted">
              <span>Subtotal</span>
              <span class="font-mono">$${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-xs text-textMuted">
              <span>Service Fees (5%)</span>
              <span class="font-mono">$${fees.toFixed(2)}</span>
            </div>
            <div class="border-t border-white/10 pt-2 flex justify-between font-bold text-white">
              <span>Total Amount</span>
              <span class="text-lg font-mono">$${total.toFixed(2)}</span>
            </div>
          </div>
          <button class="w-full bg-gradient-primary py-3 rounded-xl font-bold text-white text-sm btn ripple hover-glow transition-all shadow-lg shadow-crimson/20" onclick="setStoreView('checkout')">Proceed to Checkout</button>
        </div>
        `}
    </div>`;
  const checkout = `
    <div class="flex-1 flex flex-col p-4 overflow-y-auto hide-scrollbar space-y-4">
      <div class="bg-gradient-to-br from-cyan/15 to-blue-600/15 border border-cyan/30 p-4 rounded-2xl">
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 mt-0.5 text-cyan flex-shrink-0">${icon('creditCard',20)}</div>
          <div>
            <h3 class="font-bold text-white text-sm mb-1">Order Summary</h3>
            <p class="text-xs text-textMuted">Total: <span class="text-white font-mono font-bold">$${total.toFixed(2)}</span></p>
          </div>
        </div>
      </div>
      <div class="space-y-1">
        <h3 class="text-xs text-textMuted uppercase font-bold tracking-wider">Payment Details</h3>
      </div>
      <div class="bg-surface/60 p-4 rounded-2xl border border-white/10 space-y-4">
        <div class="space-y-2">
          <label class="text-xs text-textMuted uppercase font-bold tracking-wider">Full Name</label>
          <input type="text" placeholder="JOHN DOE" class="w-full bg-midnight/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-textMuted/40 focus:outline-none focus:border-cyan/50 transition-colors text-sm"/>
        </div>
        <div class="space-y-2">
          <label class="text-xs text-textMuted uppercase font-bold tracking-wider">Email Address</label>
          <input type="email" placeholder="john@example.com" class="w-full bg-midnight/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-textMuted/40 focus:outline-none focus:border-cyan/50 transition-colors text-sm"/>
        </div>
        <div class="space-y-2">
          <label class="text-xs text-textMuted uppercase font-bold tracking-wider">Card Number</label>
          <input type="text" placeholder="0000 0000 0000 0000" class="w-full bg-midnight/50 border border-white/10 rounded-lg p-3 text-white font-mono placeholder:text-textMuted/40 focus:outline-none focus:border-cyan/50 transition-colors text-sm"/>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div class="space-y-2">
            <label class="text-xs text-textMuted uppercase font-bold tracking-wider">Expiry</label>
            <input type="text" placeholder="MM/YY" class="w-full bg-midnight/50 border border-white/10 rounded-lg p-3 text-white font-mono placeholder:text-textMuted/40 focus:outline-none focus:border-cyan/50 transition-colors text-sm"/>
          </div>
          <div class="space-y-2">
            <label class="text-xs text-textMuted uppercase font-bold tracking-wider">CVC</label>
            <input type="text" placeholder="123" class="w-full bg-midnight/50 border border-white/10 rounded-lg p-3 text-white font-mono placeholder:text-textMuted/40 focus:outline-none focus:border-cyan/50 transition-colors text-sm"/>
          </div>
        </div>
      </div>
      <div class="mt-auto pt-4 space-y-3">
        <div class="bg-surface/80 border border-white/10 p-4 rounded-xl">
          <div class="flex justify-between items-center">
            <span class="text-sm font-bold text-white">Total Amount</span>
            <span class="text-2xl font-mono font-bold text-cyan">$${total.toFixed(2)}</span>
          </div>
        </div>
        <button class="w-full bg-gradient-primary py-4 rounded-xl font-bold text-white text-sm btn ripple hover-glow transition-all shadow-lg shadow-crimson/20 uppercase tracking-wide" onclick="processCheckout()">Complete Purchase</button>
        <button class="w-full bg-white/5 border border-white/10 py-3 rounded-xl font-bold text-white text-sm btn transition-colors hover:bg-white/10" onclick="setStoreView('cart')">Back to Cart</button>
      </div>
    </div>`;
  const success = `
    <div class="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div class="relative">
        <div class="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan/20 rounded-full blur-2xl"></div>
        <div class="relative w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center text-3xl font-bold text-green-500">
          ✓
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-display font-bold text-white mb-2">Order Confirmed!</h2>
        <p class="text-textMuted text-sm">Your tickets have been sent to your email and added to your wallet.</p>
      </div>
      <div class="w-full bg-gradient-to-r from-surface/50 to-surface/30 border border-white/10 rounded-2xl p-4 space-y-3">
        <div>
          <p class="text-[10px] text-textMuted uppercase tracking-wider font-bold mb-2">Order ID</p>
          <p class="font-mono text-white font-bold">#NECS-${Math.floor(Math.random()*1000000)}</p>
        </div>
        <div class="border-t border-white/10 pt-3">
          <p class="text-[10px] text-textMuted uppercase tracking-wider font-bold mb-2">Amount Paid</p>
          <p class="font-mono text-lg text-cyan font-bold">$${total.toFixed(2)}</p>
        </div>
        <div class="border-t border-white/10 pt-3">
          <p class="text-[10px] text-textMuted uppercase tracking-wider font-bold mb-2">Confirmation Sent To</p>
          <p class="text-sm text-white">Check your email for tickets</p>
        </div>
      </div>
      <div class="w-full space-y-2 pt-4">
        <button class="w-full bg-gradient-primary py-3 rounded-xl font-bold text-white btn ripple hover-glow transition-all text-sm" onclick="closeStore()">Back to App</button>
        <button class="w-full bg-white/5 border border-white/10 py-3 rounded-xl font-bold text-white btn transition-colors hover:bg-white/10 text-sm">View Tickets</button>
      </div>
    </div>`;
  const footerBar = state.storeView==='browse' && state.cart.length>0 ? `
    <div class="absolute bottom-0 left-0 right-0 p-4 bg-surface/90 backdrop-blur border-t border-white/5">
      <button class="w-full bg-gradient-primary py-4 rounded-xl font-bold text-white btn ripple hover-glow" onclick="setStoreView('cart')">View Cart (${state.cart.length})</button>
    </div>` : '';
  if (state.storeView==='browse') inner = browse; else if (state.storeView==='cart') inner = cartView; else if (state.storeView==='checkout') inner = checkout; else inner = success;
  ticketStore.innerHTML = header + inner + footerBar;
}

function setStoreView(v){ state.storeView = v; renderStore(); }
function removeFromCart(cartId){ state.cart = state.cart.filter(i=>i.cartId!==cartId); renderStore(); }
function processCheckout(){ state.storeView='success'; renderStore(); }

function setGameFilter(g){ state.activeGameFilter = g; state.expandedTeam = null; state.selectedPlayerId = null; render(); }
function toggleTeam(team){ state.expandedTeam = state.expandedTeam===team?null:team; render(); }
function selectPlayer(id){ state.selectedPlayerId = id; render(); }
function clearSelectedPlayer(){ state.selectedPlayerId = null; render(); }

function sendChat(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  state.chatMessages.push({ id: Date.now().toString(), user: 'You', avatar: 'U', message: text, timestamp: 'Now', isMe: true });
  input.value='';
  render();
  const scroller = document.getElementById('chatScroll');
  if (scroller) scroller.scrollTop = scroller.scrollHeight;
}

function renderScreen() {
  switch(state.activeTab){
    case Screen.Home: return HomeScreen();
    case Screen.Stats: return PlayerStatsScreen();
    case Screen.Replays: return ReplaysScreen();
    case Screen.Brackets: return BracketScreen();
    case Screen.Community: return ChatScreen();
    default: return HomeScreen();
  }
}

function renderProfileModal(){
  if (!state.isProfileOpen) { profileModal.className = 'hidden'; profileModal.innerHTML=''; return; }
  profileModal.className = 'absolute inset-0 z-[100] flex items-end sm:items-center justify-center animate-in fade-in duration-200';
  const content = `
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeProfile()"></div>
    <div class="relative w-full max-w-md bg-surface/95 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden animate-in slide-up duration-300">
      <div class="p-6 border-b border-white/5 flex items-start justify-between">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full p-1 bg-gradient-primary">
            <img src="https://placehold.co/100x100/0E1A2A/00B7E6?text=User" alt="Profile" class="w-full h-full rounded-full object-cover border-2 border-midnight" />
          </div>
          <div>
            <h2 class="text-xl font-bold font-display">PlayerOne</h2>
            <p class="text-sm text-textMuted">Comp ID: #883921</p>
            <div class="flex gap-2 mt-2"><span class="text-[10px] bg-cyan/20 text-cyan px-2 py-0.5 rounded border border-cyan/20 font-bold">VIP PASS</span></div>
          </div>
        </div>
        <button onclick="closeProfile()" class="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">✕</button>
      </div>
      <div class="flex border-b border-white/5">
        <button class="flex-1 py-4 text-sm font-semibold" onclick="openTicketTab()">My Ticket</button>
        <button class="flex-1 py-4 text-sm font-semibold" onclick="openNotificationsTab()">Notifications</button>
      </div>
      <div class="p-6 h-[400px] overflow-y-auto hide-scrollbar bg-midnight/30" id="profileContent"></div>
    </div>`;
  profileModal.innerHTML = content;
  openTicketTab();
}

function closeProfile(){ state.isProfileOpen = false; render(); }
function openTicketTab(){
  const html = TICKETS.map(ticket=>`
    <div class="bg-white text-midnight rounded-3xl overflow-hidden shadow-2xl relative mb-6 mx-1 transform transition-transform hover:scale-[1.02]">
      <!-- Top Section -->
      <div class="p-5 pb-6 relative">
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-midnight rounded-lg flex items-center justify-center p-1">
              <img src="${LOGO_URL}" class="w-full h-full object-contain" alt="NECS"/>
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-[10px] tracking-widest text-crimson uppercase">Official Pass</span>
              <span class="font-bold text-xs text-gray-400">Nashville, TN</span>
            </div>
          </div>
          <span class="bg-midnight text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-gray-200">${ticket.type}</span>
        </div>
        
        <h3 class="text-xl font-display font-bold uppercase leading-tight mb-1">${ticket.eventName}</h3>
        <p class="text-xs font-medium text-gray-500 mb-5 flex items-center gap-1">
          <span>${icon('calendar', 12)}</span> ${ticket.date}
        </p>
        
        <div class="grid grid-cols-4 gap-2 bg-gray-50 rounded-xl p-3 border border-gray-100">
          <div class="text-center border-r border-gray-200">
            <p class="text-[8px] uppercase text-gray-400 font-bold mb-0.5">Gate</p>
            <p class="text-lg font-bold font-mono leading-none">N</p>
          </div>
          <div class="text-center border-r border-gray-200">
            <p class="text-[8px] uppercase text-gray-400 font-bold mb-0.5">Sec</p>
            <p class="text-lg font-bold font-mono leading-none">A</p>
          </div>
          <div class="text-center border-r border-gray-200">
            <p class="text-[8px] uppercase text-gray-400 font-bold mb-0.5">Row</p>
            <p class="text-lg font-bold font-mono leading-none">1</p>
          </div>
          <div class="text-center">
            <p class="text-[8px] uppercase text-gray-400 font-bold mb-0.5">Seat</p>
            <p class="text-lg font-bold font-mono leading-none">12</p>
          </div>
        </div>
      </div>

      <!-- Tear Line -->
      <div class="relative h-4 bg-gray-50 flex items-center justify-center">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 bg-[#1a1a1a] rounded-full shadow-inner"></div>
        <div class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-[#1a1a1a] rounded-full shadow-inner"></div>
        <div class="w-full border-t-2 border-dashed border-gray-300 mx-4"></div>
      </div>

      <!-- Bottom Section -->
      <div class="bg-gray-50 p-4 flex items-center gap-4">
        <div class="flex-1">
          <div class="h-10 w-full opacity-80" style="background: repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 4px);"></div>
          <p class="text-[8px] font-mono text-center text-gray-400 mt-1 tracking-widest">#8392-1928-3819</p>
        </div>
        <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm border border-gray-100">
          <div class="w-full h-full bg-midnight flex items-center justify-center text-white text-[8px] font-bold">QR</div>
        </div>
      </div>
    </div>`).join('') + `
    <button class="w-full py-3 mt-2 rounded-xl border border-dashed border-white/20 text-textMuted text-sm font-medium hover:bg-white/5 transition-colors" onclick="buyMoreTickets()">+ Add Ticket</button>`;
  document.getElementById('profileContent').innerHTML = html;
}
function buyMoreTickets(){ state.isProfileOpen=false; state.isStoreOpen=true; render(); }
function openNotificationsTab(){
  const html = NOTIFICATIONS.map(note=>`
    <div class="p-4 rounded-xl border flex gap-3 ${note.read?'bg-surface/50 border-white/5 opacity-70':'bg-surface border-cyan/20'} mb-3">
      <div class="w-2 h-2 rounded-full mt-2 ${note.type==='game'?'bg-crimson':note.type==='promo'?'bg-purple-500':'bg-cyan'}"></div>
      <div class="flex-grow"><div class="flex justify-between items-start mb-1"><h4 class="text-sm font-bold ${note.read?'text-textMuted':'text-white'}">${note.title}</h4><span class="text-[10px] text-textMuted">${note.time}</span></div><p class="text-xs text-textMuted leading-relaxed">${note.message}</p></div>
    </div>`).join('') + '<div class="text-center pt-4"><button class="text-xs text-cyan font-semibold">Mark all as read</button></div>';
  document.getElementById('profileContent').innerHTML = html;
}

function render() {
  setTitle();
  renderBottomNav();
  
  if (state.viewAllReplays) {
    screenContainer.innerHTML = AllReplaysScreen();
  } else {
    screenContainer.innerHTML = renderScreen();
  }
  
  renderProfileModal();
  renderStore();
}

// Auto-rotate hero image every 5 seconds
setInterval(() => {
  state.heroIndex++;
  if (state.activeTab === Screen.Home && !state.isProfileOpen && !state.isStoreOpen) {
    render();
  }
}, 5000);

// initial render
render();
