import { useEffect, useState } from "react";
import axios from "axios";
import useSearchStore from "../utils/useSearchStore";
import AlbumCard from "../components/AlbumCard";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi";
import { MdOutlineStarRate } from "react-icons/md";
import AlbumCard2 from "../components/AlbumCard2";

function Home() {
  const query = useSearchStore((state) => state.query);

  const [albumData, setAlbumData] = useState("");
  const [recentlyReviewedAlbums, setRecentlyReviewedAlbums] = useState("");

  useEffect(() => {
    if (query) {
      const handleSearch = async () => {
        const search = query.trim().replace(/\s+/g, "+");
        const response = await axios.get(
          `http://localhost:3000/api/v1/album/?album=${search}`
        );

        console.log(response.data.result);
        setAlbumData(response.data.result);
      };

      handleSearch();
    }
  }, [query]);

  useEffect(() => {
    const recentlyReviewed = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/album/recently-rated`
      );

      console.log(response.data);
      setRecentlyReviewedAlbums(response.data);
    };

    recentlyReviewed();
  }, [query]);

  return (
    <div className=" pt-16 h-full w-full flex flex-col items-center bg-gray-950 pb-10">
      <div className="flex flex-col items-center pt-18 gap-4 mb-10">
        <h1 className="text-6xl font-bold font-sans text-gray-100">
          Rate. Discover. Own your Taste
        </h1>
        <p className="text-lg text-gray-300">
          Join our community of music lovers and share your thoughts on the
          lastest tracks
        </p>
        <div className="flex flex-row gap-4">
          <button className=" text-gray-800 flex flex-row justify-center items-center gap-3 bg-green-500 px-3 py-1 rounded-lg hover:bg-gray-800 hover:text-green-500 hover:cursor-pointer transition-colors duration-300">
            <FiSearch />
            <p className="text-lg">Explore Music</p>
          </button>
          <button className="flex flex-row justify-center items-center gap-2 bg-transparent border-2 border-green-900 text-green-900 px-3 py-1 rounded-lg">
            <MdOutlineStarRate className="text-2xl" />
            <p className="text-lg">Top Rated</p>
          </button>
        </div>
      </div>
      {recentlyReviewedAlbums && (
        <div>
          <h2 className="text-white text-2xl text-center">
            Recently Rated Albums
          </h2>
          <div className="h-full grid grid-cols-3 gap-y-4 gap-x-10 bg-gray-950">
            {recentlyReviewedAlbums.map((item) => (
              <Link key={item.id} to={`/${item.id}`}>
                <AlbumCard2 item={item} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="h-full grid grid-cols-2 gap-y-4 gap-x-10 bg-gray-950">
        {albumData &&
          albumData.map((item) => (
            <Link key={item.id} to={`/${item.id}`}>
              <AlbumCard item={item} />
            </Link>
          ))}

        {!albumData && (
          <div className="bg-gray-950 w-full h-screen    col-span-2 text-center text-xl text-gray-700 lilita-one-regular"></div>
        )}
      </div>
    </div>
  );
}

export default Home;
