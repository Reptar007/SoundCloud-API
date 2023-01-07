import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateAlbumForm from "./UpdateAlbumForm";

function UpdateFormModal({ album }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <i className="fas fa-solid fa-pen" />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateAlbumForm album={album} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateFormModal;
