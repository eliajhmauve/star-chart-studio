import { Link } from "react-router-dom";
import portalHeroBg from "@/assets/portal-hero-bg.jpg";
import StarfieldBg from "@/components/ziwei/StarfieldBg";

const TOOLS = [
  {
    id: "ziwei",
    href: "/ziwei",
    symbol: "紫",
    nameZh: "紫微斗數",
    nameEn: "ZI WEI DOU SHU",
    desc: "輸入生辰八字，排出十二宮命盤，洞察星曜格局與命運走向。",
    descEn: "Purple Star Astrology · Chart your destiny",
    available: true,
    color: "from-ziwei-gold/20 to-ziwei-purple/20",
    border: "border-ziwei-gold/30",
    glow: "hover:shadow-[0_0_32px_hsl(var(--ziwei-gold)/0.25)]",
  },
  {
    id: "bazi",
    href: "/bazi",
    symbol: "命",
    nameZh: "八字命理",
    nameEn: "BA ZI",
    desc: "四柱八字分析，天干地支五行生剋，命局強弱深度解讀。",
    descEn: "Four Pillars · Eight Characters",
    available: false,
    color: "from-red-900/20 to-orange-900/15",
    border: "border-red-700/20",
    glow: "hover:shadow-[0_0_32px_hsl(0_60%_40%/0.2)]",
  },
  {
    id: "qimen",
    href: "/qimen",
    symbol: "奇",
    nameZh: "奇門遁甲",
    nameEn: "QI MEN DUN JIA",
    desc: "天、地、神、人四盤排布，洞察時機與方位之玄機。",
    descEn: "Divine Strategy · Time & Direction",
    available: false,
    color: "from-cyan-900/20 to-blue-900/15",
    border: "border-cyan-700/20",
    glow: "hover:shadow-[0_0_32px_hsl(180_60%_40%/0.2)]",
  },
  {
    id: "liuyao",
    href: "/liuyao",
    symbol: "卦",
    nameZh: "六爻占卜",
    nameEn: "LIU YAO",
    desc: "起卦問事，六爻動靜，預測事業財運感情之吉凶。",
    descEn: "Hexagram Divination · Six Lines",
    available: false,
    color: "from-emerald-900/20 to-teal-900/15",
    border: "border-emerald-700/20",
    glow: "hover:shadow-[0_0_32px_hsl(160_60%_30%/0.2)]",
  },
  {
    id: "meihua",
    href: "/meihua",
    symbol: "梅",
    nameZh: "梅花易數",
    nameEn: "MEI HUA YI SHU",
    desc: "以數起卦，體用生剋，梅花心易隨時隨地占問。",
    descEn: "Plum Blossom Numerology",
    available: false,
    color: "from-pink-900/20 to-rose-900/15",
    border: "border-pink-700/20",
    glow: "hover:shadow-[0_0_32px_hsl(340_60%_40%/0.2)]",
  },
  {
    id: "fengshui",
    href: "/fengshui",
    symbol: "風",
    nameZh: "風水羅盤",
    nameEn: "FENG SHUI",
    desc: "二十四山方位分析，陽宅陰宅格局，山水龍穴砂水朝。",
    descEn: "Geomancy · Compass Analysis",
    available: false,
    color: "from-amber-900/20 to-yellow-900/15",
    border: "border-amber-700/20",
    glow: "hover:shadow-[0_0_32px_hsl(40_60%_40%/0.2)]",
  },
];

const STATS = [
  { value: "20+", label: "年命理教學經驗" },
  { value: "5,000+", label: "學員遍佈兩岸三地" },
  { value: "12", label: "命理術數體系" },
  { value: "∞", label: "智慧傳承" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarfieldBg />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center">
        {/* Hero background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${portalHeroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-ziwei-gold/70 text-xs tracking-[0.3em] uppercase mb-6 border border-ziwei-gold/20 rounded-full px-4 py-1.5 ziwei-glass">
            <span>✦</span>
            <span>福青施老師命理中心</span>
            <span>✦</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-serif text-ziwei-gold mb-2 tracking-wider leading-tight">
            天命所歸
          </h1>
          <p className="text-foreground/40 text-sm md:text-base tracking-[0.4em] uppercase mb-8">
            Destiny · Divination · Wisdom
          </p>

          {/* Separator */}
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-ziwei-gold/50" />
            <span className="text-ziwei-gold text-2xl">☯</span>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-ziwei-gold/50" />
          </div>

          <p className="text-foreground/55 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            結合傳統命理智慧與現代科技，福青施老師帶您探索命盤奧秘，
            透過星曜格局洞察人生方向。
          </p>

          {/* CTA */}
          <Link
            to="/ziwei"
            className="inline-flex items-center gap-2 ziwei-btn-gold px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-all duration-300"
          >
            <span>✦</span>
            <span>開始排命盤</span>
            <span>→</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-foreground/30 text-xs tracking-widest">
          <span>SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────── */}
      <section className="relative py-16 border-y border-ziwei-gold/10">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-serif text-ziwei-gold mb-1">{s.value}</p>
                <p className="text-foreground/40 text-xs tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools Grid ──────────────────────────────────── */}
      <section className="relative py-20 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="text-ziwei-gold/50 text-xs tracking-[0.3em] uppercase mb-3">術數體系</p>
            <h2 className="text-3xl md:text-4xl font-serif text-ziwei-gold mb-3">命理工具</h2>
            <p className="text-foreground/35 text-sm">Fortune · Astrology · Divination</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section className="relative py-20 px-4 border-t border-ziwei-gold/10">
        <div className="container max-w-4xl mx-auto">
          <div className="ziwei-glass border border-ziwei-gold/15 rounded-3xl p-8 md:p-12 text-center">
            {/* Decorative */}
            <div className="w-16 h-16 rounded-full border border-ziwei-gold/40 flex items-center justify-center mx-auto mb-6 relative">
              <div className="w-11 h-11 rounded-full border border-ziwei-gold/20 flex items-center justify-center">
                <span className="text-ziwei-gold text-2xl font-serif">師</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-ziwei-gold/30 animate-pulse" />
            </div>

            <p className="text-ziwei-gold/50 text-xs tracking-[0.3em] uppercase mb-3">關於老師</p>
            <h2 className="text-2xl md:text-3xl font-serif text-ziwei-gold mb-4">福青施老師</h2>

            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ziwei-gold/25 max-w-[120px]" />
              <span className="text-ziwei-gold/40 text-sm">✦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ziwei-gold/25 max-w-[120px]" />
            </div>

            <p className="text-foreground/55 text-sm leading-relaxed max-w-xl mx-auto mb-6">
              深耕命理術數逾二十年，精通紫微斗數、八字命理、奇門遁甲、六爻占卜等多門學問。
              以傳統智慧為根基，融合現代思維，協助學員透視命盤，掌握人生方向。
            </p>

            <div className="flex flex-wrap gap-2 justify-center">
              {['紫微斗數', '八字命理', '奇門遁甲', '六爻占卜', '梅花易數', '風水'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs border border-ziwei-gold/20 text-ziwei-gold/60 rounded-full ziwei-glass"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-ziwei-gold/10 py-8 text-center text-foreground/25 text-xs">
        <p className="font-serif text-ziwei-gold/40 text-sm mb-1">福青施老師命理中心</p>
        <p className="tracking-widest">© 2024 · ALL RIGHTS RESERVED</p>
      </footer>
    </div>
  );
}

type Tool = (typeof TOOLS)[number];

function ToolCard({ tool }: { tool: Tool }) {
  const inner = (
    <div
      className={`group relative rounded-2xl p-6 border transition-all duration-300 cursor-pointer
        bg-gradient-to-br ${tool.color} ${tool.border} ${tool.glow}
        ${tool.available ? "hover:-translate-y-1" : "opacity-60"}
      `}
    >
      {/* Coming soon badge */}
      {!tool.available && (
        <div className="absolute top-3 right-3">
          <span className="text-[9px] tracking-widest text-foreground/30 border border-foreground/15 rounded-full px-2 py-0.5 uppercase">
            即將推出
          </span>
        </div>
      )}

      {/* Symbol */}
      <div className="w-12 h-12 rounded-xl border border-current/20 flex items-center justify-center mb-4 text-ziwei-gold font-serif text-2xl ziwei-glass">
        {tool.symbol}
      </div>

      {/* Names */}
      <h3 className="text-ziwei-gold font-serif text-xl mb-0.5">{tool.nameZh}</h3>
      <p className="text-foreground/35 text-[10px] tracking-[0.2em] uppercase mb-3">{tool.nameEn}</p>

      {/* Separator */}
      <div className="w-8 h-px bg-ziwei-gold/30 mb-3" />

      {/* Description */}
      <p className="text-foreground/50 text-xs leading-relaxed">{tool.desc}</p>

      {/* Arrow */}
      {tool.available && (
        <div className="mt-4 flex items-center gap-1 text-ziwei-gold/50 text-xs group-hover:text-ziwei-gold/80 transition-colors">
          <span>前往使用</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      )}
    </div>
  );

  return tool.available ? (
    <Link to={tool.href}>{inner}</Link>
  ) : (
    <div>{inner}</div>
  );
}
