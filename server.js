const adminController = require('./src/controller/admin/admin.controller.js')
const bodyParser = require('body-parser')
const collections = require('./src/model/collections/colecctions.dao.js')
const connectMongo = require('connect-mongo')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const passport = require('passport')
const path = require('path')
const productsController = require('./src/controller/products/products.controller.js')
const session = require('express-session')
const cors = require('cors')
const routerUser = require('./src/controller/users/users.controller.js')
const strategys = require('./src/middlewears/passport')
/*-----------------------MIDDLEWEARS -----------------*/
dotenv.config()
const app = express()
const MongoStore = connectMongo.create({
  mongoUrl: `mongodb+srv://coderhouse:${process.env.PASSWORD_MONGO}@cluster0.wikgb.mongodb.net/sessions?retryWrites=true&w=majority `,
  ttl: 15000000,
})
app.use(express.static(path.resolve(__dirname,'public')))

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
  )
app.use(cookieParser())
app.use(
  session({
    store: MongoStore,
    secret: '123456789!@#$%^&*()',
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(passport.initialize())
app.use(passport.session())
app.use(cors())



/*----------------------ENGINE -----------------*/
app.set('views', path.resolve(path.join('src','views')))
app.set('view engine', 'ejs')


/*----------------------ROUTES -----------------*/
app.use('/products', productsController)
app.use('/admin', adminController)
app.use('/session', routerUser)

app.get('/', (req, res) => {
  let collectionsDatabase ;
  let user = false;
  req.isAuthenticated() ? user = true  : user=false;
  collections.getAll().then(res  => {
  collectionsDatabase = res})
  .finally( () => {
     res.render('main',{user:user, collectionsDatabase})
    })
})




const server = app.listen((process.env.PORT) || (process.argv[2] || 8080), () => {
  console.log('Server up')
})
server.on('error', (error) => {
  console.log(error)
})
