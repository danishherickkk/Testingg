import { notFound } from 'next/navigation';
import Link from 'next/link';
import { news, getNewsBySlug, getLatestNews } from '@/lib/data/news';
import { ArrowLeft, Clock, User, Tag } from 'lucide-react';
import { Metadata } from 'next';

export function generateStaticParams() {
  return news.map(n => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: `${article.title} | WC2026`,
    description: article.summary,
  };
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  'match-report': { label: 'Match Report', color: '#00AEEF' },
  'preview': { label: 'Preview', color: '#FFD700' },
  'news': { label: 'News', color: '#34C759' },
  'analysis': { label: 'Analysis', color: '#FF9500' },
  'feature': { label: 'Feature', color: '#AF52DE' },
};

function timeAgo(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const related = getLatestNews().filter(n => n.slug !== slug && n.tags.some(t => article.tags.includes(t))).slice(0, 3);

  const cat = categoryConfig[article.category];

  return (
    <div className="min-h-screen bg-[#060E1A] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Link href="/news" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to News
        </Link>

        {/* Hero */}
        <div
          className="rounded-2xl overflow-hidden h-64 sm:h-80 flex items-end p-6 sm:p-8 mb-8 relative"
          style={{ background: `linear-gradient(135deg, ${article.imageColor} 0%, #060E1A 100%)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center text-[200px] opacity-10">⚽</div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="relative z-10">
            <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold mb-3" style={{
              background: `${cat?.color || '#00AEEF'}22`,
              color: cat?.color || '#00AEEF',
              border: `1px solid ${cat?.color || '#00AEEF'}44`
            }}>
              {cat?.label}
            </span>
          </div>
        </div>

        {/* Article */}
        <article>
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-lg text-gray-400 mb-5 leading-relaxed">{article.summary}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-white/8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0090C8] flex items-center justify-center text-xs font-bold text-white">
                  {article.author[0]}
                </div>
                <span className="font-medium text-gray-300">{article.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{timeAgo(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{article.readTime} min read</span>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-5 text-base sm:text-lg">
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-white/8 flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer border border-white/8">
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-black text-white mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(rel => (
                <Link href={`/news/${rel.slug}`} key={rel.id}>
                  <div className="glass-card glass-card-hover p-4 h-full">
                    <span className="text-xs font-bold" style={{ color: categoryConfig[rel.category]?.color || '#00AEEF' }}>
                      {categoryConfig[rel.category]?.label}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-1.5 line-clamp-2 group-hover:text-[#00AEEF] transition-colors">
                      {rel.title}
                    </h3>
                    <div className="text-xs text-gray-600 mt-2">{rel.author}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
