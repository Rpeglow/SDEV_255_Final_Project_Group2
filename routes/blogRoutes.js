const express = require('express');
const blogController = require('../controllers/blogController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = express.Router();




router.post('/add_class_to_course/:id', requireAuth, blogController.add_class_to_course);
router.get('/',blogController.blog_index);


// Student Routes
// post add a "blog" to schedule 
// get all "blogs" from schedule for a specific student 
// delete a "blog" from schedule for a specific student DELETE 

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