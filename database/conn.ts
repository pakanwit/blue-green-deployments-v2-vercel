import mongoose from 'mongoose';

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection.readyState == 1) {
      console.log(`MongoDB Connected: ${connection.host}`);
    }

  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectMongo;