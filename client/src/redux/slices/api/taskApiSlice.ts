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
        getTask: builder.query<any,number>({
            query: (id) => ({
                url: `${TASK_URL}/${id}`,
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
                url: `${TASK_URL}/update/${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        trashTask: builder.mutation({
            query: ({id})  => ({
                url: `${TASK_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),
        createSubTask: builder.mutation({
            query: ({data,id}) => ({
                url: `${TASK_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        postTaskActivity: builder.mutation({
            query: ({data,id}) => ({
                url: `${TASK_URL}/activity/${id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        deleteOrRestoreActivity: builder.mutation({
            query: ({id,actionType}) => ({
                url: `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,
                method: "DELETE", 
                credentials: "include",
            }),
        })
    }),
});

export const { useGetDashboardStatsQuery, useGetAllTasksQuery, useGetTaskQuery ,useCreateTaskMutation, useDuplicateTaskMutation, useUpdateTaskMutation, useTrashTaskMutation, useCreateSubTaskMutation, usePostTaskActivityMutation, useDeleteOrRestoreActivityMutation  } = taskApiSlice 