import { Router } from 'express';
import { getSupplies, getSupplie, createSupplie, updateSupplie, deleteSupplie } from '../controllers/supplies.controller.js'; 

const router = Router();

router.get("/supplies", getSupplies);
router.post("/supplies", createSupplie);
router.put("/supplies/:id", updateSupplie);
router.delete("/supplies/:id", deleteSupplie);
router.get("/supplies/:id", getSupplie);

export default router;