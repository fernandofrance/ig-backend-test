import Sequelize from "sequelize";
import database from "../db.config";
import ITask from "../../interfaces/taskInterface";
import User from "./User";

const Task = database.define<ITask>("task", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  title: { type: Sequelize.STRING, allowNull: false },
  done: { type: Sequelize.BOOLEAN, allowNull: false },
  date: { type: Sequelize.DATE, allowNull: false }
}, { updatedAt: false });

Task.belongsTo(User, {
  constraints: true,
  foreignKey: "idUser"
});

User.hasMany(Task, {
  foreignKey: "idUser"
});

export default Task;