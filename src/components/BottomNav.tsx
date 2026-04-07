import Icon from "@/components/ui/icon";

const navItems = [
  { icon: "Home", label: "Главная", page: "home" },
  { icon: "History", label: "История", page: "history" },
  { icon: "Sparkles", label: "Ретушь", page: "editor" },
  { icon: "User", label: "Профиль", page: "profile" },
];

interface BottomNavProps {
  current: string;
  onNavigate: (page: string) => void;
}

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around px-2 pt-2 pb-4 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = current === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.page === "editor" ? (
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center -mt-6 shadow-lg ${
                  active ? "bg-primary" : "bg-primary"
                }`}>
                  <Icon name={item.icon as "Home"} size={22} className="text-primary-foreground" />
                </div>
              ) : (
                <Icon name={item.icon as "Home"} size={22} />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
