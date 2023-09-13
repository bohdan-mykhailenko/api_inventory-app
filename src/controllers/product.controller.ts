import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import {
  sendInternalServerErrorResponse,
  sendBadRequestResponse,
} from '../utils/sendErrorResponces';
import { DatabaseOperationError } from '../errors/APIErrors';
import { sendNotFoundResponse } from '../utils/sendErrorResponces';
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

  async getAllProducts(req: Request, res: Response) {
    try {
      const products = await productService.getAllProducts();

      if (!products.length) {
        return sendNotFoundResponse(res, 'Products not found');
      }

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

      if (!products.length) {
        return sendNotFoundResponse(
          res,
          `Products for product ${orderId} not found`,
        );
      }

      return res.status(200).json(products);
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async getProductsCountForOrder(req: Request, res: Response) {
    const orderId = parseInt(req.params.orderId, 10);

    if (!isValidId(orderId)) {
      return sendBadRequestResponse(res, 'Invalid order ID type');
    }

    try {
      const productCount = await productService.getProductCountForOrder(
        orderId,
      );

      if (productCount === 0) {
        return sendNotFoundResponse(
          res,
          `Products for order ${orderId} not found`,
        );
      }

      return res.status(200).json({ count: productCount });
    } catch (error) {
      if (error instanceof DatabaseOperationError) {
        return sendInternalServerErrorResponse(res, error.message);
      }
    }
  }

  async addProduct(req: Request, res: Response) {
    const productData = req.body;
    const productImage = req.file as Express.Multer.File;

    if (!req.file || !req.body) {
      return sendBadRequestResponse(
        res,
        'Both image and JSON data are required.',
      );
    }

    try {
      const product = await productService.addProduct(
        productData,
        productImage,
      );

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
