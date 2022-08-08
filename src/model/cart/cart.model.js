const mongoose = require('mongoose')
const config = require('../../utils/config')

mongoose.connect(config.atlas.url,{
 useNewUrlParser:true,
 useUnifiedTopology:true
})

const cartSchema = new mongoose.Schema({
    name:String,
    id:String,
    qnty:Number,

},
{
    timestamps:true
}
)

module.exports =mongoose.model("cart",cartSchema)

