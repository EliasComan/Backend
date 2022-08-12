const config = require( '../../utils/config.js')
const mongoose = require( 'mongoose')

mongoose.connect(config.atlas.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const collectionsScheman = new mongoose.Schema({
        name:String,
        description:String,
        image:String,
        price:Number
    })


       
 

module.exports = mongoose.model('collectionsEcommerce',collectionsScheman);