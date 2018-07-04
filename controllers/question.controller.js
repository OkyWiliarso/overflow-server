const Question = require('../models/question.model')

module.exports = {
  createQuestion: function (req, res) {
    let question = new Question ({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      answers: [],
      upvote: [],
      downvote: []
    })

    question.save()
    .then(response => {
      res.status(200).json({
        message: 'question created',
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'create question failed',
        err
      })
    })
  },
  getQuestion: function (req, res) {
    Question.find()
    .populate('user')
    .populate('answers')
    .then(response => {
      res.status(200).json({
        message: 'get question success',
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'cannot get question',
        err
      })
    })
  },
  getById: function (req, res) {
    Question.findById(req.params.id)
    .populate('user')
    .populate('answers')
    .then(response => {
      res.status(200).json({
        message: 'get question success',
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'cannot get question',
        err
      })
    })
  },
  upVote: function (req, res) {
    Question.findByIdAndUpdate(req.params.id, {
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
    Question.findByIdAndUpdate(req.params.id, {
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
  deleteQuestion: function (req, res) {
    Question.deleteOne({
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