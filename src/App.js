import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="image container-fluid">
        <img
          src={process.env.PUBLIC_URL + "/medbay.png"}
          alt="medbay"
          className="w-100 mt-2 mx-3"
        />
      </div>
    </div>
  );
}

export default App;
