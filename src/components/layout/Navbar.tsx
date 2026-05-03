import React from 'react';
import { Home, MessageSquare, BookOpen, Info } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'chat' | 'verses' | 'guide';
  setActiveTab: (tab: 'home' | 'chat' | 'verses' | 'guide') => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home' },
    { id: 'chat', icon: <MessageSquare className="w-5 h-5" />, label: 'Chat' },
    { id: 'verses', icon: <BookOpen className="w-5 h-5" />, label: 'Bible' },
    { id: 'guide', icon: <Info className="w-5 h-5" />, label: 'Guide' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/50 rounded-full py-2 px-4 shadow-xl flex items-center justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 transition-all relative ${
                activeTab === tab.id ? 'text-purple-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
              {activeTab === tab.id && (
                <span className="absolute -top-1 w-1 h-1 bg-purple-600 rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;