const express = require('express')
const path = require('path')
const routerUser = express.Router()
const passport = require('passport')

routerUser.get('/init', (req, res) => {
  res.render(path.join('layouts', 'sessionInit'), { error: false })
})


routerUser.post('/init', passport.authenticate('login',{
  successRedirect:'/',
  failureRedirect:'/session/init'
}))

routerUser.get('/register', async (req, res) => {
  res.render(path.join('layouts', 'register.ejs'))
})


routerUser.post('/register', passport.authenticate('signup',{
  successRedirect:'/',
  failureRedirect:'/session/register',
  
}))
module.exports = routerUser
