import React from "react";
import "./Error.css";

function Error() {
  return (
    <div className="error-container">
      <div className="error-content">
        <h2 className="error-code">404</h2>
        <h4 className="error-title">Oops! That page can’t be found</h4>
        <p className="error-message">
          The page you are looking for may have been deleted
        </p>
        <a href="/login" className="error-button">
          Go To Home
        </a>
      </div>
    </div>
  );
}

export default Error;
