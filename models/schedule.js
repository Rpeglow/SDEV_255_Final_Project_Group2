const User = require('./User');
const Blog = require('./blog');
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;

