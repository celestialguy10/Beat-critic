import Album from "../models/album.model.js";
import Review from "../models/review.model.js";

export const AddReview = async (req, res) => {
  const { description, rating } = req.body;
  const spotifyId = req.query.albumId;

  if (!description) {
    return res.status(400).json({ error: "Review description is required" });
  }

  try {
    // 1. Find or create the album
    let album = await Album.findOne({ spotifyId });

    if (!album) {
      album = await Album.create({ spotifyId });
    }

    // 2. Create the review (using spotifyId as reference)
    const review = await Review.create({
      description,
      rating: Number(rating),
      album: spotifyId, // Keep using spotifyId as reference
    });

    // 3. Calculate new average
    const allReviews = await Review.find({ album: spotifyId });
    const newAvgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    // 4. Update album
    const updatedAlbum = await Album.findOneAndUpdate(
      { spotifyId },
      {
        $push: { reviews: review._id },
        $set: { avgRating: newAvgRating },
      },
      { new: true }
    );

    return res.status(201).json({
      review,
      album: {
        avgRating: updatedAlbum.avgRating,
        reviewCount: updatedAlbum.reviews.length,
      },
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({
      error: "Failed to add review",
      details: error.message,
    });
  }
};

export const GetReviews = async (req, res) => {
  const spotifyId = req.query.albumId;

  try {
    const album = await Album.findOne({ spotifyId }).populate("reviews").exec();

    return res.status(200).json(album);
  } catch (error) {
    console.log(error);
  }
};
