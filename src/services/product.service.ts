import { Product } from '../models/products.model';
import fs from 'fs';
import path from 'path';

class ProductService {
  async getAllProducts() {
    try {
      const products = await Product.findAll();

      return products;
    } catch (error) {
      throw new Error('Error fetching all products');
    }
  }

  async getProductsForOrder(orderId: number) {
    try {
      const products = await Product.findAll({ where: { order_id: orderId } });

      return products;
    } catch (error) {
      throw new Error(`Error fetching products for order ${orderId}`);
    }
  }

  async addProduct(
    productData: Partial<Product>,
    productImage: Express.Multer.File,
  ) {
    try {
      const product = await Product.create({
        ...productData,
        photo: productImage.filename,
      });

      return product;
    } catch (error) {
      throw new Error('Error adding a new product with image');
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
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
      throw new Error(`Error deleting product with ID ${productId}`);
    }
  }
}

export const productService = Object.freeze(new ProductService());
