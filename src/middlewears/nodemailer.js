const {createTransport} = require('nodemailer')
const config = require('../utils/config')


module.exports.transporter =  createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: config.nodemailer.user,
        pass: config.nodemailer.pass 
    }
})


