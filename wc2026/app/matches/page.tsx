'use client';

import { useState } from 'react';
import { matches } from '@/lib/data/matches';
import Link from 'next/link';
import { Filter, Clock, ChevronDown } from 'lucide-react';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'results'>('live');

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcoming = matches.filter(m => m.status === 'upcoming');
  const finished = matches.filter(m => m.status === 'finished');

  const displayMatches = activeTab === 'live' ? liveMatches
    : activeTab === 'upcoming' ? upcoming
    : finished;

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Match Centre</h1>
          <p className="text-gray-500">Live scores, upcoming fixtures & results</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'live', label: 'Live', count: liveMatches.length },
            { key: 'upcoming', label: 'Upcoming', count: upcoming.length },
            { key: 'results', label: 'Results', count: finished.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white shadow-lg shadow-[#00AEEF]/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.key === 'live' && <div className="w-1.5 h-1.5 rounded-full bg-red-400 live-pulse"></div>}
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-white/20' : 'bg-white/10'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Match list */}
        <div className="space-y-4">
          {displayMatches.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <div className="text-4xl mb-3">⚽</div>
              <p className="text-gray-500">No matches in this category right now</p>
            </div>
          ) : (
            displayMatches.map(match => {
              const isLive = match.status === 'live';
              const isFinished = match.status === 'finished';

              return (
                <div key={match.id} className="glass-card p-5 sm:p-6 hover:border-[#00AEEF]/20 transition-all border border-white/8">
                  {/* Match info row */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">{match.group} · {match.round}</span>
                    </div>
                    {isLive ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/15 border border-red-500/30">
                        <div className="w-2 h-2 rounded-full bg-red-500 live-pulse"></div>
                        <span className="text-sm font-black text-red-400">LIVE {match.minute}&apos;</span>
                      </div>
                    ) : isFinished ? (
                      <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1.5 rounded-full">Full Time</span>
                    ) : (
                      <div className="flex items-center gap-1.5 text-sm text-gray-400">
                        <Clock size={14} />
                        <span>{match.date} · {match.time}</span>
                      </div>
                    )}
                  </div>

                  {/* Teams & Score */}
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="text-5xl">{match.homeFlag}</span>
                      <span className="text-sm font-bold text-white">{match.homeTeamName}</span>
                    </div>

                    <div className="text-center">
                      {(isLive || isFinished) ? (
                        <div className="flex items-center justify-center gap-3">
                          <span className="text-4xl sm:text-5xl font-black text-white tabular-nums">{match.homeScore}</span>
                          <span className="text-gray-600 text-2xl">—</span>
                          <span className="text-4xl sm:text-5xl font-black text-white tabular-nums">{match.awayScore}</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-2xl font-black text-[#00AEEF]">VS</div>
                          <div className="text-xs text-gray-600 mt-1">{match.time}</div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-center text-center gap-2">
                      <span className="text-5xl">{match.awayFlag}</span>
                      <span className="text-sm font-bold text-white">{match.awayTeamName}</span>
                    </div>
                  </div>

                  {/* Events */}
                  {match.events && match.events.length > 0 && (
                    <div className="mt-5 pt-5 border-t border-white/8">
                      <div className="flex flex-wrap gap-2">
                        {match.events.slice(0, 6).map((event, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs bg-white/5 px-2.5 py-1.5 rounded-lg">
                            <span>{event.minute}&apos;</span>
                            <span>{event.type === 'goal' ? '⚽' : event.type === 'yellow' ? '🟨' : event.type === 'red' ? '🟥' : event.type === 'var' ? '📺' : '↕'}</span>
                            <span className="text-gray-400">{event.player}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  {match.stats && (
                    <div className="mt-4 pt-4 border-t border-white/8">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {[
                          { label: 'Possession', home: match.stats.possession[0], away: match.stats.possession[1], suffix: '%' },
                          { label: 'Shots', home: match.stats.shots[0], away: match.stats.shots[1] },
                          { label: 'On Target', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1] },
                          { label: 'Corners', home: match.stats.corners[0], away: match.stats.corners[1] },
                        ].map(stat => (
                          <div key={stat.label} className="text-center">
                            <div className="text-xs text-gray-600 mb-1">{stat.label}</div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#00AEEF] w-8 text-right">{stat.home}{stat.suffix || ''}</span>
                              <div className="flex-1 flex gap-0.5 h-1 rounded-full overflow-hidden bg-white/5">
                                <div className="bg-[#00AEEF] rounded-full" style={{ width: `${stat.home / (stat.home + stat.away) * 100}%` }} />
                                <div className="bg-[#FFD700] rounded-full flex-1" />
                              </div>
                              <span className="text-xs font-bold text-[#FFD700] w-8">{stat.away}{stat.suffix || ''}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-gray-600 text-center">
                    📍 {match.stadium}, {match.stadiumCity}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
