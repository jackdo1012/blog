"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var method_override_1 = __importDefault(require("method-override"));
var middlewares = function (app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)({ origin: process.env.CORS_ORIGIN }));
    app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
    app.use((0, method_override_1.default)("_method"));
    app.set("views", path_1.default.join(__dirname, "../views"));
    app.set("view engine", "ejs");
};
exports.default = middlewares;
//# sourceMappingURL=index.js.map