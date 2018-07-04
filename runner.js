const cron = require('cron')
const axios = require('axios')

var sendEmail = new cron.CronJob({
  cronTime: '* * * * *',
  onTick: function() {
    axios.post('http://localhost:3000/users/email')
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error(err)
      })
  },
  start: false,
  timeZone: 'Asia/Jakarta'
})

sendEmail.start() 
 
console.log('sendEmail status', sendEmail.running) 