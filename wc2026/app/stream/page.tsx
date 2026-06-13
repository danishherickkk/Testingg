'use client';

import { useState } from 'react';
import { matches } from '@/lib/data/matches';
import { Tv, Maximize, Volume2, Settings, MessageSquare, BarChart3, Clock, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const broadcasters = [
  { name: 'FOX Sports', region: 'USA', logo: '🦊', url: '#', official: true },
  { name: 'Telemundo', region: 'USA (Spanish)', logo: '📡', url: '#', official: true },
  { name: 'TSN', region: 'Canada', logo: '🍁', url: '#', official: true },
  { name: 'TVA Sports', region: 'Canada (French)', logo: '📺', url: '#', official: true },
  { name: 'Azteca', region: 'Mexico', logo: '🦅', url: '#', official: true },
  { name: 'BBC iPlayer', region: 'UK', logo: '🇬🇧', url: '#', official: true },
  { name: 'ITV', region: 'UK', logo: '🇬🇧', url: '#', official: true },
  { name: 'FIFA+', region: 'Worldwide', logo: '⚽', url: '#', official: true },
];

export default function StreamPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stats' | 'chat'>('stats');

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 3);
  const selected = selectedMatch ? matches.find(m => m.id === selectedMatch) : liveMatches[0];

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">Watch Live</h1>
          <p className="text-sm text-gray-500">Stream via official FIFA broadcast partners</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Video player + side panel */}
          <div className="lg:col-span-3 space-y-4">

            {/* Video player */}
            <div className="glass-card overflow-hidden">
              {/* Player area */}
              <div className="bg-black aspect-video relative flex items-center justify-center group">
                {selected ? (
                  <>
                    {/* Placeholder video background */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(ellipse at center, ${
                          selected.status === 'live' ? '#00150A' : '#0B1F3A'
                        } 0%, #000 100%)`,
                      }}
                    >
                      {/* Pitch visualization */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="text-[200px]">🏟️</div>
                      </div>
                    </div>

                    {/* Match info overlay */}
                    <div className="relative z-10 text-center">
                      {selected.status === 'live' ? (
                        <>
                          <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-6xl">{selected.homeFlag}</span>
                            <div className="text-center">
                              <div className="flex items-center gap-3">
                                <span className="text-5xl font-black text-white tabular-nums">{selected.homeScore}</span>
                                <span className="text-gray-600 text-3xl">—</span>
                                <span className="text-5xl font-black text-white tabular-nums">{selected.awayScore}</span>
                              </div>
                              <div className="flex items-center justify-center gap-1.5 mt-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 live-pulse"></div>
                                <span className="text-red-400 font-bold text-sm">{selected.minute}&apos;</span>
                              </div>
                            </div>
                            <span className="text-6xl">{selected.awayFlag}</span>
                          </div>
                          <p className="text-sm text-gray-400">{selected.homeTeamName} vs {selected.awayTeamName}</p>
                          <p className="text-xs text-gray-600 mt-1">{selected.stadium}</p>

                          <div className="mt-6 flex flex-col items-center gap-2">
                            <p className="text-xs text-gray-500 mb-2">Watch on official broadcast partners:</p>
                            <div className="flex flex-wrap justify-center gap-2">
                              {broadcasters.slice(0, 4).map(b => (
                                <a key={b.name} href={b.url}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white transition-all">
                                  <span>{b.logo}</span>
                                  <span>{b.name}</span>
                                  <ExternalLink size={10} className="text-gray-500" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center">
                          <div className="text-6xl mb-4">📺</div>
                          <p className="text-white font-bold text-lg mb-1">Stream Coming Soon</p>
                          <p className="text-gray-500 text-sm">{selected.homeTeamName} vs {selected.awayTeamName}</p>
                          <p className="text-gray-600 text-xs mt-1">{selected.date} · {selected.time}</p>
                          <p className="text-xs text-gray-500 mt-4">Live stream will be available at kickoff</p>
                        </div>
                      )}
                    </div>

                    {/* Live badge */}
                    {selected.status === 'live' && (
                      <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600 shadow-lg shadow-red-600/30">
                        <div className="w-2 h-2 rounded-full bg-white live-pulse"></div>
                        <span className="text-white text-xs font-black tracking-wider">LIVE</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚽</div>
                    <p className="text-gray-400">Select a match to watch</p>
                  </div>
                )}
              </div>

              {/* Player controls */}
              <div className="px-4 py-3 flex items-center gap-3 bg-black/50 border-t border-white/8">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <Volume2 size={16} />
                  </button>
                  <div className="w-20 h-1.5 bg-white/10 rounded-full">
                    <div className="w-3/4 h-full bg-[#00AEEF] rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <Settings size={15} />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                    <Maximize size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Match stats / chat tabs */}
            {selected && (
              <div className="glass-card overflow-hidden">
                <div className="flex border-b border-white/8">
                  {[
                    { key: 'stats', label: 'Match Stats', icon: BarChart3 },
                    { key: 'chat', label: 'Live Chat', icon: MessageSquare },
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as typeof activeTab)}
                      className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-all ${
                        activeTab === tab.key
                          ? 'text-white border-b-2 border-[#00AEEF]'
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      <tab.icon size={15} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {activeTab === 'stats' && selected.stats ? (
                    <div className="space-y-4">
                      {[
                        { label: 'Possession', home: selected.stats.possession[0], away: selected.stats.possession[1], suffix: '%' },
                        { label: 'Shots', home: selected.stats.shots[0], away: selected.stats.shots[1] },
                        { label: 'Shots on Target', home: selected.stats.shotsOnTarget[0], away: selected.stats.shotsOnTarget[1] },
                        { label: 'Corners', home: selected.stats.corners[0], away: selected.stats.corners[1] },
                        { label: 'Fouls', home: selected.stats.fouls[0], away: selected.stats.fouls[1] },
                        { label: 'Offsides', home: selected.stats.offsides[0], away: selected.stats.offsides[1] },
                      ].map(stat => (
                        <div key={stat.label}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="font-bold text-white">{stat.home}{stat.suffix || ''}</span>
                            <span className="text-gray-500">{stat.label}</span>
                            <span className="font-bold text-white">{stat.away}{stat.suffix || ''}</span>
                          </div>
                          <div className="flex gap-0.5 h-2 rounded-full overflow-hidden bg-white/5">
                            <div
                              className="bg-[#00AEEF] rounded-full transition-all duration-1000"
                              style={{ width: `${stat.home / (stat.home + stat.away) * 100}%` }}
                            />
                            <div
                              className="bg-[#FFD700] rounded-full flex-1 transition-all duration-1000"
                            />
                          </div>
                          <div className="flex justify-between text-xs text-gray-600 mt-0.5">
                            <span>{selected.homeTeamName}</span>
                            <span>{selected.awayTeamName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : activeTab === 'chat' ? (
                    <div className="space-y-3">
                      {[
                        { user: 'FootballFan01', msg: 'What a game! Brazil looking unstoppable! 🇧🇷', time: '67:23' },
                        { user: 'MexicanEagle', msg: 'Mexico needs to fight back! Animo! 🇲🇽', time: '66:45' },
                        { user: 'GlobalFan99', msg: 'Vinicius Jr is on fire tonight ⚡', time: '65:12' },
                        { user: 'FutbolLover', msg: 'Best World Cup ever!! 🏆', time: '64:33' },
                        { user: 'SoccerKing', msg: 'That tackle was a yellow card for sure', time: '63:50' },
                      ].map((chat, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00AEEF]/40 to-[#0090C8]/40 flex items-center justify-center text-xs font-bold text-[#00AEEF] flex-shrink-0">
                            {chat.user[0]}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-gray-300">{chat.user}</span>
                              <span className="text-xs text-gray-600">{chat.time}</span>
                            </div>
                            <p className="text-sm text-gray-400">{chat.msg}</p>
                          </div>
                        </div>
                      ))}
                      <div className="flex gap-2 mt-4 pt-4 border-t border-white/8">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#00AEEF]/50"
                        />
                        <button className="px-4 py-2 rounded-lg bg-[#00AEEF] text-white text-sm font-semibold hover:bg-[#00C4FF] transition-colors">
                          Send
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No stats available</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: match list + broadcasters */}
          <div className="lg:col-span-1 space-y-4">

            {/* Match selector */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Tv size={15} className="text-[#00AEEF]" />
                Select Match
              </h3>

              {liveMatches.length > 0 && (
                <div className="mb-3">
                  <div className="text-xs text-red-400 font-bold mb-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse"></div>
                    LIVE NOW
                  </div>
                  <div className="space-y-2">
                    {liveMatches.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMatch(m.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          (selected?.id === m.id)
                            ? 'bg-[#00AEEF]/15 border border-[#00AEEF]/30'
                            : 'bg-white/4 hover:bg-white/8 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-red-400 font-bold">{m.minute}&apos;</span>
                          <span className="text-xs text-gray-500">Group {m.group}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">{m.homeFlag} {m.homeScore}</span>
                          <span className="text-xs text-gray-600">—</span>
                          <span className="text-sm font-semibold text-white">{m.awayScore} {m.awayFlag}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {upcomingMatches.length > 0 && (
                <div>
                  <div className="text-xs text-gray-500 font-bold mb-2 flex items-center gap-1.5">
                    <Clock size={12} />
                    UPCOMING
                  </div>
                  <div className="space-y-2">
                    {upcomingMatches.map(m => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedMatch(m.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all ${
                          selected?.id === m.id
                            ? 'bg-[#00AEEF]/15 border border-[#00AEEF]/30'
                            : 'bg-white/4 hover:bg-white/8 border border-transparent'
                        }`}
                      >
                        <div className="text-xs text-gray-500 mb-1">{m.time} · {m.date.split('-').slice(1).join('/')}</div>
                        <div className="flex items-center gap-2 text-sm">
                          <span>{m.homeFlag}</span>
                          <span className="text-gray-500 text-xs">vs</span>
                          <span>{m.awayFlag}</span>
                        </div>
                        <div className="text-xs text-gray-600 mt-0.5 truncate">{m.homeTeamName} – {m.awayTeamName}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Official Broadcasters */}
            <div className="glass-card p-4">
              <h3 className="text-sm font-bold text-white mb-3">Official Broadcasters</h3>
              <p className="text-xs text-gray-600 mb-3">All streams are from official FIFA licensed partners. WC2026 does not host video content.</p>
              <div className="space-y-2">
                {broadcasters.map(b => (
                  <a
                    key={b.name}
                    href={b.url}
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all group"
                  >
                    <span className="text-lg">{b.logo}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white group-hover:text-[#00AEEF] transition-colors truncate">{b.name}</div>
                      <div className="text-xs text-gray-600">{b.region}</div>
                    </div>
                    <ExternalLink size={12} className="text-gray-600 group-hover:text-[#00AEEF]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
