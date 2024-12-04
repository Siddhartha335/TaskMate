import { useDispatch, useSelector } from "react-redux"
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout, setOpenSidebar } from "../redux/slices/authSlice.ts";
import { FaBars } from "react-icons/fa";
import { UserAvatar } from "./UserAvatar.tsx";
import { Notifications } from "./Notifications.tsx";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice.ts";
import { toast } from "sonner";
import ChangePassword from "./ChangePassword.tsx";

export const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open,setOpen] = useState(false);
    const [selected,setSelected] = useState<any>();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [logoutUser] = useLogoutMutation();

    const {isSidebarOpen} = useSelector((state:any) => state.auth)

    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
      };
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async() => {
      try {
        await logoutUser(undefined).unwrap();
        dispatch(logout());
        navigate("/login"); // Redirect to login page after logout
      } catch (error:any) {
        toast.error("Something went wrong!")
      }
    };

    const handleChangePassword = () => {
      setSelected(null);
      setOpen(!open);
    };

    const toggleSidebar = () => {
        dispatch(setOpenSidebar(!isSidebarOpen));
    };

    return (
      <>
        <div className="flex justify-between items-center bg-white text-black p-4 shadow-md">
          {/* Left: Search Bar */}
          <button className="lg:hidden text-black" onClick={toggleSidebar}>
            <FaBars className="text-xl" />
          </button>
          <div className="flex items-center space-x-2 w-1/2 md:w-2/5 border border-gray-300 rounded-2xl">
                <div className="px-3">
                <MdSearch className="text-gray-600" />
                </div>
                <div className="border-l border-gray-300 h-6"></div> {/* Vertical divider */}
                <input 
                type="text" 
                placeholder="Search..." 
                className="w-full p-2 bg-transparent focus:outline-none text-sm"
                />
            </div>

          <div className="flex items-center space-x-4">
            {/* Notifications Icon */}
            <Notifications
                toggleNotifications={toggleNotifications}
                notificationsOpen={notificationsOpen}
            />
            {/* Profile Icon */}
            <UserAvatar 
                toggleDropdown={toggleDropdown}
                dropdownOpen={dropdownOpen}
                handleChangePassword={handleChangePassword}
                handleLogout={handleLogout}
            />
      </div>
    </div>
    <ChangePassword
        open={open}
        setOpen={setOpen}
        userData={selected}
        key={new Date().getTime().toString()}
      />
  </>
  );
}
