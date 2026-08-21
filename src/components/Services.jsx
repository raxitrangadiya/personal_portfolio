import React, { useState, useEffect } from 'react';
import { Cpu, Layout, Layers, ArrowRight, DollarSign, Clock, Check, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

export default function Services({ onProceedEstimate }) {
    // Estimator wizard step: 1 (Type), 2 (Scope), 3 (Delivery & Discount), 4 (Result)
    const [step, setStep] = useState(1);
    
    // Estimator state
    const [projectType, setProjectType] = useState('full-stack'); // landing, api-automation, full-stack
    const [screens, setScreens] = useState(3);
    const [needsDatabase, setNeedsDatabase] = useState(true);
    const [needsAi, setNeedsAi] = useState(false);
    const [isExpress, setIsExpress] = useState(false);
    const [isStartupDiscount, setIsStartupDiscount] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: 800, max: 1000 });

    // Calculate Price dynamically
    useEffect(() => {
        let baseMin = 350;
        let baseMax = 450;

        if (projectType === 'api-automation') {
            baseMin = 450;
            baseMax = 600;
        } else if (projectType === 'full-stack') {
            baseMin = 800;
            baseMax = 1100;
        }

        // Screens modifier (beyond 1 screen)
        const screenMultiplier = Math.max(0, screens - 1);
        baseMin += screenMultiplier * 70;
        baseMax += screenMultiplier * 95;

        // Database modifier
        if (needsDatabase && projectType !== 'api-automation') {
            baseMin += 120;
            baseMax += 180;
        }

        // AI / API Integrations modifier
        if (needsAi) {
            baseMin += 180;
            baseMax += 260;
        }

        // Express Delivery modifier (25% markup)
        if (isExpress) {
            baseMin = Math.round(baseMin * 1.25);
            baseMax = Math.round(baseMax * 1.25);
        }

        // Startup Discount modifier (20% discount)
        if (isStartupDiscount) {
            baseMin = Math.round(baseMin * 0.8);
            baseMax = Math.round(baseMax * 0.8);
        }

        setPriceRange({ min: baseMin, max: baseMax });
    }, [projectType, screens, needsDatabase, needsAi, isExpress, isStartupDiscount]);

    // Handle proceed to contact
    const handleProceed = () => {
        const typeLabels = {
            'landing': 'Single-Page Landing / Frontend Interface',
            'api-automation': 'API Integrations & AI Agent Workflows',
            'full-stack': 'Full-Stack Web Application'
        };

        const messageText = `Hi Raxit,

I built a custom project estimate using your portfolio calculator:
- Project Type: ${typeLabels[projectType]}
- Screens/Views: ${screens}
- Database Setup: ${needsDatabase ? 'Required' : 'Not Required'}
- AI Agent / Custom API Pipelines: ${needsAi ? 'Required' : 'Not Required'}
- Delivery Speed: ${isExpress ? 'Express (Fast Track)' : 'Standard'}
- Startup/Bootstrapped Discount Applied: ${isStartupDiscount ? 'Yes (20% Discount)' : 'No'}

Estimated Budget Range: $${priceRange.min} - $${priceRange.max}

I'd like to structure a flexible milestone plan matching this scope. Let's schedule a call to discuss!`;

        onProceedEstimate({
            type: 'Project Inquiry',
            budget: `$${priceRange.min} - $${priceRange.max}`,
            message: messageText
        });

        // Smooth scroll to contact
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const typeLabels = {
        'landing': 'Frontend Interface',
        'api-automation': 'API/AI Workflows',
        'full-stack': 'Full-Stack Application'
    };

    return (
        <section id="services" className="py-24 bg-bgVoid relative z-10 w-full overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="flex items-center justify-center gap-2 mb-4 text-accentPrimary font-mono text-sm tracking-wider">
                        <span>Freelance Offerings</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-textPrimary font-display tracking-tight leading-tight">
                        Services & Project Estimator
                    </h2>
                    <p className="text-textMuted mt-4 text-base font-sans leading-relaxed">
                        Check out standard service packages or configure a step-by-step custom estimate matching your target budget.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Services Packages (Left Column) */}
                    <div className="lg:col-span-7 space-y-6">
                        <h3 className="text-lg font-bold text-textPrimary font-mono mb-2 flex items-center gap-2">
                            <span>// Core Services</span>
                        </h3>

                        {/* Service Package 1 */}
                        <div className="glass-panel border border-borderGlass hover:border-accentPrimary/40 transition-all duration-300 p-6 rounded-2xl flex gap-5 items-start">
                            <div className="p-3 bg-accentPrimary/10 text-accentPrimary rounded-xl">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <h4 className="font-bold text-textPrimary text-base font-display">AI Automation & Workflows</h4>
                                    <span className="text-xs font-mono text-accentPrimary bg-accentPrimary/10 px-2.5 py-1 rounded-full font-bold">Starts at $450</span>
                                </div>
                                <p className="text-xs text-textMuted mt-2 leading-relaxed font-sans">
                                    Build autonomous multiagent systems, customized n8n pipelines, and API integrations with Claude/Gemini model workflows.
                                </p>
                                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono text-textMuted">
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Custom n8n Workflows</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> AI API Connectors</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Webhook Integrations</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Cron & Task Schedules</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Package 2 */}
                        <div className="glass-panel border border-borderGlass hover:border-accentPrimary/40 transition-all duration-300 p-6 rounded-2xl flex gap-5 items-start">
                            <div className="p-3 bg-accentPrimary/10 text-accentPrimary rounded-xl">
                                <Layout className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <h4 className="font-bold text-textPrimary text-base font-display">Interactive Web Interface</h4>
                                    <span className="text-xs font-mono text-accentPrimary bg-accentPrimary/10 px-2.5 py-1 rounded-full font-bold">Starts at $350</span>
                                </div>
                                <p className="text-xs text-textMuted mt-2 leading-relaxed font-sans">
                                    High-fidelity landing pages and portfolios built in Vite/React. Leverages 3D effects, Glassmorphic overlays, and tailwind responsive styling.
                                </p>
                                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono text-textMuted">
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> React & Vite Engine</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> 3D WebGL Effects</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Tailwind Custom Grid</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> SEO Ready</span>
                                </div>
                            </div>
                        </div>

                        {/* Service Package 3 */}
                        <div className="glass-panel border border-borderGlass hover:border-accentPrimary/40 transition-all duration-300 p-6 rounded-2xl flex gap-5 items-start">
                            <div className="p-3 bg-accentPrimary/10 text-accentPrimary rounded-xl">
                                <Layers className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                    <h4 className="font-bold text-textPrimary text-base font-display">Full-Stack Application</h4>
                                    <span className="text-xs font-mono text-accentPrimary bg-accentPrimary/10 px-2.5 py-1 rounded-full font-bold">Starts at $800</span>
                                </div>
                                <p className="text-xs text-textMuted mt-2 leading-relaxed font-sans">
                                    Complete production platforms with normalized MongoDB database, Express REST APIs, custom admin dashboard panels, and secure credentials management.
                                </p>
                                <div className="grid grid-cols-2 gap-2 mt-4 text-[11px] font-mono text-textMuted">
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Node/Express REST API</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> MongoDB Atlas Database</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Admin Panels & Auth</span>
                                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-accentAi" /> Secure Credentials</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Estimator Wizard (Right Column) */}
                    <div className="lg:col-span-5">
                        <h3 className="text-lg font-bold text-textPrimary font-mono mb-2 flex justify-between items-center">
                            <span>// Interactive Estimator</span>
                            <span className="text-xs text-textMuted font-mono font-normal">Step {step} of 4</span>
                        </h3>

                        <div className="glass-panel border border-borderGlass p-6 rounded-3xl relative overflow-hidden shadow-2xl bg-bgSurface/40">
                            {/* Wizard Progress Line */}
                            <div className="w-full bg-white/10 h-[3px] rounded-full mb-6 overflow-hidden">
                                <div 
                                    className="bg-accentPrimary h-full transition-all duration-300"
                                    style={{ width: `${(step / 4) * 100}%` }}
                                />
                            </div>

                            {/* Step 1: Project Type */}
                            {step === 1 && (
                                <div className="space-y-4">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">Select Project Type</h4>
                                    
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setProjectType('landing');
                                            setStep(2);
                                        }}
                                        className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all ${projectType === 'landing' ? 'border-accentPrimary bg-accentPrimary/5 shadow-md' : 'border-borderGlass hover:border-accentPrimary/30 bg-bgRaised/20'}`}
                                    >
                                        <div className={`p-2 rounded-lg bg-bgSurface ${projectType === 'landing' ? 'text-accentPrimary' : 'text-textMuted'}`}>
                                            <Layout className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-textPrimary font-display">Frontend Interface</p>
                                            <p className="text-[10px] text-textMuted mt-0.5">High-end UI, React, interactive animations. Starts at $350</p>
                                        </div>
                                    </button>

                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setProjectType('api-automation');
                                            setNeedsDatabase(false); // Default false for automation
                                            setStep(2);
                                        }}
                                        className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all ${projectType === 'api-automation' ? 'border-accentPrimary bg-accentPrimary/5 shadow-md' : 'border-borderGlass hover:border-accentPrimary/30 bg-bgRaised/20'}`}
                                    >
                                        <div className={`p-2 rounded-lg bg-bgSurface ${projectType === 'api-automation' ? 'text-accentPrimary' : 'text-textMuted'}`}>
                                            <Cpu className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-textPrimary font-display">API &amp; AI Workflows</p>
                                            <p className="text-[10px] text-textMuted mt-0.5">n8n connectors, Claude/OpenAI pipelines. Starts at $450</p>
                                        </div>
                                    </button>

                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setProjectType('full-stack');
                                            setNeedsDatabase(true);
                                            setStep(2);
                                        }}
                                        className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all ${projectType === 'full-stack' ? 'border-accentPrimary bg-accentPrimary/5 shadow-md' : 'border-borderGlass hover:border-accentPrimary/30 bg-bgRaised/20'}`}
                                    >
                                        <div className={`p-2 rounded-lg bg-bgSurface ${projectType === 'full-stack' ? 'text-accentPrimary' : 'text-textMuted'}`}>
                                            <Layers className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-textPrimary font-display">Full-Stack Application</p>
                                            <p className="text-[10px] text-textMuted mt-0.5">Databases, backends, dashboards. Starts at $800</p>
                                        </div>
                                    </button>

                                    <div className="flex justify-end pt-4">
                                        <button 
                                            onClick={() => setStep(2)}
                                            className="px-5 py-2.5 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md focus:outline-none"
                                        >
                                            Next Step <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Scope Configuration */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">Configure Project Scope</h4>

                                    {/* Screens (hidden for automation) */}
                                    {projectType !== 'api-automation' && (
                                        <div>
                                            <div className="flex justify-between text-[11px] font-mono text-textMuted mb-2 uppercase tracking-wider">
                                                <span>Screens / Views</span>
                                                <span className="text-accentPrimary font-bold">{screens} {screens === 1 ? 'Screen' : 'Screens'}</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="1" 
                                                max="10" 
                                                value={screens}
                                                onChange={(e) => setScreens(parseInt(e.target.value))}
                                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accentPrimary"
                                            />
                                            <div className="flex justify-between text-[9px] font-mono text-textMuted/50 mt-1 select-none">
                                                <span>1 Screen</span>
                                                <span>10 Screens</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Feature Toggles */}
                                    <div className="space-y-4 pt-2">
                                        {projectType !== 'api-automation' && (
                                            <label className="flex items-center justify-between cursor-pointer group select-none">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-mono text-textPrimary">Database Setup</span>
                                                    <span className="text-[10px] text-textMuted">MongoDB/PostgreSQL configuration</span>
                                                </div>
                                                <input 
                                                    type="checkbox" 
                                                    checked={needsDatabase}
                                                    onChange={(e) => setNeedsDatabase(e.target.checked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="relative w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accentPrimary"></div>
                                            </label>
                                        )}

                                        <label className="flex items-center justify-between cursor-pointer group select-none">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-mono text-textPrimary">AI Agents &amp; APIs</span>
                                                <span className="text-[10px] text-textMuted">Claude/Gemini custom models setup</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={needsAi}
                                                onChange={(e) => setNeedsAi(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accentPrimary"></div>
                                        </label>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button 
                                            onClick={() => setStep(1)}
                                            className="px-4 py-2 border border-borderGlass text-textPrimary hover:bg-white/5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all focus:outline-none"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                        <button 
                                            onClick={() => setStep(3)}
                                            className="px-5 py-2.5 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md focus:outline-none"
                                        >
                                            Next Step <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Delivery & Startup Discount */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">Delivery &amp; Discounts</h4>

                                    <div className="space-y-4">
                                        {/* Startup Discount */}
                                        <label className="flex items-center justify-between cursor-pointer group p-4 rounded-xl border border-borderGlass/60 bg-bgRaised/10 select-none">
                                            <div className="flex flex-col flex-1 pr-4">
                                                <span className="text-xs font-mono text-textPrimary flex items-center gap-1.5">
                                                    Startup / Bootstrapped Discount <span className="text-[9px] font-mono bg-accentAi/10 border border-accentAi/25 text-accentAi px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Save 20%</span>
                                                </span>
                                                <span className="text-[10px] text-textMuted mt-0.5">Apply bootstrapped startup and multi-project discount rates</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={isStartupDiscount}
                                                onChange={(e) => setIsStartupDiscount(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accentPrimary flex-shrink-0"></div>
                                        </label>

                                        {/* Express Delivery */}
                                        <label className="flex items-center justify-between cursor-pointer group select-none">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-mono text-textPrimary">Express Delivery</span>
                                                <span className="text-[10px] text-textMuted">Prioritized fast-track delivery (25% markup)</span>
                                            </div>
                                            <input 
                                                type="checkbox" 
                                                checked={isExpress}
                                                onChange={(e) => setIsExpress(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="relative w-9 h-5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accentPrimary"></div>
                                        </label>
                                    </div>

                                    <div className="flex justify-between pt-4">
                                        <button 
                                            onClick={() => setStep(2)}
                                            className="px-4 py-2 border border-borderGlass text-textPrimary hover:bg-white/5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all focus:outline-none"
                                        >
                                            <ChevronLeft className="w-4 h-4" /> Back
                                        </button>
                                        <button 
                                            onClick={() => setStep(4)}
                                            className="px-5 py-2.5 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md focus:outline-none"
                                        >
                                            Calculate Price <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Budget Range Output */}
                            {step === 4 && (
                                <div className="space-y-6">
                                    <h4 className="text-xs font-mono uppercase tracking-wider text-textMuted">Project Budget Estimate</h4>

                                    <div className="bg-bgRaised/40 border border-borderGlass/60 p-5 rounded-2xl text-center space-y-1 relative overflow-hidden">
                                        <div className="text-[9px] font-mono text-textMuted uppercase tracking-widest flex items-center justify-center gap-1">
                                            <DollarSign className="w-3 h-3 text-accentAi" /> Computed Range ({typeLabels[projectType]})
                                        </div>
                                        <div className="text-3xl font-extrabold font-display text-textPrimary tracking-tight">
                                            ${priceRange.min} - ${priceRange.max}
                                        </div>
                                        {isStartupDiscount && (
                                            <div className="text-[9px] font-mono text-accentAi font-bold uppercase tracking-wider mt-1 select-none">
                                                Startup 20% discount applied!
                                            </div>
                                        )}
                                        <div className="text-[9px] font-mono text-textMuted flex items-center justify-center gap-1 select-none mt-1">
                                            <Clock className="w-3.5 h-3.5" /> Estimate calculated in USD
                                        </div>
                                    </div>

                                    {/* Callout warning detailing negotiability and milestone structures */}
                                    <div className="p-3.5 rounded-xl border border-borderGlass/30 bg-accentPrimary/5 text-left text-xs font-sans text-textMuted leading-relaxed space-y-1">
                                        <p className="font-bold font-mono text-[10px] text-accentPrimary uppercase tracking-wider flex items-center gap-1 select-none">
                                            <span>💡 Flexible Payment &amp; Milestones</span>
                                        </p>
                                        <p className="text-[11px]">
                                            These ranges are approximate. I structure contracts with **milestone-based payments** (e.g. 25% increments) and custom deliverables to align exactly with your target budget.
                                        </p>
                                    </div>

                                    <div className="flex justify-between pt-4 gap-3">
                                        <button 
                                            onClick={() => {
                                                setStep(1);
                                                setIsExpress(false);
                                                setIsStartupDiscount(false);
                                            }}
                                            className="px-3.5 py-3 border border-borderGlass text-textPrimary hover:bg-white/5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all focus:outline-none"
                                            title="Restart Estimator"
                                        >
                                            <RotateCcw className="w-4 h-4" /> Reset
                                        </button>
                                        <button 
                                            onClick={handleProceed}
                                            className="flex-1 py-3.5 bg-accentPrimary hover:bg-accentPrimary/90 text-white rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-md focus:outline-none"
                                        >
                                            Proceed with Estimate <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
