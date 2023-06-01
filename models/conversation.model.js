import mongoose from "mongoose";
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    entrepriseId: {
      type: String,
      required: true,
    },
    clientId: {
      type: String,
      required: true,
    },
    readEntreprise: {
      type: Boolean,
      required: true,
    },
    readByClient: {
      type: Boolean,
      required: true,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", ConversationSchema);
