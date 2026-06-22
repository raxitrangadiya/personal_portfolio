import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Background from './canvas/Background';
import SocialSidebar from './components/SocialSidebar';

// Admin Components
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

import { resumeData } from './data';
import { API_BASE_URL } from './config';

// Main Portfolio View
function PortfolioView({ profile, skills }) {
  return (
    <>
      <Navbar />
      <SocialSidebar profile={profile} />
      <main className="relative z-10 w-full bg-transparent backdrop-blur-[0.5px]">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience />
        <Projects />
        <Contact />
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
    linkedinUrl: resumeData.personalInfo.social.linkedin
  });
  const [skills, setSkills] = useState([]);

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

  return (
    <Router>
      <div className="relative text-textPrimary min-h-screen">
        {/* Consistent 3D Galaxy background across all pages */}
        <Background />

        <Routes>
          <Route path="/" element={<PortfolioView profile={profile} skills={skills} />} />
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
