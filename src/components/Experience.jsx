import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';

export default function Experience() {
    return (
        <section id="experience" className="py-24 max-w-6xl mx-auto px-6 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-16 max-w-4xl mx-auto"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textPrimary font-display">
                    Where I've Worked
                </h2>
                <div className="h-[1px] bg-borderGlass flex-grow max-w-xs"></div>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
                {/* Timeline Path Line - Centered on Desktop, Left-aligned on Mobile */}
                <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accentPrimary via-accentGlow to-accentAi -translate-x-1/2 z-0" />

                <div className="space-y-12 relative z-10">
                    {resumeData.experience.map((exp, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div 
                                key={index} 
                                className={`flex flex-col lg:flex-row items-stretch w-full ${isEven ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Left/Right spacer to push card to correct side on desktop */}
                                <div className="hidden lg:block w-1/2" />

                                {/* Timeline node point */}
                                <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-bgVoid border-2 border-accentPrimary -translate-x-1/2 mt-6 z-20 shadow-[0_0_10px_var(--accent-primary)]" />

                                {/* Card Container */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full lg:w-1/2 pl-10 lg:pl-0 lg:px-8 flex"
                                >
                                    <div 
                                        className={`glass-panel p-6 rounded-2xl w-full border border-borderGlass shadow-2xl relative transform transition-transform duration-500 hover:scale-[1.01] hover:border-accentPrimary/35`}
                                        style={{ 
                                            // 3D rotation Y tilting toward center line
                                            transform: `perspective(1000px) rotateY(${isEven ? '-3deg' : '3deg'})`
                                        }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-textPrimary font-display">
                                                    {exp.role}
                                                </h3>
                                                <p className="text-sm font-mono text-accentPrimary font-semibold">
                                                    @ {exp.company}
                                                </p>
                                            </div>
                                            <span className="text-xs font-mono text-textMuted bg-bgSurface px-3 py-1.5 rounded-full border border-borderGlass/50 self-start sm:self-auto select-none">
                                                {exp.duration}
                                            </span>
                                        </div>

                                        {/* Responsibilities list */}
                                        {exp.responsibilities && (
                                            <ul className="list-disc list-outside ml-4 space-y-2 text-textMuted text-sm font-sans mb-5">
                                                {exp.responsibilities.map((bullet, idx) => (
                                                    <li key={idx} className="leading-relaxed">
                                                        {bullet}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {/* Tech pills stack */}
                                        {exp.technologies && (
                                            <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-borderGlass/30">
                                                {exp.technologies.map((tech) => (
                                                    <span 
                                                        key={tech} 
                                                        className="text-[9px] font-mono font-bold bg-accentPrimary/10 border border-accentPrimary/25 px-2 py-0.5 rounded-md text-accentPrimary select-none"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
