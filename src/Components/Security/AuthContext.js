import { createContext, useContext, useState } from "react";

const AuthContext= createContext();
export const useAuth= ()=>useContext(AuthContext);

function AuthProvider({children}){
    const[isAuthenticated, SetAuthenticated]= useState(false);
    return (<AuthContext.Provider value={{isAuthenticated,SetAuthenticated}}>
        {children}
    </AuthContext.Provider>);
}

export default AuthProvider;