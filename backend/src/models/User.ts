import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function (this: any) {
      return this.authProvider === "local";
    },
    select: false, // inte inkludera i vanliga queries
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;

