import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import Tasks, { TaskModel } from "../models/task.model";
import timer from "../utils/timer";
import logger from "../utils/logger";
import errMsg from "../utils/errMsg";
import queryOptions from "../utils/queryOptions";
import { ServerError } from "../errors/server-error";
const { start, end, responseTime } = timer;

export async function get(
  query?: string | string[] | QueryOptions | undefined
) {
  start;
  try {
    const data = await Tasks.find(queryOptions(query))
      .populate({
        path: "users",
        model: "User",
        select: "name role",
      })
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GET: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`GET: ${errMsg(e)}`);
  }
}

export async function getOne(query: FilterQuery<TaskModel>) {
  start;
  try {
    const data = await Tasks.findOne({ _id: query })
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GET: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`GET: ${errMsg(e)}`);
  }
}

export async function post(input: TaskModel) {
  start;
  try {
    const data = (await Tasks.create(input)).populate({
      path: "users",
      model: "User",
      select: "-password",
    });
    end;
    logger.info(`POST: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`POST: ${errMsg(e)}`);
  }
}

export async function put(
  query: FilterQuery<TaskModel>,
  update: UpdateQuery<TaskModel>,
  options: QueryOptions
) {
  start;
  try {
    const data = await Tasks.findOneAndUpdate({ _id: query }, update, options)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`PUT: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`PUT: ${errMsg(e)}`);
  }
}

export async function remove(query: FilterQuery<TaskModel>) {
  start;
  try {
    const data = await Tasks.deleteOne({ _id: query })
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`DELETE: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`DELETE: ${errMsg(e)}`);
  }
}

export async function removeAll(input: TaskModel) {
  start;
  try {
    const data = await Tasks.deleteMany({ complete: input.complete })
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`DELETE: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`DELETE: ${errMsg(e)}`);
  }
}
