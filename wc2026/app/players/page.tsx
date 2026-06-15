'use client';

import { useState, useMemo } from 'react';
import { teams } from '@/lib/data/teams';
import type { Player } from '@/lib/data/teams';
import Link from 'next/link';
import { Search, Medal, Star, TrendingUp } from 'lucide-react';

interface PlayerWithTeam extends Player {
  teamName: string;
  teamFlag: string;
  teamId: string;
}

function getAllPlayers(): PlayerWithTeam[] {
  return teams.flatMap(team =>
    team.players.map(p => ({
      ...p,
      teamName: team.name,
      teamFlag: team.flagEmoji,
      teamId: team.id,
    }))
  );
}

export default function PlayersPage() {
  const [activeTab, setActiveTab] = useState<'scorers' | 'assists' | 'cards' | 'all'>('scorers');
  const [search, setSearch] = useState('');

  const allPlayers = useMemo(() => getAllPlayers(), []);

  const filtered = useMemo(() => {
    let result = allPlayers.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.teamName.toLowerCase().includes(search.toLowerCase())
    );

    if (activeTab === 'scorers') result = result.filter(p => (p.goals || 0) > 0).sort((a, b) => (b.goals || 0) - (a.goals || 0));
    else if (activeTab === 'assists') result = result.filter(p => (p.assists || 0) > 0).sort((a, b) => (b.assists || 0) - (a.assists || 0));
    else if (activeTab === 'cards') result = result.filter(p => (p.yellowCards || 0) > 0 || (p.redCards || 0) > 0)
      .sort((a, b) => ((b.yellowCards || 0) + (b.redCards || 0) * 2) - ((a.yellowCards || 0) + (a.redCards || 0) * 2));

    return result;
  }, [allPlayers, activeTab, search]);

  const topScorer = allPlayers.sort((a, b) => (b.goals || 0) - (a.goals || 0))[0];

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Players</h1>
          <p className="text-gray-500">Tournament statistics for all players</p>
        </div>

        {/* Top performer highlight */}
        {topScorer && (
          <div className="glass-card p-5 sm:p-6 mb-8 flex flex-col sm:flex-row items-center gap-5 border border-[#FFD700]/20 glow-gold">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center text-3xl border border-[#FFD700]/30">
              {topScorer.teamFlag}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Medal className="text-[#FFD700]" size={16} />
                <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider">Golden Boot Leader</span>
              </div>
              <div className="text-xl font-black text-white">{topScorer.name}</div>
              <div className="text-sm text-gray-500">{topScorer.teamName} · {topScorer.club}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-[#FFD700]">{topScorer.goals}</div>
              <div className="text-xs text-gray-500">Goals</div>
            </div>
          </div>
        )}

        {/* Tabs + search */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'scorers', label: 'Top Scorers', icon: '⚽' },
              { key: 'assists', label: 'Assists', icon: '🎯' },
              { key: 'cards', label: 'Bookings', icon: '🟨' },
              { key: 'all', label: 'All Players', icon: '👥' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="relative sm:ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
            <input
              type="text"
              placeholder="Search players..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-[#00AEEF]/50 w-full sm:w-52"
            />
          </div>
        </div>

        {/* Players table */}
        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/8 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-4 sm:col-span-5">Player</div>
            <div className="col-span-2 hidden sm:block">Club</div>
            <div className="col-span-2 text-center">
              {activeTab === 'scorers' ? '⚽ Goals' : activeTab === 'assists' ? '🎯 Assists' : activeTab === 'cards' ? '🟨 Cards' : 'Pos'}
            </div>
            {activeTab === 'scorers' && <div className="col-span-2 text-center hidden sm:block">🎯 Assists</div>}
            {activeTab === 'all' && <div className="col-span-3 text-center">Stats</div>}
          </div>

          {filtered.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No players found</div>
          ) : (
            filtered.slice(0, 30).map((player, index) => (
              <div key={player.id}
                className="grid grid-cols-12 gap-2 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors items-center">
                <div className="col-span-1">
                  {index < 3 ? (
                    <span className={`text-sm font-black ${
                      index === 0 ? 'text-[#FFD700]' : index === 1 ? 'text-gray-300' : 'text-amber-600'
                    }`}>{index + 1}</span>
                  ) : (
                    <span className="text-sm text-gray-600">{index + 1}</span>
                  )}
                </div>
                <div className="col-span-4 sm:col-span-5 flex items-center gap-2.5">
                  <Link href={`/teams/${player.teamId}`}>
                    <span className="text-lg cursor-pointer hover:scale-110 transition-transform">{player.teamFlag}</span>
                  </Link>
                  <div>
                    <div className="text-sm font-semibold text-white">{player.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        player.position === 'GK' ? 'bg-yellow-400/10 text-yellow-400' :
                        player.position === 'DF' ? 'bg-blue-400/10 text-blue-400' :
                        player.position === 'MF' ? 'bg-green-400/10 text-green-400' :
                        'bg-red-400/10 text-red-400'
                      }`}>{player.position}</span>
                      <span className="hidden sm:inline">{player.teamName}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 hidden sm:block text-xs text-gray-500 truncate">{player.club}</div>

                {activeTab === 'scorers' && (
                  <>
                    <div className="col-span-2 text-center">
                      <span className="text-lg font-black text-white">{player.goals || 0}</span>
                    </div>
                    <div className="col-span-2 text-center hidden sm:block">
                      <span className="text-sm font-semibold text-gray-400">{player.assists || 0}</span>
                    </div>
                  </>
                )}
                {activeTab === 'assists' && (
                  <div className="col-span-2 text-center">
                    <span className="text-lg font-black text-white">{player.assists || 0}</span>
                  </div>
                )}
                {activeTab === 'cards' && (
                  <div className="col-span-2 text-center flex items-center justify-center gap-2">
                    {(player.yellowCards || 0) > 0 && (
                      <span className="flex items-center gap-1 text-sm font-bold text-yellow-400">
                        🟨 {player.yellowCards}
                      </span>
                    )}
                    {(player.redCards || 0) > 0 && (
                      <span className="flex items-center gap-1 text-sm font-bold text-red-400">
                        🟥 {player.redCards}
                      </span>
                    )}
                  </div>
                )}
                {activeTab === 'all' && (
                  <div className="col-span-3 flex items-center justify-center gap-3 text-xs">
                    <span className="text-gray-400">⚽ {player.goals || 0}</span>
                    <span className="text-gray-400">🎯 {player.assists || 0}</span>
                    {(player.yellowCards || 0) > 0 && <span>🟨 {player.yellowCards}</span>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
