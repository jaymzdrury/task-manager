import { Request, Response } from "express";
import { signUpUser, getUsers, putUser } from "../services/user.services";
import { UserModel } from "../models/user.model";
import { omit } from "lodash";
import timeoutHandler from "../utils/timeout";

const getUser = async (req: Request, res: Response) => {
  timeoutHandler(null, res);
  const user = await getUsers();
  return res.send(user);
};

const editUser = async (req: Request<UserModel["_id"]>, res: Response) => {
  timeoutHandler(req, res);
  const data = await putUser(req.params.id, req.body, { new: true });
  return res.send(data);
};

const editUserClockIn = async (
  req: Request<UserModel["_id"]>,
  res: Response
) => {
  timeoutHandler(req, res);
  const update = {
    $set: { loggedIn: req.body.loggedIn, seconds: req.body.seconds },
  };
  const user = await putUser(req.params.id, update, { new: true });
  return res.send(user);
};

const signUp = async (req: Request, res: Response) => {
  timeoutHandler(req, res);
  const user = await signUpUser(req.body);
  return res.send(omit(user, "password"));
};

export default { getUser, editUser, editUserClockIn, signUp };
