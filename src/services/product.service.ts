import { Product } from '../models/products.model';
import fs from 'fs';
import path from 'path';
import { DatabaseOperationError, NotFoundError } from '../errors/APIErrors';
import { Sequelize } from 'sequelize';
import { WhereClause } from '../types/WhereClause';

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
          `LOWER("title") LIKE LOWER('%${query}%')`,
        );
      }

      const products = await Product.findAll({
        where: whereClause as Record<string, string>,
      });

      return products;
    } catch (error) {
      throw new DatabaseOperationError('Error fetching products by type');
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

  async addProduct(productData: Partial<Product>, photo: Express.Multer.File) {
    try {
      const product = await Product.create({
        ...productData,
        photo: photo.filename,
      });

      return product;
    } catch (error) {
      console.log(error);
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
      console.log(error);
      throw new DatabaseOperationError(
        `Error while deleting product with ID ${productId}`,
      );
    }
  }
}

export const productService = Object.freeze(new ProductService());
