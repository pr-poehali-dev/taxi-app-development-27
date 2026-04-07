import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const filters = [
  { id: "smooth", label: "Кожа", icon: "Sparkles" },
  { id: "bright", label: "Яркость", icon: "Sun" },
  { id: "wrinkles", label: "Морщины", icon: "Zap" },
  { id: "oval", label: "Овал", icon: "Smile" },
  { id: "eyes", label: "Глаза", icon: "Eye" },
  { id: "tone", label: "Тон", icon: "Droplets" },
];

interface EditorProps {
  onNavigate: (page: string) => void;
}

export default function Editor({ onNavigate }: EditorProps) {
  const [activeFilter, setActiveFilter] = useState("smooth");
  const [values, setValues] = useState<Record<string, number>>({
    smooth: 50,
    bright: 50,
    wrinkles: 30,
    oval: 0,
    eyes: 0,
    tone: 40,
  });
  const [comparing, setComparing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onNavigate("history");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-12 pb-4">
        <button onClick={() => onNavigate("home")} className="w-9 h-9 flex items-center justify-center rounded-full bg-card">
          <Icon name="ChevronLeft" size={20} />
        </button>
        <h1 className="font-semibold">Редактор</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-full font-medium"
        >
          {saved ? <Icon name="Check" size={14} /> : <Icon name="Download" size={14} />}
          {saved ? "Сохранено" : "Сохранить"}
        </button>
      </div>

      {/* Image Preview */}
      <div className="relative mx-4 rounded-2xl overflow-hidden mb-4 bg-card" style={{ height: 280 }}>
        <img
          src="https://cdn.poehali.dev/projects/c57a8a67-a43c-451b-8a7d-ff82729f54c8/files/0d0148bc-777a-4777-8eee-dab4c580934f.jpg"
          alt="editing"
          className="w-full h-full object-cover"
          style={{
            filter: comparing
              ? "none"
              : `brightness(${0.8 + values.bright / 250}) saturate(${0.9 + values.tone / 200}) blur(${values.smooth > 70 ? 0.3 : 0}px)`,
          }}
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onPointerDown={() => setComparing(true)}
            onPointerUp={() => setComparing(false)}
            onPointerLeave={() => setComparing(false)}
            className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
          >
            <Icon name="GitCompare" size={13} />
            До/После
          </button>
        </div>
        {comparing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 text-white text-sm px-3 py-1 rounded-full">Оригинал</div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeFilter === f.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
              }`}
            >
              <Icon name={f.icon as "Sun"} size={18} />
              <span className="text-xs">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">
              {filters.find((f) => f.id === activeFilter)?.label}
            </span>
            <span className="text-primary font-bold text-sm">{values[activeFilter]}%</span>
          </div>
          <Slider
            value={[values[activeFilter]]}
            onValueChange={([v]) => setValues((prev) => ({ ...prev, [activeFilter]: v }))}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">0</span>
            <span className="text-xs text-muted-foreground">100</span>
          </div>
        </div>

        {/* Quick Reset */}
        <button
          onClick={() => setValues((prev) => ({ ...prev, [activeFilter]: 0 }))}
          className="w-full mt-3 py-2.5 rounded-xl border border-border text-sm text-muted-foreground flex items-center justify-center gap-2"
        >
          <Icon name="RotateCcw" size={14} />
          Сбросить параметр
        </button>
      </div>
    </div>
  );
}
