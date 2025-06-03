import { Router } from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { getGameDetails, searchGames } from "../controllers/rawg.controller";

dotenv.config();

const router = Router();
const RAWG_API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Type for game
type RawgGameListItem = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  platforms: { platform: { name: string } }[];
};

// Fetch all games (with pagination)
router.get("/games", async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = req.query.page_size || 10;

  try {
    const url = `${BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RAWG API responded with status ${response.status}`);
    }

    const data = await response.json() as { results: RawgGameListItem[] };

    const formattedGames = data.results.map(game => ({
      rawgId: game.id.toString(),
      title: game.name,
      releaseDate: game.released,
      platforms: game.platforms?.map(p => p.platform.name) || [],
      image: game.background_image,
    }));

    res.status(200).json(formattedGames);
  } catch (error) {
    console.error("RAWG API error:", error);
    res.status(500).json({ message: "Failed to fetch games from RAWG API" });
  }
});

// Fetch specific game details
router.get("/games/:id", getGameDetails);


// Search for a specific game
router.get("(games/search", searchGames);

export default router;
