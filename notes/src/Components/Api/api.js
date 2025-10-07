import { apiClient } from "./apiClient";

export const testcall = () => {
  return apiClient.get("/users");
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

export const createNoteForUser = (userid, note) => {
  return apiClient.post(`/user/${userid}/notes`, note);
};
