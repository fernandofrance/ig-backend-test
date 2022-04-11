import { Router } from "express";
import { taskController } from "../controllers/taskController";
import verifyToken from "../middlewares/verifyToken";

const taskRoute = Router();

taskRoute.get("/status", verifyToken, taskController.getTasksByStatus)
taskRoute.patch("/:id/status", verifyToken, taskController.updateStatus)
taskRoute.post("/", verifyToken, taskController.createTask)
taskRoute.get("/", verifyToken, taskController.getAllTasks)
taskRoute.get("/:id", verifyToken, taskController.getTasksById)
taskRoute.patch("/:id", verifyToken, taskController.updateTitleAndDate)
taskRoute.delete("/:id", verifyToken, taskController.deleteTask)

export default taskRoute;