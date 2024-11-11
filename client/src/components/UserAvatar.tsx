import { MdAccountCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import getInitials from "../utils/index.ts"

type UserAvatarProps = {
    toggleDropdown: () => void;
    dropdownOpen: boolean;
    handleLogout: () => void;
    handleChangePassword: () => void;
}
export const UserAvatar = ({toggleDropdown, dropdownOpen, handleLogout, handleChangePassword}:UserAvatarProps) => {

    const {user} = useSelector((state:any) => state.auth);

  return (
    <div className="relative">
          <button className="flex items-center space-x-2" onClick={toggleDropdown}>
            <MdAccountCircle className="text-xl text-gray-600 hidden md:block" />
            {user && (
              <span className="hidden md:inline-block text-sm">{user.name}</span>  // Display user's name if available
            )}
          </button>
          <button className="rounded-full border border-gray-300 p-2 bg-gray-800 text-white w-10 h-10 block md:hidden" onClick={toggleDropdown}>
                {getInitials(user?.name)}
            </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48 z-10">
              <button 
                onClick={handleChangePassword} 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Change Password
              </button>
              <button 
                onClick={handleLogout} 
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
  )
}
