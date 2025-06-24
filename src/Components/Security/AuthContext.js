import { createContext, useContext, useState } from "react";
import { executeJWtAuthentication } from "../api/JwtAuthenticationAPIService";
import { apiClient } from "../api/ApiClient";

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

    //Basic Authentication
    // async function login(username, password){
    //     const batoken='Basic '+window.btoa(username+":"+password)
    //    try{
    //     const response=await executeBasicAuthentication(batoken);
    //     if(response.status===200){    
    //         SetAuthenticated(true);
    //         SetSUername(username);
    //         settoken(batoken)
    //         apiClient.interceptors.request.use(
    //             (config)=>{
    //                 config.headers.Authorization=batoken;
    //                 return config;
    //             }
    //         );
    //         return true;
            

    //     }else{
    //         logout();
    //         return false;            
    //     }
    // }catch(e){
    //     logout();
    //     console.log(e);
    //     return false;
    // }
    // }

    //JWT Autehntication
    async function login(username, password){
       try{
        const response=await executeJWtAuthentication(username,password);
        if(response.status===200){    
            const jwttoken='Bearer '+response.data.token;
            SetAuthenticated(true);
            SetSUername(username);
            settoken(jwttoken)
            apiClient.interceptors.request.use(
                (config)=>{
                    config.headers.Authorization=jwttoken;
                    return config;
                }
            );
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