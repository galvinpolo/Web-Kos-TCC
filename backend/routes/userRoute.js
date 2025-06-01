import express from "express";
import {
  getUsers,
  getUserById,
  registerHandler,
  loginHandler,
  logout,
} from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Route untuk mendapatkan semua user
router.get("/users", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", verifyToken, logout);

export default router;
