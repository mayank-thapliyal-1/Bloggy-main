import { Schema, models, model } from "mongoose";

const BlogSchema = new Schema({
  title: String,
  userID: String,
  userName: String,
  date: Number,
  blog: [String],
  tags: [String],
  likes: [String],
  likeCount: Number,
  image: String,
  profileImage: String,
});

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
