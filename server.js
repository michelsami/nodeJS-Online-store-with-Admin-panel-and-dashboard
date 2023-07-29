import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import {activityRouter} from "./routes/activity-router.js"

dotenv.config()
const port = process.env.PORT;
const app = express()

app.use(cors())

app.use('/activity', activityRouter)



app.listen(port, ()=>{
	console.log(`listining to localHost port ${port}`)
})