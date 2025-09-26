import { Router } from 'express';
import { getModelCount, searchModel } from '../../controllers/oemController.js';

const router = Router();

router.get('/models/count', getModelCount);
router.get('/models/search', searchModel);

export default router;
