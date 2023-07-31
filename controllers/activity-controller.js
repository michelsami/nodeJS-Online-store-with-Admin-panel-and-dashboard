import { activityModel } from "../models/activity-model.js"


export const getAllActivities = async (req, res)=>{

	try {
			const allActivities = await activityModel.find();
			
			if(allActivities.length == 0){
			return	res.status(404).json({message:"no activities found"})
			}
			return res.status(200).json({message:"success",data:allActivities})

	} catch (error) {
		console.log(`Error while getting all activities : ${error}` )
	}
}

export const createActivity = async(req, res) => {
	const { title , description, locationCity , date, createdBy} = req.body;

	try {
		const newActivity = await activityModel.create({title, description, locationCity, date, createdBy});
	
		
		return res.status(200).json({message:"success",data:newActivity})

} catch (error) {
	console.log(`Error while creating activity : ${error}` )
	return res.status(400).json({message:error})
}
}

export const getActivityByIdInParams = async(req, res) => {
	const { activityId } = req.params;

	try {
		const activityFound = await activityModel.findById(activityId);		
		
		if(!activityFound) {
			return res.status(400).json({ message: "There is no activity with that id." });
		}
		return res.status(200).json({message:"success",data:activityFound})
} catch (error) {
	console.log(`Error while finding activity : ${error}` )
	return res.status(400).json({message:error})
}
}

export const deleteActivityByIdInParams = async(req, res) => {
	const { activityId } = req.params;

	try {
		const activityFound = await activityModel.findByIdAndDelete(activityId);		
		
		if(!activityFound) {
			return res.status(400).json({ message: "There is no activity with that id." });
		}
		return res.status(204)
} catch (error) {
	console.log(`Error while deleting activity : ${error}` )
	return res.status(400).json({message:error})
}
}

export const updateActivityByIdInParams = async(req, res) => {
	const { activityId } = req.params;
	const {  title , description, locationCity , date } = req.body;

	try {
		const newActivity = await activityModel.findByIdAndUpdate(activityId, {
			title , description, locationCity , date 
		  }, { new: true });		
		
		if(!newActivity) {
			return res.status(400).json({ message: "There is no activity with that id." });
		}
		return res.status(201).json({ status : "success", message: newActivity});
} catch (error) {
	console.log(`Error while updating activity : ${error}` )
	return res.status(400).json({message:error})
}
}