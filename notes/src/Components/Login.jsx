import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const [logindetails, setlogindetails] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, seterrorMessage] = useState(false);
  const authContext = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    if (await authContext.login(logindetails.username, logindetails.password)) {
      navigate(`/welcome/${logindetails.username}`);
    } else {
      seterrorMessage(true);
    }
  }

  function handlecredenatils(event) {
    const { name, value } = event.target;
    setlogindetails((prevvalue) => {
      return {
        ...prevvalue,
        [name]: value,
      };
    });
  }

  return (
    <div className="login">
      <div className="login-form">
        <div className="successMessage"></div>
        <div className="errorMessage">
          {errorMessage && (
            <h1>Authenticted Failed, PLease check Your credentials</h1>
          )}
        </div>
        <form>
          <div>
            <label> UserName </label>
            <input
              name="username"
              placeholder="username "
              type="text"
              value={logindetails.username}
              onChange={handlecredenatils}
            ></input>
          </div>
          <div>
            <label> Password </label>
            <input
              name="password"
              placeholder="password "
              type="text"
              value={logindetails.password}
              onChange={handlecredenatils}
            ></input>
          </div>
          <div>
            <button type="Submit" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
