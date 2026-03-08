import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import type { ZiWeiInput } from "@/lib/ziwei-engine";

interface Props {
  onCalculate: (input: ZiWeiInput) => void;
  loading?: boolean;
}

const HOURS = Array.from({ length: 12 }, (_, i) => {
  const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  const times = [
    '子時 (23:00-01:00)', '丑時 (01:00-03:00)', '寅時 (03:00-05:00)',
    '卯時 (05:00-07:00)', '辰時 (07:00-09:00)', '巳時 (09:00-11:00)',
    '午時 (11:00-13:00)', '未時 (13:00-15:00)', '申時 (15:00-17:00)',
    '酉時 (17:00-19:00)', '戌時 (19:00-21:00)', '亥時 (21:00-23:00)',
  ];
  return { value: String(i * 2), label: times[i], branch: branches[i] };
});

export default function ZiWeiInput({ onCalculate, loading }: Props) {
  const [year, setYear] = useState("1990");
  const [month, setMonth] = useState("1");
  const [day, setDay] = useState("1");
  const [hour, setHour] = useState("0");
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [calendarType, setCalendarType] = useState<'lunar' | 'solar'>('solar');

  const handleSubmit = () => {
    onCalculate({
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      hour: parseInt(hour),
      gender,
      calendarType,
    });
  };

  return (
    <div className="ziwei-glass rounded-2xl p-6 md:p-8 mb-8 border border-ziwei-gold/20">
      <h2 className="text-ziwei-gold font-serif text-xl mb-6 flex items-center gap-2">
        <Star className="w-5 h-5 fill-ziwei-gold" />
        輸入生辰資料
        <span className="text-sm font-sans text-foreground/50 ml-2">Enter Birth Information</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Year */}
        <div className="space-y-1.5">
          <Label className="text-foreground/70 text-xs">年份 Year</Label>
          <Input
            type="number"
            value={year}
            onChange={e => setYear(e.target.value)}
            min="1900"
            max="2100"
            className="ziwei-input"
            placeholder="1990"
          />
        </div>

        {/* Month */}
        <div className="space-y-1.5">
          <Label className="text-foreground/70 text-xs">月份 Month</Label>
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="ziwei-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ziwei-surface border-ziwei-gold/30">
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)} className="text-foreground hover:bg-ziwei-gold/10">
                  {i + 1}月
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Day */}
        <div className="space-y-1.5">
          <Label className="text-foreground/70 text-xs">日期 Day</Label>
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger className="ziwei-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ziwei-surface border-ziwei-gold/30">
              {Array.from({ length: 30 }, (_, i) => (
                <SelectItem key={i + 1} value={String(i + 1)} className="text-foreground hover:bg-ziwei-gold/10">
                  {i + 1}日
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hour */}
        <div className="space-y-1.5">
          <Label className="text-foreground/70 text-xs">時辰 Hour</Label>
          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="ziwei-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-ziwei-surface border-ziwei-gold/30">
              {HOURS.map(h => (
                <SelectItem key={h.value} value={h.value} className="text-foreground hover:bg-ziwei-gold/10 text-xs">
                  {h.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-8 mb-6">
        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs">性別 Gender</Label>
          <RadioGroup value={gender} onValueChange={(v) => setGender(v as 'male' | 'female')} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="male" id="male" className="border-ziwei-gold text-ziwei-gold" />
              <Label htmlFor="male" className="text-foreground cursor-pointer">男 Male</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="female" id="female" className="border-ziwei-gold text-ziwei-gold" />
              <Label htmlFor="female" className="text-foreground cursor-pointer">女 Female</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Calendar Type */}
        <div className="space-y-2">
          <Label className="text-foreground/70 text-xs">曆法 Calendar</Label>
          <RadioGroup value={calendarType} onValueChange={(v) => setCalendarType(v as 'lunar' | 'solar')} className="flex gap-4">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="solar" id="solar" className="border-ziwei-gold text-ziwei-gold" />
              <Label htmlFor="solar" className="text-foreground cursor-pointer">國曆 Solar</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="lunar" id="lunar" className="border-ziwei-gold text-ziwei-gold" />
              <Label htmlFor="lunar" className="text-foreground cursor-pointer">農曆 Lunar</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className="ziwei-btn-gold w-full md:w-auto px-10 py-3 text-base font-serif"
      >
        {loading ? '排盤中...' : '✦ 排命盤 Calculate Chart ✦'}
      </Button>
    </div>
  );
}
