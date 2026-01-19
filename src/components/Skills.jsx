import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';

export default function Skills() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <section className="py-20 max-w-4xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textLight">
                    <span className="text-primary font-mono mr-2">02.</span>
                    Skills & Technologies
                </h2>
                <div className="h-[1px] bg-textDark/30 flex-grow max-w-xs"></div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
                {resumeData.skills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        variants={item}
                        className="bg-[#112240] p-4 rounded hover:text-primary transition-all hover:-translate-y-1 cursor-default text-textDark flex items-center gap-3"
                    >
                        <skill.icon className="text-xl text-primary" />
                        <span>{skill.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
