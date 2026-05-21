import { Router } from 'express';
import { createShoppingDay, listShoppingDays } from '../controllers/shoppingDay.controller';

const router = Router();

router.post('/', createShoppingDay);
router.get('/', listShoppingDays);

export default router;