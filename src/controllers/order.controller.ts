import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import {
  sendInternalServerErrorResponse,
  sendBadRequestResponse,
} from '../utils/sendErrorResponces';
import { DatabaseOperationError } from './errors/APIErrors';
import { isValidId } from '../helpers/isValidId';

class OrderController {
  async getOrderById(req: Request, res: Response) {
    const orderId = parseInt(req.params.orderId, 10);
    const queryParam = req.params.orderId;

    console.log(queryParam);

    if (!isValidId(orderId)) {
      return sendBadRequestResponse(res, 'Invalid order ID type');
    }

    try {
      const order = await orderService.getOrderById(orderId);

      return res.status(200).send(order);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();

      return res.status(200).json(orders);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async createOrder(req: Request, res: Response) {
    const orderData = req.body;

    try {
      const newOrder = await orderService.createOrder(orderData);

      return res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async deleteOrder(req: Request, res: Response) {
    const orderId = parseInt(req.params.orderId, 10);

    if (!isValidId(orderId)) {
      return sendBadRequestResponse(res, 'Invalid order ID type');
    }

    try {
      await orderService.deleteOrder(orderId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }
}

export const orderController = Object.freeze(new OrderController());
