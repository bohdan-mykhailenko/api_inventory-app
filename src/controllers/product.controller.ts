import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import {
  sendInternalServerErrorResponse,
  sendBadRequestResponse,
} from '../utils/sendErrorResponces';
import { DatabaseOperationError } from '../errors/APIErrors';
import { isValidId } from '../helpers/isValidId';

class ProductController {
  async getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);

    if (!isValidId(productId)) {
      return sendBadRequestResponse(res, 'Invalid product ID type');
    }

    try {
      const product = await productService.getProductById(productId);

      return res.status(200).send(product);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async getFilteredProducts(req: Request, res: Response) {
    const type = req.query.type ? String(req.query.type) : 'all';
    const query = req.query.query ? String(req.query.query) : '';

    try {
      const products = await productService.getFilteredProducts(type, query);

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async getProductsForOrder(req: Request, res: Response) {
    const orderId = parseInt(req.params.orderId, 10);

    if (!isValidId(orderId)) {
      return sendBadRequestResponse(res, 'Invalid order ID type');
    }

    try {
      const products = await productService.getProductsForOrder(orderId);

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async addProduct(req: Request, res: Response) {
    const productData = req.body;
    const photo = req.file as Express.Multer.File;

    if (!req.file || !req.body) {
      return sendBadRequestResponse(
        res,
        'Both image and JSON data are required.',
      );
    }

    try {
      const product = await productService.addProduct(productData, photo);

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);

    if (!isValidId(productId)) {
      return sendBadRequestResponse(res, 'Invalid product ID type');
    }

    try {
      await productService.deleteProduct(productId);

      return res.status(204).send();
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }
}

export const productController = Object.freeze(new ProductController());
