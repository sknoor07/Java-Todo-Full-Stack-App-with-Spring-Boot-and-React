import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

export const testcall = () => {
  return apiClient.get("/users");
};

export const findUser = (username) => {
  return apiClient.get(`/users/${username}`);
};

export const retrieveAllNotesForUser = (userid) => {
  return apiClient.get(`/user/${userid}/notes`);
};

export const deleteNote = (userid, id) => {
  return apiClient.delete(`/user/${userid}/notes/${id}`);
};
