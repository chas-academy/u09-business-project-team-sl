import { Router } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { getGameDetails } from "../controllers/rawg.controller";

dotenv.config();

const router = Router();
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// fetch all games
router.get("/games", async (_req, res) => {
  try {
    const url = `${BASE_URL}/games?key=${RAWG_API_KEY}&page_size=10`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RAWG API responded with status ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("RAWG API error:", error);
    res.status(500).json({ message: "Failed to fetch games from RAWG API" });
  }
});

// fetch specific game
router.get("/games/:id", getGameDetails);

export default router;
