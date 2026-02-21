import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { Send, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset after 3s
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="py-20 max-w-4xl mx-auto px-6 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-2xl mx-auto"
            >
                <div className="flex items-center justify-center gap-2 mb-4 text-primary font-mono text-sm tracking-wider">
                    <span>05.</span>
                    <span>What's Next?</span>
                </div>

                <h2 className="text-4xl md:text-5xl font-bold text-textLight mb-6">
                    Get In Touch
                </h2>

                <p className="text-textDark text-lg mb-12">
                    I'm currently looking for new opportunities, my inbox is always open.
                    Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>

                {/* Contact Interface */}
                <div className="bg-[#112240] p-8 rounded-lg shadow-xl text-left border border-[#233554]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-textLight mb-2 text-sm">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-textLight focus:outline-none focus:border-primary transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-textLight mb-2 text-sm">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-textLight focus:outline-none focus:border-primary transition-colors"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-textLight mb-2 text-sm">Message</label>
                            <textarea
                                id="message"
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-[#0a192f] border border-[#233554] rounded p-3 text-textLight focus:outline-none focus:border-primary transition-colors"
                                placeholder="Hello, I'd like to talk about..."
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-between">
                            <a
                                href={`mailto:${resumeData.personalInfo.email}`}
                                className="text-sm text-primary hover:underline font-mono"
                            >
                                Or email me directly
                            </a>

                            <button
                                type="submit"
                                className="flex items-center gap-2 px-8 py-4 border border-primary text-primary rounded hover:bg-primary/10 transition-colors font-mono text-sm"
                            >
                                {submitted ? (
                                    <>
                                        <CheckCircle className="w-4 h-4" /> Sent!
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" /> Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

            </motion.div>
        </section>
    );
}
