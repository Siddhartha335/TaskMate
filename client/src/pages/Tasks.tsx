import { Loader } from "./Loader"
import { MdGridView } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { TASK_TYPE } from "../utils";
import { useParams } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { Tabs } from "../components/Tabs";
import { TaskTitle } from "../components/Tasks/TaskTitle";
import { BoardView } from "../components/BoardView";
import { ListView } from "../components/ListView";
import { tasks } from "../assets/data";

const TABS:{
    title:string,
    icon:JSX.Element
}[] = [
    {
        title:"Board View",
        icon:<MdGridView />
        
    },
    {
        title:"List View",
        icon:<FaList />
    }
]

export const Tasks = () => {

  const {status} = useParams();

  const [selected,setSelected] = useState(1); //for changing board view and list view (tabs)
  const [open,setOpen] = useState(false);
  const [loading,setLoading] = useState(false); //for loader
  console.log(selected)

  return (
    <>
      {loading ? <Loader /> :
      <div className="w-full">

          <div className="flex items-center justify-between mb-4">
              <div>
                 <h2 className={clsx("text-2xl font-semibold capitalize")}>{status ? `${status} Tasks`: "Tasks"}</h2>
              </div>
              {!status && (
                <div>
                  <button className="py-2 px-4 text-white bg-blue-700 shadow-lg hover:bg-gray-800 border rounded-lg">
                    + Create Task
                  </button>
                </div>
              )}
          </div>

          <div>
            <Tabs tabs={TABS} setSelected={setSelected} >
              {!status && (
                <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
                  <TaskTitle label="To Do" className={TASK_TYPE.todo} />
                  <TaskTitle label="In Progress" className={TASK_TYPE["in progress"]} />
                  <TaskTitle label="Completed" className={TASK_TYPE.completed} />
                </div>
              )}
              
              {selected == 0 ? ( <BoardView tasks={tasks} /> ):( <ListView tasks={tasks} /> )}

            </Tabs>
          </div>

      </div>
      }
    </>
  )
}
