import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { uploadSong } from "../../../store/song";
import {useDispatch} from 'react-redux';

import "./SongUpload.css"

const fileTypes = [
  "WAV",
  "FLAC",
  "AIFF",
  "ALAC",
  "OGG",
  "MP3",
  "AAC",
  "AMR",
  "WMA",
];
function SongUploader({setShowModal}) {
  const sessionUser = useSelector((state) => state.session.user);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [privPublic, setPrivPublic] = useState(true);
  const [errors, setErrors] = useState([]);

  const typeArea =
    <span className="fileTypes">
      Accepted Types: {fileTypes.join(", ")}
    </span>

  const dropArea = (
    <div className="dropArea">
      <i className="fa-solid fa-file"></i>
      <span>Drag & Drop or Click to Select a File</span>
      {typeArea}
    </div>
  );

  const dropAreaErrored = (
    <div className="dropArea">
      <i className="fa-solid fa-file"></i>
      <span className="fileError">Unable to upload that file.</span>
      {typeArea}
    </div>
  );

    const dropAreaFilled = (
      <div className="dropArea">
        <i className="fa-solid fa-file"></i>
        <span className="fileName">{file?.name}</span>
      </div>
    );

  const [dropChild, setDropChild] = useState(dropArea);

  const handleChange = (file) => {
    setFile(file);
    setErrors([]);
  };

  useEffect(() => {
    if (file) {
      console.log(file);
      setDropChild(dropAreaFilled);
    }
  },[file])

  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = sessionUser.id;
    const song = await dispatch(
      uploadSong({ userId, title, privPublic, file }),
    ).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
    if (song && errors.length === 0) {
      setShowModal(false);
    }
  };

  const handleTypeError = (e) => {
    const newErrors = [
      ...errors,
      "That file extension is not audio or it's too hip for us!",
    ];
    setErrors(newErrors);
    setDropChild(dropAreaErrored);
    setFile(null);
    return "That file extension is not audio or it's too hip for us!";

  }

  return (
    <div>
      <h1>Upload a song to the swarm!</h1>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}
      >
        <div className="formGroup">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="privPublic">Make Private?</label>
          <input
            type="checkbox"
            name="privPublic"
            value={!privPublic}
            checked={!privPublic}
            onChange={() => setPrivPublic((prev) => !prev)}
          />
        </div>
        <div className="formGroup">
          <FileUploader
            children={[dropChild]}
            className="newSong"
            onTypeError={handleTypeError}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
        <button type="submit">Upload Song</button>
      </form>
    </div>
  );
}

export default SongUploader;
