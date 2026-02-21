import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';

export default function Experience() {
    return (
        <section id="experience" className="py-20 max-w-4xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textLight">
                    <span className="text-primary font-mono mr-2">03.</span>
                    Where I've Worked
                </h2>
                <div className="h-[1px] bg-textDark/30 flex-grow max-w-xs"></div>
            </motion.div>

            <div className="space-y-12">
                {resumeData.experience.map((exp, index) => {
                    const Icon = exp.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 border-l-2 border-[#233554] hover:border-primary transition-colors"
                        >
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#0a192f] border-2 border-primary"></div>

                            <h3 className="text-xl font-bold text-textLight">
                                {exp.role} <span className="text-primary">@ {exp.company}</span>
                            </h3>
                            <p className="font-mono text-sm text-textDark mb-4">{exp.duration}</p>

                            <p className="text-textDark max-w-xl">
                                {exp.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
