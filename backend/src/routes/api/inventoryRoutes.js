import { Router } from 'express';
import { addCar, listCars, updateCar, deleteCars } from '../../controllers/inventoryController.js';
import { auth } from '../../middleware/authMiddleware.js';

const router = Router();

router.post('/', auth, addCar);
router.get('/', listCars); // public browse
router.put('/:id', auth, updateCar);
router.delete('/', auth, deleteCars);

export default router;
