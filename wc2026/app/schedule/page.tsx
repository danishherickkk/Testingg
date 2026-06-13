'use client';

import { useState } from 'react';
import { matches } from '@/lib/data/matches';
import { teams } from '@/lib/data/teams';
import { stadiums } from '@/lib/data/stadiums';
import { Filter, Calendar } from 'lucide-react';

type FilterGroup = 'all' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export default function SchedulePage() {
  const [groupFilter, setGroupFilter] = useState<FilterGroup>('all');
  const [stadiumFilter, setStadiumFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  const uniqueDates = [...new Set(matches.map(m => m.date))].sort();
  const uniqueStadiums = [...new Set(matches.map(m => m.stadium))];

  const filtered = matches.filter(m => {
    const matchGroup = groupFilter === 'all' || m.group === groupFilter;
    const matchStadium = stadiumFilter === 'all' || m.stadium === stadiumFilter;
    const matchDate = dateFilter === 'all' || m.date === dateFilter;
    return matchGroup && matchStadium && matchDate;
  }).sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  const grouped: Record<string, typeof matches> = {};
  filtered.forEach(m => {
    const key = m.date;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });

  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Match Schedule</h1>
          <p className="text-gray-500">Complete tournament fixture list</p>
        </div>

        {/* Filters */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <Filter size={14} /> Filters
          </div>
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Group</label>
              <div className="flex flex-wrap gap-1.5">
                <button onClick={() => setGroupFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${groupFilter === 'all' ? 'bg-[#00AEEF] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                  All
                </button>
                {groups.map(g => (
                  <button key={g} onClick={() => setGroupFilter(g as FilterGroup)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${groupFilter === g ? 'bg-[#00AEEF] text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Date</label>
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00AEEF]/50"
              >
                <option value="all" className="bg-[#0B1F3A]">All Dates</option>
                {uniqueDates.map(d => (
                  <option key={d} value={d} className="bg-[#0B1F3A]">{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-600 mb-1.5">Venue</label>
              <select
                value={stadiumFilter}
                onChange={e => setStadiumFilter(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00AEEF]/50"
              >
                <option value="all" className="bg-[#0B1F3A]">All Venues</option>
                {uniqueStadiums.map(s => (
                  <option key={s} value={s} className="bg-[#0B1F3A]">{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-600 mb-4">{filtered.length} matches</div>

        {/* Schedule grouped by date */}
        {Object.keys(grouped).length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-gray-500">No matches found with these filters</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, dayMatches]) => (
            <div key={date} className="mb-8">
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                  <Calendar size={14} className="text-[#00AEEF]" />
                  <span className="text-sm font-semibold text-white">
                    {new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <span className="text-xs text-gray-600">{dayMatches.length} match{dayMatches.length > 1 ? 'es' : ''}</span>
              </div>

              <div className="space-y-3">
                {dayMatches.map(match => {
                  const isLive = match.status === 'live';
                  const isFinished = match.status === 'finished';

                  return (
                    <div key={match.id} className="glass-card p-4 sm:p-5 hover:border-[#00AEEF]/20 border border-white/8 transition-all">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Status */}
                        <div className="flex-shrink-0 w-20 text-center">
                          {isLive ? (
                            <div className="flex flex-col items-center">
                              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/15 border border-red-500/30 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500 live-pulse"></div>
                                <span className="text-xs font-black text-red-400">LIVE</span>
                              </div>
                              <span className="text-xs text-red-400">{match.minute}&apos;</span>
                            </div>
                          ) : isFinished ? (
                            <div className="text-center">
                              <div className="text-xs text-gray-500 font-bold bg-white/5 px-2 py-1 rounded-full">FT</div>
                              <div className="text-xs text-gray-600 mt-1">{match.time}</div>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="text-base font-black text-white">{match.time}</div>
                              <div className="text-xs text-[#00AEEF]">KO</div>
                            </div>
                          )}
                        </div>

                        {/* Match */}
                        <div className="flex-1 grid grid-cols-3 items-center gap-3">
                          <div className="flex items-center justify-end gap-2 sm:gap-3">
                            <span className="text-sm font-bold text-white text-right">{match.homeTeamName}</span>
                            <span className="text-2xl sm:text-3xl">{match.homeFlag}</span>
                          </div>
                          <div className="text-center">
                            {(isLive || isFinished) ? (
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">{match.homeScore}</span>
                                <span className="text-gray-600">—</span>
                                <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">{match.awayScore}</span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-[#00AEEF]">vs</span>
                            )}
                          </div>
                          <div className="flex items-center justify-start gap-2 sm:gap-3">
                            <span className="text-2xl sm:text-3xl">{match.awayFlag}</span>
                            <span className="text-sm font-bold text-white text-left">{match.awayTeamName}</span>
                          </div>
                        </div>

                        {/* Venue */}
                        <div className="flex-shrink-0 text-right hidden sm:block">
                          <div className="text-xs font-medium text-gray-400">{match.stadium}</div>
                          <div className="text-xs text-gray-600">{match.stadiumCity}</div>
                          <div className="text-xs text-[#00AEEF]/60 mt-0.5">Group {match.group}</div>
                        </div>
                      </div>

                      {/* Mobile venue */}
                      <div className="mt-2 text-xs text-center text-gray-600 sm:hidden">
                        📍 {match.stadium}, {match.stadiumCity} · Group {match.group}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
