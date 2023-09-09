import { Request, Response } from 'express';
import OrderService from '../services/order.service';

class OrderController {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrderService.getAllOrders();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createOrder(req: Request, res: Response) {
    const orderData = req.body;
    try {
      const newOrder = await OrderService.createOrder(orderData);
      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await OrderService.deleteOrder(Number(id));
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new OrderController();
