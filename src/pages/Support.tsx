import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const faqs = [
  { q: "Как загрузить фото для обработки?", a: "Нажмите на кнопку «Загрузить фото» на главной странице или перетащите изображение в область загрузки. Поддерживаются форматы JPG, PNG и HEIC." },
  { q: "Сколько фото я могу обработать бесплатно?", a: "На бесплатном тарифе доступно 5 фото в месяц. При обновлении до PRO лимит снимается полностью." },
  { q: "Как скачать готовое фото?", a: "После обработки нажмите кнопку «Сохранить» в редакторе. Фото сохраняется в историю, откуда можно скачать в любое время." },
  { q: "Мои фото хранятся на серверах?", a: "Фото хранятся зашифрованными на защищённых серверах. Вы можете удалить их в любой момент из истории." },
];

interface SupportProps {
  onNavigate: (page: string) => void;
}

export default function Support({ onNavigate }: SupportProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="flex items-center gap-3 px-4 pt-12 pb-6">
        <button onClick={() => onNavigate("profile")} className="w-9 h-9 flex items-center justify-center rounded-full bg-card">
          <Icon name="ChevronLeft" size={20} />
        </button>
        <div>
          <h1 className="text-xl font-bold">Служба поддержки</h1>
          <p className="text-muted-foreground text-xs">Ответим в течение часа</p>
        </div>
      </div>

      {/* Status */}
      <div className="mx-4 bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <div>
          <p className="text-sm font-medium text-green-300">Поддержка онлайн</p>
          <p className="text-xs text-muted-foreground">Среднее время ответа: 15 минут</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "MessageCircle", label: "Чат" },
            { icon: "Mail", label: "Email" },
            { icon: "Phone", label: "Звонок" },
          ].map((action) => (
            <button
              key={action.label}
              className="bg-card rounded-xl py-3 flex flex-col items-center gap-2"
            >
              <Icon name={action.icon as "Mail"} size={20} className="text-primary" />
              <span className="text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-4 mb-6">
        <h2 className="font-semibold text-sm mb-3">Частые вопросы</h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="text-sm font-medium pr-3">{faq.q}</span>
                <Icon
                  name={openFaq === idx ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-muted-foreground shrink-0"
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Write to Support */}
      <div className="px-4">
        <h2 className="font-semibold text-sm mb-3">Написать в поддержку</h2>
        <div className="bg-card rounded-2xl p-4">
          {sent ? (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Icon name="CheckCircle" size={24} className="text-green-400" />
              </div>
              <p className="font-medium text-sm">Сообщение отправлено!</p>
              <p className="text-xs text-muted-foreground">Мы ответим в ближайшее время</p>
            </div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Опишите вашу проблему или вопрос..."
                rows={4}
                className="w-full bg-secondary rounded-xl p-3 text-sm resize-none outline-none placeholder:text-muted-foreground"
              />
              <Button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full mt-3"
              >
                <Icon name="Send" size={15} className="mr-2" />
                Отправить
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
