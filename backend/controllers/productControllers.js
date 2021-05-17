import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

export const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id) 

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error(`Product not found`)
    }
})