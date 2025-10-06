import React from "react";
import Login from "./Login";
import Welcome from "./Welcome";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./Footer";

import Error from "./Error";
import Singup from "./Signup";
import ListNotes from "./ListNotes";
import Header from "./Header";
import AuthProvider, { useAuth } from "./Security/AuthProvider";
import UpdateNoteComponent from "./UpdateNoteComponent";

function NotesApp() {
  function AuthenticateRoute({ children }) {
    const authContext = useAuth();
    if (authContext.isauthenticated) return children;
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Singup />}></Route>
            <Route
              path="/welcome/:username"
              element={
                <AuthenticateRoute>
                  {" "}
                  <Welcome />
                </AuthenticateRoute>
              }
            ></Route>
            <Route
              path="/notes"
              element={
                <AuthenticateRoute>
                  <ListNotes />
                </AuthenticateRoute>
              }
            ></Route>
            <Route
              path="/updateNote/:id"
              element={
                <AuthenticateRoute>
                  <UpdateNoteComponent />
                </AuthenticateRoute>
              }
            ></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default NotesApp;
