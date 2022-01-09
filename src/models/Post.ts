import { Schema, model } from "mongoose";

// chreate schema
const PostSchema = new Schema(
    {
        title: String,
        content: String,
        author: String,
        description: String,
        category: [String],
    },
    {
        timestamps: true,
    }
);

// create model
const PostModel = model("Post", PostSchema, "posts");

export default PostModel;
