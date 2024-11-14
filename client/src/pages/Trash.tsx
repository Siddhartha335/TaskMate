import clsx from "clsx"
import moment from "moment"
import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp, MdDelete, MdOutlineRestore } from "react-icons/md"
import { tasks } from "../assets/data"
import { PRIOTITYSTYELS } from "../utils"

const ICONS:any = {
  high:<MdKeyboardDoubleArrowUp />,
  medium:<MdKeyboardArrowUp />,
  low:<MdKeyboardArrowDown />
}

export const Trash = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
          <div>
              <h2 className={clsx("text-2xl font-semibold capitalize")}>Trashed tasks</h2>
          </div>
          <div className="flex items-center gap-4">
            <MdOutlineRestore className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base -mr-3" />
            <button className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"> Restore All</button>
            <MdDelete className="text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base -mr-3" />
            <button className="text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base">Delete All</button>
          </div>
      </div>
      <div className="overflow-x-auto bg-white p-4 mt-8 rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Task Title</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Stage</th>
            <th className="px-4 py-2"> Modified On</th>
          </tr>
        </thead>

        <tbody>
        {tasks.map((task) => {
            return (
              <tr key={task._id} className="border-b text-sm">
                <td className="px-4 py-2 font-semibold">
                  <div className="flex flex-row gap-4 items-center">
                      <div>
                          <h2 className="line-clamp-1">{task?.title}</h2>
                      </div>
                  </div>
                  </td>

                <td className="px-4 py-2 font-semibold">
                  <div className={clsx("flex flex-1 gap-1 items-center text-sm font-medium",PRIOTITYSTYELS[task?.priority])}>
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span>{task?.priority.slice(0,1).toUpperCase() + task?.priority.slice(1)} Priority</span>
                  </div>
                  </td>

                <td className="px-4 py-2">
                  {task?.stage.slice(0,1).toUpperCase() + task?.stage.slice(1)}
                </td>

                <td className="px-4 py-2">
                  {moment(task.createdAt).date()}/{moment(task.createdAt).month() + 1}/{moment(task.createdAt).year()}
                </td>

                <td className="px-4 py-2">
                    <button className="text-blue-600 mr-2 hover:text-blue-500 sm:px-0 text-sm md:text-base"><MdOutlineRestore /></button>
                    <button className="text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base"><MdDelete/></button>
                  </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}
