import { useId } from 'react';

/** Small original illustrated avatar with a gentle blink. */
export default function NavAvatar() {
  const id = useId().replace(/:/g, '');
  const bg = `${id}-bg`;
  const rim = `${id}-rim`;
  const clip = `${id}-clip`;

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <radialGradient id={bg} cx="40%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#1B3568" />
          <stop offset="65%" stopColor="#0A1530" />
          <stop offset="100%" stopColor="#050912" />
        </radialGradient>
        <linearGradient id={rim} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C6DAFF" />
          <stop offset="55%" stopColor="#34C77B" />
          <stop offset="100%" stopColor="#1FA363" />
        </linearGradient>
        <clipPath id={clip}>
          <circle cx="32" cy="32" r="31" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <circle cx="32" cy="32" r="31" fill={`url(#${bg})`} />
        <path d="M10 38C8 19 19 8 32 8s24 11 22 30l3 26H7z" fill="#101827" />
        <path d="M8 64c2-11 11-16 24-16s22 5 24 16z" fill="#1B2E50" />
        <path d="M23 49l9 9 9-9" stroke="#34C77B" strokeOpacity="0.7" strokeWidth="1.4" />
        <ellipse cx="32" cy="31" rx="14.5" ry="17.5" fill="#E8B69B" />
        <ellipse cx="32" cy="31" rx="14.5" ry="17.5" fill="#B76C63" fillOpacity="0.12" />
        <path d="M17 26C18 14 25 9 33 9c9 0 15 6 15 17-5-5-10-7-15-6-6 1-11 3-16 6z" fill="#141D30" />
        <path d="M17 24c-2 9-2 18 1 25l4-2c-2-8-2-15 0-22z" fill="#141D30" />
        <path d="M47 24c2 9 2 18-1 25l-4-2c2-8 2-15 0-22z" fill="#141D30" />
        <g className="nav-avatar-eyes">
          <ellipse cx="26" cy="31" rx="2.5" ry="3.2" fill="#101827" />
          <ellipse cx="38" cy="31" rx="2.5" ry="3.2" fill="#101827" />
          <circle cx="26.8" cy="30" r="0.8" fill="#E6F1FF" />
          <circle cx="38.8" cy="30" r="0.8" fill="#E6F1FF" />
        </g>
        <path d="M23.5 25.5c1.6-1 3.7-1 5.2 0M35.3 25.5c1.6-1 3.7-1 5.2 0" stroke="#3B2A2A" strokeWidth="1" strokeLinecap="round" />
        <path d="M28.5 39.5c2.2 2 4.8 2 7 0" stroke="#9B5C50" strokeWidth="1.3" strokeLinecap="round" />
      </g>
      <circle cx="32" cy="32" r="31" stroke={`url(#${rim})`} strokeWidth="1.4" />
    </svg>
  );
}
