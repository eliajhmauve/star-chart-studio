import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Palace, Star } from "@/lib/ziwei-engine";

interface Props {
  palace: Palace | null;
  open: boolean;
  onClose: () => void;
}

const SIHUA_COLORS: Record<string, string> = {
  '化祿': 'sihua-lu',
  '化權': 'sihua-quan',
  '化科': 'sihua-ke',
  '化忌': 'sihua-ji',
};

const SIHUA_EMOJI: Record<string, string> = {
  '化祿': '💚',
  '化權': '🔴',
  '化科': '🔵',
  '化忌': '⚫',
};

function StarBadge({ star }: { star: Star }) {
  if (star.sihua) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border badge-${SIHUA_COLORS[star.sihua]}`}>
        {SIHUA_EMOJI[star.sihua]} {star.name}
        <span className="opacity-80 text-[10px]">{star.sihua}</span>
      </span>
    );
  }
  if (star.type === 'main') {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-ziwei-gold/20 text-ziwei-gold border border-ziwei-gold/40">
        ✦ {star.name}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-white/5 text-foreground/60 border border-white/10">
      {star.name}
    </span>
  );
}

export default function StarDetail({ palace, open, onClose }: Props) {
  if (!palace) return null;

  const mainStars = palace.stars.filter(s => s.type === 'main');
  const minorStars = palace.stars.filter(s => s.type !== 'main');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-ziwei-surface border border-ziwei-gold/30 text-foreground max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-ziwei-gold font-serif text-xl">
            <span className="text-2xl">{palace.earthlyBranch}宮</span>
            <span className="text-foreground/60 text-base font-sans">·</span>
            <span>{palace.palaceName}</span>
            {palace.isLifePalace && (
              <Badge className="bg-ziwei-gold/20 text-ziwei-gold border-ziwei-gold/50 text-xs">命宮</Badge>
            )}
            {palace.isBodyPalace && (
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 text-xs">身宮</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Main Stars */}
          {mainStars.length > 0 && (
            <div>
              <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">主星 Main Stars</p>
              <div className="flex flex-wrap gap-2">
                {mainStars.map((star, i) => <StarBadge key={i} star={star} />)}
              </div>
            </div>
          )}

          {/* Minor Stars */}
          {minorStars.length > 0 && (
            <div>
              <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">輔星 Minor Stars</p>
              <div className="flex flex-wrap gap-1.5">
                {minorStars.map((star, i) => <StarBadge key={i} star={star} />)}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Four Transformations Legend */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(SIHUA_EMOJI).map(([sihua, emoji]) => (
              <span key={sihua} className="text-xs text-foreground/50">
                {emoji} {sihua}
              </span>
            ))}
          </div>

          {/* Interpretation */}
          <div className="ziwei-glass rounded-xl p-4">
            <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">宮位解讀 Interpretation</p>
            <p className="text-sm text-foreground/80 leading-relaxed">{palace.interpretation}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
