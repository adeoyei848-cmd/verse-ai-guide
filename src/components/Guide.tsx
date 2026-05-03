import React from 'react';
import { 
  Database, 
  Cpu, 
  Layers, 
  Zap, 
  Terminal, 
  ShieldCheck, 
  Cloud,
  Code2,
  GitBranch,
  Smartphone,
  Mic,
  Volume2
} from 'lucide-react';

const Guide: React.FC = () => {
  return (
    <div className="p-6 space-y-8 pb-12">
      <header className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 italic">Project Blueprint</h2>
        <p className="text-slate-500 text-sm">Comprehensive guide to building Lumina AI Bible App.</p>
      </header>

      {/* System Architecture */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter">System Architecture</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-sm text-slate-700 mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4" /> Frontend
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              React 19, Tailwind CSS, Vite. Mobile-first PWA design for cross-platform compatibility. Uses Framer Motion for high-fidelity animations.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-sm text-slate-700 mb-2 flex items-center gap-2">
              <Cloud className="w-4 h-4" /> Backend & DB
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Supabase (PostgreSQL) for user data and favorites. <strong>pgvector</strong> extension for semantic search (RAG) of Bible verses. Supabase Edge Functions for AI processing.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-sm text-slate-700 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" /> AI Stack
            </h4>
            <ul className="text-xs text-slate-500 space-y-2">
              <li className="flex items-start gap-2">
                <Zap className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                <span><strong>LLM:</strong> OpenAI GPT-4o-mini for reasoning and scriptural analysis.</span>
              </li>
              <li className="flex items-start gap-2">
                <Mic className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <span><strong>STT:</strong> OpenAI Whisper for high-accuracy voice commands.</span>
              </li>
              <li className="flex items-start gap-2">
                <Volume2 className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                <span><strong>TTS:</strong> ElevenLabs or OpenAI TTS for natural verse reading.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Build Guide */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter">Step-by-Step Guide</h3>
        </div>
        <div className="space-y-3">
          {[
            { step: '01', title: 'Data Ingestion', desc: 'Vectorize Bible verses using text-embedding-3-small and store in pgvector.' },
            { step: '02', title: 'RAG Implementation', desc: 'Setup Supabase Edge Function to query vector DB for relevant verses based on user prompt.' },
            { step: '03', title: 'Voice Pipeline', desc: 'Integrate Web MediaRecorder API to stream audio to Whisper API for transcription.' },
            { step: '04', title: 'Chat Orchestration', desc: 'Connect LLM with System Prompt: "You are a biblical scholar. Use provided scripture context."' },
            { step: '05', title: 'PWA Setup', desc: 'Implement Service Workers for offline scripture reading and local caching.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4">
              <div className="text-xs font-black text-purple-600 opacity-20 pt-1">{item.step}</div>
              <div>
                <h5 className="font-bold text-sm text-slate-800">{item.title}</h5>
                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MVP vs Full */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter">Roadmap: MVP to Scale</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
            <h4 className="font-bold text-xs text-purple-700 mb-2 uppercase tracking-wider">Phase 1: MVP</h4>
            <ul className="text-[10px] text-purple-900/70 space-y-1 list-disc pl-3">
              <li>Text-based AI Chat</li>
              <li>Single Bible Version</li>
              <li>Mood Recommendations</li>
              <li>Basic Auth</li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-xs text-indigo-700 mb-2 uppercase tracking-wider">Phase 2: Scale</h4>
            <ul className="text-[10px] text-indigo-900/70 space-y-1 list-disc pl-3">
              <li>Voice-to-Voice AI</li>
              <li>Multilingual Support</li>
              <li>Community Prayer Groups</li>
              <li>Subscription for Premium Voices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Database Schema */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tighter">Database Schema</h3>
        </div>
        <div className="p-4 bg-slate-900 rounded-2xl overflow-hidden shadow-inner">
          <pre className="text-[10px] text-purple-300 font-mono leading-relaxed">
{`-- SQL for Verse Embeddings
CREATE TABLE verses (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  book text,
  chapter int,
  verse int,
  content text,
  embedding vector(1536) -- For RAG
);

-- User Interactions
CREATE TABLE user_queries (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES auth.users,
  query text,
  mood text,
  created_at timestamptz
);`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default Guide;