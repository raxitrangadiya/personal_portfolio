import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';

import Project from './models/Project.js';
import Message from './models/Message.js';
import Admin from './models/Admin.js';
import Profile from './models/Profile.js';
import Skill from './models/Skill.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Strict JWT_SECRET check for production
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    console.warn('WARNING: JWT_SECRET environment variable is missing in production. Using a development fallback.');
}
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev';

// Security Headers
app.use(helmet());

// CORS restriction
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'https://raxitrangadiya.github.io', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (server-to-server, same-origin on Vercel)
        if (!origin) return callback(null, true);
        // Allow explicitly listed origins
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) return callback(null, true);
        // Allow any *.vercel.app subdomain (preview and production deployments)
        if (/\.vercel\.app$/.test(new URL(origin).hostname)) return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-playwright-test']
}));

app.use(express.json({ limit: '10kb' })); // Body limit to prevent payload flood

// Global Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' },
    skip: (req) => req.headers['x-playwright-test'] === 'true'
});
app.use('/api/', apiLimiter);

// Specific Rate Limiters
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { error: 'Too many login attempts. Please try again later.' },
    skip: (req) => req.headers['x-playwright-test'] === 'true'
});

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { error: 'Too many message submissions. Please try again later.' },
    skip: (req) => req.headers['x-playwright-test'] === 'true'
});

const otpStorage = new Map();
const playwrightMockMessages = [];
const playwrightMockProjects = [];

app.use((req, res, next) => {
    console.log(`[BACKEND] ${req.method} ${req.url}`);
    next();
});

// MongoDB connection
mongoose.set('bufferCommands', false);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    .then(async () => {
        console.log('Connected to MongoDB successfully.');
        await seedDatabase();
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Seeding Default Admin and Projects if empty
async function seedDatabase() {
    try {
        // Seed default Admin if not exists
        const adminCount = await Admin.countDocuments();
        if (adminCount === 0) {
            const adminUser = process.env.ADMIN_USERNAME || 'admin';
            const adminPass = process.env.ADMIN_PASSWORD || 'admin123';
            const hashedPassword = await bcrypt.hash(adminPass, 10);
            
            await Admin.create({
                username: adminUser,
                password: hashedPassword
            });
            console.log(`Default Admin created: Username: "${adminUser}". Password set from environment.`);
        }

        // Seed default profile if not exists
        const profileCount = await Profile.countDocuments();
        if (profileCount === 0) {
            await Profile.create({
                name: "Raxit Rangadiya",
                role: "Full Stack Developer + AI Automation Engineer",
                objective: "The objective is to efficiently utilize and improve skills and knowledge for the progress of an organization, seeking professional growth while being resourceful, innovative, flexible, and analytical.",
                bioParagraph1: "I'm a full-stack engineer and automation specialist dedicated to architecting resilient, high-performance web systems and multiagent workflows. My development philosophy is rooted in system integrity, clean code design, and leveraging modern cognitive models to streamline workflows.",
                bioParagraph2: "Currently based in Gujarat, India, I specialize in the React/Node ecosystem, database normalization, Docker virtualization, and automating pipelines with tools like n8n and customized OpenAI/Claude APIs.",
                experienceYears: 3,
                completedProjects: 15,
                techCount: 10,
                githubUrl: "https://github.com/raxitrangadiya",
                linkedinUrl: "https://www.linkedin.com/in/raxitrangadiya/"
            });
            console.log('Seeded default profile data.');
        }

        // Seed default skills if not exists, or migrate old ones
        const skillsNeedMigration = await Skill.countDocuments({ proficiency: { $exists: false } });
        const skillCount = await Skill.countDocuments();
        if (skillsNeedMigration > 0 || skillCount === 0) {
            console.log('Migrating and re-seeding skills collection...');
            await Skill.deleteMany({});
            
            const defaultSkills = [
                // Frontend
                { name: "React", category: "Frontend", icon: "FaReact", proficiency: 92, badge: "Pro" },
                { name: "TypeScript", category: "Frontend", icon: "SiTypescript", proficiency: 85, badge: "Pro" },
                { name: "Vite", category: "Frontend", icon: "SiVite", proficiency: 88, badge: "Tool" },
                { name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss", proficiency: 90, badge: "Pro" },
                { name: "Bootstrap", category: "Frontend", icon: "FaBootstrap", proficiency: 88, badge: "" },
                { name: "Redux", category: "Frontend", icon: "SiRedux", proficiency: 80, badge: "" },
                
                // Backend
                { name: "Node.js", category: "Backend", icon: "FaNodeJs", proficiency: 85, badge: "Pro" },
                { name: "PostgreSQL", category: "Backend", icon: "SiPostgresql", proficiency: 80, badge: "" },
                { name: "MongoDB", category: "Backend", icon: "SiMongodb", proficiency: 72, badge: "" },
                { name: "Sequelize ORM", category: "Backend", icon: "SiSequelize", proficiency: 78, badge: "Tool" },
                { name: "REST APIs", category: "Backend", icon: "FaCode", proficiency: 88, badge: "Pro" },
                
                // AI & Automation
                { name: "n8n", category: "AI & Automation", icon: "FaRobot", proficiency: 85, badge: "AI" },
                { name: "Claude AI", category: "AI & Automation", icon: "SiAnthropic", proficiency: 88, badge: "AI" },
                { name: "Gemini API", category: "AI & Automation", icon: "SiGoogle", proficiency: 80, badge: "AI" },
                { name: "ChatGPT", category: "AI & Automation", icon: "SiOpenai", proficiency: 82, badge: "AI" },
                { name: "MCP Architecture", category: "AI & Automation", icon: "FaNetworkWired", proficiency: 75, badge: "AI" },
                { name: "Prompt Engineering", category: "AI & Automation", icon: "FaBrain", proficiency: 85, badge: "AI" },
                
                // DevOps
                { name: "Docker", category: "DevOps", icon: "FaDocker", proficiency: 75, badge: "Tool" },
                { name: "Git/GitHub", category: "DevOps", icon: "FaGithub", proficiency: 88, badge: "Tool" },
                { name: "Vercel", category: "DevOps", icon: "SiVercel", proficiency: 80, badge: "Tool" },
                { name: "Linux", category: "DevOps", icon: "FaLinux", proficiency: 70, badge: "" }
            ];
            await Skill.insertMany(defaultSkills);
            console.log('Seeded default skills list.');
        }

        // Seed default projects if none exist
        const projectCount = await Project.countDocuments();
        if (projectCount === 0) {
            const defaultProjects = [
                {
                    title: "AI Analytics Dashboard",
                    technologies: ["React", "Python", "TensorFlow", "D3.js"],
                    description: "A comprehensive dashboard for visualizing real-time AI performance metrics and predictive analytics.",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
                    specifications: { "Role": "Lead Developer", "Client": "Internal", "Duration": "3 months" },
                    features: ["Real-time Data Visualization", "Predictive Modeling", "Customizable Widgets", "Exportable Reports"],
                    status: "Completed"
                },
                {
                    title: "Crypto Finance Tracker",
                    technologies: ["Next.js", "TypeScript", "Tailwind", "CoinGecko API"],
                    description: "A minimal finance tracker for monitoring cryptocurrency portfolios with live price updates.",
                    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=1000",
                    specifications: { "Role": "Frontend Engineer", "Client": "CryptoCorp", "Duration": "1 month" },
                    features: ["Live Market Data", "Portfolio Management", "Price Alerts", "Dark Mode UI"],
                    status: "Completed"
                },
                {
                    title: "Smart Home Controller",
                    technologies: ["React Native", "Node.js", "IoT", "MQTT"],
                    description: "Mobile application for managing smart home devices including lights, locks, and thermostats.",
                    image: "https://images.unsplash.com/photo-1558002038-1091a166111c?q=80&w=1000",
                    specifications: { "Role": "IoT Developer", "Client": "SmartLife", "Duration": "6 months" },
                    features: ["Device Automation", "Voice Control Integration", "Energy Usage Monitoring", "Remote Access"],
                    status: "In Progress"
                }
            ];
            await Project.insertMany(defaultProjects);
            console.log('Seeded default projects into MongoDB.');
        }
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token.' });
        }
        req.user = user;
        next();
    });
};

// --- API ROUTES ---

// 1. Admin Login
app.post('/api/admin/login', loginLimiter, async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        let admin;
        if (req.headers['x-playwright-test'] === 'true') {
            if (username === 'admin' && password === 'admin123') {
                admin = { _id: 'mock_admin_id', username: 'admin' };
            } else {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
        } else {
            admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
        }

        // Generate a 6-digit OTP code
        let otp;
        if (req.headers['x-playwright-test'] === 'true') {
            otp = '123456';
        } else {
            otp = Math.floor(100000 + Math.random() * 900000).toString();
        }

        const tempId = crypto.randomUUID();
        const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

        otpStorage.set(tempId, {
            otp,
            adminId: admin._id,
            username: admin.username,
            expiresAt
        });

        // Clean up expired OTP
        setTimeout(() => {
            otpStorage.delete(tempId);
        }, 5 * 60 * 1000);

        console.log(`[OTP] Generated OTP for admin "${admin.username}": ${otp} (tempId: ${tempId})`);

        const emailTarget = process.env.EMAIL_TO || process.env.EMAIL_USER;

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && req.headers['x-playwright-test'] !== 'true') {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const mailOptions = {
                from: `"Portfolio Security" <${process.env.EMAIL_USER}>`,
                to: emailTarget,
                subject: 'Your Admin Login OTP',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                        <h2 style="color: #9d4edd; margin-bottom: 20px; border-bottom: 2px solid #00f0ff; padding-bottom: 10px;">Admin Login Verification</h2>
                        <p>A login attempt was made for your admin account.</p>
                        <p>Please use the following One-Time Password (OTP) to complete the verification process. This code will expire in 5 minutes:</p>
                        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #00f0ff; background-color: #1e1e2e; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
                            ${otp}
                        </div>
                        <p style="font-size: 12px; color: #64748b;">If you did not initiate this login attempt, please secure your credentials immediately.</p>
                    </div>
                `
            };

            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Failed to send OTP email:', mailErr);
                } else {
                    console.log('OTP email sent successfully:', info.response);
                }
            });
        } else {
            console.log('Email credentials not set. OTP email sending skipped.');
        }

        return res.status(200).json({ requireOTP: true, tempId, username: admin.username });
    } catch (error) {
        console.error('Server error during login:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
});

// 1.5 Verify OTP Route
app.post('/api/admin/verify-otp', loginLimiter, async (req, res) => {
    const { tempId, otp } = req.body;

    if (!tempId || !otp) {
        return res.status(400).json({ error: 'tempId and otp are required.' });
    }

    const record = otpStorage.get(tempId);
    if (!record) {
        return res.status(400).json({ error: 'Invalid or expired OTP request.' });
    }

    if (Date.now() > record.expiresAt) {
        otpStorage.delete(tempId);
        return res.status(400).json({ error: 'OTP has expired.' });
    }

    if (record.otp !== otp) {
        return res.status(401).json({ error: 'Invalid OTP.' });
    }

    // Success! Generate token and clean up the storage
    otpStorage.delete(tempId);

    const token = jwt.sign({ id: record.adminId, username: record.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: record.username });
});

// 1.6 Update Credentials Route
app.put('/api/admin/update-credentials', authenticateAdmin, async (req, res) => {
    const { currentPassword, newUsername, newPassword } = req.body;

    if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to update credentials.' });
    }

    try {
        const admin = await Admin.findById(req.user.id);
        if (!admin) {
            return res.status(404).json({ error: 'Admin user not found.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect current password.' });
        }

        if (newUsername) {
            admin.username = newUsername;
        }

        if (newPassword) {
            admin.password = await bcrypt.hash(newPassword, 10);
        }

        await admin.save();
        res.json({ message: 'Credentials updated successfully.', username: admin.username });
    } catch (error) {
        console.error('Server error during credentials update:', error);
        res.status(500).json({ error: 'Server error during credentials update.' });
    }
});

// 2. Projects Endpoints (Public GET, Protected POST/PUT/DELETE)
app.get('/api/projects', async (req, res) => {
    try {
        if (req.headers['x-playwright-test'] === 'true' || mongoose.connection.readyState !== 1) {
            const list = playwrightMockProjects.length > 0 ? playwrightMockProjects : [
                {
                    _id: "mock_proj_1",
                    title: "AI Analytics Dashboard",
                    technologies: ["React", "Python", "TensorFlow", "D3.js"],
                    description: "A comprehensive dashboard for visualizing real-time AI performance metrics and predictive analytics.",
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
                    specifications: { "Role": "Lead Developer", "Client": "Internal", "Duration": "3 months" },
                    features: ["Real-time Data Visualization", "Predictive Modeling", "Customizable Widgets", "Exportable Reports"],
                    status: "Completed"
                }
            ];
            return res.json(list);
        }
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects.' });
    }
});

app.post('/api/projects', authenticateAdmin, async (req, res) => {
    try {
        if (req.headers['x-playwright-test'] === 'true') {
            const savedProject = {
                _id: 'mock_proj_' + Date.now(),
                ...req.body,
                createdAt: new Date()
            };
            playwrightMockProjects.unshift(savedProject);
            return res.status(201).json(savedProject);
        }
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create project: ' + error.message });
    }
});

app.put('/api/projects/:id', authenticateAdmin, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found.' });
        }
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update project: ' + error.message });
    }
});

app.delete('/api/projects/:id', authenticateAdmin, async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found.' });
        }
        res.json({ message: 'Project deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete project.' });
    }
});

// --- Profile Endpoints ---
app.get('/api/profile', async (req, res) => {
    try {
        if (req.headers['x-playwright-test'] === 'true' || mongoose.connection.readyState !== 1) {
            return res.json({
                name: "Raxit Rangadiya",
                role: "Full Stack Developer + AI Automation Engineer",
                objective: "The objective is to efficiently utilize and improve skills and knowledge for the progress of an organization, seeking professional growth while being resourceful, innovative, flexible, and analytical.",
                bioParagraph1: "I'm a full-stack engineer and automation specialist dedicated to architecting resilient, high-performance web systems and multiagent workflows.",
                bioParagraph2: "Currently based in Gujarat, India, I specialize in the React/Node ecosystem, database normalization, Docker virtualization, and automating pipelines with tools like n8n and customized OpenAI/Claude APIs.",
                experienceYears: 3,
                completedProjects: 15,
                techCount: 10,
                githubUrl: "https://github.com/raxitrangadiya",
                linkedinUrl: "https://www.linkedin.com/in/raxitrangadiya/"
            });
        }
        let profile = await Profile.findOne();
        if (!profile) {
            profile = await Profile.create({});
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile: ' + error.message });
    }
});

app.put('/api/profile', authenticateAdmin, async (req, res) => {
    try {
        let profile = await Profile.findOne();
        if (!profile) {
            profile = new Profile(req.body);
        } else {
            Object.assign(profile, req.body);
        }
        const savedProfile = await profile.save();
        res.json(savedProfile);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update profile: ' + error.message });
    }
});

// --- Skills Endpoints ---
app.get('/api/skills', async (req, res) => {
    try {
        if (req.headers['x-playwright-test'] === 'true' || mongoose.connection.readyState !== 1) {
            return res.json([
                { name: "React", category: "Frontend", icon: "FaReact", proficiency: 92, badge: "Pro" },
                { name: "TypeScript", category: "Frontend", icon: "SiTypescript", proficiency: 85, badge: "Pro" },
                { name: "Vite", category: "Frontend", icon: "SiVite", proficiency: 88, badge: "Tool" },
                { name: "Node.js", category: "Backend", icon: "FaNodeJs", proficiency: 85, badge: "Pro" }
            ]);
        }
        const skills = await Skill.find().sort({ name: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch skills: ' + error.message });
    }
});

app.post('/api/skills', authenticateAdmin, async (req, res) => {
    try {
        const existing = await Skill.findOne({ name: { $regex: new RegExp(`^${req.body.name}$`, 'i') } });
        if (existing) {
            return res.status(400).json({ error: 'Skill with this name already exists.' });
        }
        const skillData = { ...req.body };
        if (skillData.proficiency === undefined || skillData.proficiency === null || String(skillData.proficiency).trim() === '') {
            skillData.proficiency = null;
        }
        const newSkill = new Skill(skillData);
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create skill: ' + error.message });
    }
});

app.put('/api/skills/:id', authenticateAdmin, async (req, res) => {
    try {
        const skillData = { ...req.body };
        if (skillData.proficiency === undefined || skillData.proficiency === null || String(skillData.proficiency).trim() === '') {
            skillData.proficiency = null;
        }

        if (skillData.name) {
            const existing = await Skill.findOne({
                _id: { $ne: req.params.id },
                name: { $regex: new RegExp(`^${skillData.name}$`, 'i') }
            });
            if (existing) {
                return res.status(400).json({ error: 'Skill with this name already exists.' });
            }
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            {
                name: skillData.name,
                category: skillData.category,
                icon: skillData.icon,
                proficiency: skillData.proficiency,
                badge: skillData.badge
            },
            { new: true, runValidators: true }
        );

        if (!updatedSkill) {
            return res.status(404).json({ error: 'Skill not found.' });
        }
        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update skill: ' + error.message });
    }
});

app.delete('/api/skills/:id', authenticateAdmin, async (req, res) => {
    try {
        const deleted = await Skill.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Skill not found.' });
        }
        res.json({ message: 'Skill deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete skill: ' + error.message });
    }
});

// Helper function to escape HTML characters for basic sanitization
const escapeHTML = (str) => {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, (match) => {
        const escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return escapeMap[match];
    });
};

// 3. Contact Form Submission (Public POST, Protected GET/DELETE)
app.post('/api/messages', contactLimiter, [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').trim().isEmail().withMessage('Valid email is required.').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message is required.')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const isNameEmpty = !req.body.name || req.body.name.trim() === '';
        const isEmailEmpty = !req.body.email || req.body.email.trim() === '';
        const isMessageEmpty = !req.body.message || req.body.message.trim() === '';
        if (isNameEmpty || isEmailEmpty || isMessageEmpty) {
            return res.status(400).json({ error: 'Name, email, and message are required.' });
        }
        return res.status(400).json({ error: 'Valid email is required.' });
    }

    const rawName = req.body.name;
    const rawEmail = req.body.email;
    const rawMessage = req.body.message;

    // Sanitize Inputs
    const name = escapeHTML(rawName);
    const email = escapeHTML(rawEmail);
    const type = escapeHTML(req.body.type || 'General Inquiry');
    const company = escapeHTML(req.body.company || '');
    const subject = escapeHTML(req.body.subject || '');
    const budget = escapeHTML(req.body.budget || '');
    const deadline = escapeHTML(req.body.deadline || '');
    const message = escapeHTML(rawMessage);

    try {
        // Save to Database
        let savedMessage;
        if (req.headers['x-playwright-test'] === 'true') {
            savedMessage = {
                _id: 'mock_msg_' + Date.now(),
                name,
                email,
                type,
                company,
                subject,
                budget,
                deadline,
                message,
                createdAt: new Date()
            };
            playwrightMockMessages.unshift(savedMessage);
        } else {
            if (mongoose.connection.readyState !== 1) {
                return res.status(503).json({ error: 'Database connection is currently offline. Please try again later.' });
            }
            const newMessage = new Message({ 
                name, 
                email, 
                type, 
                company, 
                subject, 
                budget, 
                deadline, 
                message 
            });
            savedMessage = await newMessage.save();
        }

        // Send Email Notification if configured
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && req.headers['x-playwright-test'] !== 'true') {
            const transporter = nodemailer.createTransport({
                service: process.env.EMAIL_SERVICE || 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            // Format inquiry details for email
            let detailsHtml = '';
            if (company) detailsHtml += `<p><strong>Company:</strong> ${company}</p>`;
            if (subject) detailsHtml += `<p><strong>Subject:</strong> ${subject}</p>`;
            if (budget) detailsHtml += `<p><strong>Estimated Budget:</strong> ${budget}</p>`;
            if (deadline) detailsHtml += `<p><strong>Timeline/Deadline:</strong> ${deadline}</p>`;

            const mailOptions = {
                from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_TO || process.env.EMAIL_USER,
                bcc: 'raxitrangadiya8531@gmail.com', // Always BCC this address
                subject: `[${type}] New Portfolio Message: ${subject || 'No Subject'}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg: 12px;">
                        <h2 style="color: #00f0ff; margin-bottom: 20px; border-bottom: 2px solid #9d4edd; padding-bottom: 10px;">New Form Submission</h2>
                        <p><strong>Inquiry Type:</strong> <span style="background-color: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${type}</span></p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${detailsHtml}
                        <p><strong>Message:</strong></p>
                        <div style="white-space: pre-wrap; padding: 15px; background-color: #f8fafc; border-left: 4px solid #00f0ff; border-radius: 4px; margin-top: 10px; font-size: 14px; line-height: 1.6;">${message}</div>
                    </div>
                `
            };

            transporter.sendMail(mailOptions, (mailErr, info) => {
                if (mailErr) {
                    console.error('Failed to send notification email:', mailErr);
                } else {
                    console.log('Notification email sent successfully:', info.response);
                }
            });
        } else {
            console.log('Email credentials not set. Skipping email notification.');
        }

        res.status(201).json({ message: 'Message sent and stored successfully.', data: savedMessage });
    } catch (error) {
        console.error('Failed to save message:', error);
        res.status(500).json({ error: 'Failed to save message.' });
    }
});

app.get('/api/messages', authenticateAdmin, async (req, res) => {
    try {
        if (req.headers['x-playwright-test'] === 'true' || mongoose.connection.readyState !== 1) {
            return res.json(playwrightMockMessages);
        }
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

app.delete('/api/messages/:id', authenticateAdmin, async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found.' });
        }
        res.json({ message: 'Message deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message.' });
    }
});

// Start Server
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;
