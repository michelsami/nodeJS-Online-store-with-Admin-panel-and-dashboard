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
	const { activityTitle } = req.body;

	try {
		const newActivity = await activityModel.create({activityTitle});
	
		
		return res.status(200).json({message:"success",data:newActivity})

} catch (error) {
	console.log(`Error while creating activity : ${error}` )
	return res.status(400).json({message:"activity creation failed"})
}
}