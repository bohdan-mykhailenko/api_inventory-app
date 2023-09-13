import { DatabaseOperationError, NotFoundError } from '../errors/APIErrors';
import { Order } from '../models/orders.model';

class OrderService {
  async getOrderById(orderId: number) {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new NotFoundError(`Order with ID ${orderId} not found`);
      }

      return order;
    } catch (error) {
      throw new DatabaseOperationError('Error while fetching order');
    }
  }

  async getAllOrders() {
    try {
      const orders = await Order.findAll();

      return orders;
    } catch (error) {
      throw new DatabaseOperationError('Error while fetching orders');
    }
  }

  async createOrder(orderData: Partial<Order>) {
    try {
      const order = await Order.create({
        ...orderData,
      });

      return order;
    } catch (error) {
      throw new DatabaseOperationError('Error while creating an order');
    }
  }

  async deleteOrder(orderId: number) {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new NotFoundError(`Order with ID ${orderId} not found`);
      }

      await order.destroy();
    } catch (error) {
      throw new DatabaseOperationError(
        `Error while deleting order with ID ${orderId}`,
      );
    }
  }
}

export const orderService = Object.freeze(new OrderService());
