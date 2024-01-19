import express from 'express';
import { singlePhaseLiquidParams, deleteLine, getline, getlines, updateLine, getImages } from '../controllers/line';

const router = express.Router();

router.get("/", getlines );
router.get("/images", getImages);
router.get("/:lineId", getline);
router.post("/", singlePhaseLiquidParams);
router.patch("/:lineId", updateLine);
router.delete("/:lineId", deleteLine);

export default router;