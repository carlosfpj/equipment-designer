import express from 'express';
import { createline, getline, getlines } from '../controllers/line';

const router = express.Router();

router.get("/", getlines );
router.get("/:lineId", getline);
router.post("/", createline);

export default router;