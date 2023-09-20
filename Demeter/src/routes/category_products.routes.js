import { Router } from 'express'
import { getCategory_products, getOneCategory_products, createCategory_products, disableCategory_products } from '../controllers/category_products.controller.js'
// getProducts_Category
const router = Router();

router.get('/category_products', getCategory_products);
router.post('/category_products', createCategory_products);
router.put('/category_products/:id', disableCategory_products);
router.get('/category_products/:id', getOneCategory_products);
// router.get('/category_products/:id/products', getProducts_Category);

export default router;