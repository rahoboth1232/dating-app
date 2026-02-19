import { api } from "./client";

export const loginRequest = (user: string, password: string) => {
  return api.post("/login/", { user, password });
};
export const register = (user: string, password: string) => {
  return api.post("/register/", { user, password });
};
