const {createTransport} = require('nodemailer')


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


