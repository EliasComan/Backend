const express = require( 'express')
const path = require( 'path')

const routerproducts = express.Router()

routerproducts.get('/', (req, res) => {
  res.render(path.join('layouts', 'sessionInit'))
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
