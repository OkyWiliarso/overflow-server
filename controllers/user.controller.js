require('dotenv').config()
const key = process.env.key
const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  signUp: (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      newUser: true
    })
    user.save()
    .then(response => {
      res.status(200).json({
        message: 'user created',
        response
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'user creation failed, please try again',
        err
      })
    })
  },
  login: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(response => {
      if(bcrypt.compareSync(req.body.password, response.password)) {
        let token = jwt.sign({id: response._id, email: response.email}, `${key}`)
        res.status(200).json({
          message: 'login succeed',
          token: token,
          id: response._id
        })
      } else {
        res.status(404).json({
          message: 'wrong password'
        })
      }
    })
    .catch(err => {
      res.status(404).json({
        message: 'account did not exist'
      })
    })
  },
  fblogin: (req, res) => {
    User.findOne({
      email: req.body.email
    })
    .then(response => {
      if(bcrypt.compareSync(req.body.password, response.password)) {
        let token = jwt.sign({id: response._id, email: response.email, role: response.role}, `${key}`)
        res.status(200).json({
          message: 'Login Success',
          token: token,
          id: response._id
        })
      } else {
        res.status(404).json({
          message: 'Wrong Password'
        })
      }
    })
    .catch(err => {
      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      })
      user.save()
      .then(response => {
        let token = jwt.sign({id: response._id, email: response.email}, `${key}`)
        res.status(200).json({
          message: 'Login Success',
          token: token,
          id: response._id
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "user creation failed, please try again",
          err
        })
      })
    })
  }
}