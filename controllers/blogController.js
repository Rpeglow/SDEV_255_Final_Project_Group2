const Blog = require('../models/blog');
const User = require("../models/User");
const Schedule = require('../models/schedule');


// Displays all classes
const blog_index = (req, res) => {
    const studentId = req.user._id;
    Blog.find({ user_courses: { $ne: studentId } }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Classes', blogs: result, role: req.user.role, user: req.user })
        })
        .catch((err) => {
            console.log(err);
        })
}

// Displays a specific class
const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details', { blog: result, title: 'Class Details', user: req.user });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Class not found' });
        });
}

// Creates a new class
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new class', user: req.user });
}

// Creates a new class
const blog_create_post = (req, res) => {const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
}

// Deletes a class
const blog_delete = (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs', user: req.user });
        })
        .catch(err => {
            console.log(err);
        });
}

// Updates a class
const blog_update = (req, res) => {
    let id = req.params.id.trim(); // Remove leading and trailing spaces
    const update = req.body;
    Blog.findOneAndUpdate({_id: id}, update, {new: true})
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
}

// Search for a class
const search_get = async (req, res) => {
    const id = req.params.id;
    const searchQuery = req.query.query;
    let blogs = []; // Array of blogs to be returned
    try {
        if (searchQuery) {
            blogs = await Blog.find({ name: new RegExp(searchQuery, 'i') }); 
        }
        res.render('blogs/search', { blogs: blogs, title: 'Search' });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while searching for blogs');
    }
};

// Add a class to a schedule
const add_to_schedule = async (req, res) => {
    const studentId = req.user._id;
    const blogId = req.body.blogId;
    try {
        const schedule = await Schedule.findOne({ user: studentId });
        if (schedule) {
            schedule.classes.push(blogId);
            await schedule.save();
        } else {
            const newSchedule = new Schedule({
                user: studentId,
                classes: [blogId]
            });
            await newSchedule.save();
            // Add the user to the class's user_courses
            await Blog.findOneAndUpdate({ _id: blogId }, { $push: { user_courses: studentId } });
        }
        res.status(200).render('blogs/index', { user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding class to schedule');
    }
};

const create_schedule = async (req, res) => {
    const studentId = req.user._id;
    try {
        const schedule = await Schedule.findOne({ user: studentId });
        if (!schedule) {
            const newSchedule = new Schedule({
                user: studentId,
                classes: []
            });
            await newSchedule.save();
            res.status(200).send('New schedule created');
        } else {
            res.status(400).send('Schedule already exists');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while creating schedule');
    }
};


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update,
    search_get,
    add_to_schedule,
    create_schedule
}
