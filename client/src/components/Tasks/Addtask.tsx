import { DialogTitle } from "@headlessui/react";
import { ModalWrapper } from "../ModalWrapper";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { useEffect, useState } from "react";
import UserList from "./UserList";
import { supabase } from "../../utils/supabase";
import { useCreateTaskMutation, useGetAllTasksQuery, useUpdateTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import moment from "moment";

type AddTaskProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: any;
};

const stage: string[] = ['TODO', 'IN_PROGRESS', 'COMPLETED'];
const priority: string[] = ['NORMAL', 'MEDIUM', 'HIGH'];

export const Addtask = ({ open, setOpen, task }: AddTaskProps) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [uploading, setUploading] = useState(false);
  const [team, setTeam] = useState<{}[]>([]);
  const [assets, setAssets] = useState<File[]>([]);
  const [uploadedFileURLs, setUploadedFileURLs] = useState<string[]>([]);
  
  console.log(uploadedFileURLs)

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("stage", task.stage);
      setValue("date", moment(task.date).format("YYYY-MM-DD"));
      setValue("priority", task.priority);
    }
  }, [task, setValue]);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const {refetch} = useGetAllTasksQuery({
    strQuery:  "",
    isTrashed: ""
  });
  const URLs = task?.assets ? [...task.assets] : [];

  const submitHandler = async (data: any) => {
    setUploading(true);
    try {
      const uploadedURLs = await Promise.all(
        assets.map((file) => uploadFile(file)) // wait for all files to be uploaded
      );
  
      const newData = {
        ...data,
        assets: [...URLs, ...uploadedURLs],
        stage: data.stage,
        priority: data.priority,
        team:team
      };
  
      const res = task?.id 
        ? await updateTask({ ...newData, id: task.id }).unwrap() 
        : await createTask(newData).unwrap();
  
      toast.success(res.message);
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    } finally {
      setUploading(false);
    }
    refetch();
  };
  

  const handleSelect = (e: any) => {
    setAssets(Array.from(e.target.files));
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const { data, error } = await supabase.storage.from("assets").upload(`tasks/${new Date().getTime()}_${file.name}`, file);

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from("assets").getPublicUrl(data.path);

      if (!publicUrlData) throw new Error("Failed to retrieve the public URL.");
      const publicUrl = publicUrlData.publicUrl;
      setUploadedFileURLs((prevURLs) => [...prevURLs, publicUrl]);

      return publicUrl;
    } catch (error:any) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file: " + (error.message || "Unknown error"));
      throw error;
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogTitle as="h3" className="text-base font-bold leading-6 text-gray-900 mb-4">
          {task ? "UPDATE TASK" : "ADD TASK"}
        </DialogTitle>
        <div className="mt-2 flex flex-col gap-4">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-md font-medium text-gray-700">Task Title</label>
            <input
              type="text"
              id="title"
              placeholder="Task title"
              {...register("title", { required: "Title is required", minLength: { value: 4, message: "Title must be at least 4 characters long" } })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.title && <p className="text-sm text-red-500 mt-1"> {errors.title.message as string}</p>}
          </div>

          {/* User List */}
          <div>
            <UserList setTeam={setTeam} team={team} />
          </div>

          {/* Stage and Date */}
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="stage" className="block text-md font-medium text-gray-700">Task Stage</label>
              <select
                id="stage"
                {...register('stage', { required: 'Stage is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
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
                placeholder={moment().format("YYYY-MM-DD")}
                {...register("date", { required: "Date is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.date && <p className="text-sm text-red-500 mt-1"> {errors.date.message as string}</p>}
            </div>
          </div>

          {/* Priority and Assets */}
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="priority" className="block text-md font-medium text-gray-700">Priority</label>
              <select
                id="priority"
                {...register('priority', { required: 'Priority is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
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
                  accept=".jpg,.png,.jpeg"
                  multiple
                  onChange={handleSelect}
                />
                <BiImages className="mt-2" />
                <span className="mt-2">Add Assets</span>
              </label>
            </div>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="py-3 sm:flex sm:flex-row-reverse md:gap-4 gap-6">
            {uploading ? (
              <span className="text-base py-2 text-red-500">Uploading assets...</span>
            ) : (
              <>
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded text-sm"
                  disabled={uploading || isLoading || isUpdating}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-600 hover:bg-gray-500 text-white py-2 px-4 rounded text-sm"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
};
