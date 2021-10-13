import express from 'express';
const Router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivred
} from '../controlers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

Router.route('/').post(protect, addOrderItems)
    .get(protect, admin, getOrders);
Router.route('/myorders').get(protect , getMyOrders)
Router.route('/:id').get(protect, getOrderById);
Router.route('/:id/pay').put(protect, updateOrderToPaid);
Router.route('/:id/deliver').put(protect , admin , updateOrderToDelivred) 

export default Router;