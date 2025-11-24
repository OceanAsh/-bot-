import { type PredictionResult } from '../lib/divination';
import clsx from 'clsx';
import { ScrollText, Compass, BookOpen, ArrowRight } from 'lucide-react';

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
  
  const isDangerousDay = lunarInfo.zhiXing === '破' || lunarInfo.zhiXing === '危';

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-paper-yellow text-ink-black p-8 rounded-sm shadow-2xl ink-brush-border relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-chinese-red/80"></div>
        <div className="absolute bottom-0 right-0 w-full h-2 bg-chinese-red/80"></div>

        <div className="text-center mb-8 border-b-2 border-stone-300 pb-4">
          <h2 className="text-3xl font-bold font-serif text-chinese-red mb-2 flex items-center justify-center gap-2">
            {isQuickCheck ? <Compass className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
            {isQuickCheck ? '今日黄历' : '梅花易数'}
          </h2>
          <p className="text-stone-600 font-serif">{lunarInfo.lunarStr}</p>
        </div>

        {!isQuickCheck && result && (
          <div className="mb-8 space-y-8">
            
            {/* Hexagrams Display Grid */}
            <div className="relative grid md:grid-cols-2 gap-8">
              
              {/* Connector Arrow */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center justify-center pointer-events-none">
                <div className="bg-paper-yellow border border-stone-300 px-3 py-1 rounded-full shadow-md mb-2">
                    <span className="text-xs font-bold text-stone-500 whitespace-nowrap">演变趋势</span>
                </div>
                <div className="bg-white rounded-full p-2 border border-stone-300 text-chinese-red shadow-md">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              {/* Mobile Down Arrow */}
              <div className="md:hidden flex flex-col items-center justify-center py-2">
                 <span className="text-xs font-bold text-stone-400 mb-1">演变趋势</span>
                 <div className="bg-white rounded-full p-1 border border-stone-300 text-chinese-red shadow-sm">
                    <ArrowRight className="w-4 h-4 rotate-90" />
                 </div>
              </div>

              {/* Main Hexagram */}
              <div className="text-center bg-white/30 p-6 rounded border border-stone-200 relative">
                 <span className="absolute top-2 left-2 text-xs font-bold text-white bg-chinese-red px-2 py-1 rounded">当前 · 本卦</span>
                 <div className="text-7xl mb-4 text-chinese-red font-serif leading-none mt-4">{result.hexagram.symbol}</div>
                 <h3 className="text-3xl font-bold text-chinese-red mb-1">{result.hexagram.name}</h3>
                 <p className="text-sm text-stone-500 mb-3">{result.hexagram.nature}</p>
                 <div className="border-t border-stone-300/50 pt-3 mt-2">
                   <p className="text-lg font-bold text-stone-800 mb-2">“ {result.hexagram.judgment} ”</p>
                   <p className="text-stone-600 italic font-serif text-sm leading-relaxed">{result.hexagram.description}</p>
                 </div>
              </div>

              {/* Changed Hexagram */}
              <div className="text-center bg-stone-100/50 p-6 rounded border border-stone-200 relative">
                 <span className="absolute top-2 left-2 text-xs font-bold text-stone-600 bg-stone-200 px-2 py-1 rounded">未来 · 变卦</span>
                 <div className="text-7xl mb-4 text-stone-700 font-serif leading-none mt-4 opacity-80">{result.changedHexagram.symbol}</div>
                 <h3 className="text-3xl font-bold text-stone-700 mb-1">{result.changedHexagram.name}</h3>
                 <p className="text-sm text-stone-500 mb-3">{result.changedHexagram.nature}</p>
                 <div className="border-t border-stone-300/50 pt-3 mt-2">
                   <p className="text-lg font-bold text-stone-700 mb-2">“ {result.changedHexagram.judgment} ”</p>
                   <p className="text-stone-600 italic font-serif text-sm leading-relaxed">{result.changedHexagram.description}</p>
                 </div>
              </div>

            </div>

            {/* Evolution Analysis */}
            <div className="bg-stone-50 p-4 rounded border border-stone-200 text-center">
               <h4 className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">演变分析</h4>
               <p className="text-stone-800 font-serif text-base">
                 从 <span className="font-bold text-chinese-red">{result.hexagram.name}</span> 演变为 <span className="font-bold text-stone-700">{result.changedHexagram.name}</span>。
               </p>
               <p className="text-stone-600 font-serif text-sm mt-2">
                 {result.analysis.comprehensive.includes('动爻在第1爻') || result.analysis.comprehensive.includes('动爻在第2爻') || result.analysis.comprehensive.includes('动爻在第3爻')
                   ? "变化源于事物的基础或内部阶段。这意味着局势的根本或初期因素发生了改变，从而推动了整个事态的发展。"
                   : "变化源于事物的上层或外部环境。这意味着外部条件或最终阶段的因素发生了改变，从而引发了新的走向。"
                 }
               </p>
            </div>

            {/* Detailed Analysis */}
            {result.analysis && (
              <div className="space-y-6 font-serif">
                
                {/* Section 1: Analysis */}
                <div className="bg-white/60 p-5 rounded border-l-4 border-chinese-red shadow-sm">
                  <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-chinese-red">
                    <ScrollText className="w-5 h-5" /> 
                    🌿 起卦分析
                  </h4>
                  <div className="space-y-2 text-stone-800 text-sm leading-relaxed">
                    <p><span className="font-bold text-stone-600">时间流转：</span>{result.analysis.timeAnalysis}</p>
                    <p><span className="font-bold text-stone-600">物象寓意：</span>{result.analysis.objectAnalysis}</p>
                  </div>
                </div>

                {/* Section 2: Detailed Meaning */}
                <div className="bg-stone-100/80 p-5 rounded border border-stone-200">
                   <h4 className="font-bold text-md mb-3 text-stone-700 border-b border-stone-300 pb-1">📖 卦义详解</h4>
                   <p className="text-stone-800 leading-relaxed whitespace-pre-line mb-4">
                     {result.analysis.hexagramAnalysis.meaning}
                   </p>
                   
                   {/* Main Hexagram Details */}
                   <div className="mb-8">
                     <h5 className="font-bold text-chinese-red text-sm mb-3 border-b border-chinese-red/20 pb-1 inline-block">当前：{result.analysis.hexagramAnalysis.name}</h5>
                     
                     {result.analysis.hexagramAnalysis.shaoYong && (
                       <div className="mb-4 bg-white p-3 rounded border border-stone-200">
                         <h6 className="font-bold text-stone-500 text-xs mb-1">【邵雍解】</h6>
                         <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                           {result.analysis.hexagramAnalysis.shaoYong}
                         </p>
                       </div>
                     )}

                     {result.analysis.hexagramAnalysis.traditional && (
                       <div className="mb-4 bg-white p-3 rounded border border-stone-200">
                         <h6 className="font-bold text-stone-500 text-xs mb-1">【传统解】</h6>
                         <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                           {result.analysis.hexagramAnalysis.traditional}
                         </p>
                       </div>
                     )}
                   </div>

                   {/* Changed Hexagram Details */}
                   <div className="mb-4">
                     <h5 className="font-bold text-stone-600 text-sm mb-3 border-b border-stone-300 pb-1 inline-block">未来：{result.changedHexagram.name}</h5>
                     
                     {result.analysis.changedHexagram.shaoYong && (
                       <div className="mb-4 bg-white p-3 rounded border border-stone-200">
                         <h6 className="font-bold text-stone-500 text-xs mb-1">【邵雍解】</h6>
                         <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                           {result.analysis.changedHexagram.shaoYong}
                         </p>
                       </div>
                     )}

                     {result.analysis.changedHexagram.traditional && (
                       <div className="mb-4 bg-white p-3 rounded border border-stone-200">
                         <h6 className="font-bold text-stone-500 text-xs mb-1">【传统解】</h6>
                         <p className="text-stone-800 text-sm leading-relaxed whitespace-pre-line">
                           {result.analysis.changedHexagram.traditional}
                         </p>
                       </div>
                     )}
                   </div>

                   <div className="mt-4 pt-4 border-t border-stone-200">
                      <h5 className="font-bold text-stone-600 text-sm mb-2">💡 变爻提示</h5>
                      <p className="text-stone-800 leading-relaxed whitespace-pre-line">
                        {result.analysis.comprehensive}
                      </p>
                   </div>
                </div>

              </div>
            )}

            {mantra && (
              <div className="bg-stone-200 text-stone-800 p-4 rounded text-center border border-stone-300">
                 <p className="text-xs text-stone-500 mb-2">心有不安时，可默念此咒</p>
                 <p className="font-bold font-serif tracking-widest">{mantra}</p>
              </div>
            )}
          </div>
        )}

        <div className={clsx("bg-stone-50 p-6 rounded border border-stone-200 text-sm", isQuickCheck ? "mt-0" : "mt-8")}>
          <h4 className="font-bold text-base text-center mb-4 font-serif text-stone-500 uppercase tracking-widest">
            黄历参考
          </h4>
          
          <div className="grid grid-cols-2 gap-4 text-center font-serif">
            <div className="p-2 border-r border-stone-200">
              <span className="block text-stone-400 text-xs mb-1">值神</span>
              <span className={clsx("text-xl font-bold", isDangerousDay ? "text-chinese-red" : "text-stone-800")}>
                {lunarInfo.zhiXing}
              </span>
              {isDangerousDay && (
                <span className="block text-xs text-red-600 mt-1 font-bold">
                  (诸事小心)
                </span>
              )}
            </div>
            
            <div className="p-2">
              <span className="block text-stone-400 text-xs mb-1">冲煞</span>
              <span className="text-md font-bold text-stone-800">{lunarInfo.chong}</span>
              <span className="block text-xs text-stone-500 mt-1">{lunarInfo.sha}</span>
            </div>

            <div className="col-span-2 grid grid-cols-1 gap-3 mt-2 border-t border-stone-100 pt-3">
               <div className="text-left px-2">
                 <span className="inline-block text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded mr-2 mb-1">宜</span>
                 <span className="text-stone-600 text-sm leading-relaxed">{lunarInfo.yi.join(' ')}</span>
               </div>
               <div className="text-left px-2">
                 <span className="inline-block text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded mr-2 mb-1">忌</span>
                 <span className="text-stone-600 text-sm leading-relaxed">{lunarInfo.ji.join(' ')}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-stone-300 text-[10px] font-serif">
          初筮告 再三渎 渎则不告 | 命运掌控在自己手中
        </div>
      </div>
    </div>
  );
}
