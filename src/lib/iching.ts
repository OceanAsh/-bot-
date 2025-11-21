// 64 Hexagrams Lookup Table
// Key: "Upper-Lower" (1-8)
// 1: Qian (Heaven), 2: Dui (Lake), 3: Li (Fire), 4: Zhen (Thunder)
// 5: Xun (Wind), 6: Kan (Water), 7: Gen (Mountain), 8: Kun (Earth)

export type HexagramData = {
  name: string;
  symbol: string;
  nature: string; // e.g. 天地否
  description: string;
  judgment: string; // 卦辞
};

export const HEXAGRAM_MAP: Record<string, HexagramData> = {
  "1-1": { name: "乾", symbol: "䷀", nature: "乾为天", description: "刚健中正，自强不息。", judgment: "元，亨，利，贞。" },
  "8-8": { name: "坤", symbol: "䷁", nature: "坤为地", description: "厚德载物，柔顺伸展。", judgment: "元，亨，利牝马之贞。" },
  "6-4": { name: "屯", symbol: "䷂", nature: "水雷屯", description: "万物始生，艰难险阻。", judgment: "元，亨，利，贞。勿用有攸往，利建侯。" },
  "7-6": { name: "蒙", symbol: "䷃", nature: "山水蒙", description: "启蒙发智，去愚存明。", judgment: "亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。" },
  "6-1": { name: "需", symbol: "䷄", nature: "水天需", description: "守正待机，饮食宴乐。", judgment: "有孚，光亨，贞吉。利涉大川。" },
  "1-6": { name: "讼", symbol: "䷅", nature: "天水讼", description: "慎争戒讼，止讼为贵。", judgment: "有孚，窒。惕中吉。终凶。利见大人，不利涉大川。" },
  "8-6": { name: "师", symbol: "䷆", nature: "地水师", description: "兴师动众，统领大众。", judgment: "贞，丈人，吉无咎。" },
  "6-8": { name: "比", symbol: "䷇", nature: "水地比", description: "亲密比辅，和睦相处。", judgment: "吉。原筮元永贞，无咎。不宁方来，后夫凶。" },
  "5-1": { name: "小畜", symbol: "䷈", nature: "风天小畜", description: "积蓄力量，蓄养待进。", judgment: "亨。密云不雨，自我西郊。" },
  "1-2": { name: "履", symbol: "䷉", nature: "天泽履", description: "脚踏实地，如履薄冰。", judgment: "履虎尾，不咥人，亨。" },
  "8-1": { name: "泰", symbol: "䷊", nature: "地天泰", description: "阴阳交泰，通达吉祥。", judgment: "小往大来，吉亨。" },
  "1-8": { name: "否", symbol: "䷋", nature: "天地否", description: "阴阳不交，闭塞不通。", judgment: "否之匪人，不利君子贞，大往小来。" },
  "1-3": { name: "同人", symbol: "䷌", nature: "天火同人", description: "上下和同，与人同心。", judgment: "同人于野，亨。利涉大川，利君子贞。" },
  "3-1": { name: "大有", symbol: "䷍", nature: "火天大有", description: "顺天依时，大有所成。", judgment: "元亨。" },
  "8-7": { name: "谦", symbol: "䷎", nature: "地山谦", description: "内高外低，谦虚受益。", judgment: "亨，君子有终。" },
  "4-8": { name: "豫", symbol: "䷏", nature: "雷地豫", description: "顺时依势，安乐喜悦。", judgment: "利建侯行师。" },
  "2-4": { name: "随", symbol: "䷐", nature: "泽雷随", description: "顺从随和，随机应变。", judgment: "元亨利贞，无咎。" },
  "7-5": { name: "蛊", symbol: "䷑", nature: "山风蛊", description: "整饬内部，除弊治乱。", judgment: "元亨，利涉大川。先甲三日，后甲三日。" },
  "8-2": { name: "临", symbol: "䷒", nature: "地泽临", description: "以上临下，亲临统御。", judgment: "元，亨，利，贞。至于八月有凶。" },
  "5-8": { name: "观", symbol: "䷓", nature: "风地观", description: "瞻仰观察，诚信威严。", judgment: "盥而不荐，有孚颙若。" },
  "3-4": { name: "噬嗑", symbol: "䷔", nature: "火雷噬嗑", description: "咬合亨通，刑罚公正。", judgment: "亨。利用狱。" },
  "7-3": { name: "贲", symbol: "䷕", nature: "山火贲", description: "文饰美化，光明通达。", judgment: "亨。小利有攸往。" },
  "7-8": { name: "剥", symbol: "䷖", nature: "山地剥", description: "剥落衰退，顺势而止。", judgment: "不利有攸往。" },
  "8-4": { name: "复", symbol: "䷗", nature: "地雷复", description: "否极泰来，万物更新。", judgment: "亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。" },
  "1-4": { name: "无妄", symbol: "䷘", nature: "天雷无妄", description: "真实无妄，顺其自然。", judgment: "元，亨，利，贞。其匪正有眚，不利有攸往。" },
  "7-1": { name: "大畜", symbol: "䷙", nature: "山天大畜", description: "既富且贵，积蓄大成。", judgment: "利贞，不家食吉，利涉大川。" },
  "7-4": { name: "颐", symbol: "䷚", nature: "山雷颐", description: "颐养天年，饮食起居。", judgment: "贞吉。观颐，自求口实。" },
  "2-5": { name: "大过", symbol: "䷛", nature: "泽风大过", description: "非常时期，大有过越。", judgment: "栋桡，利有攸往，亨。" },
  "6-6": { name: "坎", symbol: "䷜", nature: "坎为水", description: "重重险陷，流转不穷。", judgment: "习坎，有孚，维心亨，行有尚。" },
  "3-3": { name: "离", symbol: "䷝", nature: "离为火", description: "光明依附，柔顺中正。", judgment: "利贞，亨。畜牝牛，吉。" },
  "2-7": { name: "咸", symbol: "䷞", nature: "泽山咸", description: "感应沟通，两情相悦。", judgment: "亨，利贞，取女吉。" },
  "4-5": { name: "恒", symbol: "䷟", nature: "雷风恒", description: "恒久不止，持之以恒。", judgment: "亨，无咎，利贞，利有攸往。" },
  "1-7": { name: "遯", symbol: "䷠", nature: "天山遯", description: "退避隐藏，明哲保身。", judgment: "亨，小利贞。" },
  "4-1": { name: "大壮", symbol: "䷡", nature: "雷天大壮", description: "壮大强盛，止其所当止。", judgment: "利贞。" },
  "3-8": { name: "晋", symbol: "䷢", nature: "火地晋", description: "旭日东升，进取向前。", judgment: "康侯用锡马蕃庶，昼日三接。" },
  "8-3": { name: "明夷", symbol: "䷣", nature: "地火明夷", description: "晦暗不明，韬光养晦。", judgment: "利艰贞。" },
  "5-3": { name: "家人", symbol: "䷤", nature: "风火家人", description: "家庭和睦，各正其位。", judgment: "利女贞。" },
  "3-2": { name: "睽", symbol: "䷥", nature: "火泽睽", description: "背离乖异，求同存异。", judgment: "小事吉。" },
  "6-7": { name: "蹇", symbol: "䷦", nature: "水山蹇", description: "艰难险阻，止于当止。", judgment: "利西南，不利东北；利见大人，贞吉。" },
  "4-6": { name: "解", symbol: "䷧", nature: "雷水解", description: "缓解困难，解除险阻。", judgment: "利西南，无所往，其来复吉。有攸往，夙吉。" },
  "7-2": { name: "损", symbol: "䷨", nature: "山泽损", description: "减损私欲，惩忿窒欲。", judgment: "有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。" },
  "5-4": { name: "益", symbol: "䷩", nature: "风雷益", description: "损上益下，增益获利。", judgment: "利有攸往，利涉大川。" },
  "2-1": { name: "夬", symbol: "䷪", nature: "泽天夬", description: "决断决绝，刚决柔也。", judgment: "扬于王庭，孚号，有厉，告自邑，不利即戎，利有攸往。" },
  "1-5": { name: "姤", symbol: "䷫", nature: "天风姤", description: "天下有风，阴阳相遇。", judgment: "女壮，勿用取女。" },
  "2-8": { name: "萃", symbol: "䷬", nature: "泽地萃", description: "聚集汇合，顺天应人。", judgment: "亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。" },
  "8-5": { name: "升", symbol: "䷭", nature: "地风升", description: "柔顺上升，积小成大。", judgment: "元亨，用见大人，勿恤，南征吉。" },
  "2-6": { name: "困", symbol: "䷮", nature: "泽水困", description: "穷困之时，致命遂志。", judgment: "亨，贞，大人吉，无咎，有言不信。" },
  "6-5": { name: "井", symbol: "䷯", nature: "水风井", description: "养民无穷，井德互通。", judgment: "改邑不改井，无丧无得，往来井井。汔至，亦未繘井，羸其瓶，凶。" },
  "2-3": { name: "革", symbol: "䷰", nature: "泽火革", description: "变革改旧，顺天应人。", judgment: "已日乃孚，元亨利贞，悔亡。" },
  "3-5": { name: "鼎", symbol: "䷱", nature: "火风鼎", description: "稳重图变，去故取新。", judgment: "元吉，亨。" },
  "4-4": { name: "震", symbol: "䷲", nature: "震为雷", description: "临危不乱，从容不迫。", judgment: "亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。" },
  "7-7": { name: "艮", symbol: "䷳", nature: "艮为山", description: "动静适时，安分守己。", judgment: "艮其背，不获其身，行其庭，不见其人，无咎。" },
  "5-7": { name: "渐", symbol: "䷴", nature: "风山渐", description: "循序渐进，稳步高升。", judgment: "女归吉，利贞。" },
  "4-2": { name: "归妹", symbol: "䷵", nature: "雷泽归妹", description: "感情冲动，未必长久。", judgment: "征凶，无攸利。" },
  "4-3": { name: "丰", symbol: "䷶", nature: "雷火丰", description: "丰大盛满，日中则昃。", judgment: "亨，王假之，勿忧，宜日中。" },
  "3-7": { name: "旅", symbol: "䷷", nature: "火山旅", description: "羁旅在外，不安定之象。", judgment: "小亨，旅贞吉。" },
  "5-5": { name: "巽", symbol: "䷸", nature: "巽为风", description: "谦逊受益，柔顺推广。", judgment: "小亨，利有攸往，利见大人。" },
  "2-2": { name: "兑", symbol: "䷹", nature: "兑为泽", description: "喜悦沟通，外柔内刚。", judgment: "亨，利贞。" },
  "5-6": { name: "涣", symbol: "䷺", nature: "风水涣", description: "离散化解，顺势而行。", judgment: "亨。王假有庙，利涉大川，利贞。" },
  "6-2": { name: "节", symbol: "䷻", nature: "水泽节", description: "节制有度，苦乐均平。", judgment: "亨。苦节，不可贞。" },
  "5-2": { name: "中孚", symbol: "䷼", nature: "风泽中孚", description: "诚信立身，虚心纳谏。", judgment: "豚鱼吉，利涉大川，利贞。" },
  "4-7": { name: "小过", symbol: "䷽", nature: "雷山小过", description: "小有过越，因应变通。", judgment: "亨，利贞。可小事，不可大事。飞鸟遗之音，不宜上，宜下，大吉。" },
  "6-3": { name: "既济", symbol: "䷾", nature: "水火既济", description: "初吉终乱，盛极必衰。", judgment: "亨，小利贞，初吉终乱。" },
  "3-6": { name: "未济", symbol: "䷿", nature: "火水未济", description: "谋事未成，充满希望。", judgment: "亨，小狐讫济，濡其尾，无攸利。" }
};

