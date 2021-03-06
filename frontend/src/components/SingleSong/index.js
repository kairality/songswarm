import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentSong, removeCurrentSong } from "../../store/currentSong";
import defaultImg from "../../images/default_album.png";

import "./SingleSong.css"

function SingleSong({ song, size }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const currentSong = useSelector((state) => state.currentSong);
  const thisIsCurrentSong = song.id === currentSong.id;
  const [isLoading, setIsLoading] = useState(true);

  if (!sessionUser) {
    return null;
  }

  const userOwnsSong = sessionUser.id === song.userId;



  const {title, imgSrc} = song;
  const songUser = song?.User;
  const username = songUser?.username;
  console.log(song);

  return (
    <li
      className={`singleSong ${size ?? ''}`}
      onClick={() => {
          history.push(`/songs/${song.id ?? ""}`);
      }}
    >
      <img className="songTileImg" src={song.imgSrc ?? defaultImg} />
      <div className="songTileDetail">
        <h3>{title ?? "No song playing! Pick one!"}</h3>
        <p>{username} { (!song?.id || song?.public ) ? null : <i class="fa-solid fa-eye-slash"></i>}</p>
      </div>
    </li>
  );
}

export default SingleSong;
