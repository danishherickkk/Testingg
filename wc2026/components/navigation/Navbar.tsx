'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Search, Bell, Menu, X, ChevronDown, Tv, Trophy, Users, Calendar, BarChart3, Newspaper, MapPin, User } from 'lucide-react';

const navItems = [
  {
    label: 'Matches',
    href: '/matches',
    icon: Trophy,
    children: [
      { label: 'Live Scores', href: '/matches', desc: 'Real-time scores & updates' },
      { label: 'Schedule', href: '/schedule', desc: 'Full tournament schedule' },
      { label: 'Results', href: '/matches?tab=results', desc: 'Completed match results' },
    ]
  },
  {
    label: 'Standings',
    href: '/standings',
    icon: BarChart3,
    children: null
  },
  {
    label: 'Teams',
    href: '/teams',
    icon: Users,
    children: null
  },
  {
    label: 'Players',
    href: '/players',
    icon: User,
    children: [
      { label: 'Top Scorers', href: '/players?tab=scorers', desc: 'Golden Boot race' },
      { label: 'Assists', href: '/players?tab=assists', desc: 'Most assists' },
      { label: 'All Players', href: '/players', desc: 'Browse all squads' },
    ]
  },
  {
    label: 'Stadiums',
    href: '/stadiums',
    icon: MapPin,
    children: null
  },
  {
    label: 'News',
    href: '/news',
    icon: Newspaper,
    children: null
  },
  {
    label: 'Watch Live',
    href: '/stream',
    icon: Tv,
    children: null,
    highlight: true
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060E1A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0090C8] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(0,174,239,0.4)] transition-shadow">
                <span className="text-white font-black text-sm">WC</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-white text-lg leading-tight tracking-tight">FIFA</div>
                <div className="text-[10px] text-[#00AEEF] font-bold tracking-[0.2em] leading-tight">WORLD CUP 2026</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.highlight
                        ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white shadow-lg shadow-[#00AEEF]/20 hover:shadow-[#00AEEF]/40'
                        : 'text-gray-300 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {item.highlight && <Tv size={14} />}
                    {item.label}
                    {item.children && <ChevronDown size={12} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
                  </Link>

                  {/* Mega dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 glass-card shadow-2xl border border-white/10 py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex flex-col px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <span className="text-sm font-medium text-white group-hover:text-[#00AEEF] transition-colors">{child.label}</span>
                          <span className="text-xs text-gray-500 mt-0.5">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/8 rounded-lg transition-all"
              >
                <Search size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/8 rounded-lg transition-all relative">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00AEEF] rounded-full"></span>
              </button>
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all"
              >
                Admin
              </Link>
              <button
                className="lg:hidden p-2 text-gray-400 hover:text-white"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#060E1A]/98 backdrop-blur-xl border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    item.highlight
                      ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/8'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="glass-card w-full max-w-2xl border border-white/15 shadow-2xl">
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
              <Search size={20} className="text-[#00AEEF] flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search teams, players, matches..."
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base"
              />
              <kbd className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded hidden sm:block">ESC</kbd>
              <button onClick={() => setSearchOpen(false)} className="text-gray-500 hover:text-white"><X size={18} /></button>
            </div>
            <div className="p-4">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Quick Links</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Live Matches', href: '/matches', emoji: '🔴' },
                  { label: 'Group Standings', href: '/standings', emoji: '📊' },
                  { label: 'Top Scorers', href: '/players', emoji: '⚽' },
                  { label: 'Watch Live', href: '/stream', emoji: '📺' },
                ].map(l => (
                  <Link key={l.label} href={l.href} onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-white/8 text-sm text-gray-300 hover:text-white transition-all">
                    <span>{l.emoji}</span> {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
