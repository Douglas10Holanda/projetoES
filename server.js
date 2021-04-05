if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()    
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => usuarios.find(user => user.email === email),
    id => usuarios.find(user => user.id === id)
)

// Armazenando Usuários em array
// Armazenado produtos em array
const usuarios = []
const produtos = []
// Devemos conectar ao banco de dados

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// ROTA HOME
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

// ROTA LOGIN
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// ROTA REGISTRO
app.get('/registro', checkNotAuthenticated, (req, res) => {
    res.render('registro.ejs')
})

app.post('/registro', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        usuarios.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch (error) {
        res.redirect('/registro')        
    }
    console.log(usuarios)
})

// ROTA CADASTRAR NOVO PRODUTO
app.get('/cadastrarProd', (req, res) => {
    res.render('cadastrarProd.ejs')
})

app.post('/cadastrarProd', async (req, res) => {
    try {
        produtos.push({
            name: req.body.name,
            marca: req.body.marca,
            quantidade: req.body.quantidade,
            valor: req.body.valor
        })
        res.redirect('/')
    } catch (error) {
        res.redirect('/cadastrarProd')        
    }
    console.log(produtos)
})

// ROTA EDITAR PRODUTO
app.get('/editarProd', (req, res) => {
    res.render('editarProd.ejs')
})

// LogOut
app.delete('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/login')
})

// Voltar pra index
app.delete('/voltar', (req, res) =>{
    res.redirect('/')
})

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

app.listen(3000)