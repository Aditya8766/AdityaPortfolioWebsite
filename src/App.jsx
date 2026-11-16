import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import About from './components/About';
import Resume from './components/Resume';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DynamicFavicon from './components/DynamicFavicon';
import TourHero from './components/TourHero';
import TourNavigation from './components/TourNavigation';
import ProjectLab from './components/ProjectLab';
import TechnicalUniverse from './components/TechnicalUniverse';
import './universe.css';
import Testimonials from './components/Testimonials';
export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setMotionEnabled(!media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('arrived'); observer.unobserve(entry.target); }
    }), { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.chapter').forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [motionEnabled]);
  return <MotionConfig reducedMotion={motionEnabled ? 'user' : 'always'}><div className="universe-app">
    <a className="skip-link" href="#main">Skip to content</a><DynamicFavicon />
    <TourNavigation motionEnabled={motionEnabled} setMotionEnabled={setMotionEnabled} />
    <main id="main"><TourHero />
    <div className="signal-strip"><span>REACT DEVELOPER</span><i>✦</i><span>FULL STACK ENGINEER</span><i>✦</i><span>PROBLEM SOLVER</span><i>✦</i><span>FROM IDEA TO INTERFACE</span></div>
    <section className="chapter about-chapter" aria-label="About and career journey"><div className="chapter-label"><span>01 / THE PERSON BEHIND THE PIXELS</span><span>ORIGIN →</span></div><div className="editorial-heading"><h2>Curiosity is the<br /><em>starting point.</em></h2><p>From the first line of code to complete digital products. Explore the person, the practice, and the journey.</p></div><About /><details className="journey-details" open><summary><span>Career journey & education</span><span className="expand-mark">＋</span></summary><Resume /></details></section>
    <TechnicalUniverse /><ProjectLab />
    <section className="chapter original-projects" aria-label="Additional featured projects"><div className="chapter-label"><span>03.1 / MORE FROM THE LAB</span><span>CONTINUE EXPLORING ↘</span></div><Projects /></section>
    <section className="chapter reviews-chapter" aria-label="Client testimonials"><div className="chapter-label"><span>04 / HUMAN CONNECTIONS</span><span>WORDS THAT MATTER</span></div><Testimonials /></section>
    <section id="beyond" className="chapter beyond-chapter"><div className="chapter-label"><span>05 / BEYOND THE CODE</span><span>ALWAYS CURIOUS</span></div><div className="beyond-grid"><div><h2>A little wonder.<br /><em>A wider universe.</em></h2><p>Explore my study of the universe through Kalpit, or find me on YouTube as BhatakyaDeveloper.</p><a className="text-link" href="https://www.youtube.com/@BhatakyaDeveloper" target="_blank" rel="noreferrer">Beyond the editor · YouTube ↗</a></div><a className="universe-window" href="https://kalpit-universe.vercel.app" target="_blank" rel="noreferrer" aria-label="Explore Kalpit Universe"><div className="planet" /><span>KALPIT / A VIRTUAL UNIVERSE</span><b>Stay curious. ↗</b></a></div></section>
    <section className="chapter connect-chapter" aria-label="Collaboration and contact"><div className="chapter-label"><span>06 / NEXT DESTINATION</span><span>LET’S MAKE SOMETHING REAL</span></div><div className="connect-layout"><div className="connect-copy"><h2>Your next idea.<br /><em>Our next chapter.</em></h2><div className="connect-paths"><article><span className="eyebrow">FOR COMPANIES & RECRUITERS</span><h3>Build your team.</h3><p>Explore my experience and engineering work. Let’s talk about your next role.</p><a className="text-link" href="https://www.linkedin.com/in/aditya-bhosale-107682249/" target="_blank" rel="noreferrer">View professional profile ↗</a><a className="text-link" href="#experience">Explore experience ↓</a></article><article><span className="eyebrow">FOR FOUNDERS & CLIENTS</span><h3>Build your product.</h3><p>Web platforms, desktop applications, business systems, or interactive experiences. Tell me what you have in mind.</p><a className="text-link" href="#contact">Start a project inquiry ↗</a></article></div></div><Contact /></div></section>
    </main><Footer />
  </div></MotionConfig>;
}
