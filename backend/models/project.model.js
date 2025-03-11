import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        uniue: true,
        trim : true,
        lowercase: true,
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [50, 'Name must be at most 50 characters long']
    },
    users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});

const Project = mongoose.model('project', projectSchema);

export default Project;