import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function EditMed() {
  const { medId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expirydate, setExpirydate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  let navigate = useNavigate();
  var user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (user) {
      axios
        .get("https://medicalstore.mashupstack.com/api/medicine/" + medId, {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => {
          setTitle(response.data.name);
          setContent(response.data.company);
          setExpirydate(response.data.expiry_date);
        });
    }
  }, [medId, user]);

  function updateMed() {
    axios
      .post(
        "https://medicalstore.mashupstack.com/api/medicine/" + medId,
        {
          name: title,
          company: content,
          expiry_date: expirydate,
        },
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      )
      .then((response) => {
        setModalMessage(response.data.message);
        setShowModal(true);
      });
  }

  function closeModal() {
    setShowModal(false);
    navigate("/med/list");
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="edit col-8 offset-2">
            <h1 className="text-center">Edit Medicine</h1>
            <div className="form-group">
              <label>Name: </label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-2">
              <label>Company:</label>
              <textarea
                className="form-control"
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-2">
              <label>Expiry Date:</label>
              <input
                type="date"
                className="form-control"
                value={expirydate}
                onChange={(event) => {
                  const selectedDate = event.target.value;
                  const formattedDate = new Date(selectedDate)
                    .toISOString()
                    .split("T")[0];
                  setExpirydate(formattedDate);
                }}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary float-right my-3"
                onClick={updateMed}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Response Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default checkAuth(EditMed);
