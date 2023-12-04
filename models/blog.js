const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    instructor: {
        type:  String,
        required: true,
        },
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
    }, {timestamps: true});

        // Model name is singular and will be pluralized by mongoose ex: Blog -> Blogs
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;