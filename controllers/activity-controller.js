import { activityModel } from "../models/activity-model.js"


export const getAllActivities = async (req, res)=>{

	const limit = req.query.limit || 2;
	const page = req.query.page || 1;
	const skip = (page - 1) * limit;
	const searchOptions = {$and: []};
	const { minPrice, maxPrice, keyword, locationCity, createdBy} = req.query;

	if (minPrice){
			const minPriceParam = {};
			minPriceParam.price = {};
			minPriceParam.price.$gte = Number(minPrice) ;
			searchOptions.$and.push(minPriceParam)
		}

	if (maxPrice){
			const maxPriceParam = {};
			maxPriceParam.price = {};
			maxPriceParam.price.$lte = Number(maxPrice) ;
			searchOptions.$and.push(maxPriceParam)
		}
	
	if (keyword){
			const keywordParam = {};
			keywordParam.$or = 
			[
				{ title: { $regex: keyword, $options: 'i' } },
				{ description: { $regex: keyword, $options: 'i' } }
			]
			searchOptions.$and.push(keywordParam)
		}

	if (locationCity){
			const locationCityParam = {};
			locationCityParam.locationCity= { $regex: locationCity, $options: 'i' } ;
			searchOptions.$and.push(locationCityParam)
		}
		
	if (createdBy){
			const createdByParam = {createdBy: createdBy};
			searchOptions.$and.push(createdByParam)
		}
	

	try {

			const allActivities = await activityModel.find(searchOptions).skip(skip).limit(limit);
			
			if(allActivities.length == 0){
			return	res.status(404).json({message:"no activities found"})
			}
			return res.status(200).json({message:"success",page : page,recordsCount : allActivities.length , data:allActivities})

	} catch (error) {
		console.log(`Error while getting all activities : ${error}` )
	}
}

export const createActivity = async(req, res) => {
	const { title , description, locationCity , date, createdBy , price} = req.body;

	try {
		const newActivity = await activityModel.create({title, description, locationCity, date, createdBy, price});
	
		
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