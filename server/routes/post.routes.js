var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Post = require('../models/Post.model');
const fileUploader = require('../config/cloudinary.config');

router.get('/feed', (req, res, next) => {

    Post.find()
    .then(posts => {
        User.findById(req.session.currentUser._id)
        .then(loggedUser => {
            const feedPosts = posts.filter(post => {
                return loggedUser.followers.includes(post.userId)
            })
            res.status(200).json(feedPosts)
        })
        .catch(err => console.log(err))
        

    })
    .catch(err => console.log('user not found. error: ', err));
})

router.get('/all', (req,res, next) => {

    Post.find({ userId: req.session.currentUser._id})
    .then(posts => {
        res.status(200).json(posts)

    })
    .catch(err => console.log('user not found. error: ', err));

})

router.get('/viewedUser/:userId', (req,res, next) => {
    const { userId } = req.params;
    Post.find({ userId: userId})
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => console.log('user not found. Error: ', err));

})

router.get('/like/:postId', async (req,res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId)
        if(post.likes.includes(req.session.currentUser._id)) {
            const removedLike = await Post.findByIdAndUpdate(postId, 
                { $pullAll: { likes: [req.session.currentUser._id]} }, 
                { new: true} 
                )
            res.status(203).json(removedLike);
            return;
        }
       const addedLike = await Post.findByIdAndUpdate(postId, 
        { $addToSet: { likes: req.session.currentUser._id}}, 
        { new : true }
        )
       res.status(203).json(addedLike);
    } catch (err) {
        res.status(404);
    }
})

router.post('/upload/postPicture', fileUploader.single('postPicture'), (req, res, next) => {
    console.log('file is: ', req.file)
   
    if (!req.file) {
      next(new Error('No file uploaded!'));
      return;
    }
    return  res.json({ secure_url: req.file.path })
});

router.post('/delete', (req,res) => {

    console.log('delete route:')
    Post.findOneAndRemove({ userId: req.session.currentUser._id})
    .then(post => {
        console.log(`deleted post ${post}`);
        res.status(200).json(post);
    })
    .catch(err => console.log('could not delete post', err));
})


router.post('/create', (req, res, next) => {

    console.log('line 35', req.body);
    const { description, file } = req.body;

    Post.create({
        userId: req.session.currentUser._id,
        description: description,
        img: file
    })
    .then(post => res.status(200).json(post))
    .catch(err => console.log(err));

})



module.exports = router;