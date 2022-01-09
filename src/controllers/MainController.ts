import { Request, Response } from "express";
import PostModel from "../models/Post";
import CategoryModel from "../models/Category";
import hljs from "highlight.js";
import MarkdownIt from "markdown-it";

const markdown: MarkdownIt = MarkdownIt({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return (
                    '<pre><code class="hljs">' +
                    hljs.highlight(str, {
                        language: lang,
                        ignoreIllegals: true,
                    }).value +
                    "</code></pre>"
                );
            } catch (__) {}
        }
        return (
            '<pre><code class="hljs">' +
            hljs.highlightAuto(str).value +
            "</code></pre>"
        );
    },
});

class MainController {
    // [GET] /?page=x
    public async index(req: Request, res: Response) {
        const { page = 1 } = req.query;
        const limitPerPage = 10;
        const posts = await PostModel.find({})
            .limit(limitPerPage)
            .skip(limitPerPage * (Number(page) - 1));
        const count = await PostModel.countDocuments();
        return res.render("index", {
            posts,
            pages: Math.ceil(count / limitPerPage),
            currentPage: Number(page),
        });
    }
    // [GET] /categories
    public async category(_req: Request, res: Response) {
        const categories = await CategoryModel.find({});
        return res.render("category", {
            categories,
        });
    }
    // [GET] /category/:category
    public async eachCategory(req: Request, res: Response) {
        const { category } = req.params;
        if (!category) {
            return res.redirect("/");
        }
        const posts = await CategoryModel.findOne({ name: category }).populate(
            "posts"
        );
        if (!posts) {
            return res.redirect("/");
        }
        return res.render("eachCategory", {
            posts: posts.posts,
            category,
        });
    }
    // [GET] /about
    public about(_req: Request, res: Response) {
        return res.render("about");
    }
    // [GET] /p/:postId
    public async eachPost(req: Request, res: Response) {
        try {
            const { postId } = req.params;
            const post = await PostModel.findById(postId);
            const htmlContent = markdown.render(post.content);
            return res.render("eachPost", {
                title: post.title,
                date: post.createdAt,
                content: htmlContent,
                author: post.author,
                categories: post.category,
            });
        } catch (err) {
            return res.render("NotFound");
        }
    }
    // [GET] /new
    public createPost(_req: Request, res: Response) {
        return res.render("new");
    }
    // [POST] /new
    public async newPost(req: Request, res: Response) {
        const { title, content, author, description, password, category } =
            req.body;
        if (password !== process.env.PASSWORD) {
            return res.redirect("/");
        }
        const categories = category.split(" ");
        const newPost = new PostModel({
            title,
            content,
            author,
            description,
            category: categories,
        });
        await newPost.save();
        for (let i = 0; i < categories.length; i++) {
            const cate = await CategoryModel.findOne({ name: categories[i] });
            if (!cate) {
                const newCate = new CategoryModel({
                    name: categories[i],
                    posts: [newPost._id],
                });
                await newCate.save();
            } else {
                await CategoryModel.findOneAndUpdate(
                    { name: categories[i] },
                    { $push: { posts: newPost._id } },
                    { new: true }
                );
            }
        }
        return res.redirect("/");
    }
}

export default new MainController();
