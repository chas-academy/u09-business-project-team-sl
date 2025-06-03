import { Request, Response } from "express";
import fetch from "node-fetch";
import { RawgGame } from "../types/RawgGame";

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Type for search function
type RawgSearchResponse = {
  results: {
    id: number;
    name: string;
    released: string;
    background_image: string;
    platforms?: { platform: { name: string } }[];
  }[];
};

// Fetch all games (with pagination)
export const getGames = async (req: Request, res: Response): Promise<void> => {
  const page = req.query.page || 1;
  const pageSize = req.query.page_size || 10;

  try {
    const url = `${BASE_URL}/games?key=${RAWG_API_KEY}&page=${page}&page_size=${pageSize}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`RAWG API responded with status ${response.status}`);
    }

    const data = (await response.json()) as { results: RawgGame[] };

    const formattedGames = data.results.map((game) => ({
      rawgId: game.id.toString(),
      title: game.name,
      releaseDate: game.released,
      platforms: game.platforms?.map((p) => p.platform.name) || [],
      image: game.background_image,
    }));

    res.status(200).json(formattedGames);
  } catch (error) {
    console.error("RAWG API error:", error);
    res.status(500).json({ message: "Failed to fetch games from RAWG API" });
  }
};

// Fetch details for a specific game
export const getGameDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const response = await fetch(`${BASE_URL}/games/${id}?key=${RAWG_API_KEY}`);

    if (!response.ok) {
      res.status(404).json({ message: "Game not found" });
      return;
    }

    const game = (await response.json()) as RawgGame;

    const formatted = {
      rawgId: game.id.toString(),
      title: game.name,
      description:
        game.description_raw || game.description || "No description available.",
      releaseDate: game.released,
      platforms: game.platforms.map((p) => p.platform.name),
      image: game.background_image,
    };

    res.status(200).json(formatted);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch game details", error: err });
  }
};

// Search for a specific game
export const searchGames = async (
  req: Request,
  res: Response
): Promise<void> => {
  const searchQuery = req.query.search;

  if (!searchQuery || typeof searchQuery !== "string") {
    res
      .status(400)
      .json({ message: "Search query is required and must be a string" });
    return;
  }

  try {
    const url = `${BASE_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(
      searchQuery
    )}&page_size=10`;
    console.log("RAWG Search URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch search results from RAWG, status: ${response.status}`
      );
    }

    const data = (await response.json()) as RawgSearchResponse;

    console.log("RAWG Search response data:", JSON.stringify(data, null, 2));

    const results = data.results.map((game) => ({
      rawgId: game.id.toString(),
      title: game.name,
      releaseDate: game.released,
      platforms: game.platforms?.map((p) => p.platform.name) || [],
      image: game.background_image,
    }));

    res.status(200).json(results);
  } catch (error) {
    console.error("Error in searchGames:", error);
    res.status(500).json({ message: "Search failed", error });
  }
};
