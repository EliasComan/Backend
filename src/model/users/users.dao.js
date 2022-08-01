const usersModel = require('./users.model.js')

class usersDao extends usersModel{
    constructor () {
        super('users',{
            email:{type:String, required:true},
            password:{type:String, required:true}
        })
    }
}
const userDao = new usersDao()
module.exports = userDao