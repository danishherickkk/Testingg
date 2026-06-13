import Link from 'next/link';
import { Trophy, Globe, Send, Rss, Share2 } from 'lucide-react';

export default function Footer() {
  const links = {
    Tournament: [
      { label: 'Live Scores', href: '/matches' },
      { label: 'Schedule', href: '/schedule' },
      { label: 'Standings', href: '/standings' },
      { label: 'Watch Live', href: '/stream' },
    ],
    Teams: [
      { label: 'All Teams', href: '/teams' },
      { label: 'Group A', href: '/standings?group=A' },
      { label: 'Group B', href: '/standings?group=B' },
      { label: 'Players', href: '/players' },
    ],
    Info: [
      { label: 'Stadiums', href: '/stadiums' },
      { label: 'News', href: '/news' },
      { label: 'About', href: '#' },
      { label: 'Admin', href: '/admin' },
    ],
  };

  const socials = [
    { icon: Globe, href: '#', label: 'Website' },
    { icon: Send, href: '#', label: 'Telegram' },
    { icon: Rss, href: '#', label: 'RSS' },
    { icon: Share2, href: '#', label: 'Share' },
  ];

  return (
    <footer className="bg-[#040B14] border-t border-white/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0090C8] flex items-center justify-center">
                <span className="text-white font-black text-sm">WC</span>
              </div>
              <div>
                <div className="font-black text-white text-lg leading-tight">FIFA</div>
                <div className="text-[10px] text-[#00AEEF] font-bold tracking-[0.2em] leading-tight">WORLD CUP 2026™</div>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The official fan platform for FIFA World Cup 2026. Follow live scores, stats, and news from the greatest show on earth.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 hover:text-[#00AEEF] hover:bg-white/10 transition-all"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 WC2026 Fan Platform. Not affiliated with FIFA. For entertainment purposes only.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-xs text-gray-600">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
