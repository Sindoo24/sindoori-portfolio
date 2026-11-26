import type { ComponentType } from 'react';
import { Database, DatabaseZap, Network, Webhook } from 'lucide-react';
import { FaAws, FaJava } from 'react-icons/fa';
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiGooglegemini,
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiQwen,
  SiStreamlit,
} from 'react-icons/si';

type Icon = ComponentType<any>;

type Tool = { label: string; Icon: Icon; color: string };

const ITEMS: Tool[] = [
  { label: 'Python', Icon: SiPython, color: '#3776AB' },
  { label: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C' },
  { label: 'LangGraph', Icon: SiLanggraph, color: '#5B6EF5' },
  { label: 'LangChain', Icon: SiLangchain, color: '#1F3A34' },
  { label: 'RAG', Icon: DatabaseZap, color: '#2F8F83' },
  { label: 'FastAPI', Icon: SiFastapi, color: '#009485' },
  { label: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
  { label: 'Docker', Icon: SiDocker, color: '#2496ED' },
  { label: 'AWS', Icon: FaAws, color: '#FF9900' },
  { label: 'Java', Icon: FaJava, color: '#007396' },
  { label: 'SQL', Icon: Database, color: '#4B6B93' },
  { label: 'REST APIs', Icon: Webhook, color: '#6B7280' },
  { label: 'Git', Icon: SiGit, color: '#F05032' },
  { label: 'Linux', Icon: SiLinux, color: '#111111' },
  { label: 'Streamlit', Icon: SiStreamlit, color: '#FF4B4B' },
  { label: 'Gemini', Icon: SiGooglegemini, color: '#4285F4' },
  { label: 'Qwen', Icon: SiQwen, color: '#8A2BE2' },
  { label: 'OpenTelemetry', Icon: Network, color: '#FF6B4A' },
];

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

const TILES = ITEMS.map((item, i) => {
  const y = 1 - (i / (ITEMS.length - 1)) * 2;
  const ring = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN * i;
  const x = Math.cos(theta) * ring;
  const z = Math.sin(theta) * ring;
  return {
    ...item,
    rotateX: -Math.asin(y) * (180 / Math.PI),
    rotateY: Math.atan2(x, z) * (180 / Math.PI),
  };
});

export default function Arsenal() {
  return (
    <div className="arsenal-scene" aria-label="Technical arsenal">
      <div className="arsenal-tilt">
        <div className="arsenal-pile">
          {TILES.map(({ label, Icon: TileIcon, color, rotateX, rotateY }) => (
            <div
              key={label}
              className="arsenal-tile"
              style={{
                transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(var(--arsenal-radius, 210px))`,
              }}
              title={label}
            >
              <TileIcon className="h-8 w-8" style={{ color }} aria-hidden={true} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
