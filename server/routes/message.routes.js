var express = require('express');
var router = express.Router();
const User = require('../models/User.model');
const Message = require('../models/Message.model');


router.get('/convoMessages/:conversationId', (req, res, next) => {

    const { conversationId } = req.params
  Message.find({conversationId})
    .populate('sender')
    .then((messages) => {
        console.log('messages', messages)
      res.status(200).json(messages)
    })
    .catch((err) => {
      next(err)       
  })

    // Message.find({ conversationId: req.params.conversationId})
    // .then( messages => {
    //     console.log('all messages:', messages)
    //     res.status(200).json(messages);
    // })
    // .catch(err => {
    //     res.status(400).json({ message: `unable to fimd convo, error: ${err}`});
    // });

});

router.post('/create', (req, res, next) => {
    const { sender, message, conversationId} = req.body;

    Message.create({
        sender: sender, 
        message: message,
        conversationId: conversationId
    })
    .then(message => { 
        res.status(201).json(message);
    })
    .catch(err => {
        res.status(400).json({ message: `message creation failed. error: ${err}`})
    });
});

router.post('/remove/:username', (req, res) => {
    User.find({username: req.params.username})
    .then(user => {
        Message.findOneAndDelete({userId: user[0]._id})
        .then(message => {
            console.log('message deleted:', message);
            res.status(200).json(message);
        })
        .catch(err => console.log(`message not found for user ${user.username}. error:`, err));
    })
})

module.exports = router;