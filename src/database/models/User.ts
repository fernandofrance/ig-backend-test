import Sequelize from "sequelize";
import database from "../db.config";
import IUser from "../../interfaces/userInterface";

const User = database.define<IUser>("user", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  nome: { type: Sequelize.STRING, allowNull: false },
  sobrenome: { type: Sequelize.STRING, allowNull: false },
  cpf: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false }
}, { timestamps: false });

export default User;