const express = require('express');
const blogController = require('../controllers/blogController');


const router = express.Router();

// blog routes

router.get('/',blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create', blogController.blog_create_get);

router.patch('/:id',blogController.blog_update);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

router.get('/search', blogController.search_get);

module.exports = router;