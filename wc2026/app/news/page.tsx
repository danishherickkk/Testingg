'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getLatestNews } from '@/lib/data/news';
import { Clock, Search } from 'lucide-react';

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours >= 24) return `${Math.floor(hours / 24)}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${Math.floor(diff / 60000)}m ago`;
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  'match-report': { label: 'Match Report', color: '#00AEEF' },
  'preview': { label: 'Preview', color: '#FFD700' },
  'news': { label: 'News', color: '#34C759' },
  'analysis': { label: 'Analysis', color: '#FF9500' },
  'feature': { label: 'Feature', color: '#AF52DE' },
};

const categories = ['all', 'match-report', 'preview', 'news', 'analysis', 'feature'];

export default function NewsPage() {
  const allNews = getLatestNews();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = allNews.filter(article => {
    const matchSearch = article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'all' || article.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">News</h1>
            <p className="text-gray-500">Latest from FIFA World Cup 2026</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={15} />
            <input
              type="text"
              placeholder="Search news..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-[#00AEEF]/50 w-full sm:w-60"
            />
          </div>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => {
            const config = categoryConfig[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#00AEEF] to-[#0090C8] text-white shadow-lg shadow-[#00AEEF]/20'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {config?.label || 'All'}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <div className="text-4xl mb-3">📰</div>
            <p className="text-gray-500">No articles found</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && (
              <Link href={`/news/${featured.slug}`} className="block mb-6">
                <div className="glass-card glass-card-hover overflow-hidden group">
                  <div className="grid grid-cols-1 sm:grid-cols-5">
                    <div
                      className="sm:col-span-2 h-48 sm:h-auto flex items-center justify-center relative"
                      style={{ background: `linear-gradient(135deg, ${featured.imageColor} 0%, #060E1A 100%)` }}
                    >
                      <div className="text-8xl opacity-25">⚽</div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#060E1A] hidden sm:block"></div>
                    </div>
                    <div className="sm:col-span-3 p-6 sm:p-8">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{
                          background: `${categoryConfig[featured.category]?.color || '#00AEEF'}22`,
                          color: categoryConfig[featured.category]?.color || '#00AEEF',
                          border: `1px solid ${categoryConfig[featured.category]?.color || '#00AEEF'}44`
                        }}>
                          {categoryConfig[featured.category]?.label}
                        </span>
                        <span className="text-xs text-gray-600">FEATURED</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#00AEEF] transition-colors mb-3 line-clamp-2">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-gray-500 line-clamp-3 mb-4">{featured.summary}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="font-medium text-gray-400">{featured.author}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1"><Clock size={12} />{timeAgo(featured.publishedAt)}</div>
                        <span>·</span>
                        <span>{featured.readTime} min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Article grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rest.map(article => (
                <Link href={`/news/${article.slug}`} key={article.id}>
                  <div className="glass-card glass-card-hover h-full overflow-hidden group">
                    <div
                      className="h-40 flex items-center justify-center relative"
                      style={{ background: `linear-gradient(135deg, ${article.imageColor}66 0%, #060E1A 100%)` }}
                    >
                      <div className="text-6xl opacity-30">⚽</div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#060E1A] to-transparent"></div>
                      <div className="absolute bottom-3 left-4">
                        <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                          background: `${categoryConfig[article.category]?.color || '#00AEEF'}22`,
                          color: categoryConfig[article.category]?.color || '#00AEEF',
                          border: `1px solid ${categoryConfig[article.category]?.color || '#00AEEF'}44`
                        }}>
                          {categoryConfig[article.category]?.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00AEEF] transition-colors line-clamp-2 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-3">{article.summary}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>{article.author}</span>
                        <span>·</span>
                        <div className="flex items-center gap-1"><Clock size={10} />{timeAgo(article.publishedAt)}</div>
                        <span>·</span>
                        <span>{article.readTime}m</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
