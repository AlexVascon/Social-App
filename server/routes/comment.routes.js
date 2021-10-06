var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');


router.get('/post/:postId', async (req, res) => {

    const { postId } = req.params;

    try {
        const comments = await Comment.find({ postId: postId})
        .populate('sender');

        res.status(200).json(comments);
    } catch(err) {
        res.status(404);
    }
})

router.get('/delete/:commentId', (req, res) => {

    const { commentId } = req.params;

    Comment.findByIdAndDelete(commentId)
    .then(comment => res.status(200).json(comment))
    .catch(err => console.log(err));
})


router.post('/create', async (req, res) => {

    const { comment, postId} = req.body;

    try{
        const newComment = await Comment.create({ 
            userId: req.session.currentUser._id, 
            description: comment, 
            postId: postId,
            sender: req.session.currentUser._id
        });
        res.status(203).json(newComment);
    } catch (err) {
        res.status(404).json(err);
    }
})


module.exports = router;