import { Router } from "express";
import {
  getGameDetails,
  searchGames,
  getGames,
} from "../controllers/rawg.controller";

const router = Router();

// Fetch all games (with pagination)
router.get("/games", getGames);

// Fetch specific game details
router.get("/games/:id", getGameDetails);

// Search for a specific game
router.get("/games/search", searchGames);

export default router;
