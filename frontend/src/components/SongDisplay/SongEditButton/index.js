import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';

import { Modal } from "../../../context/Modal";

import EditSongForm from "../EditSongForm"

export default function SongEditButton({ song }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentSong = useSelector((state) => state.currentSong);
  const [showModal, setShowModal] = useState(false);
  const thisIsCurrentSong = song.id === currentSong.id;

    return (
      <>
        <button onClick={() => setShowModal(true)}>Edit Song</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditSongForm song={song} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
}


// import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
// import LoginForm from "./LoginForm";

// function LoginFormModal() {
//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <button onClick={() => setShowModal(true)}>Log In</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <LoginForm />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default LoginFormModal;
