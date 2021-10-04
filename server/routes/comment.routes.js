var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model');

router.get('/users/:postId', (req,res) => {

    const { postId } = req.params;

    Comment.find({ postId: postId})
    .then(comments => {
        User.find()
        .then(users => {
            const commentUsers = comments.map(
                comment => {
                const userMatch = users.filter(user =>  {
                    return user._id == comment.userId
                })[0];
                return {comment, userMatch}
            });
            res.status(200).json(commentUsers);
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err));
})

router.get('/post/:postId', (req, res) => {

    const { postId } = req.params;

    Comment.find({ postId: postId})
    .then(postComments => res.status(200).json(postComments))
    .catch(err => console.log(err));
})

router.get('/delete/:commentId', (req, res) => {

    const { commentId } = req.params;

    Comment.findByIdAndDelete(commentId)
    .then(comment => res.status(200).json(comment))
    .catch(err => console.log(err));
})

router.post('/create', (req,res) => {

    const { comment, postId} = req.body;

    Comment.create({ 
        userId: req.session.currentUser._id, 
        description: comment, 
        postId: postId
    })
    .then(comment => res.status(200).json(comment))
    .catch(err => console.log(err));
})


module.exports = router;