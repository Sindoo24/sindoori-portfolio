import type { ComponentType } from 'react';
import {
  BrainCircuit,
  Database,
  DatabaseZap,
  Network,
  ScanSearch,
  Sparkles,
  Table2,
  Webhook,
} from 'lucide-react';
import { FaAws, FaJava } from 'react-icons/fa';
import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiGooglegemini,
  SiJupyter,
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiOpentelemetry,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiQwen,
  SiStreamlit,
} from 'react-icons/si';

type Icon = ComponentType<any>;

const ITEMS: Array<{ label: string; Icon: Icon }> = [
  { label: 'Python', Icon: SiPython },
  { label: 'PyTorch', Icon: SiPytorch },
  { label: 'LangGraph', Icon: SiLanggraph },
  { label: 'LangChain', Icon: SiLangchain },
  { label: 'RAG', Icon: DatabaseZap },
  { label: 'FastAPI', Icon: SiFastapi },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'Docker', Icon: SiDocker },
  { label: 'AWS', Icon: FaAws },
  { label: 'Java', Icon: FaJava },
  { label: 'SQL', Icon: Database },
  { label: 'REST APIs', Icon: Webhook },
  { label: 'OpenTelemetry', Icon: SiOpentelemetry },
  { label: 'Git', Icon: SiGit },
  { label: 'Linux', Icon: SiLinux },
  { label: 'Streamlit', Icon: SiStreamlit },
  { label: 'FAISS', Icon: ScanSearch },
  { label: 'CLIP', Icon: Network },
  { label: 'Gemini', Icon: SiGooglegemini },
  { label: 'Qwen', Icon: SiQwen },
  { label: 'Jupyter', Icon: SiJupyter },
  { label: 'Machine Learning', Icon: BrainCircuit },
  { label: 'Deep Learning', Icon: Sparkles },
  { label: 'TabPFN', Icon: Table2 },
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
        <div className="arsenal-sphere">
          {TILES.map(({ label, Icon: TileIcon, rotateX, rotateY }) => (
            <div
              key={label}
              className="arsenal-tile"
              style={{
                transform: `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(250px)`,
              }}
              title={label}
            >
              <TileIcon className="h-7 w-7" aria-hidden={true} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
