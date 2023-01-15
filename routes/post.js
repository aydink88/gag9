const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/post');
const authenticate = require('../utils/authenticate');

router.get('/', postControllers.getPosts);
router.get('/:pid', postControllers.getSinglePost);
router.post('/', authenticate, postControllers.createPost);
router.put('/:pid', authenticate, postControllers.updatePost);
router.delete('/:pid', authenticate, postControllers.deletePost);
router.put('/upvote/:pid', authenticate, postControllers.upvotePost);
router.put('/downvote/:pid', authenticate, postControllers.downvotePost);

module.exports = router;
