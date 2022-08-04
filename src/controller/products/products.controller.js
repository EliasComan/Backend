const express = require( 'express')
const path = require( 'path')

const routerproducts = express.Router()

routerproducts.get('/:id', (req, res) => {
  console.log(req.params.id)
  res.send(req.params.id)
})
routerproducts.post('/', (req, res) => {
  try {
    products.save(req.body).then(() => {
      res.status(200).send({ done: true })
    })
  } catch (error) {
    res.status(500).send('Error')
  }
})

module.exports = routerproducts
