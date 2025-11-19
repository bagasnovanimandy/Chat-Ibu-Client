import apiClient from './apiClient';

export const chatApi = {
    getChats: (params = {}) => {
        return apiClient.get('/chats', {
            params
        });
    },

    getChatById: (id) => {
        return apiClient.get(`/chats/${id}`);
    },
};