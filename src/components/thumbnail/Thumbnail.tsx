import Image from "next/image";
import image_base_url from "../helpers/constanta";
import { ThumbnailProps } from "./thumbnail.props";
import ReactStars from "react-stars";
import { useInfoStore } from "src/store/store";

const Thumbnail = ({ movie, isBig = false }: ThumbnailProps) => {
  const { setModal, setMovie } = useInfoStore();

  const handleCurrentMovie = () => {
    setModal(true);
    setMovie(movie);
  };

  return (
    <div
      onClick={handleCurrentMovie}
      className={`relative ${
        isBig
          ? "h-[400px] md:h-[500px]  md:min-w-[470px] min-w-[350px] "
          : "h-[330px] md:h-[440px]  md:min-w-[292px] min-w-[200px] "
      } cursor-pointer transition duration-200 ease-out md:hover:scale-110`}
    >
      <Image
        src={`${image_base_url}${movie?.backdrop_path || movie?.poster_path}`}
        alt={movie.title}
        fill
        className="rounded-sm md:rounded object-cover"
      />
      <div className="absolute left-0 right-0 botom-0 bg-black/40 w-full h-full" />
      <div className="absolute bottom-7 left-4 right-2">
        <div className="flex items-center space-x-2">
          <ReactStars
            edit={false}
            count={10}
            value={movie?.vote_average}
            color2={"#fff"}
          />
          <p>({movie?.vote_count})</p>
        </div>
        <h1 className="text-xl font-bold md:text-2xl">
          {movie?.title ||
            movie?.name ||
            movie?.original_title ||
            movie?.original_name}
        </h1>
      </div>
    </div>
  );
};

export default Thumbnail;
