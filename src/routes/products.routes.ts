import express from 'express';
import { productController } from '../controllers/product.controller';

export const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/order/:orderId', productController.getProductsForOrder);

router.post('/', productController.addProduct);

router.delete('/:productId', productController.deleteProduct);
