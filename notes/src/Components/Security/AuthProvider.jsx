import { createContext, useContext, useState } from "react";
import { apiClient } from "../Api/apiClient";
import { findUserJWt } from "../Api/AuthenticationApi";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  const [isauthenticated, setauthenticated] = useState(false);
  const [userid, setuserid] = useState("");

  // async function login(username, password) {
  //   const batoken = "basic " + window.btoa("admin:admin");

  //   try {
  //     const response = await findUser(username, batoken);
  //     const user = response.data;
  //     if (user.username === username && user.password === password) {
  //       setuserid(user.id);
  //       setauthenticated(true);
  //       apiClient.defaults.headers.common["Authorization"] = batoken;
  //       console.log("User logged in");
  //       return true;
  //     } else {
  //       setauthenticated(false);
  //       return false;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user:", error);
  //     setauthenticated(false);
  //     return false;
  //   }
  // }

  async function login(username, password) {
    try {
      const response = await findUserJWt(username, password);
      const data = response.data;
      const token = data.token;
      const id = data.userid;

      if (token) {
        console.log("JWT Token:", token);
        localStorage.setItem("token", token);
        setuserid(id);
        setauthenticated(true);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token} `;
        console.log("User logged in");
        return true;
      } else {
        setauthenticated(false);
        return false;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setauthenticated(false);
      return false;
    }
  }

  function logout() {
    setauthenticated(false);
    setuserid("");
    delete apiClient.defaults.headers.common["Authorization"];
    console.log("User logged out");
  }

  return (
    <authContext.Provider value={{ isauthenticated, login, logout, userid }}>
      {children}
    </authContext.Provider>
  );
}
export default AuthProvider;
