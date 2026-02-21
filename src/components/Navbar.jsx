import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#work' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-[#0a192f]/90 backdrop-blur-sm shadow-lg py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-primary font-bold text-2xl"
                >
                    R.
                </motion.div>

                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-textLight hover:text-primary transition-colors text-sm font-mono"
                        >
                            <span className="text-primary mr-1">0{index + 1}.</span>
                            {link.name}
                        </motion.a>
                    ))}
                    <motion.a
                        href="/resume.pdf"
                        target="_blank"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition-colors text-sm font-mono"
                    >
                        Resume
                    </motion.a>
                </div>
            </div>
        </nav>
    );
}
