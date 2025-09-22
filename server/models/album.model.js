import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  spotifyId: {
    type: String,
    required: true,
    unique: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  avgRating: { type: Number, default: 0 }, // New field
});

const Album = mongoose.model("Album", albumSchema);

export default Album;
