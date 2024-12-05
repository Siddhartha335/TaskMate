import { MdDashboard, MdTaskAlt, MdPendingActions, MdOutlineAddTask, MdSettings } from "react-icons/md";
import { FaTasks, FaUsers, FaTrashAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { Link,useLocation } from "react-router-dom";
import {  useSelector } from "react-redux";
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
    }
]

export const Sidebar = () => {

    const {user} = useSelector((state:any) => state.auth);
    const location = useLocation();

    const path = location.pathname.split('/')[1];


  return (
        <div className="hidden lg:flex lg:flex-col lg:justify-between fixed top-0 left-0 w-60 bg-gray-800 text-white h-full">
        <div className="p-4 space-y-6">
        <Link to="/" className="text-2xl font-bold" onClick={window.location.reload}> <MdOutlineAddTask className="inline-block" /> TaskMate</Link>
        <ul className="space-y-4">
            {linkData.map((link,index)=> {
                return (
                    <li key={index} className={clsx("hover:bg-gray-700 p-2 rounded cursor-pointer text-[15px]", path === link.link.split("/")[0] ? "bg-gray-700" : "")}>
                    <span className="inline-block text-[15px]">{link.icon}</span>  
                    <Link to={link.link} className="hover:bg-gray-700 p-2 rounded" >{link.label}</Link>
                    </li>
                )
            })}
            {user.isAdmin && 
                <li className={clsx("hover:bg-gray-700 p-2 rounded cursor-pointer text-[15px] ",path === "team".split("/")[0] ? "bg-gray-700" : "")}>
                <span className="inline-block text-[15px]"><FaUsers /></span>  
                <Link to="team" className="hover:bg-gray-700 p-2 rounded" >Team</Link>
                </li>
            }
            {user.isAdmin &&
                <li className={clsx("hover:bg-gray-700 p-2 rounded cursor-pointer text-[15px] ",path === "trashed".split("/")[0] ? "bg-gray-700" : "")}>
                <span className="inline-block text-[15px]"><FaTrashAlt /></span>  
                <Link to="trashed" className="hover:bg-gray-700 p-2 rounded" >Trash</Link>
                </li>
            }
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
