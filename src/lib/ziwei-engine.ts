// Zi Wei Dou Shu (紫微斗數) Calculation Engine
// Simplified calculation engine for demonstration

export type SiHua = '化祿' | '化權' | '化科' | '化忌';

export interface Star {
  name: string;
  type: 'main' | 'minor' | 'assistant';
  sihua?: SiHua;
  element?: string;
}

export interface Palace {
  earthlyBranch: string;    // 地支
  heavenlyBranch: string;   // 天干
  palaceName: string;       // 宮名
  lifeGod?: string;         // 命主/身主
  stars: Star[];
  isLifePalace: boolean;    // 命宮
  isBodyPalace: boolean;    // 身宮
  interpretation: string;
}

export interface ZiWeiChart {
  palaces: Palace[];
  lifeElement: string;      // 命主五行
  bodyElement: string;      // 身主五行
  mingZhu: string;          // 命主星
  shenZhu: string;          // 身主星
  wuXing: { wood: number; fire: number; earth: number; metal: number; water: number };
  yearStem: string;
  yearBranch: string;
}

// The 12 earthly branches in order
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// Palace names in the standard sequence (starting from 命宮 going clockwise)
const PALACE_NAMES = ['命宮', '兄弟', '夫妻', '子女', '財帛', '疾厄', '遷移', '交友', '事業', '田宅', '福德', '父母'];

// Main stars (十四主星)
const MAIN_STARS = [
  { name: '紫微', element: '土', type: 'main' as const },
  { name: '天機', element: '木', type: 'main' as const },
  { name: '太陽', element: '火', type: 'main' as const },
  { name: '武曲', element: '金', type: 'main' as const },
  { name: '天同', element: '水', type: 'main' as const },
  { name: '廉貞', element: '火', type: 'main' as const },
  { name: '天府', element: '土', type: 'main' as const },
  { name: '太陰', element: '水', type: 'main' as const },
  { name: '貪狼', element: '木', type: 'main' as const },
  { name: '巨門', element: '水', type: 'main' as const },
  { name: '天相', element: '水', type: 'main' as const },
  { name: '天梁', element: '土', type: 'main' as const },
  { name: '七殺', element: '金', type: 'main' as const },
  { name: '破軍', element: '水', type: 'main' as const },
];

// Minor/assistant stars
const MINOR_STARS = [
  '文昌', '文曲', '左輔', '右弼', '天魁', '天鉞',
  '祿存', '天馬', '火星', '鈴星', '地空', '地劫',
  '陀羅', '擎羊', '龍池', '鳳閣', '紅鸞', '天喜',
  '天空', '旬空', '截空', '台輔', '封誥', '天壽',
];

// 四化 mappings by heavenly stem
const SI_HUA_MAP: Record<string, { 化祿: string; 化權: string; 化科: string; 化忌: string }> = {
  '甲': { '化祿': '廉貞', '化權': '破軍', '化科': '武曲', '化忌': '太陽' },
  '乙': { '化祿': '天機', '化權': '天梁', '化科': '紫微', '化忌': '太陰' },
  '丙': { '化祿': '天同', '化權': '天機', '化科': '文昌', '化忌': '廉貞' },
  '丁': { '化祿': '太陰', '化權': '天同', '化科': '天機', '化忌': '巨門' },
  '戊': { '化祿': '貪狼', '化權': '太陰', '化科': '右弼', '化忌': '天機' },
  '己': { '化祿': '武曲', '化權': '貪狼', '化科': '天梁', '化忌': '文曲' },
  '庚': { '化祿': '太陽', '化權': '武曲', '化科': '太陰', '化忌': '天同' },
  '辛': { '化祿': '巨門', '化權': '太陽', '化科': '文曲', '化忌': '文昌' },
  '壬': { '化祿': '天梁', '化權': '紫微', '化科': '左輔', '化忌': '武曲' },
  '癸': { '化祿': '破軍', '化權': '巨門', '化科': '太陰', '化忌': '貪狼' },
};

// Interpretations for each palace
const PALACE_INTERPRETATIONS: Record<string, string> = {
  '命宮': '命宮為人生格局之根本，主掌個性、才華與人生方向。星曜吉則人生順遂，星曜凶則需多加磨礪。此宮決定一個人的基本性格與外在表現。',
  '兄弟': '兄弟宮主兄弟姊妹關係，亦關乎朋友與同輩緣分。此宮佳則手足情深，互助有力；不佳則兄弟緣薄，需靠自力更生。',
  '夫妻': '夫妻宮主婚姻感情與配偶緣分。星曜吉美則婚姻美滿，配偶賢良；有煞星則感情波折，需用心經營。',
  '子女': '子女宮主子嗣緣分及下屬關係。星曜吉則子女聰慧孝順；亦關乎創意能力與才藝表現。',
  '財帛': '財帛宮主財運、理財能力及金錢觀。星曜吉則財源廣進；有化祿尤佳，主偏財正財皆旺。',
  '疾厄': '疾厄宮主健康狀況及身體部位。需留意星曜凶象，適時調養身心，保持健康平衡。',
  '遷移': '遷移宮主外出運、旅行及在外際遇。星曜吉則出外逢貴，異鄉發展順利。',
  '交友': '交友宮（奴僕宮）主朋友、下屬及人際關係。星曜佳則廣結善緣，助力多多。',
  '事業': '事業宮（官祿宮）主事業成就、工作發展與社會地位。有主星坐守則事業有成。',
  '田宅': '田宅宮主不動產、家庭環境及居家運。星曜吉則置業有望，家宅安寧。',
  '福德': '福德宮主精神生活、福氣享受及晚年運。此宮豐美則一生多福，心靈充實。',
  '父母': '父母宮主與父母長輩關係，亦關乎文書、考試及貴人緣。星曜佳則父母庇蔭深厚。',
};

function getYearStemBranch(year: number): { stem: string; branch: string } {
  const stemIdx = (year - 4) % 10;
  const branchIdx = (year - 4) % 12;
  return {
    stem: HEAVENLY_STEMS[(stemIdx + 10) % 10],
    branch: EARTHLY_BRANCHES[(branchIdx + 12) % 12],
  };
}

function getLifePalaceBranch(month: number, hour: number): number {
  // Simplified: Life palace calculation based on month and birth hour
  // In real ZiWei, this is more complex
  const hourBranch = Math.floor(hour / 2) % 12;
  const lifePalaceIdx = (14 - month - hourBranch + 24) % 12;
  return lifePalaceIdx;
}

function getBodyPalaceBranch(month: number, hour: number): number {
  const hourBranch = Math.floor(hour / 2) % 12;
  const bodyPalaceIdx = (month + hourBranch + 2) % 12;
  return bodyPalaceIdx;
}

function distributeMainStars(lifePalaceIdx: number, yearStemIdx: number, gender: 'male' | 'female'): Record<number, Star[]> {
  const result: Record<number, Star[]> = {};
  for (let i = 0; i < 12; i++) result[i] = [];

  // Simplified star placement based on life palace and year stem
  // Using deterministic placement seeded by input
  const seed = (lifePalaceIdx * 3 + yearStemIdx * 7) % 12;
  
  // Place main stars with some logic
  const starPlacements: Array<{ starIdx: number; palaceOffset: number }> = [
    { starIdx: 0, palaceOffset: 0 },   // 紫微 in life palace
    { starIdx: 6, palaceOffset: 6 },   // 天府 opposite
    { starIdx: 1, palaceOffset: (seed + 4) % 12 },   // 天機
    { starIdx: 2, palaceOffset: (seed + 2) % 12 },   // 太陽
    { starIdx: 3, palaceOffset: (seed + 8) % 12 },   // 武曲
    { starIdx: 4, palaceOffset: (seed + 10) % 12 },  // 天同
    { starIdx: 5, palaceOffset: (seed + 3) % 12 },   // 廉貞
    { starIdx: 7, palaceOffset: (seed + 5) % 12 },   // 太陰
    { starIdx: 8, palaceOffset: (seed + 1) % 12 },   // 貪狼
    { starIdx: 9, palaceOffset: (seed + 9) % 12 },   // 巨門
    { starIdx: 10, palaceOffset: (seed + 7) % 12 },  // 天相
    { starIdx: 11, palaceOffset: (seed + 11) % 12 }, // 天梁
    { starIdx: 12, palaceOffset: (seed + 6) % 12 },  // 七殺
    { starIdx: 13, palaceOffset: (seed + 3) % 12 },  // 破軍
  ];

  starPlacements.forEach(({ starIdx, palaceOffset }) => {
    const palaceIdx = (lifePalaceIdx + palaceOffset) % 12;
    result[palaceIdx].push({ ...MAIN_STARS[starIdx], type: 'main' });
  });

  return result;
}

function distributeMinorStars(lifePalaceIdx: number, yearBranchIdx: number, yearStemIdx: number): Record<number, Star[]> {
  const result: Record<number, Star[]> = {};
  for (let i = 0; i < 12; i++) result[i] = [];

  const minorToPlace = ['文昌', '文曲', '左輔', '右弼', '天魁', '天鉞', '祿存', '天馬', '火星', '鈴星'];
  
  minorToPlace.forEach((starName, idx) => {
    const palaceIdx = (lifePalaceIdx + yearBranchIdx + idx * 3 + yearStemIdx) % 12;
    result[palaceIdx].push({ name: starName, type: 'minor' });
  });

  return result;
}

function applySiHua(palaces: Palace[], yearStem: string): void {
  const siHuaConfig = SI_HUA_MAP[yearStem];
  if (!siHuaConfig) return;

  Object.entries(siHuaConfig).forEach(([sihua, starName]) => {
    palaces.forEach(palace => {
      palace.stars.forEach(star => {
        if (star.name === starName) {
          star.sihua = sihua as SiHua;
        }
      });
    });
  });
}

function calculateWuXing(palaces: Palace[]): ZiWeiChart['wuXing'] {
  const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  const elementMap: Record<string, keyof typeof counts> = {
    '木': 'wood', '火': 'fire', '土': 'earth', '金': 'metal', '水': 'water'
  };
  
  palaces.forEach(palace => {
    palace.stars.forEach(star => {
      if (star.element && elementMap[star.element]) {
        counts[elementMap[star.element]]++;
      }
    });
  });

  // Normalize to percentage
  const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
  return {
    wood: Math.round((counts.wood / total) * 100),
    fire: Math.round((counts.fire / total) * 100),
    earth: Math.round((counts.earth / total) * 100),
    metal: Math.round((counts.metal / total) * 100),
    water: Math.round((counts.water / total) * 100),
  };
}

// Ming Zhu (命主) based on year branch
const MING_ZHU: Record<string, string> = {
  '子': '貪狼', '丑': '巨門', '寅': '祿存', '卯': '文曲',
  '辰': '廉貞', '巳': '武曲', '午': '破軍', '未': '武曲',
  '申': '廉貞', '酉': '文曲', '戌': '祿存', '亥': '巨門',
};

// Shen Zhu (身主) based on year branch
const SHEN_ZHU: Record<string, string> = {
  '子': '火星', '丑': '天相', '寅': '天梁', '卯': '天同',
  '辰': '文昌', '巳': '天機', '午': '火星', '未': '天相',
  '申': '天梁', '酉': '天同', '戌': '文昌', '亥': '天機',
};

export interface ZiWeiInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: 'male' | 'female';
  calendarType: 'lunar' | 'solar';
  name?: string;
}

export function calculateZiWei(input: ZiWeiInput): ZiWeiChart {
  const { year, month, hour, gender } = input;
  
  const { stem: yearStem, branch: yearBranch } = getYearStemBranch(year);
  const yearStemIdx = HEAVENLY_STEMS.indexOf(yearStem);
  const yearBranchIdx = EARTHLY_BRANCHES.indexOf(yearBranch);
  
  // Calculate life palace position (index into EARTHLY_BRANCHES)
  const lifePalaceIdx = getLifePalaceBranch(month, hour);
  const bodyPalaceIdx = getBodyPalaceBranch(month, hour);
  
  // Assign palace names to earthly branches starting from life palace
  const palaces: Palace[] = EARTHLY_BRANCHES.map((branch, branchIdx) => {
    const palaceNameIdx = (branchIdx - lifePalaceIdx + 12) % 12;
    return {
      earthlyBranch: branch,
      heavenlyBranch: HEAVENLY_STEMS[(branchIdx * 2 + yearStemIdx) % 10],
      palaceName: PALACE_NAMES[palaceNameIdx],
      stars: [],
      isLifePalace: branchIdx === lifePalaceIdx,
      isBodyPalace: branchIdx === bodyPalaceIdx,
      interpretation: PALACE_INTERPRETATIONS[PALACE_NAMES[palaceNameIdx]] || '',
    };
  });

  // Distribute main stars
  const mainStarsByPalace = distributeMainStars(lifePalaceIdx, yearStemIdx, gender);
  const minorStarsByPalace = distributeMinorStars(lifePalaceIdx, yearBranchIdx, yearStemIdx);

  palaces.forEach((palace, idx) => {
    palace.stars = [
      ...(mainStarsByPalace[idx] || []),
      ...(minorStarsByPalace[idx] || []),
    ];
  });

  // Apply 四化
  applySiHua(palaces, yearStem);

  const wuXing = calculateWuXing(palaces);
  const mingZhu = MING_ZHU[yearBranch] || '貪狼';
  const shenZhu = SHEN_ZHU[yearBranch] || '火星';

  return {
    palaces,
    lifeElement: '土',
    bodyElement: '木',
    mingZhu,
    shenZhu,
    wuXing,
    yearStem,
    yearBranch,
  };
}

// Grid layout: maps earthly branch index → grid position (row, col) 1-indexed
// Grid is 4x4, center is rows 2-3, cols 2-3
export const PALACE_GRID_POSITIONS: Record<string, { row: number; col: number }> = {
  '巳': { row: 1, col: 1 },
  '午': { row: 1, col: 2 },
  '未': { row: 1, col: 3 },
  '申': { row: 1, col: 4 },
  '辰': { row: 2, col: 1 },
  '酉': { row: 2, col: 4 },
  '卯': { row: 3, col: 1 },
  '戌': { row: 3, col: 4 },
  '寅': { row: 4, col: 1 },
  '丑': { row: 4, col: 2 },
  '子': { row: 4, col: 3 },
  '亥': { row: 4, col: 4 },
};
