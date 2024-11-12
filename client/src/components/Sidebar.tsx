import { MdDashboard, MdTaskAlt, MdPendingActions, MdOutlineAddTask, MdSettings } from "react-icons/md";
import { FaTasks, FaUsers, FaTrashAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { Link,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

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

export const Sidebar = () => {

    const {user} = useSelector((state:any) => state.auth);

    const dispatch = useDispatch();
    const location = useLocation();

    const path = location.pathname.split('/')[1];

    const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0,5);


  return (
        <div className="hidden md:flex md:flex-col md:justify-between fixed top-0 left-0 w-60 bg-gray-800 text-white h-full">
        <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold"> <MdOutlineAddTask className="inline-block" /> TaskMate</h2>
        <ul className="space-y-4">
            {linkData.map((link,index)=> {
                return (
                    <li key={index} className={clsx("hover:bg-gray-700 p-2 rounded cursor-pointer text-[15px]", path === link.link.split("/")[0] ? "bg-gray-700" : "")}>
                    <span className="inline-block text-[15px]">{link.icon}</span>  <Link to={link.link} className="hover:bg-gray-700 p-2 rounded" >{link.label}</Link>
                    </li>
                )
            })}
        </ul>
        </div>
        <div className="p-4">
            <ul>
                <li className='hover:bg-gray-700 p-2 rounded cursor-pointer text-[15px]'>
                    <span className="inline-block text-[15px]"><MdSettings /></span>  <Link to="/" className="hover:bg-gray-700 p-2 rounded" >Settings</Link>
                </li>
            </ul>
        </div>
  </div>
  )
}
