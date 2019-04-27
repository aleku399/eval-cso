import axios, { AxiosInstance } from "axios";

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

export default instance;
