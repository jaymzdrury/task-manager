import { Request, Response } from "express";
import {
  get,
  getOne,
  post,
  put,
  remove,
  removeAll,
} from "../services/tasks.services";
import { TaskModel } from "../models/task.model";
import timeoutHandler from "../utils/timeout";

const getTask = async (req: Request, res: Response) => {
  timeoutHandler(req, res);
  const data = await get(req.query.search);
  return res.send(data);
};

const getOneTask = async (req: Request<TaskModel["_id"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await getOne(req.params.id);
  return res.send(data);
};

const postTask = async (req: Request, res: Response) => {
  timeoutHandler(req, res);
  const data = await post(req.body);
  return res.send(data);
};

const putTask = async (req: Request<TaskModel["_id"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await put(req.params.id, req.body, { new: true });
  return res.send(data);
};

const deleteTask = async (req: Request<TaskModel["_id"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await remove(req.params.id);
  return res.send(data);
};

const deleteTasks = async (req: Request, res: Response) => {
  timeoutHandler(req, res);
  const data = await removeAll(req.body);
  return res.send(data);
};

export default {
  getTask,
  postTask,
  putTask,
  deleteTask,
  deleteTasks,
  getOneTask,
};
