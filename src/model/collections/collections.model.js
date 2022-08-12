const config = require( '../../utils/config.js')
const mongoose = require( 'mongoose')

mongoose.connect(config.atlas.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
const collectionsScheman = new mongoose.Schema({
        name:{type:String,require:true},
        description:{type:String, require:true},
        thumbnail:{type:String, require:true},
        coverPage:{type:String, require:true},
        price:{type:Number, require: true}
    })


       
 

module.exports = mongoose.model('collectionsEcommerce',collectionsScheman);