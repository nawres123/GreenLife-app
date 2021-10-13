import express from 'express';
const Router = express.Router();
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
} from '../controlers/productController.js';

import { admin } from "../middleware/authMiddleware.js";

Router.route('/')
    .get(getProducts)
    .post(createProduct);

Router.route('/:id').get(getProductById);

Router.route("/:id")
    .put(admin, updateProduct)
    .delete(admin, deleteProduct);

export default Router;