import { useState } from "react";
import type { Palace, ZiWeiChart } from "@/lib/ziwei-engine";
import { PALACE_GRID_POSITIONS } from "@/lib/ziwei-engine";
import StarDetail from "./StarDetail";

interface Props {
  chart: ZiWeiChart;
  inputYear: number;
  inputMonth: number;
  inputDay: number;
  gender: 'male' | 'female';
}

const SIHUA_EMOJI: Record<string, string> = {
  '化祿': '💚', '化權': '🔴', '化科': '🔵', '化忌': '⚫',
};

function PalaceCell({ palace, onClick }: { palace: Palace; onClick: () => void }) {
  const mainStars = palace.stars.filter(s => s.type === 'main').slice(0, 3);
  const minorStars = palace.stars.filter(s => s.type !== 'main').slice(0, 3);
  const sihuaStars = palace.stars.filter(s => s.sihua);

  const pos = PALACE_GRID_POSITIONS[palace.earthlyBranch];
  if (!pos) return null;

  return (
    <div
      onClick={onClick}
      className={`palace-cell cursor-pointer group transition-all duration-200
        ${palace.isLifePalace ? 'palace-life' : ''}
        ${palace.isBodyPalace && !palace.isLifePalace ? 'palace-body' : ''}
      `}
      style={{
        gridRow: pos.row,
        gridColumn: pos.col,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-1">
        <span className="text-ziwei-gold/60 text-[10px] font-medium">{palace.earthlyBranch}</span>
        <span className={`text-[10px] font-bold ${palace.isLifePalace ? 'text-ziwei-gold' : 'text-foreground/40'}`}>
          {palace.palaceName}
        </span>
      </div>

      {/* Main Stars */}
      <div className="space-y-0.5 mb-1">
        {mainStars.map((star, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="text-ziwei-gold text-[11px] font-semibold leading-tight">
              {star.name}
            </span>
            {star.sihua && (
              <span className="text-[9px]">{SIHUA_EMOJI[star.sihua]}</span>
            )}
          </div>
        ))}
      </div>

      {/* Minor Stars */}
      <div className="flex flex-wrap gap-0.5">
        {minorStars.map((star, i) => (
          <span key={i} className="text-foreground/40 text-[9px] leading-tight">
            {star.name}{star.sihua ? SIHUA_EMOJI[star.sihua] : ''}
          </span>
        ))}
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px] text-ziwei-gold/50">詳 ▸</span>
      </div>
    </div>
  );
}

function CenterCell({ chart, year, month, day, gender }: { chart: ZiWeiChart; year: number; month: number; day: number; gender: 'male' | 'female' }) {
  return (
    <div
      className="ziwei-glass border border-ziwei-gold/25 rounded-lg p-3 flex flex-col items-center justify-center text-center"
      style={{ gridRow: '2 / 4', gridColumn: '2 / 4' }}
    >
      {/* Decorative ring */}
      <div className="w-12 h-12 rounded-full border border-ziwei-gold/40 flex items-center justify-center mb-2 relative">
        <div className="w-8 h-8 rounded-full border border-ziwei-gold/25 flex items-center justify-center">
          <span className="text-ziwei-gold text-lg">紫</span>
        </div>
      </div>

      <p className="text-ziwei-gold font-serif text-sm font-bold mb-1">紫微命盤</p>
      <p className="text-foreground/50 text-[10px] mb-3">Purple Star Chart</p>

      <div className="space-y-1 text-[10px] text-foreground/60">
        <p>{year}年{month}月{day}日</p>
        <p>{gender === 'male' ? '男命 ♂' : '女命 ♀'}</p>
        <div className="border-t border-white/10 pt-1 mt-1">
          <p>命主：<span className="text-ziwei-gold">{chart.mingZhu}</span></p>
          <p>身主：<span className="text-foreground/80">{chart.shenZhu}</span></p>
        </div>
        <div className="border-t border-white/10 pt-1 mt-1">
          <p>歲次：<span className="text-ziwei-gold">{chart.yearStem}{chart.yearBranch}年</span></p>
        </div>
      </div>
    </div>
  );
}

export default function MingPan({ chart, inputYear, inputMonth, inputDay, gender }: Props) {
  const [selectedPalace, setSelectedPalace] = useState<Palace | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handlePalaceClick = (palace: Palace) => {
    setSelectedPalace(palace);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="mb-4">
        <h3 className="text-ziwei-gold font-serif text-lg flex items-center gap-2">
          ✦ 十二宮命盤
          <span className="text-sm font-sans text-foreground/40">— 點擊宮位查看詳情 Click palace for details</span>
        </h3>
      </div>

      <div
        className="grid gap-1.5 w-full"
        style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(4, auto)' }}
      >
        {/* 12 Palace cells */}
        {chart.palaces.map((palace) => (
          <PalaceCell
            key={palace.earthlyBranch}
            palace={palace}
            onClick={() => handlePalaceClick(palace)}
          />
        ))}

        {/* Center 2x2 */}
        <CenterCell
          chart={chart}
          year={inputYear}
          month={inputMonth}
          day={inputDay}
          gender={gender}
        />
      </div>

      <StarDetail
        palace={selectedPalace}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
}
