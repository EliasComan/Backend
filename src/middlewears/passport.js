const users = require('../model/users/users.dao')
const Jwt = require('jsonwebtoken')
const config = require('../utils/config')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const strategy = require('passport-facebook')
const dotenv = require('dotenv')

dotenv.config()
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
const FACEBOOK_SECRET_KEY = `${process.env.FACEBOOK_SECRET_KEY}`

passport.use('facebook',
  new strategy.Strategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_SECRET_KEY,
      callbackURL: '/session/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos'],
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile)
    },
  ),
)
passport.use('login', new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const getUser = await users.getUser(email)

    if (getUser) {
      bcrypt.compare(password, getUser.password, (err, result) => {
       if (result) {
        const accestoken = Jwt.sign({getUser}, config.privatekey.PRIVATE_KEY, {
          expiresIn: '24h',
        })
        return done(null, {msg:'Usuario validado', token: accestoken})
       } else {
        return done(null,false, {msg:'mail o contraseña invalidos'})
      } 
      })
    } else {
      return done(null, false ,{message:'email no encontrado'})
    }
  } catch (error) {
    res.status(400).json({ msg: 'Error de conexion' })
  }
}))

passport.use('signup', new localStrategy({
  usernameField:'email',
  passwordField:'password'
}, async (email, password, done) => {
  try {
    await users.getUser(email).then (
     async user => {
        if (user) {
          return done(null,false, {message:'Usuario ya registrado'})
        }
        else{
          const salt= await bcrypt.genSalt(10)
          const hash = await bcrypt.hash(password, salt)
           await users.registerUser({email, password:hash}).then(async ()=> {
            const accessToken = await Jwt.sign(email, config.privatekey.PRIVATE_KEY,{
              expiresIn:'24h'
            })
            return done(null, {message:'DONE', token: accessToken})
           })
        }
      }
    )
  } catch (error) {
    return done(null,{ msg: 'Error de conexion' })
    
  }
}))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})
