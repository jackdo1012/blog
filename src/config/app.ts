import express, { Application } from "express"
import { createServer, Server } from "http"
import { config as dotenvConfig } from "dotenv"

interface ResponseType {
    app: Application
    server: Server
}

const appInit: () => ResponseType = () => {
    dotenvConfig()
    const app = express()
    const server = createServer(app)
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
    })

    return { app, server }
}

export default appInit
