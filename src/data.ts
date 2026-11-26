export const experience = [
  {
    period: '2025',
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
    period: '2024',
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
    meta: 'Agentic systems',
    badge: 'Flagship',
    blurb:
      'A multi-agent system that plans, writes, tests, and iterates on code end to end — with sandboxed execution and tracing for every run.',
    tags: ['LangGraph', 'Qwen', 'FastAPI', 'PostgreSQL', 'Docker', 'OpenTelemetry'],
  },
  {
    index: '02',
    title: 'Multimodal RAG System',
    meta: 'Retrieval & generation',
    blurb:
      'Grounded answers across text, images, and PDFs using CLIP embeddings, FAISS retrieval, and Gemini generation.',
    tags: ['FAISS', 'CLIP', 'Gemini', 'Streamlit'],
  },
  {
    index: '03',
    title: 'FuelBlend AI',
    meta: 'Applied ML',
    badge: 'Shell 2025 · Runner-up',
    blurb:
      'An ML model that optimizes sustainable aviation fuel blends — runner-up at Shell Global Hackathon 2025 among 7,000+ participants.',
    tags: ['TabPFN', 'Machine Learning', 'Sustainable Aviation Fuel'],
  },
  {
    index: '04',
    title: 'AI Image Captioning Model',
    meta: 'Computer vision',
    blurb:
      'Offline AI image captioning system using BLIP & ViT-GPT2 with validated 45% semantic accuracy.',
    overview:
      'This project implements a locally hosted, production-ready AI application capable of generating descriptive captions for images in real-time. It leverages state-of-the-art Vision-Language models (BLIP and ViT-GPT2) to interpret visual scenes and convert them into natural language. The system includes a robust evaluation pipeline validated against the Flickr8k dataset (8,000+ images), achieving industry-standard performance metrics suitable for automated metadata tagging and accessibility tools.',
    tags: ['Python 3.9+', 'PyTorch 2.0', 'Streamlit', 'BLIP', 'ViT-GPT2'],
  },
  {
    index: '05',
    title: 'CHECKERS-AI',
    meta: 'Game AI',
    blurb:
      'An AI-powered Checkers game implementing the Minimax algorithm for strategic decision-making, built with Python and Pygame.',
    overview:
      'This project is a fully functional implementation of the classic board game Checkers, developed using Python and Pygame, where a human player competes against an intelligent AI on an 8×8 grid. At the core of the project lies the Minimax Algorithm, a recursive decision-making strategy rooted in Game Theory. The AI evaluates moves to maximize its own advantages while assuming the opponent plays optimally to minimize it. Beyond gameplay, the application demonstrates key theoretical concepts such as efficient game loop management, deep recursion for tree traversal, and heuristic evaluation of complex board configurations.',
    tags: ['Python', 'Pygame', 'Minimax', 'Game Theory'],
  },
];

export const stacks = [
  { label: 'AI & Machine Learning', items: ['Python', 'PyTorch', 'Machine Learning', 'Deep Learning', 'NLP', 'LLMs', 'LangGraph', 'LangChain', 'RAG', 'TabPFN'] },
  { label: 'Engineering', items: ['FastAPI', 'PostgreSQL', 'Docker', 'AWS', 'Java', 'SQL', 'REST APIs', 'OpenTelemetry'] },
  { label: 'Tools & Frameworks', items: ['Git', 'Linux', 'Streamlit', 'FAISS', 'CLIP', 'Gemini', 'Qwen', 'Jupyter'] },
];

export const contact = {
  email: 'keshamonisaisindoori@gmail.com',
  github: 'https://github.com/Sindoo24',
  githubLabel: 'github.com/Sindoo24',
  linkedin: 'https://linkedin.com/in/sindoori684',
  linkedinLabel: 'linkedin.com/in/sindoori684',
};
