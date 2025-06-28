import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import type { AuthResponse } from "@/app/services/types/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    signUp: builder.mutation<
      AuthResponse,
      {
        name: string;
        email: string;
        password: string;
        DateOfBirth: string;
      }
    >({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        Cookies.set("token", response.token);
        Cookies.set("user", JSON.stringify(response.user));
        return response;
      },
    }),

    login: builder.mutation<
      AuthResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthResponse) => {
        Cookies.set("token", response.token);
        Cookies.set("user", JSON.stringify(response.user));
        return response;
      },
    }),

    getProfile: builder.query<AuthResponse["user"], void>({
      query: () => ({
        url: "auth/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useGetProfileQuery } =
  authApi;
