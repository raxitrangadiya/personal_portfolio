import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Check } from 'lucide-react';

export default function ProjectDetailsModal({ project, onClose }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = project.gallery && project.gallery.length > 0
        ? [project.image, ...project.gallery]
        : [project.image].filter(Boolean);

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-start md:items-center justify-center p-4 md:p-6 overflow-y-auto">
            {/* Modal Backdrop overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-[#0b0f19] border border-white/10 rounded-2xl w-full max-w-4xl relative z-10 shadow-2xl flex flex-col lg:max-h-[85vh] lg:h-[600px] overflow-visible lg:overflow-hidden my-auto"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-black/40 text-textDark hover:text-textLight border border-white/5 hover:border-primary/30 transition-all z-20"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col lg:flex-row h-full">
                    
                    {/* Left Panel: Image Gallery Carousel */}
                    <div className="lg:w-1/2 relative bg-black/50 flex items-center justify-center min-h-[300px] lg:min-h-0 aspect-video lg:aspect-auto">
                        {images.length > 0 ? (
                            <>
                                <img
                                    src={images[currentImageIndex]}
                                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                                    className="w-full h-full object-contain max-h-[500px]"
                                />
                                
                                {images.length > 1 && (
                                    <>
                                        {/* Prev Arrow */}
                                        <button
                                            onClick={handlePrevImage}
                                            className="absolute left-4 p-2 rounded-full bg-black/60 text-white hover:text-primary transition-colors border border-white/10"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        
                                        {/* Next Arrow */}
                                        <button
                                            onClick={handleNextImage}
                                            className="absolute right-4 p-2 rounded-full bg-black/60 text-white hover:text-primary transition-colors border border-white/10"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                        
                                        {/* Dots indicator */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentImageIndex(index)}
                                                    className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? 'bg-primary w-5' : 'bg-white/40'}`}
                                                ></button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="text-textDark font-mono text-sm">No Preview Image</div>
                        )}
                    </div>

                    {/* Right Panel: Project Info Details */}
                    <div className="lg:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
                        <div>
                            {/* Tags & Status */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${project.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-3xl font-extrabold text-textLight mb-4 transition-colors">
                                {project.title}
                            </h2>

                            {/* Description */}
                            <p className="text-textDark text-sm leading-relaxed mb-6">
                                {project.fullDetails || project.description}
                            </p>

                            {/* Specifications */}
                            {project.specifications && Object.keys(project.specifications).length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-textLight font-mono text-xs uppercase tracking-wider mb-3">Specifications</h4>
                                    <div className="glass-panel p-4 rounded-xl border border-white/5 text-xs font-mono divide-y divide-white/5 space-y-2.5">
                                        {Object.entries(project.specifications).map(([key, val]) => (
                                            <div key={key} className="flex justify-between pt-2.5 first:pt-0">
                                                <span className="text-textDark">{key}:</span>
                                                <span className="text-cosmic-cyan text-right">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Features list */}
                            {project.features && project.features.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-textLight font-mono text-xs uppercase tracking-wider mb-3">Key Features</h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-textDark">
                                        {project.features.map((feat) => (
                                            <li key={feat} className="flex items-center gap-2">
                                                <Check className="w-3.5 h-3.5 text-cosmic-cyan flex-shrink-0" />
                                                <span className="truncate" title={feat}>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies Used */}
                            <div className="mb-8">
                                <h4 className="text-textLight font-mono text-xs uppercase tracking-wider mb-3">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="bg-[#0a0f1d]/50 border border-white/10 text-cosmic-cyan font-mono text-xs px-2.5 py-1 rounded-lg">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-4 border-t border-white/5 pt-6 font-mono text-sm mt-auto">
                            {project.previewUrl && (
                                <a
                                    href={project.previewUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-transparent border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl transition-all shadow-glow-cyan font-bold hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                >
                                    <ExternalLink className="w-4 h-4" /> Live Link
                                </a>
                            )}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 text-textLight border border-white/10 rounded-xl transition-all font-semibold"
                                >
                                    <Github className="w-4 h-4" /> Repository
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
