import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const historyItems = [
  { id: 1, date: "Сегодня", time: "14:30", filters: ["Разгладить", "Тон кожи"], quality: "Высокое" },
  { id: 2, date: "Сегодня", time: "10:15", filters: ["Глаза", "Овал лица"], quality: "Среднее" },
  { id: 3, date: "Вчера", time: "18:45", filters: ["Яркость", "Морщины", "Тон"], quality: "Высокое" },
  { id: 4, date: "Вчера", time: "09:20", filters: ["Разгладить"], quality: "Среднее" },
  { id: 5, date: "2 апр", time: "16:00", filters: ["Коррекция овала", "Глаза", "Тон"], quality: "Высокое" },
  { id: 6, date: "1 апр", time: "13:10", filters: ["Яркость"], quality: "Среднее" },
];

const grouped = historyItems.reduce<Record<string, typeof historyItems>>((acc, item) => {
  if (!acc[item.date]) acc[item.date] = [];
  acc[item.date].push(item);
  return acc;
}, {});

interface HistoryProps {
  onNavigate: (page: string) => void;
}

export default function History({ onNavigate }: HistoryProps) {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold">История</h1>
        <p className="text-muted-foreground text-sm mt-1">Все обработанные фото</p>
      </div>

      <div className="px-4 flex flex-col gap-6">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3 font-medium">{date}</p>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl overflow-hidden flex items-stretch"
                >
                  <div className="w-20 h-20 bg-muted flex-shrink-0 overflow-hidden">
                    <img
                      src="https://cdn.poehali.dev/projects/c57a8a67-a43c-451b-8a7d-ff82729f54c8/files/0d0148bc-777a-4777-8eee-dab4c580934f.jpg"
                      alt="photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.time}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.filters.map((f) => (
                            <span key={f} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Badge
                        variant={item.quality === "Высокое" ? "default" : "secondary"}
                        className="text-xs shrink-0"
                      >
                        {item.quality}
                      </Badge>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <button
                        onClick={() => onNavigate("editor")}
                        className="flex items-center gap-1 text-xs text-primary"
                      >
                        <Icon name="Edit2" size={12} />
                        Изменить
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Download" size={12} />
                        Скачать
                      </button>
                      <button className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Icon name="Trash2" size={12} />
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
