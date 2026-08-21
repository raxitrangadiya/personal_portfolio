import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, X, Mail, Github, Linkedin, Terminal, MessageSquare } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Contact({ prefill, clearPrefill }) {
    const [formData, setFormData] = useState({ 
        name: '', 
        email: '', 
        type: 'General Inquiry',
        company: '',
        subject: '',
        budget: '',
        deadline: '',
        message: '' 
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (prefill) {
            setFormData(prev => ({
                ...prev,
                type: prefill.type || 'Project Inquiry',
                budget: prefill.budget || '',
                message: prefill.message || ''
            }));
            clearPrefill();
        }
    }, [prefill, clearPrefill]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) {
                throw new Error('Server returned an unexpected response. Please try again later.');
            }

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Could not submit form.');
            }

            setSubmitted(true);
            setFormData({ 
                name: '', 
                email: '', 
                type: 'General Inquiry',
                company: '',
                subject: '',
                budget: '',
                deadline: '',
                message: '' 
            });
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 max-w-6xl mx-auto px-6 mb-16 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Contact Context / Social Links (Left Column) */}
                <div className="lg:col-span-5 space-y-8 text-left">
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-accentPrimary font-mono text-sm tracking-wider">
                            <span>What's Next?</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extrabold text-textPrimary font-display tracking-tight leading-tight mb-4">
                            Let's Build Something
                        </h2>
                        <p className="text-textMuted text-base font-sans leading-relaxed">
                            Have a project concept, developer opportunity, or workflow challenge? Let's collaborate to architect a modern system matching your requirements.
                        </p>
                    </div>

                    {/* Direct Contact Cards */}
                    <div className="space-y-4">
                        <a 
                            href="mailto:raxitrangadiya8531@gmail.com" 
                            className="glass-panel p-4 rounded-xl border border-borderGlass flex items-center gap-4 hover:border-accentPrimary/40 transition-all duration-300 group hover:translate-x-[2px] bg-bgRaised/20"
                        >
                            <div className="p-3 rounded-lg bg-bgSurface text-accentPrimary group-hover:scale-105 transition-transform duration-300">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-textMuted font-mono uppercase tracking-wider">Direct Email</p>
                                <p className="text-sm font-semibold text-textPrimary">raxitrangadiya8531@gmail.com</p>
                            </div>
                        </a>

                        <a 
                            href="https://www.linkedin.com/in/raxitrangadiya/" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="glass-panel p-4 rounded-xl border border-borderGlass flex items-center gap-4 hover:border-accentPrimary/40 transition-all duration-300 group hover:translate-x-[2px] bg-bgRaised/20"
                        >
                            <div className="p-3 rounded-lg bg-bgSurface text-accentPrimary group-hover:scale-105 transition-transform duration-300">
                                <Linkedin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-textMuted font-mono uppercase tracking-wider">LinkedIn Connect</p>
                                <p className="text-sm font-semibold text-textPrimary">raxitrangadiya</p>
                            </div>
                        </a>

                        <a 
                            href="https://github.com/raxitrangadiya" 
                            target="_blank" 
                            rel="noreferrer" 
                            className="glass-panel p-4 rounded-xl border border-borderGlass flex items-center gap-4 hover:border-accentPrimary/40 transition-all duration-300 group hover:translate-x-[2px] bg-bgRaised/20"
                        >
                            <div className="p-3 rounded-lg bg-bgSurface text-accentPrimary group-hover:scale-105 transition-transform duration-300">
                                <Github className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-textMuted font-mono uppercase tracking-wider">GitHub Portfolio</p>
                                <p className="text-sm font-semibold text-textPrimary">raxitrangadiya</p>
                            </div>
                        </a>
                    </div>

                    {/* Developer Status card */}
                    <div className="p-5 rounded-2xl border border-borderGlass bg-accentPrimary/5 space-y-1 relative overflow-hidden">
                        <div className="flex items-center gap-1.5 text-accentPrimary font-mono text-[10px] font-bold uppercase tracking-wider select-none">
                            <Terminal className="w-4 h-4 animate-pulse" /> Developer Status
                        </div>
                        <p className="text-xs text-textMuted leading-relaxed">
                            Currently available for custom contract/freelance projects and technical full-time roles. Operating system active.
                        </p>
                    </div>
                </div>

                {/* Form Interface (Right Column) */}
                <div className="lg:col-span-7">
                    {/* Form Alert States */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="flex items-center gap-2 p-4 mb-6 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm text-left font-mono"
                            >
                                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="glass-panel p-6 md:p-8 rounded-3xl shadow-2xl text-left border border-borderGlass bg-bgSurface/30 relative">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name and Email */}
                            <div className="grid md:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-textPrimary mb-2 text-xs font-mono select-none">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm font-sans"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-textPrimary mb-2 text-xs font-mono select-none">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm font-sans"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Inquiry Type */}
                            <div>
                                <label htmlFor="type" className="block text-textPrimary mb-2 text-xs font-mono select-none">Inquiry Type</label>
                                <select
                                    id="type"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full bg-bgSurface border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm font-sans"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Freelance Project">Freelance / Contract Project</option>
                                    <option value="Developer Opportunity">Developer Job Invitation</option>
                                </select>
                            </div>

                            {/* Dynamic Freelance Fields */}
                            {formData.type === 'Freelance Project' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="grid md:grid-cols-3 gap-5 pt-1"
                                >
                                    <div>
                                        <label htmlFor="company" className="block text-textPrimary mb-2 text-xs font-mono">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm"
                                            placeholder="E.g., Tech Corp"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="budget" className="block text-textPrimary mb-2 text-xs font-mono">Est. Budget</label>
                                        <input
                                            type="text"
                                            id="budget"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                            className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm"
                                            placeholder="E.g., $1,000 - $3,000"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="deadline" className="block text-textPrimary mb-2 text-xs font-mono">Timeline</label>
                                        <input
                                            type="text"
                                            id="deadline"
                                            value={formData.deadline}
                                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                            className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm"
                                            placeholder="E.g., 4 weeks"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Dynamic Opportunity Fields */}
                            {formData.type === 'Developer Opportunity' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    className="grid md:grid-cols-2 gap-5 pt-1"
                                >
                                    <div>
                                        <label htmlFor="company" className="block text-textPrimary mb-2 text-xs font-mono">Company / Agency</label>
                                        <input
                                            type="text"
                                            id="company"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm"
                                            placeholder="E.g., Remote LLC"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-textPrimary mb-2 text-xs font-mono">Job Title / Role</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm"
                                            placeholder="E.g., Full Stack Engineer"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {/* Subject for general queries */}
                            {formData.type === 'General Inquiry' && (
                                <div>
                                    <label htmlFor="subject" className="block text-textPrimary mb-2 text-xs font-mono select-none">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm"
                                        placeholder="Quick subject summary..."
                                    />
                                </div>
                            )}

                            {/* Message Area */}
                            <div>
                                <label htmlFor="message" className="block text-textPrimary mb-2 text-xs font-mono select-none">Detailed Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/10 transition-all text-sm font-sans"
                                    placeholder="Describe your project, timeline, or invitation details..."
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-2">
                                <button
                                    type="submit"
                                    disabled={loading || submitted}
                                    className="flex items-center justify-center gap-2 px-8 py-4 border border-accentPrimary text-accentPrimary hover:text-white hover:bg-gradient-to-r hover:from-accentPrimary hover:to-accentGlow hover:border-transparent rounded-xl transition-all duration-300 font-mono text-sm font-bold shadow-glow-violet w-full sm:w-auto focus:outline-none"
                                >
                                    {loading ? 'Sending Proposal...' : (
                                        <>
                                            <Send className="w-4 h-4" /> Send Proposal
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Custom Premium Success Alert Modal Overlay */}
            <AnimatePresence>
                {submitted && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSubmitted(false)}
                            className="fixed inset-0 bg-black/85 backdrop-blur-md"
                        ></motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            transition={{ type: 'spring', duration: 0.5 }}
                            className="bg-[#0b0f1d] border border-borderGlass rounded-2xl w-full max-w-md p-8 relative z-10 shadow-2xl text-center flex flex-col items-center"
                        >
                            <button
                                onClick={() => setSubmitted(false)}
                                className="absolute top-6 right-6 text-textMuted hover:text-textPrimary transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 mt-4 shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                                <CheckCircle className="w-8 h-8" />
                            </div>

                            <h3 className="text-2xl font-bold text-textPrimary font-sans mb-3">
                                Proposal Sent!
                            </h3>

                            <p className="text-textMuted text-sm leading-relaxed mb-6">
                                Thank you for reaching out! Your proposal has been successfully saved to the database and forwarded to my inbox. I will review the details and get back to you shortly.
                            </p>

                            <button
                                onClick={() => setSubmitted(false)}
                                className="w-full py-3.5 bg-gradient-to-r from-accentPrimary to-accentGlow text-white rounded-xl font-mono text-sm font-bold hover:shadow-[0_0_20px_rgba(108,99,255,0.25)] transition-all duration-300"
                            >
                                Great, Thanks!
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
