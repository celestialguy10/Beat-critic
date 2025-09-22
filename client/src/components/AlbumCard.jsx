import { usePalette } from "react-palette";

const AlbumCard = ({ item }) => {
  const imageUrl = item?.images[0]?.url;
  const { data: palette } = usePalette(imageUrl || "");
  return (
    <div className="">
      <div
        className="mt-5 flex flex-row gap-4 rounded-2xl shadow-lg shadow-gray-800 w-[550px] bg-gray-300 hover:scale-105 transition-transform duration-300 hover:cursor-pointer
          "
      >
        <img
          src={item.images[0].url}
          alt=""
          className="rounded-l-2xl h-[300px] shadow-sm object-contain"
        />
        <div className="flex flex-col gap-1">
          <div className="flex flex-col text-xl lilita-one-regular mt-2 text-gray-900">
            <h2 className="" style={{ color: palette.darkVibrant || "#000" }}>
              Album name:
            </h2>
            <p
              className=" line-clamp-2 lilita-one-regular"
              style={{ color: palette.darkMuted || "#000" }}
            >
              {item.name}
            </p>
          </div>
          <div className="flex flex-col text-xl mt-2 text-gray-900 lilita-one-regular">
            <h2 className="" style={{ color: palette.darkVibrant || "#000" }}>
              Artist:
            </h2>
            <p
              className="text-gray-500 lilita-one-regular"
              style={{ color: palette.darkMuted || "#000" }}
            >
              {item.artists[0].name}
            </p>
          </div>
          <div className="lilita-one-regular flex flex-col gap-1 text-xl mt-2 text-gray-900">
            <h2 className="" style={{ color: palette.darkVibrant || "#000" }}>
              Release Date:
            </h2>
            <p
              className="text-gray-500"
              style={{ color: palette.darkMuted || "#000" }}
            >
              {item.release_date}
            </p>
          </div>
          <div className="lilita-one-regular flex flex-row gap-1 text-lg mt-2 text-gray-900">
            <h2 className="" style={{ color: palette.darkVibrant || "#000" }}>
              Tracks:
            </h2>
            <p
              className="text-gray-500"
              style={{ color: palette.darkMuted || "#000" }}
            >
              {item.total_tracks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
