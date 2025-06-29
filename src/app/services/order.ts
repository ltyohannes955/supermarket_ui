import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { Category } from "@/app/services/types/product";

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
export const orderssApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    getOrderById: builder.query<Category, string>({
      query: (id) => ({ url: `orders/${id}`, method: "GET" }),
    }),
  }),
});

export const { useGetOrderByIdQuery, useAddOrderMutation } = orderssApi;
