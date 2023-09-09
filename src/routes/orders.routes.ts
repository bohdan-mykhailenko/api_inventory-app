import express from 'express';
import OrderController from '../controllers/order.controller';

const router = express.Router();

// Get all orders
router.get('/orders', OrderController.getAllOrders);

// Post a new order
router.post('/orders', OrderController.createOrder);

// Delete an order
router.delete('/orders/:id', OrderController.deleteOrder);

export default router;
