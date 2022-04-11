import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../database/models/User";

dotenv.config();

const signUp = async (req: Request, res: Response) => {
  const { nome, sobrenome, cpf, email, password } = req.body;

  if (!nome || !sobrenome || !cpf || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing request body values" });
  };

  const user = await User.findOne({where: { [Op.or]: [ { email: email }, { cpf: cpf } ] }});
  if (user) {
    return res.status(400).json({ success: false, message: "Please use another email and CPF" });
  };

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    await User.create({
      id: crypto.randomUUID(),
      nome: nome,
      sobrenome: sobrenome,
      cpf: cpf,
      email: email,
      password: hash
    });

    return res.status(201).json({ success: true, message: "The user was registered successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await User.findOne({ where: { email: email } });

  if (!usuario) {
    return res.status(404).json({ success: false, message: "User not found" });
  };

  const checkPassword = await bcrypt.compare(password, usuario.password);
  if (!checkPassword) {
    return res.status(401).json({ success: false, message: "Invalid password" });
  };
  
  try {
    const secret = process.env.SECRET as string;
    const token = jwt.sign({id: usuario.id}, secret);

    return res.status(200).json({ success: true, message: "The user is authenticated successfully", token });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

export const authController = {
  signUp,
  login
};