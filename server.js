import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import {activityRouter} from "./routes/activity-router.js"
import { connectionDB } from "./config/database-connection.js"



dotenv.config()

connectionDB()
const port = process.env.PORT;
const app = express()
app.use(express.json())
app.use(cors())

app.use('/activity', activityRouter)



app.listen(port, ()=>{
	console.log(`listining to localHost port ${port}`)
})