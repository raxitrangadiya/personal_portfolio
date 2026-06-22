import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    type: {
        type: String,
        required: true,
        enum: ['Freelance Project', 'Developer Opportunity', 'Event Invitation', 'General Inquiry'],
        default: 'General Inquiry'
    },
    company: {
        type: String,
        trim: true
    },
    subject: {
        type: String,
        trim: true
    },
    budget: {
        type: String,
        trim: true
    },
    deadline: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
