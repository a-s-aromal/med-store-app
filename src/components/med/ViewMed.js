import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ViewMed() {
  var { medId } = useParams();
  var [med, setMed] = useState({ name: "", company: "", expiry_date: "" });
  var user = useSelector((store) => store.auth.user);

  useEffect(() => {
    if (user) {
      axios
        .get("https://medicalstore.mashupstack.com/api/medicine/" + medId, {
          headers: { Authorization: "Bearer " + user.token },
        })
        .then((response) => {
          setMed(response.data);
        });
    }
  }, [medId, user]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="med-det text-center mb-5">Medicine Details</h1>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                <h3>Name: {med.name}</h3>
              </div>
              <div className="card-body">Company: {med.company}</div>
              <div className="card-body">Expiry-date: {med.expiry_date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ViewMed);
