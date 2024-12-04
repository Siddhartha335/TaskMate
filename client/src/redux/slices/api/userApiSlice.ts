import { apiSlice } from "../apiSlice";

const USER_URL = "/user";

type User = {
    id: number;
    name: string;
    role: string;
    isActive: boolean;
    createdAt: string;
  };
  
type GetTeamListResponse = User[];

type Notification = {
    id:number,
    text:string,
    notiType:string,
    createdAt:string
}

type GetNotificationsResponse = Notification[]

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
                credentials: "include", 
            }),
        }),
        getTeamList: builder.query<GetTeamListResponse, void>({ 
            query: () => ({
                url: `${USER_URL}/team`,
                method: "GET",
                credentials: "include",
            }),
        }),
        deletedUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE", 
                credentials: "include", 
            }),
        }),
        userAction: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/${data.id}`,
                method: "PUT", 
                body: data,
                credentials: "include", 
            }),
        }),
        getNotifications: builder.query<GetNotificationsResponse, void>({ 
            query: () => ({
                url: `${USER_URL}/notifications`,
                method: "GET",
                credentials: "include",
            }),
        }),
        markNotificationAsRead: builder.mutation({ 
            query: (data) => ({
                url: `${USER_URL}/read-notification?isReadType=${data.notiType}&id=${data.id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),
        changePassword: builder.mutation({ 
            query: (data) => ({
                url: `${USER_URL}/change-password`,
                method: "PUT",
                body: data, 
                credentials: "include",
            }),
        }),
    }),
});

export const { useUpdateUserMutation, useGetTeamListQuery, useDeletedUserMutation, useUserActionMutation, useGetNotificationsQuery, useMarkNotificationAsReadMutation, useChangePasswordMutation} = userApiSlice