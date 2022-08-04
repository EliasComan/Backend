const mongoose = require('mongoose')
const config = require('../../utils/config')

mongoose.connect(config.atlas.url,{
 useNewUrlParser:true,
 useUnifiedTopology:true
})

const chatSchema = new mongoose.Schema({
    email:String,
    tipo:String,
    msg:String, 
},
{
    timestamps:true
}
)

module.exports =mongoose.model("Chat",chatSchema)


