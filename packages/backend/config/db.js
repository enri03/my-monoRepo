import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
  try {
    console.log('dotenv',dotenv)
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
