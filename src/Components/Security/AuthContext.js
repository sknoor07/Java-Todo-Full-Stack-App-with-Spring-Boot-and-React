import { createContext, useContext, useState } from "react";

const AuthContext= createContext();
export const useAuth= ()=>useContext(AuthContext);




function AuthProvider({children}){
    const[isAuthenticated, SetAuthenticated]= useState(false);
    const[username, SetSUername]= useState(null);
    
    function login(username, password){
    if(username==="Noor Alam" && password==="1234"){
            
            SetAuthenticated(true);
            SetSUername(username);
            return true;
            

        }else{
            SetAuthenticated(false);
            return false;            
        }
    }

    function logout(){
        SetAuthenticated(false);
        return(true);
    }

    return (<AuthContext.Provider value={{isAuthenticated,login,logout,username}}>
        {children}
    </AuthContext.Provider>);
}

export default AuthProvider;