import { Order } from '../models/orders.model';
import { OrderData } from '../types/Order';

class OrderService {
  async getAllOrders() {
    return Order.findAll();
  }

  async createOrder(orderData: OrderData) {
    const orderAttributes = {
      title: orderData.title,
      date: orderData.date,
      description: orderData.description,
    };

    return Order.create(orderAttributes);
  }

  async deleteOrder(orderId: number) {
    return Order.destroy({ where: { id: orderId } });
  }
}

export default new OrderService();
