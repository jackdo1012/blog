"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
// chreate schema
var PostSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    author: String,
    description: String,
}, {
    timestamps: true,
});
// create model
var PostModel = (0, mongoose_1.model)("Post", PostSchema, "posts");
exports.default = PostModel;
//# sourceMappingURL=Post.js.map