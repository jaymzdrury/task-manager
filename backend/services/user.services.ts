import { omit } from "lodash";
import User, { UserModel } from "../models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import timer from "../utils/timer";
import logger from "../utils/logger";
import errMsg from "../utils/errMsg";
import { ServerError } from "../errors/server-error";
const { start, end, responseTime } = timer;

export async function getUsers() {
  start;
  try {
    const data = await User.find().lean().setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GET: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`GET: ${errMsg(e)}`);
  }
}

export async function getUser(query: FilterQuery<UserModel>) {
  start;
  try {
    const result = await User.findOne(query)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GETID: ${responseTime}`);
    return result;
  } catch (e) {
    throw new ServerError(`GETID: ${errMsg(e)}`);
  }
}

export async function putUser(
  query: FilterQuery<UserModel>,
  update: UpdateQuery<UserModel>,
  options: QueryOptions
) {
  start;
  try {
    const data = await User.findOneAndUpdate({ _id: query }, update, options)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`PUT: ${responseTime}`);
    return data;
  } catch (e) {
    throw new ServerError(`PUT: ${errMsg(e)}`);
  }
}

export async function signUpUser(input: UserModel) {
  start;
  try {
    const user = await User.create(input);
    end;
    logger.info(`SIGN UP: ${responseTime}`);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new ServerError(`SIGN UP: ${errMsg(e)}`);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  start;
  try {
    const user = await User.findOne({ email }).setOptions({
      sanitizeFilter: true,
    });
    if (!user) return false;

    const isValid = await user.comparePassword(password);
    if (!isValid) return false;

    end;
    logger.info(`VALIDATE: ${responseTime}`);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new ServerError(`VALIDATE: ${errMsg(e)}`);
  }
}
