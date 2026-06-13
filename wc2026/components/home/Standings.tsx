'use client';

import Link from 'next/link';
import { useState } from 'react';
import { getGroups } from '@/lib/data/teams';
import { ChevronRight } from 'lucide-react';

export default function Standings() {
  const groups = getGroups();
  const groupKeys = Object.keys(groups).sort();
  const [activeGroup, setActiveGroup] = useState(groupKeys[0]);

  const currentGroup = groups[activeGroup] || [];

  return (
    <section className="py-16 sm:py-20 bg-[#040B14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 rounded-full bg-[#FFD700]"></div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Group Standings</h2>
            <p className="text-gray-500 text-sm mt-1">Current tournament standings</p>
          </div>
          <Link href="/standings" className="flex items-center gap-1 text-sm text-[#00AEEF] hover:text-[#00C4FF] font-medium transition-colors">
            Full Tables <ChevronRight size={16} />
          </Link>
        </div>

        {/* Group tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {groupKeys.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeGroup === g
                  ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white shadow-lg shadow-[#00AEEF]/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              Group {g}
            </button>
          ))}
        </div>

        {/* Standings table */}
        <div className="glass-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/8 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4 sm:col-span-5">Team</div>
            <div className="col-span-1 text-center hidden sm:block">P</div>
            <div className="col-span-1 text-center">W</div>
            <div className="col-span-1 text-center">D</div>
            <div className="col-span-1 text-center">L</div>
            <div className="col-span-2 text-center hidden sm:block">GD</div>
            <div className="col-span-2 sm:col-span-1 text-center font-bold text-[#FFD700]">Pts</div>
          </div>

          {currentGroup.map((team, index) => {
            const gd = team.stats.goalsFor - team.stats.goalsAgainst;
            const isQualified = index < 2;
            return (
              <Link href={`/teams/${team.id}`} key={team.id}>
                <div className={`grid grid-cols-12 gap-2 px-4 py-4 border-b border-white/5 hover:bg-white/4 transition-colors cursor-pointer items-center last:border-0 ${
                  isQualified ? 'border-l-2 border-l-[#00AEEF]' : ''
                }`}>
                  <div className="col-span-1 text-center">
                    <span className={`text-sm font-bold ${
                      index === 0 ? 'text-[#FFD700]' :
                      index === 1 ? 'text-gray-400' :
                      'text-gray-600'
                    }`}>{index + 1}</span>
                  </div>
                  <div className="col-span-4 sm:col-span-5 flex items-center gap-2.5">
                    <span className="text-xl">{team.flagEmoji}</span>
                    <div>
                      <div className="text-sm font-semibold text-white hidden sm:block">{team.name}</div>
                      <div className="text-sm font-semibold text-white sm:hidden">{team.shortName}</div>
                      <div className="text-xs text-gray-500 hidden sm:block">{team.confederation}</div>
                    </div>
                  </div>
                  <div className="col-span-1 text-center text-sm text-gray-400 hidden sm:block">{team.stats.played}</div>
                  <div className="col-span-1 text-center text-sm text-green-400 font-medium">{team.stats.won}</div>
                  <div className="col-span-1 text-center text-sm text-yellow-400 font-medium">{team.stats.drawn}</div>
                  <div className="col-span-1 text-center text-sm text-red-400 font-medium">{team.stats.lost}</div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <span className={`text-sm font-medium ${gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-gray-400'}`}>
                      {gd > 0 ? '+' : ''}{gd}
                    </span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 text-center">
                    <span className="text-sm font-black text-white bg-white/8 w-8 h-8 rounded-lg flex items-center justify-center mx-auto">
                      {team.stats.points}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}

          <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm border-l-2 border-[#00AEEF] bg-[#00AEEF]/10"></div>
              Qualified / Advancing
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
