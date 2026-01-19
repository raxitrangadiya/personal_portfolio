import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';

export default function Hero() {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center -mt-20">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-primary font-mono mb-4 text-lg"
                >
                    Hi, my name is
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-5xl md:text-7xl font-bold text-textLight mb-4"
                >
                    {resumeData.personalInfo.name}.
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-4xl md:text-6xl font-bold text-textDark mb-6"
                >
                    I build things for the web.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="max-w-xl text-textDark text-lg mb-10 leading-relaxed"
                >
                    {resumeData.objective}
                </motion.p>

                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    href="#work"
                    className="border border-primary text-primary px-8 py-4 rounded hover:bg-primary/10 transition-colors text-sm font-mono inline-block"
                >
                    Check out my work!
                </motion.a>
            </div>
        </section>
    );
}
