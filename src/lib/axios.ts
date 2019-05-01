import axios, { AxiosInstance } from "axios";
import { HttpError } from "./errors";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export function authAxios(jwt: string): AxiosInstance {
  instance.defaults.headers.Authorization = `Bearer ${jwt}`;
  return instance;
}

interface JsonError {
  message: string;
  status: number;
}

instance.interceptors.response.use(
  response => response,
  error => {
    const jsonError: JsonError = error && error.response && error.response.data;
    const errorMsg = (jsonError && jsonError.message) || error.toString();
    const status = jsonError && jsonError.status;
    return Promise.reject(new HttpError(errorMsg, status));
  }
);

export default instance;
