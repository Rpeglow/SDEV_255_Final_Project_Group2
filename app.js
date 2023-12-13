const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const blogController = require('./controllers/blogController');
const authController = require('./controllers/authController');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const path = require('path');

//express app
const app = express();
app.set('views', path.join(__dirname, 'views'));

//connect to mongodb & listen for requests
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
app.use(cookieParser());

// routes
app.get('*', checkUser);


app.get('/', requireAuth, (req, res) => res.redirect('/blogs'));

app.use(authRoutes);

app.get('/search', requireAuth, blogController.search_get);

//searchpage
app.get('/searchpage', requireAuth, (req, res) => res.render('searchpage',{ title: 'Searchpage', user: req.user }));

//about page
app.get('/about', (req, res) => res.render('about',{ title: 'About', user: req.user}));

//404 page
app.use((req, res) => res.status(404).render('404',{ title: '404', user: req.user}));


// app.get('/', requireAuth, (req, res) => res.render('home',{ title: 'home' }));
// app.get('/search', requireAuth, blogController.search_get);
