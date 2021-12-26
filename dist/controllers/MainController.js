"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Post_1 = __importDefault(require("../models/Post"));
var marked_1 = require("marked");
var MainController = /** @class */ (function () {
    function MainController() {
    }
    // [GET] /?page=x
    MainController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, limitPerPage, post, count;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query.page, page = _a === void 0 ? 1 : _a;
                        limitPerPage = 10;
                        return [4 /*yield*/, Post_1.default.find({})
                                .limit(limitPerPage)
                                .skip(limitPerPage * (Number(page) - 1))];
                    case 1:
                        post = _b.sent();
                        return [4 /*yield*/, Post_1.default.countDocuments()];
                    case 2:
                        count = _b.sent();
                        return [2 /*return*/, res.render("index", {
                                post: post,
                                pages: Math.ceil(count / limitPerPage),
                                currentPage: Number(page),
                            })];
                }
            });
        });
    };
    // [GET] /about
    MainController.prototype.about = function (_req, res) {
        return res.render("about");
    };
    // [GET] /p/:postId
    MainController.prototype.eachPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var postId, post, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        postId = req.params.postId;
                        return [4 /*yield*/, Post_1.default.findById(postId)];
                    case 1:
                        post = _a.sent();
                        return [2 /*return*/, res.render("eachPost", {
                                title: post.title,
                                content: marked_1.marked.parse(post.content),
                                author: post.author,
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.render("NotFound")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // [GET] /new
    MainController.prototype.createPost = function (_req, res) {
        return res.render("new");
    };
    // [POST] /new
    MainController.prototype.newPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, content, author, description, password, newPost;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, content = _a.content, author = _a.author, description = _a.description, password = _a.password;
                        if (password !== process.env.PASSWORD) {
                            console.log(password);
                            console.log(process.env.PASSWORD);
                            return [2 /*return*/, res.redirect("/")];
                        }
                        newPost = new Post_1.default({
                            title: title,
                            content: content,
                            author: author,
                            description: description,
                        });
                        return [4 /*yield*/, newPost.save()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, res.redirect("/")];
                }
            });
        });
    };
    return MainController;
}());
exports.default = new MainController();
//# sourceMappingURL=MainController.js.map