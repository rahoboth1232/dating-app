import { api } from "./client";

export const loginRequest = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};
