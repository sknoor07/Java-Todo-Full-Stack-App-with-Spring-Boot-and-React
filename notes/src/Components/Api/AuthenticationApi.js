import { apiClient } from "./apiClient";

export const findUser = (username, batoken) => {
  return apiClient.get(`/users/${username}`, {
    headers: {
      Authorization: batoken,
    },
  });
};

export const findUserJWt = (username, password) => {
  return apiClient.post("/authenticate", { username, password });
};
