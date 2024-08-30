import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://66d012f0181d059277dd1d11.mockapi.io/' }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => 'User',
    }),
    getTodosByUser: builder.query({
      query: (userId) => `Todos?userid=${userId}`,
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'Todos',
        method: 'POST',
        body: newTodo,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `Todos/${id}`,
        method: 'DELETE',
      }),
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `Todos/${id}`,
        method: 'PUT',
        body: updatedFields,
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetTodosByUserQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = todoApi;
