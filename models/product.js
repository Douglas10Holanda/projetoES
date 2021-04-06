const mongoose = require('../database/db')
const bcrypt = require('bcryptjs')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    marca: {
        type: String,
        require: true,
    },
    quantidade:{
        type: Number,
        require: true,
    },
    valor: {
        type: Number,
        require: true,
    },
    desconto:{
        type: Number,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product