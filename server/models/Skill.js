import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        required: true,
        default: 'FaCode' // name of react-icons component e.g. FaReact, SiMongodb
    },
    proficiency: {
        type: Number,
        required: false,
        min: 0,
        max: 100,
        default: null
    },
    badge: {
        type: String,
        enum: ['Pro', 'AI', 'Tool', ''],
        default: ''
    }
});

const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
