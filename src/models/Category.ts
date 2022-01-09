import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
});

const CategoryModel = model("Category", CategorySchema, "categories");

export default CategoryModel;
