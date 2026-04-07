import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

const stats = [
  { label: "Фото", value: "47" },
  { label: "Этот месяц", value: "12" },
  { label: "Сохранено ГБ", value: "0.8" },
];

const menuItems = [
  { icon: "CreditCard", label: "Методы оплаты", page: "payment" },
  { icon: "HelpCircle", label: "Служба поддержки", page: "support" },
  { icon: "Bell", label: "Уведомления", page: null },
  { icon: "Shield", label: "Конфиденциальность", page: null },
  { icon: "Share2", label: "Поделиться приложением", page: null },
];

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="px-4 pt-12 pb-6">
        <h1 className="text-2xl font-bold">Профиль</h1>
      </div>

      {/* User Card */}
      <div className="mx-4 bg-card rounded-2xl p-5 mb-5 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
          <Icon name="User" size={32} className="text-primary" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">Анна Смирнова</p>
          <p className="text-muted-foreground text-sm">anna@example.com</p>
          <div className="mt-1.5">
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">PRO план</span>
          </div>
        </div>
        <button className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center">
          <Icon name="Edit2" size={15} className="text-secondary-foreground" />
        </button>
      </div>

      {/* Stats */}
      <div className="mx-4 bg-card rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-3 divide-x divide-border">
          {stats.map((s) => (
            <div key={s.label} className="text-center px-2">
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 bg-card rounded-2xl overflow-hidden mb-5">
        {menuItems.map((item, idx) => (
          <div key={item.label}>
            <button
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors"
              onClick={() => item.page && onNavigate(item.page)}
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name={item.icon as "Bell"} size={16} className="text-secondary-foreground" />
              </div>
              <span className="flex-1 text-sm text-left">{item.label}</span>
              {item.label === "Уведомления" ? (
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              ) : (
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              )}
            </button>
            {idx < menuItems.length - 1 && <div className="h-px bg-border mx-4" />}
          </div>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4">
        <button className="w-full py-3 rounded-xl border border-destructive/40 text-destructive text-sm font-medium flex items-center justify-center gap-2">
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
