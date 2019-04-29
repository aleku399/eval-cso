import { AxiosRequestConfig } from "axios";
import { useState } from "react";
// tslint:disable-next-line: no-submodule-imports
import useEffectOnce from "react-use/esm/useEffectOnce";
import { authAxios } from "./axios";

interface Response<T> {
  data: T;
  loading: boolean;
  error?: string;
}

interface PostRequest {
  data: any;
  url: string;
}

export const useAxios = <T>(jwt: string) => (
  request: AxiosRequestConfig
): Response<T> => {
  const defaultState = { loading: true, data: null, error: null };
  const [response, setResponse] = useState(defaultState);

  useEffectOnce(() => {
    authAxios(jwt)
      .request(request)
      .then(res => {
        setResponse({ ...defaultState, loading: false, data: res.data });
      })
      .catch(err => {
        const errorMsg =
          (err && err.response && err.response.data) ||
          `HTTP request error for ${request.url}`;
        setResponse({ ...defaultState, loading: false, error: errorMsg });
      });
  });
  return response;
};

export const useAxiosGet = <T>(jwt: string) => (url: string): Response<T> => {
  return useAxios<T>(jwt)({
    method: "get",
    url
  });
};

export const useAxiosPost = <T>(jwt: string) => ({
  url,
  data
}: PostRequest): Response<T> => {
  return useAxios<T>(jwt)({
    method: "post",
    url,
    data
  });
};
