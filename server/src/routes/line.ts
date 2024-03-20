import express from 'express';
import { singlePhaseLiquidVelocityParams,
         singlePhaseLiquidVpParams,
         deleteLine,
         getline,
         getlines,
         updateLine,
         getImages } from '../controllers/line';

const router = express.Router();

// router.get("/", getlines );
// router.get("/images", getImages);
// router.get("/:lineId", getline);
router.post("line/singlephase/vel", singlePhaseLiquidVelocityParams);
router.post("line/singlephase/vp", singlePhaseLiquidVpParams);
// router.patch("/:lineId", updateLine);
// router.delete("/:lineId", deleteLine);

export default router;