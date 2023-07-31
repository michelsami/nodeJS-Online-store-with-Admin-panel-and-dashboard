import express from "express"
import {createActivity, deleteActivityByIdInParams, getActivityByIdInParams, getAllActivities, updateActivityByIdInParams} from "../controllers/activity-controller.js"
import { validateActivity, validateIfMongoIdInParams, validateProviderId, validateUpdateActivity } from "../utils/validators/activity-validator.js"

export const activityRouter = express.Router()



activityRouter.route('/')
	.get(getAllActivities)
	.post(validateActivity, validateProviderId, createActivity)

activityRouter.route('/:activityId')
	.get(validateIfMongoIdInParams, getActivityByIdInParams)
	.delete(validateIfMongoIdInParams, deleteActivityByIdInParams)
	.put(validateIfMongoIdInParams, validateUpdateActivity, updateActivityByIdInParams)