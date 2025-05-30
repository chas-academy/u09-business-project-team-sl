import { Request, Response } from "express";
import List from "../models/List";

export const createList = async (req: Request, res: Response) => {
  const { title } = req.body;
  const userId = (req as any).userId; // Etract from token later

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const newList = await List.create({ title, userId });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ message: "Failed to create list", error });
  }
};
