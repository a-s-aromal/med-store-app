import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import MedListItem from "./MedListItem";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ListMed() {
  const [allMeds, setAllMeds] = useState([]);
  const [filteredMeds, setFilteredMeds] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");
  var user = useSelector((store) => store.auth.user);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (SearchTerm.trim() === "") {
      setFilteredMeds(allMeds);
    } else {
      var filteredItems = allMeds.filter((item) =>
        item.name.toLowerCase().startsWith(SearchTerm.toLowerCase())
      );
      setFilteredMeds(filteredItems);
    }
  };

  const fetchMeds = useCallback(() => {
    axios
      .get("https://medicalstore.mashupstack.com/api/medicine", {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setAllMeds(response.data);
        setFilteredMeds(response.data);
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchMeds();
    }
  }, [fetchMeds, user]);


  function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
    const time = now.toLocaleTimeString("en-US");
    return `${date} &nbsp ${time}`;
  }

  //Date & Time
  useEffect(() => {
    const datetimeElement = document.getElementById("datetime");
    datetimeElement.innerHTML = updateDateTime();
    const intervalId = setInterval(() => {
      datetimeElement.innerHTML = updateDateTime();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="current-datetime mx-4 my-4">
        <p id="datetime"></p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-3">Medicine List</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8 offset-2">
            <div className="d-flex justify-content-between">
              <Link to="/med/list/create" className="btn btn-info mb-2">
                Add medicine
              </Link>
              <form className="form-inline">
                <input
                  className="mx-3"
                  type="text"
                  value={SearchTerm}
                  onChange={handleSearchInputChange}
                />
                <button
                  className="btn btn-success mb-2"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </div>
            {filteredMeds.length === 0 ? (
              <p>No matching medicines found.</p>
            ) : (
              filteredMeds.map((med) => (
                <MedListItem key={med.id} med={med} refresh={fetchMeds} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMed);
