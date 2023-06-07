import mongoose from "mongoose";
const { Schema } = mongoose;


const newOffre = new Schema({
    userId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      Description:{
          type:String,
          required:true
      },
      category: {
        type: String,
        required: true,
      },
    deadLine:{
        type: Number,
        required: true,
    },
    prix:{
        type:String,
        required:true
    },
    images: {
      type: [String],
      required: false,
    },
     cover: {
      type: String,
      // required: true,
    },
    proposals: [{
      enterpriseId: String,
      price: Number
  }],  
  comments: [{
    enterpriseId: String,
    desc: String
}], 
user: {
  type :Object
}

    }
, {timestamps:true}
)



export default mongoose.model("offre", newOffre)