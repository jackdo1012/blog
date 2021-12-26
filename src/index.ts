import appInit from "./config/app"
import middlewares from "./middlewares/index"
import routes from "./routes/index"
import DBInit from "./config/DB"

async function main() {
    const { app, server } = appInit()
    middlewares(app)
    routes(app)
    await DBInit()
}

main()
