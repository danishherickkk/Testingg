'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { matches, type Match } from '@/lib/data/matches';
import { ChevronRight, Clock } from 'lucide-react';

function MatchCard({ match }: { match: Match }) {
  const [minute, setMinute] = useState(match.minute || 0);

  useEffect(() => {
    if (match.status !== 'live') return;
    const t = setInterval(() => setMinute(m => Math.min(m + 1, 90)), 60000);
    return () => clearInterval(t);
  }, [match.status]);

  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <div className="glass-card glass-card-hover p-4 sm:p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{match.group} · {match.round}</span>
        </div>
        {isLive ? (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse"></div>
            <span className="text-xs font-bold text-red-400">{minute}&apos;</span>
          </div>
        ) : isFinished ? (
          <span className="text-xs text-gray-500 bg-white/5 px-2.5 py-1 rounded-full">FT</span>
        ) : (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={12} />
            {match.time}
          </div>
        )}
      </div>

      {/* Teams & Score */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex-1 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">{match.homeFlag}</span>
          <span className="text-xs sm:text-sm font-semibold text-white">{match.homeTeamName}</span>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 text-center">
          {(isLive || isFinished) ? (
            <div className="flex items-center gap-2">
              <span className={`text-3xl sm:text-4xl font-black tabular-nums ${isLive ? 'text-white' : 'text-gray-300'}`}>
                {match.homeScore}
              </span>
              <span className="text-gray-600 font-light text-xl">–</span>
              <span className={`text-3xl sm:text-4xl font-black tabular-nums ${isLive ? 'text-white' : 'text-gray-300'}`}>
                {match.awayScore}
              </span>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-sm font-bold text-white">{match.date.split('-').slice(1).join('/')}</div>
              <div className="text-xs text-[#00AEEF] font-semibold">{match.time}</div>
            </div>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col items-center text-center">
          <span className="text-3xl mb-2">{match.awayFlag}</span>
          <span className="text-xs sm:text-sm font-semibold text-white">{match.awayTeamName}</span>
        </div>
      </div>

      {/* Match stats bar */}
      {(isLive || isFinished) && match.stats && (
        <div className="mt-4 pt-4 border-t border-white/8">
          <div className="space-y-2">
            {[
              { label: 'Possession', home: match.stats.possession[0], away: match.stats.possession[1], suffix: '%' },
              { label: 'Shots', home: match.stats.shots[0], away: match.stats.shots[1] },
            ].map(stat => (
              <div key={stat.label}>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span className="font-medium text-white">{stat.home}{stat.suffix || ''}</span>
                  <span className="text-gray-500">{stat.label}</span>
                  <span className="font-medium text-white">{stat.away}{stat.suffix || ''}</span>
                </div>
                <div className="flex gap-1 h-1.5 rounded-full overflow-hidden bg-white/5">
                  <div
                    className="bg-[#00AEEF] rounded-full transition-all duration-1000"
                    style={{ width: `${stat.home / (stat.home + stat.away) * 100}%` }}
                  />
                  <div
                    className="bg-[#FFD700] rounded-full transition-all duration-1000"
                    style={{ width: `${stat.away / (stat.home + stat.away) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Venue */}
      <div className="mt-3 text-xs text-gray-600 text-center truncate">
        📍 {match.stadium}, {match.stadiumCity}
      </div>
    </div>
  );
}

export default function LiveMatches() {
  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 2);
  const recentMatches = matches.filter(m => m.status === 'finished').slice(0, 1);

  const displayMatches = [...liveMatches, ...recentMatches, ...upcomingMatches].slice(0, 4);

  return (
    <section className="py-16 sm:py-20 bg-[#060E1A] relative">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-6 rounded-full bg-[#00AEEF]"></div>
              {liveMatches.length > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse"></div>
                  <span className="text-xs font-bold text-red-400">{liveMatches.length} LIVE NOW</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Match Centre</h2>
            <p className="text-gray-500 text-sm mt-1">Live scores, upcoming fixtures & recent results</p>
          </div>
          <Link href="/matches" className="flex items-center gap-1 text-sm text-[#00AEEF] hover:text-[#00C4FF] font-medium transition-colors">
            All Matches <ChevronRight size={16} />
          </Link>
        </div>

        {/* Match grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayMatches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>
    </section>
  );
}
