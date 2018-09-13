const express = require('express')
const bodyParser = require('body-parser');
const flash = require('connect-flash')
const session = require('express-session')
const mysql = require('mysql')
const path = require('path');
const Sequelize = require('sequelize')
const app = express();
const routes = require('./routes/index')


// mysql db connect
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kaeyz',
    password: '',
    database: 'authtest_db'
})

connection.connect();
global.db = connection;

// // sequelize-mysql connect
// const sequelize = new Sequelize('authtest_db', 'kaeyz', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// })
// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('connection succesful');
//     })
//     .catch(err => {
//         console.log(err);
//     })
    
// all enviroments
const port = 8070
//app.use('views', __dirname + '/views')
app.set("view engine", 'ejs')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(flash())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

// // locals setup
// app.use((req, res, next) => {
//      res.locals.curentUser = req.user
//      res.locals.success = req.flash('success')
//      res.locals.error = req.flash('error')
//      next()
// })

app.use('/', routes)

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
