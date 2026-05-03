import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Volume2, Heart, RefreshCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Verse {
  text: string;
  ref: string;
}

const MOODS = [
  { name: 'Anxious', icon: '🍃' },
  { name: 'Joyful', icon: '☀️' },
  { name: 'Lost', icon: '🧭' },
  { name: 'Grateful', icon: '🙏' },
  { name: 'Sad', icon: '💧' },
];

const VERSES: Record<string, Verse[]> = {
  'Anxious': [
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", ref: "Philippians 4:6" },
    { text: "When anxiety was great within me, your consolation brought me joy.", ref: "Psalm 94:19" }
  ],
  'Joyful': [
    { text: "This is the day that the Lord has made; let us rejoice and be glad in it.", ref: "Psalm 118:24" },
    { text: "The joy of the Lord is your strength.", ref: "Nehemiah 8:10" }
  ],
  'Lost': [
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", ref: "Proverbs 3:5-6" },
    { text: "Your word is a lamp for my feet, a light on my path.", ref: "Psalm 119:105" }
  ],
  'Grateful': [
    { text: "Give thanks to the Lord, for he is good; his love endures forever.", ref: "1 Chronicles 16:34" },
    { text: "I will praise God’s name in song and glorify him with thanksgiving.", ref: "Psalm 69:30" }
  ],
  'Sad': [
    { text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.", ref: "Psalm 34:18" },
    { text: "He heals the brokenhearted and binds up their wounds.", ref: "Psalm 147:3" }
  ]
};

export default function Home({ onToggleFavorite, favorites }: { onToggleFavorite: (v: Verse) => void, favorites: Verse[] }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState<Verse | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    const options = VERSES[mood];
    const random = options[Math.floor(Math.random() * options.length)];
    setCurrentVerse(random);
    toast.success(`Finding a verse for your ${mood.toLowerCase()} mood`);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
    toast.info("Reading scripture aloud...");
  };

  return (
    <div className="space-y-8 pb-8">
      <section className="relative h-48 rounded-3xl overflow-hidden shadow-xl group">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/e94baf91-dc91-4491-91f7-d2c4281e15a0/app-background-9ba3361f-1777631938100.webp" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt="Morning light"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-6">
          <p className="text-white/80 text-sm font-medium uppercase tracking-[0.2em] mb-1">Welcome back</p>
          <h2 className="text-2xl font-bold text-white leading-tight">Walk in the Light today</h2>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-semibold text-slate-800">How do you feel?</h3>
          <span className="text-xs text-indigo-500 font-medium">AI Recommendation</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {MOODS.map((mood) => (
            <button
              key={mood.name}
              onClick={() => handleMoodSelect(mood.name)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${
                selectedMood === mood.name 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-slate-600 border border-slate-100 hover:border-indigo-100'
              }`}
            >
              <span className="text-2xl">{mood.icon}</span>
              <span className="text-xs font-semibold">{mood.name}</span>
            </button>
          ))}
        </div>
      </section>

      {currentVerse && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-8 border-none bg-white shadow-[0_20px_50px_rgba(30,27,75,0.06)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Sparkles size={120} className="text-indigo-900" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <p className="text-xl italic font-serif leading-relaxed text-slate-700">
                "{currentVerse.text}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-indigo-50">
                <span className="text-sm font-bold text-indigo-600">{currentVerse.ref}</span>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => speak(`${currentVerse.text}. ${currentVerse.ref}`)}
                    className="h-10 w-10 rounded-full hover:bg-indigo-50 text-indigo-400"
                  >
                    <Volume2 size={18} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onToggleFavorite(currentVerse)}
                    className={`h-10 w-10 rounded-full hover:bg-indigo-50 ${favorites.find(f => f.ref === currentVerse.ref) ? 'text-red-500 fill-red-500' : 'text-slate-300'}`}
                  >
                    <Heart size={18} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleMoodSelect(selectedMood!)}
                    className="h-10 w-10 rounded-full hover:bg-indigo-50 text-slate-300"
                  >
                    <RefreshCcw size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <section className="bg-indigo-900 rounded-3xl p-6 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="font-bold text-lg">AI Bible Guide</h4>
            <p className="text-indigo-200 text-sm">Ask anything about scripture</p>
          </div>
          <Button className="bg-white text-indigo-900 hover:bg-indigo-50 rounded-xl px-6 font-bold shadow-xl">
            Start Chat
          </Button>
        </div>
      </section>
    </div>
  );
}