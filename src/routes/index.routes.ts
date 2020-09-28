import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserByID,
  getUsers,
  updateUser,
} from "../controllers/index.controller";

const router = Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserByID);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
