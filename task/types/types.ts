import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import {
  addTask,
  editTask,
  complete,
  id,
  idProp,
  login,
  logout,
  register,
  role,
  task,
  user,
  title,
} from "./schemas";

export type Id = z.infer<typeof id>;

export type IdProp = z.infer<typeof idProp>;

export type User = z.infer<typeof user>;

export type Task = z.infer<typeof task>;

export type Logout = z.infer<typeof logout>;

export type Register = z.infer<typeof register>;

export type Login = z.infer<typeof login>;

export type AddTask = z.infer<typeof addTask>;

export type Title = z.infer<typeof title>;

export type EditTask = z.infer<typeof editTask>;

export type Role = z.infer<typeof role>;

export type Complete = z.infer<typeof complete>;

export type UseForm = UseFormReturn<any, any, undefined>;

export type UserValues = "Email" | "Password" | "Name";

export type EditValues = "title" | "description" | "name" | "email";
