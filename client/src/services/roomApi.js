import apiClient from "./apiClient";

export const roomApi = {
  getRooms: (params = {}) => {
    return apiClient.get("/rooms", { params });
  },

  getRoomById: (id) => {
    return apiClient.get(`/rooms/${id}`);
  },

  createRoom: (data) => {
    return apiClient.post("/rooms", data);
  },

  updateRoom: (id, data) => {
    return apiClient.put(`/rooms/${id}`, data);
  },

  deleteRoom: (id) => {
    return apiClient.delete(`/rooms/${id}`);
  },

  generateRoomContent: () => {
    return apiClient.post("/rooms/generate-content");
  },
};
