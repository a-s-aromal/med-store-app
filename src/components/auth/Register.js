import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const registerUser = () => {
    const passwordPatternb = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{6,}$/;
    let error = 0;
    if (passwordPatternb.test(password)) {
      setpasswordError("");
    } else {
      error = 1;
      setpasswordError(
        "Password should contain at least one symbol and be a minimum of 6 characters long, including one number and alphabet."
      );
    }

    if (error === 0) {
      registerb();
    }
  };

  const registerb = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      password_confirmation: passwordConf,
    };

    axios
      .post("https://medicalstore.mashupstack.com/api/register", user)
      .then((response) => {
        setErrorMessage("");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setErrorMessage(Object.values(error.response.data.errors).join(" "));
        } else {
          setErrorMessage("Failed to connect to the API");
        }
      });
  };

  return (
    <div>
      <Navbar />
      <div className="signup container">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-8 col-md-4">
            <h1>Signup</h1>
            {errorMessage ? (
              <div className="alert alert-danger">{errorMessage}</div>
            ) : (
              ""
            )}
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onInput={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                required
                className="form-control"
                value={password}
                onInput={(event) => setPassword(event.target.value)}
              />
              {passwordError && (
                <p className="text-danger">{passwordError}</p>
              )}
            </div>
            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                required
                className="form-control"
                value={passwordConf}
                onInput={(event) => setPasswordConf(event.target.value)}
              />
              {/* {passwordErrorb && (
                <p className="text-danger">{passwordErrorb}</p>
              )} */}
            </div>
            <div className="form-group">
              <button
                className="btn btn-primary float-right my-3"
                onClick={registerUser}
              >
                Submit
              </button>
            </div>
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
