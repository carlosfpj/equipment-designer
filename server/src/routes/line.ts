import express from 'express';
import { createline, deleteLine, getline, getlines, updateLine } from '../controllers/line';

const router = express.Router();

router.get("/", getlines );
router.get("/:lineId", getline);
router.post("/", createline);
router.patch("/:lineId", updateLine);
router.delete("/:lineId", deleteLine);

export default router;