const express = require('express')
const router = express.Router()
const {
  createAnswer,
  upVote,
  downVote,
  deleteAnswer
} = require('../controllers/answer.controller')
const {
  loginCheck
} = require('../middlewares/auth')

router
  .post('/create/:id', loginCheck, createAnswer)
  .put('/upvote/:id', loginCheck, upVote)
  .put('/downvote/:id', loginCheck, downVote)
  .delete('/delete/:id', loginCheck, deleteAnswer)


  module.exports = router