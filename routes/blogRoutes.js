const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-schedule', requireAuth, blogController.create_schedule);

router.post('/add-to-schedule', requireAuth, blogController.add_to_schedule);

router.get('/',blogController.blog_index);


// Student Routes
// post add a "blog" to schedule POST /schedule/:studentId

// get all "blogs" from schedule for a specific student GET /schedule/:studentId
router.get('/my-courses', requireAuth, async (req, res) => {
    const studentId = req.user._id;
    try {
        const blogs = await Blog.find({ user_courses: studentId });
        res.render('blogs/my-courses', { blogs: blogs, title: 'My Courses', user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching my courses');
    }
});
// delete a "blog" from schedule for a specific student DELETE /schedule/:studentId/:blogId

// Teacher Routes
// get all "blogs" from "blogs" for a specific teacher
// post add a "blog" to "blogs" for a specific teacher
// delete a "blog" from "blogs" for a specific teacher
// edit a "blog" from "blogs" for a specific teacher

router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);

router.patch('/:id',blogController.blog_update);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);
router.get('/search', blogController.search_get);

module.exports = router;