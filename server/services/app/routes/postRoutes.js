const PostController = require('../controllers/postController');

const router = require('express').Router();

router.get('/', PostController.posts);

router.get('/:id', PostController.postDetail);

router.post('/', PostController.newPost);

router.put('/:id', PostController.editPost);

router.delete('/:id', PostController.deletePost);

module.exports = router;
