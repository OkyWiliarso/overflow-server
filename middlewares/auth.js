require('dotenv').config()
const jwt = require('jsonwebtoken')
const key = process.env.key

module.exports = {
  loginCheck: (req, res, next) => {
    jwt.verify(req.headers.token, `${key}`, function(err, decoded){
      if(decoded){
        req.user = decoded
        next()
      } else {
        res.status(403).json({
          message: 'invalid token'
        })
      }
    })
  }
}