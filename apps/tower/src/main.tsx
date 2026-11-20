import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

// Dev: `?w=390&h=844` pins the page to a phone size (headless screenshots).
const q = new URLSearchParams(location.search);
if (q.get('w')) {
  const r = document.getElementById('root')!;
  r.style.width = `${q.get('w')}px`;
  r.style.height = `${q.get('h') ?? 844}px`;
  r.style.overflow = 'hidden';
  // Screenshots: no half-finished CSS animations.
  document.body.classList.add('shot');
}

createRoot(document.getElementById('root')!).render(<App />);
