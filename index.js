import express from "express"
import "dotenv/config"

class Server {
    app
    port
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.middlewares()
        this.routes()
        this.connectionDB()
    }

    middlewares() {
        this.app.use(express.json())
        console.log(process.env.PORT)
    }


    routes() {
        this.app.use("/BibliotecaT/authors", authorRouter)
    }

    async connectionDB() {
        await dbConnection()
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log("Listen port " + this.port)
        })
    }
}
