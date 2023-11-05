import express from 'express';
import { createline, getline } from '../controllers/line';

const router = express.Router();

router.get("/", getline );
router.post("/", createline);

export default router;