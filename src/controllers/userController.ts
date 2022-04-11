import { Request, Response } from "express";
import User from "../database/models/User";

const updateUsername = async (req: Request, res: Response) => {
  const { nome, sobrenome, id_usuario } = req.body;

  if(!nome || !sobrenome) {
    return res.status(400).json({ success: false, message: "Missing parameters" });
  };
  try {
    await User.update( { nome: nome, sobrenome: sobrenome }, { where: { id: id_usuario }});
    return res.status(201).json({ success: true, message: "The username was updated successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

export const userController = {
  updateUsername
};