var express = require('express');
var router = express.Router();
const User = require('../models/User.model');

router.post('/request', (req, res) => {
    const { userId } = req.body;

    User.findByIdAndUpdate(req.session.currentUser._id, { 
        $addToSet: { following: [userId]}
    })
    .then(user => {
        User.findByIdAndUpdate(userId, {
            $addToSet: { followers: [user._id]}
        })
        .then(() => res.status(203))
        .catch(err => res.status(404).json(err))
    })
    .catch(err => res.status(500).json(err))   
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

router.post('/requestUsers', async (req, res) => {
    const { userIds } = req.body;

    const users = []
    try {
        for(const userId in userIds) {
            console.log('userId', userId)
            const user = await User.findById(userIds[userId])
            console.log('user', user);
            users.push(user);
        }
        res.status(200).json(users)
    } catch (err) {
        res.status(404).json(err);
    }
    
})

module.exports = router;