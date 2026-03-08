import { useState } from "react";
import StarfieldBg from "@/components/ziwei/StarfieldBg";
import ZiWeiInputForm from "@/components/ziwei/ZiWeiInput";
import MingPan from "@/components/ziwei/MingPan";
import WuXingBalance from "@/components/ziwei/WuXingBalance";
import { calculateZiWei, type ZiWeiInput, type ZiWeiChart } from "@/lib/ziwei-engine";
import { Button } from "@/components/ui/button";
import { Download, Share2, ChevronRight } from "lucide-react";

export default function ZiWeiPage() {
  const [chart, setChart] = useState<ZiWeiChart | null>(null);
  const [lastInput, setLastInput] = useState<ZiWeiInput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = (input: ZiWeiInput) => {
    setLoading(true);
    setTimeout(() => {
      const result = calculateZiWei(input);
      setChart(result);
      setLastInput(input);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen text-foreground">
      <StarfieldBg />

      {/* Header */}
      <header className="border-b border-ziwei-gold/15 backdrop-blur-sm bg-ziwei-bg/60 sticky top-0 z-20">
        <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-foreground/40">
          <a href="/" className="hover:text-ziwei-gold transition-colors">首頁</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-ziwei-gold">紫微斗數</span>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-ziwei-gold/60 text-sm mb-3 tracking-widest uppercase">
            <span>✦</span>
            <span>Chinese Astrology</span>
            <span>✦</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-ziwei-gold mb-3 tracking-wide">
            紫微斗數
          </h1>
          <p className="text-foreground/50 text-sm tracking-widest">ZI WEI DOU SHU · PURPLE STAR ASTROLOGY</p>
          <p className="text-foreground/40 text-xs mt-2 max-w-md mx-auto">
            輸入出生年月日時，排出您的紫微命盤，洞察命運格局
          </p>
        </div>

        {/* Decorative separator */}
        <div className="flex items-center gap-3 mb-8 max-w-xs mx-auto">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ziwei-gold/30" />
          <span className="text-ziwei-gold text-lg">☯</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ziwei-gold/30" />
        </div>

        {/* Input Form */}
        <ZiWeiInputForm onCalculate={handleCalculate} loading={loading} />

        {/* Loading state */}
        {loading && (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-ziwei-gold/30 border-t-ziwei-gold animate-spin" />
              <p className="text-ziwei-gold/60 font-serif">排盤中，請稍候…</p>
            </div>
          </div>
        )}

        {/* Results */}
        {chart && lastInput && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Action buttons */}
            <div className="flex items-center justify-between">
              <h2 className="text-foreground/60 text-sm">
                命盤結果 ·
                <span className="text-ziwei-gold ml-1">
                  {lastInput.year}年{lastInput.month}月{lastInput.day}日
                  {lastInput.gender === 'male' ? ' 男命' : ' 女命'}
                </span>
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-ziwei-gold/30 text-foreground/60 hover:text-ziwei-gold hover:border-ziwei-gold bg-transparent text-xs">
                  <Share2 className="w-3 h-3 mr-1" /> 分享
                </Button>
                <Button variant="outline" size="sm" className="border-ziwei-gold/30 text-foreground/60 hover:text-ziwei-gold hover:border-ziwei-gold bg-transparent text-xs">
                  <Download className="w-3 h-3 mr-1" /> 儲存
                </Button>
              </div>
            </div>

            {/* Ming Pan Grid */}
            <div className="ziwei-glass rounded-2xl p-4 md:p-6 border border-ziwei-gold/20">
              <MingPan
                chart={chart}
                inputYear={lastInput.year}
                inputMonth={lastInput.month}
                inputDay={lastInput.day}
                gender={lastInput.gender}
              />
            </div>

            {/* Wu Xing Balance */}
            <WuXingBalance wuXing={chart.wuXing} />

            {/* Footer note */}
            <p className="text-center text-foreground/25 text-xs pb-8">
              本命盤僅供參考，如需深入解讀請洽詢福青施老師
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
