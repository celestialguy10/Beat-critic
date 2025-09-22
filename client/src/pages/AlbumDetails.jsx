import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { usePalette } from "react-palette";
import axios from "axios";
import { useEffect } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdStarOutline } from "react-icons/io";

import avatar from "../assets/avatar.png";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState("");
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(0);
  const [albumReviews, setAlbumReviews] = useState("");
  const [releaseYear, setReleaseYear] = useState("");

  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/review?albumId=${albumId}`
      );
      setAlbumReviews(response.data?.reviews || null);
    };

    getReviews();
  }, []);

  useEffect(() => {
    const getAlbumDataById = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/album/details?albumId=${albumId}`
      );
      const year = response.data.result.release_date.split("-")[0];
      setReleaseYear(year);
      console.log(response.data.result);
      setAlbumData(response.data.result);
    };

    getAlbumDataById();
  }, []);

  const handlueSubmit = async () => {
    try {
      const newRating = Number(ratings);
      const response = await axios.post(
        `http://localhost:3000/api/v1/review?albumId=${albumId}`,
        {
          description: review,
          rating: newRating,
        }
      );

      console.log(response.data);
      setRatings(0);
      setReview("");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="bg-gray-950 h-max">
      <div className="pt-32 mx-20 flex flex-row gap-8">
        <div className="bg-gray-800 py-6 w-[350px] flex flex-col h-full ml-10 border-1 rounded-2xl gap-4">
          <div className="px-12">
            <img
              src={albumData.image}
              alt=""
              className="h-[250px] rounded-xl"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-center text-2xl font-bold line-clamp-2 px-2 text-white">
              {albumData.name}
            </h1>
            <p className=" text-xl font-[400] text-green-600">
              {albumData.artist_name}
            </p>

            <div className="flex flex-row gap-4">
              <p className="text-sm text-gray-400 font-sans">
                {albumData.total_tracks} tracks
              </p>
              <p className="text-sm text-gray-400 font-sans">{releaseYear}</p>
            </div>
            {albumData?.avgRating && (
              <div className="flex flex-row">
                <IoMdStarOutline className="ml-3 text-2xl text-green-700" />
                <p className="text-green-700 flex flex-row">
                  {albumData.avgRating?.toFixed(1)} (Based on{" "}
                  {albumData.ratingCount} reviews)
                </p>
              </div>
            )}
            <button className=" text-gray-800 flex flex-row justify-center items-center gap-3 bg-green-500 px-3 py-1 rounded-lg hover:bg-green-800 hover:text-gray-200 hover:cursor-pointer transition-colors duration-300 mt-2">
              <CiHeart className="text-xl" />
              <p className="text-lg">Add to Favourites</p>
            </button>
            <Link
              to={albumData.albumLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200"
            >
              Listen on Spotify
            </Link>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-8">
          <div className="bg-gray-800 border-1 rounded-2xl p-6 flex flex-col gap-1 items-start">
            <h2 className="text-2xl font-bold text-gray-100">
              Rate this album
            </h2>
            <p className="text-gray-300">Share your thougts about the music!</p>
            <p className="mt-10 text-gray-100">Write a Review:</p>
            <textarea
              rows="5"
              className="rounded-md w-[100%] p-2 border-1 border-[#aaa] text-gray-300 resize-y text-lg"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex flex-row gap-4 mt-2">
              <p className="text-gray-200 text-lg">
                Your Raiting (from 1 to 10):
              </p>
              <input
                type="number"
                placeholder="Enter a number"
                value={ratings}
                min="0"
                max="10"
                onChange={(e) => setRatings(Number(e.target.value))}
                className="text-white"
              />
            </div>
            <button
              className=" text-gray-800 flex flex-row justify-center items-center gap-3 bg-green-500 px-3 py-1 rounded-lg hover:bg-green-200 hover:text-gray-800 hover:cursor-pointer transition-colors duration-300 mt-2"
              onClick={handlueSubmit}
            >
              <p className="text-lg">Submit Review</p>
            </button>
          </div>
          <div className="border-1 rounded-2xl p-6 flex flex-col gap-1 items-start bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-100">User Reviews</h2>
            <p className="text-gray-300">What the community is saying!</p>{" "}
            {albumReviews &&
              albumReviews.map((item) => (
                <div className="flex flex-col mt-7" key={item._id}>
                  <div className="flex flex-row gap-4 ">
                    <img src={avatar} alt="" className="h-12 mt-1" />
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-row items-center ">
                        <p className="text-green-500 text-lg font-[400]">
                          {item.name}
                        </p>
                        <IoMdStarOutline className="ml-3 text-2xl text-green-700" />
                        <p className="text-gray-300">{item.rating}</p>
                      </div>

                      <p className="text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetails;
