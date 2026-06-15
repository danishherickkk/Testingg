'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getGroups } from '@/lib/data/teams';

export default function StandingsPage() {
  const groups = getGroups();
  const groupKeys = Object.keys(groups).sort();
  const [activeGroup, setActiveGroup] = useState<string | 'all'>('all');

  const displayGroups = activeGroup === 'all'
    ? groupKeys.map(k => ({ key: k, teams: groups[k] }))
    : [{ key: activeGroup, teams: groups[activeGroup] || [] }];

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Group Standings</h1>
          <p className="text-gray-500">48 teams · 12 groups · Group stage standings</p>
        </div>

        {/* Group filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveGroup('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeGroup === 'all'
                ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            All Groups
          </button>
          {groupKeys.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeGroup === g
                  ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Group {g}
            </button>
          ))}
        </div>

        {/* Groups grid */}
        <div className={`grid gap-6 ${activeGroup === 'all' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
          {displayGroups.map(({ key, teams }) => (
            <div key={key} className="glass-card overflow-hidden">
              {/* Group header */}
              <div className="px-5 py-4 border-b border-white/8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00AEEF]/20 to-[#0090C8]/20 border border-[#00AEEF]/30 flex items-center justify-center">
                  <span className="text-sm font-black text-[#00AEEF]">{key}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Group {key}</div>
                  <div className="text-xs text-gray-500">{teams.length} teams</div>
                </div>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 gap-1 px-4 py-2.5 border-b border-white/5 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Team</div>
                <div className="col-span-1 text-center">P</div>
                <div className="col-span-1 text-center">W</div>
                <div className="col-span-1 text-center">D</div>
                <div className="col-span-1 text-center">L</div>
                <div className="col-span-1 text-center">GD</div>
                <div className="col-span-1 text-center text-[#FFD700]">Pts</div>
              </div>

              {/* Teams */}
              {teams.map((team, index) => {
                const gd = team.stats.goalsFor - team.stats.goalsAgainst;
                return (
                  <Link href={`/teams/${team.id}`} key={team.id}>
                    <div className={`grid grid-cols-12 gap-1 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors items-center ${
                      index < 2 ? 'border-l-2 border-l-[#00AEEF]' : ''
                    }`}>
                      <div className="col-span-1">
                        <span className={`text-sm font-bold ${
                          index === 0 ? 'text-[#FFD700]' : index === 1 ? 'text-gray-400' : 'text-gray-600'
                        }`}>{index + 1}</span>
                      </div>
                      <div className="col-span-5 flex items-center gap-2.5">
                        <span className="text-lg">{team.flagEmoji}</span>
                        <div>
                          <div className="text-sm font-semibold text-white leading-tight">{team.name}</div>
                        </div>
                      </div>
                      <div className="col-span-1 text-center text-xs text-gray-400">{team.stats.played}</div>
                      <div className="col-span-1 text-center text-xs text-green-400 font-semibold">{team.stats.won}</div>
                      <div className="col-span-1 text-center text-xs text-yellow-400 font-semibold">{team.stats.drawn}</div>
                      <div className="col-span-1 text-center text-xs text-red-400 font-semibold">{team.stats.lost}</div>
                      <div className="col-span-1 text-center">
                        <span className={`text-xs font-medium ${gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                          {gd > 0 ? '+' : ''}{gd}
                        </span>
                      </div>
                      <div className="col-span-1 text-center">
                        <span className="text-sm font-black text-white">{team.stats.points}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              <div className="px-4 py-2 border-t border-white/5 text-xs text-gray-600 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#00AEEF]/50 border-l border-[#00AEEF]"></div>
                  Advance to R16
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 glass-card p-5">
          <h3 className="text-sm font-semibold text-white mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2"><span className="text-green-400 font-semibold">W</span> Win (3 pts)</div>
            <div className="flex items-center gap-2"><span className="text-yellow-400 font-semibold">D</span> Draw (1 pt)</div>
            <div className="flex items-center gap-2"><span className="text-red-400 font-semibold">L</span> Loss (0 pts)</div>
            <div className="flex items-center gap-2"><span className="text-gray-300 font-semibold">GD</span> Goal Difference</div>
            <div className="flex items-center gap-2"><span className="text-[#FFD700] font-semibold">Pts</span> Points</div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-l-2 border-[#00AEEF] bg-[#00AEEF]/10"></div>
              Top 2 advance to Round of 16
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
