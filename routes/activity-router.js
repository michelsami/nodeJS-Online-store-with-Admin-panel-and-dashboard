import express from "express"
import {getAllActivities} from "../controllers/activity-controller.js"

export const activityRouter = express.Router()



activityRouter.route('/')
	.get(getAllActivities)
	