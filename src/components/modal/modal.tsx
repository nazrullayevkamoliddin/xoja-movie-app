import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store/store";
import { FaPause, FaPlay, FaTimes } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { Element } from "src/interfaces/app.interface";
import ReactPlayer from "react-player";
import { BiPlus, BiVolumeMute, BiVolumeLow } from "react-icons/bi";
import { AiOutlineCloseCircle, AiOutlineLike } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { AuthContext } from "src/context/auth.context";
import { useRouter } from "next/router";
import { Button, IconButton, Snackbar } from "@mui/material";

const Modal = () => {
  const { modal, setModal, movie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");
  const [muted, setMuted] = useState<boolean>(true);
  const [playing, setPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const {user} = useContext(AuthContext);
  const router = useRouter();


  const handleCloseS = (event: React.SyntheticEvent | Event, reason?:string) => {
    if(reason === 'clickaway'){
      return;
    };

    setOpen(false)
  }

  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

  const api = `${base_url}/${movie?.media_type === "tv" ? "tv" : "movie"}/${
    movie.id
  }/videos?api_key=${api_key}&language=en-US`;

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());

      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index].key);
      }
    };

    console.log(trailer);
    fetchVideoData();

    // eslint-disable-next-line
  }, [movie]);

  const AddProductList = async() => {
    setIsLoading(true)
    try {
      
      await addDoc(collection(db, 'list'), {
        userId: user?.uid,
        list: movie,
      });
     setIsLoading(false)
     router.replace(router.asPath)
     setOpen(true);
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const action = (
    <>
      <IconButton size='small' aria-label='close' color='inherit' onClick={handleCloseS}>
        <AiOutlineCloseCircle className="w-7 h-7"/>
      </IconButton>
    </>
  )


  return (
    <MuiModal
      open={modal}
      onClose={handleClose}
      className={
        "fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
      }
    >
      <>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseS} message='Successfuly Added to List ' action={action} />


        <button
          onClick={handleClose}
          title='close'
          className="modalButton absolute right-5 top-5 !z-40 w-9 h-9 border-none bg-[#181818]"
        >
          <FaTimes />
        </button>
        <div className="relative pt-[55%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width={"100%"}
            height={"100%"}
            playing={playing}
            style={{ position: "absolute", top: "0", left: "0" }}
            muted={muted}
          />
          <div className="absolute bottom-10 left-10 right-10 flex w-full items-center justify-between px-18">
            <div className="flex space-x-2">
              <button onClick={() => setPlaying(prev => !prev)} className="flex items-center gap-x-2 rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                {playing ? <FaPause className="h-7 w-7 text-black"/> : <FaPlay className="h-7 w-7 text-black" />}
                
                {playing ? 'Pause' : 'Play'}
              </button>
              <button className="modalButton">
                {isLoading ? '...' : <BiPlus className="w-6 h-6" onClick={AddProductList}/>}
              </button>
              <button className="modalButton">
                <AiOutlineLike className="w-7 h-7" />
              </button>
            </div>
              <button
                className="modalButton absolute right-12"
                onClick={() => setMuted((prev) => !prev)}
              >
                {" "}
                {muted ? (
                  <BiVolumeMute className="w-6 h-6" />
                ) : (
                  <BiVolumeLow className="w-6 h-6" />
                )}
              </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md  bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className=" font-semibold text-green-400">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">{movie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md-flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]"> Original Language:</span>{" "}
                  {movie?.original_language}
                </div>
                <div>
                  <span className="text-[gray]"> Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
