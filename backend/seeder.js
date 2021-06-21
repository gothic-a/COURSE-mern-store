import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        // const createdUsers = await User.insertMany(users)
        const { _id: adminUser } = await User.findOne({isAdmin: true})
        console.log(adminUser)

        await Product.deleteMany()

        const sampleProducts = products.map(p => {
            return { ...p, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('data imported!'.bold.black.bgGreen)
        process.exit()
    } catch (err) {
        console.error(`Error: ${err}`.bold.black.bgRed)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('data removed!'.bold.black.bgRed)
        process.exit()
    } catch (err) {
        console.error(`Error: ${err}`.bold.black.bgRed)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}