import { Router } from 'express';
import { getStandings } from '../controllers/standingController.js';

const router = Router();

// GET standings
router.get('/', getStandings);

export default router;