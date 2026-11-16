// Read-only browser checks against an already running Vite server and Chrome CDP.
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const targets = await (await fetch('http://127.0.0.1:9223/json')).json();
const target = targets.find(page => page.type === 'page' && page.url.includes('5173'));
if (!target) throw new Error('Open the Vite page in Chrome with remote debugging on port 9223.');
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
let id = 0;
const pending = new Map();
const errors = [];
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const handler = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) handler.reject(new Error(message.error.message));
    else handler.resolve(message.result);
  }
  if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(arg => arg.value || arg.description).join(' '));
});
function cdp(method, params = {}) {
  return new Promise((resolve, reject) => {
    const key = ++id;
    pending.set(key, { resolve, reject });
    socket.send(JSON.stringify({ id: key, method, params }));
  });
}
async function evaluate(expression) {
  const result = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
function assert(value, label) { if (!value) throw new Error(label); console.log(`PASS ${label}`); }
try {
  await cdp('Runtime.discardConsoleEntries');
  await cdp('Runtime.enable');
  await cdp('Page.enable');
  await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await cdp('Page.reload');
  await new Promise(resolve => setTimeout(resolve, 1500));
  await evaluate(`new Promise(resolve => { const poll = setInterval(() => { if(document.querySelectorAll('.repo-item').length) { clearInterval(poll); resolve(true); } },100); setTimeout(() => { clearInterval(poll); resolve(false); },15000); })`);
  assert(await evaluate(`document.querySelectorAll('h1').length === 1 && document.querySelector('h1').textContent.includes('Bhosale')`), 'hero rendered');
  assert(await evaluate(`document.querySelector('.portrait-frame img').naturalWidth > 0`), 'actual portrait loaded');
  assert(await evaluate(`Array.from(document.querySelectorAll('time')).every(node => Number(node.textContent) === new Date().getFullYear())`), 'hero and footer show the current year');
  await evaluate(`window.__realDate = Date; window.Date = class extends window.__realDate { constructor(...args) { super(...(args.length ? args : ['2028-01-01T12:00:00'])); } static now() { return new window.__realDate('2028-01-01T12:00:00').getTime(); } }; window.dispatchEvent(new Event('focus'));`);
  assert(await evaluate(`Array.from(document.querySelectorAll('time')).every(node => node.textContent === '2028')`), 'year updates after rollover without rebuilding');
  await evaluate(`window.Date = window.__realDate; delete window.__realDate; window.dispatchEvent(new Event('focus'));`);
  assert(await evaluate(`getComputedStyle(document.querySelector('.portrait-frame img')).animationName === 'portrait-breathe'`), 'portrait zoom animation enabled');
  assert(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), 'desktop has no horizontal overflow');
  assert(await evaluate(`document.body.textContent.includes('71 public repositories')`), '71 public repositories loaded');
  assert(await evaluate(`!document.querySelector('.repository-archive').open`), 'full repository archive stays optional');
  await evaluate(`document.querySelector('.repository-archive').open = true`);
  await evaluate(`document.querySelector('.project-visual-button').click()`);
  assert(await evaluate(`Boolean(document.querySelector('[role=dialog]'))`), 'project dialog opens');
  await evaluate(`document.querySelector('[aria-label="Close project details"]').click()`);
  await new Promise(resolve => setTimeout(resolve, 300));
  await evaluate(`document.querySelector('.skill-tabs button:nth-child(2)').click()`);
  assert(await evaluate(`document.querySelector('#skill-panel').textContent.includes('systems behind')`), 'technology ecosystem switches');
  await evaluate(`(() => { const input=document.querySelector('input[type=search]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'Kalpit'); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await new Promise(resolve => setTimeout(resolve, 200));
  assert(await evaluate(`document.querySelectorAll('.repo-item').length === 1 && document.querySelector('.repo-item').textContent.includes('Kalpit')`), 'repository search filters');
  await evaluate(`(() => { const input=document.querySelector('input[type=search]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,''); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await evaluate(`document.querySelector('[aria-label="Toggle animations"]').click()`);
  assert(await evaluate(`document.documentElement.dataset.motion === 'off'`), 'motion control disables animations');
  assert(await evaluate(`getComputedStyle(document.querySelector('.portrait-frame img')).animationName === 'none'`), 'motion control stops portrait zoom');
  await evaluate(`scrollTo(0,0)`);
  const desktop = await cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile(join(tmpdir(),'aditya-portfolio-desktop.png'), Buffer.from(desktop.data,'base64'));
  for (const width of [1687, 1440, 375, 768, 1024]) {
    await cdp('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    assert(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), `no horizontal overflow at ${width}px`);
    assert(await evaluate(`Array.from(document.querySelectorAll('#projects .MuiCard-root')).every(card => card.getBoundingClientRect().width > Math.min(250, innerWidth - 80))`), `project cards have readable widths at ${width}px`);
    assert(await evaluate(`Array.from(document.querySelectorAll('#projects .MuiCardContent-root')).every(card => card.scrollWidth <= card.clientWidth + 1)`), `project card content fits at ${width}px`);
    assert(await evaluate(`document.querySelector('#contact').scrollWidth <= document.querySelector('#contact').clientWidth + 1`), `contact form fits at ${width}px`);
    if (width === 1440 || width === 375) {
      await evaluate(`document.querySelector('.connect-chapter').scrollIntoView()`);
      await new Promise(resolve => setTimeout(resolve, 200));
      const contactShot = await cdp('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(tmpdir(),`aditya-contact-${width}.png`), Buffer.from(contactShot.data,'base64'));
    }
    if (width === 1687) {
      await evaluate(`document.querySelector('#projects').scrollIntoView()`);
      await new Promise(resolve => setTimeout(resolve, 200));
      const screenshot = await cdp('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(tmpdir(),'aditya-projects-fixed.png'), Buffer.from(screenshot.data,'base64'));
    }
  }
  await cdp('Emulation.setDeviceMetricsOverride', { width: 375, height: 900, deviceScaleFactor: 1, mobile: true });
  await evaluate(`document.querySelector('.menu-toggle').click()`);
  assert(await evaluate(`document.querySelector('.top-nav').classList.contains('open')`), 'mobile menu opens');
  await evaluate(`document.querySelector('.top-nav a').click()`);
  assert(await evaluate(`!document.querySelector('.top-nav').classList.contains('open')`), 'mobile menu closes after navigation');
  await evaluate(`scrollTo(0,0)`);
  await new Promise(resolve => setTimeout(resolve, 200));
  const mobile = await cdp('Page.captureScreenshot', { format: 'png' });
  await writeFile(join(tmpdir(),'aditya-portfolio-mobile.png'), Buffer.from(mobile.data,'base64'));
  assert(await evaluate(`Array.from(document.querySelectorAll('a[href^="#"]')).every(a => document.getElementById(a.hash.slice(1)))`), 'all internal navigation targets exist');
  assert(await evaluate(`Boolean(document.querySelector('#contact form'))`), 'existing contact form preserved');
  await evaluate(`document.querySelector('#testimonials button').click()`);
  assert(await evaluate(`Boolean(document.querySelector('#review-dialog-title'))`), 'existing review submission form opens');
  for (const [name,value] of [['client_name','Browser QA'],['company_role','Test role'],['message','A browser test review that will never be published.']]) {
    await evaluate(`(() => { const input = document.querySelector('[role=dialog] [name=${name}]'); const prototype = input.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(prototype,'value').set.call(input,${JSON.stringify(value)}); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  }
  await evaluate(`document.querySelector('input[name="review-rating"][value="5"]').click()`);
  await evaluate(`document.querySelector('[role=dialog] form').requestSubmit()`);
  assert(await evaluate(`document.querySelector('[role=dialog]').textContent.includes('It has not been published')`), 'review preparation never claims public publication');
  assert(await evaluate(`document.querySelector('[role=dialog] a[href^="https://wa.me/"]').href.includes('918766971902')`), 'review is ready for manual WhatsApp delivery');
  await evaluate(`localStorage.removeItem('aditya-review-draft')`);
  await evaluate(`document.querySelector('[aria-label="Close review form"]').click()`);
  await evaluate(`window.__contactTarget = ''; window.open = url => { window.__contactTarget = url; };`);
  for (const [name,value] of [['name','Portfolio QA'],['email','qa@example.com'],['message','Interested in a React desktop project.']]) {
    await evaluate(`(() => { const input = document.querySelector('#contact [name=${name}]'); const prototype = input.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(prototype,'value').set.call(input,${JSON.stringify(value)}); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  }
  await evaluate(`document.querySelector('#contact form').requestSubmit()`);
  assert(await evaluate(`window.__contactTarget.startsWith('https://wa.me/918766971902?text=') && decodeURIComponent(window.__contactTarget).includes('Interested in a React desktop project.')`), 'contact form prepares WhatsApp inquiry without sending');
  assert(await evaluate(`!document.querySelector('#testimonials [role=alert]')`), 'static published testimonials load without service errors');
  console.log('Browser errors:', JSON.stringify(errors));
  console.log('Screenshots:', join(tmpdir(),'aditya-portfolio-desktop.png'), join(tmpdir(),'aditya-portfolio-mobile.png'));
  if(errors.length) process.exitCode=1;
} finally { socket.close(); }
