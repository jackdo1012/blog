import mongoose from "mongoose"

const DBInit: () => Promise<void> = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
    }
}

export default DBInit
