import { createContext, useContext, useState } from "react";
import { findUser } from "../Api/api";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  const [isauthenticated, setauthenticated] = useState(false);
  const [userid, setuserid] = useState("");

  async function login(username, password) {
    try {
      const response = await findUser(username);
      const user = response.data;
      if (user.username === username && user.password === password) {
        setuserid(user.id);
        setauthenticated(true);
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
    console.log("User logged out");
  }

  return (
    <authContext.Provider value={{ isauthenticated, login, logout, userid }}>
      {children}
    </authContext.Provider>
  );
}
export default AuthProvider;
