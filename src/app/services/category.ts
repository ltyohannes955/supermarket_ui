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
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => ({ url: "categories", method: "GET" }),
    }),
    getCategoryById: builder.query<Category, string>({
      query: (id) => ({ url: `categories/${id}`, method: "GET" }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoriesApi;
