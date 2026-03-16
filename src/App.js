import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollRunner';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = window.localStorage.getItem('theme');
    const systemPrefersLight =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const initial = saved || (systemPrefersLight ? 'light' : 'dark');
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <div className="App">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <ScrollProgress />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
