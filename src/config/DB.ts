import { connect } from "mongoose"

const DBInit: () => Promise<void> = async () => {
    try {
        await connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

export default DBInit
