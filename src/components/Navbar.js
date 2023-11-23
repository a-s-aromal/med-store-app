import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "./store/authSlice";
import { useState } from "react";

function Navbar() {
  const [setErrorMessage] = useState("");
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Welcome = user ? `${user.email}` : "";

  function logout() {
    console.log(user.token);
    if (user) {
      axios
        .post(
          "https://medicalstore.mashupstack.com/api/logout",
          {},
          {
            headers: { Authorization: "Bearer " + user.token },
          }
        )
        .then((response) => {
          dispatch(removeUser());
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.data.errors) {
            setErrorMessage(Object.values(error.response.data.errors).join(""));
          } else if (error.response.data.message) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Failed to log out user. Please contact admin");
          }
        });
    }
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="mr-auto mx-4">
        <a className="navbar-brand mx-3" href="/">
          MED-BAY
        </a>
        <span style={{ color: "#ffffff" }}>{Welcome}</span>
      </div>
      <div className="collapse navbar-collapse justify-content-end mx-4" id="navbarNav">
        <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
          <li className="nav-item mx-2">
            <NavLink to={"/"} activeClassName="active" className="nav-link">
              Home
            </NavLink>
          </li>
          {user ? (
            <li className="nav-item mx-2">
              <NavLink to={"/med/list"} activeClassName="active" className="nav-link">
                List Medicines
              </NavLink>
            </li>
          ) : null}
          {user ? (
            <li className="logout nav-item">
              <span className="nav-link" onClick={logout}>
                Logout
              </span>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink to={"/login"} activeClassName="active" className="mx-2 nav-link">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
