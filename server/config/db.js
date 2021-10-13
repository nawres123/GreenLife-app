import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const DB_URI = 'mongodb+srv://Nawres:1234@cluster0.fhdtv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;