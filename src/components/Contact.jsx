import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';

export default function Contact() {
    const { email, social, phone } = resumeData.personalInfo;

    return (
        <section id="contact" className="py-20 max-w-2xl mx-auto px-6 text-center mb-20">
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-primary font-mono mb-4"
            >
                04. What's Next?
            </motion.p>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-textLight mb-6"
            >
                Get In Touch
            </motion.h2>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-textDark text-lg mb-10"
            >
                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open!
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col gap-4 items-center"
            >
                <a
                    href={`mailto:${email}`}
                    className="border border-primary text-primary px-8 py-4 rounded hover:bg-primary/10 transition-colors font-mono"
                >
                    Say Hello
                </a>
                <div className="flex gap-6 mt-6">
                    <a href={social.github} target="_blank" className="text-textDark hover:text-primary transition-colors">GitHub</a>
                    <a href={social.linkedin} target="_blank" className="text-textDark hover:text-primary transition-colors">LinkedIn</a>
                </div>
                <p className="text-textDark/50 font-mono text-sm mt-4">{phone}</p>
            </motion.div>
        </section>
    );
}
