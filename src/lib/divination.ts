import { Lunar } from 'lunar-javascript';

export type PredictionResult = {
  title: string;
  description: string;
  poem: string;
  type: 'good' | 'bad' | 'neutral';
  suggestion: string;
};

export type DivinationContext = {
  date: Date;
  objectName: string;
  questionType: 'general' | 'health' | 'mental' | 'career' | 'love';
};

export const PREDICTIONS: Record<number, PredictionResult> = {
  1: {
    title: '大安 (Da An)',
    description: '大安事事昌，求财在坤方。失物去不远，宅舍保安康。',
    poem: '身不动时，五行属木，颜色青龙，方位正东。',
    type: 'good',
    suggestion: '万事大吉，心想事成。目前状态稳定，适合静守或按计划行事。',
  },
  2: {
    title: '留连 (Liu Lian)',
    description: '留连事难成，求谋日未明。官事只宜缓，去者未回程。',
    poem: '卒未归时，五行属水，颜色玄武，方位北方。',
    type: 'neutral',
    suggestion: '事情可能会有拖延，需要耐心等待，不宜急进。',
  },
  3: {
    title: '速喜 (Su Xi)',
    description: '速喜喜来临，求财向南行。失物申未午，逢人路上寻。',
    poem: '人即至时，五行属火，颜色朱雀，方位南方。',
    type: 'good',
    suggestion: '好消息马上就会到来，事情进展迅速，会有惊喜。',
  },
  4: {
    title: '赤口 (Chi Kou)',
    description: '赤口主口舌，官非切要防。失物速速讨，行人有惊慌。',
    poem: '官事凶时，五行属金，颜色白虎，方位西方。',
    type: 'bad',
    suggestion: '近期气场稍显驳杂，可能会遇到一些意见分歧。请保持平和的心态，以柔克刚，退一步海阔天空，一切自会化解。',
  },
  5: {
    title: '小吉 (Xiao Ji)',
    description: '小吉最吉昌，路上好商量。阴人来报喜，失物在坤方。',
    poem: '人来喜时，五行属木，颜色六合，方位东方。',
    type: 'good',
    suggestion: '会有小确幸，事情发展顺利，有贵人相助。',
  },
  0: { // 6 maps to 0 in modulo
    title: '空亡 (Kong Wang)',
    description: '空亡事不长，阴人小乖张。求财无利益，行人有灾殃。',
    poem: '音信稀时，五行属土，颜色勾陈，方位中央。',
    type: 'bad',
    suggestion: '时机似乎尚未成熟，当下的困惑是黎明前的等待。与其强求结果，不如养精蓄锐，静待花开。',
  },
};

export function getLunarInfo(date: Date) {
  const lunar = Lunar.fromDate(date);
  return {
    month: lunar.getMonth(),
    day: lunar.getDay(),
    hour: date.getHours(),
    lunarStr: lunar.toString(),
    zhiXing: lunar.getZhiXing(), // Day Officer (Jian, Chu, etc.)
    chong: lunar.getDayChongDesc(), // Clash
    sha: lunar.getDaySha(), // Sha
    yi: lunar.getDayYi(),
    ji: lunar.getDayJi(),
  };
}

export function calculateDivination(ctx: DivinationContext) {
  const lunar = Lunar.fromDate(ctx.date);
  const month = lunar.getMonth();
  const day = lunar.getDay();
  
  // Map hour 0-23 to 1-12 (Zi to Hai)
  // 23-1 -> 1 (Zi), 1-3 -> 2 (Chou)...
  const hourIndex = Math.floor((ctx.date.getHours() + 1) / 2) % 12 + 1;
  
  // Object length adds entropy
  const objectEntropy = ctx.objectName.trim().length;

  // Xiao Liu Ren Formula: (Month + Day + Hour - 2) % 6
  // We add objectEntropy as an additional step/modifier
  let resultIndex = (month + day + hourIndex + objectEntropy - 2) % 6;
  
  // Adjust mapping: if result is 0, it's Kong Wang (6). 
  // But our map uses 0 for Kong Wang for convenience with modulo.
  // Standard sequence: 1 DaAn, 2 LiuLian, 3 SuXi, 4 ChiKou, 5 XiaoJi, 0(6) KongWang.
  
  const prediction = PREDICTIONS[resultIndex];
  
  return {
    index: resultIndex,
    result: prediction,
    lunarInfo: getLunarInfo(ctx.date),
  };
}

export const MANTRAS = {
  health: `灵宝天尊，安慰身形。弟子魂魄，五脏玄冥。青龙白虎，队仗纷纭。朱雀玄武，侍卫身形。`,
  mental: `太上台星，应变无停。驱邪缚魅，保命护身。智慧明净，心神安宁。三魂永久，魄无丧倾。`,
};

export const DISCLAIMER = "占卜结果仅供参考，命运掌控在自己手中。";
