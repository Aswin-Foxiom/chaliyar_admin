import React from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteConfirmModal({ show = false, deleteFun, closeFun }) {
  return (
    <div>
      <Modal centered backdrop="static" show={show} onHide={() => closeFun()}>
        <Modal.Header>
          <Modal.Title>Warning !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete this permanently ?</Modal.Body>
        <Modal.Footer>
          <Button
            className="shadow-none"
            variant="danger"
            onClick={() => closeFun()}
          >
            No
          </Button>
          <Button
            className="shadow-none"
            onClick={() => deleteFun()}
            variant="success"
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteConfirmModal;
