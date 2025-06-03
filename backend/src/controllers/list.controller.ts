import { Request, Response } from "express";
import fetch from "node-fetch";
import List from "../models/List";

// Type for RAWG game response
type RawgGame = {
  id: number;
  name: string;
  released: string;
  background_image: string;
  platforms?: { platform: { name: string } }[];
};

// Create list
export const createList = async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  const userId = (req as any).userId;

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  try {
    const newList = await List.create({ title, description, userId });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: "Failed to create list", error });
  }
};

// Get all lists
export const getMyLists = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;

  try {
    const lists = await List.find({ userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lists", error });
  }
};

// Get specific list
export const getListById = async (req: Request, res: Response): Promise<void> => {
  const listId = req.params.id;
  const userId = (req as any).userId;

  try {
    const list = await List.findOne({ _id: listId, userId });

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch list", error });
  }
};

// Update list
export const updateList = async (req: Request, res: Response): Promise<void> => {
  const listId = req.params.id;
  const userId = (req as any).userId;
  const { title, description } = req.body;

  try {
    // Find list with matching ID and user
    const list = await List.findOne({ _id: listId, userId });

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    // Update fields
    if (title !== undefined) list.title = title;
    if (description !== undefined) list.description = description;

    await list.save();

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Failed to update list", error });
  }
};

// Delete list
export const deleteList = async (req: Request, res: Response): Promise<void> => {
  const listId = req.params.id;
  const userId = (req as any).userId;

  try {
    const deletedList = await List.findOneAndDelete({ _id: listId, userId });

    if (!deletedList) {
      res.status(404).json({ message: "List not found or not authorized" });
      return;
    }

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete list", error });
  }
};

// Add game to list
export const addGameToList = async (req: Request, res: Response): Promise<void> => {
  const listId = req.params.id;
  const userId = (req as any).userId;
  const { rawgId } = req.body;

  if (!rawgId) {
    res.status(400).json({ message: "rawgId is required" });
    return;
  }

  try {
    const list = await List.findOne({ _id: listId, userId });
    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    const alreadyExists = list.games.some((game) => game.rawgId === rawgId.toString());
    if (alreadyExists) {
      res.status(400).json({ message: "Game already in list" });
      return;
    }

    const response = await fetch(
      `https://api.rawg.io/api/games/${rawgId}?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      res.status(502).json({ message: "Failed to fetch game from RAWG" });
      return;
    }

    const gameData = (await response.json()) as RawgGame;

    const newGame = {
      rawgId: gameData.id.toString(),
      title: gameData.name,
      releaseDate: gameData.released,
      platforms: gameData.platforms?.map((p) => p.platform.name) || [],
      image: gameData.background_image || "",
    };

    list.games.push(newGame);
    await list.save();

    res.status(200).json({ message: "Game added to list", game: newGame });
  } catch (error) {
    res.status(500).json({ message: "Failed to add game", error });
  }
};

// Remove game from list
export const removeGameFromList = async (req: Request, res: Response): Promise<void> => {
  const listId = req.params.id;
  const rawgId = req.params.rawgId;
  const userId = (req as any).userId;

  try {
    const list = await List.findOne({ _id: listId, userId });

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    const originalLength = list.games.length;
    list.games = list.games.filter((game) => game.rawgId !== rawgId);

    if (list.games.length === originalLength) {
      res.status(404).json({ message: "Game not found in list" });
      return;
    }

    await list.save();

    res.status(200).json({ message: "Game removed from list" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove game from list", error });
  }
};

