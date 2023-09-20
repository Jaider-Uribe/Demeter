import { Router } from 'express'
import { getCategory_supplies, getOneCategory_supplies, createCategory_supplies, disableCategory_supplies, getSupplies_Category } from '../controllers/category_supplies.controller.js'

const router = Router();

router.get('/category_supplies', getCategory_supplies);
router.post('/category_supplies', createCategory_supplies);
router.put('/category_supplies/:id', disableCategory_supplies);
router.get('/category_supplies/:id', getOneCategory_supplies);
router.get('/category_supplies/:id/supplies', getSupplies_Category);

export default router;