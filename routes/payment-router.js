import express from "express"
import { createActivity, getAllActivities } from "../controllers/activity-controller.js"
import { validateActivity, validateProviderId } from "../utils/validators/activity-validator.js"
export const paymentRouter = express.Router()



paymentRouter.route('/')
	.get(getAllActivities)
	.post(validateActivity, validateProviderId, createActivity)

