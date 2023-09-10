import { dbResponse } from '../errors/dbResponse';
import { Order } from '../models/orders.model';

class OrderService {
  async getAllOrders() {
    try {
      const orders = await Order.findAll();

      return orders;
    } catch (error) {
      dbResponse.errorGetAll('orders');
    }
  }

  async createOrder(orderData: Partial<Order>) {
    try {
      const order = await Order.create({
        ...orderData,
      });

      return order;
    } catch (error) {
      dbResponse.errorCreate('order');
    }
  }

  async deleteOrder(orderId: number) {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        dbResponse.errorFindByPK('order', orderId);
        throw new Error('with ID  not found');
      }

      await order.destroy();
    } catch (error) {
      dbResponse.errorDelete('order', orderId);
    }
  }
}

export const orderService = Object.freeze(new OrderService());
