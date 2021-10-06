var express = require('express');
var router = express.Router();
const User = require('../models/User.model');

router.get('/request/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const found = await User.findById(userId)

        if(found.followers.includes(req.session.currentUser._id)) {
            const removeFollowUser = await User.findByIdAndUpdate(req.session.currentUser._id, 
                { $pull: { following: userId } }
                 )
            const removeProfileFollower = await User.findByIdAndUpdate(userId, 
                { $pull: { followers: req.session.currentUser._id } },
                { new: true }  
                )
            
            res.status(200).json(removeProfileFollower);
            return;
        } else {
            const addFollow = await User.findByIdAndUpdate(req.session.currentUser._id, 
                { $addToSet: { following: userId } }
                )

            const addFollower = await User.findByIdAndUpdate(userId, 
                { $addToSet: { followers: req.session.currentUser._id } },
                { new: true }  
                )
     
            res.status(200).json(addFollower);
        }
    } catch(err) {
        res.status(400).json(err)
    }
})

router.get('/pending', (req,res) => {

    User.findById(req.session.currentUser._id)
    .then(loggedUser => {
        const pendingFollowRequests = loggedUser.followers.filter(
            follower => !loggedUser.following.includes(follower)
        )
        res.status(200).json(pendingFollowRequests)
    })
    .catch(err => {res.status(404).json(err)})
})

router.post('/requestUsers', (req, res) => {
    
    User.find({ _id: { $in: req.body}})
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router;