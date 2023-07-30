import mongoose from "mongoose";


const activitySchema = mongoose.Schema({
	activityTitle:{
		type: String,
		required: [true, "Activity title is required"],
		minlength: [3, "Activity title is too short"],
		maxlength: [30, "Activity title is too long"],
		unique: [true, "Activity title must be unique"],
	}
})


export const activityModel =  mongoose.model('activity', activitySchema);