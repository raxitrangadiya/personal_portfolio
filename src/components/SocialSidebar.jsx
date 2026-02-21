import React from 'react';
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function SocialSidebar() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="fixed top-1/2 -translate-y-1/2 left-6 hidden md:flex flex-col items-center gap-6 z-[100]"
        >
            <ul className="flex flex-col gap-6 text-textLight">
                <li>
                    <a
                        href="https://github.com/raxitrangadiya"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary hover:-translate-y-1 transition-all duration-300 block"
                        aria-label="GitHub"
                    >
                        <FiGithub size={24} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/raxitrangadiya/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-primary hover:-translate-y-1 transition-all duration-300 block"
                        aria-label="LinkedIn"
                    >
                        <FiLinkedin size={24} />
                    </a>
                </li>
            </ul>
        </motion.div>
    );
}
