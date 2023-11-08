import axios from "./Axios.js";

export const getUsersRequest = () => axios.get(`/user`);
export const getUserRequest = (ID_User) => axios.get(`/user/${ID_User}`);
export const createUserRequest = (user) => axios.post(`/add_user`, user);
export const statusUserRequest = (ID_User) => axios.put(`/user/toggle/${ID_User}`);
export const updateUserRequest = (ID_User, user) => axios.put(`/user/${ID_User}`, user);
export const deleteUserRequest = (ID_User) => axios.delete(`/user/${ID_User}`);

// --------------------------- Mesero --------------------------- //
export const getWaitersRequest = () => axios.get(`waiter`);
export const getWaiterRequest = (ID_User) => axios.get(`/waiter/${ID_User}`);
export const createWaiterRequest = (waiter) => axios.post(`/add_waiter`, waiter);