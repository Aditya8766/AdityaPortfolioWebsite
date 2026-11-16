import { useEffect, useState } from 'react';
const chapters = [['home', 'Welcome'], ['about', 'Journey'], ['skills', 'Skills'], ['lab', 'Projects'], ['testimonials', 'Testimonials'], ['contact', 'Connect']];
export default function TourNavigation({ motionEnabled, setMotionEnabled }) {
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    chapters.forEach(([id]) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  return <><header className="tour-header"><a href="#home" className="wordmark" aria-label="Aditya.dev home"><span className="brand-symbol">a<span>.</span></span><span>ADITYA<span className="wordmark-dev">.DEV</span></span></a><nav className={open ? 'top-nav open' : 'top-nav'} aria-label="Main navigation">{chapters.slice(1, 5).map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}</nav><div className="header-actions"><button className="motion-toggle" aria-label="Toggle animations" aria-pressed={motionEnabled} onClick={() => setMotionEnabled(!motionEnabled)}>{motionEnabled ? '◉' : '◎'}<span> Motion {motionEnabled ? 'on' : 'off'}</span></button><a href="#contact" className="header-contact">Let’s talk <span>↗</span></a><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button></div></header><nav className="chapter-rail" aria-label="Tour chapters">{chapters.map(([id, label], index) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-label={`${index + 1}. ${label}`} aria-current={active === id ? 'location' : undefined}><span>{String(index).padStart(2, '0')}</span><i /><b>{label}</b></a>)}</nav></>;
}
