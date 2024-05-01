import mongoose, { Model, Document, Types } from "mongoose";



export const SubscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    config: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
    statusSub: {
      type: Boolean,
      required: true,
    },
    subExpire: {
      type: Date,
      required: true,
    },
    expireAt:{
      type: Date,
    }
  },
  { timestamps: true, collection: "subscription" }
);

export default mongoose.model('Subscription', SubscriptionSchema)