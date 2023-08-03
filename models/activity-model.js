import mongoose from "mongoose";


const activitySchema = mongoose.Schema({
	title:{
		type: String,
		trim: true,
		required: [true, "Activity title is required"],
		minlength: [3, "Activity title is too short"],
		maxlength: [50, "Activity title is too long"]
	}, 
	price:{
		type: Number,
		trim: true,
		required: [true, "Price is required"],
	}, 
	description: {
		type: String,
		required: [true, 'Please enter a description for the activity'],
		trim: true,
		maxlength: [500, 'Description cannot be more than 500 characters'],
	  },
	  shortDescription: {
		type: String,
		trim: true,
		maxlength: [100, 'Short description cannot be more than 100 characters'],
	  },
	  date: {
		type: Date,
		required: [true, 'Please enter a date for the activity'],
	  },
	  locationCity: {
		type: String,
		required: [true, 'Please enter a location for the activity'],
		trim: true,
		maxlength: [100, 'Location cannot be more than 100 characters'],
	  },
	  createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'providers',
		required: [true, 'Please specify the user who created the activity'],
	  },
	  rating: {
		type: Number,
		min: [1, 'Rating must be at least 1'],
		max: [5, 'Rating cannot be more than 5'],
	  },
	  rating: {
		type: Number,
		min: [1, 'Rating must be at least 1'],
		max: [5, 'Rating cannot be more than 5'],
	  },
	  reviews: [{
		type: String,
		maxlength: [500, 'Review cannot be more than 500 characters'],
	  }],
	
	  whatsIncluded: [{
		type: String,
		trim: true,
		maxlength: [100, 'Included item cannot be more than 100 characters'],
	  }],
	  activityAvailable: {
		type: Boolean,
		default: true,
	  },
	}, {
	  timestamps: true,
	}
	

)


export const activityModel =  mongoose.model('activity', activitySchema);

