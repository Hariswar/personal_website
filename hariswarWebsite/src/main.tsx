import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// User's preference in theme 
const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.add(prefersDarkMode ? 'dark' : 'light');

createRoot(document.getElementById("root")!).render(<App />);
