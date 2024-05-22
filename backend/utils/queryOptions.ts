import { QueryOptions, trusted } from "mongoose";

const lastWeek = new Date(new Date().setDate(new Date().getDate() - 7));

export default function queryOptions(
  query?: string | string[] | QueryOptions | undefined
) {
  return !query
    ? {}
    : query === "gte"
    ? { date: trusted({ $gte: lastWeek }) }
    : query === "lte"
    ? { date: trusted({ $lte: lastWeek }) }
    : { title: trusted({ $regex: query, $options: "i" }) };
}
