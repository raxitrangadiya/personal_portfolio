import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './canvas/Background';

import SocialSidebar from './components/SocialSidebar';

function App() {
  return (
    <div className="relative text-textLight">
      <Background />
      <Navbar />
      <SocialSidebar />

      <main className="relative z-10 w-full bg-[#0a192f]/0 backdrop-blur-[0.5px]">
        <Hero />
        <Experience />
        <Projects />
        <Contact />
      </main>

      <footer className="text-center py-6 text-textDark text-sm font-mono relative z-10">
        <a
          href="https://github.com/raxitrangadiya"
          target="_blank"
          rel="noreferrer"
          className="hover:text-primary transition-colors"
        >
          Designed & Built by Raxit Rangadiya
        </a>
      </footer>
    </div>
  );
}

export default App;
