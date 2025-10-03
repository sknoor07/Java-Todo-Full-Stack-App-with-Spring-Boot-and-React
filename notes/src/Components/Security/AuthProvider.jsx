import { createContext, useContext } from "react";

const authContext = createContext();
export const useAuth = () => useContext(authContext);

function AuthProvider({ children }) {
  <authContext.Provider>{children}</authContext.Provider>;
}
export default AuthProvider;
