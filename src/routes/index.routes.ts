import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserByID,
  getUsers,
  updateUser,
} from "../controllers/index.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
