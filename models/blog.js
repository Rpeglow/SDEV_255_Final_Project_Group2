const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    name: {
        type:  String,
        required: true,
        },
    description: {
        type: String,
        required: true,
        },
    subject: {
        type: String,
        required: true,
        },
    credits: {
        type: Number,
        required: true,
        },
    user_courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }],
    },
     {timestamps: true});

        // Model name is singular and will be pluralized by mongoose ex: Blog -> Blogs
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;