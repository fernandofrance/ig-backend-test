import { Model } from "sequelize";

export default interface ITask extends Model {
  id: string,
  title: string,
  done: boolean,
  date: string
};