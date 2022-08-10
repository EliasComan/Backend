const express = require('express')
const path = require('path')
const userModel = require('../../model/users/users.model')
const productsModel = require('../../model/collections/colecctions.dao')


const cartRouter = express.Router()

cartRouter.get('/',async (req, res, next)=> {
     if(req.isAuthenticated()){
        const getCart = await userModel.findById(req.user.id)
        if (getCart.cart[0] === undefined) {
           res.render(path.resolve('./src/views/layouts/cart.ejs'),{user:req.user, cart:false})
        }else{
            res.render(path.resolve('./src/views/layouts/cart.ejs'),{user:req.user, cart:getCart.cart})
        }
    }else{
        res.status(400).json('Necesitas estar logeado para acceder')
    }
})
cartRouter.post('/', async (req, res, next ) => {
   if (req.isAuthenticated()) {
    try {
        const idProduct = req.body.id
        const qnty= req.body.qnty
        const {cart}= await userModel.findById(req.user.id)
        const product = await productsModel.getByid(idProduct)
        const {id, name,thumbnail} = product[0]
        await userModel.updateMany({_id:req.user.id},{cart:[...cart,{
            _id:id,
            name:name,
            img: thumbnail,
            qnty:qnty
        }]})
        .then(res => console.log(res))
        res.json({msg:'Done'})
    } catch (error) {
        res.status(400).send(error)
    }
   } else {
    res.json('No tienes autorizacion para hacer esto')
    
   }
})


module.exports = cartRouter