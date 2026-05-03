# Plan: AI Bible Verse App (Lumina Scripture)

## 1. System Architecture
- **Frontend**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**:
  - OpenAI GPT-4o for verse recommendations and scripture-based chat
  - OpenAI Whisper (STT) for voice input
  - OpenAI TTS for audio responses
- **Backend (Mocked for Demo)**: Local state + service layers
- **State Management**: React Hooks (useState, useEffect)

## 2. Database Structure (Conceptual)
- **Users Table**: `id`, `email`, `created_at`, `notification_settings`
- **History Table**: `id`, `user_id`, `input_text`, `ai_response`, `verse_refs`, `created_at`
- **Favorites Table**: `id`, `user_id`, `verse_text`, `reference`, `saved_at`
- **Devotionals Table**: `id`, `date`, `title`, `content`, `main_verse`

## 3. UI/UX Strategy (UI-UX-Pro-Max)
- **Style**: Minimalism + Neumorphism (Soft UI)
- **Palette**: `Spiritual/Calm` - Cream (#FDFBF7), Deep Indigo (#1E1B4B), Gold (#D4AF37)
- **Typography**: Inter (Body) + Playfair Display (Headers)
- **Interactions**: Smooth transitions between tabs, pulsing voice recording indicator

## 4. Build Steps
1. **Core Layout**: Create responsive shell with bottom navigation (Home, Chat, Favorites, Settings).
2. **AI Service Layer**: Implement mock logic for OpenAI calls (simulating recommendations and chat).
3. **Home Dashboard**: 
   - Daily Devotional card
   - Mood-based verse picker (Quick selections like "Anxious", "Grateful", "Lost")
4. **Chat Interface**:
   - Scrollable chat history
   - Scripture-focused prompt engineering
   - Voice-to-text input simulation
5. **Audio Player**: Component to "read" verses aloud using the browser's SpeechSynthesis API.
6. **Polishing**: Add Framer Motion entrance animations and Sonner notifications.

## 5. MVP vs Full Version
- **MVP**: Browser-based React app, simulated AI responses, Browser Speech API, LocalStorage for favorites.
- **Full Version**: React Native mobile app, real Supabase backend, ElevenLabs high-quality voices, multi-language support, community groups.
