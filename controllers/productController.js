const express = require('express')
const authMiddleware = require('../middlewares/auth')

const Product = require('../models/product')

const router = express.Router()

router.use(authMiddleware)

//Listar todos produtos
router.get('/', async (req, res) => {
    try {
        const product = await Product.find();

        return res.send({ product })

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new project' })
    }
})

//Procurar por um produto
router.get('/:productId', async (req, res) => {
    res.send({ user: req.userId })
})

//Cadastrar produto
router.post('/cadastrar', async (req, res) => {
    try {
        const product = await Product.create(req.body)

        return res.send({ product })

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new project' })
    }
})

//Editar produto
router.put('/:productId', async (req, res) => {
    res.send({ user: req.userId })
})

router.delete('/:productId', async (req, res) => {
    res.send({ user: req.userId })
})

module.exports = app => app.use('/product', router)