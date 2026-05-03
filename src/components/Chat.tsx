import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Volume2, Sparkles, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'ai';
  content: string;
  verse?: { text: string; ref: string };
}

export default function Chat({ onToggleFavorite, favorites }: { onToggleFavorite: (v: {text: string, ref: string}) => void, favorites: any[] }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Peace be with you. I am your AI spiritual guide. How can I help you explore scripture today?" }
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI Response
    setTimeout(() => {
      let aiResponse: Message;
      if (text.toLowerCase().includes('strength')) {
        aiResponse = { 
          role: 'ai', 
          content: "In moments of weakness, remember that God's power is made perfect in us. Here is a verse for your journey:",
          verse: { text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'", ref: "2 Corinthians 12:9" }
        };
      } else if (text.toLowerCase().includes('love')) {
         aiResponse = { 
          role: 'ai', 
          content: "God's love is the ultimate foundation of our faith. It is patient and kind.",
          verse: { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16" }
        };
      } else {
        aiResponse = { 
          role: 'ai', 
          content: "That is a profound reflection. Scripture tells us to seek first the kingdom of God.",
          verse: { text: "Seek first his kingdom and his righteousness, and all these things will be given to you as well.", ref: "Matthew 6:33" }
        };
      }
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      toast.info("Listening to your voice...");
      // Mock voice input
      setTimeout(() => {
        setIsRecording(false);
        handleSend("How can I find strength when I am tired?");
        toast.success("Voice recognized");
      }, 3000);
    } else {
      setIsRecording(false);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 px-1 pb-4 scrollbar-hide"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 rounded-tr-none' 
                : 'bg-white border border-indigo-50 text-slate-700 shadow-sm rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
              
              {msg.verse && (
                <div className="mt-4 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                  <p className="text-xs italic text-indigo-900 font-serif leading-relaxed mb-2">"{msg.verse.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600">{msg.verse.ref}</span>
                    <div className="flex gap-1">
                      <button onClick={() => speak(msg.verse!.text)} className="p-1 text-indigo-400 hover:text-indigo-600">
                        <Volume2 size={14} />
                      </button>
                      <button 
                        onClick={() => onToggleFavorite(msg.verse!)} 
                        className={`p-1 ${favorites.find(f => f.ref === msg.verse?.ref) ? 'text-red-500' : 'text-slate-300'}`}
                      >
                        <Heart size={14} fill={favorites.find(f => f.ref === msg.verse?.ref) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white border border-indigo-50 rounded-2xl shadow-lg flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleRecording}
          className={`h-10 w-10 rounded-xl transition-colors ${isRecording ? 'bg-red-50 text-red-500 animate-pulse' : 'text-slate-400'}`}
        >
          {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
        </Button>
        <Input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 border-none focus-visible:ring-0 bg-transparent"
        />
        <Button 
          size="icon" 
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="h-10 w-10 bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md text-white disabled:opacity-50"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
}