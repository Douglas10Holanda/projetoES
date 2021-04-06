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
    try {
        const product = await Product.findById(req.params.productId)

        return res.send({ product })
    } catch (err) {
        return res.status(400).send({ error: 'Error loading project' })
    }
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
    const {marca, quantidade, valor, desconto} = req.body

    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, {
            marca,
	        quantidade,
	        valor,
	        desconto
        }, {new: true} )


        return res.send({ product })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error editing project' })
    }
})

//Deletar produto
router.delete('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId)

        return res.send()
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting project' })
    }
})

module.exports = app => app.use('/product', router)