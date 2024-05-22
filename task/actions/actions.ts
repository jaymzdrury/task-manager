"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import {
  promptAI,
  signout,
  signup,
  taskAdd,
  taskDelete,
  taskDeleteAll,
  taskEdit,
  userAdd,
  userEdit,
  userLogin,
  userRemove,
} from "@/lib/db";
import { cookieValues, paths, tags } from "@/lib/utils";
import {
  AddTask,
  Complete,
  Id,
  Login,
  Logout,
  Register,
  Task,
  Title,
  User,
} from "@/types/types";
import {
  addTask as addTaskSchema,
  register as registerSchema,
  login as loginSchema,
  id as idSchema,
  user as userSchema,
  complete as completeSchema,
  title,
} from "@/types/schemas";
import { taskParse } from "@/types/parse";
import { send } from "@/components/email/send";

export async function login(formData: Login) {
  const { success } = loginSchema.safeParse(formData);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error, loginData } = await userLogin(formData);

  if (error) return { success: false, error };

  cookies().set(cookieValues.ACCESSTOKEN, loginData.accessToken);
  cookies().set(cookieValues.REFRESHTOKEN, loginData.refreshToken);
  cookies().set(cookieValues.USERNAME, loginData.user.name);

  return { success: true, error };
}

export async function logout(): Promise<Logout> {
  const { error, logoutData } = await signout();

  if (error) throw new Error(error.message);

  cookies().set(cookieValues.ACCESSTOKEN, logoutData.accessToken);
  cookies().set(cookieValues.REFRESHTOKEN, logoutData.refreshToken);
  cookies().delete(cookieValues.USERNAME);

  revalidateTag(tags.USERS);
  redirect(paths.LOGIN);
}

export async function register(formData: Register) {
  // const form = Object.fromEntries(formData.entries());
  const { success } = registerSchema.safeParse(formData);
  const registerFormData = registerSchema.parse(formData);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error } = await signup(registerFormData);

  if (error) return { success: false, error };

  revalidateTag(tags.USERS);

  return { success: true, error };
}

export async function deleteTask(id: Id) {
  const { success } = idSchema.safeParse(id);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error } = await taskDelete(id);

  if (error) return { success: false, error };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function deleteAllTask(complete: Complete) {
  const { success } = completeSchema.safeParse(complete);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error } = await taskDeleteAll(complete);

  if (error) return { success: false, error };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function addTask(formData: AddTask) {
  const { success } = addTaskSchema.safeParse(formData);
  const addTaskData = addTaskSchema.parse(formData);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error } = await taskAdd(addTaskData);

  if (error) return { success: false, error };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function addUser(task: Task, userId: Id) {
  const { success } = taskParse(task);
  const { success: idSuccess } = idSchema.safeParse(userId);

  if (!success && !idSuccess)
    return { success: false, error: "Invalid Schema" };

  const { error } = await userAdd(task, userId);

  if (error) return { success: false, error };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function removeUser(task: Task, userId: Id) {
  const { success } = taskParse(task);
  const { success: idSuccess } = idSchema.safeParse(userId);

  if (!success && !idSuccess)
    return { success: false, error: "Invalid Schema" };

  const { error } = await userRemove(task, userId);

  if (error) return { success: false, error };

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function editTask(task: Task, partialTask: Partial<Task>) {
  const { success } = taskParse({
    ...task,
    ...partialTask,
    date: new Date(task.date),
  });

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error } = await taskEdit(task, partialTask);

  if (error) return { success: false, error };

  partialTask.complete && partialTask.complete === "Done"
    ? send(task)
    : undefined;

  revalidateTag(tags.TASKS);

  return { success: true, error };
}

export async function editUser(user: User, partialUser: Partial<User>) {
  const { success } = userSchema.safeParse({ ...user, ...partialUser });

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error, putUserData } = await userEdit(user, partialUser);

  if (error) return { success: false, error };

  revalidateTag(tags.USERS);

  cookies().set(cookieValues.USERNAME, putUserData.name);

  return { success: true, error, putUserData };
}

export async function prompt(titleParams: Title) {
  const { success } = title.safeParse(titleParams);

  if (!success) return { success: false, error: "Invalid Schema" };

  const { error, aiData } = await promptAI(titleParams);

  if (error) return { success: false, error };

  return { success: true, error, aiData };
}
