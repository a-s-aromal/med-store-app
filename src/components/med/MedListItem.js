import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function MedListItem(props) {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((store) => store.auth.user);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const deleteMedicine = async () => {
    try {
      await axios.delete(
        `https://medicalstore.mashupstack.com/api/medicine/${props.med.id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      handleClose();  //Modal close
      props.refresh();
    } catch (error) {
      console.error("Error deleting medicine:", error);
    }
  };

  const currentDate = new Date();

  return (
    <div className="card">
      <div className="card-body d-flex flex-row align-items-center justify-content-between">
        <span
          style={{
            color:
              new Date(props.med.expiry_date) >= new Date(currentDate)
                ? "green"
                : "red",
          }}
        >
          {props.med.name}
        </span>
        <div>
          <button className="btn btn-danger mx-2" onClick={handleShow}>
            Delete
          </button>
          <Link
            to={`/med/list/${props.med.id}/edit`}
            className="btn btn-primary mx-2"
          >
            Edit
          </Link>
          <Link to={`/med/list/${props.med.id}`} className="btn btn-info mx-2">
            View
          </Link>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this medicine?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteMedicine}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MedListItem;
