import { AxiosRequestConfig } from "axios";
import { useState } from "react";
import useEffectOnce from "react-use/esm/useEffectOnce";
import axios, { authAxios } from "./axios";

export interface Response<T> {
  data: T;
  loading: boolean;
  error?: string;
}

interface PostRequest {
  data: any;
  url: string;
}

// TODO: implement simple session storage caching
export const useAxios = <T>(jwt?: string) => (
  request: AxiosRequestConfig
): Response<T> => {
  const defaultState = { loading: true, data: null, error: null };
  const [response, setResponse] = useState(defaultState);

  useEffectOnce(() => {
    (jwt ? authAxios(jwt) : axios)
      .request(request)
      .then(res => {
        setResponse({ ...defaultState, loading: false, data: res.data });
      })
      .catch(err => {
        setResponse({ ...defaultState, loading: false, error: err.toString() });
      });
  });
  return response;
};

export const useAxiosGet = <T>(jwt?: string) => (url: string): Response<T> => {
  return useAxios<T>(jwt)({
    method: "get",
    url
  });
};

export const useAxiosPost = <T>(jwt?: string) => ({
  url,
  data
}: PostRequest): Response<T> => {
  return useAxios<T>(jwt)({
    method: "post",
    url,
    data
  });
};
