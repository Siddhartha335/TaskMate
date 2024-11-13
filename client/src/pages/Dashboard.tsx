import { summary } from "../assets/data"
import { MdAdminPanelSettings } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { FaArrowsToDot } from "react-icons/fa6";
import { Card } from "../components/Card";
import {Chart} from "../components/Chart";
import { TaskTable } from "../components/TaskTable";
import { UserTable } from "../components/UserTable";

type StatProps={
  _id:string,
  label:string,
  total:number,
  icon:JSX.Element,
  bg:string
}

export const Dashboard = () => {

  const stats:StatProps[] = [
    {
      _id:"1",
      label:"TOTAL TASK",
      total: summary.totalTasks,
      icon: <FaNewspaper />,
      bg:"bg-[#1d4ed8]"
    },
    {
      _id:"2",
      label:"COMPLETED TASK",
      total: summary.tasks.completed,
      icon: <MdAdminPanelSettings />,
      bg:"bg-[#0f766e]"
    },
    {
      _id:"3",
      label:"TASK IN PROGRESS",
      total: summary.tasks["in progress"],
      icon: <LuClipboardEdit />,
      bg:"bg-[#f59e0b]"
    },
    {
      _id:"4",
      label:"TODOS",
      total: summary.tasks.todo,
      icon: <FaArrowsToDot />,
      bg:"bg-[#be185d]"
    }
  ]

  return (
    <>
        <Card stats={stats} />
        <Chart />
        <div className="w-full flex flex-col lg:flex-row gap-4 2xl:gap-10 py-8">
          {/* left side table */}
          <div className="flex-1">
            <TaskTable />
          </div>
          {/* right side table */}
          <div className="flex-shrink-0">
            <UserTable />
          </div>
        </div>
    </>
  )
}
