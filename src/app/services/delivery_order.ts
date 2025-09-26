import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://liyt-api-849543905413.europe-west1.run.app",
});
export const DeliveryOrdersApi = createApi({
  reducerPath: "deliveryOrdersApi",
  baseQuery,
  endpoints: (builder) => ({
    orderInit: builder.mutation({
      query: (id) => ({
        url: `/api/v1/orders/init/?api_key=${process.env.NEXT_PUBLIC_LIYT_API_KEY}`,
        method: "POST",
        body: { user_id: id },
      }),
    }),

    createOrder: builder.mutation({
      query: ({ order, id }) => ({
        url: `/api/v1/orders/${id}/?api_key=${process.env.NEXT_PUBLIC_LIYT_API_KEY}`,
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useOrderInitMutation, useCreateOrderMutation } =
  DeliveryOrdersApi;
