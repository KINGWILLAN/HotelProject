import { Router } from "express";
import {
  completeRegistration,
  createUser,
  currentUser,
  loginUser,
  logoutUser,
  resendVerificationCode,
  verifyUser,
} from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("", createUser);
userRouter.post("/login", loginUser);
userRouter.get("", authMiddleware, currentUser);
userRouter.get("/verify", verifyUser);
userRouter.get("/logout", authMiddleware, logoutUser);
userRouter.post("/registration", authMiddleware, completeRegistration);
userRouter.get("/resend-code", resendVerificationCode);

export default userRouter;
