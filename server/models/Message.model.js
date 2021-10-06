
const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);



// const { Schema, model } = require("mongoose");
// require('./User.model')
// require('./Conversation.model')

// // 1. Define your schema
// const messageSchema = new Schema({
//   sender: {
//     ref: 'User',
//     type: Schema.Types.ObjectId,
//   },
//   message: {
//     type: String,
//   },
//   conversationId : {
//     ref: 'Conversation',
//     type: Schema.Types.ObjectId
//   } 
// }, {
//   timestamps: true
// })

// // 2. Define your model
// const Message = model('Message', messageSchema)

// // 3. Export your Model with 'module.exports'
// module.exports = Message