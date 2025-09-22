import axios from "axios";
import getSpotifyToken from "../utils/spotifyAuth.js";
import Album from "../models/album.model.js";
import Review from "../models/review.model.js";

export const getAllAlbums = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const searchQuery = req.query.album;

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${searchQuery}&type=album&limit=6`,

      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(token);
    return res.status(200).json({ result: response.data.albums.items });
  } catch (error) {
    console.log("Error in get single album", error);
    throw error;
  }
};

export const getsingleAlbum = async (req, res) => {
  try {
    const token = await getSpotifyToken();
    const id = req.query.albumId;

    const album = await Album.findOne({ spotifyId: id });
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${id}
`,

      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(token);

    const slimData = {
      name: response.data.name,
      id: response.data.id,
      total_tracks: response.data.total_tracks,
      release_date: response.data.release_date,
      artist_name: response.data.artists[0].name,
      albumLink: response.data.external_urls.spotify,
      image: response.data.images[1]?.url,
      avgRating: album?.avgRating,
      ratingCount: album?.reviews.length,
    };

    return res.status(200).json({ result: slimData });
  } catch (error) {
    console.log("Error in get single album", error);
    throw error;
  }
};

export const topRatedAlbums = async (req, res) => {
  try {
  } catch (error) {}
};

export const recentlyRatedAlbums = async (req, res) => {
  try {
    const recentAlbums = await Review.aggregate([
      // 1. Sort reviews by newest first
      { $sort: { createdAt: -1 } },

      // 2. Group by album while preserving the newest review's timestamp
      {
        $group: {
          _id: "$album",
          latestReviewDate: { $first: "$createdAt" }, // Keep track of when this album was last reviewed
        },
      },

      // 3. Re-sort by the review timestamp
      { $sort: { latestReviewDate: -1 } },

      // 4. Limit to 3 most recently reviewed albums
      { $limit: 3 },
    ]);

    const spotifyIds = recentAlbums.map((album) => album._id);

    // If no albums found, return empty array
    if (spotifyIds.length === 0) {
      return res.status(200).json([]);
    }

    const token = await getSpotifyToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/albums?ids=${spotifyIds.join(",")}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Combine Spotify data with review timestamps
    const albumsWithMetadata = response.data.albums.map((album, index) => ({
      ...album,
      lastReviewed: recentAlbums[index].latestReviewDate,
    }));

    res.status(200).json(albumsWithMetadata);
  } catch (error) {
    console.error("Error in recentlyRatedAlbums:", error);
    res.status(500).json({ error: "Failed to fetch recent albums" });
  }
};
