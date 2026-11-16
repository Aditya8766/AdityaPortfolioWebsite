import { useRef } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import CurrentYear from './CurrentYear';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function TourHero() {
  const portrait = useRef(null);
  function move(event) {
    if (document.documentElement.dataset.motion === 'off' || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    portrait.current.style.setProperty('--rx', `${((event.clientY - rect.top) / rect.height - .5) * -10}deg`);
    portrait.current.style.setProperty('--ry', `${((event.clientX - rect.left) / rect.width - .5) * 10}deg`);
  }
  function reset() { portrait.current.style.setProperty('--rx', '0deg'); portrait.current.style.setProperty('--ry', '0deg'); }
  return <section id="home" className="tour-hero"><div className="hero-grid" aria-hidden="true" /><div className="coordinate coordinate-top">AB / DIGITAL PORTFOLIO <span>PERSONAL DIGITAL UNIVERSE</span></div>
    <div className="hero-copy"><div className="availability"><i /> OPEN TO OPPORTUNITIES & COLLABORATIONS</div><p className="hero-intro">HELLO, WORLD. I’M</p><h1>Aditya<br /><span>Bhosale<span className="name-period">.</span></span></h1><div className="hero-role"><span className="small-cross">✳</span> Full Stack Engineer <span className="role-separator">/</span> Creative problem solver</div><p className="hero-lead">Turning complex ideas into<br /><strong>experiences that make a difference.</strong></p><div className="hero-buttons"><a className="primary-link" href="#about">Explore my journey <span>↘</span></a><a className="quiet-link" href="#lab">Selected work <span>↗</span></a></div><div className="hero-social"><a href="https://github.com/Aditya8766" target="_blank" rel="noreferrer"><GitHubIcon fontSize="small" />GitHub ↗</a><a href="https://www.linkedin.com/in/aditya-bhosale-107682249/" target="_blank" rel="noreferrer"><LinkedInIcon fontSize="small" />LinkedIn ↗</a><a href="#contact">Get in touch ↗</a></div></div>
    <div className="portrait-stage" onPointerMove={move} onPointerLeave={reset} ref={portrait}><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><span className="orbital-dot dot-one" /><span className="orbital-dot dot-two" /><div className="portrait-coordinate">AB / 001 <span>THE BUILDER</span></div><div className="portrait-frame"><img src="/myImg.png" alt="Aditya Bhosale, Full Stack Software Developer" fetchPriority="high" /><div className="portrait-shade" /><div className="portrait-caption"><span>DEVELOPER. EXPLORER. BUILDER.</span><b>Human at the core.</b></div></div><div className="floating-label label-react"><span>⚛</span><div>FRONTEND<b>React</b></div></div><div className="floating-label label-api"><span>⌘</span><div>BACKEND<b>Node.js · Python</b></div></div><div className="portrait-index"><span>01 — ∞</span><i /> BUILDING BEYOND THE ORDINARY</div></div>
    <div className="hero-bottom"><a href="#about"><span className="scroll-pill">↓</span> SCROLL TO EXPLORE</a><p>A journey through code, curiosity & creation.</p><span className="edition">PORTFOLIO / <CurrentYear /></span></div>
    <details className="original-intro"><summary>Read my introduction</summary><p>Passionate software developer building modern, scalable, and user-focused applications. I specialize in React, Node.js, Python, and FastAPI, creating seamless digital experiences that combine responsive interfaces, robust backend systems, and intelligent data-driven workflows. From performant front-end architecture to API integration and AI-assisted solutions, I focus on delivering reliable products that scale across devices and real-world use cases.</p><p>React Developer · Full Stack Engineer · Problem Solver</p></details>
  </section>;
}
