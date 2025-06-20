import axios from "axios";

const apiClient= axios.create({baseURL:"http://localhost:8080"});

export const retrieveAllTodosForAUser=(username)=>apiClient.get(`users/${username}/todos`,{
    headers:{
        Authorization: "Basic Tm9vciBBbGFtOjEyMzQ="
    }
});

export const deleteTodo=(username,id)=>apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodo=(username,id)=>apiClient.get(`/users/${username}/todos/${id}`);

export const updateTodo=(username,id,todo)=>apiClient.put(`/users/${username}/todos/${id}`,todo);

export const AddTodo=(username,id,todo)=>apiClient.post(`/users/${username}/todos`,todo);

export const executeBasicAuthentication=(token)=>apiClient.get(`/basicauth`,{
    headers:{
        Authorization: token
    }
});