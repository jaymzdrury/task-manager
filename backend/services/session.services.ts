import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionModel } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt";
import { getUser } from "./user.services";
import config from "../config/default";
import logger from "../utils/logger";
import timer from "../utils/timer";
import errMsg from "../utils/errMsg";
import { ServerError } from "../errors/server-error";
const { start, end, responseTime } = timer;

export async function postSession(userId: string, userAgent: string) {
  start;
  try {
    const session = await Session.create({ user: userId, userAgent });
    end;
    logger.info(`POST: ${responseTime}`);
    return session.toJSON();
  } catch (e) {
    throw new ServerError(`POST ${errMsg(e)}`);
  }
}

export async function getSessions(query: FilterQuery<SessionModel>) {
  start;
  try {
    const session = Session.find(query)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`GET: ${responseTime}`);
    return session;
  } catch (e) {
    throw new ServerError(`GET ${errMsg(e)}`);
  }
}

export async function updateSession(
  query: FilterQuery<SessionModel>,
  update: UpdateQuery<SessionModel>
) {
  start;
  try {
    const session = Session.updateOne(query, update)
      .lean()
      .setOptions({ sanitizeFilter: true });
    end;
    logger.info(`UPDATE: ${responseTime}`);
    return session;
  } catch (e) {
    throw new ServerError(`UPDATE ${errMsg(e)}`);
  }
}

export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  start;
  try {
    const { decoded } = verifyJwt(refreshToken);
    if (!decoded || !get(decoded, "session")) return false;

    const session = await Session.findById(get(decoded, "session"))
      .lean()
      .setOptions({ sanitizeFilter: true });
    if (!session || !session.valid) return false;

    const user = await getUser({ _id: session.user });
    if (!user) return false;

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.accessTokenExpires }
    );
    end;
    logger.info(`REISSUE: ${responseTime}`);
    return accessToken;
  } catch (e: any) {
    throw new ServerError(`REISSUE ${errMsg(e)}`);
  }
}
