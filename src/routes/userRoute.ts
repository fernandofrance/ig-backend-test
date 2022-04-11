import { Router } from "express";
import { userController } from "../controllers/userController";
import verifyToken from "../middlewares/verifyToken";

const userRoute = Router()

userRoute.patch("/", verifyToken, userController.updateUsername)

export default userRoute;