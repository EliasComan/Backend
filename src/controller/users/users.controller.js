const express = require('express')
const path = require('path')
const routerUser = express.Router()
const passport = require('passport')

routerUser.get('/init', (req, res) => {
  res.render(path.resolve('./src/views/layouts/sessionInit.ejs'), { error: false })
})


routerUser.post('/init', passport.authenticate('login',{
  successRedirect:'/',
  failureRedirect:'/session/init'
}))

routerUser.get('/register', async (req, res) => {
  res.render(path.resolve('./src/views/layouts/register.ejs'))
})


routerUser.post('/register', passport.authenticate('signup',{
  successRedirect:'/',
  failureRedirect:'/session/register',
  
}))


routerUser.get('/login/facebook', passport.authenticate('facebook'))

routerUser.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
    successRedirect: '/',
    authType: 'reauthenticate',
  }),
)
routerUser.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
module.exports = routerUser
