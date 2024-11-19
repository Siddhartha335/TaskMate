import { DialogTitle } from "@headlessui/react"
import { ModalWrapper } from "../ModalWrapper"
import { useForm } from "react-hook-form"
import { BiImages } from "react-icons/bi"
import { useEffect, useState } from "react"
import UserList from "./UserList"

type AddTaskProps = {
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    selected?:any
}

const stage:string[] = ['TODO','IN PROGRESS','COMPLETED'];
const priority:string[] = ['NORMAL','MEDIUM','HIGH'];
export const Addtask = ({open,setOpen,selected}:AddTaskProps) => {

  const {register,handleSubmit,formState:{errors},setValue} = useForm();
  const [uploading,setUploading] = useState(false);
  const [team,setTeam] = useState<string[]>([]);

  useEffect(() => {
    if (selected) {
      setValue("title", selected.title);  // Dynamically set the title field
      setValue("stage", selected.stage);
      setValue("date", selected.date);
      setValue("priority", selected.priority);
    }
  }, [selected, setValue]);

  const submitHandler = (data:any) => {
    setUploading(true); 
    console.log(data)
  }

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
            <DialogTitle
              as="h3"
              className="text-base font-bold leading-6 text-gray-900 mb-4"
            >
              {selected ? "UPDATE TASK" : "ADD TASK"}
            </DialogTitle>
            <div className="mt-2 flex flex-col gap-4">
              <div>
              <label htmlFor="title" className="block text-md font-medium text-gray-700">Task Title</label>
              <input
                  type="text"
                  id="title"
                  placeholder="Task title"
                  {...register("title",{
                    required:"Title is required",
                    minLength:{value:4, message:"Title must be at least 4 characters long"}
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                />
                {errors.title && <p className="text-sm text-red-500 mt-1"> {errors.title.message as string}</p>}
              </div>

              <div>
               <UserList setTeam={setTeam} team={team} />
              </div>

              <div className="w-full flex justify-between">
                  <div className="w-[45%]">
                    <label htmlFor="stage" className="block text-md font-medium text-gray-700">Task Stage</label>
                    <select
                        id="stage"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" >
                        {stage.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div className="w-[50%]">
                    <label htmlFor="date" className="block text-md font-medium text-gray-700">Task Date</label>
                    <input
                        type="date"
                        id="date"
                        placeholder={new Date().toDateString()}
                        {...register("date",{required:"Date is required"})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"  
                      />
                      {errors.title && <p className="text-sm text-red-500 mt-1"> {errors.title.message as string}</p>}
                  </div>
              </div>

              <div className="w-full flex justify-between">
                <div className="w-[45%]">
                <label htmlFor="stage" className="block text-md font-medium text-gray-700">Task Stage</label>
                    <select
                        id="stage"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" >
                        {priority.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                </div>
                <div className="w-[50%] flex justify-center">
                  <label htmlFor="assets" className="text-md font-medium text-gray-700 flex items-center cursor-pointer">
                  <input
                      type="file"
                      id="assets"
                      className="hidden"
                      accept=".jpg .png,jpeg"
                      multiple={true}
                    />
                    <BiImages className="mt-2" />
                    <span className="mt-2">Add Assets</span>
                  </label>
                </div>
              </div>

              <div className="py-3 sm:flex sm:flex-row-reverse md:gap-4 gap-6">
                  {uploading ? (
                    <span className="text-base py-2 text-red-500 ">
                      Uploading assets...
                    </span>
                  ): (
                    <>
                      <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-sm">
                        Submit
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded text-sm" onClick={() => setOpen(false)}>
                        Cancel
                      </button>
                    </>
                  )}
              </div>

            </div> 
        </form>
    </ModalWrapper>
  )
}
