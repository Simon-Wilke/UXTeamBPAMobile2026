// Data constants migrated from React version
const LOGO_URL = "https://drive.google.com/thumbnail?id=1J-RYb4TuLbRGYURI4ta-cx3eU_kfXPGk&sz=w1000";

const MATCHES = [
  { id: '1', game: 'Valorant', tournament: 'Opening Match', teamA: { name: 'Crimson Vipers', score: 0, logo: 'V' }, teamB: { name: 'Cobalt Strikers', score: 0, logo: 'S' }, status: 'UPCOMING', time: 'May 6 • 10:00 AM' },
  { id: '2', game: 'Rocket League', tournament: 'Group Stage A', teamA: { name: 'Nebula', score: 0, logo: 'N' }, teamB: { name: 'Quantum', score: 0, logo: 'Q' }, status: 'UPCOMING', time: 'May 6 • 11:30 AM' },
  { id: '3', game: 'Super Smash Bros', tournament: 'Top 64 Pool', teamA: { name: 'Solar Flare', score: 0, logo: 'S' }, teamB: { name: 'Lunar Tide', score: 0, logo: 'L' }, status: 'UPCOMING', time: 'May 6 • 1:00 PM' },
  { id: '4', game: 'Valorant', tournament: 'Group Stage B', teamA: { name: 'Obsidian', score: 0, logo: 'O' }, teamB: { name: 'Emerald', score: 0, logo: 'E' }, status: 'UPCOMING', time: 'May 6 • 2:30 PM' },
  { id: '5', game: 'Rocket League', tournament: 'Group Stage B', teamA: { name: 'Iron Legion', score: 0, logo: 'I' }, teamB: { name: 'Neon Spectre', score: 0, logo: 'N' }, status: 'UPCOMING', time: 'May 6 • 4:00 PM' }
];

const PLAYERS = [
  { id: 'v1', name: 'Alex Chen', handle: 'Ace', team: 'Crimson Vipers', role: 'Duelist', game: 'Valorant', image: 'https://placehold.co/200x200/C92A2A/ffffff?text=Ace', kda: '1.45', winRate: '62%', stats: [
    { subject: 'ACS', A: 145 }, { subject: 'K/D', A: 130 }, { subject: 'HS%', A: 140 }, { subject: 'First Blood', A: 135 }, { subject: 'Utility', A: 80 }, { subject: 'Survival', A: 90 }
  ]},
  { id: 'v2', name: 'Marcus Johnson', handle: 'Dash', team: 'Crimson Vipers', role: 'Duelist', game: 'Valorant', image: 'https://placehold.co/200x200/C92A2A/ffffff?text=Dash', kda: '1.38', winRate: '62%', stats: [
    { subject: 'ACS', A: 140 }, { subject: 'K/D', A: 125 }, { subject: 'HS%', A: 110 }, { subject: 'First Blood', A: 140 }, { subject: 'Utility', A: 95 }, { subject: 'Survival', A: 95 }
  ]},
  { id: 'v3', name: 'David Smith', handle: 'Strategist', team: 'Cobalt Strikers', role: 'Controller', game: 'Valorant', image: 'https://placehold.co/200x200/0047AB/ffffff?text=Strat', kda: '1.05', winRate: '68%', stats: [
    { subject: 'ACS', A: 90 }, { subject: 'K/D', A: 100 }, { subject: 'HS%', A: 110 }, { subject: 'Clutch', A: 140 }, { subject: 'Utility', A: 145 }, { subject: 'IGL', A: 150 }
  ]},
  { id: 'r1', name: 'Jean Pierre', handle: 'Gravity', team: 'Nebula', role: 'Striker', game: 'Rocket League', image: 'https://placehold.co/200x200/6366f1/ffffff?text=Grav', kda: 'N/A', winRate: '78%', stats: [
    { subject: 'Goals', A: 140 }, { subject: 'Saves', A: 130 }, { subject: 'Assists', A: 145 }, { subject: 'Aerials', A: 148 }, { subject: 'Speed', A: 120 }, { subject: 'Boost', A: 135 }
  ]},
  { id: 'r2', name: 'Lucas Wright', handle: 'Orbit', team: 'Quantum', role: 'All-Rounder', game: 'Rocket League', image: 'https://placehold.co/200x200/8b5cf6/ffffff?text=Orbit', kda: 'N/A', winRate: '72%', stats: [
    { subject: 'Goals', A: 130 }, { subject: 'Saves', A: 145 }, { subject: 'Assists', A: 120 }, { subject: 'Aerials', A: 140 }, { subject: 'Speed', A: 130 }, { subject: 'Mechanics', A: 150 }
  ]},
  { id: 's1', name: 'Leo King', handle: 'Monarch', team: 'Solar Flare', role: 'Swordsman', game: 'Super Smash Bros', image: 'https://placehold.co/200x200/f59e0b/ffffff?text=King', kda: 'N/A', winRate: '85%', stats: [
    { subject: 'Neutral', A: 150 }, { subject: 'Advantage', A: 140 }, { subject: 'Disadv.', A: 145 }, { subject: 'Edgeguard', A: 130 }, { subject: 'Ledgetrap', A: 140 }, { subject: 'Clutch', A: 145 }
  ]},
  { id: 's2', name: 'Sam Park', handle: 'Prodigy', team: 'Lunar Tide', role: 'Brawler', game: 'Super Smash Bros', image: 'https://placehold.co/200x200/0ea5e9/ffffff?text=Pro', kda: 'N/A', winRate: '82%', stats: [
    { subject: 'Neutral', A: 140 }, { subject: 'Advantage', A: 150 }, { subject: 'Disadv.', A: 130 }, { subject: 'Edgeguard', A: 140 }, { subject: 'Ledgetrap', A: 135 }, { subject: 'Clutch', A: 130 }
  ]}
];

const REPLAYS = [
  { id: 'r1', title: 'Road to Nashville: NA Qualifiers', duration: '10:34', views: '1.2M', game: 'Multiple', date: '2d ago', thumbnail: 'https://placehold.co/400x225/071026/00B7E6?text=Qualifier+Highlights' },
  { id: 'r2', title: 'Top 10 Plays from Regional Finals', duration: '05:05', views: '850K', game: 'Rocket League', date: '1w ago', thumbnail: 'https://placehold.co/400x225/071026/C92A2A?text=Top+10+Plays' },
  { id: 'r3', title: 'Monarch Interview: Preparing for 2026', duration: '14:12', views: '400K', game: 'Super Smash Bros', date: '3d ago', thumbnail: 'https://placehold.co/400x225/071026/ffffff?text=Player+Interview' },
  { id: 'r4', title: 'Ace vs The World: 1v5 Clutch', duration: '02:15', views: '2.1M', game: 'Valorant', date: '5d ago', thumbnail: 'https://placehold.co/400x225/C92A2A/ffffff?text=Insane+Clutch' },
  { id: 'r5', title: 'Behind the Scenes: Team Nebula', duration: '18:45', views: '320K', game: 'Rocket League', date: '2w ago', thumbnail: 'https://placehold.co/400x225/6366f1/ffffff?text=Team+Vlog' },
  { id: 'r6', title: 'Grand Finals Analysis w/ Casters', duration: '45:00', views: '150K', game: 'Multiple', date: '1d ago', thumbnail: 'https://placehold.co/400x225/00B7E6/071026?text=Analyst+Desk' }
];

const BRACKET = [
  { id: 'b1', round: 'Quarterfinals', teamA: 'Crimson Vipers', teamB: 'Obsidian', status: 'scheduled' },
  { id: 'b2', round: 'Quarterfinals', teamA: 'Cobalt Strikers', teamB: 'Emerald', status: 'scheduled' },
  { id: 'b3', round: 'Quarterfinals', teamA: 'Nebula', teamB: 'Solar Flare', status: 'scheduled' },
  { id: 'b4', round: 'Quarterfinals', teamA: 'Quantum', teamB: 'Lunar Tide', status: 'scheduled' },
  { id: 'b5', round: 'Semifinals', teamA: 'TBD', teamB: 'TBD', status: 'scheduled' },
  { id: 'b6', round: 'Semifinals', teamA: 'TBD', teamB: 'TBD', status: 'scheduled' },
  { id: 'b7', round: 'Grand Final', teamA: 'TBD', teamB: 'TBD', status: 'scheduled' },
];

const MESSAGES = [
  { id: 'm1', user: 'NECS_Admin', avatar: 'N', message: 'Welcome to the official NECS 2026 Companion App! The countdown has begun. #Nashville2026', timestamp: '10:00', role: 'admin' },
  { id: 'm2', user: 'ViperFan01', avatar: 'V', message: 'Crimson Vipers taking it all this year!', timestamp: '10:02' },
  { id: 'm3', user: 'RocketPro', avatar: 'R', message: 'Nebula looking strong in scrims.', timestamp: '10:03' },
  { id: 'm4', user: 'SmashMod', avatar: 'S', message: "Don't forget to check the schedule tab for pool times!", timestamp: '10:03', role: 'mod' },
];

const TICKETS = [
  { id: 't1', eventName: 'NECS 2026 Championship', type: 'VIP', date: 'May 6-10, 2026', seat: 'Sec A, Row 1, Seat 12', qrCodeData: 'necs-2026-vip-12345' },
];

const NOTIFICATIONS = [
  { id: 'n1', title: 'Schedule Released', message: 'The official Day 1 schedule is now available.', time: '2h ago', read: false, type: 'game' },
  { id: 'n2', title: 'Merch Presale', message: 'Order your Nashville 2026 jerseys before you arrive.', time: '1d ago', read: false, type: 'promo' },
  { id: 'n3', title: 'Ticket Update', message: 'Your VIP pass has been confirmed.', time: '2d ago', read: true, type: 'alert' },
];