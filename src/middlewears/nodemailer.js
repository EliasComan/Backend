const {createTransport} = require('nodemailer')


const TEST_EMAIL = 'alena88@ethereal.email';
const PASS_EMAIL = '231w21aNfrntCQ6Yv8';
const USER_GMAIL = 'comanelias5@gmail.com'
const PASS_GMAIL ='puviydbskzmdxebo'
module.exports.transporter =  createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: USER_GMAIL,
        pass: PASS_GMAIL 
    }
})


