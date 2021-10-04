const { Schema, model } = require("mongoose");
require('./User.model')

// 1. Define your schema
const conversationSchema = new Schema({
  participants: [{
      ref: 'User',
      type: Schema.Types.ObjectId
    },
  ] 
})

// 2. Define your model
const ConversationModel = model('Conversation', conversationSchema)

// 3. Export your Model with 'module.exports'
module.exports = ConversationModel