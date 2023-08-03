import mongoose, { Schema as _Schema, model } from "mongoose";
import { compare } from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      require: true,
      trim: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      require: true,
    },
    token: [{ type: Object }],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
userSchema.method({
  async authenticate(password) {
    return compare(password, this.hash_password);
  },
});

const User = mongoose.model("User", userSchema);
export default User;


// export const logoutModel = async (req, res, callback)=>{
//   let sess = req.session.user
//   if(sess){
//     return callback(null, {'success': true, "message": "user logout successfully"});
//   }
//   callback(null, {'success': true, "message": "user logout successfully"});
// }

// logout.prototype.logoutUser = function(req, res, callback){
//   var sess = req.session.user;
//   if(sess){
//       req.session.user = null;
//       return callback(null, {'success': true, "message": "user logout successfully"});
//   }
//   callback(null, {'success': true, "message": "user logout successfully"});
// }