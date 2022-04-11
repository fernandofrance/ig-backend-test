import { Request, Response } from "express";
import crypto from "crypto";
import Task from "../database/models/Task";

type TRequest = {
  id: string,
  done: boolean,
  date: string
};

const createTask = async (req: Request, res: Response) => {
  const { title, done, date, id_usuario } = req.body;

  if(!title || req.body.done == undefined || !date) {
    return res.status(400).json({ success: false, message: "Missing title, done or date" });
  }

  try {
    await Task.create({
      id: crypto.randomUUID(),
      title,
      done,
      date,
      idUser: id_usuario
    });

    res.status(201).json({ success: true, message: "Task was created successfully" });
  } catch(error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const getAllTasks = async (req: Request, res: Response) => {
  const { id_usuario } = req.body;

  try {
    const tasks = await Task.findAll({ where: { idUser: id_usuario } });
    return res.status(200).json({ success: true, tasks });
  } catch(error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const getTasksById = async (req: Request, res: Response) => {
  const { id_usuario } = req.body;
  const { id } = req.params as unknown as TRequest;
  
  try {
    const tasks = await Task.findOne({ where: { id: id, idUser: id_usuario }});

    if (!tasks) {
      return res.status(404).json({ success: false, message: "Task not found" });
    };

    return res.status(200).json({ success: true, tasks });
  } catch(error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const getTasksByStatus = async (req: Request, res: Response) => {
  const { id_usuario } = req.body;
  const { done } = req.query as unknown as TRequest;

  if(done == undefined) {
    return res.status(400).json({ success: false, message: "Missing done query" });
  }
  
  try {
    const tasks = await Task.findAll({ where: { done: done, idUser: id_usuario }});

    if (!tasks.length) {
      return res.status(404).json({ success: false, message: `Task with status ${done} not found` });
    };

    return res.status(200).json({ success: true, tasks });
  } catch(error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const updateTitleAndDate = async (req: Request, res: Response) => {
  const { title, date, id_usuario } = req.body;
  const { id } = req.params as unknown as TRequest;

  if(!title || !date || !id) {
    return res.status(400).json({ success: false, message: "Missing title, date or id in request" });
  }

  const task = await Task.findOne({ where: { id: id, idUser: id_usuario }});

  if(!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  };

  try {
    await Task.update({ title: title, date: date }, { where: { idUser: id_usuario, id: id }});
    return res.status(201).json({ success: true, message: "The task was updated successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const updateStatus = async (req: Request, res: Response) => {
  const { id_usuario, done } = req.body;
  const { id } = req.params as unknown as TRequest;

  if(done == undefined || !id) {
    return res.status(400).json({ success: false, message: "Missing done or id in request" });
  }

  const task = await Task.findOne({ where: { id: id, idUser: id_usuario }});

  if(!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  };

  try {
    await Task.update({ done: done }, { where: { idUser: id_usuario, id: id }});
    return res.status(201).json({ success: true, message: "The task was updated successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

const deleteTask = async (req: Request, res: Response) => {
  const { id_usuario } = req.body;
  const { id } = req.params as unknown as TRequest;

  if(!id) {
    return res.status(400).json({ success: false, message: "Missing id query" });
  }

  const task = await Task.findOne({ where: { id: id, idUser: id_usuario }});

  if(!task) {
    return res.status(404).json({ success: false, message: "Task not found" });
  };

  try {
    await task.destroy();
    res.status(201).json({ success: true, message: "The task was deleted successfully." });
  } catch(error) {
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  };
};

export const taskController = {
  createTask,
  getAllTasks,
  getTasksById,
  getTasksByStatus,
  updateTitleAndDate,
  updateStatus,
  deleteTask
};