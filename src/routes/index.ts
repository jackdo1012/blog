import { Application } from "express"
import mainRouter from "./main"

const routes: (app: Application) => void = (app) => {
    app.use("/", mainRouter)
}

export default routes
