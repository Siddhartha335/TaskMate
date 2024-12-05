import { MdDashboard, MdTaskAlt, MdPendingActions, MdOutlineAddTask, MdClose } from "react-icons/md";
import { FaTasks, FaUsers, FaTrashAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";

type linkDataProps = {
    label:String,
    link:any,
    icon:JSX.Element
}

const linkData:linkDataProps[] = [
    {
        label:"Dashboard",
        link:"dashboard",
        icon: <MdDashboard />
    },
    {
        label:"Tasks",
        link:'tasks',
        icon: <FaTasks />
    },
    {
        label:"Completed",
        link:'completed/completed',
        icon: <MdTaskAlt />
    },
    {
        label:"In Progress",
        link:"in-progress/in-progress",
        icon: <MdPendingActions />
    },
    {
        label:"To Do",
        link:"todo/todo",
        icon: <LuListTodo />
    },
    {
        label:"Team",
        link:"team",
        icon: <FaUsers />
    },
    {
        label:"Trash",
        link:"trashed",
        icon: <FaTrashAlt />
    }
]

export const MobileSidebar = () => {
    const dispatch = useDispatch();

    const path = location.pathname.split('/')[1];

    const closeSidebar = () => {
        dispatch(setOpenSidebar(false))
    }


  return (
    <div className="fixed top-0 left-0 w-2/5 h-full bg-gray-800 text-white z-10 p-4 space-y-6">
    <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center" onClick={window.location.reload}>
            <MdOutlineAddTask className="inline-block mr-2" /> TaskMate
        </Link>
        <MdClose className="text-white text-2xl cursor-pointer" onClick={closeSidebar} />
    </div>
    <ul className="space-y-4">
        {linkData.map((link, index) => {
            return (
                <li key={index} className={clsx(
                    "hover:bg-gray-700 p-2 rounded cursor-pointer text-[15px]", 
                    path === link.link.split("/")[0] ? "bg-gray-700" : ""
                )}>
                    <span className="inline-block text-[15px]">{link.icon}</span>  
                    <Link to={link.link} className="hover:bg-gray-700 p-2 rounded">{link.label}</Link>
                </li>
            );
        })}
    </ul>
</div>

  )
}
