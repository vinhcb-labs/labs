// Theme
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');
const theme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);
document.addEventListener('click', (e)=>{
  const t = e.target.closest('#themeToggle');
  if(!t) return;
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Router (supports HTTP fetch + file:// iframe fallback)
const routes = { store: 'pages/store.html', network: 'pages/network.html', system: 'pages/system.html', about: 'pages/about.html' };
const isFileProto = () => location.protocol === 'file:';
const panel = document.getElementById('panel');

function ensureIframe(){
  let frame = document.getElementById('panelFrame');
  if (!frame) {
    const wrapper = panel || document.createElement('section');
    if (!panel) { wrapper.className = 'panel'; wrapper.style.padding = '0'; wrapper.style.overflow = 'hidden'; document.body.appendChild(wrapper); }
    frame = document.createElement('iframe');
    frame.id = 'panelFrame'; frame.style.width='100%'; frame.style.height='60vh'; frame.style.border='0'; frame.style.display='block';
    wrapper.innerHTML = ''; wrapper.appendChild(frame);
  }
  return frame;
}

async function loadPage(name){
  const tabName = routes[name] ? name : 'store';
  document.querySelectorAll('.tab').forEach(b => b.setAttribute('aria-selected', String(b.dataset.tab === tabName)));
  history.replaceState(null, '', `#${tabName}`);

  if (isFileProto()) { ensureIframe().src = routes[tabName]; return; }

  if (!panel) return;
  try {
    const res = await fetch(routes[tabName], { cache: 'no-store' });
    const html = await res.text();
    panel.innerHTML = html;
  } catch (e) {
    ensureIframe().src = routes[tabName];
  }
}

function currentRoute(){ const h = location.hash.replace('#','').trim(); return routes[h] ? h : 'store'; }
window.addEventListener('hashchange', ()=> loadPage(currentRoute()));
document.addEventListener('click', (e)=>{ const t = e.target.closest('.tab'); if(!t) return; e.preventDefault(); loadPage(t.dataset.tab); });
window.addEventListener('DOMContentLoaded', ()=> loadPage(currentRoute()));
