import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  userID: String,
  userName: String,
  password: String,
  date: Number,
  blogs: [String],
  likes: [String],
  profileImage: String,
});

const User = models.User || model("User", UserSchema);

export default User;
