import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as LucideIcons from 'lucide-react';
import { Code, Terminal } from 'lucide-react';

// Helpers to dynamically resolve icon components
function getIconComponent(iconName) {
    if (!iconName) return Code;
    if (FaIcons[iconName])     return FaIcons[iconName];
    if (SiIcons[iconName])     return SiIcons[iconName];
    if (LucideIcons[iconName]) return LucideIcons[iconName];
    const n = iconName.trim();
    if (n.startsWith('Fa') && FaIcons[n])  return FaIcons[n];
    if (n.startsWith('Si') && SiIcons[n])  return SiIcons[n];
    return Code;
}

function getCategoryColor(cat) {
    if (!cat) return '#3B82F6';
    const c = cat.toLowerCase();
    if (c.includes('front'))                        return '#6C63FF'; // Cosmic Aurora
    if (c.includes('back'))                         return '#10B981'; // Green
    if (c.includes('ai') || c.includes('automat'))  return '#00E5FF'; // Cyan
    if (c.includes('devops') || c.includes('tool')) return '#FF6B6B'; // Red/Coral
    return '#3B82F6';
}

function isAiCat(cat) {
    if (!cat) return false;
    const c = cat.toLowerCase();
    return c.includes('ai') || c.includes('automat');
}

// Structured Clean Card
function SkillCard({ skill, color, isAi, idx }) {
    const Icon = getIconComponent(skill.icon);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(idx * 0.02, 0.3), duration: 0.5 }}
            className="glass-panel p-5 rounded-2xl border border-borderGlass flex flex-col items-center justify-center gap-3 hover:border-accentPrimary/40 hover:scale-[1.03] hover:shadow-[0_4px_25px_rgba(108,99,255,0.08)] transition-all duration-300 relative group overflow-hidden bg-bgRaised/30"
        >
            {/* Corner accent glow */}
            <div 
                className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:opacity-25 transition-opacity duration-300 rounded-bl-full"
                style={{ background: color }}
            />

            {/* Icon Wrapper */}
            <div 
                className="p-3.5 rounded-xl bg-bgSurface border border-borderGlass flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm"
                style={{ color: color }}
            >
                <Icon size={24} />
            </div>

            {/* Details */}
            <div className="text-center">
                <p className="text-sm font-bold text-textPrimary font-display tracking-tight leading-tight select-none">
                    {skill.name}
                </p>
                <p className="text-[10px] text-textMuted font-mono mt-0.5 tracking-wider uppercase select-none">
                    {skill.category}
                </p>
            </div>

            {/* Tech badges */}
            {skill.badge && (
                <span 
                    className="absolute top-3 left-3 text-[7px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded-md border tracking-wider"
                    style={{ 
                        color: color, 
                        borderColor: `${color}40`,
                        background: `${color}08`
                    }}
                >
                    {skill.badge}
                </span>
            )}
        </motion.div>
    );
}

// Category Group Layout
function CategoryGroup({ category, catSkills }) {
    const color = getCategoryColor(category);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
        >
            {/* Category header divider */}
            <div className="flex items-center gap-3 mb-6">
                <div
                    className="h-px flex-shrink-0"
                    style={{ width: 30, background: `linear-gradient(to right, transparent, ${color})` }}
                />
                <div
                    className="text-[10px] font-mono uppercase tracking-[0.25em] px-3.5 py-1 rounded-full border flex-shrink-0 font-bold"
                    style={{ color, borderColor: `${color}35`, background: `${color}08` }}
                >
                    <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5" /> {category}</span>
                </div>
                <div
                    className="h-px flex-grow"
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                />
                <span className="text-[10px] font-mono flex-shrink-0 text-textMuted select-none">
                    {catSkills.length} Techs
                </span>
            </div>

            {/* Grid display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {catSkills.map((skill, idx) => (
                    <SkillCard
                        key={skill._id || skill.name}
                        skill={skill}
                        color={color}
                        isAi={isAiCat(skill.category)}
                        idx={idx}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills({ skills }) {
    const [activeTab, setActiveTab] = useState('All');

    const categories = useMemo(() => {
        const cats = [...new Set(skills.map(s => s.category))].filter(Boolean);
        const order = ['Frontend', 'Backend', 'AI & Automation', 'DevOps'];
        return cats.sort((a, b) => {
            const ia = order.indexOf(a), ib = order.indexOf(b);
            if (ia > -1 && ib > -1) return ia - ib;
            if (ia > -1) return -1;
            if (ib > -1) return 1;
            return a.localeCompare(b);
        });
    }, [skills]);

    const tabs = useMemo(() => ['All', ...categories], [categories]);

    useEffect(() => {
        if (activeTab !== 'All' && !categories.includes(activeTab)) setActiveTab('All');
    }, [categories, activeTab]);

    const visibleCats = useMemo(
        () => activeTab === 'All' ? categories : categories.filter(c => c === activeTab),
        [categories, activeTab]
    );

    return (
        <section id="skills" className="py-24 bg-bgVoid relative z-10 w-full overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center mb-12 text-center"
                >
                    <div className="text-[10px] font-mono uppercase tracking-[0.35em] mb-4 text-accentPrimary opacity-75">
                        <span className="flex items-center justify-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-accentPrimary animate-pulse" /> Technical Arsenal
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display bg-clip-text text-transparent pb-2"
                        style={{ backgroundImage: 'linear-gradient(to right, var(--accent-primary), var(--accent-ai))' }}>
                        Technical Stack
                    </h2>
                    <div className="mt-3 rounded-full" style={{ width: 48, height: 3, backgroundImage: 'linear-gradient(to right, var(--accent-primary), var(--accent-ai))' }} />
                </motion.div>

                {/* Tab selections */}
                <div className="flex flex-wrap justify-center gap-2 mb-10 select-none">
                    {tabs.map(tab => {
                        const active = activeTab === tab;
                        const tc = getCategoryColor(tab);
                        return (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)}
                                className="relative px-5 py-2.5 rounded-full font-mono text-xs border transition-all duration-300 focus:outline-none font-bold"
                                style={{ 
                                    borderColor: active ? tc : 'var(--border-glass)', 
                                    color: active ? '#fff' : 'var(--text-muted)' 
                                }}
                            >
                                {active && (
                                    <motion.span 
                                        layoutId="hexTabHighlight" 
                                        className="absolute inset-0 rounded-full -z-10 animate-fade-in"
                                        style={{ background: tc, opacity: 0.15 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} 
                                    />
                                )}
                                {tab}
                            </button>
                        );
                    })}
                </div>

                {/* Categories container */}
                <div className="space-y-4">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }} 
                            transition={{ duration: 0.25 }}
                        >
                            {skills.length === 0 ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="text-center space-y-3">
                                        <div className="mx-auto rounded-full w-10 h-10 border-2 border-accentPrimary/25 border-t-accentPrimary animate-spin" />
                                        <p className="text-xs font-mono text-textMuted">Initializing Arsenal...</p>
                                    </div>
                                </div>
                            ) : (
                                visibleCats.map(cat => (
                                    <CategoryGroup 
                                        key={cat} 
                                        category={cat}
                                        catSkills={skills.filter(s => s.category === cat)} 
                                    />
                                ))
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
