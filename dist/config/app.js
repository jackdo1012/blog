"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var dotenv_1 = require("dotenv");
var appInit = function () {
    (0, dotenv_1.config)();
    var app = (0, express_1.default)();
    var server = (0, http_1.createServer)(app);
    server.listen(process.env.PORT, function () {
        console.log("Server is running on port ".concat(process.env.PORT));
    });
    return { app: app, server: server };
};
exports.default = appInit;
//# sourceMappingURL=app.js.map