const mongoose = require('mongoose')
const config = require('../../utils/config')

mongoose.connect(config.atlas.url,{
 useNewUrlParser:true,
 useUnifiedTopology:true
})

const cartSchema = new mongoose.Schema({
    id:String,
    products:{
        id:String,
        name:String,
        qnty:Number,
        img:String
    }

},
{
    timestamps:true
}
)

module.exports = mongoose.model("cart",cartSchema)

