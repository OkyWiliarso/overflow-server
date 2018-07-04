const mongoose = require('mongoose')
const Schema = mongoose.Schema

let AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  answer: {
    type: String,
    required: [true, 'answer cannot be empty']
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
},{
  timestamps: true
})


module.exports = mongoose.model('answer', AnswerSchema)