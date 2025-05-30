import { Request, Response } from "express";
import List from "../models/List";

export const createList = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  const userId = (req as any).userId; // Extract from token later

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  try {
    const newList = await List.create({ title, userId });
    res.status(201).json(newList);
    return;
  } catch (error) {
    res.status(500).json({ message: "Failed to create list", error });
    return;
  }
};
