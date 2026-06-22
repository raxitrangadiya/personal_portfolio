import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, X } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function Contact() {
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

            if (!res.ok) {
                const data = await res.json();
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
        <section id="contact" className="py-20 max-w-4xl mx-auto px-6 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
            >
                <div className="flex items-center justify-center gap-2 mb-4 text-accentPrimary font-mono text-sm tracking-wider">
                    <span>What's Next?</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-textPrimary font-display mb-6">
                    Get In Touch
                </h2>

                <p className="text-textMuted text-lg mb-12">
                    Let's collaborate! Select your inquiry type below to send a secure proposal directly to my inbox. I typically respond within 24 hours.
                </p>

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

                {/* Contact Interface */}
                <div className="glass-panel p-8 md:p-10 rounded-2xl shadow-2xl text-left border border-borderGlass">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-textPrimary mb-2 text-sm font-mono">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm font-sans"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-textPrimary mb-2 text-sm font-mono">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm font-sans"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        {/* Inquiry Type */}
                        <div>
                            <label htmlFor="type" className="block text-textPrimary mb-2 text-sm font-mono">Inquiry Type</label>
                            <select
                                id="type"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-bgSurface border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm font-sans"
                            >
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Freelance Project">Freelance / Contract Project</option>
                                <option value="Developer Opportunity">Developer Job Invitation</option>
                                <option value="Event Invitation">Event / Speaker Invitation</option>
                            </select>
                        </div>

                        {/* Dynamic Freelance Fields */}
                        {formData.type === 'Freelance Project' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="grid md:grid-cols-3 gap-6 pt-2"
                            >
                                <div className="md:col-span-1">
                                    <label htmlFor="company" className="block text-textPrimary mb-2 text-sm font-mono">Company Name</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                        placeholder="E.g., Tech Corp"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="budget" className="block text-textPrimary mb-2 text-sm font-mono">Est. Budget</label>
                                    <input
                                        type="text"
                                        id="budget"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                        placeholder="E.g., $3,000 - $5,000"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="deadline" className="block text-textPrimary mb-2 text-sm font-mono">Est. Timeline</label>
                                    <input
                                        type="text"
                                        id="deadline"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
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
                                className="grid md:grid-cols-2 gap-6 pt-2"
                            >
                                <div>
                                    <label htmlFor="company" className="block text-textPrimary mb-2 text-sm font-mono">Company / Agency</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                        placeholder="E.g., Google, Remote LLC"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-textPrimary mb-2 text-sm font-mono">Job Title / Role</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                        placeholder="E.g., Senior React Developer"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Dynamic Event Fields */}
                        {formData.type === 'Event Invitation' && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="grid md:grid-cols-2 gap-6 pt-2"
                            >
                                <div>
                                    <label htmlFor="company" className="block text-textPrimary mb-2 text-sm font-mono">Event Name / Org</label>
                                    <input
                                        type="text"
                                        id="company"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                        placeholder="E.g., Morbi Tech Summit"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="deadline" className="block text-textPrimary mb-2 text-sm font-mono">Event Date</label>
                                    <input
                                        type="text"
                                        id="deadline"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                        placeholder="E.g., August 12, 2026"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Message Subject (Shown for general queries) */}
                        {formData.type === 'General Inquiry' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <label htmlFor="subject" className="block text-textPrimary mb-2 text-sm font-mono">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm"
                                    placeholder="Quick subject summary..."
                                />
                            </motion.div>
                        )}

                        {/* Main Message Input */}
                        <div>
                            <label htmlFor="message" className="block text-textPrimary mb-2 text-sm font-mono">Detailed Message</label>
                            <textarea
                                id="message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-bgVoid/40 border border-borderGlass rounded-xl p-3.5 text-textPrimary focus:outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/20 transition-all text-sm font-sans"
                                placeholder="Describe your project, terms, or inquiry in detail..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={loading || submitted}
                                className="flex items-center justify-center gap-2 px-8 py-4 border border-accentPrimary text-accentPrimary hover:text-white hover:bg-gradient-to-r hover:from-accentPrimary hover:to-accentGlow hover:border-transparent rounded-xl transition-all duration-300 font-mono text-sm font-bold shadow-glow-violet w-full sm:w-auto"
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
            </motion.div>

            {/* Custom Premium Success Alert Modal Overlay */}
            <AnimatePresence>
                {submitted && (
                    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSubmitted(false)}
                            className="fixed inset-0 bg-black/85 backdrop-blur-md"
                        ></motion.div>

                        {/* Modal Box */}
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
