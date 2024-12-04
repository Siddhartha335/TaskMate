import { apiSlice } from "../apiSlice";

const TASK_URL = "/task";

const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query<any,void>({
            query: () => ({
                url: `${TASK_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getAllTasks: builder.query<any,{strQuery:any,isTrashed:any}>({
            query: ({strQuery,isTrashed}) => ({
                url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        duplicateTask: builder.mutation({
            query: ({id}) => ({
                url: `${TASK_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),
        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/update/${data.id}}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        })
    }),
});

export const { useGetDashboardStatsQuery, useGetAllTasksQuery, useCreateTaskMutation, useDuplicateTaskMutation, useUpdateTaskMutation } = taskApiSlice 