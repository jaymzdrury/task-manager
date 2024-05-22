import { z } from "zod";

export const ID_MIN_LENGTH = 24;
export const INPUT = 3;
export const PASSWORD = 6;
export const SUBMIT_LIMIT = 3;
export const TIMEOUT = 3000;
export const REVALIDATE = 3600;

export const id = z.string().min(ID_MIN_LENGTH);
export const idProp = z.object({ _id: id });
export const email = z.string().email();
export const role = z.enum(["user", "auth", "admin"]);
export const complete = z.enum(["ToDo", "In Progress", "Done"]);

//USER
export const user = z.object({
  _id: id,
  name: z.string().min(INPUT),
  email: email,
  password: z.string().min(PASSWORD),
  role,
  loggedIn: z.string(),
  seconds: z.number(),
});

export const logout = z.object({
  accessToken: z.string().min(12),
  refreshToken: z.string().min(12),
  user: user,
});

//REGISTRATION
export const register = z.object({
  name: z.string().min(INPUT),
  email: email,
  password: z.string().min(PASSWORD),
});

export const login = register.omit({ name: true });

//TASKS
export const task = z.object({
  _id: id,
  title: z.string().min(INPUT),
  description: z.string().min(INPUT),
  date: z.date(),
  complete,
  users: z.array(user),
});

export const title = task.pick({ title: true });

export const editTask = task.pick({ title: true, description: true });

export const addTask = task
  .pick({ title: true, description: true, complete: true, date: true })
  .extend({
    users: z.string().min(ID_MIN_LENGTH),
  });
