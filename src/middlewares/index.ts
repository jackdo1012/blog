import express, { Application } from "express";
import cors from "cors";
import path from "path";
import methodOverride from "method-override";
import morgan from "morgan";

const middlewares: (app: Application) => void = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(morgan("tiny"));
  app.use(express.static(path.join(__dirname, "../public")));
  app.use(methodOverride("_method"));
  app.set("views", path.join(__dirname, "../views"));
  app.set("view engine", "ejs");
};

export default middlewares;
