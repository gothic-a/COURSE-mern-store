import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        })

        console.log(` mongoDB connected: ${conn.connection.host}`.black.bold.bgGreen)
    } catch(err) {
        console.error(`error ${err}`.black.bold.bgRed)
        process.exit(1)
    }
}

export default connectDB