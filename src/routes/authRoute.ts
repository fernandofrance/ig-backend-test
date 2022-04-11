import { Router } from "express";
import { authController } from "../controllers/authController";

const authRoute = Router()

authRoute.post("/signup", authController.signUp)
authRoute.post("/login", authController.login)

export default authRoute;