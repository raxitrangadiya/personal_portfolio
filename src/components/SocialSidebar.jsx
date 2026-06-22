import React from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SocialSidebar({ profile }) {
    const github = profile?.githubUrl || "https://github.com/raxitrangadiya";
    const linkedin = profile?.linkedinUrl || "https://www.linkedin.com/in/raxitrangadiya/";

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
            className="fixed bottom-0 left-8 hidden md:flex flex-col items-center gap-6 z-[100]"
        >
            <ul className="flex flex-col gap-6 text-textMuted">
                <li>
                    <a
                        href={github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accentPrimary hover:-translate-y-1.5 transition-all duration-300 block hover:drop-shadow-[0_0_8px_#6C63FF]"
                        aria-label="GitHub"
                    >
                        <FiGithub size={20} />
                    </a>
                </li>
                <li>
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-accentPrimary hover:-translate-y-1.5 transition-all duration-300 block hover:drop-shadow-[0_0_8px_#6C63FF]"
                        aria-label="LinkedIn"
                    >
                        <FiLinkedin size={20} />
                    </a>
                </li>
            </ul>
            
            {/* Anchored Vertical Gradient Line */}
            <div className="w-[1px] h-28 bg-gradient-to-b from-textMuted/40 to-transparent" />
        </motion.div>
    );
}
