import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTeamById, teams } from '@/lib/data/teams';
import { matches } from '@/lib/data/matches';
import { ArrowLeft, Trophy, User, Users } from 'lucide-react';
import { Metadata } from 'next';

export function generateStaticParams() {
  return teams.map(t => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const team = getTeamById(id);
  if (!team) return { title: 'Team Not Found' };
  return { title: `${team.name} | FIFA World Cup 2026` };
}

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = getTeamById(id);
  if (!team) notFound();

  const teamMatches = matches.filter(m => m.homeTeam === id || m.awayTeam === id);
  const gd = team.stats.goalsFor - team.stats.goalsAgainst;

  const positions: Record<string, string[]> = { GK: [], DF: [], MF: [], FW: [] };
  team.players.forEach(p => {
    if (positions[p.position]) positions[p.position].push(p.name);
  });

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Link href="/teams" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Teams
        </Link>

        {/* Team header */}
        <div className="glass-card p-6 sm:p-8 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 flex items-center justify-end pr-8">
            <span className="text-[200px] select-none">{team.flagEmoji}</span>
          </div>
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-8xl">{team.flagEmoji}</div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-xs font-semibold bg-[#00AEEF]/10 text-[#00AEEF] border border-[#00AEEF]/20 px-2.5 py-1 rounded-full">
                  Group {team.group}
                </span>
                <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
                  {team.confederation}
                </span>
                <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">
                  FIFA #{team.ranking}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white">{team.name}</h1>
              <p className="text-gray-500 mt-1">Head Coach: <span className="text-white font-medium">{team.coach}</span></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card p-5">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Group Stage Stats</h2>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { value: team.stats.won, label: 'Won', color: 'text-green-400' },
                  { value: team.stats.drawn, label: 'Drawn', color: 'text-yellow-400' },
                  { value: team.stats.lost, label: 'Lost', color: 'text-red-400' },
                ].map(s => (
                  <div key={s.label} className="text-center bg-white/4 rounded-xl p-3">
                    <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                    <div className="text-xs text-gray-600 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Goals Scored', value: team.stats.goalsFor },
                  { label: 'Goals Conceded', value: team.stats.goalsAgainst },
                  { label: 'Goal Difference', value: gd > 0 ? `+${gd}` : gd, color: gd > 0 ? 'text-green-400' : gd < 0 ? 'text-red-400' : 'text-gray-400' },
                  { label: 'Points', value: team.stats.points, color: 'text-[#FFD700]' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{row.label}</span>
                    <span className={`text-sm font-bold ${(row as {color?: string}).color || 'text-white'}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Squad */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass-card p-5">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users size={16} /> Squad
              </h2>
              <div className="space-y-1">
                {team.players.map(player => (
                  <div key={player.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/4 transition-colors">
                    <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400">
                      {player.number}
                    </span>
                    <span className={`w-10 text-xs font-bold px-1.5 py-0.5 rounded text-center ${
                      player.position === 'GK' ? 'bg-yellow-400/10 text-yellow-400' :
                      player.position === 'DF' ? 'bg-blue-400/10 text-blue-400' :
                      player.position === 'MF' ? 'bg-green-400/10 text-green-400' :
                      'bg-red-400/10 text-red-400'
                    }`}>{player.position}</span>
                    <span className="flex-1 text-sm font-semibold text-white">{player.name}</span>
                    <span className="text-xs text-gray-600">{player.club}</span>
                    {(player.goals || 0) > 0 && (
                      <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full">
                        ⚽ {player.goals}
                      </span>
                    )}
                    {(player.yellowCards || 0) > 0 && (
                      <span className="text-xs">🟨</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Matches */}
            <div className="glass-card p-5">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Trophy size={16} /> Matches
              </h2>
              <div className="space-y-3">
                {teamMatches.length === 0 ? (
                  <p className="text-sm text-gray-500">No matches scheduled yet</p>
                ) : (
                  teamMatches.map(match => {
                    const isHome = match.homeTeam === id;
                    const result = match.status === 'finished' || match.status === 'live'
                      ? `${match.homeScore} – ${match.awayScore}`
                      : match.time;
                    const won = match.status === 'finished' && (
                      (isHome && (match.homeScore || 0) > (match.awayScore || 0)) ||
                      (!isHome && (match.awayScore || 0) > (match.homeScore || 0))
                    );

                    return (
                      <div key={match.id} className="flex items-center gap-3 text-sm">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          match.status === 'live' ? 'bg-red-400/15 text-red-400' :
                          match.status === 'finished' ? (won ? 'bg-green-400/15 text-green-400' : 'bg-gray-400/15 text-gray-400') :
                          'bg-blue-400/15 text-blue-400'
                        }`}>
                          {match.status === 'live' ? 'LIVE' : match.status === 'finished' ? (won ? 'W' : 'FT') : 'vs'}
                        </span>
                        <span className="flex items-center gap-1">
                          {isHome ? match.awayFlag : match.homeFlag}
                          <span className="text-gray-300">{isHome ? match.awayTeamName : match.homeTeamName}</span>
                        </span>
                        <span className="ml-auto font-mono font-bold text-white">{result}</span>
                        <span className="text-xs text-gray-600">{match.stadiumCity}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
