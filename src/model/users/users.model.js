const config = require('../../utils/config.js')
const mongoose = require('mongoose')

mongoose.connect(config.atlas.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        id: String,
        name: String,
        qnty: Number,
        img: String,
        price:Number
    }]
})


module.exports = mongoose.model('users', userSchema)