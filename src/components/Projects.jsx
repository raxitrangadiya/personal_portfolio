import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { Folder, ExternalLink, Github } from 'lucide-react';

export default function Projects() {
    return (
        <section id="work" className="py-20 max-w-4xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textLight">
                    <span className="text-primary font-mono mr-2">04.</span>
                    Some Things I've Built
                </h2>
                <div className="h-[1px] bg-textDark/30 flex-grow max-w-xs"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
                {resumeData.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-[#112240] p-6 rounded-lg hover:-translate-y-2 transition-transform duration-300"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <Folder className="text-primary w-10 h-10" />
                            <div className="flex gap-4">
                                <a href="#" className="text-textDark hover:text-primary"><Github className="w-5 h-5" /></a>
                                <a href="#" className="text-textDark hover:text-primary"><ExternalLink className="w-5 h-5" /></a>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-textLight mb-2 group-hover:text-primary transition-colors">
                            {project.title}
                        </h3>

                        <p className="text-textDark mb-4 text-sm">
                            {project.description}
                        </p>

                        <ul className="text-xs font-mono text-textDark/60 mb-4 list-disc pl-4 space-y-1">
                            {project.features.slice(0, 3).map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                            {project.features.length > 3 && <li>+{project.features.length - 3} more features</li>}
                        </ul>

                        <div className="flex flex-wrap gap-3 mt-auto">
                            {project.technologies.map(tech => (
                                <span key={tech} className="text-xs font-mono text-textLight/80">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
