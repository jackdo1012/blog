"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var MainController_1 = __importDefault(require("../controllers/MainController"));
var router = express_1.default.Router();
router.get("/", MainController_1.default.index);
router.get("/about", MainController_1.default.about);
router.get("/p/:postId", MainController_1.default.eachPost);
router.get("/new", MainController_1.default.createPost);
router.post("/new", MainController_1.default.newPost);
exports.default = router;
//# sourceMappingURL=main.js.map