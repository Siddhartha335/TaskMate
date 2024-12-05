import { TaskCard } from "./Tasks/TaskCard"

export const BoardView = ({tasks}:any) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grgid-cols-2 md:grid-cols-3 gap-4 2xl:py-2.5">
        {tasks?.map((task:any,index:number) => {
            return <TaskCard tasks={task} key={index} />
        })}
    </div>
  )
}
