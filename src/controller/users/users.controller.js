const express = require('express')
const path = require('path')
const users = require('../../model/users/users.dao')
const routerUser = express.Router()
const Jwt = require('jsonwebtoken')
const config = require('../../utils/config')
const bcrypt = require('bcryptjs')

routerUser.get('/init', (req, res) => {
  res.render(path.join('layouts', 'sessionInit'), { error: false })
})

routerUser.post('/init', async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  }
  try {
    const getUser = await users.getUser(data.email)

    if (getUser) {
      console.log(getUser)
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(data.password, salt)
      console.log('hash', hash)
      console.log('password', getUser.password)
      bcrypt.compare(getUser.password, hash, (err, result) => {
        console.log(result)
      })
    } else {
    }
  } catch (error) {
    res.status(400).json({ msg: 'Error de conexion' })
  }
})
routerUser.get('/register', async (req, res) => {
  res.render(path.join('layouts', 'register.ejs'))
})

routerUser.post('/register', async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(data.password, salt)
  data.password = hash
  try {
    await users.getUser(data.email).then((response) => {
      const userRegistered = response
      if (userRegistered) {
        res.send({ msg: 'Usuario ya registrado' })
      } else {
        users.registerUser(data).then(async () => {
          const accestoken = Jwt.sign(data, config.privatekey.PRIVATE_KEY, {
            expiresIn: '24h',
          })
          res.json({ msg: 'DONE', token: accestoken })
        })
      }
    })
  } catch (error) {
    res.status(400).json({ msg: error })
  }
})

module.exports = routerUser
