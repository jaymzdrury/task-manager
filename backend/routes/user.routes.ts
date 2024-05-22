import express from "express";
import controllers from "../controllers/user.controllers";
import { Schemas, Validate } from "../middleware/joi";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.get("/user", requireUser, controllers.getUser);
router.post("/user/signup", Validate(Schemas.user.create), controllers.signUp);
router.put(
  "/user/:id",
  [requireUser, Validate(Schemas.user.create)],
  controllers.editUser
);
router.put(
  "/user/clock/:id",
  [requireUser, Validate(Schemas.user.edit)],
  controllers.editUserClockIn
);

export = router;
