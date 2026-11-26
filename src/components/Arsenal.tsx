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

type Tool = {
  label: string;
  Icon: Icon;
  color: string;
  x: number;
  y: number;
  rot: number;
};

const ITEMS: Tool[] = [
  { label: 'Python', Icon: SiPython, color: '#3776AB', x: 42, y: 7, rot: -7 },
  { label: 'LangChain', Icon: SiLangchain, color: '#1F3A34', x: 67, y: 9, rot: 6 },
  { label: 'PyTorch', Icon: SiPytorch, color: '#EE4C2C', x: 19, y: 18, rot: -12 },
  { label: 'FastAPI', Icon: SiFastapi, color: '#009485', x: 50, y: 20, rot: 2 },
  { label: 'LangGraph', Icon: SiLanggraph, color: '#5B6EF5', x: 79, y: 25, rot: 10 },
  { label: 'Docker', Icon: SiDocker, color: '#2496ED', x: 10, y: 36, rot: 8 },
  { label: 'PostgreSQL', Icon: SiPostgresql, color: '#336791', x: 34, y: 35, rot: -4 },
  { label: 'AWS', Icon: FaAws, color: '#FF9900', x: 63, y: 39, rot: -8 },
  { label: 'Git', Icon: SiGit, color: '#F05032', x: 87, y: 45, rot: 14 },
  { label: 'Gemini', Icon: SiGooglegemini, color: '#4285F4', x: 20, y: 54, rot: -6 },
  { label: 'Java', Icon: FaJava, color: '#007396', x: 46, y: 53, rot: 5 },
  { label: 'Linux', Icon: SiLinux, color: '#111', x: 73, y: 59, rot: -10 },
  { label: 'Streamlit', Icon: SiStreamlit, color: '#FF4B4B', x: 12, y: 71, rot: 12 },
  { label: 'RAG', Icon: DatabaseZap, color: '#2F8F83', x: 38, y: 71, rot: -3 },
  { label: 'REST APIs', Icon: Webhook, color: '#6B7280', x: 65, y: 75, rot: 7 },
  { label: 'SQL', Icon: Database, color: '#4B6B93', x: 87, y: 71, rot: -12 },
  { label: 'Qwen', Icon: SiQwen, color: '#8A2BE2', x: 28, y: 87, rot: 6 },
  { label: 'OpenTelemetry', Icon: Network, color: '#FF6B4A', x: 58, y: 89, rot: -6 },
];

export default function Arsenal() {
  return (
    <div className="arsenal-scene" aria-label="Technical arsenal">
      <div className="arsenal-pile">
        {ITEMS.map(({ label, Icon: TileIcon, color, x, y, rot }, index) => (
          <div
            key={label}
            className="arsenal-tile"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              ['--tile-rot' as string]: `${rot}deg`,
              animationDelay: `${(index % 6) * -0.9}s`,
            }}
            title={label}
          >
            <TileIcon className="h-8 w-8" style={{ color }} aria-hidden={true} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
