import { Request, Response } from "express"
import PostModel from "../models/Post"
import { marked } from "marked"

class MainController {
    // [GET] /?page=x
    public async index(req: Request, res: Response) {
        const { page = 1 } = req.query
        const limitPerPage = 10
        const post = await PostModel.find({})
            .limit(limitPerPage)
            .skip(limitPerPage * (Number(page) - 1))
        const count = await PostModel.countDocuments()
        return res.render("index", {
            post,
            pages: Math.ceil(count / limitPerPage),
            currentPage: Number(page),
        })
    }
    // [GET] /about
    public about(_req: Request, res: Response) {
        return res.render("about")
    }
    // [GET] /p/:postId
    public async eachPost(req: Request, res: Response) {
        try {
            const { postId } = req.params
            const post = await PostModel.findById(postId)
            return res.render("eachPost", {
                title: post.title,
                content: marked.parse(post.content),
                author: post.author,
            })
        } catch (err) {
            return res.render("NotFound")
        }
    }
    // [GET] /new
    public createPost(_req: Request, res: Response) {
        return res.render("new")
    }
    // [POST] /new
    public async newPost(req: Request, res: Response) {
        const { title, content, author, description, password } = req.body
        if (password !== process.env.PASSWORD) {
            return res.redirect("/")
        }
        const newPost = new PostModel({
            title,
            content,
            author,
            description,
        })
        await newPost.save()
        return res.redirect("/")
    }
}

export default new MainController()
