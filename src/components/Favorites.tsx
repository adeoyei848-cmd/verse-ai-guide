import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, BookOpen, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Verse {
  text: string;
  ref: string;
}

export default function Favorites({ favorites, onToggleFavorite }: { favorites: Verse[], onToggleFavorite: (v: Verse) => void }) {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    toast.info("Reading scripture...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" size={20} />
          Saved Scripture
        </h2>
        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded-full font-medium">
          {favorites.length} Verses
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {favorites.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-4"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
              <Heart size={32} className="opacity-20" />
            </div>
            <p className="text-sm font-medium">No saved verses yet</p>
            <p className="text-xs text-center max-w-[200px]">Save verses you find inspiring to see them here.</p>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {favorites.map((verse, i) => (
              <motion.div
                key={verse.ref}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="p-5 border-none bg-white shadow-md relative group">
                  <div className="space-y-3">
                    <p className="text-sm italic font-serif text-slate-700 leading-relaxed">
                      "{verse.text}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <span className="text-xs font-bold text-indigo-600">{verse.ref}</span>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => speak(verse.text)}
                          className="h-8 w-8 text-slate-300 hover:text-indigo-600"
                        >
                          <Volume2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            onToggleFavorite(verse);
                            toast.error("Removed from favorites");
                          }}
                          className="h-8 w-8 text-slate-300 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}