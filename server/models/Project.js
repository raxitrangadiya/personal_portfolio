import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    fullDetails: {
        type: String
    },
    technologies: {
        type: [String],
        required: true
    },
    image: {
        type: String,
        default: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000'
    },
    gallery: {
        type: [String],
        default: []
    },
    previewUrl: {
        type: String,
        trim: true
    },
    githubUrl: {
        type: String,
        trim: true
    },
    specifications: {
        type: Map,
        of: String,
        default: {}
    },
    features: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ['Completed', 'In Progress', 'Archived'],
        default: 'Completed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
