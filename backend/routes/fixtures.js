import express from 'express';
import { getFixtures } from '../controllers/fixtureController.js';

const router = express.Router();

// GET fixtures
router.get('/', getFixtures);

export default router;