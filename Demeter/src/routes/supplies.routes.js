import { Router } from 'express';
import { getSupplies, getSupplie, createSupplies, disableSupplies } from '../controllers/supplies.controller.js'; 

const router = Router();

router.get("/supplies", getSupplies);
router.post("/supplies", createSupplies);
router.put("/supplies/:id", disableSupplies);   
router.get("/supplies/:id", getSupplie);

export default router;
