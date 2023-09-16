import express from 'express';
import { orderController } from '../controllers/order.controller';

export const router = express.Router();

router.get('/:orderId', orderController.getOrderById);
router.get('/', orderController.getFilteredOrders);

router.post('/', orderController.createOrder);

router.delete('/:orderId', orderController.deleteOrder);
