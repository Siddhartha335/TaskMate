import clsx from "clsx"
import { useState } from "react"
import { MdAttachFile, MdKeyboardArrowDown,MdKeyboardArrowUp,MdKeyboardDoubleArrowUp } from "react-icons/md"
import { useSelector } from "react-redux"
import getInitials, { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../../utils"
import { TaskDialog } from "./TaskDialog"
import moment from "moment"
import { BiMessageAltDetail } from "react-icons/bi"
import { FaList } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"


const ICONS:any = {
    high:<MdKeyboardDoubleArrowUp />,
    medium:<MdKeyboardArrowUp />,
    low:<MdKeyboardArrowDown />
}

export const TaskCard = ({tasks}:any) => {

    const {user} = useSelector((state:any) => state.auth);
    const [open,setOpen] = useState(false);


  return (
    <>
    <div className="w-full h-fit bg-white shadow-md rounded p-4 ">
        <div className="flex w-full justify-between">
            <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium",PRIOTITYSTYELS[tasks?.priority])}>
                <span className="text-lg">{ICONS[tasks?.priority]}</span>
                <span>{tasks?.priority.slice(0,1).toUpperCase() + tasks?.priority.slice(1)} Priority</span>
            </div>
            {user?.isAdmin && <TaskDialog tasks={tasks}/>}
        </div>
            <div className="flex items-center gap-2 mb-2">
                <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[tasks?.stage])} />
                <h4 className="line-clamp-1 text-black">{tasks?.title}</h4>
            </div>
            <span className="text-sm text-gray-600">{moment(tasks?.date).date()}-{moment(tasks?.date).month()}-{moment(tasks?.date).year()}</span>
            <div className="w-full border-t my-2 border-gray-200" />
            <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-3">
                    <div className="flex gap-1 items-center text-sm text-gray-600">
                        <BiMessageAltDetail />
                        <span>{tasks?.activities?.length}</span>
                    </div>
                    <div className="flex gap-1 items-center text-sm text-gray-600">
                        <MdAttachFile />
                        <span>{tasks?.activities?.length}</span>
                    </div>
                    <div className="flex gap-1 items-center text-sm text-gray-600">
                        <FaList />
                        <span>{tasks?.activities?.length}</span>
                    </div>
                </div>
                <div className="flex flex-row-reverse">
                    {tasks?.team?.map((m:any,index:any)=> (
                        <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",BGS[index % BGS?.length])} >
                            {getInitials(m?.name)}
                        </div>
                    ))}
                </div>
            </div>

                {/* Sub tasks */}
                {tasks?.subTasks?.length > 0 ? (
                    <div className="py-4 border-t border-gray-200">
                        <h5 className="text-base line-clamp-1 text-black">{tasks.subTasks[0].title}</h5>
                        <div className="p-4 space-x-8">
                            <span className="text-sm text-gray-600">{moment(tasks.subTasks[0].date).date()}-{moment(tasks.subTasks[0].date).month()}-{moment(tasks.subTasks[0].date).year()}</span>
                            <span className="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium">
                                {tasks.subTasks[0].tag}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="py-4 border-t border-gray-200 ">
                        <span className="text-sm text-gray-500">No Sub task</span>
                    </div>
                )}

                <div className="w-full pb-2">
                    <button disabled={user.isAdmin ? false : true} className="w-full flex gap-4 text-gray-500 items-center font-semibold disabled:cursor-not-allowed disabled::text-gray-400">
                        <IoMdAdd className="text-lg text-black" />
                        <span >Add Subtask</span>
                    </button>
                </div>

            </div>
    </>
  )
}
