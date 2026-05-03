import React from 'react';
import { 
  Flame, 
  Heart, 
  Compass, 
  CloudRain, 
  Sunrise, 
  Moon,
  ArrowRight,
  BookMarked,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  onAction: (tab: string) => void;
}

const moods = [
  { id: 'anxious', icon: <CloudRain className="w-5 h-5" />, label: 'Anxious', color: 'bg-blue-50 text-blue-600' },
  { id: 'joyful', icon: <Sunrise className="w-5 h-5" />, label: 'Joyful', color: 'bg-orange-50 text-orange-600' },
  { id: 'lost', icon: <Compass className="w-5 h-5" />, label: 'Lost', color: 'bg-purple-50 text-purple-600' },
  { id: 'weary', icon: <Moon className="w-5 h-5" />, label: 'Weary', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'loved', icon: <Heart className="w-5 h-5" />, label: 'Loved', color: 'bg-red-50 text-red-600' },
  { id: 'passionate', icon: <Flame className="w-5 h-5" />, label: 'Passionate', color: 'bg-amber-50 text-amber-600' },
];

const Dashboard: React.FC<DashboardProps> = ({ onAction }) => {
  return (
    <div className="p-6 space-y-8">
      {/* Daily Devotional Card */}
      <section className="relative overflow-hidden rounded-3xl group cursor-pointer" onClick={() => onAction('verses')}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/e94baf91-dc91-4491-91f7-d2c4281e15a0/hero-image-morning-devotional-952f1394-1777631612734.webp" 
          alt="Daily Devotional" 
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
          <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">DAILY DEVOTIONAL</span>
          <h2 className="text-2xl font-bold text-white mb-1 italic">Finding Peace in the Storm</h2>
          <p className="text-white/80 text-sm line-clamp-2">"Peace I leave with you; my peace I give you. I do not give to you as the world gives." - John 14:27</p>
        </div>
      </section>

      {/* Mood Selector */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 italic">How are you feeling today?</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {moods.map((mood) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={mood.id}
              onClick={() => onAction('verses')}
              className={`flex flex-col items-center justify-center p-4 rounded-2xl ${mood.color} transition-all border border-transparent hover:border-current/10`}
            >
              <div className="mb-2">{mood.icon}</div>
              <span className="text-xs font-semibold">{mood.label}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* AI Assistant Call to Action */}
      <section 
        className="p-5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white cursor-pointer"
        onClick={() => onAction('chat')}
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg leading-tight">Ask the Scripture Assistant</h4>
            <p className="text-white/70 text-sm mt-1">Get answers to your life questions through the lens of the Bible.</p>
            <div className="mt-3 flex items-center text-xs font-bold gap-1">
              TRY NOW <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Verses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 italic">Recently Explored</h3>
          <button className="text-purple-600 text-xs font-bold" onClick={() => onAction('verses')}>VIEW ALL</button>
        </div>
        <div className="space-y-3">
          {[
            { ref: 'Psalm 23:1', text: 'The Lord is my shepherd, I lack nothing.', category: 'Guidance' },
            { ref: 'Romans 8:28', text: 'And we know that in all things God works for the good...', category: 'Hope' }
          ].map((verse, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <BookMarked className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">{verse.ref}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full uppercase tracking-wider">{verse.category}</span>
                </div>
                <p className="text-sm text-slate-600 italic line-clamp-1">"{verse.text}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;