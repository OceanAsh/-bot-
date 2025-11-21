import { type PredictionResult } from '../lib/divination';
import clsx from 'clsx';

interface ResultCardProps {
  data: {
    index?: number;
    result?: PredictionResult;
    lunarInfo: {
      lunarStr: string;
      zhiXing: string;
      chong: string;
      sha: string;
      yi: string[];
      ji: string[];
    };
    mantra?: string;
    isQuickCheck?: boolean;
  };
}

export function ResultCard({ data }: ResultCardProps) {
  const { result, lunarInfo, mantra, isQuickCheck } = data;
  
  // Check for Po/Wei days
  const isDangerousDay = lunarInfo.zhiXing === '破' || lunarInfo.zhiXing === '危';

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-paper-yellow text-ink-black p-8 rounded-sm shadow-2xl ink-brush-border relative overflow-hidden">
        {/* Background pattern or watermark could go here */}
        <div className="absolute top-0 left-0 w-full h-2 bg-chinese-red/80"></div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-chinese-red/80"></div>

        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-stone-300 pb-4">
          <h2 className="text-3xl font-bold font-serif text-chinese-red mb-2">
            {isQuickCheck ? '今日黄历' : '占卜结果'}
          </h2>
          <p className="text-stone-600 font-serif">{lunarInfo.lunarStr}</p>
        </div>

        {/* Divination Content */}
        {!isQuickCheck && result && (
          <div className="mb-8 space-y-6">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4 text-chinese-red">{result.title}</h3>
              <div className="bg-white/40 p-6 rounded border border-stone-300 italic text-lg leading-relaxed font-serif">
                {result.poem.split('，').map((line, i) => (
                  <p key={i} className="mb-1">{line}，</p>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-lg border-l-4 border-chinese-red pl-2 mb-2">卦辞解析</h4>
                <p className="text-stone-800 leading-relaxed">{result.description}</p>
              </div>
              
              <div>
                <h4 className="font-bold text-lg border-l-4 border-chinese-red pl-2 mb-2">指引建议</h4>
                <p className="text-stone-800 leading-relaxed">{result.suggestion}</p>
              </div>
            </div>

            {mantra && (
              <div className="bg-stone-800 text-paper-yellow p-6 rounded mt-6">
                <h4 className="font-bold text-gold-accent mb-3 flex items-center gap-2">
                  <span>✨</span> 
                  {result.type === 'bad' ? '静心化解' : '祈福心咒'}
                </h4>
                <p className="text-lg text-center font-serif tracking-widest leading-loose">
                  {mantra}
                </p>
                <p className="text-xs text-stone-400 text-center mt-4">
                  * 请在心中默念此咒 *
                </p>
              </div>
            )}
          </div>
        )}

        {/* Huangli Info */}
        <div className={clsx("bg-stone-100/50 p-6 rounded border border-stone-200", isQuickCheck ? "mt-0" : "mt-8")}>
          <h4 className="font-bold text-xl text-center mb-4 font-serif text-chinese-red">
            黄历信息
          </h4>
          
          <div className="grid grid-cols-2 gap-4 text-center font-serif">
            <div className="p-2">
              <span className="block text-stone-500 text-sm">值神 (建除十二神)</span>
              <span className={clsx("text-2xl font-bold", isDangerousDay ? "text-chinese-red" : "text-stone-800")}>
                {lunarInfo.zhiXing}
              </span>
              {isDangerousDay && (
                <span className="block text-xs text-red-600 mt-1 font-bold animate-pulse">
                  (今日值日凶险，诸事小心)
                </span>
              )}
            </div>
            
            <div className="p-2">
              <span className="block text-stone-500 text-sm">冲煞</span>
              <span className="text-lg font-bold text-stone-800">{lunarInfo.chong}</span>
              <span className="block text-xs text-stone-600">{lunarInfo.sha}</span>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4 mt-2 border-t border-stone-200 pt-4">
               <div className="text-green-800">
                 <span className="text-xs font-bold border border-green-800 px-1 rounded mr-2">宜</span>
                 <span className="text-sm">{lunarInfo.yi.slice(0, 4).join(' ')}...</span>
               </div>
               <div className="text-red-800">
                 <span className="text-xs font-bold border border-red-800 px-1 rounded mr-2">忌</span>
                 <span className="text-sm">{lunarInfo.ji.slice(0, 4).join(' ')}...</span>
               </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-stone-400 text-xs font-serif">
          初筮告 再三渎 渎则不告 | 命运掌控在自己手中
        </div>
      </div>
    </div>
  );
}
