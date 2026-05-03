import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Share2, Play } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Devotional() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <Calendar className="text-indigo-600" size={20} />
        <h2 className="text-xl font-bold text-slate-800">Daily Devotional</h2>
      </div>

      <Card className="overflow-hidden border-none shadow-xl bg-white rounded-[2rem]">
        <div className="relative h-56">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/e94baf91-dc91-4491-91f7-d2c4281e15a0/daily-devotional-background-9a80a588-1777631938096.webp" 
            className="w-full h-full object-cover"
            alt="Open Bible"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/40 transition-all group">
              <Play className="text-white fill-white ml-1 group-hover:scale-110 transition-transform" size={28} />
            </Button>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
              Today's Focus
            </span>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <h3 className="text-2xl font-serif font-bold text-slate-800">The Peace Beyond Understanding</h3>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <BookOpen size={16} />
            <span>John 14:27</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Jesus doesn't give as the world gives. The peace he offers isn't the absence of trouble, but the presence of God in the midst of it. When life feels chaotic, remember that your anchor is not in the calm of the sea, but in the character of the Captain.
          </p>
          <div className="pt-4 flex gap-3">
            <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 font-bold">
              Mark as Read
            </Button>
            <Button variant="outline" className="h-12 w-12 rounded-xl border-indigo-50 text-indigo-600">
              <Share2 size={20} />
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
        <h4 className="font-bold text-amber-900 mb-2">Prayer for Today</h4>
        <p className="text-amber-800/80 italic text-sm leading-relaxed">
          "Lord, help me to fix my eyes on You today. When the waves rise, remind me that You are in the boat with me. Grant me the peace that only You can provide. Amen."
        </p>
      </div>
    </div>
  );
}