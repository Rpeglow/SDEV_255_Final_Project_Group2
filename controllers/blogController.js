const Blog = require('../models/blog');



// Displays all classes
const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('blogs/index', { title: 'All Classes', blogs: result })
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
            res.render('blogs/details', { blog: result, title: 'Class Details' });
        })
        .catch(err => {
            res.status(404).render('404', { title: 'Class not found' });
        });
}

// Creates a new class
const blog_create_get = (req, res) => {
    res.render('blogs/create', { title: 'Create a new class' });
}

// Creates a new class
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

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
            res.json({ redirect: '/blogs' });
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
    let blogs = []; // Changed variable name from courses to blogs
    try {
        if (searchQuery) {
            blogs = await Blog.find({ name: new RegExp(searchQuery, 'i') }); // Changed variable name from courses to blogs
        }
        res.render('blogs/search', { blogs: blogs, title: 'Search' }); // Now blogs is defined
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while searching for blogs');
    }
};


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_update,
    search_get
}
