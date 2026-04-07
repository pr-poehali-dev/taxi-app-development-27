interface Mask {
  id: string;
  label: string;
  emoji: string;
  overlay: React.ReactNode;
}

const masks: Mask[] = [
  {
    id: "none",
    label: "Без маски",
    emoji: "🚫",
    overlay: null,
  },
  {
    id: "cat",
    label: "Кошка",
    emoji: "🐱",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Кошачьи уши */}
        <polygon points="110,60 80,10 150,55" fill="#c084fc" opacity="0.9" />
        <polygon points="290,60 320,10 250,55" fill="#c084fc" opacity="0.9" />
        <polygon points="115,58 90,20 148,54" fill="#f3e8ff" opacity="0.8" />
        <polygon points="285,58 310,20 252,54" fill="#f3e8ff" opacity="0.8" />
        {/* Нос */}
        <ellipse cx="200" cy="168" rx="8" ry="5" fill="#f472b6" opacity="0.9" />
        {/* Усы левые */}
        <line x1="100" y1="165" x2="185" y2="170" stroke="#a855f7" strokeWidth="2" opacity="0.8" />
        <line x1="100" y1="175" x2="185" y2="174" stroke="#a855f7" strokeWidth="2" opacity="0.8" />
        <line x1="105" y1="185" x2="185" y2="178" stroke="#a855f7" strokeWidth="2" opacity="0.8" />
        {/* Усы правые */}
        <line x1="300" y1="165" x2="215" y2="170" stroke="#a855f7" strokeWidth="2" opacity="0.8" />
        <line x1="300" y1="175" x2="215" y2="174" stroke="#a855f7" strokeWidth="2" opacity="0.8" />
        <line x1="295" y1="185" x2="215" y2="178" stroke="#a855f7" strokeWidth="2" opacity="0.8" />
        {/* Глаза-блики */}
        <ellipse cx="148" cy="128" rx="18" ry="12" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.7" />
        <ellipse cx="252" cy="128" rx="18" ry="12" fill="none" stroke="#f472b6" strokeWidth="3" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: "flowers",
    label: "Цветы",
    emoji: "🌸",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Венок из цветов */}
        {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x, i) => (
          <g key={i} transform={`translate(${x}, ${30 + (i % 2) * 12})`}>
            <circle cx="0" cy="0" r="10" fill={["#f9a8d4","#86efac","#fde68a","#a5b4fc","#fb923c"][i % 5]} opacity="0.85" />
            <circle cx="0" cy="-10" r="6" fill={["#fce7f3","#dcfce7","#fef9c3","#ede9fe","#fff7ed"][i % 5]} opacity="0.7" />
            <circle cx="9" cy="-5" r="6" fill={["#fce7f3","#dcfce7","#fef9c3","#ede9fe","#fff7ed"][i % 5]} opacity="0.7" />
            <circle cx="9" cy="5" r="6" fill={["#fce7f3","#dcfce7","#fef9c3","#ede9fe","#fff7ed"][i % 5]} opacity="0.7" />
            <circle cx="0" cy="10" r="6" fill={["#fce7f3","#dcfce7","#fef9c3","#ede9fe","#fff7ed"][i % 5]} opacity="0.7" />
            <circle cx="-9" cy="5" r="6" fill={["#fce7f3","#dcfce7","#fef9c3","#ede9fe","#fff7ed"][i % 5]} opacity="0.7" />
            <circle cx="-9" cy="-5" r="6" fill={["#fce7f3","#dcfce7","#fef9c3","#ede9fe","#fff7ed"][i % 5]} opacity="0.7" />
            <circle cx="0" cy="0" r="4" fill="#fbbf24" opacity="0.9" />
          </g>
        ))}
        {/* Листики */}
        <ellipse cx="60" cy="55" rx="8" ry="14" fill="#4ade80" opacity="0.7" transform="rotate(-30 60 55)" />
        <ellipse cx="340" cy="55" rx="8" ry="14" fill="#4ade80" opacity="0.7" transform="rotate(30 340 55)" />
        <ellipse cx="130" cy="62" rx="6" ry="12" fill="#4ade80" opacity="0.7" transform="rotate(-15 130 62)" />
        <ellipse cx="270" cy="62" rx="6" ry="12" fill="#4ade80" opacity="0.7" transform="rotate(15 270 62)" />
      </svg>
    ),
  },
  {
    id: "sunglasses",
    label: "Очки",
    emoji: "😎",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Оправа */}
        <rect x="90" y="112" width="90" height="55" rx="16" fill="#1e293b" opacity="0.88" />
        <rect x="220" y="112" width="90" height="55" rx="16" fill="#1e293b" opacity="0.88" />
        {/* Перемычка */}
        <path d="M180 138 Q200 132 220 138" stroke="#1e293b" strokeWidth="6" fill="none" />
        {/* Дужки */}
        <line x1="90" y1="138" x2="55" y2="130" stroke="#1e293b" strokeWidth="5" />
        <line x1="310" y1="138" x2="345" y2="130" stroke="#1e293b" strokeWidth="5" />
        {/* Блик */}
        <ellipse cx="118" cy="126" rx="12" ry="6" fill="white" opacity="0.18" transform="rotate(-20 118 126)" />
        <ellipse cx="248" cy="126" rx="12" ry="6" fill="white" opacity="0.18" transform="rotate(-20 248 126)" />
        {/* Цветной градиент */}
        <rect x="91" y="113" width="88" height="53" rx="15" fill="#6366f1" opacity="0.35" />
        <rect x="221" y="113" width="88" height="53" rx="15" fill="#6366f1" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "rainbow",
    label: "Радуга",
    emoji: "🌈",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Радуга над головой */}
        {[
          { r: 170, color: "#ef4444", w: 10 },
          { r: 156, color: "#f97316", w: 10 },
          { r: 142, color: "#eab308", w: 10 },
          { r: 128, color: "#22c55e", w: 10 },
          { r: 114, color: "#3b82f6", w: 10 },
          { r: 100, color: "#8b5cf6", w: 10 },
        ].map((arc, i) => (
          <path
            key={i}
            d={`M ${200 - arc.r} 130 A ${arc.r} ${arc.r} 0 0 1 ${200 + arc.r} 130`}
            fill="none"
            stroke={arc.color}
            strokeWidth={arc.w}
            opacity="0.75"
          />
        ))}
        {/* Звёздочки */}
        {[[60,50],[340,45],[30,90],[370,85],[200,20]].map(([x,y],i) => (
          <text key={i} x={x} y={y} fontSize="16" textAnchor="middle" opacity="0.85">✨</text>
        ))}
      </svg>
    ),
  },
  {
    id: "hearts",
    label: "Сердечки",
    emoji: "💕",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Сердечки вокруг лица */}
        {[
          [50, 80, 22, "#f43f5e"],
          [340, 70, 18, "#fb7185"],
          [80, 200, 16, "#f9a8d4"],
          [310, 210, 20, "#f43f5e"],
          [200, 25, 24, "#fb7185"],
          [130, 50, 14, "#fda4af"],
          [265, 45, 14, "#fda4af"],
        ].map(([x, y, s, c], i) => (
          <text key={i} x={x} y={y} fontSize={s} textAnchor="middle" fill={c as string} opacity="0.88">♥</text>
        ))}
        {/* Румянец на щеках */}
        <ellipse cx="125" cy="185" rx="32" ry="16" fill="#fda4af" opacity="0.35" />
        <ellipse cx="275" cy="185" rx="32" ry="16" fill="#fda4af" opacity="0.35" />
      </svg>
    ),
  },
  {
    id: "glitter",
    label: "Блёстки",
    emoji: "✨",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Блестящие звёзды рассыпаны по лицу */}
        {[
          [60,40,20],[350,35,18],[30,150,14],[370,160,16],
          [140,30,12],[260,25,12],[200,15,18],[100,90,10],
          [300,85,10],[80,240,14],[320,245,14],[200,260,12],
          [155,75,8],[245,70,8],[200,85,10],
        ].map(([x,y,s],i)=>(
          <text key={i} x={x} y={y} fontSize={s} textAnchor="middle" opacity={0.6 + (i%4)*0.1}>⭐</text>
        ))}
        {/* Золотые блики */}
        <ellipse cx="148" cy="122" rx="6" ry="3" fill="#fbbf24" opacity="0.5" transform="rotate(-30 148 122)" />
        <ellipse cx="252" cy="122" rx="6" ry="3" fill="#fbbf24" opacity="0.5" transform="rotate(30 252 122)" />
        <ellipse cx="200" cy="95" rx="5" ry="2" fill="#fbbf24" opacity="0.4" />
      </svg>
    ),
  },
  {
    id: "bunny",
    label: "Зайка",
    emoji: "🐰",
    overlay: (
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Заячьи уши */}
        <ellipse cx="145" cy="35" rx="22" ry="50" fill="white" opacity="0.9" />
        <ellipse cx="255" cy="35" rx="22" ry="50" fill="white" opacity="0.9" />
        <ellipse cx="145" cy="35" rx="12" ry="38" fill="#fda4af" opacity="0.75" />
        <ellipse cx="255" cy="35" rx="12" ry="38" fill="#fda4af" opacity="0.75" />
        {/* Нос */}
        <ellipse cx="200" cy="170" rx="7" ry="5" fill="#f472b6" opacity="0.9" />
        {/* Усики */}
        <line x1="120" y1="168" x2="190" y2="172" stroke="#e879f9" strokeWidth="1.5" opacity="0.7" />
        <line x1="120" y1="176" x2="190" y2="175" stroke="#e879f9" strokeWidth="1.5" opacity="0.7" />
        <line x1="280" y1="168" x2="210" y2="172" stroke="#e879f9" strokeWidth="1.5" opacity="0.7" />
        <line x1="280" y1="176" x2="210" y2="175" stroke="#e879f9" strokeWidth="1.5" opacity="0.7" />
        {/* Румянец */}
        <ellipse cx="128" cy="183" rx="28" ry="14" fill="#fda4af" opacity="0.3" />
        <ellipse cx="272" cy="183" rx="28" ry="14" fill="#fda4af" opacity="0.3" />
      </svg>
    ),
  },
];

interface FaceMasksProps {
  activeMask: string;
  onChange: (id: string) => void;
}

export default function FaceMasks({ activeMask, onChange }: FaceMasksProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 w-max">
      {masks.map((mask) => (
        <button
          key={mask.id}
          onClick={() => onChange(mask.id)}
          className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all shrink-0 ${
            activeMask === mask.id
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground"
          }`}
        >
          <span className="text-xl">{mask.emoji}</span>
          <span className="text-xs">{mask.label}</span>
        </button>
      ))}
    </div>
  );
}

export { masks };
export type { Mask };
