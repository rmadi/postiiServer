import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const newPropostion = new Schema({
    offreId: {
        type: String,
        required: true,
      },
      sellerId: {
        type: String,
        required: true,
      },
      buyerId: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        default: false,
      },
    prix:{type:String, required:true},
    msg:{type:String}
}, {timestamps:true}
);

export default mongoose.model("Proposition",newPropostion)