import express from 'express';
import { singlePhaseLiquidVelocityParams,
         singlePhaseLiquidVpParams,
         deleteLine,
         getline,
         getlines,
         updateLine,
         test,
         getImages } from '../controllers/line';

const router = express.Router();

router.get("/", getlines );
// router.post("/", test);
// router.get("/images", getImages);
// router.get("/:lineId", getline);
router.post("/vel", singlePhaseLiquidVelocityParams);
router.post("/vp", singlePhaseLiquidVpParams);
// router.patch("/:lineId", updateLine);
// router.delete("/:lineId", deleteLine);

export default router;