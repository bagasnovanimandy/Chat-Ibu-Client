import apiClient from "./apiClient";

// Authentication
export const register = async (data) => {
  const response = await apiClient.post("/users/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await apiClient.post("/users/login", data);
  return response.data;
};

// User management
export const getUsers = async (params) => {
  const response = await apiClient.get("/users", { params });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const updateOnlineStatus = async (id, isOnline) => {
  const response = await apiClient.patch(`/users/${id}/online-status`, {
    isOnline,
  });
  return response.data;
};
