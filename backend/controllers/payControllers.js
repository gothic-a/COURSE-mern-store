import Order from '../models/orderModel.js'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'
import toSignature from '../utils/toSignature.js'
import base64_encode from '../utils/base64_encode.js'

dotenv.config()

const getPayPalConfig = (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
}

const getLiqPayConfig = (req, res) => {
    const { order_id, currency, amount, result_url, description } = req.body

    const json_string = JSON.stringify({
        public_key: process.env.LIQPAY_PUBLIC_KEY,
        version: "3",
        action: 'pay',
        amount,
        currency,
        description,
        order_id,
        result_url,
        server_url: "http://localhost:5001/api/pay/liqpay/status/callback"
    })


    const data = base64_encode(json_string)

    const sign_string = `${process.env.LIQPAY_PRIVATE_KEY}${data}${process.env.LIQPAY_PRIVATE_KEY}`
    const signature = toSignature(sign_string)
    
    res.json({
        data,
        signature
    })
}

const getLiqPayPaymentStatus = (req, res) => {
    
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')

    console.log(req.body)
}

export {
    getPayPalConfig,
    getLiqPayConfig,
    getLiqPayPaymentStatus,
}

