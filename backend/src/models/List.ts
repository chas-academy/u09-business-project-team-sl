import mongoose, { Schema, Document, Types } from "mongoose";

export interface IList extends Document {
  title: string;
  description?: string;
  userId: Types.ObjectId;
}

const listSchema = new Schema<IList>({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const List = mongoose.model<IList>("List", listSchema);

export default List;
