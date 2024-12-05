import { MdAdminPanelSettings } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { FaArrowsToDot } from "react-icons/fa6";
import { Card } from "../components/Card";
import {Chart} from "../components/Chart";
import { TaskTable } from "../components/TaskTable";
import { UserTable } from "../components/UserTable";
import { useGetDashboardStatsQuery } from "../redux/slices/api/taskApiSlice";
import { Loader } from "../components/Loader";

type StatProps={
  _id:string,
  label:string,
  total:number,
  icon:JSX.Element,
  bg:string
}

export const Dashboard = () => {

  const {data, isLoading} = useGetDashboardStatsQuery();

  const stats:StatProps[] = [
    {
      _id:"1",
      label:"TOTAL TASK",
      total: data?.totalTasks ?? 0,
      icon: <FaNewspaper />,
      bg:"bg-[#1d4ed8]"
    },
    {
      _id:"2",
      label:"COMPLETED TASK",
      total: data?.tasks.COMPLETED ?? 0,
      icon: <MdAdminPanelSettings />,
      bg:"bg-[#0f766e]"
    },
    {
      _id:"3",
      label:"TASK IN PROGRESS",
      total: data?.tasks.IN_PROGRESS ?? 0,
      icon: <LuClipboardEdit />,
      bg:"bg-[#f59e0b]"
    },
    {
      _id:"4",
      label:"TODOS",
      total: data?.tasks.TODO ?? 0,
      icon: <FaArrowsToDot />,
      bg:"bg-[#be185d]"
    }
  ]

  return (
    <>
        {isLoading ? <Loader /> : <Card stats={stats} />}
        <Chart graphData={data?.graphData} />
        <div className="w-full flex flex-col lg:flex-row gap-4 2xl:gap-10 py-8">
          {/* left side table */}
          <div className="flex-1">
            <TaskTable data={data} />
          </div>
          {/* right side table */}
          <div className="flex-shrink-0">
            <UserTable data={data} />
          </div>
        </div>
    </>
  )
}
