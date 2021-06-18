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

export const createProductReview = asyncHandler(async (req, res) => {
    const { raiting, comment } = req.body
    const { _id, name} = req.user

    const product = await Product.findById(req.params.id)

    if(product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === user)
        
        if(alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        } 

        const review = { 
            name, 
            raiting: Number(raiting), 
            comment, 
            user: _id 
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length
        product.raiting = product.reviews.reduce((acc, r) => r.raiting + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({message: 'Review added'})
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})