import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.ts";
import { rateLimitMiddleware } from "../middlewares/rate.limiters.ts";

const router = express.Router();

router.post("/", rateLimitMiddleware, createUser);
router.get("/", rateLimitMiddleware, getAllUsers);
router.get("/:id", rateLimitMiddleware, getUserById);
router.put("/:id", rateLimitMiddleware, updateUser);
router.delete("/:id", rateLimitMiddleware, deleteUser);

export default router;
