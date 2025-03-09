import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserInput from "./pages/UserInput";
import Logout from "./pages/Logout";
import "./App.css";

import "@google/model-viewer";

function ModelComponent() {
  return (
    <model-viewer
      src="C:\Users\DELL\Downloads\the_universe.glb"
      ios-src="C:\Users\DELL\Downloads\The_Universe.usdz"
      alt="3D Model of the Universe"
      ar
      auto-rotate
      camera-controls
      style={{ width: "100%", height: "500px" }}
    />
  );
}

export default ModelComponent;


function App() {
  useEffect(() => {
    const modelContainer = document.getElementById("model-container");
    if (!modelContainer) {
      const newModelContainer = document.createElement("div");
      newModelContainer.id = "model-container";
      document.body.appendChild(newModelContainer);
    }
  }, []);

  return (
    <Router>
      <div className="relative w-full min-h-screen overflow-hidden">
        <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-60 p-4 flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">AI Content Moderator</Link>
          <div>
            <Link to="/login" className="text-white px-4">Login</Link>
            <Link to="/signup" className="text-white px-4">Signup</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user-input" element={<UserInput />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
