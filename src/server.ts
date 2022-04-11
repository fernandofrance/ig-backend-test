import express from "express";
import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import taskRoute from "./routes/taskRoute";
//import database from "./database/db.config";

const app = express();
app.use(express.json());

// Routes
app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/tasks", taskRoute);

export default app;