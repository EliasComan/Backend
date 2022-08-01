const config = require( '../../utils/config.js')
const mongoose = require( 'mongoose')

mongoose.connect(config.atlas.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


class usersModel {
    constructor(colection, schema){
    this.colection = mongoose.model(colection,schema)
}
   async registerUser  (user){

        return await this.colection.insertMany(user)
    }
  async  getUser (email){
        return await this.colection.findOne({email:email})
    }
}
module.exports = usersModel