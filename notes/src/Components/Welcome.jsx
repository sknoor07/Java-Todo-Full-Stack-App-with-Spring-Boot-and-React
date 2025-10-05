import React from "react";
import { Link, useParams } from "react-router-dom";
import { testcall } from "./Api/api";

function Welcome() {
  const params = useParams();

  function callApi() {
    // axios
    //   .get("http://localhost:8080/users")
    //   .then((response) => console.log(response.data[0]))
    //   .then((error) => console.log(error))
    //   .finally(() => console.log("cleanup"));
    testcall()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log("cleanup"));
  }

  return (
    <div>
      <h1>Welcome {params.username}</h1>
      <div>
        Your Notes - <Link to="/notes">Here</Link>
      </div>

      <div>
        <button className="btn btn-success m-5" onClick={callApi}>
          Test Api
        </button>
      </div>
    </div>
  );
}

export default Welcome;
