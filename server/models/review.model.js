import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "John Doe",
      minlength: 2,
      maxlength: 30,
      trim: true, // Removes whitespace from both ends
    },
    album: {
      type: String,
      ref: "Album",
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
      set: (v) => Math.round(v * 10) / 10,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
