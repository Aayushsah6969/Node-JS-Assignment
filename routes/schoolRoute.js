import { Router } from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';

const router = Router();

// POST /addSchool
router.post('/addSchool', addSchool);

// GET /listSchools
router.get('/listSchools', listSchools);

export default router;
