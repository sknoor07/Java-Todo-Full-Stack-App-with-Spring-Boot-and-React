import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Security/AuthProvider";
import "../App.css";

function Header() {
  const authContext = useAuth();
  const user = "Noor";

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0">
          <Link
            to="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              class="bi bi-lightbulb-fill"
              viewBox="0 0 16 16"
              st
            >
              <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5" />
            </svg>
            {/* Add a logo or text here if you want */}
          </Link>
        </div>

        <ul className="nav header-nav-center mb-2 mb-md-0">
          {authContext.isauthenticated && (
            <li>
              <Link
                to={`/welcome/${user}`}
                className="nav-link px-2 link-secondary"
              >
                Home
              </Link>
            </li>
          )}
          {authContext.isauthenticated && (
            <li>
              <a href="#" className="nav-link px-2">
                Features
              </a>
            </li>
          )}
          {authContext.isauthenticated && (
            <li>
              <a href="#" className="nav-link px-2">
                Pricing
              </a>
            </li>
          )}
          {authContext.isauthenticated && (
            <li>
              <a href="#" className="nav-link px-2">
                FAQs
              </a>
            </li>
          )}
          {authContext.isauthenticated && (
            <li>
              <a href="#" className="nav-link px-2">
                About
              </a>
            </li>
          )}
        </ul>

        {!authContext.isauthenticated && (
          <div className="col-md-3 text-end">
            <Link to="/login" className="btn btn-outline-primary me-2">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign-up
            </Link>
          </div>
        )}
        {authContext.isauthenticated && (
          <div className="col-md-3 text-end">
            <Link
              to="/login"
              className="btn btn-outline-primary me-2"
              onClick={() => {
                authContext.logout(false);
              }}
            >
              Logout
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
