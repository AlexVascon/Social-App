const router = require("express").Router();
// const Conversation = require("../models/Conversation.model");
const Convo = require('../models/Convo.model');

//new conv

router.post('/', async (req, res, next) => {
    const participants = [req.body.senderId, req.body.receiverId];

    try {
        const found = await Convo.findOne({ members: { $all: participants } })
        if(found) {
            res.status(200).json(found)
        } else {
            const newConversation = await new Convo({
                members: [req.body.senderId, req.body.receiverId],
            })
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
        }
    } catch(err) {
        res.status(500).json(err);
    }
})


//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Convo.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Convo.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;