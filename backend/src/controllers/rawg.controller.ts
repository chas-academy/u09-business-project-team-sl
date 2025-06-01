import { Request, Response } from "express";
import fetch from "node-fetch";
import { RawgGame } from "../types/RawgGame";

const RAWG_API_KEY = process.env.RAWG_API_KEY;

export const getGameDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`);

    if (!response.ok) {
      return res.status(404).json({ message: "Game not found" });
    }

    const game = (await response.json()) as RawgGame;

    const formatted = {
      rawgId: game.id.toString(),
      title: game.name,
      description: game.description_raw || game.description || "No description available.",
      releaseDate: game.released,
      platforms: game.platforms.map(p => p.platform.name),
      image: game.background_image
    };

    res.status(200).json(formatted);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch game details", error: err });
  }
};
