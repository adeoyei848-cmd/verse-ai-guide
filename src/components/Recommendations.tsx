import React, { useState } from 'react';
import { Search, Heart, Share2, BookOpen, Filter, Bookmark, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = ['All', 'Anxiety', 'Joy', 'Strength', 'Peace', 'Healing', 'Wisdom'];

const verses = [
  {
    id: '1',
    ref: 'Psalm 34:18',
    text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.',
    translation: 'NIV',
    category: 'Healing'
  },
  {
    id: '2',
    ref: 'Isaiah 41:10',
    text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.',
    translation: 'NIV',
    category: 'Strength'
  },
  {
    id: '3',
    ref: 'Philippians 4:4',
    text: 'Rejoice in the Lord always. I will say it again: Rejoice!',
    translation: 'NIV',
    category: 'Joy'
  },
  {
    id: '4',
    ref: 'Matthew 6:34',
    text: 'Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.',
    translation: 'NIV',
    category: 'Anxiety'
  }
];

const Recommendations: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVerses = verses.filter(v => 
    (activeCategory === 'All' || v.category === activeCategory) &&
    (v.text.toLowerCase().includes(searchQuery.toLowerCase()) || v.ref.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 italic">Explore Scripture</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search verses by topic or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-purple-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredVerses.map((verse) => (
          <motion.div
            layout
            key={verse.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-900">{verse.ref}</h4>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{verse.translation}</span>
              </div>
              <div className="flex gap-1">
                <button className="p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-50 text-slate-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-lg text-slate-700 italic leading-relaxed">"{verse.text}"</p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] bg-purple-50 text-purple-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {verse.category}
              </span>
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600 transition-colors">
                <PlayCircle className="w-4 h-4" /> LISTEN
              </button>
            </div>
          </motion.div>
        ))}
        {filteredVerses.length === 0 && (
          <div className="text-center py-20 text-slate-400 space-y-3">
            <BookOpen className="w-12 h-12 mx-auto opacity-20" />
            <p className="text-sm">No verses found for your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;