import moment from "moment"; // for formatting the date
import clsx from "clsx";
import getInitials, { BGS, TASK_TYPE } from "../utils";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { FaList } from "react-icons/fa";
import { useState } from "react";
import ConfirmatioDialog from "./Dialogs";
import { Addtask } from "./Tasks/Addtask";
import { useTrashTaskMutation } from "../redux/slices/api/taskApiSlice";
import { toast } from "sonner";

export const ListView = ({tasks}:any) => {

  const [openDialog,setOpenDialog] = useState(false);
  const [open,setOpen] = useState(false);
  const [selected,setSelected] = useState(null)

  const [deleteTask] = useTrashTaskMutation();

  const deleteClicks = (id:any) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const editClicks = (el:any) => {
    setSelected(el);
    setOpen(true);
  };

  const deletehandler = async() => {
    try {
      const result = await deleteTask({id:selected}).unwrap(); 
      toast.success(result.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      },500)
    } catch (error:any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  } 

    return (
      <>
          <div className="overflow-x-auto bg-white p-4 mt-8 rounded-lg shadow-md">      
            <table className="table-auto w-full text-left">
              <thead className="border-b">
                <tr>
                  <th className="px-4 py-2">Task Title</th>
                  <th className="px-4 py-2">Priority</th>
                  <th className="px-4 py-2">Team</th>
                  <th className="px-4 py-2">Assets</th>
                  <th className="px-4 py-2 hidden md:block">Created At</th>
                </tr>
              </thead>
              
              <tbody>
                {tasks.map((task:any,index:any) => {
                  return (
                    <tr key={index} className="border-b text-sm">
                      <td className="px-4 py-2 flex items-center gap-[6px]"><div className={clsx("w-4 h-4 rounded-full line-clamp-1",TASK_TYPE[task.stage as keyof typeof TASK_TYPE])}></div>{task.title}</td>
                      
                      <td className="px-4 py-2">
                        {task.priority.slice(0,1).toUpperCase() + task.priority.slice(1)}
                      </td>
                      
                      <td className="px-4 py-2">
                        {task.team.map((member:any,index:any) => (
                          <button key={index} className={clsx("w-7 h-7 rounded-full text-white text-sm -mr-1",BGS[index % BGS?.length])}>
                            {getInitials(member.name)}
                          </button>
                        ))}
                      </td>

                      <td className="px-4 py-2">
                      <div className="flex gap-2">
                        <div className="flex gap-1 items-center text-sm text-gray-600">
                              <BiMessageAltDetail />
                              <span>{task?.activities?.length}</span>
                          </div>
                          <div className="flex gap-1 items-center text-sm text-gray-600">
                              <MdAttachFile />
                              <span>{task?.activities?.length}</span>
                          </div>
                          <div className="flex gap-1 items-center text-sm text-gray-600">
                              <FaList />
                              <span>{task?.activities?.length}</span>
                          </div>
                      </div>
                      </td>
                      
                      <td className="px-4 py-2 hidden md:block">
                        {moment(task?.date).fromNow()}
                      </td>

                      <td className="px-4 py-2">
                        <button className="text-blue-600 mr-2 hover:text-blue-500 sm:px-0 text-sm md:text-base" onClick={() => editClicks(task)}>Edit</button>
                        <button className="text-red-600 hover:text-red-500 sm:px-0 text-sm md:text-base" onClick={() => deleteClicks(task.id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ConfirmatioDialog 
            open={openDialog}
            setOpen={setOpenDialog}
            onClick={deletehandler}
            msg={"Are you sure you want to delete this task?"}
          />

          <Addtask
            open={open}
            setOpen={setOpen}
            task={selected}
          />

      </>

    )
}
