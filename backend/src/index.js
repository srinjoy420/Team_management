import express from "express"
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import cors from "cors"
import ConnecctDb from "./seeders/indexDB.js"

dotenv.config()

const app = express()
const PORT=process.env.PORT
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{
    res.send("hello")
})
ConnecctDb()
app.listen(PORT,()=>{
    console.log("server is running on port",PORT);
    
})
