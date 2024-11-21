import { Router } from "express";
import userRoutes from "./userRoutes.js";
import taskRoutes from "./taskRoutes.js";

const router = Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

export default router