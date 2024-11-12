import { summary } from "../assets/data";
import moment from "moment"; // for formatting the date
import clsx from "clsx";
import getInitials, { TASK_TYPE } from "../utils";

export const TaskTable = () => {

  return (
    <div className="overflow-x-auto bg-white p-4 mt-8 rounded-lg shadow-md">      
      <table className="table-auto w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-2">Task Title</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Team</th>
            <th className="px-4 py-2 hidden md:block">Created At</th>
          </tr>
        </thead>
        
        <tbody>
          {summary.last10Task.map((task) => {
            return (
              <tr key={task._id} className="border-b text-sm">
                <td className="px-4 py-2 flex items-center gap-[6px]"><div className={clsx("w-4 h-4 rounded-full",TASK_TYPE[task.stage as keyof typeof TASK_TYPE])}></div>{task.title}</td>
                
                <td className="px-4 py-2">
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </td>
                
                <td className="px-4 py-2">
                  {task.team.map((member) => (
                    <button key={member._id} className="rounded-full border border-gray-300 p-2 bg-gray-800 text-white w-8 h-8 inline text-[10px] font-bold">
                      {getInitials(member.name)}
                    </button>
                  ))}
                </td>
                
                <td className="px-4 py-2 hidden md:block">
                  {moment(task?.date).fromNow()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};