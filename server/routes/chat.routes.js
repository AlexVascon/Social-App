const router = require("express").Router();
const Conversation = require('../models/Conversation.model')
const Message = require('../models/Message.model')

router.get('/:userId', (req,res) => {

    Conversation.find({
        participants: { $in: [req.params.userId]}
    })
    .then(convo => {
        res.status(200).json(convo);
    })
    .catch(err => {
        res.status(400).json({ message: `unable to find conversation, error: ${err}`});
    });
})

router.post('/conversation', (req, res, next) => {
    const convo = req.body;
    const participants = [convo.senderId, convo.recieverId];
    Conversation.findOne({ participants: { $all: participants} })
      .then((found) => {
        if (found) {
          //Conversation between the participants already present
          res.status(200).json(found)
        }
        else {
          //Create a conversation between them if not present
          Conversation.create({participants})
            .then((response) => {
              res.status(201).json(response)
            })
        }
      })
      .catch((err) => {
          next(err)       
      })
})

// A route to get all messages of a certain converstaion 
router.get('/messages/:conversationId', (req, res, next) => {
  const { conversationId } = req.params
  Message.find({conversationId})
    .populate('sender')
    .then((messages) => {
      res.status(200).json(messages)
    })
    .catch((err) => {
      next(err)       
  })
})

module.exports = router;