var express = require('express')
var bodyParser = require('body-parser')

require('./database/db')


var app = express()

app.set ('view engine', 'ejs')

app.get('/registro', function (req, res) {
    res.render("../views/registro")
});

app.get('/login', function (req, res) {
    res.render("../views/login")
});

app.get('/home', function (req, res) {
    res.render("../views/home")
});

app.get('/cadastrarProd', function (req, res) {
    res.render("../views/cadastrarProd")
});

app.get('/editarProd', function (req, res) {
    res.render("../views/editarProd")
});

app.get('/editarProd', function (req, res) {
    res.render("../views/editarProd")
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./controllers/authController')(app)
require('./controllers/productController')(app)

app.listen(3000)