import { Request, Response } from "express";
import List from "../models/List";

// Create list
export const createList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description } = req.body;
  const userId = (req as any).userId; // Extract from token later

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  try {
    const newList = await List.create({ title, description, userId });
    res.status(201).json(newList);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to create list", error });
    return;
  }
};

// Get all lists
export const getMyLists = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = (req as any).userId;

  try {
    const lists = await List.find({ userId });
    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lists", error });
  }
};

// Get specific list
export const getListById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const listId = req.params.id;
  const userId = (req as any).userId;

  try {
    const list = await List.findOne({ _id: listId, userId });

    if (!list) {
      res.status(404).json({ message: "List not found" });
      return;
    }

    res.status(200).json({
      title: list.title,
      description: list.description,
      games: [], // implement from API later
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch list", error });
  }
};

// Update list
export const updateList = async (
  req: Request,
  res: Response
): Promise<void> => {
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
