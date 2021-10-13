//express
import express from 'express';
//dotenv
import dotenv from 'dotenv';
//path
import path from "path";
const __dirname = path.resolve();
//db connection
import connectDB from './config/db.js';
//middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
//Routes
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from "./routes/uploadRoutes.js";
//Cors
import cors from "cors";

dotenv.config();

connectDB();
const app = express();

//middlewares (statics)
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/upload", uploadRoutes);
app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));


if (process.env.NODE_ENV === "production") {
    console.log(__dirname);
    app.use(express.static(path.join(__dirname, "client/build")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client","build","index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(
    `Server is up and running on port ${PORT}`
  )
);
