import { Product } from '../models/products.model';
import fs from 'fs';
import path from 'path';
import { DatabaseOperationError, NotFoundError } from '../errors/APIErrors';
import { Sequelize } from 'sequelize';
import { WhereClause } from '../types/WhereClause';
import { Order } from '../models/orders.model';
import { ProductData } from '../types/ProductData';

class ProductService {
  async getProductById(productId: number) {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new NotFoundError(`Product with ID ${productId} not found`);
      }

      return product;
    } catch (error) {
      throw new DatabaseOperationError('Error while fetching product');
    }
  }

  async getFilteredProducts(type: string, query?: string) {
    try {
      const whereClause: WhereClause = type !== 'all' ? { type } : {};

      if (query) {
        whereClause.title = Sequelize.literal(
          `LOWER("Product"."title") LIKE LOWER('%${query}%')`,
        );
      }

      const products = await Product.findAll({
        where: whereClause as Record<string, string>,
        include: [{ model: Order, attributes: ['title'] }],
        order: [['id', 'ASC']],
      });

      const formattedProductsData = products.map((product) => ({
        id: product.id,
        serialNumber: product.serialNumber,
        isNew: product.isNew,
        isRepairing: product.isRepairing,
        photo: product.photo,
        title: product.title,
        type: product.type,
        specification: product.specification,
        guarantee: product.guarantee,
        price: product.price,
        orderTitle: product.order?.title || '',
      }));

      return formattedProductsData;
    } catch (error) {
      console.log(error);
      throw new DatabaseOperationError('Error fetching products');
    }
  }

  async getProductsForOrder(orderId: number) {
    try {
      const products = await Product.findAll({
        where: { order_id: orderId },
      });

      return products;
    } catch (error) {
      throw new DatabaseOperationError(
        `Error fetching products for product ${orderId}`,
      );
    }
  }

  async addProduct(
    productData: Partial<ProductData>,
    photo: Express.Multer.File,
  ) {
    try {
      const parsedProductData: Partial<Product> = {
        ...productData,
        guarantee: JSON.parse(productData.guarantee as string),
        price: JSON.parse(productData.price as string),
        photo: photo.filename,
      };

      const product = await Product.create(parsedProductData);
      return product;
    } catch (error) {
      throw new DatabaseOperationError('Error adding a new product with image');
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new NotFoundError(`Product with ID ${productId} not found`);
      }

      const imagePath = product.photo;

      if (imagePath) {
        const fullPath = path.join(
          __dirname,
          '..',
          '..',
          'public',
          'images',
          imagePath,
        );

        fs.unlinkSync(fullPath);
      }

      await product.destroy();
    } catch (error) {
      throw new DatabaseOperationError(
        `Error while deleting product with ID ${productId}`,
      );
    }
  }
}

export const productService = Object.freeze(new ProductService());
