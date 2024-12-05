import clsx from "clsx"
import { useState } from "react";
import {FaTasks} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdTaskAlt } from "react-icons/md"
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { Tabs } from "../components/Tabs";
import getInitials, { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import { Activities } from "../components/Activities";
import { useGetTaskQuery } from "../redux/slices/api/taskApiSlice";
import { Loader } from "../components/Loader";

const ICONS:any = {
  HIGH: <MdKeyboardDoubleArrowUp />,
  MEDIUM: <MdKeyboardArrowUp />,
  LOW: <MdKeyboardArrowDown />,
};

const bgColor:any = {
  HIGH: "bg-red-200",
  MEDIUM: "bg-yellow-200",
  LOW: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

export const TaskDetails = () => {

  const {id} = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  const {data,isLoading,refetch} = useGetTaskQuery(Number(id));

  if(isLoading) {
    return <Loader />
  }

  const task = data?.task

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl font-bold text-gray-600">
        {task.title}
      </h1>
      <Tabs tabs={TABS} setSelected={setSelectedTab}>
        {selectedTab===0 ? 
        <>
          <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
            <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                  <div className={clsx("flex gap-1 items-center text-base font-semibold, px-3 py-1 rounded-full",PRIOTITYSTYELS[task.priority],bgColor[task.priority])}>
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span className="uppercase text-sm">{task?.priority} Priority</span>
                  </div> 
                  <div className={clsx("flex items-center gap-2")}>
                    <div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage])} />
                    <span className="text-black uppercase">{task?.stage}</span>
                  </div>                 
                </div>

              <p className="text-gray-500">
                Created At: {new Date(task?.date).toDateString()}
              </p>

              <div className="flex items-center gap-8 p-4 border-y border-gray-200">
                <div className="space-x-2">
                  <span className="font-semibold">Assets:</span>
                  <span>{task?.assets?.length}</span>
                </div>
                <span className="text-gray-500">|</span>

                <div className="space-x-2">
                  <span className="font-semibold">Sub-Task:</span>
                  <span>{task?.subTasks.length}</span>
                </div>
              </div>
              <div className="space-y-4 py-6">
                <p className="text-gray-600 font-semibold text-sm">TASK TEAM</p>
                <div className="space-y-3">
                  {task?.team.map((m:any,index:any) => (
                    <div key={index} className="flex gap-4 items-center border-t border-gray-200 py-2">
                        <div className="w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600">
                        <span className="text-center">
                          {getInitials(m?.name)}
                        </span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{m?.name}</p>
                          <p className="text-gray-500">{m?.title}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 py-6">
                <p className="text-gray-600 font-semibold text-sm">SUB-TASKS</p>
                <div className="space-y-8">
                  {task?.subTasks.map((m:any,index:any) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-violet-200 text-white">
                        <MdTaskAlt className="text-cyan-600" size={24} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex gap-2 items-center">
                          <span className="text-sm text-gray-500">
                             {new Date(m?.date).toDateString()}
                          </span>
                          <span className="px-2 py-0.5 text-center text-sm rounded-full bg-violet-200 text-cyan-600">
                            {m?.tag}
                          </span>
                        </div>
                        <p className="text-gray-700">{m?.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

              {/* RiGHT */}
            <div className="w-full md:w-1/2 space-y-8">
              <p className="text-gray-600 font-semibold text-lg">ASSETS</p>

              <div className="w-full grid grid-cols-2 gap-4">
                {task?.assets.map((m:any,index:any) => (
                  <img
                  key={index}
                  src={m}
                  alt={task.title}
                  className="w-full h-38 rounded md:h-48 2xl:h-52 cursor-pointer  transition-all duration-700 hover:scale-105 hover:z-50"
                  />
                ))}
              </div>
            </div>
          </div> 
        </> :
         <Activities activities={task?.activities} id={id} refetch={refetch} />
         }
      </Tabs>
    </div>
  )
}
