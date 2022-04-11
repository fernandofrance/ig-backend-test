import { Model } from "sequelize";

export default interface IUser extends Model {
  id: string,
  nome: string,
  sobrenome: string,
  cpf: string,
  email: string,
  password: string
};