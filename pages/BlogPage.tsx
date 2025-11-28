import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/PageShell';

type BlogArticle = {
  title: string;
  slug: string;
  summary: string;
  image: string;
  tag: string;
  date: string;
};

const articles: BlogArticle[] = [
  {
    title: 'Inside the Velvet Signature: Crafting Chauffeur Experiences',
    slug: 'velvet-signature-experience',
    summary: 'How our team elevates every journey from airport transfers to red-carpet events.',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Lifestyle',
    date: 'Mar 02, 2025'
  },
  {
    title: 'Corporate Travel Playbook: Stress-Free Logistics for Leaders',
    slug: 'corporate-travel-playbook',
    summary: 'Practical tips for assistants and travel managers booking executive transport at scale.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    tag: 'Corporate',
    date: 'Feb 18, 2025'
  },
  {
    title: 'Winter in London: Routes, Timing, and Concierge Extras',
    slug: 'winter-in-london-routes',
    summary: 'Beat the weather with smart routing, warm welcomes, and onboard comforts.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    tag: 'City Guides',
    date: 'Jan 30, 2025'
  }
];

const BlogCard: React.FC<{ article: BlogArticle; onClick: () => void }> = ({ article, onClick }) => (
  <article
    className="group rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg shadow-black/30 hover:border-amber-400/50 transition-all cursor-pointer"
    onClick={onClick}
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-amber-300">
        {article.tag}
      </span>
    </div>
    <div className="p-5 space-y-3">
      <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{article.date}</p>
      <h3 className="text-xl font-semibold text-white">{article.title}</h3>
      <p className="text-sm text-gray-300 leading-relaxed">{article.summary}</p>
      <button className="text-sm font-semibold text-amber-300 group-hover:text-amber-200 transition-colors">
        Read article →
      </button>
    </div>
  </article>
);

const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageShell mainClassName="flex flex-col items-center px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-6xl w-full space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300">Our Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white">Latest from Velvet Drivers</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Stories on luxury travel, company news, and insider tips to make every journey effortless.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <BlogCard key={article.slug} article={article} onClick={() => navigate(`/blog/${article.slug}`)} />
          ))}
        </div>
      </div>
    </PageShell>
  );
};

export default BlogPage;
