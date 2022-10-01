import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    spellname: String, 
    purpose: String,
    howToMake: String,
    effects: String,
    questions: String,
    likes: [],
    comments: [],
    image: String,
  },
  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;