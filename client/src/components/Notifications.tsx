import {  MdNotifications } from "react-icons/md";

type NotificationProps = {
    notificationsOpen: boolean;
    toggleNotifications: () => void;
}

export const Notifications = ({toggleNotifications, notificationsOpen}:NotificationProps) => {
  return (
    <>
        <button className="relative" onClick={toggleNotifications}>
              <MdNotifications className="text-2xl text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span> {/* Notification Count */}
        </button>

        {/* Notifications Dropdown */}
        {notificationsOpen && (
        <div className="absolute top-16 right-5 bg-white border border-gray-300 rounded-md shadow-lg w-60 p-4 z-10">
            <h3 className="text-sm font-semibold">Notifications</h3>
            <ul className="space-y-2 mt-2 text-sm">
            <li className="p-2 hover:bg-gray-100 rounded-md">New task assigned</li>
            <li className="p-2 hover:bg-gray-100 rounded-md">Your task is due tomorrow</li>
            <li className="p-2 hover:bg-gray-100 rounded-md">New message received</li>
            <li className="p-2 hover:bg-gray-100 rounded-md">Reminder: Weekly meeting</li>
            </ul>
        </div>
        )}


    </>
  )
}
