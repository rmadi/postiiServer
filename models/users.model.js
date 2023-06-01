import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isEnterprise: { type: Boolean, default: false },
    phoneNumber: {type:String, required:true, unique:true},
    myOffres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offre' }],
    IBN: {type:String, unique:true},
    CNSS: {type:String, unique:true},
    matricule: {type:String, unique:true},
    img: { type: String, required: false},
  }, 
  {timestamps: true});

export default mongoose.model("User", UserSchema);

  