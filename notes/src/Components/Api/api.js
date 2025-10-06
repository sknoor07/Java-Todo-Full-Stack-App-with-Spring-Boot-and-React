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

export const retrieveNoteForUser = (noteid, userid) => {
  return apiClient.get(`/user/${userid}/note/${noteid}`);
};

export const updateNoteForUser = (userid, noteid, note) => {
  return apiClient.put(`/user/${userid}/note/${noteid}`, note);
};
