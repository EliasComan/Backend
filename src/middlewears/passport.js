const users = require("../model/users/users.dao");
const Jwt = require("jsonwebtoken");
const config = require("../utils/config");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const strategy = require("passport-facebook");
const dotenv = require("dotenv");
const { transporter } = require("../middlewears/nodemailer");

dotenv.config();
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_SECRET_KEY = `${process.env.FACEBOOK_SECRET_KEY}`;

passport.use(
  "facebook",
  new strategy.Strategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_SECRET_KEY,
      callbackURL: "/session/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos"],
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback:true
    },
    async (req,email, password, done) => {
      try {
        const getUser = await users.getUser(email);

        if (getUser) {
          bcrypt.compare(password, getUser.password, (err, result) => {
            if (result) {
              const accestoken = Jwt.sign(
                { getUser },
                config.privatekey.PRIVATE_KEY,
                {
                  expiresIn: "24h",
                }
              );
              return done(null, { message: "Usuario validado", token: accestoken, email });
            } else {
              return done(null, false, req.flash('logInMessage','Email o contraseña invalidos'));
            }
          });
        } else {
          return done(null, false,req.flash( 'logInMessage',"email no encontrado" ));
        }
      } catch (error) {
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback:true
    },
    async (req,email, password, done) => {
      try {
        await users.getUser(email).then(async (user) => {
          if (user) {
            return done(null, false, req.flash('singUpMessage', "Usuario ya registrado" ));
          } else {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await users
              .registerUser({ email, password: hash })
              .then(async () => {
                await transporter.sendMail({
                  from: "NodeJSAPP <noreply@example.com>",
                  to: `"Dear Developer!👩‍💻👨‍💻" <${email}>`,
                  subject: "Registro el aplicacion nodeJS",
                  text: "Hello Coders!",
                  html: `<div>
                    <h1>Gracias por registrarte en la app!</h1>
                    <p>Aqui te va un meme para descrontracturar</p>
                  </div> 
                  <div>
                    <img src="https://images7.memedroid.com/images/UPLOADED724/5b3628ba99ca0.jpeg"/>
                  </div>`,
                });
                const accessToken = await Jwt.sign(
                  email,
                  config.privatekey.PRIVATE_KEY,
                  {
                    expiresIn: "24h",
                  }
                );
                return done(null, { message: "DONE", token: accessToken, email });
              });
          }
        });
      } catch (error) {
        return done(null, { msg: "Error de conexion" });
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});
