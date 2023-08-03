import moment from 'moment';
import * as zod from 'zod';
import { providerModel } from '../../models/provider-model.js';




const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const createActivitySchema = zod.object({
	title: zod.string().min(2).max(50),
	price: zod.number().positive(),
	description: zod.string().min(10).max(500),
	date: zod.date(),
	locationCity: zod.string().min(1).max(100),
	createdBy: zod.string().regex(objectIdRegex),
	rating: zod.number().min(1).max(5).optional(),
	reviews: zod.array(zod.string().max(500)).optional(),
	shortDescription: zod.string().max(100).optional(),
	whatsIncluded: zod.array(zod.string().max(100)).optional(),
	activityAvailable: zod.boolean().optional(),
  });
  
  const updateActivitySchema = zod.object({
	title: zod.string().min(2).max(50),
	description: zod.string().min(10).max(500),
	date: zod.date(),
	locationCity: zod.string().min(1).max(100),
	
	rating: zod.number().min(1).max(5).optional(),
	reviews: zod.array(zod.string().max(500)).optional(),
	shortDescription: zod.string().max(100).optional(),
	whatsIncluded: zod.array(zod.string().max(100)).optional(),
	activityAvailable: zod.boolean().optional(),
  });
export const validateActivity = (req, res, next) => {

	
	try {
		const { date , ...rest} = req.body;	
		const parsedDate = moment(date).toDate();
		const validationPassed =  createActivitySchema.parse({ ...rest, date: parsedDate });
	
		next()

	} catch (err) {
		return res.status(400).json({ message: err});
	// 	if (err instanceof zod.ZodError) {
	// 	const validationErrors = err.errors.map(err => {
			
	// 		return err.message
	// 	});
		
	// 	return res.status(400).json({ message: 
	// 		 validationErrors.join(', ')
	// 	 });
	//   }
}
  };

export const validateUpdateActivity = (req, res, next) => {

	
	try {
		const { date , ...rest} = req.body;	
		const parsedDate = moment(date).toDate();
		const validationPassed =  updateActivitySchema.parse({ ...rest, date: parsedDate });
	
		next()

	} catch (err) {
		return res.status(400).json({ message: err});
	// 	if (err instanceof zod.ZodError) {
	// 	const validationErrors = err.errors.map(err => {
			
	// 		return err.message
	// 	});
		
	// 	return res.status(400).json({ message: 
	// 		 validationErrors.join(', ')
	// 	 });
	//   }
}
  };
export const validateProviderId = async(req, res, next) => {
	try {
		const {createdBy} = req.body;
		
		const providerExists = await providerModel.findById(createdBy);
		if(!providerExists) {
			return res.status(400).json({ message: "There is no provider with that id." });
		}
		next();
	} catch (error) {
		return res.status(400).json({ message: error});
	}
}


export const validateIfMongoIdInParams = async(req, res, next) => {
	try {
		const isMongoDBId = req.params.activityId;
	
		if (objectIdRegex.test(isMongoDBId) == false){
			return res.status(400).json({ message: 'there is no record with that id'});
		}
		next();
	} catch (error) {
		return res.status(400).json({ message: error});
	}
}