

import mongoose from "mongoose";


const providerSchema = mongoose.Schema({
	firstName:{
		type: String,
		trim: true,
		required: [true, "First name is required"],
		minlength: [3, "First name is too short"],
		maxlength: [50, "First name is too long"]
	}
	
	}, {
	  timestamps: true,
	}
	

);


export const providerModel =  mongoose.model('provider', providerSchema);