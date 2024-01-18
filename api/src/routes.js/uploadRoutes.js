import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { serviceImageUpload } from "../controllers/uploadController.js";

const uploadRouter = Router();

uploadRouter.post("", authMiddleware, serviceImageUpload);

export default uploadRouter;
