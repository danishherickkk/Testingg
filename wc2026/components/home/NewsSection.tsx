import Link from 'next/link';
import { getLatestNews, getFeaturedNews } from '@/lib/data/news';
import { ChevronRight, Clock } from 'lucide-react';

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  const mins = Math.floor(diff / 60000);
  if (hours >= 24) return `${Math.floor(hours / 24)}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

const categoryColors: Record<string, string> = {
  'match-report': '#00AEEF',
  'preview': '#FFD700',
  'news': '#34C759',
  'analysis': '#FF9500',
  'feature': '#AF52DE',
};

const categoryLabels: Record<string, string> = {
  'match-report': 'Match Report',
  'preview': 'Preview',
  'news': 'News',
  'analysis': 'Analysis',
  'feature': 'Feature',
};

export default function NewsSection() {
  const featured = getFeaturedNews().slice(0, 1)[0];
  const latest = getLatestNews().filter(n => n.id !== featured?.id).slice(0, 5);

  return (
    <section className="py-16 sm:py-20 bg-[#040B14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="w-1.5 h-6 rounded-full bg-[#FFD700] mb-2"></div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Latest News</h2>
            <p className="text-gray-500 text-sm mt-1">Breaking stories & tournament updates</p>
          </div>
          <Link href="/news" className="flex items-center gap-1 text-sm text-[#00AEEF] hover:text-[#00C4FF] font-medium transition-colors">
            All News <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured article */}
          {featured && (
            <Link href={`/news/${featured.slug}`} className="lg:col-span-2">
              <div className="glass-card glass-card-hover h-full overflow-hidden group">
                {/* Image placeholder */}
                <div
                  className="h-52 sm:h-64 w-full flex items-end p-5 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${featured.imageColor} 0%, #060E1A 100%)` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20">⚽</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="relative">
                    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2" style={{
                      background: `${categoryColors[featured.category]}22`,
                      color: categoryColors[featured.category],
                      border: `1px solid ${categoryColors[featured.category]}44`
                    }}>
                      {categoryLabels[featured.category]}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00AEEF] transition-colors line-clamp-2 mb-2">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">{featured.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="font-medium">{featured.author}</span>
                    <div className="flex items-center gap-2">
                      <Clock size={12} />
                      <span>{timeAgo(featured.publishedAt)}</span>
                      <span>·</span>
                      <span>{featured.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Article list */}
          <div className="flex flex-col gap-3">
            {latest.slice(0, 5).map((article) => (
              <Link href={`/news/${article.slug}`} key={article.id}>
                <div className="glass-card glass-card-hover p-4 flex gap-4 group">
                  <div
                    className="w-16 h-16 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${article.imageColor}44, ${article.imageColor}11)` }}
                  >
                    ⚽
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: categoryColors[article.category] || '#00AEEF' }}>
                        {categoryLabels[article.category]}
                      </span>
                      <span className="text-[10px] text-gray-600">·</span>
                      <span className="text-[10px] text-gray-600">{timeAgo(article.publishedAt)}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-[#00AEEF] transition-colors line-clamp-2 leading-tight">
                      {article.title}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
