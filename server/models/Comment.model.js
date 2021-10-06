const { Schema, model} = require('mongoose');

const commentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 1000
    },
    postId: {
        type: String,
        required: true
    },
    sender: {
        ref: 'User',
        type: Schema.Types.ObjectId
      }
},
{ timestamps: true}
);

const Comment = model('Comment', commentSchema);

module.exports = Comment;