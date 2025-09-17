import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

type ApiResponse<T = any> = {
  status: number;
  message?: string;
  data?: T;
};

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    if (API_KEY) headers.set("x-api-key", API_KEY);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const data = result.data as ApiResponse | undefined;
  console.log(data);

  if (data?.status === 401)
    if (typeof window !== "undefined") window.location.href = "/auth/login";

  return result;
};

const Tags = ["users", "tasks"] as const;
type Tag = (typeof Tags)[number];

export const ApiTags = Tags.reduce(
  (acc, cur) => {
    acc[cur] = cur;
    return acc;
  },
  {} as Record<Tag, Tag>
);

export const baseApi = createApi({
  tagTypes: Tags,
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
