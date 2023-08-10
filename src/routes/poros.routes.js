import { Router } from "express";
import { getPoroById, getPoros } from "../controllers/poros.controllers.js";

const porosRoutes = Router();

porosRoutes.get("/poros", getPoros);
porosRoutes.get("/poros/:id", getPoroById);
export default porosRoutes;
