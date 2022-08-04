const adminController = require("./src/controller/admin/admin.controller.js");
const bodyParser = require("body-parser");
const collections = require("./src/model/collections/colecctions.dao.js");
const connectMongo = require("connect-mongo");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const express = require("express");
const passport = require("passport");
const path = require("path");
const productsController = require("./src/controller/products/products.controller.js");
const session = require("express-session");
const cors = require("cors");
const routerUser = require("./src/controller/users/users.controller.js");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
 require('./src/middlewears/passport')
const {handleSockets} = require('./src/middlewears/sockets')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')

/*-----------------------MIDDLEWEARS -----------------*/
dotenv.config();
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const MongoStore = connectMongo.create({
  mongoUrl: `mongodb+srv://coderhouse:${process.env.PASSWORD_MONGO}@cluster0.wikgb.mongodb.net/sessions?retryWrites=true&w=majority `,
  ttl: 15000000,
});
app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    store: MongoStore,
    secret: "123456789!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use((req,res, next) => {
 app.locals.singUpMessage = req.flash('singUpMessage')
 app.locals.logInMessage = req.flash('logInMessage')
 next()
})
/*----------------------ENGINE -----------------*/
app.set("views", path.resolve(path.join("src", "views")));
app.set("view engine", "ejs");
app.set('view engine', 'hbs')
app.engine('.hbs', handlebars.engine({
  defaultLayout: 'chat',
  layoutsDir: './src/views',
  extname: '.hbs'
}))
/*----------------------ROUTES -----------------*/
app.use("/products", productsController);
app.use("/admin", adminController);
app.use("/session", routerUser);

app.get("/", (req, res) => {
  let user = false;
  req.isAuthenticated() ? (user = true) : (user = false);
  collections.getAll().then((response) => {
    const collectionsDatabase = response;
    res.render(path.resolve("./src/views/main.ejs"), {  user, collectionsDatabase });
  });
});
app.get('/chat',async (req, res) => {
  if(req.isAuthenticated()){
    await handleSockets(io, req.user.email)
    res.render("./chat")}
    else{
      res.send({msg:'Necesitas loguearte para entrar aqui'})
    }
})

/*-----------------------WEBSOCKETS -----------------*/

const server = httpServer.listen(
  process.env.PORT || process.argv[2] || 8080,
  () => {
    console.log("Server up");
  }
);
server.on("error", (error) => {
  console.log(error);
});
