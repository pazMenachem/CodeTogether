const mongoose = require('mongoose')

// TODO
/*
1. gitlink should be required
2. title should have validation of length
3. program lang should have choosing options
4. work on image
5. Each title name should be unique
 */
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
    program_language: {
        type: String
    },
    github_link: {
        type: String
    },
    image: {
        type: String,
        default: "Image"
    }
})

module.exports = mongoose.model('project', ProjectSchema);
