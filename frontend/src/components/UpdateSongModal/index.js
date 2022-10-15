import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateSongForm from "./UpdateSongForm";

function UpdateFormModal({ song }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Update</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSongForm song={song} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateFormModal;
