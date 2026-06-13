'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Play, Calendar, Newspaper, ChevronRight } from 'lucide-react';

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {[
        { value: timeLeft.days, label: 'Days' },
        { value: timeLeft.hours, label: 'Hours' },
        { value: timeLeft.minutes, label: 'Mins' },
        { value: timeLeft.seconds, label: 'Secs' },
      ].map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-3 sm:gap-4">
          <div className="text-center">
            <div className="glass-card px-3 py-2 sm:px-4 sm:py-3 min-w-[56px] sm:min-w-[68px]">
              <div className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-none">
                {String(unit.value).padStart(2, '0')}
              </div>
            </div>
            <div className="text-[10px] text-gray-500 mt-1.5 font-medium tracking-wider uppercase">{unit.label}</div>
          </div>
          {i < 3 && <div className="text-2xl sm:text-3xl font-black text-[#00AEEF] -mt-4 opacity-60">:</div>}
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  const finalDate = new Date('2026-07-19T18:00:00Z');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060E1A]">
      {/* Animated background */}
      <div className="absolute inset-0 bg-grid opacity-40"></div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-[#00AEEF]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#FFD700]/8 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0B1F3A]/40 rounded-full blur-[60px] pointer-events-none"></div>

      {/* Trophy + decorative elements */}
      <div className="absolute right-4 top-20 bottom-0 lg:right-0 lg:w-1/2 flex items-center justify-center pointer-events-none select-none opacity-15 lg:opacity-25">
        <div className="float text-[300px] lg:text-[400px] xl:text-[500px] leading-none">🏆</div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#00AEEF]"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.3 + (i % 3) * 0.1,
            animation: `float-up ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00AEEF]/10 border border-[#00AEEF]/20 text-[#00AEEF] text-sm font-medium mb-6 animate-fade">
            <div className="w-2 h-2 rounded-full bg-[#00AEEF] live-pulse"></div>
            Tournament In Progress · USA · Canada · Mexico
          </div>

          {/* Headline */}
          <h1 className="font-black leading-[0.95] mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white">FIFA</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl gradient-text">WORLD CUP</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-8xl" style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>2026™</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            48 teams. 3 nations. 104 matches. The greatest football tournament in history begins now.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link href="/stream"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl btn-primary font-semibold text-sm shadow-lg">
              <Play size={16} fill="white" />
              Watch Live
            </Link>
            <Link href="/schedule"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/12 text-white font-semibold text-sm transition-all border border-white/12 hover:border-white/20">
              <Calendar size={16} />
              View Schedule
            </Link>
            <Link href="/news"
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/8 hover:bg-white/12 text-white font-semibold text-sm transition-all border border-white/12 hover:border-white/20">
              <Newspaper size={16} />
              Latest News
            </Link>
          </div>

          {/* Countdown */}
          <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              ⏱ Final · SoFi Stadium, Los Angeles · July 19
            </div>
            <CountdownTimer targetDate={finalDate} />
          </div>

          {/* Stats bar */}
          <div className="mt-10 pt-8 border-t border-white/8 grid grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            {[
              { value: '48', label: 'Teams' },
              { value: '104', label: 'Matches' },
              { value: '16', label: 'Host Cities' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-2xl sm:text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
