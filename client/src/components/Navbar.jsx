import { Link } from "react-router";
import Logo from "./Logo";
import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";

import useSearchStore from "../utils/useSearchStore";
import { RxAvatar } from "react-icons/rx";

const Navbar = () => {
  const [input, setInput] = useState("");
  const setQuery = useSearchStore((state) => state.setQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input); // Just set the query
  };

  return (
    <nav className="z-20 fixed h-[80px] bg-stone-900 w-full flex justify-between items-center px-10">
      <Link to="/">
        <Logo />
      </Link>
      <div className=" flex flex-row relative ">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-[350px] px-8 outline-1 h-10 outline-gray-400 text-gray-400 rounded-lg  relative"
          />
          <div
            style={{
              contentVisibility: input == "" ? "visible" : "hidden",
            }}
            className="absolute left-0 bottom-[50%] translate-y-[50%] flex flex-row justify-center items-center gap-2 px-2 pointer-events-none "
          >
            <IoSearchOutline className="text-lg  text-gray-400" />
            <p className=" text-gray-400">Search albums, songs or artists...</p>
          </div>
        </form>
      </div>
      <div className="flex flex-row gap-8">
        <Link to="/favourites" className="flex flex-row gap-2 items-center">
          <CiHeart className="text-lg text-gray-200" />
          <p className="text-gray-200 text-lg">Favourites</p>
        </Link>
        <div className="flex flex-row gap-2 items-center">
          <RxAvatar className="text-lg text-gray-200" />
          <p className="text-gray-200 text-lg">Profile</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
