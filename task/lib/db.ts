import { cookies } from "next/headers";
import { actionHeaders, errMsg, requestHeaders, tags } from "./utils";
import {
  AddTask,
  Complete,
  Id,
  Register,
  Task,
  Title,
  User,
} from "@/types/types";
import { env } from "@/types/env";
import { TIMEOUT } from "@/types/schemas";

const taskUrl = env.SERVER_TASKS;
const userUrl = env.SERVER_USER;
const aiUrl = env.SERVER_AI;

export async function tasks(query?: string) {
  try {
    const res = await fetch(query ? taskUrl + `?search=${query}` : taskUrl, {
      headers: requestHeaders(cookies()),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const tasks = await res.json();
    return { error: !res.ok ? tasks.message : null, tasks };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function users() {
  try {
    const res = await fetch(userUrl, {
      headers: requestHeaders(cookies()),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const users = await res.json();
    return { error: !res.ok ? users.message : null, users };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userLogin(loginForm: Omit<Register, "name">) {
  try {
    const res = await fetch(`${userUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const loginData = await res.json();
    return { error: !res.ok ? loginData.message : null, loginData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function signout() {
  try {
    const res = await fetch(`${userUrl}/logout`, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const logoutData = await res.json();
    return { error: !res.ok ? logoutData.message : null, logoutData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function signup(registerFormData: Register) {
  try {
    const res = await fetch(`${userUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...registerFormData,
        role: "user",
        loggedIn: Date.now(),
        seconds: 0,
      }),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const registerData = await res.json();
    return { error: !res.ok ? registerData.message : null, registerData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskDelete(id: Id) {
  try {
    const res = await fetch(`${taskUrl}/${id}`, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const deleteTaskData = await res.json();
    return { error: !res.ok ? deleteTaskData.message : null, deleteTaskData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskDeleteAll(complete: Complete) {
  try {
    const res = await fetch(taskUrl, {
      method: "DELETE",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({ complete }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const deleteTaskData = await res.json();
    return { error: !res.ok ? deleteTaskData.message : null, deleteTaskData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskAdd(task: AddTask) {
  try {
    const res = await fetch(taskUrl, {
      method: "POST",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...task,
        users: [task.users],
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const addTaskData = await res.json();
    return { error: !res.ok ? addTaskData.message : null, addTaskData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function taskEdit(task: Task, partialTask: Partial<Task>) {
  try {
    const ids = task.users.map((d) => d._id);
    const { _id, ...dataWithoutId } = task;

    const res = await fetch(`${taskUrl}/${task._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        ...partialTask,
        users: ids,
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });

    const putTaskData = await res.json();
    return {
      error: !res.ok ? putTaskData.message : null,
      putTaskData,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userAdd(task: Task, id: Id) {
  try {
    const ids = task.users.map((d) => d._id);
    ids.push(id);
    const { _id, ...dataWithoutId } = task;

    const res = await fetch(`${taskUrl}/${task._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        users: ids,
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });

    const addedTasks = await res.json();
    return { error: !res.ok ? addedTasks.message : null, addedTasks };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userRemove(task: Task, userId: Id) {
  try {
    const ids = task.users.map((d) => d._id);
    const filteredIds = ids.filter((i) => i !== userId);
    const { _id, ...dataWithoutId } = task;

    const res = await fetch(`${taskUrl}/${task._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        users: filteredIds,
      }),
      next: {
        tags: [tags.TASKS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });

    const editedTask = await res.json();
    return { error: !res.ok ? editedTask.message : null, editedTask };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function userEdit(user: User, partialUser: Partial<User>) {
  try {
    const { _id, ...dataWithoutId } = user;

    const res = await fetch(`${userUrl}/${user._id}`, {
      method: "PUT",
      headers: actionHeaders(cookies()),
      body: JSON.stringify({
        ...dataWithoutId,
        ...partialUser,
      }),
      next: {
        tags: [tags.USERS],
      },
      signal: AbortSignal.timeout(TIMEOUT),
    });
    const putUserData = await res.json();
    return {
      error: !res.ok ? putUserData.message : null,
      putUserData,
    };
  } catch (error) {
    return { error: errMsg(error) };
  }
}

export async function promptAI(title: Title) {
  try {
    const res = await fetch(aiUrl, {
      method: "POST",
      headers: actionHeaders(cookies()),
      body: JSON.stringify(title),
    });
    const aiData = await res.text();
    return { error: !res.ok ? aiData : null, aiData };
  } catch (error) {
    return { error: errMsg(error) };
  }
}
