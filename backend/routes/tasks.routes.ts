import express from "express";
import controllers from "../controllers/tasks.controllers";
import requireUser from "../middleware/requireUser";
import { Schemas, Validate } from "../middleware/joi";
const router = express.Router();

router.get("/tasks", requireUser, controllers.getTask);
router.get("/tasks/:id", requireUser, controllers.getOneTask);
router.post(
  "/tasks",
  [requireUser, Validate(Schemas.data.create)],
  controllers.postTask
);
router.put(
  "/tasks/:id",
  [requireUser, Validate(Schemas.data.create)],
  controllers.putTask
);
router.delete("/tasks", requireUser, controllers.deleteTasks);
router.delete("/tasks/:id", requireUser, controllers.deleteTask);

export = router;
