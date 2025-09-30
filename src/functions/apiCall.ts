import axios from "axios";

interface apiCallParameters {
  method: "get" | "post" | "put" | "patch" | "delete";
  path: string;
  body?: object;
  queries?: object;
  headers?: object;
}

export type ApiResponse<T> = {
  data: T;
  totalItems: number;
  numberOfRowPage: number;
  pageActive: number;
  totalPages: number;
};

function apiCall<T>({
  method,
  path,
  body,
  queries,
  headers,
}: apiCallParameters): Promise<ApiResponse<T>> {
  const URL = import.meta.env.VITE_API_URL + path;
  const token = import.meta.env.VITE_API_TOKEN;

  headers = {
    ...headers,
    Authorization: "Basic " + token,
  };

  return axios({
    method: method,
    url: URL,
    data: body,
    params: queries || undefined,
    headers: headers,
  }).then((resp) => {
    return resp.data;
  });
}

export default apiCall;
