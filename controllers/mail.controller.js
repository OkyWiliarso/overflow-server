require('dotenv').config()
const nodemailer = require("nodemailer")
const User = require('../models/user.model')

const user = process.env.email
const pass = process.env.pass

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${user}`,
    pass: `${pass}`
  }
});

module.exports = {
  sendNotification: (req, res) => {
    User.find({
      newUser: true
    })
      .then(response => {
        response.forEach(iniuser => {
          let mailOptions = {
            from: `${user}`,
            to: `${iniuser.email}`,
            subject: 'Thank you!',
            text: 'Thank you for signing up at hacktiv-overflow.okywiliarso.me !'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })

          User.findByIdAndUpdate({
            _id: iniuser.id
          }, {
            newUser: false
          })
            .then(response => {
              res.status(200).send({
                message: 'Update post success',
                data: response
              })
            })
            .catch(err => {
              res.status(400).send({
                message: 'Update post failed',
                err: err.message
              })
            })
        })
      })
      .catch(err => {
        res.status(400).send({
          message: 'Query send welcome message failed',
          err: err.message
        })
      })
  }
}