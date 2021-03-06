import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultImg from "../../images/default_album.png";
import { setCurrentSong } from "../../store/currentSong";
import { genComments } from "../../store/songComments";
import SongDeleteButton from "./SongDeleteButton";
import SongEditButton from "./SongEditButton";
import SongComments from "../SongComments";
import SingleSong from "../SingleSong";

import "./SongDisplay.css";
import MyComments from "../SongComments/MyComments";

function SongDisplay() {
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id]);
  const songs = useSelector((state) => state.songs);
  const playbackTime = useSelector((state) => state.playback.timestamp);

  const sessionUser = useSelector((state) => state.session.user);
  const currentSongId = useSelector((state) => state.currentSong.id);
  const dispatch = useDispatch();

  // if there is no current song set when we load a song view, go ahead and set it!
  // this will activate the Swarm Player!
  // but, we do let people load up the song view without interrupting the current song playing.
  useEffect(() => {
    if (!currentSongId && song) {
      dispatch(setCurrentSong(song));
    }
  }, [currentSongId, song, dispatch]);


  // load the song's comments from the database
  useEffect(() => {
    dispatch(genComments(song));
    // running genComments as playback time updates allows people to load new eligible comments
    // from other people listening to the same song at the same time
    // in essence, this is now Twitch chat, may God have mercy on my soul.
  }, [dispatch, song, playbackTime]);

  // const comments = useSelector((state) => state.songComments);

  // bail out early if we're here and there's no song for whatever reason
  // doing this now avoids having to deal with a bunch of conditional chaining headaches
  if (!song || !sessionUser) {
    return null;
  }

  const userOwnsSong = sessionUser.id === song.userId;
  const isCurrentSong = currentSongId === song.id;

  const {
    title,
    imgSrc,
    User: { username },
  } = song;

  const displaySongs = Object.values(songs).sort((a,b) => {
    return (new Date(b.createdAt)) - (new Date(a.createdAt))
  })
    .slice(0,6);


  return (
    <div className="songDisplay">
      <div className="cover">
        <img
          className="songDisplayCover"
          src={imgSrc ?? defaultImg}
          onClick={() => dispatch(setCurrentSong(song))}
        />
        {isCurrentSong ? null : <i class="fa-solid fa-play playIcon"></i>}
      </div>
      <div className="songDisplayDetails">
        <h2>{title}</h2>
        <h3>{username}</h3>
      </div>
      <SongComments song={song} />
      <div className="songDisplayControls">
        {userOwnsSong && <SongDeleteButton song={song} />}
        {userOwnsSong && <SongEditButton song={song} />}
        <MyComments />
      </div>
      <ul className="displaySongsList">
        {displaySongs.map((song) => {
          return <SingleSong song={song} key={song.id} />;
        })}
      </ul>
    </div>
  );
}

export default SongDisplay;
