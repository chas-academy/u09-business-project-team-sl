import { Router } from "express";
import {
  createList,
  getMyLists,
  getListById,
  updateList,
  deleteList
} from "../controllers/list.controller";
import verifyToken from "../middleware/verifyToken";

const router = Router();

// Create list
router.post("/", verifyToken, createList);
router.get("/", verifyToken, getMyLists);
router.get("/:id", verifyToken, getListById);
router.put("/:id", verifyToken, updateList);
router.delete("/:id", verifyToken, deleteList);

export default router;
