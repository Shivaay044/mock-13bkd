const express = require("express")
const connection = require("./config/db")
const userRouter = require("./routes/users.route")
const blogRouter = require("./routes/blog.route")
const cors = require("cors")
const app = express()
require("dotenv").config()


app.use(cors())
app.use(express.json())








app.use("/user",userRouter)

app.use("/api",blogRouter)








app.get("/",(req,res)=>{
    res.send("<h>Hello</h1>")
})







app.listen(`${process.env.PORT}`,async()=>{
    try {
        await connection
        console.log(`connected to DB`)
    } catch (error) {
        console.log(error.message)
    }
    console.log(`server is running at ${process.env.PORT}`)
})