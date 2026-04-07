import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const tools = [
  { icon: "Sparkles", label: "Разгладить кожу", color: "bg-pink-500/20 text-pink-300" },
  { icon: "Sun", label: "Отбелить", color: "bg-yellow-500/20 text-yellow-300" },
  { icon: "Zap", label: "Убрать морщины", color: "bg-purple-500/20 text-purple-300" },
  { icon: "Smile", label: "Коррекция овала", color: "bg-blue-500/20 text-blue-300" },
  { icon: "Eye", label: "Глаза", color: "bg-green-500/20 text-green-300" },
  { icon: "Droplets", label: "Тон кожи", color: "bg-orange-500/20 text-orange-300" },
];

const recentEdits = [
  { id: 1, date: "Сегодня, 14:30", filters: ["Разгладить", "Тон"] },
  { id: 2, date: "Вчера, 10:15", filters: ["Глаза", "Овал"] },
];

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [dragging, setDragging] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-muted-foreground text-sm">Добро пожаловать</p>
            <h1 className="text-2xl font-bold">GlowAI</h1>
          </div>
          <button
            onClick={() => onNavigate("profile")}
            className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden"
          >
            <Icon name="User" size={20} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="px-4 mb-6">
        <div
          className={`relative rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
            dragging ? "border-primary bg-primary/10" : "border-border bg-card"
          }`}
          style={{ minHeight: 220 }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={() => setDragging(false)}
          onClick={() => onNavigate("editor")}
        >
          <img
            src="https://cdn.poehali.dev/projects/c57a8a67-a43c-451b-8a7d-ff82729f54c8/files/0d0148bc-777a-4777-8eee-dab4c580934f.jpg"
            alt="preview"
            className="w-full h-52 object-cover opacity-40"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="Upload" size={26} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-base">Загрузить фото</p>
              <p className="text-muted-foreground text-sm mt-0.5">Нажмите или перетащите файл</p>
            </div>
            <Badge className="bg-primary text-primary-foreground text-xs px-3">Начать ретушь</Badge>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-base mb-3">Инструменты</h2>
        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool) => (
            <button
              key={tool.label}
              onClick={() => onNavigate("editor")}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl ${tool.color} transition-all active:scale-95`}
            >
              <Icon name={tool.icon as "Sun"} size={22} />
              <span className="text-xs font-medium text-center leading-tight">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base">Последние работы</h2>
          <button onClick={() => onNavigate("history")} className="text-primary text-sm">Все</button>
        </div>
        <div className="flex flex-col gap-3">
          {recentEdits.map((edit) => (
            <div key={edit.id} className="bg-card rounded-xl p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src="https://cdn.poehali.dev/projects/c57a8a67-a43c-451b-8a7d-ff82729f54c8/files/0d0148bc-777a-4777-8eee-dab4c580934f.jpg"
                  alt="edit"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{edit.date}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {edit.filters.map((f) => (
                    <span key={f} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}