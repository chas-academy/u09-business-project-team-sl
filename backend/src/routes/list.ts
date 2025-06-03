import { Router } from "express";
import {
  createList,
  getMyLists,
  getListById,
  updateList,
  deleteList,
  addGameToList,
  removeGameFromList
} from "../controllers/list.controller";
import verifyToken from "../middleware/verifyToken";

const router = Router();

// Routes
router.post("/", verifyToken, createList);
router.get("/", verifyToken, getMyLists);
router.get("/:id", verifyToken, getListById);
router.put("/:id", verifyToken, updateList);
router.delete("/:id", verifyToken, deleteList);
router.post("/:id/add-game", verifyToken, addGameToList);
router.delete("/:id/games/:rawgId", verifyToken, removeGameFromList);

export default router;
