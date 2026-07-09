import api from "../services/api.ts";
import { type IUser } from "../interfaces/user.interfaces";

// Standard structure of your backend JSON responses
interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const userAPI = {
  // CREATE
  createUser: async (userData: IUser): Promise<APIResponse<IUser>> => {
    return api.post("/users", userData);
  },

  // READ (ALL)
  getAllUsers: async (): Promise<APIResponse<IUser[]>> => {
    return api.get("/users");
  },

  // GET USER BY ID
  getUserById: async (id: string): Promise<APIResponse<IUser>> => {
    return api.get(`/users/${id}`);
  },

  // UPDATE
  updateUser: async (id: string, userData: Partial<IUser>): Promise<APIResponse<IUser>> => {
    return api.put(`/users/${id}`, userData);
  },

  // DELETE
  deleteUser: async (id: string): Promise<APIResponse<{ message: string }>> => {
    return api.delete(`/users/${id}`);
  },
};