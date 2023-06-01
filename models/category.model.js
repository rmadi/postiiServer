import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema({
  categoryId:{
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'mobile development', 'hardware', 'industry']
  },
}, { timestamps: true })

export default mongoose.model("Category", CategorySchema);
