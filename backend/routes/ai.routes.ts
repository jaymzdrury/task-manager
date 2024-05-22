import express from "express";
import controllers from "../controllers/ai.controllers";
import requireUser from "../middleware/requireUser";
import { Schemas, Validate } from "../middleware/joi";
const router = express.Router();

router.post(
  "/ai",
  [requireUser, Validate(Schemas.data.prompt)],
  controllers.postAI
);

export = router;
