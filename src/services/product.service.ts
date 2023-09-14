import { Product } from '../models/products.model';
import fs from 'fs';
import path from 'path';
import {
  DatabaseOperationError,
  NotFoundError,
} from '../controllers/errors/APIErrors';

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

  async getAllProducts() {
    try {
      const products = await Product.findAll();

      return products;
    } catch (error) {
      throw new DatabaseOperationError('Error fetching all products');
    }
  }

  async getProductsByType(type: string) {
    try {
      const whereClause = type !== 'all' ? { type: type } : {};

      const products = await Product.findAll({
        where: whereClause,
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
