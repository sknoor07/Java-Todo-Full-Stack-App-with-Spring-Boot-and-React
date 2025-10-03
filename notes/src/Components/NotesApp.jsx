import React from "react";
import Login from "./Login";
import Welcome from "./Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Error from "./Error";
import Singup from "./Signup";

function NotesApp() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Singup />}></Route>
          <Route path="/welcome/:username" element={<Welcome />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default NotesApp;
