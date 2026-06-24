import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as LucideIcons from 'lucide-react';
import { Code, Terminal } from 'lucide-react';

// ─── Config ───────────────────────────────────────────────────────────────────
const DEFAULT_HEX_CONFIG = { w: 138, h: 154, gap: 5, overlap: 37 };
const HEX_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

// ─── Helpers ──────────────────────────────────────────────────────────────────
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
    if (c.includes('front'))                        return '#6C63FF';
    if (c.includes('back'))                         return '#10B981';
    if (c.includes('ai') || c.includes('automat'))  return '#00E5FF';
    if (c.includes('devops') || c.includes('tool')) return '#FF6B6B';
    return '#3B82F6';
}

function isAiCat(cat) {
    if (!cat) return false;
    const c = cat.toLowerCase();
    return c.includes('ai') || c.includes('automat');
}

// ─── Single hexagonal skill card ─────────────────────────────────────────────────
function HexCard({ skill, color, isAi, idx, config = DEFAULT_HEX_CONFIG }) {
    const [tilt,    setTilt]    = useState({ rotX: 0, rotY: 0 });
    const [spot,    setSpot]    = useState(null);
    const [hovered, setHovered] = useState(false);
    const [noAnim,  setNoAnim]  = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setNoAnim(mq.matches);
        const fn = e => setNoAnim(e.matches);
        mq.addEventListener('change', fn);
        return () => mq.removeEventListener('change', fn);
    }, []);

    function onMove(e) {
        if (noAnim || !wrapRef.current) return;
        const r = wrapRef.current.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        setTilt({ rotX: -((y / r.height) - 0.5) * 14, rotY: ((x / r.width) - 0.5) * 14 });
        setSpot({ x, y });
    }
    function onEnter() { setHovered(true); }
    function onLeave() {
        setHovered(false);
        setTilt({ rotX: 0, rotY: 0 });
        setSpot(null);
    }

    const tiltTransform = noAnim ? undefined
        : hovered
            ? `perspective(720px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) translateY(-10px) scale(1.08)`
            : 'perspective(720px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';

    const glowFilter = hovered
        ? `drop-shadow(0 4px 12px ${color}33) drop-shadow(0 0 6px ${color}22)`
        : isAi ? undefined
        : `drop-shadow(0 0 4px ${color}12)`;

    const Icon = getIconComponent(skill.icon);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.55, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.55 }}
            transition={{ delay: idx * 0.038, type: 'spring', stiffness: 230, damping: 22 }}
            style={{ width: config.w, height: config.h, flexShrink: 0, position: 'relative' }}
        >
            {/* Tilt + glow wrapper */}
            <div
                ref={wrapRef}
                onMouseMove={onMove}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
                className={!hovered && isAi ? 'hex-ai-glow' : ''}
                style={{
                    width: '100%', height: '100%',
                    transform:  tiltTransform,
                    filter:     glowFilter,
                    willChange: 'transform, filter',
                    transition: hovered
                        ? 'transform 0.12s ease-out, filter 0.25s ease'
                        : 'transform 0.5s cubic-bezier(0.25,1,0.5,1), filter 0.5s ease',
                    cursor: 'default',
                    position: 'relative',
                }}
            >
                {/* Outer hex — colored border layer */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        clipPath: HEX_CLIP,
                        background: hovered ? color : 'rgba(255,255,255,0.065)',
                        transition: 'background 0.3s ease',
                    }}
                />

                {/* Inner hex — fill layer (uniform 2 px inset via scale) */}
                <div
                    style={{
                        position: 'absolute', inset: 0,
                        transform: 'scale(0.964)',
                        transformOrigin: 'center',
                        clipPath: HEX_CLIP,
                        background: hovered
                            ? `linear-gradient(155deg, #111827 0%, ${color}2a 100%)`
                            : 'linear-gradient(155deg, #0b1021 0%, #0f1629 100%)',
                        transition: 'background 0.35s ease',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                    }}
                >
                    {/* Cursor spotlight */}
                    {spot && (
                        <div
                            className="absolute inset-0 pointer-events-none z-10"
                            style={{
                                background: `radial-gradient(75px circle at ${spot.x}px ${spot.y}px, rgba(255,255,255,0.18), transparent 70%)`,
                            }}
                        />
                    )}

                    {/* Top surface sheen */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.035) 0%, transparent 55%)' }}
                    />

                    {/* Card content */}
                    <div className="relative z-20 flex flex-col items-center justify-center gap-1.5 px-4 w-full">
                        {/* Icon */}
                        <div
                            style={{
                                fontSize: '1.75rem',
                                color: hovered ? color : 'rgba(240,246,255,0.62)',
                                transform: hovered ? 'scale(1.18)' : 'scale(1)',
                                transition: 'color 0.3s ease, transform 0.3s ease',
                            }}
                        >
                            <Icon />
                        </div>

                        {/* Skill name */}
                        <span
                            className="text-[10.5px] font-semibold text-center leading-tight font-display select-none"
                            style={{
                                color: hovered ? '#F0F6FF' : '#8892A4',
                                transition: 'color 0.3s ease',
                                maxWidth: '90px',
                                wordBreak: 'break-word',
                            }}
                        >
                            {skill.name}
                        </span>

                        {/* Thin proficiency bar */}
                        {typeof skill.proficiency === 'number' && skill.proficiency > 0 && (
                            <div
                                className="w-12 rounded-full overflow-hidden mt-1.5"
                                style={{ height: '3px', background: 'rgba(255,255,255,0.06)' }}
                            >
                                <motion.div
                                    className="h-full rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.proficiency}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.1, delay: idx * 0.04, ease: 'easeOut' }}
                                    style={{ background: color }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Badge — outside clip-path so it sits above the hex edge */}
                {skill.badge && (
                    <div
                        className="absolute z-30 uppercase font-mono font-bold tracking-widest"
                        style={{
                            top: '19%', right: '8%',
                            fontSize: '7px', lineHeight: 1.2,
                            padding: '2px 5px', borderRadius: '3px',
                            background: `${color}22`,
                            border: `1px solid ${color}55`,
                            color: color,
                        }}
                    >
                        {skill.badge}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// ─── Category group: header + honeycomb rows ────────────────────────────────────────────
function CategoryGroup({ category, catSkills, hexesPerRow, config = DEFAULT_HEX_CONFIG }) {
    const color = getCategoryColor(category);

    const rows = useMemo(() => {
        const out = [];
        for (let i = 0; i < catSkills.length; i += hexesPerRow) {
            out.push(catSkills.slice(i, i + hexesPerRow));
        }
        return out;
    }, [catSkills, hexesPerRow]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
        >
            {/* Category header divider */}
            <div className="flex items-center gap-3 mb-5">
                <div
                    className="h-px flex-shrink-0"
                    style={{ width: 40, background: `linear-gradient(to right, transparent, ${color})` }}
                />
                <div
                    className="text-[10px] font-mono uppercase tracking-[0.28em] px-3 py-1 rounded-full border flex-shrink-0"
                    style={{ color, borderColor: `${color}44`, background: `${color}14` }}
                >
                    <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5" /> {category}</span>
                </div>
                <div
                    className="h-px flex-1"
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                />
                <span className="text-[9px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.18)' }}>
                    {catSkills.length} techs
                </span>
            </div>

            {/* Honeycomb rows */}
            <div className="flex flex-col items-center">
                {rows.map((row, rIdx) => (
                    <div
                        key={rIdx}
                        className="flex justify-center"
                        style={{
                            gap: `${config.gap}px`,
                            marginTop: rIdx === 0 ? 0 : `-${config.overlap}px`,
                            paddingLeft: rIdx % 2 === 1 ? `${(config.w + config.gap) * 0.5}px` : '0',
                        }}
                    >
                        {row.map((skill, i) => (
                            <HexCard
                                key={skill._id || skill.name}
                                skill={skill}
                                color={getCategoryColor(skill.category)}
                                isAi={isAiCat(skill.category)}
                                idx={rIdx * hexesPerRow + i}
                                config={config}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

// ─── Main Skills section ────────────────────────────────────────────────────────────

// Main Skills section
export default function Skills({ skills }) {
    const [activeTab,   setActiveTab]   = useState('All');
    const [hexesPerRow, setHexesPerRow] = useState(6);
    const [honeycombConfig, setHoneycombConfig] = useState(DEFAULT_HEX_CONFIG);

    useEffect(() => {
        function update() {
            const w = window.innerWidth;
            let config = { w: 138, h: 154, gap: 5, overlap: 37 };
            let rows = 6;
            if (w < 350) {
                config = { w: 85, h: 95, gap: 4, overlap: 22 };
                rows = 2;
            } else if (w < 400) {
                config = { w: 95, h: 106, gap: 4, overlap: 25 };
                rows = 2;
            } else if (w < 480) {
                config = { w: 110, h: 122, gap: 4, overlap: 29 };
                rows = 2;
            } else if (w < 640) {
                config = { w: 110, h: 122, gap: 4, overlap: 29 };
                rows = 3;
            } else if (w < 900) {
                config = { w: 120, h: 134, gap: 4, overlap: 32 };
                rows = 4;
            } else if (w < 1100) {
                config = { w: 130, h: 145, gap: 5, overlap: 35 };
                rows = 5;
            }
            setHoneycombConfig(config);
            setHexesPerRow(rows);
        }
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        const id = 'hex-skills-keyframes';
        if (document.getElementById(id)) return;
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `.hex-ai-glow{animation:hexAiGlow 2.8s ease-in-out infinite}@keyframes hexAiGlow{0%,100%{filter:drop-shadow(0 0 2px rgba(0,229,255,.15))}50%{filter:drop-shadow(0 0 10px rgba(0,229,255,.35))}}@keyframes spinLoader{to{transform:rotate(360deg)}}.hex-spin-loader{animation:spinLoader 1s linear infinite}.skills-scroll::-webkit-scrollbar{width:4px}.skills-scroll::-webkit-scrollbar-track{background:transparent}.skills-scroll::-webkit-scrollbar-thumb{background:rgba(108,99,255,.35);border-radius:4px}.skills-scroll::-webkit-scrollbar-thumb:hover{background:rgba(108,99,255,.65)}.skills-scroll{scrollbar-width:thin;scrollbar-color:rgba(108,99,255,.35) transparent}`;
        document.head.appendChild(s);
    }, []);

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
        <section id="skills" className="py-16 bg-[#050811] relative z-10 w-full overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center mb-10 text-center"
                >
                    <div className="text-[11px] font-mono uppercase tracking-[0.35em] mb-4" style={{ color: '#00E5FF', opacity: 0.6 }}>
                        <span className="flex items-center justify-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-accentAi animate-pulse" /> Technical Arsenal</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-display bg-clip-text text-transparent pb-2"
                        style={{ backgroundImage: 'linear-gradient(to right, #6C63FF, #00E5FF)' }}>
                        Technical Stack
                    </h2>
                    <div className="mt-3 rounded-full" style={{ width: 48, height: 2, backgroundImage: 'linear-gradient(to right, #6C63FF, #00E5FF)' }} />
                    <p className="text-xs mt-3 font-mono" style={{ color: 'rgba(255,255,255,0.25)' }}>
                        {skills.length} technologies &middot; {categories.length} domains
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-2.5 mb-5 select-none">
                    {tabs.map(tab => {
                        const active = activeTab === tab;
                        const tc = getCategoryColor(tab);
                        return (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className="relative px-5 py-2 rounded-full font-mono text-xs border transition-all duration-300 focus:outline-none"
                                style={{ borderColor: active ? tc : 'rgba(255,255,255,0.08)', color: active ? '#fff' : 'rgba(255,255,255,0.45)' }}>
                                {active && (
                                    <motion.span layoutId="hexTabHighlight" className="absolute inset-0 rounded-full -z-10"
                                        style={{ background: tc, opacity: 0.18 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                                )}
                                {tab}
                            </button>
                        );
                    })}
                </div>

                <div className="skills-scroll overflow-y-auto"
                    style={{
                        maxHeight: '64vh', paddingRight: '4px',
                        maskImage: 'linear-gradient(to bottom,transparent 0%,black 3%,black 94%,transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,black 3%,black 94%,transparent 100%)',
                    }}>
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab}
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
                            style={{ paddingTop: 12, paddingBottom: 32 }}>
                            {skills.length === 0 ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="text-center space-y-3">
                                        <div className="mx-auto rounded-full hex-spin-loader"
                                            style={{ width: 44, height: 44, border: '2px solid rgba(108,99,255,0.25)', borderTopColor: '#6C63FF' }} />
                                        <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>Loading...</p>
                                    </div>
                                </div>
                            ) : (
                                visibleCats.map(cat => (
                                    <CategoryGroup key={cat} category={cat}
                                        catSkills={skills.filter(s => s.category === cat)}
                                        hexesPerRow={hexesPerRow}
                                        config={honeycombConfig} />
                                ))
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
