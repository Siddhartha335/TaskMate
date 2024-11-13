// type tasksProps = {
//     tasks:{
//       _id: string;
//       title: string;
//       date: string;
//       priority: string;
//       stage: string;
//       assets: string[];
//       team: {
//           _id: string;
//           name: string;
//           title: string;
//           email: string;
//       }[];
//       isTrashed: boolean;
//       activities: {
//           type: string;
//           activity: string;
//           date: string;
//           by: string;
//           _id: string;
//       }[];
//       subTasks: {
//           title: string;
//           date: string;
//           tag: string;
//           _id: string;
//       }[];
//       createdAt: string;
//       updatedAt: string;
//       __v: number;
//     }[]

import { TaskCard } from "./Tasks/TaskCard"

  
//   }

export const BoardView = ({tasks}:any) => {
  return (
    <div className="w-full py-4 grid grid-cols-1 sm:grgid-cols-2 md:grid-cols-3 gap-4 2xl:py-2.5">
        {tasks?.map((task:any,index:number) => {
            return <TaskCard tasks={task} key={index} />
        })}
    </div>
  )
}
