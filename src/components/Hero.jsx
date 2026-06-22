import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { FaReact, FaNodeJs, FaDocker } from 'react-icons/fa';
import { SiPostgresql, SiExpress } from 'react-icons/si';
import { Cpu, Terminal, ArrowRight, Download } from 'lucide-react';

export default function Hero({ profile }) {
    // Generate 80 floating particles at random positions and speed
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 80; i++) {
            const size = Math.random() * 4 + 1;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10; // 10s to 20s
            const isAi = Math.random() > 0.7; // 30% are cyan AI particles
            temp.push({ id: i, size, left, delay, duration, isAi });
        }
        return temp;
    }, []);

    const orbitBadges = [
        { name: 'React', icon: FaReact, isAi: false, animClass: 'animate-orbit-clock', delay: '0s' },
        { name: 'Node.js', icon: FaNodeJs, isAi: false, animClass: 'animate-orbit-clock', delay: '-4s' },
        { name: 'Docker', icon: FaDocker, isAi: false, animClass: 'animate-orbit-clock', delay: '-8s' },
        { name: 'PostgreSQL', icon: SiPostgresql, isAi: false, animClass: 'animate-orbit-clock', delay: '-12s' },
        { name: 'n8n', icon: Terminal, isAi: true, animClass: 'animate-orbit-counter', delay: '-2s' },
        { name: 'AI / LLMs', icon: Cpu, isAi: true, animClass: 'animate-orbit-counter', delay: '-10s' },
    ];

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bgVoid pt-16">
            {/* 3D Parallax floating particle field */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {particles.map((p) => (
                    <div
                        key={p.id}
                        className={`absolute rounded-full opacity-60 ${p.isAi ? 'bg-accentAi shadow-[0_0_8px_#00E5FF]' : 'bg-accentPrimary'}`}
                        style={{
                            left: `${p.left}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            bottom: `-20px`,
                            animation: `drift ${p.duration}s linear infinite`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 w-full py-12 md:py-20">
                {/* Hero Bio Text */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-mono text-xs tracking-widest text-accentPrimary mb-3 uppercase"
                    >
                        <span className="text-accentPrimary font-mono mr-1.5 animate-pulse">&gt;_</span> Creative Systems & Intelligence
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-none text-gradient-cosmic select-none transform perspective-1000 hover:rotate-x-12 transition-transform duration-300"
                    >
                        {profile.name}
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-5xl font-bold text-textPrimary mb-6 tracking-tight font-display"
                    >
                        {profile.role}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="max-w-xl text-textMuted text-base md:text-lg mb-8 leading-relaxed font-sans"
                    >
                        {profile.objective}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a
                            href="#work"
                            className="bg-accentPrimary text-textPrimary px-8 py-4 rounded-xl font-label font-bold text-sm shadow-[4px_4px_0_0_rgba(167,139,250,0.4)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(167,139,250,0.4)] transition-all duration-200 flex items-center gap-2 group"
                        >
                            Explore Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="border border-borderGlass text-textPrimary px-8 py-4 rounded-xl font-label font-bold text-sm hover:bg-white/[0.03] hover:border-accentPrimary transition-all duration-200 flex items-center gap-2"
                        >
                            Download CV <Download className="w-4 h-4" />
                        </a>
                    </motion.div>
                </div>

                {/* 3D Orbiting Badges Sphere Scene */}
                <div className="lg:col-span-5 hidden lg:flex h-[500px] items-center justify-center relative">
                    <div className="w-80 h-80 rounded-full border border-borderGlass/50 absolute flex items-center justify-center backdrop-blur-[1px] shadow-glow-violet/5">
                        {/* Central glowing core */}
                        <div className="w-24 h-24 rounded-full border border-accentPrimary/30 flex items-center justify-center relative animate-spin-slow">
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-accentAi/40 animate-reverse-spin" />
                            <div className="absolute inset-2 rounded-full border border-accentPrimary/50 shadow-[0_0_15px_rgba(108,99,255,0.3)]" />
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0c1020] to-[#121830] border border-white/10 flex items-center justify-center z-10 shadow-2xl">
                                <Cpu className="w-7 h-7 text-accentAi animate-pulse" />
                            </div>
                        </div>
                        
                        {/* Orbiting badges */}
                        {orbitBadges.map((badge, idx) => {
                            const IconComponent = badge.icon;
                            return (
                                <div
                                    key={idx}
                                    className={`absolute ${badge.animClass} flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-bgSurface/95 text-xs font-mono select-none pointer-events-auto`}
                                    style={{
                                        animationDelay: badge.delay,
                                        borderColor: badge.isAi ? 'rgba(0, 229, 255, 0.4)' : 'rgba(108, 99, 255, 0.3)',
                                        boxShadow: badge.isAi ? '0 0 15px rgba(0, 229, 255, 0.15)' : '0 0 15px rgba(108, 99, 255, 0.1)',
                                    }}
                                >
                                    <IconComponent className={badge.isAi ? 'text-accentAi animate-pulse' : 'text-accentPrimary'} size={14} />
                                    <span className={badge.isAi ? 'text-accentAi' : 'text-textPrimary'}>{badge.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
