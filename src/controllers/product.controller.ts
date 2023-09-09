import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { sendInternalServerErrorResponse } from '../errors/internalServerError';

class ProductController {
  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();

      return res.status(200).json(products);
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }

  async getProductsForOrder(req: Request, res: Response) {
    const { orderId } = req.params;

    try {
      const products = await productService.getProductsForOrder(
        parseInt(orderId, 10),
      );

      return res.status(200).json(products);
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }

  async addProduct(req: Request, res: Response) {
    const productData = req.body;

    try {
      const product = await productService.addProduct(productData);

      return res.status(201).json(product);
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const { productId } = req.params;

    try {
      await productService.deleteProduct(parseInt(productId, 10));

      return res.status(204).send();
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }
}

export default new ProductController();
