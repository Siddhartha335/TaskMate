import {  MdNotifications } from "react-icons/md";
import { useGetNotificationsQuery } from "../redux/slices/api/userApiSlice";
import React from "react";

type NotificationProps = {
    notificationsOpen: boolean;
    toggleNotifications: () => void;
}

export const Notifications = ({toggleNotifications, notificationsOpen}:NotificationProps) => {

  const {data} = useGetNotificationsQuery();

  return (
    <>
        <button className="relative" onClick={toggleNotifications}>
              <MdNotifications className="text-2xl text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{data?.length}</span> {/* Notification Count */}
        </button>

        {/* Notifications Dropdown */}
        {notificationsOpen && (
        <div className="absolute top-16 right-5 bg-white border border-gray-300 rounded-md shadow-lg w-60 p-4 z-10">
            <h3 className="text-sm font-semibold">Notifications</h3>
            <ul className="space-y-2 mt-2 text-sm">
            {data?.map((notification) => (
              <React.Fragment key={notification.id}>
                <li className="p-2 hover:bg-gray-100 rounded-md"><p className="text-red-500">{notification.notiType}</p>{notification.text.slice(0, 50).split(" ").slice(0, 10).join(" ")}</li>
              </React.Fragment>
            ))}
            </ul>
        </div>
        )}


    </>
  )
}
