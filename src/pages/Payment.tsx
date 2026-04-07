import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: "free",
    name: "Базовый",
    price: "0 ₽",
    period: "бесплатно",
    features: ["5 фото в месяц", "Базовые фильтры", "Стандартное качество"],
    active: false,
  },
  {
    id: "pro",
    name: "PRO",
    price: "299 ₽",
    period: "в месяц",
    features: ["Неограниченно фото", "Все фильтры", "Высокое качество", "Без рекламы"],
    active: true,
  },
  {
    id: "max",
    name: "MAX",
    price: "599 ₽",
    period: "в месяц",
    features: ["Всё из PRO", "Пакетная обработка", "Приоритет обработки", "API доступ"],
    active: false,
  },
];

const cards = [
  { id: 1, brand: "Visa", last4: "4242", expiry: "12/26", active: true },
  { id: 2, brand: "MasterCard", last4: "8823", expiry: "08/25", active: false },
];

interface PaymentProps {
  onNavigate: (page: string) => void;
}

export default function Payment({ onNavigate }: PaymentProps) {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex items-center gap-3 px-4 pt-12 pb-6">
        <button onClick={() => onNavigate("profile")} className="w-9 h-9 flex items-center justify-center rounded-full bg-card">
          <Icon name="ChevronLeft" size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Методы оплаты</h1>
          <p className="text-muted-foreground text-xs">Управление подпиской и картами</p>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-sm">Мои карты</h2>
          <button className="text-primary text-sm flex items-center gap-1">
            <Icon name="Plus" size={14} />
            Добавить
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {cards.map((card) => (
            <div key={card.id} className={`bg-card rounded-2xl p-4 flex items-center gap-3 ${card.active ? "ring-1 ring-primary" : ""}`}>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name="CreditCard" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{card.brand} •••• {card.last4}</p>
                <p className="text-xs text-muted-foreground">Истекает {card.expiry}</p>
              </div>
              {card.active && <Badge className="text-xs">Основная</Badge>}
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="px-4">
        <h2 className="font-semibold text-sm mb-3">Тарифные планы</h2>
        <div className="flex flex-col gap-3">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`bg-card rounded-2xl p-4 text-left transition-all ${
                selectedPlan === plan.id ? "ring-1 ring-primary" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <p className="font-bold">{plan.name}</p>
                  {plan.active && <Badge className="text-xs bg-primary text-primary-foreground">Текущий</Badge>}
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{plan.price}</p>
                  <p className="text-xs text-muted-foreground">{plan.period}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Check" size={12} className="text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>

        {selectedPlan !== "pro" && (
          <button className="w-full mt-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm">
            Сменить план
          </button>
        )}
      </div>
    </div>
  );
}
