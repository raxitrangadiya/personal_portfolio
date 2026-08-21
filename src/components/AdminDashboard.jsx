import React, { useState, useEffect } from 'react';
import { THEME_PALETTES } from '../App';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, Edit2, Trash2, LogOut, MessageSquare, Briefcase, 
    Link, Github, FileText, Check, AlertCircle, X, Eye, 
    Calendar, User, Code, Lock
} from 'lucide-react';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as LucideIcons from 'lucide-react';
import { API_BASE_URL } from '../config';

const getIconComponent = (iconName) => {
    if (!iconName) return Code;
    if (FaIcons[iconName]) return FaIcons[iconName];
    if (SiIcons[iconName]) return SiIcons[iconName];
    if (LucideIcons[iconName]) return LucideIcons[iconName];
    
    // Check if it starts with standard prefixes and try matching
    const cleanName = iconName.trim();
    if (cleanName.startsWith('Fa') && FaIcons[cleanName]) return FaIcons[cleanName];
    if (cleanName.startsWith('Si') && SiIcons[cleanName]) return SiIcons[cleanName];
    
    return Code;
};

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [skills, setSkills] = useState([]);
    
    // Form States
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        fullDetails: '',
        technologies: '',
        image: '',
        gallery: '',
        previewUrl: '',
        githubUrl: '',
        specifications: [{ key: 'Role', value: 'Full-End Developer' }],
        features: '',
        status: 'Completed'
    });

    const [profileFormData, setProfileFormData] = useState({
        name: '',
        role: '',
        objective: '',
        bioParagraph1: '',
        bioParagraph2: '',
        experienceYears: 0,
        completedProjects: 0,
        techCount: 0,
        githubUrl: '',
        linkedinUrl: '',
        profileImage: '',
        navbarLogo: '',
        themePalette: 'cosmic-aurora'
    });

    const [newSkillData, setNewSkillData] = useState({
        name: '',
        category: 'Frontend',
        icon: 'FaCode',
        proficiency: 80,
        badge: ''
    });

    const [editingSkill, setEditingSkill] = useState(null);

    const [isCustomCategory, setIsCustomCategory] = useState(false);
    const [customCategory, setCustomCategory] = useState('');

    const [securityFormData, setSecurityFormData] = useState({
        currentPassword: '',
        newUsername: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1.5 * 1024 * 1024) {
                setError('Image size should be less than 1.5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileFormData(prev => ({ ...prev, profileImage: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 500 * 1024) {
                setError('Logo size should be less than 500KB.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileFormData(prev => ({ ...prev, navbarLogo: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Fetch Token
    const getToken = () => localStorage.getItem('adminToken');

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate('/login');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        try {
            const token = getToken();
            const headers = { 'Authorization': `Bearer ${token}` };

            // Fetch Projects
            const projectsRes = await fetch(`${API_BASE_URL}/projects`);
            const projectsData = await projectsRes.json();
            if (projectsRes.ok) setProjects(projectsData);

            // Fetch Messages
            const messagesRes = await fetch(`${API_BASE_URL}/messages`, { headers });
            const messagesData = await messagesRes.json();
            if (messagesRes.ok) setMessages(messagesData);

            // Fetch Profile
            const profileRes = await fetch(`${API_BASE_URL}/profile`);
            const profileData = await profileRes.json();
            if (profileRes.ok) {
                setProfileFormData({
                    name: profileData.name || '',
                    role: profileData.role || '',
                    objective: profileData.objective || '',
                    bioParagraph1: profileData.bioParagraph1 || '',
                    bioParagraph2: profileData.bioParagraph2 || '',
                    experienceYears: profileData.experienceYears || 0,
                    completedProjects: profileData.completedProjects || 0,
                    techCount: profileData.techCount || 0,
                    githubUrl: profileData.githubUrl || '',
                    linkedinUrl: profileData.linkedinUrl || '',
                    profileImage: profileData.profileImage || '',
                    navbarLogo: profileData.navbarLogo || '',
                    themePalette: profileData.themePalette || 'cosmic-aurora'
                });
            }

            // Fetch Skills
            const skillsRes = await fetch(`${API_BASE_URL}/skills`);
            const skillsData = await skillsRes.json();
            if (skillsRes.ok) setSkills(skillsData);
        } catch (err) {
            setError('Failed to fetch data.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const openCreateForm = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            description: '',
            fullDetails: '',
            technologies: '',
            image: '',
            gallery: '',
            previewUrl: '',
            githubUrl: '',
            specifications: [{ key: 'Role', value: 'Lead Developer' }, { key: 'Duration', value: '2 weeks' }],
            features: '',
            status: 'Completed'
        });
        setError('');
        setShowForm(true);
    };

    const openEditForm = (proj) => {
        setEditingProject(proj);
        
        // Parse specs map back to array
        const specsArr = proj.specifications 
            ? Object.entries(proj.specifications).map(([key, value]) => ({ key, value }))
            : [];

        setFormData({
            title: proj.title,
            description: proj.description,
            fullDetails: proj.fullDetails || '',
            technologies: proj.technologies.join(', '),
            image: proj.image || '',
            gallery: proj.gallery ? proj.gallery.join(', ') : '',
            previewUrl: proj.previewUrl || '',
            githubUrl: proj.githubUrl || '',
            specifications: specsArr.length > 0 ? specsArr : [{ key: 'Role', value: '' }],
            features: proj.features ? proj.features.join(', ') : '',
            status: proj.status || 'Completed'
        });
        setError('');
        setShowForm(true);
    };

    // Specs Management
    const handleSpecChange = (index, field, val) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index][field] = val;
        setFormData({ ...formData, specifications: newSpecs });
    };

    const addSpecRow = () => {
        setFormData({
            ...formData,
            specifications: [...formData.specifications, { key: '', value: '' }]
        });
    };

    const removeSpecRow = (index) => {
        const newSpecs = formData.specifications.filter((_, i) => i !== index);
        setFormData({ ...formData, specifications: newSpecs });
    };

    // Handle Form Submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        const token = getToken();

        // Convert comma lists to arrays
        const techArr = formData.technologies.split(',').map(s => s.trim()).filter(Boolean);
        const galleryArr = formData.gallery.split(',').map(s => s.trim()).filter(Boolean);
        const featuresArr = formData.features.split(',').map(s => s.trim()).filter(Boolean);

        // Convert specifications array back to Map object
        const specsObj = {};
        formData.specifications.forEach(spec => {
            if (spec.key.trim()) {
                specsObj[spec.key.trim()] = spec.value.trim();
            }
        });

        const bodyData = {
            title: formData.title,
            description: formData.description,
            fullDetails: formData.fullDetails,
            technologies: techArr,
            image: formData.image,
            gallery: galleryArr,
            previewUrl: formData.previewUrl,
            githubUrl: formData.githubUrl,
            specifications: specsObj,
            features: featuresArr,
            status: formData.status
        };

        try {
            const url = editingProject 
                ? `${API_BASE_URL}/projects/${editingProject._id}` 
                : `${API_BASE_URL}/projects`;
            const method = editingProject ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(bodyData)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to save project');
            }

            setSuccess(editingProject ? 'Project updated!' : 'Project created!');
            setShowForm(false);
            fetchData();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete Project
    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        
        const token = getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete project');
            }

            setSuccess('Project deleted successfully.');
            fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete Message
    const handleDeleteMessage = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        
        const token = getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete message');
            }

            setSuccess('Message deleted.');
            fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    // Profile Settings Submit
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Perform validations
        if (profileFormData.name.length > 50) {
            setError('Name must be 50 characters or less.');
            setLoading(false);
            return;
        }
        if (profileFormData.role.length > 100) {
            setError('Role must be 100 characters or less.');
            setLoading(false);
            return;
        }
        if (profileFormData.objective.length > 300) {
            setError('Objective must be 300 characters or less.');
            setLoading(false);
            return;
        }
        if (profileFormData.bioParagraph1.length > 500) {
            setError('Bio Paragraph 1 must be 500 characters or less.');
            setLoading(false);
            return;
        }
        if (profileFormData.bioParagraph2.length > 500) {
            setError('Bio Paragraph 2 must be 500 characters or less.');
            setLoading(false);
            return;
        }
        if (profileFormData.experienceYears < 0 || profileFormData.completedProjects < 0 || profileFormData.techCount < 0) {
            setError('Telemetry values must be non-negative.');
            setLoading(false);
            return;
        }

        const token = getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileFormData)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update profile');
            }

            setSuccess('Profile settings updated successfully!');
            fetchData();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSecuritySubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!securityFormData.currentPassword) {
            setError('Current password is required to save changes.');
            return;
        }

        if (securityFormData.newPassword && securityFormData.newPassword !== securityFormData.confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        setLoading(true);
        const token = getToken();

        try {
            const res = await fetch(`${API_BASE_URL}/admin/update-credentials`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: securityFormData.currentPassword,
                    newUsername: securityFormData.newUsername || undefined,
                    newPassword: securityFormData.newPassword || undefined
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to update credentials');
            }

            setSuccess('Credentials updated successfully!');
            
            if (data.username) {
                localStorage.setItem('adminUser', data.username);
            }

            setSecurityFormData({
                currentPassword: '',
                newUsername: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Add or Edit Skill
    const handleAddSkill = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        if (!newSkillData.name.trim()) {
            setError('Skill name is required.');
            setLoading(false);
            return;
        }

        const categoryValue = isCustomCategory ? customCategory.trim() : newSkillData.category;
        if (!categoryValue) {
            setError('Skill category is required.');
            setLoading(false);
            return;
        }

        let profVal = null;
        if (newSkillData.proficiency !== '' && newSkillData.proficiency !== null && newSkillData.proficiency !== undefined) {
            const parsed = parseInt(newSkillData.proficiency);
            if (!isNaN(parsed)) {
                profVal = parsed;
            }
        }

        const skillPayload = {
            name: newSkillData.name,
            category: categoryValue,
            icon: newSkillData.icon,
            proficiency: profVal,
            badge: newSkillData.badge || ''
        };

        const token = getToken();
        try {
            const url = editingSkill 
                ? `${API_BASE_URL}/skills/${editingSkill._id}`
                : `${API_BASE_URL}/skills`;
            const method = editingSkill ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(skillPayload)
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Failed to save skill');
            }

            setSuccess(editingSkill ? `Skill "${newSkillData.name}" updated successfully!` : `Skill "${newSkillData.name}" added successfully!`);
            setNewSkillData({
                name: '',
                category: 'Frontend',
                icon: 'FaCode',
                proficiency: 80,
                badge: ''
            });
            setCustomCategory('');
            setIsCustomCategory(false);
            setEditingSkill(null);
            fetchData();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditSkillClick = (skill) => {
        setEditingSkill(skill);
        const defaultOptions = ['Frontend', 'Backend', 'AI & Automation', 'DevOps'];
        const isCustom = !defaultOptions.includes(skill.category);
        
        setNewSkillData({
            name: skill.name,
            category: isCustom ? 'Frontend' : skill.category,
            icon: skill.icon,
            proficiency: skill.proficiency !== null && skill.proficiency !== undefined ? skill.proficiency : '',
            badge: skill.badge || ''
        });

        if (isCustom) {
            setIsCustomCategory(true);
            setCustomCategory(skill.category);
        } else {
            setIsCustomCategory(false);
            setCustomCategory('');
        }
        setError('');
        setSuccess('');
    };

    const handleCancelEditSkill = () => {
        setEditingSkill(null);
        setNewSkillData({
            name: '',
            category: 'Frontend',
            icon: 'FaCode',
            proficiency: 80,
            badge: ''
        });
        setIsCustomCategory(false);
        setCustomCategory('');
        setError('');
    };

    // Delete Skill
    const handleDeleteSkill = async (id) => {
        if (!window.confirm('Are you sure you want to delete this skill?')) return;

        const token = getToken();
        try {
            const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to delete skill');
            }

            setSuccess('Skill deleted successfully.');
            fetchData();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 max-w-6xl mx-auto relative z-10">
            {/* Background Layer */}
            <div className="absolute inset-0 bg-[#02020a]/80 -z-10 backdrop-blur-md"></div>

            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-white/10">
                <div>
                    <h1 className="text-3xl font-extrabold text-textLight">
                        Admin <span className="text-gradient-cosmic">Dashboard</span>
                    </h1>
                    <p className="text-textDark font-mono text-sm mt-1">
                        Logged in as: <span className="text-cosmic-cyan">{localStorage.getItem('adminUser')}</span>
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 border border-white/10 rounded-xl hover:border-cosmic-cyan/50 text-textLight transition-colors font-mono text-sm"
                    >
                        View Site
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-950/40 border border-red-500/20 text-red-400 rounded-xl hover:bg-red-900/40 transition-colors font-mono text-sm"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </div>

            {/* Feedback notifications */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between p-4 mb-6 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                            <span>{error}</span>
                        </div>
                        <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center justify-between p-4 mb-6 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-sm"
                    >
                        <div className="flex items-center gap-2">
                            <Check className="w-5 h-5 text-emerald-400" />
                            <span>{success}</span>
                        </div>
                        <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap border-b border-white/10 mb-8 font-mono">
                <button
                    onClick={() => setActiveTab('projects')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${activeTab === 'projects' ? 'border-cosmic-cyan text-cosmic-cyan' : 'border-transparent text-textDark hover:text-textLight'}`}
                >
                    <Briefcase className="w-4 h-4" /> Projects ({projects.length})
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${activeTab === 'messages' ? 'border-cosmic-cyan text-cosmic-cyan' : 'border-transparent text-textDark hover:text-textLight'}`}
                >
                    <MessageSquare className="w-4 h-4" /> Messages ({messages.length})
                </button>
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${activeTab === 'profile' ? 'border-cosmic-cyan text-cosmic-cyan' : 'border-transparent text-textDark hover:text-textLight'}`}
                >
                    <User className="w-4 h-4" /> Profile Settings
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${activeTab === 'security' ? 'border-cosmic-cyan text-cosmic-cyan' : 'border-transparent text-textDark hover:text-textLight'}`}
                >
                    <Lock className="w-4 h-4" /> Security Settings
                </button>
                <button
                    onClick={() => setActiveTab('skills')}
                    className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${activeTab === 'skills' ? 'border-cosmic-cyan text-cosmic-cyan' : 'border-transparent text-textDark hover:text-textLight'}`}
                >
                    <Code className="w-4 h-4" /> Skills List ({skills.length})
                </button>
            </div>

            {/* Tab Contents */}
            <div>
                {activeTab === 'projects' && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-textLight font-mono">Project List</h2>
                            <button
                                onClick={openCreateForm}
                                className="flex items-center gap-2 px-4 py-2 border border-cosmic-cyan text-cosmic-cyan hover:bg-cosmic-cyan/15 rounded-xl font-mono text-sm font-bold shadow-glow-cyan transition-all"
                            >
                                <Plus className="w-4 h-4" /> Add Project
                            </button>
                        </div>

                        {/* Projects Grid */}
                        <div className="grid gap-6 md:grid-cols-2">
                            {projects.map((proj) => (
                                <div key={proj._id} className="glass-panel glass-panel-hover p-6 rounded-2xl relative flex flex-col justify-between border border-white/10">
                                    <div>
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="text-xl font-bold text-textLight">{proj.title}</h3>
                                            <span className={`px-2 py-0.5 text-xs font-mono rounded ${proj.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                                                {proj.status}
                                            </span>
                                        </div>
                                        <p className="text-textDark text-sm line-clamp-2 mb-4">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {proj.technologies.map(tech => (
                                                <span key={tech} className="bg-[#0a0f1d]/60 text-cosmic-cyan font-mono text-xs px-2 py-1 rounded border border-white/5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-white/5 mt-auto">
                                        <button
                                            onClick={() => openEditForm(proj)}
                                            className="p-2 border border-white/10 text-textLight hover:border-cosmic-cyan/50 hover:text-cosmic-cyan transition-colors rounded-lg"
                                            title="Edit Project"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProject(proj._id)}
                                            className="p-2 border border-red-500/20 text-red-400 hover:bg-red-950/40 transition-colors rounded-lg"
                                            title="Delete Project"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && (
                                <div className="col-span-2 text-center py-12 text-textDark font-mono text-sm">
                                    No projects in the database. Seeding will run on next server restart, or add a project.
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-bold text-textLight font-mono mb-6">Received Messages</h2>
                        {messages.map((msg) => (
                            <div key={msg._id} className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 relative">
                                <button
                                    onClick={() => handleDeleteMessage(msg._id)}
                                    className="absolute top-6 right-6 p-2 border border-red-500/10 text-red-400 hover:bg-red-950/30 transition-colors rounded-lg"
                                    title="Delete Message"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid md:grid-cols-2 gap-2 mb-4 font-mono text-xs">
                                    <div>
                                        <span className="text-textDark">From: </span>
                                        <span className="text-textLight font-semibold">{msg.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-textDark">Email: </span>
                                        <a href={`mailto:${msg.email}`} className="text-cosmic-cyan hover:underline">{msg.email}</a>
                                    </div>
                                    <div className="col-span-2 mt-1">
                                        <span className="text-textDark">Date: </span>
                                        <span className="text-textLight">{new Date(msg.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="text-textLight text-sm p-4 bg-[#0a0f1d]/40 rounded-xl border border-white/5 white-space-pre-wrap">
                                    {msg.message}
                                </div>
                            </div>
                        ))}
                        {messages.length === 0 && (
                            <div className="text-center py-12 text-textDark font-mono text-sm">
                                No messages found. When users submit the contact form, their queries will appear here.
                            </div>
                        )}
                    </div>
                )}

                {/* Profile Settings Tab */}
                {activeTab === 'profile' && (
                    <div className="glass-panel border border-white/10 rounded-2xl p-8 relative">
                        <h2 className="text-xl font-bold text-textLight font-mono mb-6">Profile Settings</h2>
                        <form onSubmit={handleProfileSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold font-mono text-cosmic-cyan uppercase tracking-wider"><span className="flex items-center gap-1.5"><User className="w-4 h-4 text-cosmic-cyan" /> Identity & Bio</span></h3>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-textLight text-xs font-mono">Full Name</label>
                                            <span className={`text-[10px] font-mono ${profileFormData.name.length > 45 ? 'text-red-400 font-bold' : 'text-textDark'}`}>
                                                {profileFormData.name.length} / 50
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            maxLength={50}
                                            value={profileFormData.name}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, name: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-textLight text-xs font-mono">Professional Role / Title</label>
                                            <span className={`text-[10px] font-mono ${profileFormData.role.length > 90 ? 'text-red-400 font-bold' : 'text-textDark'}`}>
                                                {profileFormData.role.length} / 100
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            maxLength={100}
                                            value={profileFormData.role}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, role: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="e.g. Full Stack Developer"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-textLight text-xs font-mono">Hero Objective statement</label>
                                            <span className={`text-[10px] font-mono ${profileFormData.objective.length > 270 ? 'text-red-400 font-bold' : 'text-textDark'}`}>
                                                {profileFormData.objective.length} / 300
                                            </span>
                                        </div>
                                        <textarea
                                            required
                                            rows={3}
                                            maxLength={300}
                                            value={profileFormData.objective}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, objective: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="A concise, high-impact summary of your goals/purpose"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-textLight text-xs font-mono">Bio Paragraph 1</label>
                                            <span className={`text-[10px] font-mono ${profileFormData.bioParagraph1.length > 450 ? 'text-red-400 font-bold' : 'text-textDark'}`}>
                                                {profileFormData.bioParagraph1.length} / 500
                                            </span>
                                        </div>
                                        <textarea
                                            required
                                            rows={4}
                                            maxLength={500}
                                            value={profileFormData.bioParagraph1}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, bioParagraph1: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="First paragraph of your bio (shown in the About section)"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-textLight text-xs font-mono">Bio Paragraph 2</label>
                                            <span className={`text-[10px] font-mono ${profileFormData.bioParagraph2.length > 450 ? 'text-red-400 font-bold' : 'text-textDark'}`}>
                                                {profileFormData.bioParagraph2.length} / 500
                                            </span>
                                        </div>
                                        <textarea
                                            required
                                            rows={4}
                                            maxLength={500}
                                            value={profileFormData.bioParagraph2}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, bioParagraph2: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="Second paragraph of your bio (shown in the About section)"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold font-mono text-cosmic-cyan uppercase tracking-wider"><span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-cosmic-cyan" /> Telemetry Stats & Socials</span></h3>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Years of Experience</label>
                                        <input
                                            type="number"
                                            required
                                            min={0}
                                            value={profileFormData.experienceYears}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, experienceYears: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Completed Projects count</label>
                                        <input
                                            type="number"
                                            required
                                            min={0}
                                            value={profileFormData.completedProjects}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, completedProjects: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Core Tech Stack count</label>
                                        <input
                                            type="number"
                                            required
                                            min={0}
                                            value={profileFormData.techCount}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, techCount: parseInt(e.target.value) || 0 })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">GitHub Profile URL</label>
                                        <input
                                            type="url"
                                            required
                                            value={profileFormData.githubUrl}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, githubUrl: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">LinkedIn Profile URL</label>
                                        <input
                                            type="url"
                                            required
                                            value={profileFormData.linkedinUrl}
                                            onChange={(e) => setProfileFormData({ ...profileFormData, linkedinUrl: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="https://linkedin.com/in/..."
                                        />
                                    </div>
                                    {/* Navbar Logo */}
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Navbar Logo</label>
                                        <div className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                value={profileFormData.navbarLogo}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, navbarLogo: e.target.value })}
                                                className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                                placeholder="e.g. RR, URL or upload below"
                                            />
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoUpload}
                                                    className="hidden"
                                                    id="navbar-logo-upload"
                                                />
                                                <label
                                                    htmlFor="navbar-logo-upload"
                                                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-textLight rounded-xl text-xs font-mono cursor-pointer transition-all"
                                                >
                                                    Choose Local Logo File
                                                </label>
                                                {profileFormData.navbarLogo && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfileFormData({ ...profileFormData, navbarLogo: '' })}
                                                        className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        Clear Logo
                                                    </button>
                                                )}
                                            </div>
                                            {profileFormData.navbarLogo && (profileFormData.navbarLogo.startsWith('data:image') || profileFormData.navbarLogo.startsWith('http')) && (
                                                <div className="mt-2 w-20 h-10 rounded-xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center p-1.5">
                                                    <img 
                                                        src={profileFormData.navbarLogo} 
                                                        alt="Logo preview" 
                                                        className="h-full w-auto object-contain" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Profile Image */}
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Profile Image</label>
                                        <div className="flex flex-col gap-3">
                                            <input
                                                type="text"
                                                value={profileFormData.profileImage}
                                                onChange={(e) => setProfileFormData({ ...profileFormData, profileImage: e.target.value })}
                                                className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                                placeholder="Paste Image URL or upload below"
                                            />
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="profile-image-upload"
                                                />
                                                <label
                                                    htmlFor="profile-image-upload"
                                                    className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-textLight rounded-xl text-xs font-mono cursor-pointer transition-all"
                                                >
                                                    Choose Local File
                                                </label>
                                                {profileFormData.profileImage && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setProfileFormData({ ...profileFormData, profileImage: '' })}
                                                        className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors"
                                                    >
                                                        Clear Image
                                                    </button>
                                                )}
                                            </div>
                                            {profileFormData.profileImage && (
                                                <div className="mt-2 w-20 h-20 rounded-xl overflow-hidden border border-white/10">
                                                    <img 
                                                        src={profileFormData.profileImage} 
                                                        alt="Profile preview" 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {/* Portfolio Theme Palette */}
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Portfolio Theme Color</label>
                                        <div className="flex flex-col gap-3">
                                            <select
                                                value={profileFormData.themePalette}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setProfileFormData(prev => ({ ...prev, themePalette: val }));
                                                    
                                                    const palette = THEME_PALETTES[val];
                                                    if (palette) {
                                                        Object.entries(palette.variables).forEach(([k, v]) => {
                                                            document.documentElement.style.setProperty(k, v);
                                                        });
                                                    }
                                                }}
                                                className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-sans"
                                            >
                                                <option value="cosmic-aurora">Cosmic Aurora (Purple & Cyan)</option>
                                                <option value="neon-nebula">Neon Nebula (Fuchsia & Blue)</option>
                                                <option value="solar-flare">Solar Flare (Amber & Red)</option>
                                                <option value="forest-matrix">Forest Matrix (Emerald & Gold)</option>
                                                <option value="cyber-sentinel">Cyber Sentinel (Mint & Silver)</option>
                                            </select>
                                            
                                            {/* Dynamic color swatches visualizer */}
                                            <div className="flex gap-2.5 mt-1">
                                                {Object.entries(THEME_PALETTES).map(([key, pal]) => {
                                                    const isSelected = profileFormData.themePalette === key;
                                                    return (
                                                        <button
                                                            key={key}
                                                            type="button"
                                                            onClick={() => {
                                                                setProfileFormData(prev => ({ ...prev, themePalette: key }));
                                                                Object.entries(pal.variables).forEach(([k, v]) => {
                                                                    document.documentElement.style.setProperty(k, v);
                                                                });
                                                            }}
                                                            className={`p-1.5 rounded-xl border transition-all flex items-center justify-center ${isSelected ? 'border-cosmic-cyan bg-white/5 scale-105' : 'border-white/5 bg-transparent hover:border-white/10'}`}
                                                            title={pal.name}
                                                        >
                                                            <div className="flex gap-1">
                                                                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.variables['--accent-primary'] }}></div>
                                                                <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.variables['--accent-ai'] }}></div>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-6 border-t border-white/10 font-mono">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl text-sm font-bold shadow-glow-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                >
                                    {loading ? 'Saving Changes...' : 'Save Profile Settings'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Security Settings Tab */}
                {activeTab === 'security' && (
                    <div className="glass-panel border border-white/10 rounded-2xl p-8 relative">
                        <h2 className="text-xl font-bold text-textLight font-mono mb-6">Security Settings</h2>
                        <form onSubmit={handleSecuritySubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold font-mono text-cosmic-cyan uppercase tracking-wider"><span className="flex items-center gap-1.5"><Lock className="w-4 h-4 text-cosmic-cyan" /> Update Credentials</span></h3>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">New Username (Optional)</label>
                                        <input
                                            type="text"
                                            value={securityFormData.newUsername}
                                            onChange={(e) => setSecurityFormData({ ...securityFormData, newUsername: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="Enter new username"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">New Password (Optional)</label>
                                        <input
                                            type="password"
                                            value={securityFormData.newPassword}
                                            onChange={(e) => setSecurityFormData({ ...securityFormData, newPassword: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={securityFormData.confirmNewPassword}
                                            onChange={(e) => setSecurityFormData({ ...securityFormData, confirmNewPassword: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <h3 className="text-sm font-bold font-mono text-red-400 uppercase tracking-wider"><span className="flex items-center gap-1.5"><AlertCircle className="w-4 h-4 text-red-400" /> Authorization Required</span></h3>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Current Password <span className="text-red-400 font-bold">*</span></label>
                                        <input
                                            type="password"
                                            required
                                            value={securityFormData.currentPassword}
                                            onChange={(e) => setSecurityFormData({ ...securityFormData, currentPassword: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="••••••••"
                                        />
                                        <p className="text-[10px] text-textDark mt-2 font-mono">
                                            You must provide your current password to save these changes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end pt-6 border-t border-white/10 font-mono">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl text-sm font-bold shadow-glow-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                >
                                    {loading ? 'Updating Credentials...' : 'Save Security Settings'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Skills Management Tab */}
                {activeTab === 'skills' && (() => {
                    const existingCats = Array.from(new Set(skills.map(s => s.category))).filter(Boolean);
                    const defaultOptions = ['Frontend', 'Backend', 'AI & Automation', 'DevOps'];
                    const catOptions = Array.from(new Set([...defaultOptions, ...existingCats]));

                    return (
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="glass-panel border border-white/10 rounded-2xl p-6 h-fit">
                                <h2 className="text-xl font-bold text-textLight font-mono mb-6">
                                    {editingSkill ? 'Edit Skill' : 'Add Skill'}
                                </h2>
                                <form onSubmit={handleAddSkill} className="space-y-6">
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Skill Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newSkillData.name}
                                            onChange={(e) => setNewSkillData({ ...newSkillData, name: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm"
                                            placeholder="e.g. React Native, Docker"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Category</label>
                                        {isCustomCategory ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    required
                                                    value={customCategory}
                                                    onChange={(e) => setCustomCategory(e.target.value)}
                                                    className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-sans"
                                                    placeholder="e.g. Mobile Development"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCustomCategory(false)}
                                                    className="text-[10px] text-textDark hover:text-cosmic-cyan transition-colors mt-1.5 font-mono flex items-center gap-1"
                                                >
                                                    ← Choose Existing Category
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <select
                                                    value={newSkillData.category}
                                                    onChange={(e) => setNewSkillData({ ...newSkillData, category: e.target.value })}
                                                    className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                                >
                                                    {catOptions.map(cat => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsCustomCategory(true)}
                                                    className="text-[10px] text-cosmic-cyan hover:underline mt-1.5 font-mono flex items-center gap-1"
                                                >
                                                    + Create Custom Category
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Icon Name (React-Icon/Lucide Component Key)</label>
                                        <input
                                            type="text"
                                            required
                                            value={newSkillData.icon}
                                            onChange={(e) => setNewSkillData({ ...newSkillData, icon: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="e.g. FaReact, SiMongodb, Code"
                                        />
                                        <p className="text-[10px] text-textDark mt-1.5 font-mono">
                                            Use FontAwesome (FaName), SimpleIcons (SiName), or Lucide name.
                                        </p>
                                        <div className="flex items-center gap-3 bg-[#0a0f1d]/40 p-3 rounded-xl border border-white/5 mt-3">
                                            <span className="text-textDark text-[10px] font-mono">Live Icon Preview:</span>
                                            {React.createElement(getIconComponent(newSkillData.icon), { className: "text-2xl text-cosmic-cyan" })}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-textLight text-xs font-mono">Proficiency (%) (Optional)</label>
                                            <span className="text-[10px] font-mono text-cosmic-cyan">
                                                {newSkillData.proficiency !== '' && newSkillData.proficiency !== null && newSkillData.proficiency !== undefined ? `${newSkillData.proficiency}%` : 'None'}
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            min={0}
                                            max={100}
                                            value={newSkillData.proficiency !== null && newSkillData.proficiency !== undefined ? newSkillData.proficiency : ''}
                                            onChange={(e) => setNewSkillData({ ...newSkillData, proficiency: e.target.value === '' ? '' : parseInt(e.target.value) || 0 })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="Leave blank to hide bar"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Badge (Optional)</label>
                                        <select
                                            value={newSkillData.badge}
                                            onChange={(e) => setNewSkillData({ ...newSkillData, badge: e.target.value })}
                                            className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                        >
                                            <option value="">None (Hidden)</option>
                                            <option value="Pro">Pro</option>
                                            <option value="AI">AI</option>
                                            <option value="Tool">Tool</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2.5">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl text-sm font-bold shadow-glow-cyan transition-all duration-300 font-mono"
                                        >
                                            {loading ? 'Saving...' : editingSkill ? 'Save Skill' : 'Add Skill'}
                                        </button>
                                        {editingSkill && (
                                            <button
                                                type="button"
                                                onClick={handleCancelEditSkill}
                                                className="w-full py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-textLight rounded-xl text-sm font-mono transition-colors"
                                            >
                                                Cancel Edit
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <h2 className="text-xl font-bold text-textLight font-mono">Active Skills List</h2>
                                {existingCats.map((cat) => {
                                    const catSkills = skills.filter(s => s.category === cat);
                                    return (
                                        <div key={cat} className="glass-panel border border-white/10 rounded-2xl p-6">
                                            <h3 className="text-sm font-bold font-mono text-cosmic-cyan mb-4 uppercase tracking-widest"><span className="flex items-center gap-1.5"><Code className="w-4 h-4 text-cosmic-cyan" /> {cat}</span></h3>
                                            <div className="grid gap-3 sm:grid-cols-2">
                                                {catSkills.map((skill) => {
                                                    const SkillIcon = getIconComponent(skill.icon);
                                                    return (
                                                        <div key={skill._id} className="flex justify-between items-center bg-[#0a0f1d]/40 border border-white/5 rounded-xl p-3.5 hover:border-white/15 transition-all">
                                                            <div className="flex items-center gap-3 overflow-hidden">
                                                                <SkillIcon className="text-xl text-textMuted flex-shrink-0" />
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="text-sm text-textLight font-medium truncate">{skill.name}</span>
                                                                    <span className="text-[10px] text-textDark font-mono truncate">
                                                                        Proficiency: {skill.proficiency !== null && skill.proficiency !== undefined ? `${skill.proficiency}%` : 'None'} {skill.badge && `| Badge: ${skill.badge}`}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => handleEditSkillClick(skill)}
                                                                    className="p-1.5 border border-white/10 text-textLight hover:border-cosmic-cyan/50 hover:text-cosmic-cyan transition-colors rounded-lg flex-shrink-0"
                                                                    title="Edit Skill"
                                                                >
                                                                    <Edit2 className="w-4 h-4" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteSkill(skill._id)}
                                                                    className="p-1.5 border border-red-500/20 text-red-400 hover:bg-red-950/40 transition-colors rounded-lg flex-shrink-0"
                                                                    title="Delete Skill"
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                {catSkills.length === 0 && (
                                                    <div className="col-span-2 text-center py-6 text-textDark font-mono text-xs">
                                                        No skills in this category.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })()}
            </div>

            {/* Modal Project Form */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 overflow-y-auto">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
                            onClick={() => setShowForm(false)}
                        ></motion.div>

                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="glass-panel border border-white/10 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl p-8 backdrop-blur-2xl"
                        >
                            <button 
                                onClick={() => setShowForm(false)}
                                className="absolute top-6 right-6 text-textDark hover:text-textLight"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h3 className="text-2xl font-bold text-textLight font-mono mb-6">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h3>

                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                {/* Title and Status */}
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-textLight text-xs font-mono mb-2">Project Title</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-sans"
                                            placeholder="E.g., Smart E-commerce platform"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                            className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                        >
                                            <option value="Completed">Completed</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Archived">Archived</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Short Description */}
                                <div>
                                    <label className="block text-textLight text-xs font-mono mb-2">Short Description</label>
                                    <textarea
                                        required
                                        rows={2}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-sans"
                                        placeholder="A short overview of the project shown on cards."
                                    />
                                </div>

                                {/* Detailed Write-up */}
                                <div>
                                    <label className="block text-textLight text-xs font-mono mb-2">Detailed Write-up / Specifications (Optional)</label>
                                    <textarea
                                        rows={4}
                                        value={formData.fullDetails}
                                        onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })}
                                        className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-sans"
                                        placeholder="Write details about the challenges, architecture, and solutions."
                                    />
                                </div>

                                {/* Technologies & Features */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Technologies (Comma Separated)</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.technologies}
                                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="React, Node.js, MongoDB, Webpack"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Key Features (Comma Separated)</label>
                                        <input
                                            type="text"
                                            value={formData.features}
                                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="OAuth Login, Real-time graphs, Stripe payments"
                                        />
                                    </div>
                                </div>

                                {/* Image & Gallery URLs */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Thumbnail Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="https://unsplash.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Gallery Image URLs (Comma Separated)</label>
                                        <input
                                            type="text"
                                            value={formData.gallery}
                                            onChange={(e) => setFormData({ ...formData, gallery: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="https://url1.com, https://url2.com"
                                        />
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">Live Demo URL</label>
                                        <input
                                            type="url"
                                            value={formData.previewUrl}
                                            onChange={(e) => setFormData({ ...formData, previewUrl: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="https://myproject.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-textLight text-xs font-mono mb-2">GitHub URL</label>
                                        <input
                                            type="url"
                                            value={formData.githubUrl}
                                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                            className="w-full bg-[#0a0f1d]/50 border border-white/10 rounded-xl p-3 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-sm font-mono"
                                            placeholder="https://github.com/..."
                                        />
                                    </div>
                                </div>

                                {/* Specifications (Dynamic Key/Value rows) */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-textLight text-xs font-mono">Custom Specifications (Key-Value)</label>
                                        <button
                                            type="button"
                                            onClick={addSpecRow}
                                            className="text-xs text-cosmic-cyan hover:underline font-mono flex items-center gap-1"
                                        >
                                            + Add Row
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.specifications.map((spec, i) => (
                                            <div key={i} className="flex gap-4 items-center">
                                                <input
                                                    type="text"
                                                    required
                                                    value={spec.key}
                                                    onChange={(e) => handleSpecChange(i, 'key', e.target.value)}
                                                    className="flex-1 bg-[#0a0f1d]/50 border border-white/10 rounded-lg p-2.5 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-xs font-mono"
                                                    placeholder="Key (e.g. Client, Role, Year)"
                                                />
                                                <input
                                                    type="text"
                                                    required
                                                    value={spec.value}
                                                    onChange={(e) => handleSpecChange(i, 'value', e.target.value)}
                                                    className="flex-1 bg-[#0a0f1d]/50 border border-white/10 rounded-lg p-2.5 text-textLight focus:outline-none focus:border-cosmic-cyan focus:ring-1 focus:ring-cosmic-cyan/20 transition-all text-xs"
                                                    placeholder="Value (e.g. Acme Corp, Lead dev, 2026)"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSpecRow(i)}
                                                    disabled={formData.specifications.length <= 1}
                                                    className="text-red-400 hover:text-red-300 disabled:opacity-30"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-4 pt-6 border-t border-white/10 font-mono">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-6 py-3 border border-white/10 rounded-xl text-textLight hover:bg-white/5 transition-all text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-3 border border-cosmic-cyan text-cosmic-cyan hover:text-white hover:bg-gradient-to-r hover:from-cosmic-cyan hover:to-cosmic-purple hover:border-transparent rounded-xl text-sm font-bold shadow-glow-cyan transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                                    >
                                        {loading ? 'Saving...' : 'Save Project'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
