import { createContext, useContext, useState } from "react";
import { executeBasicAuthentication } from "../api/TodoApiService";

const AuthContext= createContext();
export const useAuth= ()=>useContext(AuthContext);




function AuthProvider({children}){
    const[isAuthenticated, SetAuthenticated]= useState(false);
    const[username, SetSUername]= useState(null);
    const[token,settoken]=useState(null);
    
    // function login(username, password){
    // if(username==="Noor Alam" && password==="1234"){
            
    //         SetAuthenticated(true);
    //         SetSUername(username);
    //         return true;
            

    //     }else{
    //         SetAuthenticated(false);
    //         return false;            
    //     }
    // }

    async function login(username, password){
        const batoken='Basic '+window.btoa(username+":"+password)
       try{
        const response=await executeBasicAuthentication(batoken);
        if(response.status===200){    
            SetAuthenticated(true);
            SetSUername(username);
            settoken(batoken)
            return true;
            

        }else{
            logout();
            return false;            
        }
    }catch(e){
        logout();
        console.log(e);
        return false;
    }
    }

    function logout(){
        SetAuthenticated(false);
        SetSUername(null);
        settoken(null)
        return(true);
    }

    return (<AuthContext.Provider value={{isAuthenticated,login,logout,username,token}}>
        {children}
    </AuthContext.Provider>);
}

export default AuthProvider;