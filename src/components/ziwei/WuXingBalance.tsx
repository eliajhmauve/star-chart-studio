import type { ZiWeiChart } from "@/lib/ziwei-engine";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  wuXing: ZiWeiChart['wuXing'];
}

const ELEMENTS = [
  { key: 'wood' as const, label: '木 Wood', color: '#4ade80', emoji: '🌳' },
  { key: 'fire' as const, label: '火 Fire', color: '#f87171', emoji: '🔥' },
  { key: 'earth' as const, label: '土 Earth', color: '#D4A843', emoji: '🌍' },
  { key: 'metal' as const, label: '金 Metal', color: '#e2e8f0', emoji: '⚙️' },
  { key: 'water' as const, label: '水 Water', color: '#60a5fa', emoji: '💧' },
];

export default function WuXingBalance({ wuXing }: Props) {
  const data = ELEMENTS.map(el => ({
    subject: el.label.split(' ')[0],
    value: wuXing[el.key],
    fullMark: 100,
  }));

  return (
    <div className="ziwei-glass rounded-2xl p-6 border border-ziwei-gold/20">
      <h3 className="text-ziwei-gold font-serif text-lg mb-6 flex items-center gap-2">
        ✦ 五行能量分佈
        <span className="text-sm font-sans text-foreground/40">Five Elements Balance</span>
      </h3>

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Radar Chart */}
        <div className="w-full md:w-64 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="rgba(212,168,67,0.2)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#D4A843', fontSize: 12 }} />
              <Radar
                name="五行"
                dataKey="value"
                stroke="#D4A843"
                fill="#D4A843"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  background: 'rgba(15,12,30,0.9)',
                  border: '1px solid rgba(212,168,67,0.3)',
                  borderRadius: '8px',
                  color: '#D4A843',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar breakdown */}
        <div className="flex-1 w-full space-y-3">
          {ELEMENTS.map(el => (
            <div key={el.key} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1.5">
                  <span>{el.emoji}</span>
                  <span style={{ color: el.color }}>{el.label}</span>
                </span>
                <span className="text-foreground/50 text-xs">{wuXing[el.key]}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${wuXing[el.key]}%`,
                    background: el.color,
                    boxShadow: `0 0 6px ${el.color}60`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Balance insight */}
      <div className="mt-5 p-3 rounded-xl bg-ziwei-gold/5 border border-ziwei-gold/15">
        <p className="text-xs text-foreground/60 leading-relaxed">
          <span className="text-ziwei-gold font-medium">五行分析：</span>
          {wuXing.water > 30 ? '水氣偏旺，智慧聰穎，情感細膩。' : ''}
          {wuXing.fire > 25 ? '火氣旺盛，熱情積極，行動力強。' : ''}
          {wuXing.earth > 25 ? '土氣穩健，踏實可靠，有旺財之象。' : ''}
          {wuXing.metal > 25 ? '金氣充足，果決剛毅，善於理財。' : ''}
          {wuXing.wood > 25 ? '木氣生發，仁慈包容，事業有成。' : ''}
          {' '}建議適時調和五行，取得生命平衡。
        </p>
      </div>
    </div>
  );
}
