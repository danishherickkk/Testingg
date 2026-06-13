import Link from 'next/link';
import { teams } from '@/lib/data/teams';
import { ChevronRight, Shield } from 'lucide-react';

export default function TeamsSection() {
  const featuredTeams = teams.slice(0, 12);

  return (
    <section className="py-16 sm:py-20 bg-[#060E1A] relative">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="w-1.5 h-6 rounded-full bg-[#00AEEF] mb-2"></div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Teams</h2>
            <p className="text-gray-500 text-sm mt-1">48 nations competing for the ultimate prize</p>
          </div>
          <Link href="/teams" className="flex items-center gap-1 text-sm text-[#00AEEF] hover:text-[#00C4FF] font-medium transition-colors">
            All Teams <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {featuredTeams.map((team) => (
            <Link href={`/teams/${team.id}`} key={team.id}>
              <div className="glass-card glass-card-hover p-4 text-center group cursor-pointer">
                <div className="text-4xl mb-3">{team.flagEmoji}</div>
                <div className="text-sm font-semibold text-white truncate">{team.shortName}</div>
                <div className="text-xs text-gray-500 mt-0.5">Group {team.group}</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    team.stats.points >= 6 ? 'bg-green-400' :
                    team.stats.points >= 4 ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                  <span className="text-xs text-gray-500">{team.stats.points} pts</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Top contenders highlight */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { team: teams.find(t => t.id === 'argentina')!, label: 'World Champions', rank: '#1' },
            { team: teams.find(t => t.id === 'france')!, label: 'Tournament Favourites', rank: '#2' },
            { team: teams.find(t => t.id === 'brazil')!, label: 'Record Winners', rank: '#5' },
          ].filter(x => x.team).map(({ team, label, rank }) => (
            <Link href={`/teams/${team.id}`} key={team.id}>
              <div className="glass-card glass-card-hover p-5 flex items-center gap-4 border border-white/8 hover:border-[#00AEEF]/30">
                <div className="text-4xl">{team.flagEmoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-black text-white">{team.name}</div>
                  <div className="text-xs text-[#00AEEF] font-medium">{label}</div>
                  <div className="text-xs text-gray-600 mt-0.5">FIFA Ranking {rank}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-black text-white">{team.stats.points}</div>
                  <div className="text-xs text-gray-500">pts</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
