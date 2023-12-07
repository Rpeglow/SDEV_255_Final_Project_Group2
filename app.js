const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

const dbURI = 'mongodb+srv://Group2:PoSuSaRe@group2.hedeobb.mongodb.net/Courses';
mongoose.connect(dbURI)
    .then((result) => {
        var port = process.env.PORT || 3000
        app.listen(port);
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

//redirect to /blogs
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

//about page
app.get('/about', (req, res) => {
    res.render('about',{ title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404',{ title: '404' });
});
