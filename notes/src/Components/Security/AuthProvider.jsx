import { createContext, useContext, useState } from "react";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  const [isauthenticated, setauthenticated] = useState(false);

  function login(username, password) {
    if (username === "Noor" && password === "1111") {
      setauthenticated(true);
      return true;
    } else {
      return false;
    }
  }

  function logout() {
    setauthenticated(false);
  }

  return (
    <authContext.Provider value={{ isauthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}
export default AuthProvider;
