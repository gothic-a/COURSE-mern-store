import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import crypto from 'crypto'
import sha1 from 'sha1'

import productsRoutes from './routes/productsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import { notFound, errorHandler } from './middleware/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Mern-store API welcome')
})

app.use('/api/products', productsRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => 
    res.send(process.env.PAYPAL_CLIENT_ID)
)

app.post('/api/config/liqpay', (req, res) => {
    const { order_id, currency, amount, result_url } = req.body

    const json_string = JSON.stringify({
        public_key: process.env.LIQPAY_PUBLIC_KEY,
        version: "3",
        action: 'pay',
        amount,
        currency,
        description: 'test',
        order_id,
        result_url,
    })

    const base64_encode = (string) => {
        const buff = new Buffer(string)
        const encoded = buff.toString('base64')

        return encoded
    }

    const strToSign = (string) => {
        const sha1 = crypto.createHash('sha1')
        sha1.update(string)

        return sha1.digest('base64')
    }

    const data = base64_encode(json_string)

    const sign_string = `${process.env.LIQPAY_PRIVATE_KEY}${data}${process.env.LIQPAY_PRIVATE_KEY}`
    const signature = strToSign(sign_string)
    console.log(json_string)
    console.log(signature)

    res.json({
        data,
        signature
    })
})

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(` server run in ${process.env.NODE_ENV} mode on ${PORT}`.black.bold.bgCyan))