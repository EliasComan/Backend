const productsModel = require('./collections.model.js')

class collectionsDao extends productsModel {
  constructor() {
    super('collectionsEcommerce',{
        name:{type:String,require:true},
        description:{type:String, require:true},
        thumbnail:{type:String, require:true},
        coverPage:{type:String, require:true},
    })
  }
  
}
const collections = new collectionsDao()
module.exports = collections
