import { apiClient } from "./ApiClient";

//  export const executeBasicAuthentication=(token)=>apiClient.get(`/basicauth`,{
//      headers:{
//          Authorization: token
//      }
//  });

export const executeJWtAuthentication=(username,password)=>apiClient.post(`/authenticate`,{username,password},{headers: { "Content-Type": "application/json" }});