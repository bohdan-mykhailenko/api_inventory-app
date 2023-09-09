import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import { sendInternalServerErrorResponse } from '../errors/internalServerError';

class OrderController {
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();

      return res.status(200).json(orders);
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }

  async createOrder(req: Request, res: Response) {
    const orderData = req.body;

    try {
      const newOrder = await orderService.createOrder(orderData);

      return res.status(201).json(newOrder);
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await orderService.deleteOrder(Number(id));

      return res.status(204).send();
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }
}

export default new OrderController();
