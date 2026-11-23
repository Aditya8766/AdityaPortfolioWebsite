import { useEffect } from 'react';

const siteUrl = 'https://aditya-portfolio-website-five.vercel.app';
const keywords = [
  'freelance web developer Pune',
  'web developer Pune',
  'website development Pune',
  'business website development',
  'landing page developer',
  'React developer Pune',
  'JavaScript developer India',
  'Node.js developer India',
  'full stack web developer',
  'custom web application development',
  'e-commerce website development',
  'dashboard development',
  'desktop application development',
  'Tauri React developer',
  'Three.js developer',
  'interactive 3D website',
  'portfolio website developer',
  'web development services Pune',
];

function setMeta(attribute, value, content) {
  let node = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, value);
    document.head.appendChild(node);
  }
  node.setAttribute('content', content);
}

function setCanonical(url) {
  let node = document.head.querySelector('link[rel="canonical"]');
  if (!node) {
    node = document.createElement('link');
    node.rel = 'canonical';
    document.head.appendChild(node);
  }
  node.href = url;
}

export default function SeoMeta() {
  useEffect(() => {
    const isProof = window.location.pathname.replace(/\/$/, '') === '/proof-of-work';
    const title = isProof ? 'Proof of Work | Aditya Bhosale — Freelance Web Developer' : 'Aditya Bhosale | Freelance Web Developer in Pune';
    const description = isProof
      ? 'Explore the proof of work behind Aditya Bhosale’s business systems, React applications, Node.js platforms, Tauri desktop software, and interactive frontend projects.'
      : 'Aditya Bhosale is a freelance web developer in Pune building business websites, landing pages, React applications, and Node.js products for modern businesses.';
    const canonical = `${siteUrl}${isProof ? '/proof-of-work' : '/'}`;
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'author', 'Aditya Bhosale');
    setMeta('name', 'keywords', keywords.join(', '));
    setMeta('name', 'robots', 'index, follow, max-image-preview:large');
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Aditya Bhosale Portfolio');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', `${siteUrl}/myImg.png`);
    setMeta('property', 'og:image:alt', 'Aditya Bhosale — freelance web developer in Pune');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', `${siteUrl}/myImg.png`);
    setCanonical(canonical);
    let schema = document.head.querySelector('#portfolio-schema');
    if (!schema) {
      schema = document.createElement('script');
      schema.id = 'portfolio-schema';
      schema.type = 'application/ld+json';
      document.head.appendChild(schema);
    }
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': ['Person', 'ProfessionalService'],
      name: 'Aditya Bhosale',
      url: siteUrl,
      image: `${siteUrl}/myImg.png`,
      jobTitle: 'Freelance Web Developer',
      description,
      keywords,
      address: { '@type': 'PostalAddress', addressLocality: 'Pune', addressCountry: 'IN' },
      areaServed: ['Pune', 'India'],
      knowsAbout: ['React', 'JavaScript', 'Node.js', 'Business website development', 'Landing page development', 'Full-stack development', 'E-commerce development', 'Dashboard development', 'Three.js', 'Tauri'],
      sameAs: ['https://github.com/Aditya8766', 'https://www.linkedin.com/in/aditya-bhosale-107682249/', 'https://www.youtube.com/@BhatakyaDeveloper'],
      offers: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom website and web application development' } },
    });
  }, []);
  return null;
}
