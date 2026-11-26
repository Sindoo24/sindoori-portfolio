import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import TopBar from './components/TopBar';
import GoldenOrb from './components/GoldenOrb';
import { contact, experience, projects, stacks } from './data';

const RING_DOTS = Array.from({ length: 96 }, (_, i) => {
  const angle = (i / 96) * Math.PI * 2 - Math.PI / 2;
  return {
    i,
    cx: Number((92 * Math.cos(angle)).toFixed(2)),
    cy: Number((92 * Math.sin(angle)).toFixed(2)),
  };
});



function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="sec-label">
      <span>{index}</span>
      <span>{label}</span>
    </p>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const reduceMotion = useReducedMotion();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <>
      <TopBar />
      <div className="site">
      <div className="page" data-phase="loading">
        <div className="stage" aria-hidden="true" />

        <div
          className="loader"
          role="progressbar"
          aria-label="Loading the dots"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        >
          <svg className="ring" viewBox="-110 -110 220 220" aria-hidden="true">
            {RING_DOTS.map(({ i, cx, cy }) => (
              <circle key={i} cx={cx} cy={cy} r={1.6} />
            ))}
          </svg>
          <span className="counter">000</span>
          <span className="label">66,000 dots</span>
        </div>

        <h1 className="hero-title hero-heading">
          <span>Hi I&apos;m</span>
          <span>
            Sindoori<span className="hero-dot">.</span>
          </span>
        </h1>
        <p className="hint">Move the light</p>
      </div>



      <main className="portfolio">
        <section id="about" className="section">
          <div className="section-inner">
            <SectionLabel index="01" label="About" />
            <div className="about-row">
              <div className="about-copy">
                <h2 className="section-title">
                  About <em>me.</em>
                </h2>
                <blockquote className="quote">
                  “Figuring it out is the <em>obsession.</em>”
                </blockquote>
              </div>
              <GoldenOrb className="about-orb" />
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-inner">
            <SectionLabel index="02" label="Experience" />
            <h2 className="section-title">
              Where I&apos;ve been <em>building.</em>
            </h2>
            <div className="timeline">
              {experience.map((role) => (
                <article className="role" key={role.company}>
                  <div className="role-meta">
                    <span className="role-period">{role.period}</span>
                    <span className="role-type">{role.type}</span>
                  </div>
                  <div className="role-body">
                    <h3>
                      {role.role} <em>at</em> <span className="sage">{role.company}</span>
                    </h3>
                    <p className="role-summary">{role.summary}</p>
                    <ul>
                      {role.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <div className="chips">
                      {role.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-inner">
            <SectionLabel index="03" label="Selected work" />
            <h2 className="section-title">
              Work that <em>ships.</em>
            </h2>
            <div className="project-single">
              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={projects[activeProject].index}
                  className="project-card"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  {(() => {
                    const project = projects[activeProject];
                    return (
                      <>
                        <div className={`project-visual visual-${project.variant}`}>
                          <span className="project-tagline">
                            {project.meta} <span>·</span> {project.year}
                          </span>
                          <span className="project-big-index">{project.index}</span>
                          {project.badge && <span className="project-badge">{project.badge}</span>}
                        </div>
                        <div className="project-body">
                          <div className="project-heading">
                            <h3>{project.title}</h3>
                            <a
                              href={contact.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`${project.title} on GitHub`}
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </a>
                          </div>
                          <p>{project.blurb}</p>
                          {project.overview && <p className="project-overview">{project.overview}</p>}
                          <div className="project-footer">
                            <div className="chips">
                              {project.tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                              ))}
                            </div>
                            <a
                              href={contact.github}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="GitHub"
                              className="project-github"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </motion.article>
              </AnimatePresence>

              <div className="project-nav" aria-label="Project navigation">
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() =>
                    setActiveProject((current) => (current - 1 + projects.length) % projects.length)
                  }
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="project-dots">
                  {projects.map((project, index) => (
                    <button
                      key={project.index}
                      type="button"
                      aria-label={`Show project ${project.index}`}
                      aria-current={index === activeProject ? 'true' : undefined}
                      onClick={() => setActiveProject(index)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() => setActiveProject((current) => (current + 1) % projects.length)}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="stack" className="section">
          <div className="section-inner">
            <SectionLabel index="04" label="Stack" />
            <h2 className="section-title">
              Tools of the <em>trade.</em>
            </h2>
            <div className="stack-grid">
              {stacks.map((group, index) => (
                <div className="stack-card" key={group.label}>
                  <div className="stack-head">
                    <h3>{group.label}</h3>
                    <span className="mono-label">0{index + 1}</span>
                  </div>
                  <div className="chips">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-inner">
            <SectionLabel index="05" label="Contact" />
            <h2 className="section-title">
              Let&apos;s build something <em>worth shipping.</em>
            </h2>
            <p className="contact-copy">
              Open to AI/ML roles, research collaborations, and ambitious side projects. My inbox is
              open.
            </p>
            <div className="contact-actions">
              <a className="contact-primary" href={`mailto:${contact.email}`}>
                Get in touch
              </a>
              <button className="contact-copy-btn" type="button" onClick={copyEmail}>
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
            <div className="contact-links">
              <a href={`mailto:${contact.email}`}>
                <span>Email</span>
                {contact.email}
              </a>
              <a href={contact.github} target="_blank" rel="noreferrer">
                <span>GitHub</span>
                {contact.githubLabel}
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <span>LinkedIn</span>
                {contact.linkedinLabel}
              </a>
            </div>
            <a className="back-top" href="./">
              ↑ Back to the dots
            </a>
          </div>
        </section>
        </main>

      <footer className="site-footer">
        <span>© 2026 Sindoori keshamoni</span>
        <span>66,000 dots · built with three.js</span>
      </footer>
      </div>
    </>
  );
}
