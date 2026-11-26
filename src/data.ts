export const experience = [
  {
    period: 'MAY 2026 — AUG 2026',
    type: 'Research · Internship',
    role: 'AI Research Intern',
    company: 'Aesora Inc',
    summary: 'Research and prototyping at the intersection of LLM agents and production systems.',
    bullets: [
      'Built and evaluated agentic workflows that plan, reason, and execute multi-step tasks.',
      'Designed retrieval and evaluation pipelines to measure grounding quality and reliability.',
      'Turned research prototypes into documented, production-ready services with the engineering team.',
    ],
    tech: ['LLMs', 'LangGraph', 'RAG', 'Python', 'FastAPI'],
  },
  {
    period: 'FEB 2026 — APR 2026',
    type: 'Product · Internship',
    role: 'AI / Developer Intern',
    company: 'Qualitia Software',
    summary: 'Shipped AI-assisted features inside an established test automation platform.',
    bullets: [
      'Integrated LLM capabilities into existing product workflows and internal tooling.',
      'Developed backend services and APIs with Python and FastAPI.',
      'Collaborated with product and QA to reduce manual test-authoring effort.',
    ],
    tech: ['Python', 'FastAPI', 'LLMs', 'PostgreSQL', 'Docker'],
  },
];

export const projects = [
  {
    index: '01',
    title: 'Autonomous Software Engineering Agent',
    meta: 'AI / ML',
    year: '2025',
    variant: 1,
    badge: 'Flagship',
    blurb:
      'A multi-agent system that plans, writes, tests, and iterates on code end to end — with sandboxed execution and tracing for every run.',
    tags: ['LangGraph', 'Qwen', 'FastAPI', 'PostgreSQL', 'Docker'],
  },
  {
    index: '02',
    title: 'Multimodal RAG System',
    meta: 'AI / ML',
    year: '2025',
    variant: 2,
    blurb:
      'Grounded answers across text, images, and PDFs using CLIP embeddings, FAISS retrieval, and Gemini generation.',
    tags: ['FAISS', 'CLIP', 'Gemini', 'Streamlit'],
  },
  {
    index: '03',
    title: 'FuelBlend AI',
    meta: 'AI / ML',
    year: '2025',
    variant: 3,
    badge: 'Shell 2025 · Runner-up',
    blurb:
      'An ML model that optimizes sustainable aviation fuel blends — runner-up at Shell Global Hackathon 2025 among 7,000+ participants.',
    tags: ['TabPFN', 'Machine Learning', 'Sustainable Aviation Fuel'],
  },
  {
    index: '04',
    title: 'AI Image Captioning Model',
    meta: 'Computer Vision',
    year: '2025',
    variant: 4,
    blurb:
      'Offline AI image captioning system using BLIP & ViT-GPT2 with validated 45% semantic accuracy.',
    overview:
      'Locally hosted production-ready captions in real time, validated against Flickr8k (8,000+ images) for metadata tagging and accessibility.',
    tags: ['Python 3.9+', 'PyTorch 2.0', 'Streamlit', 'BLIP', 'ViT-GPT2'],
  },
  {
    index: '05',
    title: 'CHECKERS-AI',
    meta: 'Systems',
    year: '2025',
    variant: 5,
    blurb:
      'An AI-powered Checkers game implementing the Minimax algorithm for strategic decision-making, built with Python and Pygame.',
    overview:
      'Human vs AI on an 8×8 grid, with recursive game-tree search, deep recursion, and heuristic evaluation of board configurations.',
    tags: ['Python', 'Pygame', 'Minimax', 'Game Theory'],
  },
  {
    index: '06',
    title: 'More on GitHub',
    meta: 'Elsewhere',
    year: '2026',
    variant: 6,
    blurb:
      'More experiments, notes and repositories from the same workbench.',
    tags: ['GitHub', 'Open source'],
  },
];

export const contact = {
  email: 'keshamonisaisindoori@gmail.com',
  github: 'https://github.com/Sindoo24',
  githubLabel: 'github.com/Sindoo24',
  linkedin: 'https://linkedin.com/in/sindoori684',
  linkedinLabel: 'linkedin.com/in/sindoori684',
};

export const hackathons = [
  {
    title: 'Runner-up — Shell.AI Hackathon',
    detail: 'Shell Global Hackathon 2025, placed among 7,000+ participants.',
    icon: 'award',
  },
  {
    title: 'Winner — Ideathon at Sreays',
    detail: 'First place at the Ideathon hosted by Sreays.',
    icon: 'trophy',
  },
];
