import { Router } from "express";
import { createList } from "../controllers/list.controller";
import verifyToken from "../middleware/verifyToken";

const router = Router();

// Create list
router.post("/", verifyToken, createList);

export default router;
