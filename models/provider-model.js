import mongoose from "mongoose";

const providerSchema = mongoose.Schema({
	firstName : {type : String , required : true},
	lastName : {type : String , required : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true},
    roles : {type : String, default: 'provider'},
	contactNumber: {type: String , default : ""},
	profilePicture: {type: String , default : ""}
}
);

export const providerModel =  mongoose.model('provider', providerSchema , "providers");