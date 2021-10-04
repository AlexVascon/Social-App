var express = require('express');
var router = express.Router();
const User = require('../models/User.model');


router.get('/all', (req,res, next) => {
    User.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ message: `Something went wrong or no users present, error: ${err}`});
    });
})

router.get('/friends', (req, res) => {
    User.find()
    .then(users => {
        const usersFriends = users.filter(user => {
            return user.followers.includes(req.session.currentUser._id) && user.following.includes(req.session.currentUser._id);
        })
        res.status(200).json(usersFriends);
    })
    .catch(err => {
        res.status(400).json({ message: `Something went wrong or you walk a lonely road, error: ${err}`});
    });
})

router.get('/:userId', (req,res) => {
    const { userId } = req.params;
    User.findById(userId)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(400).json({ message: `Unable to find user, error: ${err}`});
    });
})

router.get('/friends/:userId', (req, res) => {
    const { userId } = req.params;

    User.find()
    .then(users => {
        const usersFriends = users.filter(user => {
            return user.followers.includes(userId) && user.following.includes(userId);
        })
        res.status(201).json(usersFriends);
    })
})

// follow/unfollow user
router.get('/following/:userId', (req, res, next) => {
    // visiting user id
    const { userId } = req.params;

    User.findById(userId)
    .then(visitUser => {
        User.findById(req.session.currentUser._id)
        .then(loggedUser => {
            if(visitUser.followers.includes(req.session.currentUser._id)) {
                User.findByIdAndUpdate(visitUser._id, 
                    { $pullAll: { 
                         followers: [loggedUser._id]
                      }
                    }, { new : true } 
                )
                .then(visitUserFollowUpdate => {
                    User.findByIdAndUpdate(loggedUser._id, 
                        { $pullAll: { 
                            following: [visitUser._id]
                          }
                        }, { new: true}
                    )
                    .then(() => {
                        res.status(200).json(visitUserFollowUpdate)
                    })
                    .catch(err => res.status(500).json({ message: 'Something went wrong, error: ' + err}))
                })
                .catch(err =>  res.status(500).json({ message: 'Something went wrong, error: ' + err}))
            } else {
                User.findByIdAndUpdate(visitUser, 
                    { $addToSet: { 
                        followers: [loggedUser._id]
                        }
                    }, { new: true }
                )
                .then(visitUserFollowUpdate => {
                    User.findByIdAndUpdate(loggedUser._id, { $addToSet: { following: [visitUser._id]}}, { new: true})
                    .then(stuff => res.status(200).json(visitUserFollowUpdate))
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
        
    })
    .catch(err => console.log(err))
})

router.get('/visit/:userId', (req,res) => {
    const { userId } = req.params;

    User.findById(userId)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => res.status(400).json({ message: `unable to find user, error: ${err}`}));
})

router.get('/person/:username', (req,res, next) => {
    User.find({ username: req.params.username })
    .then(user => { 
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(400).json({ message: `unable to find user, error: ${err}`})
    });
})

router.post('/add', (req,res) => {
    const { username } = req.body.user;

    User.findByIdAndUpdate(req.session.currentUser._id, 
        { $push: 
            {following: username}
        })
    .then(user => {
        req.status(200).json({ message: `succesfully added friend ${user.username}`});
    })
    .catch(err => {
        res.status(400).json({ message: `unable to add user ${username}, error: ${err}`})
    });

})




module.exports = router;