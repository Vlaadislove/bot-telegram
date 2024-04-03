import mongoose, { Model, Document, Types } from "mongoose";



export const UserSchema = new mongoose.Schema(
    {
      userId: {
        type: Number,
        required: true,
      },
      inviteId: {
        type: Number,
      },
      username: {
        type: String,
        required: true,
      },
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
    },
    { timestamps: true, collection: "users" }
  );

export default mongoose.model('Session', UserSchema)