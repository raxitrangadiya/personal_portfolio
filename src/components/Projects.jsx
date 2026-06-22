import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, ExternalLink, Github, Eye, Cpu } from 'lucide-react';
import { resumeData } from '../data';
import { API_BASE_URL } from '../config';
import ProjectDetailsModal from './ProjectDetailsModal';

function ProjectCard({ project, index, onClick }) {
    const [tiltStyle, setTiltStyle] = useState({});

    const isAi = (() => {
        const title = project.title.toLowerCase();
        const desc = project.description.toLowerCase();
        const tech = project.technologies.map(t => t.toLowerCase());
        return title.includes('ai') || title.includes('autobiz') || title.includes('automation') || title.includes('bot') ||
               desc.includes('ai') || desc.includes('automation') || desc.includes('llm') ||
               tech.some(t => t.includes('ai') || t.includes('n8n') || t.includes('openai') || t.includes('tensorflow') || t.includes('langchain'));
    })();

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * 16;  // -8deg to +8deg
        const rotateX = (y - 0.5) * -16; // -8deg to +8deg

        const glowColor = isAi ? 'rgba(0, 229, 255, 0.15)' : 'rgba(108, 99, 255, 0.15)';

        setTiltStyle({
            transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
            background: `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${glowColor}, transparent 60%)`,
            transition: 'transform 0.1s ease-out, background 0.1s ease-out',
            willChange: 'transform'
        });
    };

    const handleMouseLeave = () => {
        setTiltStyle({
            transform: `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
            transition: 'transform 0.5s ease, background 0.5s ease'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer glass-panel flex flex-col h-full border border-white/10`}
            style={tiltStyle}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {/* Bottom Glow Strip */}
            <div className={`absolute bottom-0 left-0 w-full h-[3px] z-20 ${isAi ? 'bg-accentAi shadow-[0_0_10px_#00E5FF]' : 'bg-accentPrimary shadow-[0_0_10px_#6C63FF]'}`} />

            {/* Image / Thumbnail with Gradient Overlay & Zoom */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/50 to-transparent opacity-95 z-10"></div>
                <div className={`absolute inset-0 bg-gradient-to-tr ${isAi ? 'from-accentAi/10 to-transparent' : 'from-accentPrimary/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-15`}></div>
                
                {/* Action overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-black/40 backdrop-blur-[1px]">
                    <div className={`flex items-center gap-2 px-4 py-2 border ${isAi ? 'border-accentAi text-accentAi shadow-glow-cyan/20' : 'border-accentPrimary text-accentPrimary shadow-glow-violet/20'} rounded-xl font-mono text-xs font-semibold bg-bgSurface/95 group-hover:scale-105 transition-transform duration-300`}>
                        <Eye className="w-4 h-4" /> View Details
                    </div>
                </div>

                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>

            {/* Project Description & Metadata */}
            <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Folder className={`w-8 h-8 ${isAi ? 'text-accentAi' : 'text-accentPrimary'}`} />
                        {isAi && (
                            <span className="flex items-center gap-1 text-[10px] font-mono font-bold bg-accentAi/10 text-accentAi border border-accentAi/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                <Cpu className="w-2.5 h-2.5 animate-pulse" /> AI System
                            </span>
                        )}
                    </div>
                    <div className="flex gap-4 relative z-20">
                        {project.githubUrl && (
                            <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()} 
                                className={`text-textMuted ${isAi ? 'hover:text-accentAi' : 'hover:text-accentPrimary'} transition-colors`}
                                title="Repository"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                        {project.previewUrl && (
                            <a 
                                href={project.previewUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()} 
                                className={`text-textMuted ${isAi ? 'hover:text-accentAi' : 'hover:text-accentPrimary'} transition-colors`}
                                title="Live Demo"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className={`text-xl font-bold font-display text-textPrimary mb-2 ${isAi ? 'group-hover:text-accentAi' : 'group-hover:text-accentPrimary'} transition-colors duration-300`}>
                    {project.title}
                </h3>

                <p className="text-textMuted mb-6 text-sm line-clamp-3 leading-relaxed font-sans">
                    {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-borderGlass/30">
                    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-textMuted">
                        {project.technologies.slice(0, 4).map(tech => (
                            <li key={tech} className={`transition-colors ${isAi ? 'hover:text-accentAi' : 'hover:text-accentPrimary'}`}>
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/projects`);
                if (!res.ok) throw new Error('API server unavailable');
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.warn('API error, falling back to static projects list:', error);
                setProjects(resumeData.projects);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section id="work" className="py-20 max-w-4xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-14"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textPrimary font-display">
                    Some Things I've Built
                </h2>
                <div className="h-[1px] bg-borderGlass flex-grow max-w-xs"></div>
            </motion.div>

            {loading ? (
                // Skeletal Loading Cards
                <div className="grid md:grid-cols-2 gap-8">
                    {[1, 2].map((n) => (
                        <div key={n} className="glass-panel h-96 rounded-xl animate-pulse p-6 flex flex-col justify-between border border-white/5 bg-white/[0.01]">
                            <div className="w-full h-40 bg-white/5 rounded-lg mb-6"></div>
                            <div className="h-6 bg-white/5 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-white/5 rounded w-5/6 mb-2"></div>
                            <div className="h-4 bg-white/5 rounded w-1/2 mb-6"></div>
                            <div className="flex gap-4">
                                <div className="h-4 bg-white/5 rounded w-16"></div>
                                <div className="h-4 bg-white/5 rounded w-16"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={project._id || index}
                            project={project}
                            index={index}
                            onClick={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            )}

            {/* Render Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailsModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
