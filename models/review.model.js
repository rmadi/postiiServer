import mongoose from "mongoose";
const { Schema } = mongoose;


const newReview = new Schema({
  offreId:{
    type:String,
    required:true
  },
  userId:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  },
}, {timestamps:true}
)

export default mongoose.model("Review", newReview)