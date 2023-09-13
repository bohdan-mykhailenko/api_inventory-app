import { Sequelize } from 'sequelize';
import {
  DatabaseOperationError,
  NotFoundError,
} from '../controllers/errors/APIErrors';
import { Order } from '../models/orders.model';
import { OrderDetails } from '../types/OrderDetails';
import { Product } from '../models/products.model';

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
      const orderDetails = await Order.findAll({
        attributes: [
          'id',
          'title',
          'date',
          'description',
          [Sequelize.fn('COUNT', Sequelize.col('products.id')), 'productCount'],
          [
            Sequelize.fn(
              'SUM',
              Sequelize.literal(
                'CASE WHEN "products"."price"->0->>\'symbol\' = \'USD\' THEN CAST("products"."price"->0->>\'value\' AS DECIMAL) ELSE 0 END',
              ),
            ),
            'usdTotalPrice',
          ],
          [
            Sequelize.fn(
              'SUM',
              Sequelize.literal(
                'CASE WHEN "products"."price"->1->>\'symbol\' = \'UAH\' THEN CAST("products"."price"->1->>\'value\' AS DECIMAL) ELSE 0 END',
              ),
            ),
            'uahTotalPrice',
          ],
        ],
        include: [
          {
            model: Product,
            as: 'products',
            attributes: [],
            required: false,
          },
        ],
        group: ['Order.id'],
        order: [['id', 'ASC']],
      });

      const formattedOrderDetails: OrderDetails[] = orderDetails.map(
        (order) => ({
          id: order.id,
          title: order.title,
          description: order.description,
          productCount: order.getDataValue('productCount'),
          sumOfPrice: [
            {
              value: parseFloat(order.getDataValue('usdTotalPrice')),
              symbol: 'USD',
            },
            {
              value: parseFloat(order.getDataValue('uahTotalPrice')),
              symbol: 'UAH',
            },
          ],
        }),
      );

      return formattedOrderDetails;
    } catch (error) {
      console.error(error);
      throw new DatabaseOperationError('Error fetching order details');
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
