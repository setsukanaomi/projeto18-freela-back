import { Router } from "express";
import { getPoros } from "../controllers/poros.controllers.js";

const porosRoutes = Router();

porosRoutes.get("/poros", getPoros);
export default porosRoutes;
