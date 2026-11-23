import '../proof.css';

const flagshipProjects = [
  {
    number: '01',
    kind: 'CLIENT PROJECT / BUSINESS SYSTEM',
    title: 'Class Management System',
    intro: 'A complete operating system for coaching and education businesses—from the first enquiry to admissions, attendance, exams, fees, receipts, and cancellation workflows.',
    stack: ['React', 'Node.js', 'Google Forms', 'PDF generation'],
    proof: ['End-to-end workflow design', 'Role-based operational screens', 'Automated communication and documents'],
    workflowLabel: 'ONE WORKFLOW / FROM ENQUIRY TO REPORT',
    workflow: [
      ['01', 'Enquiry', 'Import Google Form entries, see totals, disable already-added entries, and move new enquiries into the next stage.'],
      ['02', 'Demo session', 'Track demo sessions, test results, cancellations, and promotion-list movement without losing the enquiry history.'],
      ['03', 'Admission', 'Confirm student, academic year, course, batch, fees, discount, instalment, and received amount in one admission flow.'],
      ['04', 'Daily operations', 'Manage attendance, OCR-ready student photos, test marks, absent notifications, fee status, and student-level history.'],
      ['05', 'Reports & documents', 'Generate welcome notes, receipts, global reports, student reports, exports, and communication-ready summaries.'],
    ],
  },
  {
    number: '02',
    kind: 'LOCAL-FIRST / DESKTOP APPLICATION',
    title: 'Personal Finance Desktop',
    intro: 'A Tauri + React desktop application for turning bank statements into useful, reviewable financial records without sending a user’s data to a subscription service.',
    stack: ['Tauri', 'React', 'OCR', 'Local data processing', 'Excel export'],
    proof: ['Bank statement import', 'OCR fallback for scanned statements', 'Expense remarks and categorisation', 'CA-ready Excel export'],
    detail: 'The product is designed around a local-first workflow: add a company, import its statement, parse the data, correct or annotate expenses, then export a clean report for a CA. The business model is a one-time platform amount rather than a recurring subscription.',
    workflowLabel: 'ONE WORKFLOW / FROM STATEMENT TO CA-READY REPORT',
    workflow: [
      ['01', 'Add company', 'Create a company workspace locally and keep its financial records separated for review.'],
      ['02', 'Import statement', 'Upload a bank statement and let the parser extract transactions; use OCR when the source is a scanned document.'],
      ['03', 'Review & annotate', 'Check parsed entries, add expense types or remarks, and correct details before finalising the record.'],
      ['04', 'Build the report', 'Organise transactions into a clean financial view with totals and categorised expenses ready for review.'],
      ['05', 'Export for CA', 'Generate an Excel file that can be shared with a CA without requiring a recurring cloud subscription.'],
    ],
  },
  {
    number: '03',
    kind: 'PLATFORM / MULTI-TENANT E-COMMERCE',
    title: 'Multi-tenant Commerce Platform',
    intro: 'A platform where multiple shops can register, manage inventory, and get a storefront rendered from the same system with their own slug and product catalogue.',
    stack: ['React', 'Node.js', 'Multi-tenancy', 'Inventory', 'Dynamic storefronts'],
    proof: ['Super-admin and shop tenancy model', 'Slug-based storefront rendering', 'Per-shop product updates', 'Inventory-oriented commerce flow'],
    detail: 'The core challenge is separating each shop’s data and storefront experience while keeping one maintainable platform. A registered shop receives its own identity and public store route; catalogue changes then flow into that rendered storefront.',
    workflowLabel: 'ONE WORKFLOW / FROM SHOP REGISTRATION TO STOREFRONT',
    workflow: [
      ['01', 'Super admin', 'The platform owner registers or manages shops and controls the shared commerce environment.'],
      ['02', 'Shop registration', 'A shop creates its tenant identity and receives a unique slug for its public storefront.'],
      ['03', 'Inventory setup', 'The shop adds and manages products, stock information, and catalogue details inside its own workspace.'],
      ['04', 'Storefront render', 'The public website resolves the shop slug and renders the correct store with its current products.'],
      ['05', 'Keep in sync', 'When a shop updates its inventory or products, the storefront reflects the latest tenant-specific catalogue.'],
    ],
  },
];

const otherProjects = [
  {
    kind: '3D / FRONTEND EXPERIMENT',
    title: 'Kalpit Universe',
    text: 'An interactive 3D study of the universe built to explore spatial UI, storytelling, camera movement, and educational interaction.',
    stack: ['React', 'Three.js', '3D interaction'],
    link: 'https://kalpit-universe.vercel.app',
    label: 'Explore universe',
  },
  {
    kind: '3D / GAME EXPERIENCE',
    title: 'Space Shooter Game',
    text: 'A browser game used to showcase real-time rendering, collision handling, particles, responsive controls, and interactive enemy behaviour.',
    stack: ['React', 'Three.js', 'JavaScript', 'Game logic'],
    link: 'https://space-shooter-game-pi.vercel.app/',
    label: 'Play demo',
  },
  {
    kind: 'EDUCATION / FULL-STACK PROJECT',
    title: 'DevCode IDE',
    text: 'A college project shaped as a coding studio for students: an end-to-end environment for writing, running, and learning through code in the browser.',
    stack: ['React', 'Node.js', 'Code editor', 'Full-stack'],
    link: 'https://dev-code-ide-client.vercel.app/',
    label: 'Open demo',
  },
];

const companyProjects = [
  {
    kind: 'RELEASED PRODUCT / EMPLOYEE WORK',
    title: 'A2Z List App',
    text: 'A released list and discovery product built as part of my work at Praise Array. I contributed to the React Native and Node.js product experience, supported by AWS services.',
    stack: ['React Native', 'Node.js', 'AWS'],
    link: 'https://a2zlistapp.com/',
    label: 'Visit product site',
  },
  {
    kind: 'CONFIDENTIAL COMPANY PROJECT',
    title: 'Feedback Management',
    text: 'A private company system for collecting feedback through forms, managing submissions in structured React and AG Grid tables, and publishing the right feedback back to the relevant users or clients.',
    stack: ['React', 'AG Grid', 'Forms', 'Tables'],
    label: 'Private project',
  },
];

function Tags({ items }) {
  return <div className="proof-tags">{items.map(item => <span key={item}>{item}</span>)}</div>;
}

function FlagshipCard({ project }) {
  return <article className="proof-flagship">
    <div className="proof-card-top"><span>{project.number} / {project.kind}</span><span>CASE STUDY</span></div>
    <div className="proof-card-heading"><div><h2>{project.title}</h2><p className="proof-intro">{project.intro}</p></div><span className="proof-index">{project.number}</span></div>
    <Tags items={project.stack} />
    <div className="proof-card-grid"><div><span className="proof-eyebrow">WHAT THIS PROVES</span><ul>{project.proof.map(item => <li key={item}>{item}</li>)}</ul></div>{project.detail && <p className="proof-detail">{project.detail}</p>}{project.live && <a className="proof-outline-link" href={project.live} target="_blank" rel="noreferrer">View project <span>↗</span></a>}</div>
    {project.workflow && <div className="proof-workflow"><div className="proof-eyebrow">{project.workflowLabel || 'ONE WORKFLOW / FROM ENQUIRY TO REPORT'}</div><div className="workflow-grid">{project.workflow.map(([step, title, text]) => <div className="workflow-step" key={step}><span>{step}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div>}
  </article>;
}

export default function ProofOfWork() {
  return <div className="proof-page">
    <section className="proof-hero"><div className="proof-hero-grid" /><div className="proof-hero-copy"><span className="proof-eyebrow">07 / PROOF OF WORK</span><h1>Systems that make<br /><em>work visible.</em></h1><p>I build products around real workflows—not just screens. Here is the thinking, product structure, and technical range behind my work.</p><div className="proof-hero-links"><a className="primary-link" href="#flagship-work">Explore the work <span>↓</span></a><a className="quiet-link" href="/#contact">Start a conversation <span>↗</span></a></div></div><div className="proof-hero-meta"><span>BUSINESS SYSTEMS</span><span>LOCAL-FIRST PRODUCTS</span><span>INTERACTIVE FRONTENDS</span></div></section>
    <section className="chapter proof-section" id="flagship-work"><div className="chapter-label"><span>01 / FLAGSHIP SYSTEMS</span><span>WORKFLOW BEFORE DECORATION</span></div><div className="proof-section-heading"><h2>Software that follows<br /><em>the real operation.</em></h2><p>These projects are about reducing manual work, keeping records connected, and giving people a clear next action.</p></div><div className="proof-flagship-list">{flagshipProjects.map(project => <FlagshipCard key={project.title} project={project} />)}</div></section>
    <section className="chapter proof-section company-work"><div className="chapter-label"><span>02 / PRAISE ARRAY ORGANIZATION</span><span>WORK COMPLETED AS AN EMPLOYEE</span></div><div className="proof-section-heading"><h2>Products built<br /><em>with a team.</em></h2><p>Selected company work from my role as a Software Developer at Praise Array. Some implementation details remain private, while the product responsibilities and public evidence stay visible.</p></div><div className="proof-other-grid">{companyProjects.map(project => <article className="proof-other-card" key={project.title}><span className="proof-eyebrow">{project.kind}</span><h3>{project.title}</h3><p>{project.text}</p><Tags items={project.stack} />{project.link ? <a className="text-link" href={project.link} target="_blank" rel="noreferrer">{project.label} ↗</a> : <span className="proof-private">{project.label}</span>}</article>)}</div></section>
    <section className="chapter proof-section proof-experiments"><div className="chapter-label"><span>03 / FRONTEND & INTERACTION</span><span>THE INTERFACE AS A PLACE TO EXPLORE</span></div><div className="proof-section-heading"><h2>Playful surfaces.<br /><em>Serious craft.</em></h2><p>3D scenes, game mechanics, and visual systems that demonstrate how I think through interaction.</p></div><div className="proof-other-grid">{otherProjects.map(project => <article className="proof-other-card" key={project.title}><span className="proof-eyebrow">{project.kind}</span><h3>{project.title}</h3><p>{project.text}</p><Tags items={project.stack} />{project.link ? <a className="text-link" href={project.link} target="_blank" rel="noreferrer">{project.label} ↗</a> : <span className="proof-private">{project.label}</span>}</article>)}</div></section>
    <section className="chapter proof-close"><div className="chapter-label"><span>03 / THE COMMON THREAD</span><span>FROM IDEA TO INTERFACE</span></div><div className="proof-close-layout"><h2>Useful first.<br /><em>Beautiful where it matters.</em></h2><p>Across desktop applications, business platforms, released products, and interactive experiments, my focus is the same: understand the workflow, design the system, then make the experience feel clear.</p><a className="primary-link" href="/#contact">Talk about a project <span>↗</span></a></div></section>
  </div>;
}
