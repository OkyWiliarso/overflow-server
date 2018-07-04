const mongoose = require('mongoose')
const Schema = mongoose.Schema

let QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: [true, 'title cannot be empty']
  },
  description: {
    type: String,
    required: [true, 'content cannot be empty']   
  },
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'answer'
  }],
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

module.exports = mongoose.model('question', QuestionSchema)