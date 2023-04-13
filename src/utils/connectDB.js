import mongoose from 'mongoose'

//SERVERLESS CONNECTION POOL
const connection = {}

const connectDB = async () => {
  if (connection.isConnected == 1) {
    console.log("preconnected");
    return null
  } else {

    const db = await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    connection.isConnected = db.connections[0].readyState
    console.log("🚀 Mongodb 🚀");
  }
}

export default connectDB