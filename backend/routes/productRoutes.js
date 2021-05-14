import { Router } from 'express'
import asyncHandler from 'express-async-handler'
const router = Router()
import Product from '../models/productModel.js'

// fetch all products
// @route GET /api/products
// pubblic route
router.get('/',  asyncHandler( async (req, res) => {
    const products = await Product.find({})

    res.json(products)
}))

// fetch one product
// @route GET /api/products/:id
// pubblic route
router.get('/:id', asyncHandler( async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    
    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error(`Product not found`)
    }
}))

export default router