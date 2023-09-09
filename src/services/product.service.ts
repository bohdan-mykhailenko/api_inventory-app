import { Product } from '../models/products.model';

class ProductService {
  async getAllProducts() {
    try {
      const products = await Product.findAll();

      return products;
    } catch (error) {
      console.log(error);
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

  async addProduct(productData: Partial<Product>) {
    try {
      const product = await Product.create(productData);

      return product;
    } catch (error) {
      throw new Error('Error adding a new product');
    }
  }

  async deleteProduct(productId: number) {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }

      await product.destroy();
    } catch (error) {
      throw new Error(`Error deleting product with ID ${productId}`);
    }
  }
}

export const productService = Object.freeze(new ProductService());
