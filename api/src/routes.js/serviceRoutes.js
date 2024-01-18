import { Router } from "express";
import {
  createService,
  getNearbyServices,
  getService,
} from "../controllers/serviceController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const serviceRouter = Router();

serviceRouter.post("", authMiddleware, createService);
serviceRouter.get("", getNearbyServices);
serviceRouter.get("/:serviceId", getService);

export default serviceRouter;
