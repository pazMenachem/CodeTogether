const mongoose = require('mongoose')


const ProjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required:  true
    },
    description: {
        type: String
    },
    programLanguage: {
        type: String
    },
    githubLink: {
        type: String
    },
    image: {
        type: String,
        default: null
    },
    difficult: {
        type: Number,
        default: 0,
    },
    projectStartDate: {
        type: Date,
    },
    contactLink: {
        type: String,
    },
})

module.exports = mongoose.model('project', ProjectSchema);
