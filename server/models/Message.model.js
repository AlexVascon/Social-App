const { Schema, model } = require("mongoose");
require('./User.model')
require('./Conversation.model')

// 1. Define your schema
const messageSchema = new Schema({
  sender: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  message: String,
  conversationId : {
    ref: 'Conversation',
    type: Schema.Types.ObjectId
  } 
}, {
  timestamps: true
})

// 2. Define your model
const MessageModel = model('Message', messageSchema)

// 3. Export your Model with 'module.exports'
module.exports = MessageModel