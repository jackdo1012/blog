import express from "express";
import MainController from "../controllers/MainController";

const router = express.Router();

router.get("/", MainController.index);
router.get("/categories", MainController.category);
router.get("/category/:category", MainController.eachCategory);
router.get("/about", MainController.about);
router.get("/p/:postId", MainController.eachPost);
router.get("/new", MainController.createPost);
router.post("/new", MainController.newPost);

export default router;
