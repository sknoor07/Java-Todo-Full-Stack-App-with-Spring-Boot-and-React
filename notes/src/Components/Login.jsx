import React, { useState } from "react";
import "../App.css";

function Login() {
  const [logindetails, setlogindetails] = useState({
    username: "",
    password: "",
  });

  const [successMessage, setsuccessMessage] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);

  function handleSubmit(event) {
    if (logindetails.username === "Noor" && logindetails.password === "1111") {
      setsuccessMessage(true);
      seterrorMessage(false);
    } else {
      seterrorMessage(true);
      setsuccessMessage(false);
    }
    event.preventDefault();
  }

  function handlecredenatils(event) {
    const { name, value } = event.target;
    console.log(value);
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
        <div className="successMessage">
          {successMessage && <h1>Authenticted Successfully</h1>}
        </div>
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
