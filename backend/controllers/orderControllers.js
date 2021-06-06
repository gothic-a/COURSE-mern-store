import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const createOrder = asyncHandler(async (req, res) => {
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        totalPrice, 
        taxPrice, 
        shippingPrice, 
        totalOrderPrice 
    } = req.body

    if(orderItems && orderItems.length === 0 ) {
        res.status(400)
        throw new Error('no order items')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems, 
            shippingAddress, 
            paymentMethod, 
            totalPrice, 
            taxPrice, 
            shippingPrice, 
            totalOrderPrice 
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    
    const order = await Order.findById(req.params.id).populate(
        'user', 
        'name email'
    )

    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
})

const updateOrderToPaid = asyncHandler(async (req, res) => {

    try {
        const order = await Order.findById(req.params.id)

        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.status(201)
        res.json(updatedOrder)

    } catch(error) {
        res.status(404)
        throw new Error(error.message)
    }
})

const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })

    res.json(orders)
})

export {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders
}

