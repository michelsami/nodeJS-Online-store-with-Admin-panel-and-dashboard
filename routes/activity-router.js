import express from "express"
import {createActivity, getAllActivities} from "../controllers/activity-controller.js"

export const activityRouter = express.Router()



activityRouter.route('/')
	.get(getAllActivities)

activityRouter.route('/create')
	.post(createActivity)
	