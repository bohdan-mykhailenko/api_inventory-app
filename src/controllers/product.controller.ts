import { Request, Response } from 'express';
import { productService } from '../services/product.service';
import { sendInternalServerErrorResponse } from '../errors/internalServerError';
import { sendInvalidIdResponse } from '../errors/invalidId';
import { validationResult } from 'express-validator';

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
    const orderId = parseInt(req.params.orderId, 10);

    if (isNaN(orderId)) {
      sendInvalidIdResponse(res, 'order');
    }

    try {
      const products = await productService.getProductsForOrder(orderId);

      return res.status(200).json(products);
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }

  async addProduct(req: Request, res: Response) {
    const productData = req.body;
    const productImage = req.file as Express.Multer.File;

    console.log(productImage);

    const errors = validationResult(req);

    if (!req.file || !req.body) {
      return res
        .status(400)
        .json({ error: 'Both image and JSON data are required.' });
    }

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const product = await productService.addProduct(
        productData,
        productImage,
      );

      console.log(product);

      return res.status(201).json(product);
    } catch (error) {
      console.log(error);
      sendInternalServerErrorResponse(res);
    }
  }

  async deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.productId, 10);

    if (isNaN(productId)) {
      sendInvalidIdResponse(res, 'product');
    }

    try {
      await productService.deleteProduct(productId);

      return res.status(204).send();
    } catch (error) {
      sendInternalServerErrorResponse(res);
    }
  }
}

export const productController = Object.freeze(new ProductController());
