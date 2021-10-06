const router = require("express").Router();
const Message = require("../models/Message.model");

//add

router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


// var express = require('express');
// var router = express.Router();
// const User = require('../models/User.model');
// const Message = require('../models/Message.model');


// router.get('/:conversationId', (req, res, next) => {
//     const { conversationId } = req.params
    
//   Message.find({conversationId})
//     .populate('sender')
//     .then((messages) => {
//       res.status(200).json(messages)
//     })
//     .catch((err) => {
//       next(err)       
//   })

// });

// router.post('/create', (req, res, next) => {
//     const { sender, message, conversationId} = req.body;

//     console.log('message body:', req.body)
//     Message.create({
//         sender: sender, 
//         message: message,
//         conversationId: conversationId
//     })
//     .then(message => { 
//         res.status(201).json(message);
//     })
//     .catch(err => {
//         res.status(400).json({ message: `message creation failed. error: ${err}`})
//     });
// });

// router.post('/remove/:username', (req, res) => {
//     User.find({username: req.params.username})
//     .then(user => {
//         Message.findOneAndDelete({userId: user[0]._id})
//         .then(message => {
//             console.log('message deleted:', message);
//             res.status(200).json(message);
//         })
//         .catch(err => console.log(`message not found for user ${user.username}. error:`, err));
//     })
// })

// module.exports = router;