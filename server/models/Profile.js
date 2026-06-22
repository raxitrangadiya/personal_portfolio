import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        default: "Raxit Rangadiya"
    },
    role: {
        type: String,
        required: true,
        maxlength: 100,
        default: "Full Stack Developer + AI Automation Engineer"
    },
    objective: {
        type: String,
        required: true,
        maxlength: 300,
        default: "The objective is to efficiently utilize and improve skills and knowledge for the progress of an organization, seeking professional growth while being resourceful, innovative, flexible, and analytical."
    },
    bioParagraph1: {
        type: String,
        required: true,
        maxlength: 500,
        default: "I'm a full-stack engineer and automation specialist dedicated to architecting resilient, high-performance web systems and multiagent workflows. My development philosophy is rooted in system integrity, clean code design, and leveraging modern cognitive models to streamline workflows."
    },
    bioParagraph2: {
        type: String,
        required: true,
        maxlength: 500,
        default: "Currently based in Gujarat, India, I specialize in the React/Node ecosystem, database normalization, Docker virtualization, and automating pipelines with tools like n8n and customized OpenAI/Claude APIs."
    },
    experienceYears: {
        type: Number,
        required: true,
        min: 0,
        default: 3
    },
    completedProjects: {
        type: Number,
        required: true,
        min: 0,
        default: 15
    },
    techCount: {
        type: Number,
        required: true,
        min: 0,
        default: 10
    },
    githubUrl: {
        type: String,
        required: true,
        default: "https://github.com/raxitrangadiya"
    },
    linkedinUrl: {
        type: String,
        required: true,
        default: "https://www.linkedin.com/in/raxitrangadiya/"
    }
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
