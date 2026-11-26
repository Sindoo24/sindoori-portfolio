import { useId } from 'react';

const LATITUDES = [42, 88, 134, 180];
const LONGITUDES = [42, 88, 134, 180];
const NODES = [
  { x: 300, y: 82, r: 3 },
  { x: 468, y: 206, r: 2.4 },
  { x: 430, y: 430, r: 2.8 },
  { x: 196, y: 382, r: 2.2 },
  { x: 142, y: 214, r: 2.6 },
];
const DUST = [
  [74, 168], [96, 402], [164, 92], [222, 528], [300, 54], [378, 520],
  [452, 96], [516, 268], [542, 408], [118, 296], [482, 348], [258, 62],
];

/**
 * A glowing, faceted golden orb drawn entirely in SVG.
 */
export default function GoldenOrb({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  const glow = `${id}-glow`;
  const core = `${id}-core`;
  const rim = `${id}-rim`;
  const soft = `${id}-soft`;
  const clip = `${id}-clip`;

  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id={glow}>
          <stop offset="0%" stopColor="#D8A24A" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#D8A24A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D8A24A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={core} cx="36%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#4A3212" />
          <stop offset="42%" stopColor="#2A1D0C" />
          <stop offset="78%" stopColor="#140F07" />
          <stop offset="100%" stopColor="#0A0806" />
        </radialGradient>
        <linearGradient id={rim} x1="90" y1="70" x2="500" y2="530" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE2A0" stopOpacity="0.9" />
          <stop offset="34%" stopColor="#E5B65C" stopOpacity="0.45" />
          <stop offset="72%" stopColor="#D8A24A" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#D8A24A" stopOpacity="0.04" />
        </linearGradient>
        <radialGradient id={soft}>
          <stop offset="0%" stopColor="#FFE2A0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFE2A0" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clip}>
          <circle cx="300" cy="300" r="218" />
        </clipPath>
      </defs>

      {/* atmosphere */}
      <circle cx="300" cy="300" r="298" fill={`url(#${glow})`} />
      <circle cx="300" cy="300" r="252" fill={`url(#${glow})`} opacity="0.55" />

      {/* orbit rings */}
      <g
        className="animate-gold-orbit"
        style={{ transformOrigin: '300px 300px', transformBox: 'view-box' }}
      >
        <ellipse
          cx="300"
          cy="300"
          rx="276"
          ry="112"
          stroke={`url(#${rim})`}
          strokeWidth="1"
          transform="rotate(-26 300 300)"
        />
        <circle cx="510" cy="183" r="2.6" fill="#FFE2A0" />
        <circle cx="510" cy="183" r="9" fill={`url(#${soft})`} />
      </g>
      <ellipse
        cx="300"
        cy="300"
        rx="246"
        ry="228"
        stroke="#E8C277"
        strokeOpacity="0.07"
        strokeDasharray="2 10"
      />

      {/* sphere */}
      <circle cx="300" cy="300" r="218" fill={`url(#${core})`} />
      <circle cx="300" cy="300" r="218" stroke={`url(#${rim})`} strokeWidth="1.4" />

      {/* wireframe */}
      <g
        clipPath={`url(#${clip})`}
        className="animate-gold-orb"
        style={{ transformOrigin: '300px 300px', transformBox: 'view-box' }}
      >
        {LATITUDES.map((ry) => (
          <ellipse
            key={`lat-${ry}`}
            cx="300"
            cy="300"
            rx="218"
            ry={ry}
            stroke="#E8C277"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
        ))}
        {LONGITUDES.map((rx) => (
          <ellipse
            key={`lon-${rx}`}
            cx="300"
            cy="300"
            rx={rx}
            ry="218"
            stroke="#E8C277"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
        ))}
        <circle cx="300" cy="300" r="218" stroke="#E8C277" strokeOpacity="0.1" />
      </g>

      {/* faceted highlights */}
      <path
        d="M300 82 A218 218 0 0 0 122 226 L300 300 Z"
        fill="#D8A24A"
        fillOpacity="0.07"
      />
      <path
        d="M122 226 A218 218 0 0 0 188 452 L300 300 Z"
        fill="#D8A24A"
        fillOpacity="0.05"
      />

      {/* glint */}
      <ellipse cx="212" cy="176" rx="78" ry="46" fill={`url(#${soft})`} opacity="0.55" transform="rotate(-34 212 176)" />

      {/* nodes */}
      {NODES.map((node) => (
        <g key={`${node.x}-${node.y}`}>
          <circle cx={node.x} cy={node.y} r={node.r * 4} fill={`url(#${soft})`} />
          <circle cx={node.x} cy={node.y} r={node.r} fill="#FFF0C8" />
        </g>
      ))}

      {/* dust */}
      {DUST.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={index % 3 === 0 ? 1.4 : 0.9}
          fill="#E8C277"
          opacity={index % 2 ? 0.32 : 0.18}
        />
      ))}
    </svg>
  );
}
