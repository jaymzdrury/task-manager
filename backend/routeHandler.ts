import { Application } from "express";
import userRoutes from "./routes/user.routes";
import sessionRoutes from "./routes/session.routes";
import tasksRoutes from "./routes/tasks.routes";
import apiRoutes from "./routes/ai.routes";

function routeHandler(app: Application) {
  app.use("/", tasksRoutes);
  app.use("/", userRoutes);
  app.use("/", sessionRoutes);
  app.use("/", apiRoutes);
}

export default routeHandler;
