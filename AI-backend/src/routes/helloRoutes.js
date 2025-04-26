import express from "express";
import { sayHello } from "../controllers/helloController.js";

const router = express.Router();

// Định nghĩa route GET /helloworld
router.get("/helloworld", sayHello);

export default router;