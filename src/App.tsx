import { useState } from 'react';
import { DivinationForm } from './components/DivinationForm';
import { ResultCard } from './components/ResultCard';
import { calculateDivination, getLunarInfo, MANTRAS, type PredictionResult } from './lib/divination';
import { Compass } from 'lucide-react';

type AppState = {
  result: {
    result?: PredictionResult;
    lunarInfo: any;
    mantra?: string;
    isQuickCheck: boolean;
  } | null;
  error?: string;
};

function App() {
  const [state, setState] = useState<AppState>({ result: null });
  const [history, setHistory] = useState<Set<string>>(new Set());

  const handleDivination = (data: { date: Date; objectName: string; question: string; type: string }) => {
    const questionKey = `${data.question.trim().toLowerCase()}`;

    if (history.has(questionKey)) {
      alert("初筮告 再三渎 渎则不告 （同一件事只能问一次哦）");
      return;
    }

    const calculation = calculateDivination({
      date: data.date,
      objectName: data.objectName,
      questionType: data.type as any,
    });

    // Determine Mantra
    let mantra = undefined;
    if (calculation.result.type !== 'good') {
      if (data.type === 'health') {
        mantra = MANTRAS.health;
      } else if (data.type === 'mental') {
        mantra = MANTRAS.mental;
      } else if (calculation.result.type === 'bad') {
        // General bad luck can also suggest calming mantra if mental state is implied, 
        // but prompt specifically mentions Health and Mental.
        // We can optionally provide one if the result is very bad (Chi Kou/Kong Wang).
        // Let's stick to prompt: "If question is about health... If question is about mental..."
        // But also: "If answer is bad... give comfort."
        if (data.type === 'general') {
           // Maybe a generic comfort?
        }
      }
    }

    setHistory(prev => new Set(prev).add(questionKey));
    setState({
      result: {
        result: calculation.result,
        lunarInfo: calculation.lunarInfo,
        mantra,
        isQuickCheck: false,
      }
    });
  };

  const handleQuickCheck = (date: Date) => {
    const lunarInfo = getLunarInfo(date);
    setState({
      result: {
        lunarInfo,
        isQuickCheck: true,
      }
    });
  };

  return (
    <div className="min-h-screen bg-paper-yellow/10 p-4 md:p-8 relative">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-5" 
           style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' 
           }}>
      </div>

      <header className="text-center mb-12 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Compass className="w-10 h-10 text-chinese-red animate-spin-slow" />
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-ink-black tracking-wider">
            云端卦象
          </h1>
        </div>
        <p className="text-stone-600 font-serif italic">
          观象授时，顺天应人
        </p>
      </header>

      <main className="relative z-10">
        {!state.result && (
          <DivinationForm onSubmit={handleDivination} onQuickCheck={handleQuickCheck} />
        )}

        {state.result && (
          <div className="space-y-8">
            <ResultCard data={state.result} />
            <div className="text-center">
              <button 
                onClick={() => setState({ result: null })}
                className="text-chinese-red hover:text-red-700 underline font-serif underline-offset-4"
              >
                返回继续占卜
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-16 text-center text-stone-400 text-sm font-serif relative z-10 pb-4">
        <p>&copy; {new Date().getFullYear()} 在线梅花易数 · 小六壬</p>
      </footer>
    </div>
  );
}

export default App;
