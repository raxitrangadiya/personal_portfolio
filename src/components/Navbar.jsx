import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'About',      id: 'about'      },
    { name: 'Skills',     id: 'skills'     },
    { name: 'Experience', id: 'experience' },
    { name: 'Work',       id: 'work'       },
    { name: 'Contact',    id: 'contact'    },
];

// Smooth-scroll to section, offset by fixed navbar (80px)
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar() {
    const [scrolled,       setScrolled]       = useState(false);
    const [activeSection,  setActiveSection]  = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavClick = useCallback((id) => {
        scrollToSection(id);
        setMobileMenuOpen(false);
    }, []);

    const handleLogoClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -50% 0px', // Trigger when section is in the middle of viewport
            threshold: 0
        };

        const handleIntersection = (entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        const ids = ['hero', ...navLinks.map(l => l.id)];
        ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });

        return () => {
            ids.forEach(id => { const el = document.getElementById(id); if (el) observer.unobserve(el); });
        };
    }, []);



    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-bgSurface/80 backdrop-blur-xl border-b border-borderGlass shadow-2xl py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-display font-extrabold text-2xl tracking-tighter"
                >
                    <button onClick={handleLogoClick} className="hover:text-accentPrimary transition-colors drop-shadow-[0_0_8px_rgba(108,99,255,0.6)] text-textPrimary focus:outline-none">
                        RR
                    </button>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => {
                        const isActive = activeSection === link.id;
                        return (
                            <motion.a
                                key={link.name}
                                href={`#${link.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(link.id);
                                }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative font-mono text-sm transition-colors py-1 cursor-pointer focus:outline-none ${isActive ? 'text-accentPrimary font-semibold' : 'text-textMuted hover:text-accentPrimary'}`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.span
                                        layoutId="activeNavHighlight"
                                        className="absolute bottom-0 left-0 w-full h-[2px] bg-accentPrimary shadow-[0_0_8px_rgba(108,99,255,0.8)]"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.a>
                        );
                    })}
                </div>

                {/* Mobile hamburger */}
                <div className="flex md:hidden items-center">
                    <button
                        onClick={() => setMobileMenuOpen(v => !v)}
                        className="text-textPrimary hover:text-accentPrimary transition-colors focus:outline-none p-1"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden w-full overflow-hidden bg-bgSurface/95 border-b border-borderGlass backdrop-blur-2xl"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6 font-mono text-base">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.id;
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={`#${link.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link.id);
                                        }}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className={`text-left py-2 pl-4 border-l-2 transition-all cursor-pointer focus:outline-none ${isActive ? 'border-accentPrimary text-accentPrimary font-bold bg-accentPrimary/5' : 'border-transparent text-textMuted hover:text-textPrimary hover:border-textMuted'}`}
                                    >
                                        {link.name}
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
