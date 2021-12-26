import { Schema, model } from "mongoose"

interface Post {
    title: string
    content: string
    author: string
    description: string
}

// chreate schema
const PostSchema = new Schema<Post>(
    {
        title: String,
        content: String,
        author: String,
        description: String,
    },
    {
        timestamps: true,
    }
)

// create model
const PostModel = model<Post>("Post", PostSchema, "posts")

export default PostModel
