import { stadiums } from '@/lib/data/stadiums';
import Link from 'next/link';
import { MapPin, Users, Calendar } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stadiums | FIFA World Cup 2026',
};

export default function StadiumsPage() {
  const countries = ['All', 'USA', 'Canada', 'Mexico'];

  const byCountry: Record<string, typeof stadiums> = {};
  stadiums.forEach(s => {
    if (!byCountry[s.country]) byCountry[s.country] = [];
    byCountry[s.country].push(s);
  });

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">Stadiums</h1>
          <p className="text-gray-500">{stadiums.length} world-class venues across USA, Canada & Mexico</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { value: '11', label: 'USA Venues', flag: '🇺🇸' },
            { value: '3', label: 'Canada Venues', flag: '🇨🇦' },
            { value: '3', label: 'Mexico Venues', flag: '🇲🇽' },
          ].map(s => (
            <div key={s.label} className="glass-card p-4 sm:p-5 text-center">
              <div className="text-2xl mb-1">{s.flag}</div>
              <div className="text-2xl sm:text-3xl font-black text-white">{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Stadiums by country */}
        {Object.entries(byCountry).map(([country, countryStadiums]) => (
          <div key={country} className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="text-2xl">
                {country === 'USA' ? '🇺🇸' : country === 'Canada' ? '🇨🇦' : '🇲🇽'}
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{country}</h2>
                <p className="text-xs text-gray-500">{countryStadiums.length} venues</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {countryStadiums.map(stadium => (
                <div key={stadium.id} className="glass-card glass-card-hover overflow-hidden group">
                  {/* Stadium visual */}
                  <div
                    className="h-36 flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${stadium.imageColor} 0%, #060E1A 100%)` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-[80px] opacity-20">
                      🏟️
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#060E1A] to-transparent h-16"></div>
                    <div className="relative text-center z-10">
                      <div className="text-4xl mb-1">{stadium.emoji}</div>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="text-xs font-bold bg-black/50 text-[#FFD700] px-2.5 py-1 rounded-full border border-[#FFD700]/30">
                        {stadium.matches} matches
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-black text-white text-base leading-tight">{stadium.name}</h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500">
                      <MapPin size={12} />
                      <span>{stadium.city}, {stadium.country}</span>
                    </div>

                    <p className="text-xs text-gray-600 mt-2.5 line-clamp-2 leading-relaxed">
                      {stadium.description}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="bg-white/4 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <Users size={12} className="text-[#00AEEF]" />
                          <span className="text-[10px] text-gray-600 font-semibold uppercase">Capacity</span>
                        </div>
                        <div className="text-sm font-black text-white">{stadium.capacity.toLocaleString()}</div>
                      </div>
                      <div className="bg-white/4 rounded-lg p-2.5">
                        <div className="flex items-center gap-1 mb-1">
                          <Calendar size={12} className="text-[#00AEEF]" />
                          <span className="text-[10px] text-gray-600 font-semibold uppercase">Opened</span>
                        </div>
                        <div className="text-sm font-black text-white">{stadium.opened}</div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-600">
                      Surface: <span className="text-gray-400">{stadium.surface}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
