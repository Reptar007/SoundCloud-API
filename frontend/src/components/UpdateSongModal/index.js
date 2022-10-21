import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateSongForm from "./UpdateSongForm";

function UpdateFormModal({ song }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}><i className="fas fa-solid fa-pen" /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSongForm song={song} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default UpdateFormModal;
