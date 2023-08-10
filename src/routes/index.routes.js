import { Router } from "express";
import usersRoutes from "./users.routes.js";
import porosRoutes from "./poros.routes.js";

const router = Router();

router.use(usersRoutes);
router.use(porosRoutes);

export default router;
