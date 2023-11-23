import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function CreateMed() {
  const [name, setname] = useState("");
  const [company, setcompany] = useState("");
  const [expirydate, setexpirydate] = useState("");
  var navigate = useNavigate();
  var user = useSelector((store) => store.auth.user);
  function addMed() {
    axios
      .post(
        "https://medicalstore.mashupstack.com/api/medicine",
        {
          name: name,
          company: company,
          expiry_date: expirydate,
        },
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      )
      .then((response) => {
        navigate("/med/list");
      });
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="add-med col-8 offset-2">
            <h1 className="text-center">Add Medicine Details</h1>
            <div className="form-group my-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(event) => {
                  setname(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-3">
              <label>Company:</label>
              <textarea
                className="form-control"
                value={company}
                onChange={(event) => {
                  setcompany(event.target.value);
                }}
              />
            </div>
            <div className="form-group my-3">
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
                  setexpirydate(formattedDate);
                }}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary float-right my-3"
                onClick={addMed}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(CreateMed);
