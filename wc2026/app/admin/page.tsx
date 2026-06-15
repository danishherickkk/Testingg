'use client';

import { useState } from 'react';
import { matches } from '@/lib/data/matches';
import { teams } from '@/lib/data/teams';
import { news } from '@/lib/data/news';
import { stadiums } from '@/lib/data/stadiums';
import {
  LayoutDashboard, FileText, Trophy, Users, MapPin,
  Settings, BarChart3, Bell, Plus, Edit3, Trash2,
  TrendingUp, Eye, MessageSquare, Activity, Shield
} from 'lucide-react';

type AdminTab = 'overview' | 'matches' | 'teams' | 'news' | 'stadiums' | 'notifications' | 'analytics';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [notifText, setNotifText] = useState('');

  const liveCount = matches.filter(m => m.status === 'live').length;
  const totalGoals = matches.reduce((sum, m) => sum + (m.homeScore || 0) + (m.awayScore || 0), 0);

  const navItems = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'matches', label: 'Matches', icon: Trophy, badge: liveCount > 0 ? liveCount : undefined },
    { key: 'teams', label: 'Teams', icon: Users },
    { key: 'news', label: 'News', icon: FileText },
    { key: 'stadiums', label: 'Stadiums', icon: MapPin },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  ] as const;

  return (
    <div className="min-h-screen bg-[#040B14] pt-16">
      <div className="flex">

        {/* Sidebar */}
        <aside className="w-56 min-h-screen bg-[#060E1A] border-r border-white/8 flex-shrink-0 hidden md:flex flex-col pt-8">
          <div className="px-4 mb-6">
            <div className="flex items-center gap-2">
              <Shield size={18} className="text-[#00AEEF]" />
              <span className="text-sm font-bold text-white">Admin Panel</span>
            </div>
            <span className="text-xs text-gray-600 mt-0.5 block">WC2026 Management</span>
          </div>

          <nav className="px-3 flex-1">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all ${
                  activeTab === item.key
                    ? 'bg-[#00AEEF]/15 text-[#00AEEF] border border-[#00AEEF]/20'
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon size={16} />
                {item.label}
                {(item as {badge?: number}).badge && (
                  <span className="ml-auto text-xs bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                    {(item as {badge?: number}).badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="px-4 pb-6">
            <div className="glass-card p-3 text-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mb-1.5 animate-pulse"></div>
              <div className="text-xs text-gray-500">System Online</div>
              <div className="text-xs text-green-400 font-medium">All services running</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 p-6 md:p-8 overflow-auto">

          {activeTab === 'overview' && (
            <div>
              <h1 className="text-2xl font-black text-white mb-6">Dashboard Overview</h1>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Live Matches', value: liveCount, icon: Activity, color: 'text-red-400', bg: 'bg-red-400/10', trend: '+' + liveCount },
                  { label: 'Total Goals', value: totalGoals, icon: Trophy, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10', trend: '+' + totalGoals },
                  { label: 'Teams', value: teams.length, icon: Users, color: 'text-[#00AEEF]', bg: 'bg-[#00AEEF]/10', trend: null },
                  { label: 'News Articles', value: news.length, icon: FileText, color: 'text-green-400', bg: 'bg-green-400/10', trend: '+' + news.length },
                ].map(kpi => (
                  <div key={kpi.label} className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}>
                        <kpi.icon size={18} className={kpi.color} />
                      </div>
                      {kpi.trend && <span className="text-xs text-green-400 font-medium">{kpi.trend}</span>}
                    </div>
                    <div className={`text-3xl font-black ${kpi.color}`}>{kpi.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-5">
                  <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Activity size={15} className="text-[#00AEEF]" />
                    Live Match Activity
                  </h2>
                  <div className="space-y-3">
                    {matches.filter(m => m.status === 'live').map(m => (
                      <div key={m.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-red-500 live-pulse flex-shrink-0"></div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white">{m.homeTeamName} vs {m.awayTeamName}</div>
                          <div className="text-xs text-gray-500">{m.stadium} · {m.minute}&apos;</div>
                        </div>
                        <div className="text-sm font-black text-white">{m.homeScore}–{m.awayScore}</div>
                      </div>
                    ))}
                    {matches.filter(m => m.status === 'live').length === 0 && (
                      <p className="text-sm text-gray-600">No live matches right now</p>
                    )}
                  </div>
                </div>

                <div className="glass-card p-5">
                  <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp size={15} className="text-[#FFD700]" />
                    Tournament Progress
                  </h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Group Stage', progress: 35, status: 'In Progress', color: '#00AEEF' },
                      { label: 'Round of 32', progress: 0, status: 'Upcoming', color: '#FFD700' },
                      { label: 'Round of 16', progress: 0, status: 'Upcoming', color: '#FFD700' },
                      { label: 'Quarter Finals', progress: 0, status: 'Upcoming', color: '#FFD700' },
                      { label: 'Semi Finals', progress: 0, status: 'Upcoming', color: '#FFD700' },
                      { label: 'Final', progress: 0, status: 'Upcoming', color: '#FFD700' },
                    ].map(stage => (
                      <div key={stage.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">{stage.label}</span>
                          <span className="font-medium" style={{ color: stage.color }}>{stage.status}</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${stage.progress}%`, background: stage.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-white">Manage Matches</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00AEEF] text-white text-sm font-semibold hover:bg-[#00C4FF] transition-colors">
                  <Plus size={15} /> Add Match
                </button>
              </div>
              <div className="glass-card overflow-hidden">
                <div className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/8 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="col-span-5">Match</div>
                  <div className="col-span-2 text-center">Score</div>
                  <div className="col-span-2 text-center">Status</div>
                  <div className="col-span-2 text-center">Date</div>
                  <div className="col-span-1 text-center">Actions</div>
                </div>
                {matches.map(match => (
                  <div key={match.id} className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-white/5 last:border-0 items-center hover:bg-white/2 transition-colors">
                    <div className="col-span-5 text-sm text-gray-300">
                      <div className="font-medium">{match.homeTeamName} vs {match.awayTeamName}</div>
                      <div className="text-xs text-gray-600">{match.stadium}</div>
                    </div>
                    <div className="col-span-2 text-center text-sm font-bold text-white">
                      {match.homeScore !== null ? `${match.homeScore}–${match.awayScore}` : '–'}
                    </div>
                    <div className="col-span-2 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        match.status === 'live' ? 'bg-red-400/15 text-red-400' :
                        match.status === 'finished' ? 'bg-green-400/15 text-green-400' :
                        'bg-blue-400/15 text-blue-400'
                      }`}>
                        {match.status === 'live' ? 'LIVE' : match.status === 'finished' ? 'FT' : 'Soon'}
                      </span>
                    </div>
                    <div className="col-span-2 text-center text-xs text-gray-500">{match.date}</div>
                    <div className="col-span-1 flex items-center justify-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-[#00AEEF] transition-all"><Edit3 size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-white">Manage Teams</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00AEEF] text-white text-sm font-semibold hover:bg-[#00C4FF] transition-colors">
                  <Plus size={15} /> Add Team
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {teams.map(team => (
                  <div key={team.id} className="glass-card p-4 flex items-center gap-3">
                    <span className="text-2xl">{team.flagEmoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">{team.name}</div>
                      <div className="text-xs text-gray-500">Group {team.group} · {team.players.length} players</div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-[#00AEEF] transition-all"><Edit3 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'news' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-white">Manage News</h1>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00AEEF] text-white text-sm font-semibold hover:bg-[#00C4FF] transition-colors">
                  <Plus size={15} /> New Article
                </button>
              </div>
              <div className="glass-card overflow-hidden">
                {news.map(article => (
                  <div key={article.id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{article.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{article.author} · {article.category} · {article.readTime}m read</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {article.featured && (
                        <span className="text-xs bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/30 px-2 py-0.5 rounded-full">Featured</span>
                      )}
                      <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-[#00AEEF] transition-all"><Edit3 size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h1 className="text-2xl font-black text-white mb-6">Push Notifications</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-6">
                  <h2 className="text-sm font-bold text-white mb-4">Send Notification</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Type</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#00AEEF]/50">
                        <option className="bg-[#0B1F3A]">Goal Scored</option>
                        <option className="bg-[#0B1F3A]">Match Start</option>
                        <option className="bg-[#0B1F3A]">Match End</option>
                        <option className="bg-[#0B1F3A]">Red Card</option>
                        <option className="bg-[#0B1F3A]">VAR Decision</option>
                        <option className="bg-[#0B1F3A]">Custom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">Message</label>
                      <textarea
                        rows={3}
                        value={notifText}
                        onChange={e => setNotifText(e.target.value)}
                        placeholder="Notification message..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#00AEEF]/50 resize-none"
                      />
                    </div>
                    <button
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#00AEEF]/25 transition-all flex items-center justify-center gap-2">
                      <Bell size={15} />
                      Send to All Users
                    </button>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h2 className="text-sm font-bold text-white mb-4">Recent Notifications</h2>
                  <div className="space-y-3">
                    {[
                      { type: '⚽ Goal', msg: 'Vinicius Jr. scores for Brazil! 3-1', time: '5m ago', color: 'text-green-400' },
                      { type: '🔴 Live', msg: 'Brazil vs Mexico has kicked off!', time: '67m ago', color: 'text-red-400' },
                      { type: '⚽ Goal', msg: 'Mbappé hat-trick! France 4-0 Senegal', time: '2h ago', color: 'text-green-400' },
                      { type: '🏁 FT', msg: 'USA 2-0 Canada | Full Time', time: '3h ago', color: 'text-gray-400' },
                    ].map((n, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-white/3 rounded-xl">
                        <div>
                          <div className="text-xs font-bold" style={{}}><span className={n.color}>{n.type}</span></div>
                          <div className="text-sm text-gray-300 mt-0.5">{n.msg}</div>
                          <div className="text-xs text-gray-600 mt-0.5">{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h1 className="text-2xl font-black text-white mb-6">Analytics</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Page Views Today', value: '2.4M', icon: Eye, color: 'text-[#00AEEF]', bg: 'bg-[#00AEEF]/10' },
                  { label: 'Active Users', value: '184K', icon: Users, color: 'text-green-400', bg: 'bg-green-400/10' },
                  { label: 'Match Views', value: '890K', icon: Trophy, color: 'text-[#FFD700]', bg: 'bg-[#FFD700]/10' },
                  { label: 'Notifications Sent', value: '5.1M', icon: Bell, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                ].map(stat => (
                  <div key={stat.label} className="glass-card p-5">
                    <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass-card p-6">
                <h2 className="text-sm font-bold text-white mb-4">Top Content</h2>
                <div className="space-y-3">
                  {[
                    { page: '/matches', views: '890,234', change: '+12%' },
                    { page: '/ (Homepage)', views: '654,122', change: '+8%' },
                    { page: '/standings', views: '312,445', change: '+5%' },
                    { page: '/teams/brazil', views: '234,678', change: '+23%' },
                    { page: '/news/brazil-thrash-mexico', views: '198,345', change: '+45%' },
                    { page: '/stream', views: '178,901', change: '+18%' },
                  ].map(item => (
                    <div key={item.page} className="flex items-center gap-3">
                      <div className="flex-1 text-sm text-gray-400 font-mono truncate">{item.page}</div>
                      <div className="text-sm font-semibold text-white">{item.views}</div>
                      <div className="text-xs text-green-400 w-14 text-right">{item.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stadiums' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-black text-white">Manage Stadiums</h1>
              </div>
              <div className="glass-card overflow-hidden">
                {stadiums.map(s => (
                  <div key={s.id} className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <div className="text-2xl">{s.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white">{s.name}</div>
                      <div className="text-xs text-gray-500">{s.city}, {s.country} · {s.capacity.toLocaleString()} capacity · {s.matches} matches</div>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-white/8 text-gray-500 hover:text-[#00AEEF] transition-all"><Edit3 size={13} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
