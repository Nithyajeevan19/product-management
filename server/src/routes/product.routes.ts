import { Router } from 'express';
import { productController } from '../controllers/product.controller';

const router = Router();

router.get('/products', productController.getProducts);
router.post('/products', productController.createProduct);
router.get('/products/search', productController.searchProducts);

export const productRoutes = router;