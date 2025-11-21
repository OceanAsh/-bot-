import { Lunar } from 'lunar-javascript';
import { HEXAGRAM_MAP, type HexagramData } from './iching';
import { HEXAGRAM_DETAILS } from './iching-details';

export type PredictionResult = {
  hexagram: HexagramData;
  changedHexagram: HexagramData;
  type: 'good' | 'bad' | 'neutral'; 
  // Removed 'suggestion' field as per instructions
  analysis: {
    timeAnalysis: string;
    objectAnalysis: string;
    hexagramAnalysis: {
      name: string;
      nature: string;
      meaning: string;
      description: string;
      shaoYong?: string;
      traditional?: string;
    };
    // Updated structure to hold actual changed hexagram details
    changedHexagram: {
      name: string;
      meaning: string;
      description: string;
      shaoYong?: string;
      traditional?: string;
    };
    comprehensive: string;
  };
};

export type DivinationContext = {
  date: Date;
  objectName: string;
  questionType: 'general' | 'health' | 'mental' | 'career' | 'love';
};

// --- Five Elements & Bagua Helpers ---

const BAGUA_MAP: Record<number, { name: string; element: string; nature: string; meaning: string }> = {
  1: { name: '乾', element: '金', nature: '天', meaning: '刚健、创始' },
  2: { name: '兑', element: '金', nature: '泽', meaning: '喜悦、沟通' },
  3: { name: '离', element: '火', nature: '火', meaning: '光明、依附' },
  4: { name: '震', element: '木', nature: '雷', meaning: '震动、奋起' },
  5: { name: '巽', element: '木', nature: '风', meaning: '柔顺、进入' },
  6: { name: '坎', element: '水', nature: '水', meaning: '险陷、智慧' },
  7: { name: '艮', element: '土', nature: '山', meaning: '静止、阻碍' },
  8: { name: '坤', element: '土', nature: '地', meaning: '柔顺、包容' },
};

const ELEMENT_ATTRS: Record<string, string> = {
  '金': '坚硬、肃杀、变革',
  '木': '生长、仁慈、直爽',
  '水': '流动、智慧、润下',
  '火': '炎上、礼仪、急进',
  '土': '厚重、诚信、承载',
};

const OBJECT_TRIGRAM_KEYWORDS: Array<{ keywords: string[]; trigram: number; element: string }> = [
  { keywords: ['天', '父', '龙', '圆', '金属', '阳光'], trigram: 1, element: '金' }, // Qian
  { keywords: ['泽', '悦', '口', '笑', '少女', '银'], trigram: 2, element: '金' },    // Dui
  { keywords: ['火', '日', '电', '灯', '红', '心'], trigram: 3, element: '火' },      // Li
  { keywords: ['雷', '木', '鼓', '车', '足', '动'], trigram: 4, element: '木' },      // Zhen
  { keywords: ['风', '入', '绳', '长', '竹', '麻'], trigram: 5, element: '木' },      // Xun
  { keywords: ['水', '雨', '月', '黑', '耳', '半杯水', '杯水', '水杯'], trigram: 6, element: '水' }, // Kan
  { keywords: ['山', '石', '门', '手', '止', '重'], trigram: 7, element: '土' },     // Gen
  { keywords: ['地', '田', '母', '布', '众', '黄'], trigram: 8, element: '土' }       // Kun
];

function getObjectTrigram(name: string): { trigram: number; element: string } {
  const lowerName = name.toLowerCase();
  for (const entry of OBJECT_TRIGRAM_KEYWORDS) {
    if (entry.keywords.some(keyword => lowerName.includes(keyword.toLowerCase()))) {
      return { trigram: entry.trigram, element: entry.element };
    }
  }
  // Fallback based on length
  const len = name.length || 1;
  const trigram = len % 8 === 0 ? 8 : len % 8;
  const fallbackElement = BAGUA_MAP[trigram].element;
  return { trigram, element: fallbackElement };
}

// Helper to get Hexagram Data
function getHexagram(upper: number, lower: number): HexagramData {
  const up = upper === 0 ? 8 : upper;
  const low = lower === 0 ? 8 : lower;
  return HEXAGRAM_MAP[`${up}-${low}`] || {
    name: "未知", symbol: "??", nature: "未知", description: "暂无详解", judgment: "无"
  };
}

function determineType(hex: HexagramData): 'good' | 'bad' | 'neutral' {
  if (hex.description.includes("凶") || hex.description.includes("险") || hex.description.includes("闭塞")) return 'bad';
  if (hex.description.includes("吉") || hex.description.includes("亨") || hex.description.includes("成")) return 'good';
  return 'neutral';
}

// Helper to calculate changed trigram
// Based on King Wen sequence mapping (approximate for Mei Hua)
// 1:Qian (111), 2:Dui (011), 3:Li (101), 4:Zhen (001)
// 5:Xun (110), 6:Kan (010), 7:Gen (100), 8:Kun (000)
// Note: Mei Hua maps 1-8 to Bagua. We need a way to flip lines.
// Let's define a toggle map for each position (1, 2, 3 from bottom)
// Trigram Map: 1=Qian, 2=Dui, 3=Li, 4=Zhen, 5=Xun, 6=Kan, 7=Gen, 8=Kun
// Below map derived from binary structure:
// 1(111) <-> 5(110) [Top line flip] ? No, strict binary is simpler.
// Let's use a hardcoded flip table for reliability.
// Key: "TrigramIndex-LinePosition(1/2/3)" -> NewTrigramIndex
const TRIGRAM_CHANGE_MAP: Record<string, number> = {
  // Change Line 1 (Bottom)
  "1-1": 5, "2-1": 6, "3-1": 7, "4-1": 8, "5-1": 1, "6-1": 2, "7-1": 3, "8-1": 4,
  
  // Change Line 2 (Middle)
  "1-2": 3, "2-2": 4, "3-2": 1, "4-2": 2, "5-2": 7, "6-2": 8, "7-2": 5, "8-2": 6,

  // Change Line 3 (Top)
  "1-3": 2, "2-3": 1, "3-3": 4, "4-3": 3, "5-3": 6, "6-3": 5, "7-3": 8, "8-3": 7
};

function getChangedTrigram(original: number, linePosition: 1 | 2 | 3): number {
  const key = `${original}-${linePosition}`;
  return TRIGRAM_CHANGE_MAP[key] || original;
}


function generateHexagramAnalysis(
  upper: number, 
  lower: number, 
  changeLine: number, 
  objectName: string, 
  questionType: string
): PredictionResult['analysis'] & { changedHexagramFull: HexagramData } {
  // Ensure 1-8 range
  const up = upper === 0 ? 8 : upper;
  const low = lower === 0 ? 8 : lower;
  
  const upperGua = BAGUA_MAP[up];
  const lowerGua = BAGUA_MAP[low];
  
  // Change line logic
  // Moving Line: 1-6.
  // 1, 2, 3 -> Lower Trigram change (Line 1, 2, 3 of Lower)
  // 4, 5, 6 -> Upper Trigram change (Line 1, 2, 3 of Upper -> i.e. 4-3=1, 5-3=2, 6-3=3 relative to trigram)
  
  const movingYao = changeLine === 0 ? 6 : changeLine;
  
  let changedUpper = up;
  let changedLower = low;
  
  if (movingYao <= 3) {
    // Change Lower
    changedLower = getChangedTrigram(low, movingYao as 1|2|3);
  } else {
    // Change Upper
    changedUpper = getChangedTrigram(up, (movingYao - 3) as 1|2|3);
  }

  const mainHex = getHexagram(up, low);
  const changedHex = getHexagram(changedUpper, changedLower);

  const mainDetails = HEXAGRAM_DETAILS[`${up}-${low}`] || { shaoYong: "", traditional: "" };
  const changedDetails = HEXAGRAM_DETAILS[`${changedUpper}-${changedLower}`] || { shaoYong: "", traditional: "" };

  // Generate Narrative
  const element = BAGUA_MAP[upper].element;
  const timeElement = BAGUA_MAP[lower].element;
  const timeAnalysis = `上卦取象自物：「${objectName}」呈现${BAGUA_MAP[upper].name}之象 (${element})；下卦取象自时：${BAGUA_MAP[lower].name} (${timeElement})。`;
  const objectAnalysis = `物象代表${element}之性，时间带出${timeElement}之势，二者交汇成「${BAGUA_MAP[upper].name}${BAGUA_MAP[lower].name}」卦。`;
  
  const meaning = `本卦为${mainHex.name} (${mainHex.nature})。${upperGua.name}上${lowerGua.name}下。
  ${upperGua.name}为${upperGua.nature}，${lowerGua.name}为${lowerGua.nature}。`;

  const description = `此卦象显示，${questionType === 'career' ? '事业' : questionType === 'love' ? '感情' : '当前处境'}正处于"${mainHex.name}"的状态。
  ${mainHex.description}`;

  const comprehensive = `综合判断：
  1. 卦名【${mainHex.name}】，${mainHex.nature}。
  2. 核心要义：${mainHex.description}
  3. 结合"${objectName}"的${element}性，建议保持${element === '火' ? '热情但勿急躁' : element === '水' ? '灵动且顺势' : element === '木' ? '仁爱且向上' : element === '金' ? '果断且刚毅' : '稳重且包容'}的态度。
  4. 动爻在第${movingYao}爻，提示${movingYao <= 3 ? '基础或内部' : '高层或外部'}将发生变化，卦象演变为【${changedHex.name}】。`;

  return {
    timeAnalysis,
    objectAnalysis,
    hexagramAnalysis: {
      name: `${mainHex.name}卦`,
      nature: mainHex.nature,
      meaning,
      description,
      shaoYong: mainDetails.shaoYong,
      traditional: mainDetails.traditional
    },
    changedHexagram: {
      name: changedHex.name,
      meaning: `动爻在第${movingYao}爻`,
      description: changedHex.description,
      shaoYong: changedDetails.shaoYong,
      traditional: changedDetails.traditional
    },
    comprehensive,
    changedHexagramFull: changedHex
  };
}

export function getLunarInfo(date: Date) {
  const lunar = Lunar.fromDate(date);
  return {
    month: lunar.getMonth(),
    day: lunar.getDay(),
    hour: date.getHours(),
    lunarStr: lunar.toString(),
    zhiXing: lunar.getZhiXing(), 
    chong: lunar.getDayChongDesc(), 
    sha: lunar.getDaySha(), 
    yi: lunar.getDayYi(),
    ji: lunar.getDayJi(),
  };
}

export function calculateDivination(ctx: DivinationContext) {
  const lunar = Lunar.fromDate(ctx.date);
  const hour = lunar.getTimeZhiIndex() + 1; // 1-12

  // --- Mei Hua Yi Shu Logic (Object + Time) ---
  const objectInfo = getObjectTrigram(ctx.objectName);
  const up = objectInfo.trigram;

  // Map hour to trigram (1-12 -> 1-8 loop)
  let low = hour % 8;
  if (low === 0) low = 8;
  
  // Moving Yao: (Upper + Lower + Hour) % 6
  let changeLine = (up + low + hour) % 6;
  if (changeLine === 0) changeLine = 6;

  // Get Hexagram Data
  const mainHex = getHexagram(up, low);

  // Determine Type
  const type = determineType(mainHex);

  const analysis = generateHexagramAnalysis(up, low, changeLine, ctx.objectName, ctx.questionType);

  return {
    index: 0, // No longer used for lookup
    result: {
      hexagram: mainHex,
      changedHexagram: analysis.changedHexagramFull,
      type,
      analysis
    },
    lunarInfo: getLunarInfo(ctx.date),
  };
}

export const MANTRAS = {
  health: `灵宝天尊，安慰身形。弟子魂魄，五脏玄冥。青龙白虎，队仗纷纭。朱雀玄武，侍卫身形。`,
  mental: `太上台星，应变无停。驱邪缚魅，保命护身。智慧明净，心神安宁。三魂永久，魄无丧倾。`,
};

export const DISCLAIMER = "占卜结果仅供参考，命运掌控在自己手中。";
