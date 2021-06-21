import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

export const getProducts = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 2
    const page = Number(req.query.page) || 1

    const sortBy = req.query.sortBy || 'popularity'
    const sortDirection = req.query.sortDirection || -1

    const sort = {
        [sortBy]: sortDirection
    }

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: "i"
        } 
    } : {} 

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .sort({ ...sort })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
        

    res.json({products, page, pageCount: Math.ceil(count / pageSize), totalProductsCount: count, pageSize})
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