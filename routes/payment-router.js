import express from "express"
export const paymentRouter = express.Router()



paymentRouter.route('/')
	.get(getAllActivities)
	.post(validateActivity, validateProviderId, createActivity)

