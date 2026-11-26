import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import NavAvatar from './NavAvatar';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#stack', label: 'Stack' },
  { href: '#contact', label: 'Contact' },
];

export default function TopBar() {
  const [active, setActive] = useState('');
  const [light, setLight] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    LINKS.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setLight(document.documentElement.dataset.mode === 'light');
  }, []);

  const toggleTheme = () => {
    const next = !light;
    setLight(next);
    document.documentElement.dataset.mode = next ? 'light' : 'dark';
    try {
      localStorage.setItem('sindoori-mode', next ? 'light' : 'dark');
    } catch {
      /* storage may be unavailable */
    }
  };

  return (
    <header className="topbar">
      <div className="topbar-pill">
        <a className="topbar-brand" href="./" aria-label="Sindoori — back to top">
          <span className="topbar-avatar">
            <NavAvatar />
            <span className="topbar-status" aria-hidden="true" />
          </span>
          <span className="topbar-name">Sindoori</span>
        </a>

        <nav className="topbar-links" aria-label="Portfolio">
          {LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href.slice(1) ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
            aria-pressed={light}
            className="topbar-theme"
          >
            {light ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a className="topbar-cta" href="#contact">
            Let&apos;s talk
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            className="topbar-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="topbar-mobile" aria-label="Mobile">
          {LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
