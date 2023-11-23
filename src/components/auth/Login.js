import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import checkGuest from "./checkGuest";
import { Link } from "react-router-dom";

function Login() {
  var [email, setEmail] = useState('');
  var [password, setPassword] = useState('');
  var [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    axios.post('https://medicalstore.mashupstack.com/api/login', {
      email: email,
      password: password
    }).then(response => {
      setErrorMessage('');
      var user = {
        email: email,
        token: response.data.token,
      }
      dispatch(setUser(user));
      navigate("/");
    }).catch(error => {
      if (error.response.data.errors) {
        setErrorMessage(Object.values(error.response.data.errors).join(''))
      } else if (error.response.data.message) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage('Failed to login user. Please contact admin')
      }
    });
  }

  return (
    <div>
      <Navbar />
      <div className="login container">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-8 col-md-4">
            <h1 className="mb-3">Login</h1>
            {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : ''}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                onInput={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onInput={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group">
              <button className="btn btn-primary btn-block my-3" onClick={attemptLogin}>Login</button>
            </div>
            <p>Don't have an account? <Link to={"/register"}>Signup</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);
