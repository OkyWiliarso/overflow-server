const Answer = require('../models/answer.model')
const Question = require('../models/question.model')

module.exports = {
  createAnswer: function (req, res) {
    let answer = new Answer({
      user: req.user.id,
      answer: req.body.answer,
      upvote: [],
      downvote: []
    })

    answer.save()
    .then(response => {
      let answerId = response._id
      Question.findByIdAndUpdate(req.params.id, {
        $push: {
          answers: answerId
        }
      })
      .then(response => {
        res.status(200).json({
          message: 'answer created',
          response
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'create answer failed',
          err
        })  
      })

    })
    .catch(err => {
      res.status(400).json({
        message: 'create answer failed',
        err
      })
    })
  },
  upVote: function (req, res) {
    Answer.findByIdAndUpdate(req.params.id, {
      $push: {
        upvote: req.user.id
      }
    })
    .then(response => {
      res.status(200).json({
        message: 'upvote success',
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'cannot upvote',
        err
      })
    })
  },
  downVote: function (req, res) {
    Answer.findByIdAndUpdate(req.params.id, {
      $push: {
        downvote: req.user.id
      }
    })
    .then(response => {
      res.status(200).json({
        message: 'downvote success',
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'cannot downvote',
        err
      })
    })
  },
  deleteAnswer: function (req, res) {
    Answer.deleteOne({
      _id: req.params.id
    })
    .then(response => {
      res.status(200).json({
        message: "success deleting data"
      })
    })
    .catch(err => {
      res.status(400).json({
        message: "failed deleting data"
      })
    })
  }
}
