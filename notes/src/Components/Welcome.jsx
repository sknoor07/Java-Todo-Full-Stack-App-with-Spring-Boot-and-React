import React from "react";
import { Link, useParams } from "react-router-dom";

function Welcome() {
  const params = useParams();

  return (
    <div>
      <h1>Welcome {params.username}</h1>
      <div>
        Your Notes - <Link to="/notes">Here</Link>
      </div>
    </div>
  );
}

export default Welcome;
