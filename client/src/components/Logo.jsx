import { TbMusicHeart } from "react-icons/tb";

const Logo = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-2">
        <TbMusicHeart className="text-green-500 text-5xl" />
        <div className="flex flex-col justify-between">
          <p className="top-0 right-0 left-0 text-3xl  text-green-500 font-bold pacifico-regular ">
            Beat Critic
          </p>
          <p className="text-gray-200 text-sm">Rate & review music</p>
        </div>
      </div>
    </div>
  );
};

export default Logo;
