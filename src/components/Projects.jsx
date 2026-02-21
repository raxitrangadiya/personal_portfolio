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
                className="flex items-center gap-4 mb-16"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textLight">
                    <span className="text-primary font-mono mr-2">04.</span>
                    Some Things I've Built
                </h2>
                <div className="h-[1px] bg-textDark/30 flex-grow max-w-xs"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
                {resumeData.projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative rounded-xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                    >
                        {/* Glassmorphism Background Layer */}
                        <div className="absolute inset-0 bg-[#112240]/80 backdrop-blur-sm border border-white/10 rounded-xl transition-all duration-300 group-hover:border-primary/50"></div>

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col h-full">

                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden rounded-t-xl group">
                                <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent opacity-80 z-10"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Details Section */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-4">
                                    <Folder className="text-primary w-10 h-10" />
                                    <div className="flex gap-4">
                                        <a href="#" className="text-textLight/70 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                                        <a href="#" className="text-textLight/70 hover:text-primary transition-colors"><ExternalLink className="w-5 h-5" /></a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-textLight mb-2 group-hover:text-primary transition-colors">
                                    {project.title}
                                </h3>

                                <div className="text-textDark mb-6 text-sm line-clamp-3 leading-relaxed">
                                    {project.description}
                                </div>

                                <div className="mt-auto">
                                    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-textLight/60">
                                        {project.technologies.slice(0, 4).map(tech => (
                                            <li key={tech} className="hover:text-primary transition-colors">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
