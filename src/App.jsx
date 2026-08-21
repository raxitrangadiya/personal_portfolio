import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Services from './components/Services';
import Background from './canvas/Background';
import SocialSidebar from './components/SocialSidebar';

// Admin Components
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

import { resumeData } from './data';
import { API_BASE_URL } from './config';

// Main Portfolio View
function PortfolioView({ profile, skills, isLight, onToggleLight }) {
  const [prefilledContact, setPrefilledContact] = useState(null);

  return (
    <>
      <Navbar profile={profile} isLight={isLight} onToggleLight={onToggleLight} />
      <SocialSidebar profile={profile} />
      <main className="relative z-10 w-full bg-transparent">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience />
        <Services onProceedEstimate={(data) => setPrefilledContact(data)} />
        <Projects />
        <Contact prefill={prefilledContact} clearPrefill={() => setPrefilledContact(null)} />
      </main>
    </>
  );
}

// Dynamic fallback skills list matching upgraded seed schema
const fallbackSkills = [
  // Frontend
  { name: "React", category: "Frontend", icon: "FaReact", proficiency: 92, badge: "Pro" },
  { name: "TypeScript", category: "Frontend", icon: "SiTypescript", proficiency: 85, badge: "Pro" },
  { name: "Vite", category: "Frontend", icon: "SiVite", proficiency: 88, badge: "Tool" },
  { name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss", proficiency: 90, badge: "Pro" },
  { name: "Bootstrap", category: "Frontend", icon: "FaBootstrap", proficiency: 88, badge: "" },
  { name: "Redux", category: "Frontend", icon: "SiRedux", proficiency: 80, badge: "" },
  
  // Backend
  { name: "Node.js", category: "Backend", icon: "FaNodeJs", proficiency: 85, badge: "Pro" },
  { name: "PostgreSQL", category: "Backend", icon: "SiPostgresql", proficiency: 80, badge: "" },
  { name: "MongoDB", category: "Backend", icon: "SiMongodb", proficiency: 72, badge: "" },
  { name: "Sequelize ORM", category: "Backend", icon: "SiSequelize", proficiency: 78, badge: "Tool" },
  { name: "REST APIs", category: "Backend", icon: "FaCode", proficiency: 88, badge: "Pro" },
  
  // AI & Automation
  { name: "n8n", category: "AI & Automation", icon: "FaRobot", proficiency: 85, badge: "AI" },
  { name: "Claude AI", category: "AI & Automation", icon: "SiAnthropic", proficiency: 88, badge: "AI" },
  { name: "Gemini API", category: "AI & Automation", icon: "SiGoogle", proficiency: 80, badge: "AI" },
  { name: "ChatGPT", category: "AI & Automation", icon: "SiOpenai", proficiency: 82, badge: "AI" },
  { name: "MCP Architecture", category: "AI & Automation", icon: "FaNetworkWired", proficiency: 75, badge: "AI" },
  { name: "Prompt Engineering", category: "AI & Automation", icon: "FaBrain", proficiency: 85, badge: "AI" },
  
  // DevOps
  { name: "Docker", category: "DevOps", icon: "FaDocker", proficiency: 75, badge: "Tool" },
  { name: "Git/GitHub", category: "DevOps", icon: "FaGithub", proficiency: 88, badge: "Tool" },
  { name: "Vercel", category: "DevOps", icon: "SiVercel", proficiency: 80, badge: "Tool" },
  { name: "Linux", category: "DevOps", icon: "FaLinux", proficiency: 70, badge: "" }
];

export const THEME_PALETTES = {
  'cosmic-aurora': {
    name: 'Cosmic Aurora (Purple & Cyan)',
    variables: {
      '--accent-primary': '#6C63FF',
      '--accent-glow': '#A78BFA',
      '--accent-ai': '#00E5FF',
      '--accent-warm': '#FF6B6B',
      '--border-glass': 'rgba(108, 99, 255, 0.15)',
      '--shadow-3d': 'rgba(108, 99, 255, 0.35)',
      '--bg-void': '#050811',
      '--bg-surface': '#0D1117',
      '--bg-raised': '#161B27',
      '--glass-bg': 'rgba(13, 17, 23, 0.6)'
    },
    lightVariables: {
      '--accent-primary': '#4F46E5', // Indigo 600
      '--accent-glow': '#818CF8',   // Indigo 400
      '--accent-ai': '#0D9488',      // Teal 600
      '--accent-warm': '#E11D48',   // Rose 600
      '--border-glass': 'rgba(79, 70, 229, 0.12)',
      '--shadow-3d': 'rgba(79, 70, 229, 0.15)',
      '--bg-void': '#F8FAFC',       // Slate 50
      '--bg-surface': '#FFFFFF',    // White
      '--bg-raised': '#F1F5F9',     // Slate 100
      '--glass-bg': 'rgba(255, 255, 255, 0.7)'
    }
  },
  'neon-nebula': {
    name: 'Neon Nebula (Fuchsia & Blue)',
    variables: {
      '--accent-primary': '#D946EF',
      '--accent-glow': '#F472B6',
      '--accent-ai': '#3B82F6',
      '--accent-warm': '#FF6B6B',
      '--border-glass': 'rgba(217, 70, 239, 0.15)',
      '--shadow-3d': 'rgba(217, 70, 239, 0.35)',
      '--bg-void': '#090514',
      '--bg-surface': '#110C24',
      '--bg-raised': '#1A1435',
      '--glass-bg': 'rgba(17, 12, 36, 0.6)'
    },
    lightVariables: {
      '--accent-primary': '#C026D3', // Fuchsia 600
      '--accent-glow': '#EC4899',   // Pink 500
      '--accent-ai': '#2563EB',      // Blue 600
      '--accent-warm': '#E11D48',   // Rose 600
      '--border-glass': 'rgba(192, 38, 211, 0.12)',
      '--shadow-3d': 'rgba(192, 38, 211, 0.15)',
      '--bg-void': '#FAF5FF',       // Purple 50
      '--bg-surface': '#FFFFFF',    // White
      '--bg-raised': '#F3E8FF',     // Purple 100
      '--glass-bg': 'rgba(255, 255, 255, 0.7)'
    }
  },
  'solar-flare': {
    name: 'Solar Flare (Amber & Red)',
    variables: {
      '--accent-primary': '#F59E0B',
      '--accent-glow': '#FBBF24',
      '--accent-ai': '#EF4444',
      '--accent-warm': '#FF6B6B',
      '--border-glass': 'rgba(245, 158, 11, 0.15)',
      '--shadow-3d': 'rgba(245, 158, 11, 0.35)',
      '--bg-void': '#110505',
      '--bg-surface': '#1C0D0D',
      '--bg-raised': '#2C1414',
      '--glass-bg': 'rgba(28, 13, 13, 0.6)'
    },
    lightVariables: {
      '--accent-primary': '#D97706', // Amber 600
      '--accent-glow': '#F59E0B',   // Amber 500
      '--accent-ai': '#DC2626',      // Red 600
      '--accent-warm': '#E11D48',   // Rose 600
      '--border-glass': 'rgba(217, 119, 6, 0.12)',
      '--shadow-3d': 'rgba(217, 119, 6, 0.15)',
      '--bg-void': '#FFFBEB',       // Amber 50
      '--bg-surface': '#FFFFFF',    // White
      '--bg-raised': '#FEF3C7',     // Amber 100
      '--glass-bg': 'rgba(255, 255, 255, 0.7)'
    }
  },
  'forest-matrix': {
    name: 'Forest Matrix (Emerald & Gold)',
    variables: {
      '--accent-primary': '#10B981',
      '--accent-glow': '#34D399',
      '--accent-ai': '#F59E0B',
      '--accent-warm': '#FF6B6B',
      '--border-glass': 'rgba(16, 185, 129, 0.15)',
      '--shadow-3d': 'rgba(16, 185, 129, 0.35)',
      '--bg-void': '#020B06',
      '--bg-surface': '#08160E',
      '--bg-raised': '#10261A',
      '--glass-bg': 'rgba(8, 22, 14, 0.6)'
    },
    lightVariables: {
      '--accent-primary': '#059669', // Emerald 600
      '--accent-glow': '#10B981',   // Emerald 500
      '--accent-ai': '#D97706',      // Amber 600
      '--accent-warm': '#E11D48',   // Rose 600
      '--border-glass': 'rgba(5, 150, 105, 0.12)',
      '--shadow-3d': 'rgba(5, 150, 105, 0.15)',
      '--bg-void': '#F0FDF4',       // Green 50
      '--bg-surface': '#FFFFFF',    // White
      '--bg-raised': '#DCFCE7',     // Green 100
      '--glass-bg': 'rgba(255, 255, 255, 0.7)'
    }
  },
  'cyber-sentinel': {
    name: 'Cyber Sentinel (Mint & Silver)',
    variables: {
      '--accent-primary': '#06B6D4',
      '--accent-glow': '#22D3EE',
      '--accent-ai': '#F1F5F9',
      '--accent-warm': '#FF6B6B',
      '--border-glass': 'rgba(6, 182, 212, 0.15)',
      '--shadow-3d': 'rgba(6, 182, 212, 0.35)',
      '--bg-void': '#070D14',
      '--bg-surface': '#0F172A',
      '--bg-raised': '#1E293B',
      '--glass-bg': 'rgba(15, 23, 42, 0.6)'
    },
    lightVariables: {
      '--accent-primary': '#0891B2', // Cyan 600
      '--accent-glow': '#06B6D4',   // Cyan 500
      '--accent-ai': '#475569',      // Slate 600
      '--accent-warm': '#E11D48',   // Rose 600
      '--border-glass': 'rgba(8, 145, 178, 0.12)',
      '--shadow-3d': 'rgba(8, 145, 178, 0.15)',
      '--bg-void': '#ECFEFF',       // Cyan 50
      '--bg-surface': '#FFFFFF',    // White
      '--bg-raised': '#CFFAFE',     // Cyan 100
      '--glass-bg': 'rgba(255, 255, 255, 0.7)'
    }
  }
};

function App() {
  const [profile, setProfile] = useState({
    name: resumeData.personalInfo.name,
    role: resumeData.personalInfo.role,
    objective: resumeData.objective,
    bioParagraph1: "I'm a full-stack engineer and automation specialist dedicated to architecting resilient, high-performance web systems and multiagent workflows. My development philosophy is rooted in system integrity, clean code design, and leveraging modern cognitive models to streamline workflows.",
    bioParagraph2: "Currently based in Gujarat, India, I specialize in the React/Node ecosystem, database normalization, Docker virtualization, and automating pipelines with tools like n8n and customized OpenAI/Claude APIs.",
    experienceYears: 3,
    completedProjects: 15,
    techCount: 10,
    githubUrl: resumeData.personalInfo.social.github,
    linkedinUrl: resumeData.personalInfo.social.linkedin,
    profileImage: '',
    navbarLogo: 'RR',
    themePalette: 'cosmic-aurora'
  });
  const [skills, setSkills] = useState([]);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('isLightMode') === 'true';
  });

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const profileRes = await fetch(`${API_BASE_URL}/profile`);
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }

        const skillsRes = await fetch(`${API_BASE_URL}/skills`);
        if (skillsRes.ok) {
          const skillsData = await skillsRes.json();
          setSkills(skillsData);
        } else {
          setSkills(fallbackSkills);
        }
      } catch (err) {
        console.warn('API error fetching profile/skills, using fallbacks:', err);
        setSkills(fallbackSkills);
      }
    };
    fetchTelemetry();
  }, []);

  useEffect(() => {
    const selected = profile?.themePalette || 'cosmic-aurora';
    const palette = THEME_PALETTES[selected] || THEME_PALETTES['cosmic-aurora'];
    const vars = isLightMode ? palette.lightVariables : palette.variables;
    
    Object.entries(vars).forEach(([key, val]) => {
      document.documentElement.style.setProperty(key, val);
    });

    if (isLightMode) {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('isLightMode', isLightMode);
  }, [profile?.themePalette, isLightMode]);

  return (
    <Router>
      <div className="relative text-textPrimary min-h-screen">
        {/* Consistent 3D Galaxy background across all pages */}
        <Background theme={profile?.themePalette} isLight={isLightMode} />

        <Routes>
          <Route path="/" element={<PortfolioView profile={profile} skills={skills} isLight={isLightMode} onToggleLight={() => setIsLightMode(!isLightMode)} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

        <footer className="text-center py-8 text-textMuted text-xs font-mono relative z-10">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hover:text-accentPrimary transition-colors"
          >
            Designed & Built by {profile.name}
          </a>
        </footer>
      </div>
    </Router>
  );
}

export default App;
