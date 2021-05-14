import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import { notFound, errorHandler } from './middleware/errorMidd.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
    res.send('Mern-store API welcome')
})

app.use('/api/products', productRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(` server run in ${process.env.NODE_ENV} mode on ${PORT}`.black.bold.bgCyan))