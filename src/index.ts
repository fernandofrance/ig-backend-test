import dotenv from "dotenv";
import sequelize from "../src/database/db.config";
import app from "./server"

dotenv.config();
const port = process.env.PORT || 3000;

sequelize.sync();

app.listen(port, () => {
  console.log(`Application started on port ${port}`);
});