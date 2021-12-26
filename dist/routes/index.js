"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = __importDefault(require("./main"));
var routes = function (app) {
    app.use("/", main_1.default);
};
exports.default = routes;
//# sourceMappingURL=index.js.map