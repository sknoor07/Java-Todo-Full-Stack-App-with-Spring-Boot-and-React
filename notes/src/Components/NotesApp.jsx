import React from "react";
import Login from "./Login";
import Welcome from "./Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Footer";

import Error from "./Error";
import Singup from "./Signup";
import ListNotes from "./ListNotes";
import Header from "./Header";
import AuthProvider, { useAuth } from "./Security/AuthProvider";

function NotesApp() {
  const authContext = useAuth();
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Singup />}></Route>
            <Route path="/welcome/:username" element={<Welcome />}></Route>
            <Route path="/notes" element={<ListNotes />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default NotesApp;
