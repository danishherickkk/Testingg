'use client';

import { useState } from 'react';
import Link from 'next/link';
import { teams } from '@/lib/data/teams';
import { Search } from 'lucide-react';

const confederations = ['All', 'UEFA', 'CONMEBOL', 'CONCACAF', 'CAF', 'AFC', 'OFC'];

export default function TeamsPage() {
  const [search, setSearch] = useState('');
  const [confederation, setConfederation] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'ranking' | 'points'>('points');

  const filtered = teams
    .filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.shortName.toLowerCase().includes(search.toLowerCase());
      const matchConf = confederation === 'All' || t.confederation === confederation;
      return matchSearch && matchConf;
    })
    .sort((a, b) => {
      if (sortBy === 'ranking') return a.ranking - b.ranking;
      if (sortBy === 'points') return b.stats.points - a.stats.points;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Teams</h1>
          <p className="text-gray-500">{teams.length} nations competing for the FIFA World Cup 2026</p>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search teams..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#00AEEF]/50"
            />
          </div>
          <select
            value={confederation}
            onChange={e => setConfederation(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#00AEEF]/50"
          >
            {confederations.map(c => (
              <option key={c} value={c} className="bg-[#0B1F3A]">{c}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#00AEEF]/50"
          >
            <option value="points" className="bg-[#0B1F3A]">Sort by Points</option>
            <option value="ranking" className="bg-[#0B1F3A]">Sort by FIFA Ranking</option>
            <option value="name" className="bg-[#0B1F3A]">Sort by Name</option>
          </select>
        </div>

        <div className="text-xs text-gray-600 mb-4">{filtered.length} teams</div>

        {/* Teams grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((team) => {
            const gd = team.stats.goalsFor - team.stats.goalsAgainst;
            return (
              <Link href={`/teams/${team.id}`} key={team.id}>
                <div className="glass-card glass-card-hover p-5 h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{team.flagEmoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-black text-white text-lg leading-tight">{team.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                        <span>Group {team.group}</span>
                        <span>·</span>
                        <span>{team.confederation}</span>
                        <span>·</span>
                        <span>#{team.ranking}</span>
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Coach: {team.coach}</div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/8 grid grid-cols-4 gap-2">
                    {[
                      { label: 'W', value: team.stats.won, color: 'text-green-400' },
                      { label: 'D', value: team.stats.drawn, color: 'text-yellow-400' },
                      { label: 'L', value: team.stats.lost, color: 'text-red-400' },
                      { label: 'Pts', value: team.stats.points, color: 'text-white' },
                    ].map(stat => (
                      <div key={stat.label} className="text-center">
                        <div className={`text-lg font-black ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-600">
                      GF {team.stats.goalsFor} · GA {team.stats.goalsAgainst} · GD{' '}
                      <span className={gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-gray-400'}>
                        {gd > 0 ? '+' : ''}{gd}
                      </span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      team.stats.points >= 7 ? 'bg-green-400/10 text-green-400' :
                      team.stats.points >= 4 ? 'bg-yellow-400/10 text-yellow-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>
                      {team.stats.points >= 7 ? 'Advancing' : team.stats.points >= 4 ? 'Contention' : 'At Risk'}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="glass-card p-12 text-center">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500">No teams found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
