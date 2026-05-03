import React, { useState, useEffect } from 'react';
import { Home as HomeIcon, MessageSquare, Heart, Settings, BookOpen } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './components/Home';
import Chat from './components/Chat';
import Favorites from './components/Favorites';
import Devotional from './components/Devotional';

export type View = 'home' | 'chat' | 'favorites' | 'devotional';

function App() {
  const [activeView, setActiveView] = useState<View>('home');
  const [favorites, setFavorites] = useState<Array<{text: string, ref: string}>>([]);

  const toggleFavorite = (verse: {text: string, ref: string}) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.ref === verse.ref);
      if (exists) return prev.filter(f => f.ref !== verse.ref);
      return [...prev, verse];
    });
  };

  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'chat', icon: MessageSquare, label: 'AI Chat' },
    { id: 'devotional', icon: BookOpen, label: 'Devotional' },
    { id: 'favorites', icon: Heart, label: 'Saved' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E1B4B] font-sans selection:bg-indigo-100 pb-24">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-indigo-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/e94baf91-dc91-4491-91f7-d2c4281e15a0/app-logo-739ca7ae-1777631938000.webp" 
            alt="Logo" 
            className="w-8 h-8 rounded-full shadow-sm"
          />
          <h1 className="text-xl font-bold text-[#1E1B4B] tracking-tight">Lumina</h1>
        </div>
        <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors text-indigo-400">
          <Settings size={22} />
        </button>
      </header>

      <main className="pt-20 px-4 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeView === 'home' && <Home onToggleFavorite={toggleFavorite} favorites={favorites} />}
            {activeView === 'chat' && <Chat onToggleFavorite={toggleFavorite} favorites={favorites} />}
            {activeView === 'devotional' && <Devotional />}
            {activeView === 'favorites' && <Favorites favorites={favorites} onToggleFavorite={toggleFavorite} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-indigo-50 px-2 py-3 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        <div className="max-w-md mx-auto flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`flex flex-col items-center gap-1 px-4 py-1 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'text-indigo-600 bg-indigo-50/50' 
                    : 'text-gray-400 hover:text-indigo-400'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
}

export default App;