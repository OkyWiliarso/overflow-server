const express = require('express')
const router = express.Router()
const {
  createQuestion,
  getQuestion,
  upVote,
  downVote,
  deleteQuestion,
  getById
} = require('../controllers/question.controller')
const {
  loginCheck
} = require('../middlewares/auth')

router
  .post('/create', loginCheck, createQuestion)
  .get('/list', getQuestion)
  .get('/:id', getById)
  .put('/upvote/:id', loginCheck, upVote)
  .put('/downvote/:id', loginCheck, downVote)
  .delete('/delete/:id', loginCheck, deleteQuestion)


  module.exports = router