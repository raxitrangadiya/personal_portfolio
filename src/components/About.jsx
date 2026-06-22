import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { Terminal } from 'lucide-react';

function CountUp({ to, duration = 1.5 }) {
    const [count, setCount] = useState(0);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isIntersecting) {
            setCount(0);
            return;
        }

        let start = 0;
        const end = parseInt(to);
        setCount(0); // Reset count immediately
        if (start === end) {
            setCount(end);
            return;
        }
        
        const totalMilliseconds = duration * 1000;
        const incrementTime = Math.min(Math.max(Math.floor(totalMilliseconds / end), 15), 100);
        
        const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) {
                clearInterval(timer);
            }
        }, incrementTime);

        return () => {
            clearInterval(timer);
        };
    }, [isIntersecting, to, duration]);

    return <span ref={ref}>{count}</span>;
}

export default function About({ profile }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const name = profile?.name || "Raxit Rangadiya";
    const role = profile?.role || "Full Stack Developer + AI Automation Engineer";
    const bio1 = profile?.bioParagraph1 || "I'm a full-stack engineer and automation specialist dedicated to architecting resilient, high-performance web systems and multiagent workflows.";
    const bio2 = profile?.bioParagraph2 || "Currently based in Gujarat, India, I specialize in the React/Node ecosystem, database normalization, Docker virtualization, and automating pipelines.";
    const expYears = profile?.experienceYears ?? 3;
    const projectsCount = profile?.completedProjects ?? 15;
    const techCount = profile?.techCount ?? 10;

    return (
        <section id="about" className="py-20 max-w-4xl mx-auto px-6">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
            >
                <h2 className="text-2xl md:text-3xl font-bold text-textPrimary font-display">
                    About Me
                </h2>
                <div className="h-[1px] bg-borderGlass flex-grow max-w-xs"></div>
            </motion.div>

            <div className="grid md:grid-cols-12 gap-12 items-center">
                {/* 3D Profile Flip Card (Left) */}
                <div className="md:col-span-5 flex justify-center">
                    <div 
                        className="w-64 h-80 perspective-1000 cursor-pointer"
                        onMouseEnter={() => setIsFlipped(true)}
                        onMouseLeave={() => setIsFlipped(false)}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className={`w-full h-full relative flip-card-inner preserve-3d ${isFlipped ? 'flipped' : ''}`}>
                            {/* Front Face: System Diagnostics mock terminal */}
                            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden glass-panel border border-borderGlass p-5 shadow-2xl flex flex-col justify-between">
                                <div className="font-mono text-xs text-accentPrimary space-y-1">
                                    <p className="text-accentAi"><span className="flex items-center gap-1.5 text-accentAi"><Terminal className="w-4 h-4" /> SYSTEM DIAGNOSTICS</span></p>
                                    <p>&gt; STATUS: ACTIVE</p>
                                    <p>&gt; IP: 192.168.1.85</p>
                                    <p>&gt; ENV: DEPLOYED</p>
                                    <p>&gt; CORE: FULL-STACK + AI</p>
                                </div>
                                <div className="border-t border-borderGlass/30 pt-3">
                                    <p className="font-display font-bold text-base text-textPrimary tracking-tight">
                                        {name}
                                    </p>
                                    <p className="font-mono text-[11px] text-accentPrimary mt-0.5">
                                        {role}
                                    </p>
                                </div>
                            </div>

                            {/* Back Face: Stats Card */}
                            <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl rotate-y-180 bg-bgRaised border border-borderGlass p-6 flex flex-col justify-between shadow-2xl">
                                <div>
                                    <h4 className="font-display font-bold text-sm text-accentPrimary tracking-wider uppercase mb-5">
                                        System Telemetry
                                    </h4>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-[10px] text-textMuted font-mono uppercase tracking-wider">Experience</p>
                                            <p className="text-lg font-bold text-textPrimary">{expYears}+ Years Active</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-textMuted font-mono uppercase tracking-wider">Completed Projects</p>
                                            <p className="text-lg font-bold text-textPrimary">{projectsCount}+ Systems Built</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-textMuted font-mono uppercase tracking-wider">Focus</p>
                                            <p className="text-lg font-bold text-textPrimary">Full-Stack &amp; AI Agents</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[10px] text-textMuted font-mono border-t border-borderGlass/50 pt-3">
                                    // Hover off to inspect visual
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio + Animated Counters (Right) */}
                <div className="md:col-span-7 space-y-6">
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-textMuted text-base leading-relaxed animate-fade-in"
                    >
                        {bio1}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-textMuted text-base leading-relaxed animate-fade-in"
                    >
                        {bio2}
                    </motion.p>

                    {/* Stats counters */}
                    <div className="grid grid-cols-3 gap-6 pt-6 border-t border-borderGlass/30">
                        <div>
                            <div className="text-3xl md:text-4xl font-extrabold font-display text-accentPrimary mb-1">
                                <CountUp to={expYears} />+
                            </div>
                            <div className="text-xs text-textMuted font-mono uppercase tracking-wider">Years Exp</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-extrabold font-display text-accentAi mb-1">
                                <CountUp to={projectsCount} />+
                            </div>
                            <div className="text-xs text-textMuted font-mono uppercase tracking-wider">Projects</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-extrabold font-display text-accentPrimary mb-1">
                                <CountUp to={techCount} />+
                            </div>
                            <div className="text-xs text-textMuted font-mono uppercase tracking-wider">Technologies</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
