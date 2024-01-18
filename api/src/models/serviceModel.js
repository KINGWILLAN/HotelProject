import { Schema, model, Types } from "mongoose";

export const pointSchema = Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: [Number],
});

const serviceSchema = new Schema(
  {
    servicePackage: { type: String, required: true },
    serviceCategory: {
      type: String,
      default: "Hotels",
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    serviceLocation: {
      city: String,
      country: String,
      state: String,
    },
    serviceExactLocation: {
      type: pointSchema,
      index: "2dsphere",
    },
    serviceDescription: { type: String, required: true },
    serviceEnvirons: [
      {
        icons: [String],
        title: String,
        evironsImage: String,
      },
    ],
    serviceOffers: [String],
    serviceReviews: {
      type: Types.ObjectId,
      ref: "review",
    },
    serviceImages: [String],
    servicePolicies: [
      {
        title: String,
        description: [String],
      },
    ],
    servicePrice: {
      type: Number,
      default: Math.floor(10000 + Math.random() * 900000),
    },
    serviceRating: {
      type: Number,
      default: Math.floor(1 + Math.random() * 4),
    },
  },
  {
    timestamps: true,
  }
);

const Service = model("Service", serviceSchema);
export default Service;
