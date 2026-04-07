import { useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const RETOUCH_URL = func2url.retouch;

const filters = [
  { id: "smooth", label: "Кожа", icon: "Sparkles", mode: "enhance" },
  { id: "bright", label: "Яркость", icon: "Sun", mode: "enhance" },
  { id: "wrinkles", label: "Морщины", icon: "Zap", mode: "denoise" },
  { id: "oval", label: "Овал", icon: "Smile", mode: "enhance" },
  { id: "eyes", label: "Глаза", icon: "Eye", mode: "enhance" },
  { id: "tone", label: "Тон", icon: "Droplets", mode: "enhance" },
];

interface EditorProps {
  onNavigate: (page: string) => void;
}

export default function Editor({ onNavigate }: EditorProps) {
  const [activeFilter, setActiveFilter] = useState("smooth");
  const [values, setValues] = useState<Record<string, number>>({
    smooth: 50, bright: 50, wrinkles: 30, oval: 0, eyes: 0, tone: 40,
  });
  const [comparing, setComparing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setImageUrl(url);
      setOriginalUrl(url);
      setResultUrl(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleProcess = async () => {
    if (!imageUrl) return;
    setProcessing(true);
    setError(null);
    try {
      const mode = filters.find((f) => f.id === activeFilter)?.mode || "enhance";
      const resp = await fetch(RETOUCH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageUrl, mode }),
      });
      const data = await resp.json();
      if (data.result_url) {
        setResultUrl(data.result_url);
        setImageUrl(data.result_url);
      } else {
        setError(data.error || "Ошибка обработки");
      }
    } catch {
      setError("Не удалось подключиться к серверу");
    } finally {
      setProcessing(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onNavigate("history");
    }, 1200);
  };

  const displayUrl = comparing ? originalUrl : (resultUrl || imageUrl);

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
          disabled={!resultUrl}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-full font-medium disabled:opacity-40"
        >
          {saved ? <Icon name="Check" size={14} /> : <Icon name="Download" size={14} />}
          {saved ? "Сохранено" : "Сохранить"}
        </button>
      </div>

      {/* Image Area */}
      <div
        className="relative mx-4 rounded-2xl overflow-hidden mb-4 bg-card cursor-pointer"
        style={{ height: 280 }}
        onClick={() => !imageUrl && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
        {displayUrl ? (
          <>
            <img
              src={displayUrl}
              alt="editing"
              className="w-full h-full object-cover"
              style={{
                filter: !resultUrl && !comparing
                  ? `brightness(${0.8 + values.bright / 250}) saturate(${0.9 + values.tone / 200})`
                  : "none",
              }}
            />
            {processing && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-white text-sm font-medium">Обрабатываю фото...</p>
              </div>
            )}
            {resultUrl && !comparing && (
              <div className="absolute top-3 left-3">
                <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">ИИ готово</span>
              </div>
            )}
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
              >
                <Icon name="Upload" size={13} />
                Заменить
              </button>
              {originalUrl && resultUrl && (
                <button
                  onPointerDown={() => setComparing(true)}
                  onPointerUp={() => setComparing(false)}
                  onPointerLeave={() => setComparing(false)}
                  className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                >
                  <Icon name="GitCompare" size={13} />
                  До/После
                </button>
              )}
            </div>
            {comparing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/60 text-white text-sm px-3 py-1 rounded-full">Оригинал</div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground">
            <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center">
              <Icon name="Upload" size={26} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm text-foreground">Загрузить фото</p>
              <p className="text-xs mt-0.5">JPG, PNG, HEIC</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mx-4 mb-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-2.5 text-sm text-destructive flex items-center gap-2">
          <Icon name="AlertCircle" size={15} />
          {error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="px-4 mb-4 overflow-x-auto">
        <div className="flex gap-2 w-max">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeFilter === f.id ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
              }`}
            >
              <Icon name={f.icon as "Sun"} size={18} />
              <span className="text-xs">{f.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slider + Apply */}
      <div className="px-4">
        <div className="bg-card rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">{filters.find((f) => f.id === activeFilter)?.label}</span>
            <span className="text-primary font-bold text-sm">{values[activeFilter]}%</span>
          </div>
          <Slider
            value={[values[activeFilter]]}
            onValueChange={([v]) => setValues((prev) => ({ ...prev, [activeFilter]: v }))}
            min={0} max={100} step={1} className="w-full"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">0</span>
            <span className="text-xs text-muted-foreground">100</span>
          </div>
        </div>

        <button
          onClick={handleProcess}
          disabled={!imageUrl || processing}
          className="w-full mt-3 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-40"
        >
          {processing ? (
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icon name="Sparkles" size={16} />
          )}
          {processing ? "Обрабатываю..." : "Применить ИИ-ретушь"}
        </button>

        <button
          onClick={() => setValues((prev) => ({ ...prev, [activeFilter]: 0 }))}
          className="w-full mt-2 py-2.5 rounded-xl border border-border text-sm text-muted-foreground flex items-center justify-center gap-2"
        >
          <Icon name="RotateCcw" size={14} />
          Сбросить параметр
        </button>
      </div>
    </div>
  );
}
