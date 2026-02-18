import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.10:8000/api", // use your local IP
  headers: {
    "Content-Type": "application/json",
  },
});
