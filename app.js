const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const methodOverride = require('method-override');

//express app
const app = express();

const dbURI = 'mongodb+srv://Group2:PoSuSaRe@group2.hedeobb.mongodb.net/Courses';
mongoose.connect(dbURI)
    .then((result) => {
        app.listen(3000);
        console.log("Connected to MongoDB and listening on port 3000");
    })
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about',{ title: 'About' });
});

// blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create',{ title: 'Create a new class' });
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt: -1})
        .then((blogs) => {
            res.render('index',{title: 'All Classes', blogs: blogs})
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
    });
    
// update information

app.patch('/blogs/:id', (req, res) => {
    let id = req.params.id.trim(); // Remove leading and trailing spaces
    const update = req.body;
    Blog.findOneAndUpdate({_id: id}, update, {new: true})
        .then(() => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
    .then(result => {
        res.render('details', { blog: result, title: 'Class Details' });
    })
    .catch(err => {
        console.log(err);
    });

});

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => {
            res.json({redirect: '/blogs'});
        })
        .catch((err) => {
            console.log(err);
        });
});

//404 page
app.use((req, res) => {
    res.status(404).render('404',{ title: '404' });
});
