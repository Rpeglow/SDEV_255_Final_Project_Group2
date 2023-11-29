const express = require('express');
const morgan = require('morgan');

//express app
const app = express();

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

//middleware & static files
app.use(express.static('public'));

app.use(morgan('dev'));

app.get('/', (req, res) => {
    const blogs = [
        // name, description, subject area, and number of credits
        {name: 'Place holder1', description: 'Lorem ipsum dolor sit amet consectetur', subject: 'Computer Science', credits: '3'},
        {name: 'Place holder2', description: 'Lorem ipsum dolor sit amet consectetur', subject: 'Computer Science', credits: '3'},
        {name: 'Place holder3', description: 'Lorem ipsum dolor sit amet consectetur', subject: 'Computer Science', credits: '3'},
        {name: 'Place holder4', description: 'Lorem ipsum dolor sit amet consectetur', subject: 'Computer Science', credits: '3'},
    ];
    res.render('index',{ title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about',{ title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create',{ title: 'Create a new blog' });
});

//404 page
app.use((req, res) => {
    res.status(404).render('404',{ title: '404' });
});
