import { Router } from "express";
import {
  GetMyPoros,
  TurnPoroDisabled,
  getPoroById,
  getPoros,
} from "../controllers/poros.controllers.js";

const porosRoutes = Router();

porosRoutes.get("/poros", getPoros);
porosRoutes.get("/poros/:id", getPoroById);
porosRoutes.get("/my/poros", GetMyPoros);
porosRoutes.get("/my/poros/:id", TurnPoroDisabled);
export default porosRoutes;
