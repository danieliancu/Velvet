import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

type BlogArticle = {
  title: string;
  slug: string;
  body: string[];
  image: string;
  tag: string;
  date: string;
};

const articles: BlogArticle[] = [
  {
    title: 'Inside the Velvet Signature: Crafting Chauffeur Experiences',
    slug: 'velvet-signature-experience',
    tag: 'Lifestyle',
    date: 'Mar 02, 2025',
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80',
    body: [
      'At Velvet Drivers, every journey is choreographed well before your chauffeur arrives. From route planning to bespoke in-car touches, we design a seamless experience that feels effortless for you and your guests.',
      'Our chauffeurs receive ongoing etiquette and safety training, with a focus on discretion and anticipation—hotspots to avoid at peak times, quiet entrances for events, and comfort preferences captured on your profile.',
      'We partner with premium hospitality suppliers for in-car amenities and maintain a rotating fleet refresh to ensure every cabin feels contemporary, calm, and camera-ready.'
    ]
  },
  {
    title: 'Corporate Travel Playbook: Stress-Free Logistics for Leaders',
    slug: 'corporate-travel-playbook',
    tag: 'Corporate',
    date: 'Feb 18, 2025',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Executive assistants and travel managers rely on predictability. Our corporate team builds templated itineraries for recurring travel—board meetings, investor days, and airport rotations—with live monitoring and rapid replans when schedules slip.',
      'Invoices can consolidate weekly or monthly with clear PO references. Every trip remains pre-booked with passenger, pickup, destination, and wait-time breakdowns to stay TfL-compliant.',
      'Need short-notice cover? We maintain surge capacity through vetted chauffeurs, prioritising vehicles that match your brand tone: S-Class, 7 Series, EQV, and V-Class.'
    ]
  },
  {
    title: 'Winter in London: Routes, Timing, and Concierge Extras',
    slug: 'winter-in-london-routes',
    tag: 'City Guides',
    date: 'Jan 30, 2025',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Winter adds time: fog at Heathrow, crowded West End streets, and icy backroads. We adjust ETAs, build extra margins, and keep alternative routes loaded in the nav for every booking.',
      'Cabins are pre-warmed, with blankets and bottled water available on request. For red-carpet or gala arrivals, we coordinate drop-off windows and queue management with venues.',
      'Need more than transport? We can line up restaurant holds, last-mile concierge help, and luggage assistance through trusted partners.'
    ]
  }
];

const BlogArticlePage: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <PageShell mainClassName="flex flex-col items-center px-4 sm:px-6 md:px-8 py-16">
        <div className="max-w-4xl w-full text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">Article not found</h1>
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex px-6 py-3 rounded-md border border-amber-400 text-amber-300 hover:bg-amber-400 hover:text-black transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell mainClassName="flex flex-col items-center px-4 sm:px-6 md:px-8 py-16">
      <div className="max-w-4xl w-full space-y-8">
        <div className="space-y-2">
          <Link to="/blog" className="text-sm text-amber-300 hover:text-amber-200">← Back to Blog</Link>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{article.date} • {article.tag}</p>
          <h1 className="text-4xl md:text-5xl font-bold font-display text-white">{article.title}</h1>
        </div>
        <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl shadow-black/30">
          <img src={article.image} alt={article.title} className="w-full h-[360px] object-cover" />
        </div>
        <div className="space-y-4 text-gray-200 leading-relaxed">
          {article.body.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-200/90">{paragraph}</p>
          ))}
        </div>
        <div className="pt-4">
          <button
            onClick={() => navigate('/booking')}
            className="px-8 py-3 text-lg font-semibold bg-amber-500 text-black rounded-md hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.5)]"
          >
            Book a Journey
          </button>
        </div>
      </div>
    </PageShell>
  );
};

export default BlogArticlePage;
