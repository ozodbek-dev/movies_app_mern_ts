import express from 'express'
import userRoutes from "./user.routes.js";
import mediaRoutes from "./media.routes.js";
import personRoutes from "./person.routes.js";
import reviewRoutes from "./review.routes.js";

const router = express.Router();

router.use("/user",userRoutes)
router.use("/person",personRoutes)
router.use("/media",mediaRoutes)
router.use("/:mediaType",reviewRoutes)


export default router;