import express from "express";
import { login, register, createAdmin, todosUsuarios } from "../controllers/authController";
import { authMiddleware } from "../middlewares/AuthMiddleware";
import { isAdminMiddleware } from "../middlewares/IsAdminMiddleware";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/register-admin', authMiddleware, isAdminMiddleware, createAdmin);
router.get('/usuarios', authMiddleware, isAdminMiddleware, todosUsuarios)
export default router;