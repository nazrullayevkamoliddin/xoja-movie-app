import { HeroProps } from "./hero.props";
import { IMovie } from "src/interfaces/app.interface";
import { useState, useEffect } from "react";
import image_base_url from "../helpers/constanta";
import { TbPlayerPlay } from "react-icons/tb";
import Image from "next/image";
import ReactStars from "react-stars";
import { useInfoStore } from "src/store/store";

const Hero = ({ trending }: HeroProps): JSX.Element => {
  const { setModal, setMovie } = useInfoStore();
  const [movie, setMovies] = useState<IMovie>({} as IMovie);

  useEffect(() => {
    const randomMovie = trending[Math.floor(Math.random() * trending.length)];

    setMovies(randomMovie);
  }, [trending]);

  const handleCurrentMovie = () => {
    setModal(true);
    setMovie(movie);
  }

  return (
    <div className="flex flex-col space-y-4 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:center">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
        <Image
          src={`${image_base_url}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="py-[4px] px-[8px] text-center rounded-br-[10px] rounded-tl-[10px] bg-[#1d1d1d]/50 w-[111px] text-[#0FEFFD]">
        {movie?.media_type}
      </div>

      <div className="flex items-center space-x-2">
        <ReactStars
          edit={false}
          count={10}
          value={movie?.vote_average}
          color2={"#fff"}
        />
        <p>({movie?.vote_count})</p>
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
        {movie?.title ||
          movie?.name ||
          movie?.original_title ||
          movie?.original_name}
      </h1>
      <p className="max-w-xs md:max-w-lg lg:max-w-2xl text-xs text-shadow md:text-lg lg:text-2xl">
        {movie?.overview?.slice(0, 100)}...
      </p>
      <div>
        <button
          onClick={handleCurrentMovie}
          className="flex justify-center items-center space-x-2 bg-white/60 hover:bg-white/80 transition-all font-bold text-black w-[200px] h-[56px] rounded-full"
        >
          <TbPlayerPlay className="h-5 w-5 md-h8 md:w-8" />
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
