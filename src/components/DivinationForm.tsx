import React, { useState } from 'react';
import { Calendar, Search, Clock, Sparkles } from 'lucide-react';

interface DivinationFormProps {
  onSubmit: (data: { date: Date; objectName: string; question: string; type: 'general' | 'health' | 'mental' | 'career' | 'love' }) => void;
  onQuickCheck: (date: Date) => void;
}

export function DivinationForm({ onSubmit, onQuickCheck }: DivinationFormProps) {
  const [dateStr, setDateStr] = useState(() => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  });
  const [objectName, setObjectName] = useState('');
  const [question, setQuestion] = useState('');
  const [type, setType] = useState<'general' | 'health' | 'mental' | 'career' | 'love'>('general');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objectName.trim() || !question.trim()) return;
    onSubmit({
      date: new Date(dateStr),
      objectName,
      question,
      type
    });
  };

  const handleQuickCheck = () => {
    const d = new Date(dateStr);
    // Check if date is today (warn if not? Prompt says "Ask user to input TODAY's date")
    // Actually the prompt says "Prompt user to input today's date", but checking equality is good UX.
    // We'll just pass the date.
    onQuickCheck(d);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-paper-yellow/20 p-6 rounded-lg border-2 border-transparent hover:border-chinese-red/30 transition-all duration-500">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-chinese-red font-bold text-lg">
            <Clock className="w-5 h-5" />
            <span>当前时间</span>
          </label>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="w-full p-3 rounded bg-white/80 border border-stone-300 focus:border-chinese-red focus:ring-1 focus:ring-chinese-red outline-none font-serif"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-chinese-red font-bold text-lg">
            <Search className="w-5 h-5" />
            <span>所见所闻</span>
          </label>
          <input
            type="text"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            placeholder="描述身边最先注意到的物品或者是听到的声音..."
            className="w-full p-3 rounded bg-white/80 border border-stone-300 focus:border-chinese-red focus:ring-1 focus:ring-chinese-red outline-none font-serif placeholder:text-stone-400"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-chinese-red font-bold text-lg">
            <Sparkles className="w-5 h-5" />
            <span>心中所惑</span>
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="请诚心写下你的问题..."
            rows={3}
            className="w-full p-3 rounded bg-white/80 border border-stone-300 focus:border-chinese-red focus:ring-1 focus:ring-chinese-red outline-none font-serif placeholder:text-stone-400 resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-stone-600 font-serif text-sm mb-1">问题类型 (用于指引)</label>
          <div className="flex flex-wrap gap-2">
            {(['general', 'health', 'mental', 'career', 'love'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-4 py-1 rounded-full text-sm font-serif transition-colors ${
                  type === t 
                    ? 'bg-chinese-red text-paper-yellow' 
                    : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                }`}
              >
                {t === 'general' && '一般'}
                {t === 'health' && '健康'}
                {t === 'mental' && '心理/烦躁'}
                {t === 'career' && '事业'}
                {t === 'love' && '姻缘'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={!objectName || !question}
            className="flex-1 bg-chinese-red text-paper-yellow font-serif font-bold py-3 px-6 rounded shadow-lg hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            开始占卜
          </button>
          <button
            type="button"
            onClick={handleQuickCheck}
            className="flex-1 bg-stone-800 text-paper-yellow font-serif font-bold py-3 px-6 rounded shadow-lg hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            今日运势
          </button>
        </div>
      </form>
    </div>
  );
}

