var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');

// get user data
router.post('/description', async (req, res) => {
    console.log('req body:', req.body)
    try {
        const user = await User.findByIdAndUpdate(req.session.currentUser._id, {
            description: req.body.description
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }
})

router.get('/info', (req, res) => {
    User.findById(req.session.currentUser._id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

// add/update user info
router.post('/info', (req,res) => {
    const userId = req.session.currentUser._id;
    const { city, from } = req.body;
    User.findByIdAndUpdate(userId,  {
        city: city,
        from: from
    }
    )
    .then(user => {
        req.session.currentUser = user
    })
    .catch(err => console.log(err))

});

router.post('/description', async (req, res) => {
    console.log('req body:', req.body)
    try {
        const user = await User.findByIdAndUpdate(req.session.currentUser._id, {
            description: req.body
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json(err)
    }
})

// upload cover image to cloudinary and recieve url path 
router.post('/upload/coverPicture', fileUploader.single('coverPicture'),(req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
  
      User.findByIdAndUpdate(req.session.currentUser._id, {
          coverPicture: req.file.path
      })
      .then(() => {
          res.status(201).json({ secure_url: req.file.path });
        })
      .catch(err => res.status(500).json({ message: 'something went wrong, error: ' + err}));

});

// upload profile image to cloudinary and recieve url path 
router.post('/upload/profilePicture', fileUploader.single('profilePicture'),(req, res, next) => {
    if (!req.file) {
        next(new Error('No file uploaded!'));
        return;
      }
  
      User.findByIdAndUpdate(req.session.currentUser._id, {
          profilePicture: req.file.path
      })
      .then(() => {
          res.status(201).json({ secure_url: req.file.path })
        })
      .catch(err => {
          res.status(500).json({message: `Something went wrong, error: ${err}`})
        });

});

// delete account
router.get('/delete', (req,res, next) => {
    User.findByIdAndDelete(req.session.currentUser._id)
    .then(user => {
        res.status(204).json({ message: `succesfully deleted ${user.username}`})
    })
    .catch(err => {
        res.status(500).json({ message: `Something went wrong, error: ${err}`})
    });
})

router.post('/logout', (req, res) => {
        req.session.destroy()
        res.json({ message: 'user correctly logged out'});
})

module.exports = router;