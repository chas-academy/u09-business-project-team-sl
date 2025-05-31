import mongoose, { Schema, Document, Types } from "mongoose";

interface IGame {
  rawgId: string;
  title: string;
  releaseDate: string;
  platforms: string[];
  image: string;
}

export interface IList extends Document {
  title: string;
  description?: string;
  userId: Types.ObjectId;
  games: IGame[];
}

const gameSchema = new Schema<IGame>({
  rawgId: { type: String, required: true },
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  platforms: [{ type: String }],
  image: { type: String, required: true },
});

const listSchema = new Schema<IList>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  games: { type: [gameSchema], default: [] },
});

const List = mongoose.model<IList>("List", listSchema);

export default List;
